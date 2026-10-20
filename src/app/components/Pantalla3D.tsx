"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

// beloq.es/3d: el visor de Claude Design (public/3d/visor/, preparado con
// scripts/parchear-visor-3d.mjs) a pantalla entera, con solo lo esencial.
// Los botones de aquí accionan los del visor (su barra va oculta) y leen su
// estado, así que se comportan igual que en la tableta. Cambiar de módulo a
// estación cambia el iframe, no la página: no se sale de pantalla completa.
//
// Modo feria (beloq.es/3d?feria, para la tableta del stand en modo quiosco):
// sin el botón Volver, para que nadie salga a la web, y con la demo del visor
// (anclar y desanclar en bucle) cuando pasan 60 s sin que nadie toque. Lleva el
// logo arriba a la izquierda y, a la derecha, la columna del evento
// (PanelFeria); el 3D ocupa el resto, así que nada lo tapa.

type Escena = "modulo" | "estacion";
type Vehiculo = "bici" | "patinete";

const ESCENAS: { id: Escena; label: string }[] = [
  { id: "modulo", label: "Módulo" },
  { id: "estacion", label: "Estación" },
];

const VEHICULOS: { id: Vehiculo; label: string }[] = [
  { id: "bici", label: "Bicicleta" },
  { id: "patinete", label: "Patinete" },
];

interface EstadoVisor {
  listo: boolean;
  vehiculo: string | null;
  anclar: boolean;
  desanclar: boolean;
}

const SIN_VISOR: EstadoVisor = { listo: false, vehiculo: null, anclar: false, desanclar: false };

/**
 * Pantalla completa siempre que el navegador la permita (Android, ordenador,
 * iPad). Safari del iPhone no la tiene para páginas: ahí la página ya ocupa
 * toda la pantalla visible.
 */
function pedirPantallaCompleta() {
  const doc = document as Document & { webkitFullscreenElement?: Element | null };
  const raiz = document.documentElement as HTMLElement & {
    webkitRequestFullscreen?: () => void;
  };
  if (doc.fullscreenElement || doc.webkitFullscreenElement) return;
  try {
    if (raiz.requestFullscreen) {
      raiz.requestFullscreen({ navigationUI: "hide" }).catch(() => {});
    } else {
      raiz.webkitRequestFullscreen?.();
    }
  } catch {
    // Sin gesto o sin permiso: se vuelve a intentar en el siguiente toque.
  }
}

/** ?feria en la dirección. Fuera del navegador (al generar la página), no. */
function leerFeria() {
  return new URLSearchParams(window.location.search).has("feria");
}
const sinCambios = () => () => {};

/** Le dice al visor del iframe que está en el stand: activa su demo. */
function marcarFeria(w: Window | null | undefined) {
  if (w) (w as Window & { beloqFeria?: boolean }).beloqFeria = true;
}

const GRUPO =
  "pointer-events-auto flex gap-1 rounded-[0_20px_0_20px] bg-white p-1 shadow-[0_2px_8px_rgba(0,0,0,0.10)]";

function clasesBoton(activo: boolean) {
  return `min-h-10 rounded-[0_16px_0_16px] px-3.5 text-sm font-bold transition-colors duration-200 disabled:bg-transparent disabled:text-gray-400 ${
    activo
      ? "bg-beloq-yellow text-beloq-dark hover:bg-beloq-yellow-dark"
      : "text-beloq-dark hover:bg-beloq-gray"
  }`;
}

/** Ancho de la columna del modo feria (y hueco que deja el 3D). */
const PANEL_FERIA = "w-[380px]";
const SIN_PANEL_FERIA = "right-[380px]";

export default function Pantalla3D({
  logoFeria,
  panelFeria,
}: {
  /** Logo del modo feria como data URI. */
  logoFeria?: string;
  /** Columna del modo feria (eventos y QR). */
  panelFeria?: ReactNode;
}) {
  const router = useRouter();
  const marco = useRef<HTMLIFrameElement>(null);
  /** Vehículo ya pedido al visor y aún sin confirmar (para no repetir la orden). */
  const pedido = useRef<Vehiculo | null>(null);
  const [escena, setEscena] = useState<Escena>("modulo");
  const [vehiculo, setVehiculo] = useState<Vehiculo>("bici");
  const [visor, setVisor] = useState<EstadoVisor>(SIN_VISOR);
  const feria = useSyncExternalStore(sinCambios, leerFeria, () => false);

  const pulsar = (selector: string) =>
    marco.current?.contentDocument
      ?.querySelector<HTMLButtonElement>(selector)
      ?.click();

  // El visor sincroniza su barra (oculta) cada 200 ms; aquí se lee igual.
  useEffect(() => {
    const leer = () => {
      const d = marco.current?.contentDocument;
      const tv = d?.querySelector<HTMLElement>("[data-tv].on")?.dataset.tv ?? null;
      const dock = d?.getElementById("tDock") as HTMLButtonElement | null;
      const undock = d?.getElementById("tUndock") as HTMLButtonElement | null;
      const nuevo: EstadoVisor = {
        listo: tv !== null,
        vehiculo: tv,
        anclar: !!dock && !dock.disabled,
        desanclar: !!undock && !undock.disabled,
      };
      setVisor((v) =>
        v.listo === nuevo.listo &&
        v.vehiculo === nuevo.vehiculo &&
        v.anclar === nuevo.anclar &&
        v.desanclar === nuevo.desanclar
          ? v
          : nuevo,
      );
    };
    const t = window.setInterval(leer, 200);
    return () => window.clearInterval(t);
  }, []);

  // Al cargar una escena (o si el visor arranca con otro), pone el vehículo elegido.
  useEffect(() => {
    if (!visor.listo) return;
    if (visor.vehiculo === vehiculo) {
      pedido.current = null;
      return;
    }
    if (pedido.current === vehiculo) return;
    pedido.current = vehiculo;
    marco.current?.contentDocument
      ?.querySelector<HTMLButtonElement>(`[data-tv="${vehiculo}"]`)
      ?.click();
  }, [visor.listo, visor.vehiculo, vehiculo]);

  // Los toques sobre el modelo ocurren dentro del iframe: también piden la
  // pantalla completa de esta página.
  const alCargar = () => {
    pedido.current = null; // escena nueva: vuelve a poner el vehículo elegido
    setVisor(SIN_VISOR);
    marco.current?.contentWindow?.addEventListener("pointerdown", pedirPantallaCompleta, true);
    if (feria) marcarFeria(marco.current?.contentWindow);
  };

  // En feria, la página avisa al visor si se carga después que el iframe.
  useEffect(() => {
    if (feria) marcarFeria(marco.current?.contentWindow);
  }, [feria]);

  // Los toques en los botones de esta página también cuentan como actividad:
  // el visor solo ve los suyos, y sin esto la demo arrancaría a media visita.
  const alTocar = () => {
    pedirPantallaCompleta();
    if (feria) marco.current?.contentWindow?.dispatchEvent(new Event("pointerdown"));
  };

  const cambiarEscena = (e: Escena) => {
    if (e === escena) return;
    setVisor(SIN_VISOR);
    setEscena(e);
  };

  const elegirVehiculo = (v: Vehiculo) => {
    setVehiculo(v);
    pedido.current = v;
    pulsar(`[data-tv="${v}"]`);
  };

  const volver = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  return (
    <div
      onPointerDownCapture={alTocar}
      className="fixed inset-0 h-[100dvh] w-full overflow-hidden overscroll-none bg-beloq-gray select-none"
    >
      <div className={`absolute inset-y-0 left-0 ${feria && panelFeria ? SIN_PANEL_FERIA : "right-0"}`}>
        <iframe
          key={escena}
          ref={marco}
          src={`/3d/visor/${escena}.html`}
          title={escena === "modulo" ? "Módulo beloq en 3D" : "Estación beloq en 3D"}
          allow="fullscreen"
          onLoad={alCargar}
          className="absolute inset-0 h-full w-full border-0"
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 pt-[max(12px,env(safe-area-inset-top))] pr-[max(12px,env(safe-area-inset-right))] pl-[max(12px,env(safe-area-inset-left))]">
          {feria ? (
            logoFeria ? (
              // eslint-disable-next-line @next/next/no-img-element -- data URI incrustado, sin optimizar
              <img src={logoFeria} alt="beloq" className="h-10 w-auto shrink-0" />
            ) : (
              <span aria-hidden className="h-11 w-11 shrink-0" />
            )
          ) : (
            <button
              type="button"
              onClick={volver}
              aria-label="Volver"
              className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-beloq-dark bg-white text-beloq-dark shadow-[0_2px_8px_rgba(0,0,0,0.10)] transition-colors duration-200 hover:bg-beloq-yellow"
            >
              <ArrowLeft aria-hidden className="h-5 w-5" strokeWidth={2.25} />
            </button>
          )}
          <div role="group" aria-label="Vista" className={GRUPO}>
            {ESCENAS.map((e) => (
              <button
                key={e.id}
                type="button"
                aria-pressed={escena === e.id}
                onClick={() => cambiarEscena(e.id)}
                className={clasesBoton(escena === e.id)}
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-center gap-2 px-3 pb-[max(12px,env(safe-area-inset-bottom))]">
          <div role="group" aria-label="Vehículo" className={GRUPO}>
            {VEHICULOS.map((v) => {
              const activo = (visor.vehiculo ?? vehiculo) === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  aria-pressed={activo}
                  disabled={!visor.listo}
                  onClick={() => elegirVehiculo(v.id)}
                  className={clasesBoton(activo)}
                >
                  {v.label}
                </button>
              );
            })}
          </div>
          <div role="group" aria-label="Anclaje" className={GRUPO}>
            <button
              type="button"
              disabled={!visor.anclar}
              onClick={() => pulsar("#tDock")}
              className={clasesBoton(false)}
            >
              Anclar
            </button>
            <button
              type="button"
              disabled={!visor.desanclar}
              onClick={() => pulsar("#tUndock")}
              className={clasesBoton(false)}
            >
              Desanclar
            </button>
          </div>
        </div>
      </div>

      {feria && panelFeria ? (
        <aside
          aria-label="beloq en el VDS"
          className={`absolute inset-y-0 right-0 ${PANEL_FERIA} overflow-y-auto bg-white shadow-[-2px_0_12px_rgba(0,0,0,0.06)]`}
        >
          {panelFeria}
        </aside>
      ) : null}
    </div>
  );
}
