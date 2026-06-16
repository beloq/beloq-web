// Átomos de UI para el flujo NFC. Presentacionales (sin estado): se renderizan
// dentro de componentes cliente. Usan los tokens de marca de globals.css.

import type { ReactNode } from "react";

export function Spinner({ className = "" }: { className?: string }) {
  return (
    <span
      role="status"
      aria-label="Cargando"
      className={`inline-block h-5 w-5 animate-spin rounded-full border-2 border-beloq-dark/20 border-t-beloq-dark ${className}`}
    />
  );
}

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      {children}
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-beloq-yellow px-6 py-4 text-base font-bold text-beloq-dark transition-colors hover:bg-beloq-yellow-dark disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center rounded-full border-2 border-beloq-dark px-6 py-3 text-sm font-bold text-beloq-dark transition-colors hover:bg-beloq-dark hover:text-white"
    >
      {children}
    </button>
  );
}

type Tone = "available" | "busy" | "neutral";

export function StatusBadge({
  tone,
  children,
}: {
  tone: Tone;
  children: ReactNode;
}) {
  const styles: Record<Tone, string> = {
    available: "bg-green-100 text-green-700",
    busy: "bg-red-100 text-red-700",
    neutral: "bg-gray-100 text-gray-600",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${styles[tone]}`}
    >
      {children}
    </span>
  );
}

export function formatMoney(cents: number, currency: string): string {
  try {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: currency || "EUR",
      minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    }).format(cents / 100);
  } catch {
    return `${(cents / 100).toFixed(2)} ${currency || "EUR"}`;
  }
}

/** Bloque de éxito/aviso con icono grande (check o reloj). */
export function ResultIcon({ tone }: { tone: "success" | "warning" | "info" }) {
  const ring =
    tone === "success"
      ? "bg-beloq-yellow text-beloq-dark"
      : tone === "warning"
        ? "bg-red-100 text-red-600"
        : "bg-gray-100 text-gray-500";
  return (
    <div
      className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full ${ring}`}
    >
      {tone === "success" ? (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
    </div>
  );
}
