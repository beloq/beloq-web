"use client";

import { useEffect, useRef, useState } from "react";
import {
  checkoutSession,
  confirmSession,
  createSession,
  getModule,
  isApiConfigured,
  resumeModule,
} from "../../lib/nfc-api";
import {
  isMockEnabled,
  mockCheckoutCompleting,
  mockConfirmFailed,
  mockConfirmOpened,
  mockCreateSession,
  mockModule,
  mockModuleMaintenance,
  mockModuleOccupied,
  mockResumeActive,
  mockResumePending,
  mockResumeRecovery,
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
  ActiveSessionView,
  AvailableView,
  CompletingView,
  ErrorView,
  LoadingView,
  MaintenanceView,
  OpenFailedView,
  OpenedView,
  RecoveryView,
  UnavailableView,
  WaitTapView,
} from "./StatusViews";
import { formatMoney } from "./ui";

type Phase =
  | "loading"
  | "resuming"
  | "available"
  | "unavailable"
  | "maintenance"
  | "creatingSession"
  | "payment"
  | "confirming"
  | "opened"
  | "openFailed"
  | "checkout"
  | "completing"
  | "reauth"
  | "waitTap"
  | "activeRestored"
  | "recoveryPending"
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

interface ActiveInfo {
  expiresAt?: string;
  maxHours?: number;
  recoveryPhone?: string;
  recoveryUrl?: string;
}

interface RecoveryInfo {
  title?: string;
  message: string;
  recoveryPhone?: string;
  recoveryUrl?: string;
}

interface MaintenanceInfo {
  message: string;
  recoveryPhone?: string;
  recoveryUrl?: string;
  alternatives: string[];
}

const RESUME_RETRY_MAX = 5;
const RESUME_RETRY_DELAY_MS = 800;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

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

const FP_STORAGE_KEY = "beloq:fp";
let fpPromise: Promise<string> | null = null;

async function computeFingerprint(): Promise<string> {
  try {
    const FP = (await import("@fingerprintjs/fingerprintjs")).default;
    const agent = await FP.load();
    return (await agent.get()).visitorId;
  } catch {
    try {
      return crypto.randomUUID();
    } catch {
      return `fp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    }
  }
}

/**
 * Huella ESTABLE por perfil de navegador: se calcula una vez y se persiste en
 * localStorage, así no cambia entre pestañas ni recargas del mismo navegador
 * (evita reautorizaciones espurias). Incógnito u otro navegador → otra huella
 * (reautorización, que ahora sí funciona con la clave del backend).
 */
async function getFingerprint(mock: boolean): Promise<string> {
  if (mock) return "fp_mock";
  try {
    const stored = window.localStorage.getItem(FP_STORAGE_KEY);
    if (stored) return stored;
  } catch {
    /* localStorage no disponible: calculamos en memoria */
  }
  if (!fpPromise) {
    fpPromise = computeFingerprint().then((id) => {
      try {
        window.localStorage.setItem(FP_STORAGE_KEY, id);
      } catch {
        /* no-op */
      }
      return id;
    });
  }
  return fpPromise;
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
  const [activeInfo, setActiveInfo] = useState<ActiveInfo>({});
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [recoveryInfo, setRecoveryInfo] = useState<RecoveryInfo>({
    message: "",
  });
  const [maintenanceInfo, setMaintenanceInfo] = useState<MaintenanceInfo>({
    message: "",
    alternatives: [],
  });
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
  const errorRetry = useRef<(() => void) | null>(null);
  const reauthAttempts = useRef(0);

  const mockState = resolveMockState(mockParam);
  const mock = mockState !== null;

  const returnUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/m/${encodeURIComponent(moduleId)}?u=${encodeURIComponent(
          u ?? ""
        )}&c=${encodeURIComponent(c ?? "")}`
      : "";

  function goError(message: string, retry?: () => void) {
    setErrorMessage(message);
    errorRetry.current = retry ?? null;
    setPhase("error");
  }

  // --- acciones ---
  async function loadModule() {
    setPhase("loading");
    const r = await getModule(moduleId, u, c);
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
      const occ = r.occupied;
      if (occ?.module_status === "maintenance") {
        setMaintenanceInfo({
          message: occ.message || "Este módulo está en revisión.",
          recoveryPhone: occ.recovery_phone,
          recoveryUrl: occ.recovery_instructions_url,
          alternatives: occ.alternative_modules ?? [],
        });
        setPhase("maintenance");
        return;
      }
      setUnavailable({
        message:
          occ?.message ||
          r.errorText ||
          "Este módulo está ocupado ahora mismo.",
        alternatives: occ?.alternative_modules ?? [],
      });
      setPhase("unavailable");
      return;
    }
    goError(
      r.status === 0
        ? "No hay conexión. Comprueba tu red e inténtalo de nuevo."
        : "No se pudo cargar el módulo. Inténtalo de nuevo.",
      () => void loadModule()
    );
  }

  async function resumeFlow() {
    setPhase("resuming");
    if (!u || !c) {
      void loadModule();
      return;
    }
    const fp = await getFingerprint(mock);

    for (let attempt = 0; attempt < RESUME_RETRY_MAX; attempt++) {
      const r = await resumeModule(moduleId, { fingerprint: fp, u, c });

      if (r.status === 403) {
        goError("Este código no corresponde a este módulo.");
        return;
      }
      if (!r.ok || !r.data) {
        goError(
          r.status === 0
            ? "No hay conexión. Comprueba tu red e inténtalo de nuevo."
            : "No se pudo recuperar tu sesión. Inténtalo de nuevo.",
          () => void resumeFlow()
        );
        return;
      }

      const d = r.data;

      if (!d.has_session) {
        // No hay sesión recuperable: ahora sí, flujo normal.
        void loadModule();
        return;
      }

      // Reautorización: el backend pide volver a autorizar el depósito (huella
      // distinta). La clave publicable SIEMPRE sale de esta respuesta de resume.
      if (d.requires_payment_reauth) {
        if (!d.stripe_client_secret || !d.stripe_publishable_key) {
          goError(
            "No se pudo iniciar la reautorización del pago. Inténtalo de nuevo.",
            () => void resumeFlow()
          );
          return;
        }
        if (d.session_id) {
          writeStored(moduleId, {
            session_id: d.session_id,
            expires_at: d.expires_at ?? "",
            pending: "checkout",
          });
        }
        setSession({
          id: d.session_id ?? "",
          clientSecret: d.stripe_client_secret,
          publishableKey: d.stripe_publishable_key,
          amountCents: 0,
          currency: "EUR",
        });
        setPhase("reauth");
        return;
      }

      if (d.status === "recovery_pending") {
        setRecoveryInfo({
          title: "Incidencia con tu sesión",
          message:
            d.message ||
            "Hubo una incidencia con tu vehículo dentro. Está protegido; contacta con soporte para que te lo abramos.",
          recoveryPhone: d.recovery_phone,
          recoveryUrl: d.recovery_instructions_url,
        });
        setPhase("recoveryPending");
        return;
      }

      if (d.status === "active") {
        if (d.session_id && d.expires_at) {
          writeStored(moduleId, {
            session_id: d.session_id,
            expires_at: d.expires_at,
          });
        }
        setActiveSessionId(d.session_id ?? null);
        setActiveInfo({
          expiresAt: d.expires_at,
          maxHours: d.max_duration_seconds
            ? Math.round(d.max_duration_seconds / 3600)
            : undefined,
          recoveryPhone: d.recovery_phone,
          recoveryUrl: d.recovery_instructions_url,
        });
        setPhase("activeRestored");
        return;
      }

      if (
        d.status === "pending_payment" ||
        d.status === "hold_authorized_pending_unlock"
      ) {
        // Ventana sub-segundo: el pago aún se está creando → reintenta resume,
        // NUNCA crear sesión nueva (sería reabrir P1).
        if (!d.stripe_client_secret) {
          if (attempt < RESUME_RETRY_MAX - 1) {
            await delay(RESUME_RETRY_DELAY_MS);
            continue;
          }
          goError(
            "Estamos preparando tu pago. Espera unos segundos y reinténtalo.",
            () => void resumeFlow()
          );
          return;
        }
        if (!d.stripe_publishable_key) {
          goError(
            "No se pudo iniciar el pago (falta configuración). Inténtalo de nuevo.",
            () => void resumeFlow()
          );
          return;
        }
        if (d.session_id) {
          writeStored(moduleId, {
            session_id: d.session_id,
            expires_at: d.expires_at ?? "",
            pending: "confirm",
          });
        }
        setSession({
          id: d.session_id ?? "",
          clientSecret: d.stripe_client_secret,
          publishableKey: d.stripe_publishable_key,
          amountCents: 0,
          currency: "EUR",
        });
        setPhase("payment");
        return;
      }

      // Estados terminales u otros (completed_ok, expired_*, blocked_user_pending):
      // sin acción de cliente → cargar el módulo (estado actual).
      void loadModule();
      return;
    }
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
    goError(r.errorText || "No se pudo confirmar el pago.", () =>
      void doConfirm(sessionId, piId)
    );
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
        // Evita bucle reauth→checkout→reauth: como mucho una reautorización.
        if (reauthAttempts.current >= 1) {
          setRecoveryInfo({
            title: "No pudimos verificar el pago",
            message:
              "No hemos podido reautorizar el depósito. Contacta con soporte para recoger tu vehículo y liberar el depósito.",
            recoveryUrl: "/help/recovery",
          });
          setPhase("recoveryPending");
          return;
        }
        if (!r.data.stripe_publishable_key) {
          goError(
            "No se pudo reautorizar el pago (falta configuración). Inténtalo de nuevo.",
            () => void doCheckout(sessionId)
          );
          return;
        }
        reauthAttempts.current += 1;
        updateStoredPending(moduleId, "checkout");
        // La clave publicable sale SIEMPRE de esta respuesta de checkout.
        setSession({
          id: sessionId,
          clientSecret: r.data.stripe_client_secret,
          publishableKey: r.data.stripe_publishable_key,
          amountCents: moduleInfo?.deposit_amount_cents ?? 0,
          currency: moduleInfo?.currency ?? "EUR",
        });
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
    // 409 = sesión no activa / caducada / replay del contador → TERMINAL.
    // Nunca reintentar checkout en bucle: limpiar la sesión guardada y pedir
    // un nuevo toque del tag.
    if (r.status === 409) {
      clearStored(moduleId);
      goError(
        r.errorText ||
          "Tu sesión ha caducado. Acerca el móvil al tag para empezar de nuevo.",
        () => void loadModule()
      );
      return;
    }
    if (r.status === 429) {
      goError(
        "Demasiados intentos. Espera unos segundos y reintenta.",
        () => void doCheckout(sessionId)
      );
      return;
    }
    goError(
      r.errorText || "No se pudo completar la recogida.",
      () => void doCheckout(sessionId)
    );
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
      if (!r.data.stripe_client_secret || !r.data.stripe_publishable_key) {
        goError(
          "No se pudo iniciar el pago (falta configuración). Inténtalo de nuevo.",
          () => void resumeFlow()
        );
        return;
      }
      setSession({
        id: r.data.session_id,
        clientSecret: r.data.stripe_client_secret,
        publishableKey: r.data.stripe_publishable_key,
        amountCents: r.data.deposit_amount_cents,
        currency: moduleInfo?.currency ?? "EUR",
      });
      setPhase("payment");
      return;
    }
    if (r.status === 403) {
      goError("Este código no corresponde a este módulo.", () => void loadModule());
    } else if (r.status === 409) {
      goError(
        r.occupied?.message || "Acerca el móvil al tag otra vez.",
        () => void loadModule()
      );
    } else if (r.status === 429) {
      goError(
        "Demasiados intentos. Espera unos segundos y reintenta.",
        () => void loadModule()
      );
    } else {
      goError(r.errorText || "No se pudo iniciar la sesión.", () =>
        void loadModule()
      );
    }
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
      case "maintenance": {
        const r = mockModuleMaintenance(moduleId);
        setMaintenanceInfo({
          message: r.occupied?.message ?? "En revisión",
          recoveryPhone: r.occupied?.recovery_phone,
          recoveryUrl: r.occupied?.recovery_instructions_url,
          alternatives: r.occupied?.alternative_modules ?? [],
        });
        setPhase("maintenance");
        break;
      }
      case "payment":
      case "resumepay": {
        const d =
          mockState === "resumepay"
            ? mockResumePending().data!
            : mockCreateSession().data!;
        setSession({
          id: d.session_id!,
          clientSecret: d.stripe_client_secret!,
          publishableKey: d.stripe_publishable_key!,
          amountCents:
            "deposit_amount_cents" in d ? d.deposit_amount_cents : 700,
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
      case "active": {
        const d = mockResumeActive().data!;
        setActiveSessionId(d.session_id ?? null);
        setActiveInfo({
          expiresAt: d.expires_at,
          maxHours: d.max_duration_seconds
            ? Math.round(d.max_duration_seconds / 3600)
            : undefined,
          recoveryPhone: d.recovery_phone,
          recoveryUrl: d.recovery_instructions_url,
        });
        setPhase("activeRestored");
        break;
      }
      case "recovery": {
        const d = mockResumeRecovery().data!;
        setRecoveryInfo({
          title: "Incidencia con tu sesión",
          message: d.message || "Contacta con soporte.",
          recoveryPhone: d.recovery_phone,
          recoveryUrl: d.recovery_instructions_url,
        });
        setPhase("recoveryPending");
        break;
      }
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
      goError(
        "Configuración pendiente: falta la URL del servicio. Vuelve a intentarlo más tarde."
      );
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
      // Sesión perdida tras el redirect: recupérala vía /resume (no crear nueva).
      if (u && c) {
        void resumeFlow();
        return;
      }
      goError(
        "Tu pago se procesó pero perdimos la referencia de la sesión. Acerca el móvil al tag otra vez."
      );
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

    // 3. Sin sesión local: intentar recuperar antes de crear (P1).
    if (u && c) {
      void resumeFlow();
      return;
    }

    // 4. Primer tap manual sin contador: flujo normal.
    void loadModule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- render ---
  function renderPhase() {
    switch (phase) {
      case "loading":
      case "resuming":
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

      case "maintenance":
        return (
          <MaintenanceView
            message={maintenanceInfo.message}
            recoveryPhone={maintenanceInfo.recoveryPhone}
            recoveryUrl={maintenanceInfo.recoveryUrl}
            alternatives={maintenanceInfo.alternatives}
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

      case "activeRestored":
        return (
          <ActiveSessionView
            expiresAt={activeInfo.expiresAt}
            maxHours={activeInfo.maxHours}
            recoveryPhone={activeInfo.recoveryPhone}
            recoveryUrl={activeInfo.recoveryUrl}
            canPickup={mock || (!!u && !!c)}
            busy={false}
            onPickup={() => {
              if (mock) {
                setPhase("completing");
                return;
              }
              if (activeSessionId) void doCheckout(activeSessionId);
            }}
          />
        );

      case "recoveryPending":
        return (
          <RecoveryView
            title={recoveryInfo.title}
            message={recoveryInfo.message}
            recoveryPhone={recoveryInfo.recoveryPhone}
            recoveryUrl={recoveryInfo.recoveryUrl}
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
              setErrorMessage("");
              if (errorRetry.current) {
                errorRetry.current();
              } else {
                started.current = false;
                void loadModule();
              }
            }}
          />
        );

      default:
        return <LoadingView />;
    }
  }

  return <div className="w-full max-w-md">{renderPhase()}</div>;
}
