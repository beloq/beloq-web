"use client";

import { useSyncExternalStore } from "react";

function remainingMs(expiresAt: string): number {
  const t = new Date(expiresAt).getTime();
  if (Number.isNaN(t)) return 0;
  return Math.max(0, t - Date.now());
}

function format(ms: number): string {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

function cadaSegundo(onChange: () => void) {
  const id = window.setInterval(onChange, 1000);
  return () => window.clearInterval(id);
}

/** El texto de la cuenta atrás, o null si ya se ha agotado. */
function restante(expiresAt: string): string | null {
  const ms = remainingMs(expiresAt);
  return ms > 0 ? format(ms) : null;
}

/** Cuenta atrás hasta expires_at. Se actualiza cada segundo en cliente. */
export default function Countdown({ expiresAt }: { expiresAt: string }) {
  // undefined en el servidor y al hidratar: placeholder estable (evita mismatch SSR).
  const texto = useSyncExternalStore<string | null | undefined>(
    cadaSegundo,
    () => restante(expiresAt),
    () => undefined,
  );

  if (texto === undefined) return <span className="tabular-nums">--:--</span>;
  if (texto === null)
    return <span className="tabular-nums text-red-600">tiempo agotado</span>;

  return <span className="tabular-nums">{texto}</span>;
}
