import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  MODALIDADES,
  ORDEN_CAMPOS,
  ORIGENES,
  SERVICIOS,
  SOLICITUD_VACIA,
  TIPOS_ORGANIZACION,
  esOrigen,
  validarSolicitud,
  type Solicitud,
} from "../../lib/informes";

// Solicitudes del formulario /informes-movilidad/solicitar. Reutiliza el SMTP
// de /api/contacto (Brevo; SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS) y el
// mismo destinatario (CONTACT_EMAIL). Solo responde ok cuando el correo ha
// salido de verdad: sin credenciales SMTP devuelve 503 y la web no confirma.

/** Menos de esto entre que se abre el formulario y se envía: no es una persona. */
const TIEMPO_MINIMO_MS = 3000;
/** Envíos por IP en la ventana (en memoria de cada instancia: mejor esfuerzo). */
const LIMITE_POR_IP = 5;
const VENTANA_MS = 10 * 60 * 1000;
/** Cuánto se recuerda una solicitud ya enviada, para no duplicarla al reintentar. */
const RECUERDO_MS = 30 * 60 * 1000;

const intentosPorIp = new Map<string, number[]>();
const enviadas = new Map<string, number>();
const enCurso = new Set<string>();

function limpiar(ahora: number) {
  for (const [clave, ts] of enviadas) if (ahora - ts > RECUERDO_MS) enviadas.delete(clave);
  for (const [ip, lista] of intentosPorIp) {
    const vivas = lista.filter((t) => ahora - t < VENTANA_MS);
    if (vivas.length) intentosPorIp.set(ip, vivas);
    else intentosPorIp.delete(ip);
  }
}

function texto(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function escapar(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function unaLinea(s: string): string {
  return s.replace(/[\r\n]+/g, " ").slice(0, 120);
}

function error(status: number, codigo: string, extra: object = {}) {
  return NextResponse.json({ ok: false, error: codigo, ...extra }, { status });
}

export async function POST(request: Request) {
  let cuerpo: Record<string, unknown>;
  try {
    const json: unknown = await request.json();
    if (!json || typeof json !== "object" || Array.isArray(json)) throw new Error();
    cuerpo = json as Record<string, unknown>;
  } catch {
    return error(400, "formato");
  }

  // Protección antispam discreta: campo trampa invisible y tiempo mínimo.
  const t = typeof cuerpo.t === "number" ? cuerpo.t : 0;
  if (texto(cuerpo.sitio_web) || t < TIEMPO_MINIMO_MS) {
    return error(422, "revision");
  }

  const datos: Solicitud = { ...SOLICITUD_VACIA };
  for (const campo of ORDEN_CAMPOS) {
    (datos as unknown as Record<string, string>)[campo] = texto(cuerpo[campo]);
  }
  if (datos.tipo !== "empresa") {
    datos.centros = "";
    datos.turnos = "";
  }

  const campos = validarSolicitud(datos);
  if (Object.keys(campos).length) return error(400, "validacion", { campos });

  const origen = esOrigen(cuerpo.origen) ? cuerpo.origen : null;
  const clave = texto(cuerpo.clave).slice(0, 80);

  const ahora = Date.now();
  limpiar(ahora);

  // La misma solicitud reenviada (p. ej., se cortó la conexión tras enviarla).
  if (clave && enviadas.has(clave)) return NextResponse.json({ ok: true, repetida: true });
  if (clave && enCurso.has(clave)) return error(409, "en-curso");

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "desconocida";
  const intentos = intentosPorIp.get(ip) ?? [];
  if (intentos.length >= LIMITE_POR_IP) return error(429, "limite");

  const { SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("[INFORMES] SMTP sin configurar: la solicitud no se ha enviado");
    return error(503, "no-disponible");
  }

  intentosPorIp.set(ip, [...intentos, ahora]);
  if (clave) enCurso.add(clave);

  const etiqueta = <T extends { id: string; label?: string; titulo?: string }>(
    lista: readonly T[],
    id: string
  ) => {
    const item = lista.find((x) => x.id === id);
    return item ? (item.label ?? item.titulo ?? id) : "";
  };
  const tipo = etiqueta(TIPOS_ORGANIZACION, datos.tipo);
  const filas: [string, string][] = [
    ["Nombre", datos.nombre],
    ["Organización", datos.organizacion],
    ["Correo", datos.email],
    ["Tipo de organización", tipo],
    ["Municipio o ubicación", datos.ubicacion],
    ["Teléfono", datos.telefono],
    ["Servicio de interés", etiqueta(SERVICIOS, datos.servicio)],
    ["Modalidad", etiqueta(MODALIDADES, datos.modalidad)],
    ["Fecha orientativa", datos.fecha],
    ["Número de centros", datos.centros],
    ["Horarios o turnos", datos.turnos],
    ["Página de origen", origen ? ORIGENES[origen] : ""],
  ].filter(([, v]) => v) as [string, string][];

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; color: #3C3C3B;">
      <h2 style="border-bottom: 3px solid #FFEC36; padding-bottom: 8px;">
        Solicitud de informe de movilidad
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        ${filas
          .map(
            ([k, v]) =>
              `<tr><td style="padding: 6px 12px 6px 0; font-weight: bold; vertical-align: top; white-space: nowrap;">${escapar(k)}</td><td style="padding: 6px 0; white-space: pre-wrap;">${escapar(v)}</td></tr>`
          )
          .join("")}
      </table>
      ${
        datos.necesidad
          ? `<div style="margin-top: 16px; padding: 16px; background: #F5F5F5;">
              <strong>¿Qué necesita decidir, analizar o justificar?</strong>
              <p style="margin-top: 8px; white-space: pre-wrap;">${escapar(datos.necesidad)}</p>
            </div>`
          : ""
      }
    </div>`;
  const text = [
    "Solicitud de informe de movilidad",
    "",
    ...filas.map(([k, v]) => `${k}: ${v}`),
    ...(datos.necesidad ? ["", "¿Qué necesita decidir, analizar o justificar?", datos.necesidad] : []),
  ].join("\n");

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transporter.sendMail({
      from: { name: "beloq · Informes de movilidad", address: "info@beloq.es" },
      to: process.env.CONTACT_EMAIL || "jesus@beloq.es",
      replyTo: { name: unaLinea(datos.nombre), address: datos.email },
      subject: `[beloq.es] Informe de movilidad: ${unaLinea(datos.organizacion)} (${tipo})`,
      text,
      html,
    });
  } catch (e) {
    console.error("[INFORMES] Error enviando la solicitud:", e);
    return error(502, "envio");
  } finally {
    if (clave) enCurso.delete(clave);
  }

  if (clave) enviadas.set(clave, Date.now());
  console.log(
    `[INFORMES] Solicitud enviada | tipo=${datos.tipo} | servicio=${datos.servicio || "-"} | origen=${origen ?? "-"}`
  );
  return NextResponse.json({ ok: true });
}
