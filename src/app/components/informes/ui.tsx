import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Check, ChevronDown, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { BASE, IDENTIDAD, SITE, jsonLd } from "../../lib/informes";

// Piezas comunes de /informes-movilidad. Estilo del Design System de beloq:
// amarillo #FFEC36, gris oscuro #3C3C3B, Montserrat, esquinas asimétricas
// (0 24px 0 24px), iconos de línea y sin degradados ni desenfoques.

const FOCO =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beloq-dark";

export function Contenedor({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

type Variante = "oscuro" | "amarillo" | "borde" | "borde-claro";

const VARIANTES: Record<Variante, string> = {
  oscuro: "bg-beloq-dark text-white hover:bg-black",
  amarillo: "bg-beloq-yellow text-beloq-dark hover:bg-beloq-yellow-dark",
  borde:
    "border-2 border-beloq-dark text-beloq-dark hover:bg-beloq-dark hover:text-white",
  "borde-claro":
    "border-2 border-white text-white hover:bg-white hover:text-beloq-dark",
};

export function Boton({
  href,
  children,
  variante = "oscuro",
  icono = true,
}: {
  href: string;
  children: ReactNode;
  variante?: Variante;
  icono?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-sm font-bold transition-colors sm:text-base ${VARIANTES[variante]} ${FOCO}`}
    >
      {children}
      {icono && <ArrowRight aria-hidden className="h-4 w-4 shrink-0" />}
    </Link>
  );
}

/** Enlace de texto con flecha, para «leer más» dentro de una tarjeta. */
export function EnlaceFlecha({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  // La flecha va en línea con la última palabra aunque el texto salte de línea.
  return (
    <Link href={href} className={`group font-bold text-beloq-dark ${FOCO}`}>
      <span className="underline decoration-beloq-yellow decoration-2 underline-offset-4 transition-colors group-hover:decoration-beloq-dark">
        {children}
      </span>
      <ArrowRight aria-hidden className="ml-1.5 inline h-4 w-4 align-[-0.15em]" />
    </Link>
  );
}

export interface Miga {
  label: string;
  href?: string;
}

/** Migas de pan visibles + su BreadcrumbList (mismo contenido). */
export function Migas({ items }: { items: Miga[] }) {
  const todas: Miga[] = [
    { label: "beloq", href: "/" },
    { label: "Informes de movilidad", href: BASE },
    ...items,
  ];
  const datos = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: todas.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.label,
      ...(m.href ? { item: `${SITE}${m.href === "/" ? "" : m.href}` } : {}),
    })),
  };
  return (
    <nav aria-label="Migas de pan" className="text-sm text-beloq-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(datos) }}
      />
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {todas.map((m, i) => (
          <li key={m.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight aria-hidden className="h-3.5 w-3.5" />}
            {m.href && i < todas.length - 1 ? (
              <Link href={m.href} className={`underline-offset-4 hover:underline ${FOCO}`}>
                {m.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-bold">
                {m.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Cabecera amarilla de cada página de la sección. */
export function Cabecera({
  migas,
  titulo,
  entradilla,
  acciones,
  indice,
  children,
}: {
  migas: Miga[];
  titulo: ReactNode;
  entradilla: ReactNode;
  acciones?: ReactNode;
  /** Anclas de la propia página («En esta página»). */
  indice?: { href: string; label: string }[];
  children?: ReactNode;
}) {
  return (
    <header className="bg-beloq-yellow pb-12 pt-8 sm:pb-16 sm:pt-10">
      <Contenedor>
        <Migas items={migas} />
        <h1 className="mt-6 max-w-4xl text-3xl font-bold leading-tight text-beloq-dark sm:text-5xl">
          {titulo}
        </h1>
        <div className="mt-5 max-w-3xl text-lg leading-relaxed text-beloq-dark">
          {entradilla}
        </div>
        {acciones && (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {acciones}
          </div>
        )}
        {children}
        {indice && indice.length > 0 && (
          <nav aria-label="En esta página" className="mt-8">
            <p className="text-xs font-bold uppercase tracking-wider text-beloq-dark">
              En esta página
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {indice.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    className={`inline-block rounded-[0_16px_0_16px] bg-white px-4 py-2 text-sm font-bold text-beloq-dark shadow-[0_2px_8px_rgba(0,0,0,0.10)] hover:underline ${FOCO}`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </Contenedor>
    </header>
  );
}

/** Bloque de contenido con título h2 y fondo blanco o gris. */
export function Seccion({
  id,
  titulo,
  intro,
  fondo = "blanco",
  children,
}: {
  id?: string;
  titulo: ReactNode;
  intro?: ReactNode;
  fondo?: "blanco" | "gris";
  children?: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-titulo` : undefined}
      className={`scroll-mt-32 py-14 sm:py-20 ${fondo === "gris" ? "bg-beloq-gray" : "bg-white"}`}
    >
      <Contenedor>
        <span
          aria-hidden
          className="block h-1.5 w-12 rounded-[0_6px_0_6px] bg-beloq-yellow"
        />
        <h2
          id={id ? `${id}-titulo` : undefined}
          className="mt-4 max-w-3xl text-2xl font-bold leading-tight text-beloq-dark sm:text-3xl"
        >
          {titulo}
        </h2>
        {intro && (
          <div className="mt-4 max-w-3xl space-y-3 text-base leading-relaxed text-gray-600 sm:text-lg">
            {intro}
          </div>
        )}
        {children && <div className="mt-10">{children}</div>}
      </Contenedor>
    </section>
  );
}

/** Cuadrado amarillo con icono (como las tarjetas de sectores de la portada). */
export function Insignia({ icono: Icono }: { icono: LucideIcon }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0_12px_0_12px] bg-beloq-yellow text-beloq-dark">
      <Icono aria-hidden className="h-5 w-5" strokeWidth={2} />
    </span>
  );
}

export function Tarjeta({
  children,
  tono = "blanca",
  className = "",
}: {
  children: ReactNode;
  /** «blanca» sobre fondo gris; «borde» sobre fondo blanco. */
  tono?: "blanca" | "borde" | "gris" | "oscura";
  className?: string;
}) {
  const t =
    tono === "oscura"
      ? "bg-beloq-dark text-white"
      : tono === "borde"
      ? "border border-gray-200 bg-white"
      : tono === "gris"
        ? "bg-beloq-gray"
        : "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]";
  return (
    <div className={`rounded-[0_24px_0_24px] p-6 sm:p-7 ${t} ${className}`}>
      {children}
    </div>
  );
}

/** Tarjeta con icono, título h3 y texto. */
export function TarjetaIcono({
  icono,
  titulo,
  children,
  tono,
  pie,
}: {
  icono: LucideIcon;
  titulo: ReactNode;
  children: ReactNode;
  tono?: "blanca" | "borde" | "gris";
  pie?: ReactNode;
}) {
  return (
    <Tarjeta tono={tono} className="flex h-full flex-col">
      <Insignia icono={icono} />
      <h3 className="mt-4 text-lg font-bold leading-snug text-beloq-dark">
        {titulo}
      </h3>
      <div className="mt-2 flex-1 space-y-2 text-sm leading-relaxed text-gray-600 sm:text-base">
        {children}
      </div>
      {pie && <div className="mt-5">{pie}</div>}
    </Tarjeta>
  );
}

export function ListaCheck({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-gray-600">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[0_6px_0_6px] bg-beloq-yellow text-beloq-dark">
            <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          <span className="leading-relaxed">{it}</span>
        </li>
      ))}
    </ul>
  );
}

/** Pasos numerados (lista ordenada real). */
export function Pasos({
  pasos,
}: {
  pasos: { titulo: ReactNode; texto: ReactNode }[];
}) {
  return (
    <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
      {pasos.map((p, i) => (
        <li key={i} className="flex gap-4 lg:flex-col">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0_12px_0_12px] bg-beloq-dark text-lg font-bold text-beloq-yellow">
            {i + 1}
          </span>
          <div>
            <h3 className="font-bold leading-snug text-beloq-dark">{p.titulo}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{p.texto}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Preguntas frecuentes con <details>: el texto está en el HTML aunque esté plegado. */
export function Preguntas({
  items,
}: {
  items: { pregunta: string; respuesta: ReactNode }[];
}) {
  return (
    <div className="divide-y divide-gray-200 border-y border-gray-200">
      {items.map((it) => (
        <details key={it.pregunta} className="group py-1">
          <summary
            className={`flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-left font-bold text-beloq-dark [&::-webkit-details-marker]:hidden ${FOCO}`}
          >
            <span>{it.pregunta}</span>
            <ChevronDown
              aria-hidden
              className="mt-0.5 h-5 w-5 shrink-0 transition-transform group-open:rotate-180"
            />
          </summary>
          <div className="space-y-3 pb-5 pr-9 leading-relaxed text-gray-600">
            {it.respuesta}
          </div>
        </details>
      ))}
    </div>
  );
}

/** Nota destacada (ejemplos ilustrativos, avisos de alcance). */
export function Nota({
  icono: Icono,
  titulo,
  children,
}: {
  icono: LucideIcon;
  titulo: ReactNode;
  children: ReactNode;
}) {
  return (
    <aside className="flex gap-4 rounded-[0_24px_0_24px] border-2 border-beloq-dark bg-white p-5 sm:p-6">
      <Icono aria-hidden className="mt-0.5 h-6 w-6 shrink-0 text-beloq-dark" />
      <div>
        <p className="font-bold text-beloq-dark">{titulo}</p>
        <div className="mt-1.5 space-y-2 text-sm leading-relaxed text-gray-600 sm:text-base">
          {children}
        </div>
      </div>
    </aside>
  );
}

/** Llamada a la acción final de cada página, sobre fondo oscuro. */
export function BandaCta({
  titulo,
  texto,
  href,
  boton,
  secundario,
}: {
  titulo: ReactNode;
  texto: ReactNode;
  href: string;
  boton: string;
  secundario?: { href: string; label: string };
}) {
  return (
    <section className="bg-beloq-dark py-14 text-white sm:py-20">
      <Contenedor>
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl">{titulo}</h2>
          <div className="mt-4 text-base leading-relaxed text-gray-300 sm:text-lg">
            {texto}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Boton href={href} variante="amarillo">
              {boton}
            </Boton>
            {secundario && (
              <Boton href={secundario.href} variante="borde-claro">
                {secundario.label}
              </Boton>
            )}
          </div>
        </div>
      </Contenedor>
    </section>
  );
}

/** Tabla con cabecera; en móvil se desplaza en horizontal dentro de su caja. */
export function Tabla({
  titulo,
  columnas,
  filas,
}: {
  titulo: string;
  columnas: string[];
  filas: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-[0_24px_0_24px] border border-gray-200 bg-white">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <caption className="sr-only">{titulo}</caption>
        <thead>
          <tr className="bg-beloq-dark text-white">
            {columnas.map((c) => (
              <th key={c} scope="col" className="px-4 py-3 font-bold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((f, i) => (
            <tr key={i} className="border-t border-gray-200 align-top">
              {f.map((celda, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="px-4 py-3 font-bold text-beloq-dark">
                    {celda}
                  </th>
                ) : (
                  <td key={j} className="px-4 py-3 leading-relaxed text-gray-600">
                    {celda}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Quién presta el servicio: identidad y contacto reales, en todas las páginas. */
export function Identidad() {
  return (
    <section aria-label="Quién presta el servicio" className="border-t border-gray-200 bg-white py-10">
      <Contenedor className="grid gap-6 text-sm leading-relaxed text-gray-600 md:grid-cols-[2fr_1fr]">
        <p>
          <strong className="text-beloq-dark">Quién presta el servicio.</strong>{" "}
          Los informes de movilidad los elabora {IDENTIDAD.razonSocial} (beloq), CIF{" "}
          {IDENTIDAD.cif}, {IDENTIDAD.direccion}, {IDENTIDAD.cp} {IDENTIDAD.ciudad}.
          beloq fabrica estaciones de aparcamiento seguro para bicicletas y
          patinetes:{" "}
          <Link href="/" className="font-bold text-beloq-dark underline underline-offset-4">
            conócelas en beloq.es
          </Link>
          .
        </p>
        <p>
          <strong className="text-beloq-dark">Contacto.</strong>{" "}
          <a
            href={`mailto:${IDENTIDAD.email}`}
            className="font-bold text-beloq-dark underline underline-offset-4"
          >
            {IDENTIDAD.email}
          </a>{" "}
          o el{" "}
          <Link
            href={`${BASE}/solicitar`}
            className="font-bold text-beloq-dark underline underline-offset-4"
          >
            formulario de solicitud
          </Link>
          .
        </p>
      </Contenedor>
    </section>
  );
}
