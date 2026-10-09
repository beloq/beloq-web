"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

/**
 * Un vídeo de la app, sin sonido y en bucle. No descarga nada hasta que entra
 * en pantalla (preload none + portada), y se para al salir: quien llega desde
 * el móvil suele ir con datos. Con «reducir movimiento», no arranca solo.
 */
export default function VideoEnBucle({
  src,
  poster,
  label,
  className = "",
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = usePrefersReducedMotion();

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
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      controls={reduce}
      disablePictureInPicture
      aria-label={label}
      className={`aspect-[1080/2340] w-full rounded-[0_24px_0_24px] bg-beloq-dark object-cover ${className}`}
    />
  );
}
