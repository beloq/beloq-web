"use client";

import Link from "next/link";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  MAX_LONGITUD,
  MODALIDADES,
  ORDEN_CAMPOS,
  SERVICIOS,
  SOLICITUD_VACIA,
  TIPOS_ORGANIZACION,
  validarSolicitud,
  type CampoSolicitud,
  type ErroresSolicitud,
  type OrigenId,
  type Solicitud,
} from "../../lib/informes";

type Estado = "editando" | "enviando" | "enviada";

const ETIQUETAS: Record<CampoSolicitud, string> = {
  nombre: "Nombre",
  organizacion: "Organización",
  email: "Correo electrónico",
  tipo: "Tipo de organización",
  ubicacion: "Municipio o ubicación del centro",
  telefono: "Teléfono",
  servicio: "Servicio de interés",
  modalidad: "Modalidad",
  necesidad: "¿Qué necesitas decidir, analizar o justificar?",
  fecha: "Fecha orientativa en la que necesitas los resultados",
  centros: "Número de centros",
  turnos: "Horarios o turnos",
};

/** Mensaje para cada error del servidor que no es de un campo concreto. */
function mensajeDeFallo(status: number, codigo: unknown): string {
  const correo = "escríbenos a info@beloq.es";
  if (codigo === "no-disponible" || status === 503)
    return `El envío del formulario no está disponible en este momento y tu solicitud no se ha enviado. Puedes intentarlo más tarde o ${correo}.`;
  if (codigo === "limite" || status === 429)
    return `Hemos recibido varias solicitudes seguidas desde tu conexión. Espera unos minutos antes de volver a intentarlo o ${correo}.`;
  if (codigo === "en-curso" || status === 409)
    return "Tu solicitud se está enviando. Espera unos segundos antes de volver a pulsar.";
  if (codigo === "revision" || status === 422)
    return `No hemos podido aceptar el envío. Espera unos segundos y vuelve a intentarlo, o ${correo}.`;
  return `No se ha podido enviar la solicitud. Tus datos siguen en el formulario: vuelve a intentarlo o ${correo}.`;
}

const CLASE_CAMPO =
  "mt-2 block w-full rounded-[0_12px_0_12px] border border-gray-300 bg-white px-4 py-3 text-base text-beloq-dark placeholder:text-gray-500 focus:border-beloq-dark focus:outline-none focus:ring-2 focus:ring-beloq-yellow aria-[invalid=true]:border-red-700";

function Etiqueta({
  campo,
  obligatorio,
}: {
  campo: CampoSolicitud;
  obligatorio?: boolean;
}) {
  return (
    <label htmlFor={`sol-${campo}`} className="block text-sm font-bold text-beloq-dark">
      {ETIQUETAS[campo]}{" "}
      <span className="font-normal text-gray-600">
        {obligatorio ? "(obligatorio)" : "(opcional)"}
      </span>
    </label>
  );
}

function Ayuda({ campo, children }: { campo: CampoSolicitud; children: ReactNode }) {
  return (
    <p id={`sol-${campo}-ayuda`} className="mt-1.5 text-sm text-gray-600">
      {children}
    </p>
  );
}

function MensajeError({ campo, mensaje }: { campo: CampoSolicitud; mensaje?: string }) {
  if (!mensaje) return null;
  return (
    <p id={`sol-${campo}-error`} className="mt-1.5 flex gap-1.5 text-sm font-bold text-red-700">
      <CircleAlert aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
      {mensaje}
    </p>
  );
}

export default function FormularioSolicitud({
  inicial,
  origen,
}: {
  inicial: Partial<Solicitud>;
  origen: OrigenId | null;
}) {
  const [datos, setDatos] = useState<Solicitud>(() => ({ ...SOLICITUD_VACIA, ...inicial }));
  const [errores, setErrores] = useState<ErroresSolicitud>({});
  const [estado, setEstado] = useState<Estado>("editando");
  const [fallo, setFallo] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const confirmacionRef = useRef<HTMLHeadingElement>(null);
  const falloRef = useRef<HTMLDivElement>(null);
  // Cuándo se abrió el formulario (antispam), la clave que evita duplicados al
  // reintentar y un cerrojo síncrono contra el doble clic.
  const abiertoEn = useRef<number | null>(null);
  const clave = useRef<string | null>(null);
  const bloqueado = useRef(false);

  useEffect(() => {
    abiertoEn.current = performance.now();
  }, []);

  useEffect(() => {
    if (estado === "enviada") confirmacionRef.current?.focus();
  }, [estado]);

  useEffect(() => {
    if (fallo) falloRef.current?.focus();
  }, [fallo]);

  const describedBy = (campo: CampoSolicitud, conAyuda = false) =>
    [conAyuda ? `sol-${campo}-ayuda` : "", errores[campo] ? `sol-${campo}-error` : ""]
      .filter(Boolean)
      .join(" ") || undefined;

  const cambiar =
    (campo: CampoSolicitud) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const valor = e.target.value;
      setDatos((d) => ({ ...d, [campo]: valor }));
      if (errores[campo]) {
        setErrores((er) => {
          const n = { ...er };
          delete n[campo];
          return n;
        });
      }
    };

  const enfocarPrimerError = (errs: ErroresSolicitud) => {
    const primero = ORDEN_CAMPOS.find((c) => errs[c]);
    if (primero) {
      formRef.current?.querySelector<HTMLElement>(`[name="${primero}"]`)?.focus();
    }
  };

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (bloqueado.current) return;
    setFallo(null);

    const errs = validarSolicitud(datos);
    if (Object.keys(errs).length) {
      setErrores(errs);
      enfocarPrimerError(errs);
      return;
    }

    bloqueado.current = true;
    setEstado("enviando");
    clave.current ??=
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const trampa =
      (formRef.current?.elements.namedItem("sitio_web") as HTMLInputElement | null)?.value ?? "";

    try {
      const res = await fetch("/api/informes-movilidad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...datos,
          origen,
          clave: clave.current,
          t: abiertoEn.current == null ? 0 : Math.round(performance.now() - abiertoEn.current),
          sitio_web: trampa,
        }),
      });
      const cuerpo: { ok?: boolean; error?: string; campos?: ErroresSolicitud } = await res
        .json()
        .catch(() => ({}));
      if (res.ok && cuerpo.ok) {
        setEstado("enviada");
        return;
      }
      setEstado("editando");
      if (res.status === 400 && cuerpo.campos && Object.keys(cuerpo.campos).length) {
        setErrores(cuerpo.campos);
        enfocarPrimerError(cuerpo.campos);
        return;
      }
      setFallo(mensajeDeFallo(res.status, cuerpo.error));
    } catch {
      setEstado("editando");
      setFallo(
        "No hemos podido conectar con el servidor y no sabemos si la solicitud ha llegado. Tus datos siguen en el formulario: vuelve a pulsar «Enviar solicitud» (no se duplicará) o escríbenos a info@beloq.es."
      );
    } finally {
      bloqueado.current = false;
    }
  }

  function nuevaSolicitud() {
    setDatos({ ...SOLICITUD_VACIA, ...inicial });
    setErrores({});
    setFallo(null);
    clave.current = null;
    abiertoEn.current = performance.now();
    setEstado("editando");
  }

  if (estado === "enviada") {
    return (
      <div role="status" className="rounded-[0_24px_0_24px] bg-white p-6 sm:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-[0_12px_0_12px] bg-beloq-yellow text-beloq-dark">
          <CircleCheck aria-hidden className="h-6 w-6" />
        </span>
        <h2
          ref={confirmacionRef}
          tabIndex={-1}
          className="mt-5 text-2xl font-bold text-beloq-dark focus:outline-none"
        >
          Solicitud enviada
        </h2>
        <p className="mt-3 leading-relaxed text-gray-600">
          Hemos recibido la solicitud de <strong className="text-beloq-dark">{datos.organizacion}</strong>.
          Te responderemos desde info@beloq.es a{" "}
          <strong className="text-beloq-dark">{datos.email}</strong>.
        </p>
        <p className="mt-3 leading-relaxed text-gray-600">
          Si quieres añadir algo, escribe a{" "}
          <a href="mailto:info@beloq.es" className="font-bold text-beloq-dark underline underline-offset-4">
            info@beloq.es
          </a>{" "}
          indicando el nombre de tu organización.
        </p>
        <button
          type="button"
          onClick={nuevaSolicitud}
          className="mt-8 rounded-full border-2 border-beloq-dark px-6 py-3 text-sm font-bold text-beloq-dark transition-colors hover:bg-beloq-dark hover:text-white"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  const nErrores = Object.keys(errores).length;
  const enviando = estado === "enviando";

  return (
    <form
      ref={formRef}
      onSubmit={enviar}
      noValidate
      aria-busy={enviando}
      className="rounded-[0_24px_0_24px] bg-white p-6 sm:p-10"
    >
      {nErrores > 0 && (
        <div role="alert" className="mb-8 rounded-[0_12px_0_12px] border-2 border-red-700 p-4">
          <p className="font-bold text-red-700">
            {nErrores === 1 ? "Revisa un campo:" : `Revisa ${nErrores} campos:`}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {ORDEN_CAMPOS.filter((c) => errores[c]).map((c) => (
              <li key={c}>
                <a href={`#sol-${c === "tipo" ? "tipo-grupo" : c}`} className="text-red-700 underline">
                  {ETIQUETAS[c]}: {errores[c]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <fieldset className="space-y-6">
        <legend className="text-lg font-bold text-beloq-dark">Tus datos</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Etiqueta campo="nombre" obligatorio />
            <input
              id="sol-nombre"
              name="nombre"
              type="text"
              autoComplete="name"
              maxLength={MAX_LONGITUD.nombre}
              value={datos.nombre}
              onChange={cambiar("nombre")}
              aria-required
              aria-invalid={!!errores.nombre}
              aria-describedby={describedBy("nombre")}
              className={CLASE_CAMPO}
            />
            <MensajeError campo="nombre" mensaje={errores.nombre} />
          </div>
          <div>
            <Etiqueta campo="organizacion" obligatorio />
            <input
              id="sol-organizacion"
              name="organizacion"
              type="text"
              autoComplete="organization"
              maxLength={MAX_LONGITUD.organizacion}
              value={datos.organizacion}
              onChange={cambiar("organizacion")}
              aria-required
              aria-invalid={!!errores.organizacion}
              aria-describedby={describedBy("organizacion")}
              className={CLASE_CAMPO}
            />
            <MensajeError campo="organizacion" mensaje={errores.organizacion} />
          </div>
          <div>
            <Etiqueta campo="email" obligatorio />
            <input
              id="sol-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={MAX_LONGITUD.email}
              value={datos.email}
              onChange={cambiar("email")}
              aria-required
              aria-invalid={!!errores.email}
              aria-describedby={describedBy("email")}
              className={CLASE_CAMPO}
            />
            <MensajeError campo="email" mensaje={errores.email} />
          </div>
          <div>
            <Etiqueta campo="telefono" />
            <input
              id="sol-telefono"
              name="telefono"
              type="tel"
              autoComplete="tel"
              maxLength={MAX_LONGITUD.telefono}
              value={datos.telefono}
              onChange={cambiar("telefono")}
              aria-invalid={!!errores.telefono}
              aria-describedby={describedBy("telefono")}
              className={CLASE_CAMPO}
            />
            <MensajeError campo="telefono" mensaje={errores.telefono} />
          </div>
        </div>
      </fieldset>

      <fieldset
        id="sol-tipo-grupo"
        className="mt-10"
        aria-describedby={errores.tipo ? "sol-tipo-error" : undefined}
      >
        <legend className="text-lg font-bold text-beloq-dark">
          Tipo de organización{" "}
          <span className="text-sm font-normal text-gray-600">(obligatorio)</span>
        </legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {TIPOS_ORGANIZACION.map((t) => (
            <label
              key={t.id}
              className="flex cursor-pointer items-center gap-3 rounded-[0_12px_0_12px] border border-gray-300 px-4 py-3 text-beloq-dark transition-colors hover:border-beloq-dark has-[input:checked]:border-beloq-dark has-[input:checked]:bg-beloq-yellow has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-beloq-dark"
            >
              <input
                type="radio"
                name="tipo"
                value={t.id}
                checked={datos.tipo === t.id}
                onChange={cambiar("tipo")}
                className="h-4 w-4 accent-beloq-dark"
              />
              <span className="text-sm font-bold">{t.label}</span>
            </label>
          ))}
        </div>
        <MensajeError campo="tipo" mensaje={errores.tipo} />
      </fieldset>

      {datos.tipo === "empresa" && (
        <fieldset className="mt-8 rounded-[0_24px_0_24px] bg-beloq-gray p-5 sm:p-6">
          <legend className="sr-only">Datos del centro de trabajo</legend>
          <p className="font-bold text-beloq-dark">Si quieres, cuéntanos algo más del centro</p>
          <p className="mt-1 text-sm text-gray-600">
            Basta con cifras generales. No necesitamos datos de personas concretas ni
            archivos de nómina.
          </p>
          <div className="mt-5 grid gap-6 sm:grid-cols-[1fr_2fr]">
            <div>
              <Etiqueta campo="centros" />
              <input
                id="sol-centros"
                name="centros"
                type="text"
                inputMode="numeric"
                maxLength={MAX_LONGITUD.centros}
                value={datos.centros}
                onChange={cambiar("centros")}
                aria-invalid={!!errores.centros}
                aria-describedby={describedBy("centros")}
                className={CLASE_CAMPO}
              />
              <MensajeError campo="centros" mensaje={errores.centros} />
            </div>
            <div>
              <Etiqueta campo="turnos" />
              <textarea
                id="sol-turnos"
                name="turnos"
                rows={3}
                maxLength={MAX_LONGITUD.turnos}
                value={datos.turnos}
                onChange={cambiar("turnos")}
                placeholder="Por ejemplo: turnos de 6:00 a 14:00 y de 14:00 a 22:00, de lunes a sábado"
                aria-invalid={!!errores.turnos}
                aria-describedby={describedBy("turnos")}
                className={`${CLASE_CAMPO} resize-y`}
              />
              <MensajeError campo="turnos" mensaje={errores.turnos} />
            </div>
          </div>
        </fieldset>
      )}

      <fieldset className="mt-10 space-y-6">
        <legend className="text-lg font-bold text-beloq-dark">Tu encargo</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Etiqueta campo="ubicacion" />
            <input
              id="sol-ubicacion"
              name="ubicacion"
              type="text"
              maxLength={MAX_LONGITUD.ubicacion}
              value={datos.ubicacion}
              onChange={cambiar("ubicacion")}
              placeholder="Por ejemplo: València, Paterna…"
              aria-invalid={!!errores.ubicacion}
              aria-describedby={describedBy("ubicacion")}
              className={CLASE_CAMPO}
            />
            <MensajeError campo="ubicacion" mensaje={errores.ubicacion} />
          </div>
          <div>
            <Etiqueta campo="servicio" />
            <select
              id="sol-servicio"
              name="servicio"
              value={datos.servicio}
              onChange={cambiar("servicio")}
              aria-invalid={!!errores.servicio}
              aria-describedby={describedBy("servicio")}
              className={CLASE_CAMPO}
            >
              <option value="">Aún no lo sé</option>
              {SERVICIOS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.titulo}
                </option>
              ))}
            </select>
            <MensajeError campo="servicio" mensaje={errores.servicio} />
          </div>
        </div>

        <fieldset>
          <legend className="text-sm font-bold text-beloq-dark">
            {ETIQUETAS.modalidad}{" "}
            <span className="font-normal text-gray-600">(opcional)</span>
          </legend>
          <div className="mt-2 flex flex-wrap gap-3">
            {MODALIDADES.map((m) => (
              <label
                key={m.id}
                className="flex cursor-pointer items-center gap-2 rounded-[0_12px_0_12px] border border-gray-300 px-4 py-2.5 text-sm font-bold text-beloq-dark transition-colors hover:border-beloq-dark has-[input:checked]:border-beloq-dark has-[input:checked]:bg-beloq-yellow has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-beloq-dark"
              >
                <input
                  type="radio"
                  name="modalidad"
                  value={m.id}
                  checked={datos.modalidad === m.id}
                  onChange={cambiar("modalidad")}
                  className="h-4 w-4 accent-beloq-dark"
                />
                {m.label}
              </label>
            ))}
          </div>
          <MensajeError campo="modalidad" mensaje={errores.modalidad} />
        </fieldset>

        <div>
          <Etiqueta campo="necesidad" />
          <Ayuda campo="necesidad">
            La decisión que tienes por delante, la zona o el centro y cualquier dato que
            ya tengas.
          </Ayuda>
          <textarea
            id="sol-necesidad"
            name="necesidad"
            rows={6}
            maxLength={MAX_LONGITUD.necesidad}
            value={datos.necesidad}
            onChange={cambiar("necesidad")}
            aria-invalid={!!errores.necesidad}
            aria-describedby={describedBy("necesidad", true)}
            className={`${CLASE_CAMPO} resize-y`}
          />
          <MensajeError campo="necesidad" mensaje={errores.necesidad} />
        </div>

        <div className="sm:max-w-md">
          <Etiqueta campo="fecha" />
          <input
            id="sol-fecha"
            name="fecha"
            type="text"
            maxLength={MAX_LONGITUD.fecha}
            value={datos.fecha}
            onChange={cambiar("fecha")}
            placeholder="Por ejemplo: marzo de 2027"
            aria-invalid={!!errores.fecha}
            aria-describedby={describedBy("fecha")}
            className={CLASE_CAMPO}
          />
          <MensajeError campo="fecha" mensaje={errores.fecha} />
        </div>
      </fieldset>

      {/* Campo trampa: invisible para personas; los robots suelen rellenarlo. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="sol-sitio-web">No rellenes este campo</label>
        <input id="sol-sitio-web" name="sitio_web" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {fallo && (
        <div
          ref={falloRef}
          tabIndex={-1}
          role="alert"
          className="mt-8 flex gap-3 rounded-[0_12px_0_12px] border-2 border-red-700 p-4 text-sm text-red-700 focus:outline-none"
        >
          <CircleAlert aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="font-bold">{fallo}</p>
        </div>
      )}

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={enviando}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-beloq-dark px-8 py-3.5 font-bold text-white transition-colors hover:bg-black disabled:cursor-wait disabled:opacity-70"
        >
          {enviando ? (
            <>
              <LoaderCircle aria-hidden className="h-5 w-5 animate-spin" />
              Enviando…
            </>
          ) : (
            <>
              <Send aria-hidden className="h-5 w-5" />
              Enviar solicitud
            </>
          )}
        </button>
        <p className="text-sm text-gray-600" aria-live="polite">
          {enviando ? "Enviando la solicitud, no cierres la página." : ""}
        </p>
      </div>

      <p className="mt-8 border-t border-gray-200 pt-6 text-sm leading-relaxed text-gray-600">
        Responsable: Beloq Movilidad SL. Usaremos estos datos para responder a tu
        solicitud y, si procede, preparar una propuesta. Puedes acceder a ellos,
        rectificarlos o pedir que los borremos escribiendo a{" "}
        <a href="mailto:dpo@beloq.es" className="font-bold text-beloq-dark underline underline-offset-4">
          dpo@beloq.es
        </a>
        . Más información en la{" "}
        <Link href="/legal/privacidad" className="font-bold text-beloq-dark underline underline-offset-4">
          política de privacidad
        </Link>
        .
      </p>
    </form>
  );
}
