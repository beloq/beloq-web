// Tipos del contrato del backend para el flujo NFC anónimo (/anonymous/*).
// Wire en snake_case, tal cual lo devuelve el backend (NestJS).

export type ModuleStatus = "available" | "occupied" | "maintenance" | "offline";

/** Versión de términos sincronizada con /legal/terminos. El GET de módulo no la
 *  devuelve, así que se envía esta constante en POST /anonymous/sessions. */
export const TERMS_VERSION = "1.3";

// --- GET /anonymous/module/:moduleId ---
export interface ModuleInfo {
  module_id: string;
  module_status: ModuleStatus;
  module_name: string;
  deposit_amount_cents: number;
  max_session_duration_hours: number;
  currency: string; // 'EUR'
  terms_url: string;
}

// --- POST /anonymous/sessions ---
export interface CreateSessionBody {
  module_id: string;
  fingerprint: string;
  terms_accepted: true;
  terms_version: string;
  u: string | null;
  c: string | null;
}

export interface CreateSessionResult {
  session_id: string;
  stripe_client_secret: string;
  stripe_publishable_key: string;
  deposit_amount_cents: number;
  expires_at: string; // ISO
}

// --- POST /anonymous/sessions/:id/confirm ---
export interface ConfirmSessionBody {
  stripe_payment_intent_id: string;
}

export interface ConfirmSessionResult {
  session_id: string;
  status: "active" | "hold_authorized_pending_unlock";
  module_opened: boolean;
  max_duration_seconds?: number;
  expires_at?: string;
  recovery_phone?: string;
  recovery_instructions_url?: string;
  message?: string;
}

// --- POST /anonymous/sessions/:id/checkout ---
export interface CheckoutSessionBody {
  fingerprint: string;
  u: string;
  c: string;
  stripe_payment_method_id?: string;
}

export interface CheckoutSessionResult {
  session_id: string;
  status?: "completing" | "active";
  module_opened?: boolean;
  deposit_release_status?: "pending" | string;
  requires_payment_reauth?: boolean;
  stripe_client_secret?: string;
  message?: string;
}

/** Payload de error 409-ocupado: el `message` del error NestJS es un objeto. */
export interface OccupiedPayload {
  module_id?: string;
  module_status?: ModuleStatus;
  message?: string;
  alternative_modules?: string[];
}

/** Resultado normalizado de una llamada a la API. No lanza en 4xx esperados. */
export interface ApiResult<T> {
  ok: boolean;
  status: number;
  data: T | null;
  /** Texto de error legible (ya extraído del envoltorio NestJS). */
  errorText?: string;
  /** Payload de ocupado, si el error 409 traía un objeto. */
  occupied?: OccupiedPayload;
}

/** localStorage por módulo: persiste la sesión entre taps.
 *  `pending` indica qué acción reanudar si el pago vuelve por redirect 3DS/SCA. */
export interface StoredSession {
  session_id: string;
  expires_at: string;
  pending?: "confirm" | "checkout";
}

/** Estados posibles que el modo mock puede forzar vía ?mock=<estado>. */
export type MockState =
  | "available"
  | "unavailable"
  | "payment"
  | "opened"
  | "openfailed"
  | "checkout"
  | "reauth"
  | "completing";
