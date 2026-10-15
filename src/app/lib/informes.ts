import type { Metadata } from "next";

// Datos comunes de la sección «Informes de movilidad» (/informes-movilidad).
// Los usan las páginas, el formulario y la ruta /api/informes-movilidad, para
// que las opciones del formulario y lo que valida el servidor sean lo mismo.

export const BASE = "/informes-movilidad";
export const SITE = "https://www.beloq.es";

export const TIPOS_ORGANIZACION = [
  { id: "ayuntamiento", label: "Ayuntamiento o administración" },
  { id: "empresa", label: "Empresa o centro de trabajo" },
  { id: "campus", label: "Universidad o centro de actividad" },
  { id: "consultora", label: "Consultora o ingeniería" },
  { id: "otra", label: "Otra" },
] as const;

export type TipoOrganizacion = (typeof TIPOS_ORGANIZACION)[number]["id"];

export const SERVICIOS = [
  {
    id: "accesibilidad",
    titulo: "Diagnóstico de accesibilidad y alternativas de transporte",
    resumen:
      "Cómo se llega a un barrio, un centro o un campus en transporte público, a pie, en bici o en patinete, a qué horas funciona cada alternativa y dónde fallan las conexiones.",
    entregables: [
      "Oferta de transporte público por franja horaria y día",
      "Alternativas para llegar antes de cada entrada o turno",
      "Conexiones con poco margen de transbordo",
      "Mapa de accesos y puntos débiles",
    ],
  },
  {
    id: "ciclista-aparcamiento",
    titulo: "Análisis de movilidad ciclista y aparcamiento seguro",
    resumen:
      "Red ciclista, bicicleta compartida, aparcabicis y aparcamiento seguro: dónde falta capacidad, dónde se satura y dónde conviene estudiar un refuerzo.",
    entregables: [
      "Disponibilidad de bicicleta compartida por estación y franja",
      "Inventario y cobertura de aparcamiento de bicicletas",
      "Ocupación, duración y rotación donde haya estaciones beloq",
      "Ubicaciones candidatas para estudiar un refuerzo",
    ],
  },
  {
    id: "indicadores-seguimiento",
    titulo: "Indicadores y seguimiento de planes de movilidad",
    resumen:
      "Definición, cálculo y actualización de los indicadores de un plan de movilidad municipal o de un plan de movilidad sostenible al trabajo.",
    entregables: [
      "Batería de indicadores con definición, fuente y periodicidad",
      "Situación de partida y comparación entre periodos equivalentes",
      "Informe de seguimiento con evolución y desviaciones",
      "Consulta de los indicadores en castellano mediante el agente",
    ],
  },
  {
    id: "evaluacion-actuaciones",
    titulo: "Evaluación de actuaciones, obras y eventos",
    resumen:
      "Qué cambia en la oferta de transporte, la bicicleta compartida, el tráfico o el aparcamiento alrededor de una obra, un corte, un evento o una medida nueva.",
    entregables: [
      "Diseño de la comparación antes/después y del periodo de control",
      "Indicadores en la zona afectada y en una zona de referencia",
      "Factores de contexto que pueden explicar los cambios",
      "Conclusiones con su grado de certeza",
    ],
  },
  {
    id: "consultoras",
    titulo: "Análisis y evidencias para consultoras e ingenierías",
    resumen:
      "Tablas, mapas e indicadores trazables para incorporarlos a planes, estudios de movilidad y proyectos que redacta otro equipo.",
    entregables: [
      "Extracciones y cálculos a medida con su procedencia",
      "Mapas y gráficos listos para integrar en un documento",
      "Nota metodológica y limitaciones de cada fuente",
      "Revisión conjunta de resultados con el equipo redactor",
    ],
  },
] as const;

export type ServicioId = (typeof SERVICIOS)[number]["id"];

export const MODALIDADES = [
  { id: "puntual", label: "Encargo puntual" },
  { id: "seguimiento", label: "Seguimiento periódico" },
  { id: "no-lo-se", label: "Aún no lo sé" },
] as const;

export type ModalidadId = (typeof MODALIDADES)[number]["id"];

/** Páginas de la sección desde las que se puede llegar al formulario. */
export const ORIGENES = {
  inicio: "Página principal del servicio",
  ayuntamientos: "Ayuntamientos y administraciones",
  empresas: "Empresas y centros de trabajo",
  consultoras: "Empresas · apartado de consultoras",
  campus: "Campus y centros de actividad",
  metodologia: "Metodología",
  ejemplo: "Ejemplo de informe",
  ley: "Guía de la Ley de Movilidad Sostenible",
} as const;

export type OrigenId = keyof typeof ORIGENES;

export function esTipo(v: unknown): v is TipoOrganizacion {
  return TIPOS_ORGANIZACION.some((t) => t.id === v);
}

export function esServicio(v: unknown): v is ServicioId {
  return SERVICIOS.some((s) => s.id === v);
}

export function esModalidad(v: unknown): v is ModalidadId {
  return MODALIDADES.some((m) => m.id === v);
}

export function esOrigen(v: unknown): v is OrigenId {
  return typeof v === "string" && Object.hasOwn(ORIGENES, v);
}

/**
 * Enlace al formulario común conservando desde dónde llega el visitante.
 * Ejemplo: solicitarHref({ tipo: "ayuntamiento", origen: "ayuntamientos" }).
 */
export function solicitarHref(
  p: {
    tipo?: TipoOrganizacion;
    servicio?: ServicioId;
    modalidad?: ModalidadId;
    origen?: OrigenId;
  } = {}
): string {
  const q = new URLSearchParams();
  if (p.tipo) q.set("tipo", p.tipo);
  if (p.servicio) q.set("servicio", p.servicio);
  if (p.modalidad) q.set("modalidad", p.modalidad);
  if (p.origen) q.set("origen", p.origen);
  const s = q.toString();
  return `${BASE}/solicitar${s ? `?${s}` : ""}`;
}

// ── Formulario de solicitud ────────────────────────────────────────────────

export interface Solicitud {
  nombre: string;
  organizacion: string;
  email: string;
  tipo: TipoOrganizacion | "";
  ubicacion: string;
  telefono: string;
  servicio: ServicioId | "";
  modalidad: ModalidadId | "";
  necesidad: string;
  fecha: string;
  /** Solo si tipo = empresa. */
  centros: string;
  turnos: string;
}

export type CampoSolicitud = keyof Solicitud;
export type ErroresSolicitud = Partial<Record<CampoSolicitud, string>>;

export const SOLICITUD_VACIA: Solicitud = {
  nombre: "",
  organizacion: "",
  email: "",
  tipo: "",
  ubicacion: "",
  telefono: "",
  servicio: "",
  modalidad: "",
  necesidad: "",
  fecha: "",
  centros: "",
  turnos: "",
};

/** Orden en que aparecen los campos (para enfocar el primer error). */
export const ORDEN_CAMPOS: CampoSolicitud[] = [
  "nombre",
  "organizacion",
  "email",
  "tipo",
  "ubicacion",
  "telefono",
  "servicio",
  "modalidad",
  "necesidad",
  "fecha",
  "centros",
  "turnos",
];

export const MAX_LONGITUD: Record<CampoSolicitud, number> = {
  nombre: 120,
  organizacion: 160,
  email: 200,
  tipo: 20,
  ubicacion: 160,
  telefono: 30,
  servicio: 40,
  modalidad: 20,
  necesidad: 4000,
  fecha: 80,
  centros: 5,
  turnos: 600,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEFONO_RE = /^\+?[\d\s().-]{6,30}$/;

/**
 * Valida una solicitud. La usan el formulario (antes de enviar) y la ruta
 * /api/informes-movilidad (siempre), con los mismos mensajes.
 */
export function validarSolicitud(s: Solicitud): ErroresSolicitud {
  const e: ErroresSolicitud = {};
  if (!s.nombre.trim()) e.nombre = "Escribe tu nombre.";
  if (!s.organizacion.trim()) e.organizacion = "Escribe el nombre de tu organización.";
  if (!s.email.trim()) e.email = "Escribe tu correo electrónico.";
  else if (!EMAIL_RE.test(s.email.trim()))
    e.email = "Revisa el correo electrónico: debe tener la forma nombre@dominio.es.";
  if (!s.tipo) e.tipo = "Elige el tipo de organización.";
  else if (!esTipo(s.tipo)) e.tipo = "Elige uno de los tipos de organización de la lista.";
  if (s.telefono.trim() && !TELEFONO_RE.test(s.telefono.trim()))
    e.telefono = "Revisa el teléfono: usa solo números, espacios y, si quieres, el prefijo +.";
  if (s.servicio && !esServicio(s.servicio)) e.servicio = "Elige un servicio de la lista.";
  if (s.modalidad && !esModalidad(s.modalidad)) e.modalidad = "Elige una modalidad de la lista.";
  if (s.tipo === "empresa" && s.centros.trim() && !/^[1-9]\d{0,4}$/.test(s.centros.trim()))
    e.centros = "Indica el número de centros con cifras, por ejemplo 2.";
  for (const campo of ORDEN_CAMPOS) {
    if (!e[campo] && s[campo].length > MAX_LONGITUD[campo]) {
      e[campo] = `Este campo admite como máximo ${MAX_LONGITUD[campo]} caracteres.`;
    }
  }
  return e;
}

/** Datos de identidad públicos (los mismos de la política de privacidad). */
export const IDENTIDAD = {
  razonSocial: "Beloq Movilidad SL",
  cif: "B24990814",
  direccion: "Calle Joan Verdeguer 116, 4",
  cp: "46024",
  ciudad: "València",
  email: "info@beloq.es",
} as const;

/** Fecha en que se contrastó la guía normativa con el BOE. */
export const REVISION_NORMATIVA = {
  iso: "2026-10-15",
  texto: "15 de octubre de 2026",
} as const;

/**
 * Metadatos de una página de la sección: título propio (el layout añade
 * «· Informes de movilidad · beloq»), descripción, canónica y Open Graph.
 */
export function metadatos(p: {
  titulo: string;
  descripcion: string;
  ruta: string;
  /** Título completo sin plantilla (página principal de la sección). */
  absoluto?: boolean;
}): Metadata {
  const completo = p.absoluto ? p.titulo : `${p.titulo} · Informes de movilidad · beloq`;
  const url = `${SITE}${p.ruta}`;
  return {
    title: p.absoluto ? { absolute: p.titulo } : p.titulo,
    description: p.descripcion,
    alternates: { canonical: url },
    openGraph: {
      title: completo,
      description: p.descripcion,
      url,
      siteName: "beloq",
      locale: "es_ES",
      type: "website",
    },
  };
}

/** JSON-LD seguro dentro de <script> (recomendación de la guía de Next). */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
