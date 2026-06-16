"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Decide si una ruta debe mostrarse SIN el chrome de marketing (Navbar/Footer).
 * Las pantallas transaccionales del flujo NFC (/m) y la ayuda (/help) van limpias.
 */
function isBareRoute(pathname: string): boolean {
  return pathname.startsWith("/m/") || pathname.startsWith("/help");
}

/**
 * Envuelve el contenido del sitio. En rutas de marketing mantiene Navbar + main
 * + Footer (idéntico al layout raíz anterior). En /m y /help no añade chrome: la
 * pantalla la controla su propio layout. usePathname() resuelve en SSR, así que
 * el HTML del servidor ya viene sin chrome en esas rutas (sin parpadeo).
 */
export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (isBareRoute(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
