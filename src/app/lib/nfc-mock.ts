// Modo mock para revisar la maqueta sin backend ni Stripe.
// SOLO se honra si el build tiene NEXT_PUBLIC_MOCK activo (preview/dev).
// En producción isMockEnabled() === false, así que ?mock=... queda inerte.

import type {
  ApiResult,
  CheckoutSessionResult,
  ConfirmSessionResult,
  CreateSessionResult,
  ModuleInfo,
  MockState,
} from "./nfc-types";

export function isMockEnabled(): boolean {
  return process.env.NEXT_PUBLIC_MOCK === "1";
}

/** Lee ?mock=<estado> solo si el modo mock está habilitado en el build. */
export function resolveMockState(raw: string | null): MockState | null {
  if (!isMockEnabled() || !raw) return null;
  const valid: MockState[] = [
    "available",
    "unavailable",
    "payment",
    "opened",
    "openfailed",
    "checkout",
    "reauth",
    "completing",
  ];
  return valid.includes(raw as MockState) ? (raw as MockState) : null;
}

const ok = <T>(data: T, status = 200): ApiResult<T> => ({
  ok: true,
  status,
  data,
});

export const mockModule = (moduleId: string): ApiResult<ModuleInfo> =>
  ok({
    module_id: moduleId,
    module_status: "available",
    module_name: moduleId.replace(/^module/i, "Módulo "),
    deposit_amount_cents: 700,
    max_session_duration_hours: 3,
    currency: "EUR",
    terms_url: "/legal/terminos",
  });

export const mockModuleOccupied = (
  moduleId: string
): ApiResult<ModuleInfo> => ({
  ok: false,
  status: 409,
  data: null,
  errorText: "Este módulo está ocupado ahora mismo.",
  occupied: {
    module_id: moduleId,
    module_status: "occupied",
    message: "Este módulo está ocupado ahora mismo.",
    alternative_modules: ["module1", "module3", "module7"],
  },
});

export const mockCreateSession = (): ApiResult<CreateSessionResult> =>
  ok(
    {
      session_id: "mock_sess_123",
      stripe_client_secret: "mock_cs_123",
      stripe_publishable_key: "pk_test_mock",
      deposit_amount_cents: 700,
      expires_at: new Date(Date.now() + 3 * 3600 * 1000).toISOString(),
    },
    201
  );

export const mockConfirmOpened = (): ApiResult<ConfirmSessionResult> =>
  ok({
    session_id: "mock_sess_123",
    status: "active",
    module_opened: true,
    max_duration_seconds: 3 * 3600,
    expires_at: new Date(Date.now() + 3 * 3600 * 1000).toISOString(),
    recovery_phone: "+34 600 000 000",
    recovery_instructions_url: "/help/recovery",
  });

export const mockConfirmFailed = (): ApiResult<ConfirmSessionResult> =>
  ok({
    session_id: "mock_sess_123",
    status: "hold_authorized_pending_unlock",
    module_opened: false,
    message: "El módulo no respondió. No se te ha cobrado.",
  });

export const mockCheckoutCompleting = (): ApiResult<CheckoutSessionResult> =>
  ok({
    session_id: "mock_sess_123",
    status: "completing",
    module_opened: true,
    deposit_release_status: "pending",
  });

export const mockCheckoutReauth = (): ApiResult<CheckoutSessionResult> =>
  ok({
    session_id: "mock_sess_123",
    requires_payment_reauth: true,
    stripe_client_secret: "mock_cs_reauth_456",
  });
