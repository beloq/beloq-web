// beloq info (beloq.es/info y beloq.es/app): ajustes y datos públicos.
// Contrato: beloq-backend/docs/BELOQ_INFO.md. Las cifras salen SIEMPRE de la API.

/**
 * Interruptor de las tiendas. Mientras beloq no esté publicada en Google Play
 * y App Store (hoy: prueba cerrada y TestFlight), /app enseña «Muy pronto» y
 * /info no pinta los botones de las tiendas. Ponerlo a true al publicar.
 */
export const APPS_PUBLICADAS: boolean = false;

export const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=es.beloq.beloq_app";
export const APP_STORE_URL = "https://apps.apple.com/app/id6764607603";
export const STATUS_PAGE_URL = "https://status.beloq.es";

/** Cloud Run directo, nunca el CDN de Firebase (BELOQ_INFO §2). */
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

export interface PublicPricing {
  currency: string;
  vat_included: boolean;
  deposit: { amount_cents: number };
  usage: { penalty_per_hour_eur: number; extra_time_billing?: boolean };
  plans: {
    id: string;
    name: string;
    price_cents: number;
    duration_days: number | null;
    free_hours?: number;
  }[];
  free_time?: {
    ad_minutes: number;
    ads_per_day: number;
    day_starts_at: string;
    time_zone: string;
  };
}

export type SemaforoEstado = "operativo" | "incidencia" | "caido" | "desconocido";

export interface PublicStatus {
  semaforos: {
    id: string;
    nombre: string;
    estado: SemaforoEstado;
    motivo: string;
  }[];
  aviso: {
    texto: string;
    nivel: "info" | "aviso" | "incidencia";
    desde: string;
  } | null;
  actualizado: string;
}

export interface PublicStation {
  id: number;
  nombre_estacion: string;
  direccion: string | null;
  ciudad: string | null;
  estado_estacion: string;
  modulosTotales: number;
  modulosDisponibles: number;
  modulosSinSenal: number;
}

async function getJson<T>(path: string, revalidate: number): Promise<T | null> {
  if (!API_BASE) return null;
  try {
    const res = await fetch(`${API_BASE}${path}`, { next: { revalidate } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

// Mismos tiempos de caché que el servidor (BELOQ_INFO §2.1-2.3).
export const getPricing = () => getJson<PublicPricing>("/pricing/public", 300);
export const getStatus = () => getJson<PublicStatus>("/status/public", 30);
export const getStations = () =>
  getJson<PublicStation[]>("/stations/public", 30);

/** 700 → «7 €», 1950 → «19,50 €». */
export function eurosFromCents(cents: number, currency = "EUR"): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

/** 0.45 → «0,45 €». */
export function euros(amount: number, currency = "EUR"): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

/** Hora de Madrid de un ISO: «09:12». */
export function horaMadrid(iso: string): string {
  return new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Madrid",
  }).format(new Date(iso));
}
