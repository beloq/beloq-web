import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PartyPopper } from "lucide-react";

// Columna del modo feria (beloq.es/3d?feria) en el VDS 2026: el anuncio de que
// beloq ya está en Google Play y App Store, con el código VDS2026 y el QR de
// beloq.es/vds (public/vds/qr-vds.svg, scripts/generar-qr-vds.mjs). Todo va
// dentro de la página (data URI): la tableta lo enseña también sin red.

/** Un fichero de public/ como data URI: va dentro de la página, sin otra descarga. */
export function dataUri(ruta: string, tipo: string) {
  return `data:${tipo};base64,${readFileSync(join(process.cwd(), "public", ruta)).toString("base64")}`;
}

// Quién nos acompaña y apoya (Medios graficos), en el orden que dio Jesús.
// Solo recortados los márgenes vacíos: colores y proporciones originales.
const APOYOS = [
  { ruta: "images/apoyos/camara-ceuta.png", tipo: "image/png", alt: "Cámara Ceuta", alto: "h-8" },
  {
    ruta: "images/apoyos/sandbox-valencia.png",
    tipo: "image/png",
    alt: "Ajuntament de València, València Innovation Capital y sandbox València",
    alto: "h-6",
  },
  {
    ruta: "images/apoyos/startupv.webp",
    tipo: "image/webp",
    alt: "StartUPV, powered by IdeasUPV y Universitat Politècnica de València",
    alto: "h-11",
  },
];

/** Logos de apoyo del modo feria: van en la franja superior del 3D. */
export function ApoyosFeria() {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-[11px] font-bold tracking-wider text-beloq-dark/50 uppercase">
        Con el apoyo de
      </p>
      <div className="flex items-center gap-4">
        {APOYOS.map((a) => (
          // eslint-disable-next-line @next/next/no-img-element -- data URI incrustado, sin optimizar
          <img key={a.ruta} src={dataUri(a.ruta, a.tipo)} alt={a.alt} className={`${a.alto} w-auto`} />
        ))}
      </div>
    </div>
  );
}

const TIENDA =
  "rounded-[0_14px_0_14px] bg-beloq-dark px-3.5 py-2 text-sm font-bold tracking-wide text-white uppercase";

export default function PanelFeria() {
  return (
    <div className="flex min-h-full flex-col bg-beloq-yellow px-7 py-7 text-beloq-dark">
      <PartyPopper aria-hidden className="h-11 w-11" strokeWidth={2} />
      <p className="mt-4 text-xs font-bold tracking-[0.18em] uppercase">Ya disponible</p>
      <h2 className="mt-1 text-[32px] leading-[1.1] font-bold">
        ¡beloq ya está en Google Play y App Store!
      </h2>
      <p className="mt-3 text-[17px] leading-snug">
        Descárgala, canjea tu código y hazte beloquer.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className={TIENDA}>Google Play</span>
        <span className={TIENDA}>App Store</span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 rounded-[0_20px_0_20px] border-2 border-dashed border-beloq-dark px-4 py-2.5">
        <span className="text-xs font-bold tracking-wider uppercase">Tu código</span>
        <span className="text-[28px] font-bold tracking-[0.1em]">VDS2026</span>
      </div>

      <div className="mt-auto flex flex-col items-center gap-2 rounded-[0_24px_0_24px] bg-white px-5 pt-5 pb-4">
        {/* eslint-disable-next-line @next/next/no-img-element -- data URI incrustado, sin optimizar */}
        <img
          src={dataUri("vds/qr-vds.svg", "image/svg+xml")}
          alt="QR de beloq.es/vds para descargar beloq"
          className="h-52 w-52"
        />
        <p className="text-center text-sm">
          Escanéalo y descárgala
          <strong className="block text-base">beloq.es/vds</strong>
        </p>
      </div>
    </div>
  );
}
