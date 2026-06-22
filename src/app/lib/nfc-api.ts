// Cliente del backend para el flujo NFC anónimo. Llama directamente desde el
// navegador a NEXT_PUBLIC_API_BASE (CORS de m.beloq.es permitido en el backend).
// No lanza en 4xx esperados (403/409/429): devuelve ApiResult para que NfcFlow
// ramifique. Solo lanza/normaliza a status 0 en error de red.

import type {
  ApiResult,
  CheckoutSessionBody,
  CheckoutSessionResult,
  ConfirmSessionBody,
  ConfirmSessionResult,
  CreateSessionBody,
  CreateSessionResult,
  ModuleInfo,
  OccupiedPayload,
  ResumeBody,
  ResumeResult,
} from "./nfc-types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

/**
 * Extrae texto y payload de ocupado del envoltorio de error de NestJS.
 * NestJS anida el detalle bajo `message`, que puede ser:
 *  - string  → mensaje directo (403, 409 replay)
 *  - objeto  → { module_id, module_status, message, alternative_modules } (409 ocupado)
 *            o { message } (429)
 */
function parseNestError(body: unknown): {
  errorText?: string;
  occupied?: OccupiedPayload;
} {
  if (!body || typeof body !== "object") {
    return { errorText: typeof body === "string" ? body : undefined };
  }
  const msg = (body as { message?: unknown }).message;
  if (typeof msg === "string") {
    return { errorText: msg };
  }
  if (msg && typeof msg === "object") {
    const obj = msg as OccupiedPayload;
    return {
      errorText: typeof obj.message === "string" ? obj.message : undefined,
      occupied: obj,
    };
  }
  // Sin `message` reconocible: intenta `error` o nada.
  const errField = (body as { error?: unknown }).error;
  return { errorText: typeof errField === "string" ? errField : undefined };
}

async function request<T>(
  path: string,
  init?: RequestInit
): Promise<ApiResult<T>> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(init?.headers ?? {}),
      },
    });
  } catch {
    // Error de red / CORS / offline.
    return { ok: false, status: 0, data: null, errorText: "network" };
  }

  let body: unknown = null;
  const text = await res.text();
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }

  if (res.ok) {
    return { ok: true, status: res.status, data: body as T };
  }

  const { errorText, occupied } = parseNestError(body);
  return { ok: false, status: res.status, data: null, errorText, occupied };
}

export function getModule(
  moduleId: string,
  u?: string | null,
  c?: string | null
): Promise<ApiResult<ModuleInfo>> {
  const qs = new URLSearchParams();
  if (u) qs.set("u", u);
  if (c) qs.set("c", c);
  const query = qs.toString();
  return request<ModuleInfo>(
    `/anonymous/module/${encodeURIComponent(moduleId)}${query ? `?${query}` : ""}`,
    { method: "GET" }
  );
}

export function resumeModule(
  moduleId: string,
  body: ResumeBody
): Promise<ApiResult<ResumeResult>> {
  return request<ResumeResult>(
    `/anonymous/module/${encodeURIComponent(moduleId)}/resume`,
    { method: "POST", body: JSON.stringify(body) }
  );
}

export function createSession(
  body: CreateSessionBody
): Promise<ApiResult<CreateSessionResult>> {
  return request<CreateSessionResult>(`/anonymous/sessions`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function confirmSession(
  sessionId: string,
  body: ConfirmSessionBody
): Promise<ApiResult<ConfirmSessionResult>> {
  return request<ConfirmSessionResult>(
    `/anonymous/sessions/${encodeURIComponent(sessionId)}/confirm`,
    { method: "POST", body: JSON.stringify(body) }
  );
}

export function checkoutSession(
  sessionId: string,
  body: CheckoutSessionBody
): Promise<ApiResult<CheckoutSessionResult>> {
  return request<CheckoutSessionResult>(
    `/anonymous/sessions/${encodeURIComponent(sessionId)}/checkout`,
    { method: "POST", body: JSON.stringify(body) }
  );
}

export function isApiConfigured(): boolean {
  return API_BASE.length > 0;
}
