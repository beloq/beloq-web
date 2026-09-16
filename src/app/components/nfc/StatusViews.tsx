// Vistas presentacionales por estado del flujo NFC. Controladas por NfcFlow.

import Link from "next/link";
import type { ModuleInfo } from "../../lib/nfc-types";
import Countdown from "./Countdown";
import {
  Card,
  PrimaryButton,
  ResultIcon,
  SecondaryButton,
  Spinner,
  StatusBadge,
  formatMoney,
} from "./ui";

function hasPhone(p?: string): p is string {
  return !!p && p.trim().length > 0;
}

/** Bloque de contacto de soporte. Muestra el teléfono solo si no está vacío;
 *  la URL de instrucciones siempre se muestra como fallback si existe. */
function SupportContact({ phone, url }: { phone?: string; url?: string }) {
  const showPhone = hasPhone(phone);
  if (!showPhone && !url) return null;
  return (
    <div className="rounded-xl bg-beloq-gray p-4 text-center text-sm text-gray-600">
      ¿Necesitas ayuda?{" "}
      {showPhone && (
        <>
          Llama al{" "}
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="font-bold text-beloq-dark underline"
          >
            {phone}
          </a>
        </>
      )}
      {url && (
        <>
          {showPhone ? " o consulta " : "Consulta "}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-beloq-dark underline"
          >
            las instrucciones
          </a>
        </>
      )}
      .
    </div>
  );
}

export function LoadingView() {
  return (
    <Card>
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <Spinner className="h-8 w-8" />
        <p className="text-sm text-gray-500">Comprobando el módulo…</p>
      </div>
    </Card>
  );
}

export function AvailableView({
  module,
  termsAccepted,
  onToggleTerms,
  onUnlock,
  busy,
}: {
  module: ModuleInfo;
  termsAccepted: boolean;
  onToggleTerms: (v: boolean) => void;
  onUnlock: () => void;
  busy: boolean;
}) {
  const amount = formatMoney(module.deposit_amount_cents, module.currency);
  const termsHref = module.terms_url || "/legal/terminos";
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-beloq-dark">
          {module.module_name}
        </h1>
        <StatusBadge tone="available">Disponible</StatusBadge>
      </div>

      <p className="mb-6 leading-relaxed text-gray-600">
        Usa beloq hasta{" "}
        <strong className="text-beloq-dark">
          {module.max_session_duration_hours}h
        </strong>{" "}
        con un depósito de{" "}
        <strong className="text-beloq-dark">{amount}</strong> que se te{" "}
        <strong className="text-beloq-dark">devuelve</strong> al terminar.
      </p>

      <label className="mb-6 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => onToggleTerms(e.target.checked)}
          className="mt-0.5 h-5 w-5 flex-shrink-0 accent-beloq-yellow"
        />
        <span className="text-sm text-gray-600">
          He leído y acepto los{" "}
          <Link
            href={termsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-beloq-yellow-dark underline"
          >
            términos y condiciones
          </Link>
          .
        </span>
      </label>

      <PrimaryButton onClick={onUnlock} disabled={!termsAccepted || busy}>
        {busy ? <Spinner /> : "Desbloquear"}
      </PrimaryButton>
    </Card>
  );
}

export function UnavailableView({
  message,
  alternatives,
}: {
  message: string;
  alternatives: string[];
}) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-beloq-dark">Módulo no disponible</h1>
        <StatusBadge tone="busy">Ocupado</StatusBadge>
      </div>
      <p className="mb-6 leading-relaxed text-gray-600">{message}</p>

      {alternatives.length > 0 && (
        <div className="mb-6">
          <p className="mb-2 text-sm font-bold text-beloq-dark">
            Módulos libres cerca:
          </p>
          <ul className="flex flex-wrap gap-2">
            {alternatives.map((id) => (
              <li key={id}>
                <Link
                  href={`/m/${id}`}
                  className="inline-block rounded-full bg-beloq-gray px-4 py-2 text-sm font-bold text-beloq-dark transition-colors hover:bg-beloq-yellow"
                >
                  {id}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        href="/help/recovery"
        className="text-sm font-bold text-beloq-yellow-dark underline"
      >
        ¿Es tu sesión? Recupérala
      </Link>
    </Card>
  );
}

export function OpenedView({
  maxHours,
  recoveryPhone,
  recoveryUrl,
}: {
  maxHours?: number;
  recoveryPhone?: string;
  recoveryUrl?: string;
}) {
  return (
    <Card>
      <ResultIcon tone="success" />
      <h1 className="mb-2 text-center text-2xl font-bold text-beloq-dark">
        ¡Abierto!
      </h1>
      <p className="mb-6 text-center leading-relaxed text-gray-600">
        Tienes{" "}
        <strong className="text-beloq-dark">
          {maxHours ? `${maxHours} horas` : "tu tiempo de uso"}
        </strong>
        . Cuando vuelvas, acerca el móvil al tag para recoger y liberar tu
        depósito.
      </p>

      <SupportContact phone={recoveryPhone} url={recoveryUrl} />
    </Card>
  );
}

export function ActiveSessionView({
  expiresAt,
  maxHours,
  recoveryPhone,
  recoveryUrl,
  canPickup,
  onPickup,
  busy,
}: {
  expiresAt?: string;
  maxHours?: number;
  recoveryPhone?: string;
  recoveryUrl?: string;
  canPickup: boolean;
  onPickup: () => void;
  busy: boolean;
}) {
  return (
    <Card>
      <ResultIcon tone="success" />
      <h1 className="mb-2 text-center text-2xl font-bold text-beloq-dark">
        Tu vehículo está guardado
      </h1>
      {expiresAt ? (
        <p className="mb-4 text-center text-gray-600">
          Tiempo restante:{" "}
          <strong className="text-beloq-dark text-lg">
            <Countdown expiresAt={expiresAt} />
          </strong>
        </p>
      ) : maxHours ? (
        <p className="mb-4 text-center text-gray-600">
          Tienes <strong className="text-beloq-dark">{maxHours} horas</strong>.
        </p>
      ) : null}

      {canPickup ? (
        <>
          <p className="mb-6 text-center leading-relaxed text-gray-600">
            Cuando quieras, recoge tu vehículo y libera tu depósito.
          </p>
          <PrimaryButton onClick={onPickup} disabled={busy}>
            {busy ? <Spinner /> : "Recoger y liberar depósito"}
          </PrimaryButton>
        </>
      ) : (
        <p className="mb-6 text-center leading-relaxed text-gray-600">
          Para recoger, acerca el móvil al tag del módulo otra vez.
        </p>
      )}

      <div className="mt-4">
        <SupportContact phone={recoveryPhone} url={recoveryUrl} />
      </div>
    </Card>
  );
}

export function RecoveryView({
  title,
  message,
  recoveryPhone,
  recoveryUrl,
}: {
  title?: string;
  message: string;
  recoveryPhone?: string;
  recoveryUrl?: string;
}) {
  return (
    <Card>
      <ResultIcon tone="info" />
      <h1 className="mb-2 text-center text-xl font-bold text-beloq-dark">
        {title || "Necesitamos ayudarte con tu sesión"}
      </h1>
      <p className="mb-6 text-center leading-relaxed text-gray-600">{message}</p>
      <SupportContact phone={recoveryPhone} url={recoveryUrl} />
    </Card>
  );
}

export function MaintenanceView({
  message,
  recoveryPhone,
  recoveryUrl,
  alternatives,
}: {
  message: string;
  recoveryPhone?: string;
  recoveryUrl?: string;
  alternatives: string[];
}) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-beloq-dark">Módulo en revisión</h1>
        <StatusBadge tone="neutral">Mantenimiento</StatusBadge>
      </div>
      <p className="mb-6 leading-relaxed text-gray-600">{message}</p>

      <div className="mb-6">
        <SupportContact phone={recoveryPhone} url={recoveryUrl} />
      </div>

      {alternatives.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-bold text-beloq-dark">
            ¿Solo buscas aparcar? Módulos libres cerca:
          </p>
          <ul className="flex flex-wrap gap-2">
            {alternatives.map((id) => (
              <li key={id}>
                <Link
                  href={`/m/${id}`}
                  className="inline-block rounded-full bg-beloq-gray px-4 py-2 text-sm font-bold text-beloq-dark transition-colors hover:bg-beloq-yellow"
                >
                  {id}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}

export function OpenFailedView({
  message,
  onRetry,
  busy,
  expiresAt,
}: {
  message?: string;
  onRetry: () => void;
  busy: boolean;
  expiresAt?: string;
}) {
  return (
    <Card>
      <ResultIcon tone="warning" />
      <h1 className="mb-2 text-center text-xl font-bold text-beloq-dark">
        El módulo no respondió
      </h1>
      <p className="mb-4 text-center leading-relaxed text-gray-600">
        {message || "No se te ha cobrado nada. Vuelve a intentarlo."}
      </p>
      {expiresAt && (
        <p className="mb-6 text-center text-sm text-gray-500">
          Si no reintentas, el depósito se libera solo en{" "}
          <strong className="text-beloq-dark">
            <Countdown expiresAt={expiresAt} />
          </strong>
          .
        </p>
      )}
      <PrimaryButton onClick={onRetry} disabled={busy}>
        {busy ? <Spinner /> : "Reintentar"}
      </PrimaryButton>
    </Card>
  );
}

export function InUseByOtherView({
  message,
  until,
}: {
  message: string;
  until?: string;
}) {
  return (
    <Card>
      <ResultIcon tone="info" />
      <h1 className="mb-2 text-center text-xl font-bold text-beloq-dark">
        Módulo en uso por otra persona
      </h1>
      <p className="mb-4 text-center leading-relaxed text-gray-600">{message}</p>
      {until && (
        <p className="mb-4 text-center text-sm text-gray-500">
          Vuelve a intentarlo en{" "}
          <strong className="text-beloq-dark">
            <Countdown expiresAt={until} />
          </strong>
          .
        </p>
      )}
      <p className="text-center text-sm text-gray-500">
        Cuando quede libre, acerca el móvil al tag del módulo otra vez.
      </p>
    </Card>
  );
}

export function WaitTapView() {
  return (
    <Card>
      <ResultIcon tone="info" />
      <h1 className="mb-2 text-center text-xl font-bold text-beloq-dark">
        Tienes una sesión activa
      </h1>
      <p className="text-center leading-relaxed text-gray-600">
        Para recoger y liberar tu depósito,{" "}
        <strong className="text-beloq-dark">
          acerca el móvil al tag del módulo
        </strong>{" "}
        otra vez.
      </p>
    </Card>
  );
}

export function CompletingView() {
  return (
    <Card>
      <ResultIcon tone="success" />
      <h1 className="mb-2 text-center text-xl font-bold text-beloq-dark">
        Recogida en curso
      </h1>
      <p className="text-center leading-relaxed text-gray-600">
        Todo correcto. Tu depósito se está liberando y volverá a tu método de
        pago.
      </p>
    </Card>
  );
}

export function ErrorView({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <Card>
      <ResultIcon tone="warning" />
      <h1 className="mb-2 text-center text-xl font-bold text-beloq-dark">
        Algo no ha ido bien
      </h1>
      <p className="mb-6 text-center leading-relaxed text-gray-600">{message}</p>
      {onRetry && (
        <SecondaryButton onClick={onRetry}>Reintentar</SecondaryButton>
      )}
    </Card>
  );
}
