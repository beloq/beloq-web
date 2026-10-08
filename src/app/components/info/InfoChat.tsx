"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type RefObject,
} from "react";

// Chat de soporte de beloq info. Contrato: BELOQ_INFO §2.4 (y el controlador
// support.controller.ts del backend). Sin cuenta: la conversación se abre con
// el token que da el servidor, guardado en este navegador.

const CLAVE = "beloq_soporte";
const CADA_MS = 5_000;
const PAUSA_429_MS = 30_000;
const TEXTO_MAX = 1000;
const NOMBRE_MAX = 60;
const NOMBRE_OK = /^[\p{L}\p{M}' .-]+$/u; // lo mismo que admite el servidor
const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Conversacion = { id: string; token: string };
type Mensaje = {
  id: string;
  autor: "usuario" | "operador";
  texto: string;
  createdAt: string;
};
type Hilo = { estado: "abierta" | "cerrada"; mensajes: Mensaje[] };
type Fallo = { ok: false; status: number; code?: string; message?: string };
type Respuesta<T> = { ok: true; data: T } | Fallo;

const PERDIDA =
  "Esta conversación ya no está disponible. Si lo necesitas, escríbenos otra vez.";

/** Caracteres como los cuenta el servidor (puntos de código, no UTF-16). */
const caracteres = (s: string) => Array.from(s).length;

// ── La conversación guardada en este navegador ──────────────────────────────
// Un almacén externo: localStorage (con copia en memoria por si no se puede
// escribir, p. ej. en modo privado) y aviso a quien lo lee al cambiar.

let memoria: string | null | undefined; // undefined = aún sin leer
const oyentes = new Set<() => void>();

function leerCrudo(): string | null {
  if (memoria === undefined) {
    try {
      memoria = localStorage.getItem(CLAVE);
    } catch {
      memoria = null;
    }
  }
  return memoria;
}

function suscribir(avisar: () => void) {
  oyentes.add(avisar);
  const deOtraPestana = (e: StorageEvent) => {
    if (e.key !== CLAVE) return;
    memoria = e.newValue;
    avisar();
  };
  window.addEventListener("storage", deOtraPestana);
  return () => {
    oyentes.delete(avisar);
    window.removeEventListener("storage", deOtraPestana);
  };
}

function guardar(c: Conversacion) {
  memoria = JSON.stringify(c);
  try {
    localStorage.setItem(CLAVE, memoria);
  } catch {
    // Sin almacenamiento: el chat sigue funcionando en esta visita.
  }
  oyentes.forEach((f) => f());
}

function olvidar() {
  memoria = null;
  try {
    localStorage.removeItem(CLAVE);
  } catch {
    // nada que borrar
  }
  oyentes.forEach((f) => f());
}

function parsear(crudo: string | null): Conversacion | null {
  try {
    const v = JSON.parse(crudo ?? "null");
    return typeof v?.id === "string" && typeof v?.token === "string"
      ? { id: v.id, token: v.token }
      : null;
  } catch {
    return null;
  }
}

/**
 * El correo de respuesta enlaza a «/info#chat&t=<token>&c=<id>»: devuelve la
 * conversación y quita el token de la barra de direcciones.
 */
function tomarDelEnlace(): Conversacion | null {
  const { hash, pathname, search } = window.location;
  if (!hash.startsWith("#chat&")) return null;
  const params = new URLSearchParams(hash.slice("#chat&".length));
  window.history.replaceState(window.history.state, "", `${pathname}${search}#chat`);
  const token = params.get("t");
  const id = params.get("c");
  return token && id ? { id, token } : null;
}

// ── Servidor ────────────────────────────────────────────────────────────────

async function llamar<T>(
  base: string,
  ruta: string,
  opts: { metodo?: "GET" | "POST"; token?: string; cuerpo?: unknown } = {},
): Promise<Respuesta<T>> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (opts.cuerpo !== undefined) headers["Content-Type"] = "application/json";
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;
  let res: Response;
  try {
    res = await fetch(`${base}${ruta}`, {
      method: opts.metodo ?? "GET",
      headers,
      body: opts.cuerpo === undefined ? undefined : JSON.stringify(opts.cuerpo),
      cache: "no-store",
    });
  } catch {
    return { ok: false, status: 0 };
  }
  const json: unknown = await res.json().catch(() => null);
  if (res.ok) return { ok: true, data: json as T };
  const e = (json && typeof json === "object" ? json : {}) as {
    code?: unknown;
    message?: unknown;
  };
  return {
    ok: false,
    status: res.status,
    code: typeof e.code === "string" ? e.code : undefined,
    message: typeof e.message === "string" ? e.message : undefined,
  };
}

function textoDeFallo(f: Fallo, al: "abrir" | "escribir"): string {
  // Los errores propios del chat ya traen un texto pensado para la persona;
  // el resto (p. ej. el 429 genérico del limitador) viene en inglés.
  if (f.code?.startsWith("SUPPORT_") && f.message) return f.message;
  if (f.status === 0)
    return "¡Ups! No hemos podido conectar. Revisa tu conexión e inténtalo de nuevo.";
  if (f.status === 429) return "Has escrito muchos mensajes seguidos. Espera un momento.";
  if (f.status === 409)
    return "Esta conversación está cerrada. Escríbenos otra vez si lo necesitas.";
  if (f.status === 400)
    return al === "abrir"
      ? "Revisa lo que has escrito: el mensaje (hasta 1000 caracteres), tu nombre (solo letras) y tu correo."
      : "Tu mensaje no puede estar vacío ni pasar de 1000 caracteres.";
  return "Ha ocurrido un error. Por favor, inténtalo de nuevo.";
}

/** Une sin repetir (por id) y en orden de llegada al servidor. */
function juntar(antes: Mensaje[], nuevos: Mensaje[]): Mensaje[] {
  const porId = new Map(antes.map((m) => [m.id, m]));
  for (const m of nuevos) porId.set(m.id, m);
  return [...porId.values()].sort((a, b) =>
    a.createdAt === b.createdAt
      ? a.id.localeCompare(b.id)
      : a.createdAt < b.createdAt
        ? -1
        : 1,
  );
}

const MADRID = "Europe/Madrid";
const fDia = new Intl.DateTimeFormat("es-ES", { dateStyle: "short", timeZone: MADRID });
const fHora = new Intl.DateTimeFormat("es-ES", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: MADRID,
});
const fFecha = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "short",
  timeZone: MADRID,
});

function cuando(iso: string): string {
  const d = new Date(iso);
  const hora = fHora.format(d);
  return fDia.format(d) === fDia.format(new Date()) ? hora : `${fFecha.format(d)}, ${hora}`;
}

// ── Piezas de la interfaz ───────────────────────────────────────────────────

const CAMPO =
  "mt-1 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-beloq-dark placeholder:text-gray-400 focus:border-beloq-dark focus:outline-none focus:ring-2 focus:ring-beloq-yellow";
const BOTON =
  "inline-flex items-center justify-center rounded-[0_24px_0_24px] bg-beloq-yellow px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-beloq-dark transition-colors duration-200 hover:bg-beloq-yellow-dark disabled:bg-[#E0E0E0] disabled:text-gray-500";

/** BELOQ_INFO §5, tal cual. */
function Privacidad() {
  return (
    <p className="text-xs leading-relaxed text-gray-600">
      Para atenderte guardamos lo que escribas aquí y, si nos lo das, tu nombre y
      tu correo, solo para responderte. Lo borramos a los 90 días. No escribas
      datos de tu tarjeta ni contraseñas. Responsable: beloq ·{" "}
      <a href="mailto:info@beloq.es" className="underline">
        info@beloq.es
      </a>{" "}
      · más en la{" "}
      <Link href="/legal/privacidad" className="underline">
        Política de privacidad
      </Link>
      .
    </p>
  );
}

function Contador({ texto }: { texto: string }) {
  const usados = caracteres(texto);
  return (
    <p
      className={`mt-1 text-right text-xs ${
        usados > TEXTO_MAX ? "font-bold text-[#E53935]" : "text-gray-500"
      }`}
    >
      {usados}/{TEXTO_MAX}
    </p>
  );
}

function Aviso({ texto }: { texto: string | null }) {
  if (!texto) return null;
  return (
    <p role="alert" className="rounded-xl bg-[#FDECEA] px-4 py-3 text-sm font-bold text-beloq-dark">
      {texto}
    </p>
  );
}

// ── Abrir una conversación ──────────────────────────────────────────────────

function NuevaConversacion({
  apiBase,
  aviso,
  setAviso,
}: {
  apiBase: string;
  aviso: string | null;
  setAviso: (texto: string | null) => void;
}) {
  const [texto, setTexto] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [trampa, setTrampa] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function abrir(e: FormEvent) {
    e.preventDefault();
    const t = texto.trim();
    const n = nombre.trim();
    const m = email.trim();
    if (!t || caracteres(t) > TEXTO_MAX)
      return setAviso("Escribe tu mensaje (hasta 1000 caracteres).");
    if (n && (caracteres(n) > NOMBRE_MAX || !NOMBRE_OK.test(n)))
      return setAviso(
        "Tu nombre solo puede llevar letras, espacios, apóstrofo, punto y guion (hasta 60).",
      );
    if (m && (m.length > 254 || !EMAIL_OK.test(m))) return setAviso("Revisa tu correo.");

    setEnviando(true);
    setAviso(null);
    const r = await llamar<Conversacion>(apiBase, "/support/conversations", {
      metodo: "POST",
      cuerpo: {
        texto: t,
        ...(n ? { nombre: n } : {}),
        ...(m ? { email: m } : {}),
        website: trampa,
      },
    });
    setEnviando(false);
    if (!r.ok) return setAviso(textoDeFallo(r, "abrir"));
    guardar({ id: r.data.id, token: r.data.token }); // pasa a la conversación
  }

  return (
    <form onSubmit={abrir} noValidate className="relative mt-6 space-y-4">
      <div>
        <label htmlFor="chat-texto" className="block text-sm font-bold text-beloq-dark">
          Tu mensaje
        </label>
        <textarea
          id="chat-texto"
          rows={4}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          maxLength={TEXTO_MAX * 2}
          placeholder="Cuéntanos qué pasa y en qué beloq estás."
          className={CAMPO}
        />
        <Contador texto={texto} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="chat-nombre" className="block text-sm font-bold text-beloq-dark">
            Tu nombre <span className="font-normal text-gray-500">(opcional)</span>
          </label>
          <input
            id="chat-nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            autoComplete="given-name"
            maxLength={NOMBRE_MAX}
            className={CAMPO}
          />
        </div>
        <div>
          <label htmlFor="chat-email" className="block text-sm font-bold text-beloq-dark">
            Tu correo <span className="font-normal text-gray-500">(opcional)</span>
          </label>
          <input
            id="chat-email"
            type="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            maxLength={254}
            className={CAMPO}
          />
        </div>
      </div>
      <p className="text-sm text-gray-600">
        Si nos dejas tu correo, nuestra respuesta te llegará también allí.
      </p>
      {/* Campo trampa (§2.4): invisible para las personas y siempre vacío. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="chat-web">No rellenes este campo</label>
        <input
          id="chat-web"
          name="bq_web"
          tabIndex={-1}
          autoComplete="off"
          value={trampa}
          onChange={(e) => setTrampa(e.target.value)}
        />
      </div>
      <Privacidad />
      <Aviso texto={aviso} />
      <button type="submit" disabled={enviando} className={BOTON}>
        {enviando ? "Enviando…" : "Enviar"}
      </button>
    </form>
  );
}

// ── Una conversación abierta ────────────────────────────────────────────────

function HiloConversacion({
  apiBase,
  conv,
  seccion,
  onPerdida,
}: {
  apiBase: string;
  conv: Conversacion;
  seccion: RefObject<HTMLElement | null>;
  onPerdida: (motivo: string | null) => void;
}) {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [leido, setLeido] = useState(false);
  const [cerrada, setCerrada] = useState(false);
  const [llena, setLlena] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const cerradaRef = useRef(false);

  // Pregunta por mensajes nuevos cada 5 s mientras el chat está en pantalla y
  // la pestaña visible (§2.4). La primera vez, aunque no esté en pantalla.
  useEffect(() => {
    let vivo = true;
    /** createdAt del último mensaje RECIBIDO aquí: lo propio no lo adelanta. */
    let cursor: string | null = null;
    let enCurso = false;
    let pausaHasta = 0;
    let enPantalla = false;

    const leer = async () => {
      if (!vivo || enCurso || Date.now() < pausaHasta) return;
      enCurso = true;
      const after = cursor ? `?after=${encodeURIComponent(cursor)}` : "";
      const r = await llamar<Hilo>(
        apiBase,
        `/support/conversations/${encodeURIComponent(conv.id)}/messages${after}`,
        { token: conv.token },
      );
      enCurso = false;
      if (!vivo) return;
      if (r.ok) {
        const nuevos = r.data.mensajes ?? [];
        if (nuevos.length) {
          cursor = nuevos[nuevos.length - 1].createdAt;
          setMensajes((m) => juntar(m, nuevos));
        }
        cerradaRef.current = r.data.estado === "cerrada";
        setCerrada(cerradaRef.current);
        setLeido(true);
        return;
      }
      // Token que no vale, conversación borrada (90 días) o enlace roto.
      if (r.status === 400 || r.status === 401 || r.status === 404) {
        onPerdida(PERDIDA);
        return;
      }
      if (r.status === 429) pausaHasta = Date.now() + PAUSA_429_MS;
      // Red o servidor: se reintenta en la próxima vuelta.
    };

    const primera = window.setTimeout(() => void leer(), 0);
    const io = new IntersectionObserver(
      ([entry]) => {
        enPantalla = entry.isIntersecting;
        if (enPantalla) void leer();
      },
      { rootMargin: "200px" },
    );
    if (seccion.current) io.observe(seccion.current);
    const vuelta = window.setInterval(() => {
      if (document.visibilityState === "visible" && enPantalla && !cerradaRef.current)
        void leer();
    }, CADA_MS);
    const alVolver = () => {
      if (document.visibilityState === "visible" && enPantalla) void leer();
    };
    document.addEventListener("visibilitychange", alVolver);

    return () => {
      vivo = false;
      window.clearTimeout(primera);
      io.disconnect();
      window.clearInterval(vuelta);
      document.removeEventListener("visibilitychange", alVolver);
    };
  }, [apiBase, conv, seccion, onPerdida]);

  async function escribir(e: FormEvent) {
    e.preventDefault();
    const t = texto.trim();
    if (!t || caracteres(t) > TEXTO_MAX)
      return setAviso("Tu mensaje no puede estar vacío ni pasar de 1000 caracteres.");

    setEnviando(true);
    setAviso(null);
    const r = await llamar<{ id: string; createdAt: string }>(
      apiBase,
      `/support/conversations/${encodeURIComponent(conv.id)}/messages`,
      { metodo: "POST", token: conv.token, cuerpo: { texto: t } },
    );
    setEnviando(false);
    if (r.ok) {
      setMensajes((m) =>
        juntar(m, [{ id: r.data.id, autor: "usuario", texto: t, createdAt: r.data.createdAt }]),
      );
      setTexto("");
      return;
    }
    if (r.status === 401 || r.status === 404) return onPerdida(PERDIDA);
    if (r.status === 409 && r.code !== "SUPPORT_FULL") {
      cerradaRef.current = true;
      setCerrada(true);
      return;
    }
    if (r.code === "SUPPORT_FULL") setLlena(true);
    setAviso(textoDeFallo(r, "escribir"));
  }

  const ultimo = mensajes[mensajes.length - 1];

  return (
    <div className="mt-6 space-y-4">
      <div className="rounded-[0_24px_0_24px] bg-beloq-gray p-4">
        {!leido && mensajes.length === 0 ? (
          <p className="text-gray-500">Cargando tu conversación…</p>
        ) : (
          <ol aria-live="polite" className="space-y-3">
            {mensajes.map((m) => {
              const mio = m.autor === "usuario";
              return (
                <li key={m.id} className={`flex ${mio ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-[0_24px_0_24px] px-4 py-3 ${
                      mio ? "bg-beloq-yellow" : "bg-white shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
                    }`}
                  >
                    <p className="text-xs font-bold text-beloq-dark">
                      {mio ? "Tú" : "Equipo de beloq"}
                      <span className="ml-2 font-normal text-gray-600">
                        {cuando(m.createdAt)}
                      </span>
                    </p>
                    <p className="mt-1 whitespace-pre-wrap break-words text-beloq-dark">
                      {m.texto}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
        {!cerrada && ultimo?.autor === "usuario" && (
          <p className="mt-4 text-sm text-gray-600">
            Te responderemos aquí. Si nos dejaste tu correo, también te llegará
            allí.
          </p>
        )}
      </div>

      {cerrada ? (
        <div className="space-y-4">
          <p className="font-bold text-beloq-dark">
            Esta conversación está cerrada. Escríbenos otra vez si lo necesitas.
          </p>
          <button type="button" onClick={() => onPerdida(null)} className={BOTON}>
            Empezar otra conversación
          </button>
        </div>
      ) : llena ? (
        <div className="space-y-4">
          <Aviso texto={aviso} />
          <button type="button" onClick={() => onPerdida(null)} className={BOTON}>
            Empezar otra conversación
          </button>
        </div>
      ) : (
        <form onSubmit={escribir} noValidate className="space-y-4">
          <div>
            <label htmlFor="chat-respuesta" className="block text-sm font-bold text-beloq-dark">
              Escribe un mensaje
            </label>
            <textarea
              id="chat-respuesta"
              rows={3}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              maxLength={TEXTO_MAX * 2}
              className={CAMPO}
            />
            <Contador texto={texto} />
          </div>
          <Privacidad />
          <Aviso texto={aviso} />
          <button type="submit" disabled={enviando} className={BOTON}>
            {enviando ? "Enviando…" : "Enviar"}
          </button>
        </form>
      )}
    </div>
  );
}

// ── Sección ─────────────────────────────────────────────────────────────────

/** BELOQ_INFO §3.5: el chat (§2.4) con el aviso de privacidad (§5). */
export default function InfoChat({ apiBase }: { apiBase: string }) {
  // undefined en el servidor y al hidratar: aún no se sabe qué hay guardado.
  const crudo = useSyncExternalStore<string | null | undefined>(
    suscribir,
    leerCrudo,
    () => undefined,
  );
  const conv = useMemo(() => (crudo === undefined ? undefined : parsear(crudo)), [crudo]);
  const [aviso, setAviso] = useState<string | null>(null);
  const seccion = useRef<HTMLElement>(null);

  // Llegada desde el enlace del correo: se guarda esa conversación. También si
  // /info ya estaba abierta y el enlace solo cambia el fragmento (sin recarga).
  useEffect(() => {
    const procesar = () => {
      const delEnlace = tomarDelEnlace();
      if (!delEnlace) return;
      guardar(delEnlace);
      seccion.current?.scrollIntoView();
    };
    procesar();
    window.addEventListener("hashchange", procesar);
    return () => window.removeEventListener("hashchange", procesar);
  }, []);

  const perder = useCallback((motivo: string | null) => {
    olvidar();
    setAviso(motivo);
  }, []);

  return (
    <section ref={seccion} id="chat" className="scroll-mt-20 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-2xl font-bold text-beloq-dark sm:text-3xl">
          Habla con el equipo de beloq
        </h2>
        <p className="mt-2 text-gray-700">
          Escríbenos y te respondemos aquí mismo. También puedes escribirnos a{" "}
          <a href="mailto:info@beloq.es" className="font-bold text-beloq-dark underline">
            info@beloq.es
          </a>
          .
        </p>

        {!apiBase ? (
          <p className="mt-6 text-gray-700">El chat no está disponible ahora mismo.</p>
        ) : conv === undefined ? (
          <p className="mt-6 text-gray-500">Cargando el chat…</p>
        ) : conv === null ? (
          <NuevaConversacion apiBase={apiBase} aviso={aviso} setAviso={setAviso} />
        ) : (
          <HiloConversacion
            key={conv.id}
            apiBase={apiBase}
            conv={conv}
            seccion={seccion}
            onPerdida={perder}
          />
        )}
      </div>
    </section>
  );
}
