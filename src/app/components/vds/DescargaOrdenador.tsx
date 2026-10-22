"use client";

import type { ReactNode } from "react";
import { useSyncExternalStore } from "react";

// Safari del iPad se presenta como un Mac: el servidor no puede distinguirlo.
// En el navegador sí (un «Mac» con pantalla táctil); ahí basta con App Store.
const sinCambios = () => () => {};
const esIpad = () => /Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1;

export default function DescargaOrdenador({
  ordenador,
  ipad,
}: {
  ordenador: ReactNode;
  ipad: ReactNode;
}) {
  const ipadComoMac = useSyncExternalStore(sinCambios, esIpad, () => false);
  return ipadComoMac ? ipad : ordenador;
}
