"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Barra fija inferior, solo en móvil: aparece cuando el primer botón de
 * solicitud (id `primero`) ha salido de la pantalla por arriba y se esconde al
 * llegar a la llamada final (id `ultimo`). Sin animación si el sistema pide
 * menos movimiento (motion-safe).
 */
export default function BarraSolicitar({
  href,
  texto,
  boton,
  primero,
  ultimo,
}: {
  href: string;
  texto: string;
  boton: string;
  primero: string;
  ultimo: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const a = document.getElementById(primero);
    const b = document.getElementById(ultimo);
    if (!a || !("IntersectionObserver" in window)) return;
    // El observador solo avisa cuando un elemento entra o sale del área
    // observada. En móvil el primer botón empieza por debajo de la pantalla, así
    // que, si se observara la pantalla a secas, un salto rápido podría pasarlo
    // sin que llegara a «entrar» y no habría aviso. Por eso el área del primer
    // botón se extiende hacia abajo sin límite (solo puede salir por arriba) y
    // la de la llamada final hacia arriba sin límite (una vez alcanzada, sigue
    // «dentro» aunque se pase de largo).
    let primeroFuera = false;
    let finalCerca = false;
    const aplicar = () => setVisible(primeroFuera && !finalCerca);
    const obsA = new IntersectionObserver(
      ([en]) => {
        primeroFuera = !en.isIntersecting;
        aplicar();
      },
      { rootMargin: "0px 0px 100000px 0px" }
    );
    const obsB = new IntersectionObserver(
      ([en]) => {
        finalCerca = en.isIntersecting;
        aplicar();
      },
      { rootMargin: "100000px 0px 0px 0px" }
    );
    obsA.observe(a);
    if (b) obsB.observe(b);
    return () => {
      obsA.disconnect();
      obsB.disconnect();
    };
  }, [primero, ultimo]);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white px-4 py-3 shadow-[0_-2px_8px_rgba(0,0,0,0.08)] motion-safe:transition-transform motion-safe:duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold leading-snug text-beloq-dark">{texto}</p>
        <Link
          href={href}
          tabIndex={visible ? undefined : -1}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-beloq-dark px-5 py-2.5 text-sm font-bold text-white"
        >
          {boton}
          <ArrowRight aria-hidden className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
