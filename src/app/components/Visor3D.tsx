"use client";

import { Rotate3d } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import VideoEnBucle from "./VideoEnBucle";

type Vehiculo = "bici" | "patinete";

const VEHICULOS: { id: Vehiculo; label: string }[] = [
  { id: "bici", label: "Bici" },
  { id: "patinete", label: "Patinete" },
];

/**
 * «¿Qué es beloq?»: la animación de anclaje (los mismos vídeos que /info) y el
 * enlace al visor 3D. El 3D se ve siempre en su propia página, a pantalla
 * entera (/3d), nunca incrustado en pequeño.
 */
export default function Visor3D() {
  const [vehiculo, setVehiculo] = useState<Vehiculo>("bici");

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
      <Link
        href="/3d"
        className="inline-flex items-center gap-2 rounded-[0_24px_0_24px] bg-beloq-dark px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[#1A1A1A]"
      >
        <Rotate3d aria-hidden className="h-5 w-5" />
        Ver en 3D
      </Link>
    </div>
  );
}
