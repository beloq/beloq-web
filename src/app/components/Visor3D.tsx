"use client";

import { Rotate3d } from "lucide-react";
import { useState } from "react";
import VideoEnBucle from "./VideoEnBucle";

type Vehiculo = "bici" | "patinete";

const VEHICULOS: { id: Vehiculo; label: string }[] = [
  { id: "bici", label: "Bici" },
  { id: "patinete", label: "Patinete" },
];

/**
 * «¿Qué es beloq?»: la animación de anclaje (los mismos vídeos que /info) y,
 * al pulsar «Ver en 3D», el visor interactivo (public/3d/, ~5,5 MB). El visor
 * no se descarga con la portada, y en el móvil no se queda con el gesto de
 * desplazar la página.
 */
export default function Visor3D() {
  const [abierto, setAbierto] = useState(false);
  const [vehiculo, setVehiculo] = useState<Vehiculo>("bici");

  if (abierto) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[0_24px_0_24px] bg-beloq-gray shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
        <iframe
          src="/3d/index.html"
          title="beloq en 3D"
          allow="fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <div role="group" aria-label="Vehículo" className="flex gap-2">
        {VEHICULOS.map((v) => {
          const activo = v.id === vehiculo;
          return (
            <button
              key={v.id}
              type="button"
              aria-pressed={activo}
              onClick={() => setVehiculo(v.id)}
              className={`rounded-[0_24px_0_24px] px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${
                activo
                  ? "bg-beloq-yellow text-beloq-dark hover:bg-beloq-yellow-dark"
                  : "bg-beloq-gray text-beloq-dark hover:underline"
              }`}
            >
              {v.label}
            </button>
          );
        })}
      </div>
      <div className="w-full max-w-[260px]">
        <VideoEnBucle
          key={vehiculo}
          src={`/info/anclar_${vehiculo}.mp4`}
          poster={`/info/anclar_${vehiculo}.webp`}
          label={`Anclar ${vehiculo === "bici" ? "una bici" : "un patinete"} en un beloq`}
        />
      </div>
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="inline-flex items-center gap-2 rounded-[0_24px_0_24px] bg-beloq-dark px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[#1A1A1A]"
      >
        <Rotate3d aria-hidden className="h-5 w-5" />
        Ver en 3D
      </button>
    </div>
  );
}
