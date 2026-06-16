"use client";

import { useEffect, useRef, useState } from "react";
import {
  checkoutSession,
  confirmSession,
  createSession,
  getModule,
  isApiConfigured,
} from "../../lib/nfc-api";
import {
  isMockEnabled,
  mockCheckoutCompleting,
  mockConfirmFailed,
  mockConfirmOpened,
  mockCreateSession,
  mockModule,
  mockModuleOccupied,
  resolveMockState,
} from "../../lib/nfc-mock";
import {
  TERMS_VERSION,
  type ModuleInfo,
  type ModuleStatus,
  type StoredSession,
} from "../../lib/nfc-types";
import PaymentStep from "./PaymentStep";
import {
  AvailableView,
  CompletingView,
  ErrorView,
  LoadingView,
  OpenFailedView,
  OpenedView,
  UnavailableView,
  WaitTapView,
} from "./StatusViews";
import { formatMoney } from "./ui";

type Phase =
  | "loading"
  | "available"
  | "unavailable"
  | "creatingSession"
  | "payment"
  | "confirming"
  | "opened"
  | "openFailed"
  | "checkout"
  | "completing"
  | "reauth"
  | "waitTap"
  | "error";

interface SessionState {
  id: string;
  clientSecret: string;
  publishableKey: string;
  amountCents: number;
  currency: string;
}

interface OpenedInfo {
  maxHours?: number;
  recoveryPhone?: string;
  recoveryUrl?: string;
}

const ENV_PK = process.env.NEXT_PUBLIC_STRIPE_PK ?? "";

export interface NfcFlowProps {
  moduleId: string;
  u: string | null;
  c: string | null;
  paymentIntent: string | null;
  redirectStatus: string | null;
  mockParam: string | null;
}

// --- localStorage helpers ---
function storageKey(moduleId: string) {
  return `beloq:session:${moduleId}`;
}
function readStored(moduleId: string): StoredSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(storageKey(moduleId));
    if (!raw) return null;
    const s = JSON.parse(raw) as StoredSession;
    if (s.expires_at && new Date(s.expires_at).getTime() < Date.now()) {
      window.localStorage.removeItem(storageKey(moduleId));
      return null;
    }
    return s;
  } catch {
    return null;
  }
}
function writeStored(moduleId: string, s: StoredSession) {
  try {
    window.localStorage.setItem(storageKey(moduleId), JSON.stringify(s));
  } catch {
    /* almacenamiento no disponible: el flujo sigue, solo se pierde el 2º tap */
  }
}
function updateStoredPending(
  moduleId: string,
  pending: "confirm" | "checkout"
) {
  const s = readStored(moduleId);
  if (s) writeStored(moduleId, { ...s, pending });
}
function clearStored(moduleId: string) {
  try {
    window.localStorage.removeItem(storageKey(moduleId));
  } catch {
    /* no-op */
  }
}

async function getFingerprint(mock: boolean): Promise<string> {
  if (mock) return "fp_mock";
  try {
    const FP = (await import("@fingerprintjs/fingerprintjs")).default;
    const agent = await FP.load();
    const res = await agent.get();
    return res.visitorId;
  } catch {
    return "fp_unavailable";
  }
}

function messageForStatus(status: ModuleStatus): string {
  switch (status) {
    case "maintenance":
      return "Este módulo está en mantenimiento ahora mismo.";
    case "offline":
      return "Este módulo no está conectado en este momento.";
    case "occupied":
      return "Este módulo está ocupado ahora mismo.";
    default:
      return "Este módulo no está disponible ahora mismo.";
  }
}

export default function NfcFlow({
  moduleId,
  u,
  c,
  paymentIntent,
  redirectStatus,
  mockParam,
}: NfcFlowProps) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [moduleInfo, setModuleInfo] = useState<ModuleInfo | null>(null);
  const [session, setSession] = useState<SessionState | null>(null);
  const [opened, setOpened] = useState<OpenedInfo>({});
  const [failedMessage, setFailedMessage] = useState<string | undefined>();
  const [retryMode, setRetryMode] = useState<"unlock" | "pickup">("unlock");
  const [unavailable, setUnavailable] = useState<{
    message: string;
    alternatives: string[];
  }>({ message: "", alternatives: [] });
  const [errorMessage, setErrorMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [busy, setBusy] = useState(false);

  const confirmedPiId = useRef<string | null>(null);
  const started = useRef(false);

  const mockState = resolveMockState(mockParam);
  const mock = mockState !== null;

  const returnUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/m/${encodeURIComponent(moduleId)}?u=${encodeURIComponent(
          u ?? ""
        )}&c=${encodeURIComponent(c ?? "")}`
      : "";

  // --- acciones ---
  async function loadModule() {
    setPhase("loading");
    const r = await getModule(moduleId);
    if (r.ok && r.data) {
      if (r.data.module_status === "available") {
        setModuleInfo(r.data);
        setPhase("available");
      } else {
        setUnavailable({
          message: messageForStatus(r.data.module_status),
          alternatives: [],
        });
        setPhase("unavailable");
      }
      return;
    }
    if (r.status === 409) {
      setUnavailable({
        message:
          r.occupied?.message ||
          r.errorText ||
          "Este módulo está ocupado ahora mismo.",
        alternatives: r.occupied?.alternative_modules ?? [],
      });
      setPhase("unavailable");
      return;
    }
    setErrorMessage(
      r.status === 0
        ? "No hay conexión. Comprueba tu red e inténtalo de nuevo."
        : "No se pudo cargar el módulo. Inténtalo de nuevo."
    );
    setPhase("error");
  }

  async function doConfirm(sessionId: string, piId: string) {
    confirmedPiId.current = piId;
    setRetryMode("unlock");
    setPhase("confirming");
    const r = await confirmSession(sessionId, {
      stripe_payment_intent_id: piId,
    });
    if (r.ok && r.data) {
      if (r.data.module_opened) {
        setOpened({
          maxHours: r.data.max_duration_seconds
            ? Math.round(r.data.max_duration_seconds / 3600)
            : moduleInfo?.max_session_duration_hours,
          recoveryPhone: r.data.recovery_phone,
          recoveryUrl: r.data.recovery_instructions_url,
        });
        setPhase("opened");
      } else {
        setFailedMessage(r.data.message);
        setPhase("openFailed");
      }
      return;
    }
    setErrorMessage(r.errorText || "No se pudo confirmar el pago.");
    setPhase("error");
  }

  async function doCheckout(sessionId: string, pmId?: string) {
    if (!u || !c) {
      setPhase("waitTap");
      return;
    }
    setRetryMode("pickup");
    setPhase("checkout");
    const r = await checkoutSession(sessionId, {
      fingerprint: await getFingerprint(mock),
      u,
      c,
      ...(pmId ? { stripe_payment_method_id: pmId } : {}),
    });
    if (r.ok && r.data) {
      if (r.data.requires_payment_reauth && r.data.stripe_client_secret) {
        updateStoredPending(moduleId, "checkout");
        setSession((prev) => ({
          id: sessionId,
          clientSecret: r.data!.stripe_client_secret!,
          publishableKey: prev?.publishableKey || ENV_PK,
          amountCents: prev?.amountCents ?? moduleInfo?.deposit_amount_cents ?? 0,
          currency: prev?.currency ?? moduleInfo?.currency ?? "EUR",
        }));
        setPhase("reauth");
        return;
      }
      if (r.data.status === "completing" || r.data.module_opened) {
        clearStored(moduleId);
        setPhase("completing");
        return;
      }
      // timeout en checkout: módulo no abrió → reintento de recogida
      setFailedMessage(r.data.message);
      setPhase("openFailed");
      return;
    }
    if (r.status === 429) {
      setErrorMessage("Demasiados intentos. Espera unos segundos y reintenta.");
    } else {
      setErrorMessage(r.errorText || "No se pudo completar la recogida.");
    }
    setPhase("error");
  }

  async function onUnlock() {
    setBusy(true);
    setPhase("creatingSession");
    const r = await createSession({
      module_id: moduleId,
      fingerprint: await getFingerprint(mock),
      terms_accepted: true,
      terms_version: TERMS_VERSION,
      u,
      c,
    });
    setBusy(false);
    if (r.ok && r.data) {
      writeStored(moduleId, {
        session_id: r.data.session_id,
        expires_at: r.data.expires_at,
        pending: "confirm",
      });
      setSession({
        id: r.data.session_id,
        clientSecret: r.data.stripe_client_secret,
        publishableKey: r.data.stripe_publishable_key || ENV_PK,
        amountCents: r.data.deposit_amount_cents,
        currency: moduleInfo?.currency ?? "EUR",
      });
      setPhase("payment");
      return;
    }
    if (r.status === 403) {
      setErrorMessage("Este código no corresponde a este módulo.");
    } else if (r.status === 409) {
      setErrorMessage(
        r.occupied?.message || "Acerca el móvil al tag otra vez."
      );
    } else if (r.status === 429) {
      setErrorMessage("Demasiados intentos. Espera unos segundos y reintenta.");
    } else {
      setErrorMessage(r.errorText || "No se pudo iniciar la sesión.");
    }
    setPhase("error");
  }

  // --- mock ---
  function applyMock() {
    switch (mockState) {
      case "available":
        setModuleInfo(mockModule(moduleId).data);
        setPhase("available");
        break;
      case "unavailable": {
        const r = mockModuleOccupied(moduleId);
        setUnavailable({
          message: r.occupied?.message ?? "Ocupado",
          alternatives: r.occupied?.alternative_modules ?? [],
        });
        setPhase("unavailable");
        break;
      }
      case "payment": {
        const d = mockCreateSession().data!;
        setSession({
          id: d.session_id,
          clientSecret: d.stripe_client_secret,
          publishableKey: d.stripe_publishable_key,
          amountCents: d.deposit_amount_cents,
          currency: "EUR",
        });
        setPhase("payment");
        break;
      }
      case "opened": {
        const d = mockConfirmOpened().data!;
        setOpened({
          maxHours: d.max_duration_seconds
            ? Math.round(d.max_duration_seconds / 3600)
            : 3,
          recoveryPhone: d.recovery_phone,
          recoveryUrl: d.recovery_instructions_url,
        });
        setPhase("opened");
        break;
      }
      case "openfailed":
        setFailedMessage(mockConfirmFailed().data!.message);
        setRetryMode("unlock");
        setPhase("openFailed");
        break;
      case "reauth": {
        const d = mockCheckoutCompleting().data!;
        setSession({
          id: d.session_id,
          clientSecret: "mock_cs_reauth_456",
          publishableKey: "pk_test_mock",
          amountCents: 700,
          currency: "EUR",
        });
        setPhase("reauth");
        break;
      }
      case "checkout":
      case "completing":
        setPhase("completing");
        break;
      default:
        setPhase("loading");
    }
  }

  // --- init al montar ---
  useEffect(() => {
    if (started.current) return;
    started.current = true;

    if (mock) {
      applyMock();
      return;
    }

    if (!isApiConfigured() && !isMockEnabled()) {
      setErrorMessage(
        "Configuración pendiente: falta la URL del servicio. Vuelve a intentarlo más tarde."
      );
      setPhase("error");
      return;
    }

    // 1. Vuelta de redirect 3DS/SCA
    if (paymentIntent && redirectStatus) {
      const stored = readStored(moduleId);
      if (stored) {
        if (stored.pending === "checkout") {
          void doCheckout(stored.session_id);
        } else {
          void doConfirm(stored.session_id, paymentIntent);
        }
        return;
      }
      // Sesión perdida tras el redirect: informa y deja recargar.
      setErrorMessage(
        "Tu pago se procesó pero perdimos la referencia de la sesión. Acerca el móvil al tag otra vez."
      );
      setPhase("error");
      return;
    }

    // 2. Segundo tap (sesión activa en este dispositivo)
    const stored = readStored(moduleId);
    if (stored) {
      if (u && c) {
        void doCheckout(stored.session_id);
      } else {
        setPhase("waitTap");
      }
      return;
    }

    // 3. Primer tap
    void loadModule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- render ---
  function renderPhase() {
    switch (phase) {
      case "loading":
      case "creatingSession":
      case "confirming":
      case "checkout":
        return <LoadingView />;

      case "available":
        return moduleInfo ? (
          <AvailableView
            module={moduleInfo}
            termsAccepted={termsAccepted}
            onToggleTerms={setTermsAccepted}
            onUnlock={onUnlock}
            busy={busy}
          />
        ) : (
          <LoadingView />
        );

      case "unavailable":
        return (
          <UnavailableView
            message={unavailable.message}
            alternatives={unavailable.alternatives}
          />
        );

      case "payment":
      case "reauth":
        return session ? (
          <PaymentStep
            mock={mock}
            publishableKey={session.publishableKey}
            clientSecret={session.clientSecret}
            amountLabel={
              session.amountCents > 0
                ? formatMoney(session.amountCents, session.currency)
                : "el depósito"
            }
            returnUrl={returnUrl}
            submitLabel={phase === "reauth" ? "Autorizar de nuevo" : "Pagar y abrir"}
            onConfirmed={(piId, pmId) => {
              if (phase === "reauth") {
                void doCheckout(session.id, pmId);
              } else {
                void doConfirm(session.id, piId);
              }
            }}
          />
        ) : (
          <LoadingView />
        );

      case "opened":
        return (
          <OpenedView
            maxHours={opened.maxHours}
            recoveryPhone={opened.recoveryPhone}
            recoveryUrl={opened.recoveryUrl}
          />
        );

      case "openFailed":
        return (
          <OpenFailedView
            message={failedMessage}
            busy={false}
            onRetry={() => {
              if (!session) {
                void loadModule();
                return;
              }
              if (retryMode === "pickup") {
                void doCheckout(session.id);
              } else if (confirmedPiId.current) {
                void doConfirm(session.id, confirmedPiId.current);
              }
            }}
          />
        );

      case "completing":
        return <CompletingView />;

      case "waitTap":
        return <WaitTapView />;

      case "error":
        return (
          <ErrorView
            message={errorMessage}
            onRetry={() => {
              started.current = false;
              setErrorMessage("");
              void loadModule();
            }}
          />
        );

      default:
        return <LoadingView />;
    }
  }

  return <div className="w-full max-w-md">{renderPhase()}</div>;
}
