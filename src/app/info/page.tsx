import type { Metadata } from "next";
import InfoApps from "../components/info/InfoApps";
import InfoChat from "../components/info/InfoChat";
import InfoComo from "../components/info/InfoComo";
import InfoEstado from "../components/info/InfoEstado";
import InfoPreguntas from "../components/info/InfoPreguntas";
import { API_BASE, getPricing, getStations, getStatus } from "../lib/info";

// El estado y las estaciones cambian: se regenera como mucho cada 30 s, igual
// que la caché del servidor (BELOQ_INFO §2.2-2.3). Precios, cada 5 min.
export const revalidate = 30;

export const metadata: Metadata = {
  title: "beloq info · la app, cómo se aparca, estado y ayuda",
  description:
    "Delante de un beloq: descarga la app, mira cómo se aparca, comprueba si el sistema funciona, lee las preguntas frecuentes o escribe al equipo de beloq.",
  alternates: { canonical: "https://www.beloq.es/info" },
};

const SECCIONES = [
  { href: "#apps", label: "La app" },
  { href: "#como", label: "Cómo se aparca" },
  { href: "#estado", label: "Estado" },
  { href: "#preguntas", label: "Preguntas" },
  { href: "#chat", label: "Chat" },
];

export default async function InfoPage() {
  const [pricing, status, stations] = await Promise.all([
    getPricing(),
    getStatus(),
    getStations(),
  ]);

  return (
    <>
      <section className="bg-beloq-yellow pt-20 pb-8 sm:pt-28 sm:pb-12">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-4xl font-bold text-beloq-dark sm:text-5xl">
            beloq info
          </h1>
          <p className="mt-3 text-lg leading-snug text-beloq-dark">
            Todo lo que necesitas delante de un beloq: la app, cómo se aparca,
            si todo funciona y un chat con el equipo.
          </p>
          <nav aria-label="Secciones" className="mt-6 flex flex-wrap gap-2">
            {SECCIONES.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="rounded-[0_24px_0_24px] bg-white px-4 py-2 text-sm font-bold text-beloq-dark shadow-[0_2px_8px_rgba(0,0,0,0.10)] transition-colors duration-200 hover:underline"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <InfoApps />
      <InfoComo />
      <InfoEstado status={status} stations={stations} />
      <InfoPreguntas pricing={pricing} />
      <InfoChat apiBase={API_BASE} />
    </>
  );
}
