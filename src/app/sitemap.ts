import type { MetadataRoute } from "next";
import { BASE, SITE } from "./lib/informes";

// Páginas públicas y canónicas (sin parámetros). Fuera: /m y /help (noindex),
// /app (redirige a las tiendas), /beta, /console (demo estática) y /api.
// Sin lastModified: no hay una fecha de modificación fiable por página.
const RUTAS = [
  "/",
  "/info",
  "/contacto",
  "/3d",
  BASE,
  `${BASE}/ayuntamientos`,
  `${BASE}/empresas`,
  `${BASE}/campus`,
  `${BASE}/ejemplo`,
  `${BASE}/metodologia`,
  `${BASE}/ley-movilidad-sostenible`,
  `${BASE}/solicitar`,
  "/legal/aviso-legal",
  "/legal/privacidad",
  "/legal/terminos",
  "/legal/cookies",
  "/legal/borrar-cuenta",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return RUTAS.map((ruta) => ({ url: ruta === "/" ? SITE : `${SITE}${ruta}` }));
}
