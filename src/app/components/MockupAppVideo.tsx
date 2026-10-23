"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./VideoEnBucle";

// La app en marcha dentro de la mano de la ilustración. public/images/
// app-mockup.png (1980×1711) tiene la pantalla transparente: el vídeo va
// detrás, así que el pulgar y el marco quedan encima. Pantalla medida en el
// PNG: x 321-869, y 30-1221; el vídeo la cubre con 2 px más por lado, que
// tapa el marco. app-pantalla.mp4: solo la pantalla de la grabación
// (Medios graficos/Animations/grabaciones/appbeloq.mp4), 270×586, 24 fps,
// H.264 CRF 28, sin audio: 383 KB para 38 s.
const PANTALLA = { left: "16.111%", top: "1.636%", width: "27.929%", height: "69.900%" };

export default function MockupAppVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = usePrefersReducedMotion();

  // Igual que VideoEnBucle: nada se descarga hasta que entra en pantalla, se
  // para al salir y, con «reducir movimiento», se queda en la imagen fija.
  useEffect(() => {
    const video = ref.current;
    if (!video || reduce) return;
    video.muted = true; // iOS solo reproduce solo lo que está silenciado
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <div className="relative aspect-[1980/1711] w-full max-w-xs drop-shadow-2xl">
      <video
        ref={ref}
        src="/images/app-pantalla.mp4"
        poster="/images/app-pantalla.webp"
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        aria-hidden
        tabIndex={-1}
        className="absolute bg-white object-cover"
        style={PANTALLA}
      />
      <Image
        src="/images/app-mockup.png"
        alt="App de beloq: interfaz de la aplicación móvil"
        fill
        sizes="(max-width: 384px) 90vw, 320px"
        className="object-contain"
      />
    </div>
  );
}
