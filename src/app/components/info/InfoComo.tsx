"use client";

import { useState } from "react";
import VideoEnBucle from "../VideoEnBucle";

type Vehiculo = "bici" | "patinete";

const VEHICULOS: { id: Vehiculo; label: string }[] = [
  { id: "bici", label: "Bici" },
  { id: "patinete", label: "Patinete" },
];

// Textos de las preguntas frecuentes (BELOQ_INFO §4, «¿Cómo aparco?»).
const PASOS = [
  {
    id: "anclar",
    titulo: "Anclar",
    texto:
      "Sube la barra, mete tu bici o patinete y baja la barra con firmeza hasta oír el clic y el doble pitido.",
  },
  {
    id: "retirar",
    titulo: "Retirar",
    texto:
      "Desbloquéalo con tu huella, saca tu vehículo y vuelve a bajar la barra hasta oír el clic.",
  },
];

/** BELOQ_INFO §3.2. Respaldo con los vídeos de la app hasta tener la animación. */
export default function InfoComo() {
  const [vehiculo, setVehiculo] = useState<Vehiculo>("bici");

  return (
    <section id="como" className="scroll-mt-20 bg-beloq-gray py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-2xl font-bold text-beloq-dark sm:text-3xl">
          Cómo se aparca
        </h2>

        <div role="group" aria-label="Vehículo" className="mt-6 flex gap-2">
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
                    : "bg-white text-beloq-dark hover:underline"
                }`}
              >
                {v.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-8">
          {PASOS.map((p) => (
            <figure key={p.id} className="mx-auto w-full max-w-[260px]">
              <VideoEnBucle
                key={`${p.id}_${vehiculo}`}
                src={`/info/${p.id}_${vehiculo}.mp4`}
                poster={`/info/${p.id}_${vehiculo}.webp`}
                label={`${p.titulo} ${vehiculo === "bici" ? "una bici" : "un patinete"}`}
              />
              <figcaption className="mt-3">
                <strong className="block text-beloq-dark">{p.titulo}</strong>
                <span className="mt-1 block text-sm leading-snug text-gray-700">
                  {p.texto}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
