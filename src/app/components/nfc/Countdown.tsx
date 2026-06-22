"use client";

import { useEffect, useState } from "react";

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

/** Cuenta atrás hasta expires_at. Se actualiza cada segundo en cliente. */
export default function Countdown({ expiresAt }: { expiresAt: string }) {
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    setMs(remainingMs(expiresAt));
    const id = setInterval(() => setMs(remainingMs(expiresAt)), 1000);
    return () => clearInterval(id);
  }, [expiresAt]);

  // Antes de hidratar mostramos un placeholder estable (evita mismatch SSR).
  if (ms === null) return <span className="tabular-nums">--:--</span>;
  if (ms <= 0)
    return <span className="tabular-nums text-red-600">tiempo agotado</span>;

  return <span className="tabular-nums">{format(ms)}</span>;
}
