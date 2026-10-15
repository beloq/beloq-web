"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BASE } from "../../lib/informes";

const ENLACES = [
  { href: BASE, label: "El servicio" },
  { href: `${BASE}/ayuntamientos`, label: "Ayuntamientos" },
  { href: `${BASE}/empresas`, label: "Empresas" },
  { href: `${BASE}/campus`, label: "Campus y centros" },
  { href: `${BASE}/ejemplo`, label: "Ejemplo" },
  { href: `${BASE}/metodologia`, label: "Metodología" },
  { href: `${BASE}/ley-movilidad-sostenible`, label: "Ley de movilidad" },
];

/**
 * Navegación propia de /informes-movilidad, pegada bajo la cabecera del sitio.
 * En móvil se desplaza en horizontal; la página actual va marcada.
 */
export default function SubNav() {
  const pathname = usePathname().replace(/\/$/, "") || "/";
  const enSolicitar = pathname === `${BASE}/solicitar`;

  return (
    <nav
      aria-label="Informes de movilidad"
      className="sticky top-14 z-40 border-b border-gray-200 bg-white"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <ul className="-mx-1 flex flex-1 items-center gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
          {ENLACES.map((e) => {
            const actual = pathname === e.href;
            return (
              <li key={e.href} className="shrink-0">
                <Link
                  href={e.href}
                  aria-current={actual ? "page" : undefined}
                  className={`block whitespace-nowrap rounded-[0_12px_0_12px] px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beloq-dark ${
                    actual
                      ? "bg-beloq-yellow font-bold text-beloq-dark"
                      : "text-beloq-dark hover:bg-beloq-gray"
                  }`}
                >
                  {e.label}
                </Link>
              </li>
            );
          })}
          <li className="shrink-0 md:hidden">
            <Link
              href={`${BASE}/solicitar`}
              aria-current={enSolicitar ? "page" : undefined}
              className={`block whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ${
                enSolicitar ? "bg-beloq-yellow text-beloq-dark" : "bg-beloq-dark text-white"
              }`}
            >
              Solicitar
            </Link>
          </li>
        </ul>
        <Link
          href={`${BASE}/solicitar`}
          aria-current={enSolicitar ? "page" : undefined}
          className={`hidden shrink-0 rounded-full px-5 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beloq-dark md:inline-block ${
            enSolicitar
              ? "bg-beloq-yellow text-beloq-dark"
              : "bg-beloq-dark text-white hover:bg-black"
          }`}
        >
          Solicitar
        </Link>
      </div>
    </nav>
  );
}
