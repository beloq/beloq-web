"use client";

import { useState } from "react";

// Comprobador de turnos de /informes-movilidad/accesibilidad-por-turnos.
// Horarios programados de MetGo en paradas del Parc Tecnològic de Paterna,
// solo laborables: líneas 131, 135 y 144 (hoja del 2025-09-08) y lanzadera 130
// desde el metro de Empalme (actualización del 2026-06-01). Las seis cifras
// están verificadas (encargo del 2026-11-06) y no se cambian. Todo se calcula
// en el navegador; no llama a ningún servidor.

const LLEGA_PRIMERO = 6 * 60 + 42; // 06:42 primer autobús que llega al parque
const LLEGA_ULTIMO = 21 * 60 + 40; // 21:40 último autobús que llega al parque
const SALE_PRIMERO = 6 * 60 + 44; // 06:44 primer autobús que sale del parque
const SALE_ULTIMO = 21 * 60 + 35; // 21:35 último autobús que sale del parque
const METRO_LLEGA = 8 * 60; // 08:00 lanzadera 130: primera llegada desde el metro
const METRO_SALE = 15 * 60 + 15; // 15:15 lanzadera 130: última salida hacia el metro
const ESPERA_LARGA = 60;

type Estado = "ok" | "mid" | "ko";
type Resultado = [Estado, string, string];

export interface Evaluacion {
  ida: Resultado;
  vuelta: Resultado;
  metro: Resultado;
  veredicto: string;
}

function toMin(v: string): number {
  const p = v.split(":");
  return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
}

function hhmm(m: number): string {
  return (m < 600 ? "0" : "") + Math.floor(m / 60) + ":" + (m % 60 < 10 ? "0" : "") + (m % 60);
}

function dur(m: number): string {
  const h = Math.floor(m / 60);
  const r = m % 60;
  return (h ? h + " h" : "") + (h && r ? " " : "") + (r || !h ? r + " min" : "");
}

/** e y s en formato HH:MM. Lógica y textos del encargo, tal cual. */
export function evaluar(e: string, s: string): Evaluacion {
  const E = toMin(e);
  const S = toMin(s);
  let ida: Estado;
  let vuelta: Estado;
  const R = {} as Evaluacion;
  // Ida: hace falta un autobús que llegue al parque antes de la entrada.
  if (E < LLEGA_PRIMERO) {
    ida = "ko";
    R.ida = [
      "ko",
      "No encaja",
      "Ningún autobús llega al parque antes de las " + hhmm(LLEGA_PRIMERO) + ". Para entrar a las " + e + " faltan " + dur(LLEGA_PRIMERO - E) + ".",
    ];
  } else if (E <= LLEGA_ULTIMO) {
    ida = "mid";
    R.ida = [
      "mid",
      "Hay servicio",
      "Llegan autobuses al parque entre las " + hhmm(LLEGA_PRIMERO) + " y las " + hhmm(LLEGA_ULTIMO) + ". El margen y la frecuencia a tu hora, por línea, salen en el informe.",
    ];
  } else {
    const esp = E - LLEGA_ULTIMO;
    ida = esp > ESPERA_LARGA ? "mid" : "ok";
    R.ida = [
      ida,
      esp > ESPERA_LARGA ? "Encaja con espera" : "Encaja",
      "El último autobús llega a las " + hhmm(LLEGA_ULTIMO) + ", " + dur(esp) + " antes de tu entrada.",
    ];
  }
  // Vuelta: hace falta un autobús que salga del parque después de la salida.
  if (S > SALE_ULTIMO) {
    vuelta = "ko";
    R.vuelta = [
      "ko",
      "No encaja",
      "El último autobús sale a las " + hhmm(SALE_ULTIMO) + ", " + dur(S - SALE_ULTIMO) + " antes de que termines.",
    ];
  } else if (S >= SALE_PRIMERO) {
    vuelta = "mid";
    R.vuelta = [
      "mid",
      "Hay servicio",
      "Salen autobuses del parque entre las " + hhmm(SALE_PRIMERO) + " y las " + hhmm(SALE_ULTIMO) + ". El margen y la frecuencia a tu hora, por línea, salen en el informe.",
    ];
  } else {
    const esp2 = SALE_PRIMERO - S;
    vuelta = esp2 > ESPERA_LARGA ? "mid" : "ok";
    R.vuelta = [
      vuelta,
      esp2 > ESPERA_LARGA ? "Encaja con espera" : "Encaja",
      "El primer autobús sale a las " + hhmm(SALE_PRIMERO) + ", " + dur(esp2) + " después de tu salida.",
    ];
  }
  // Lanzadera del metro: solo de mañana y primera hora de la tarde.
  const idaMetro = E >= METRO_LLEGA && E <= METRO_SALE;
  const vueltaMetro = S >= METRO_LLEGA && S <= METRO_SALE;
  const txt =
    "Desde el metro de Empalme llega al parque por primera vez a las " + hhmm(METRO_LLEGA) + " y sale por última vez a las " + hhmm(METRO_SALE) + ".";
  if (idaMetro && vueltaMetro) R.metro = ["ok", "Sirve ida y vuelta", txt];
  else if (idaMetro || vueltaMetro)
    R.metro = [
      "mid",
      idaMetro ? "Solo a la ida" : "Solo a la vuelta",
      txt + " Fuera de esa franja hay que combinar con otra línea o ir en bici desde el metro.",
    ];
  else R.metro = ["ko", "No sirve", txt + " Tu turno queda fuera."];
  // Veredicto
  if (ida === "ko" && vuelta === "ko")
    R.veredicto = "Ni la ida ni la vuelta tienen autobús. Para este turno, la alternativa al coche pasa por la bici, el patinete o el transporte de empresa.";
  else if (ida === "ko")
    R.veredicto = "Nadie puede llegar a tiempo en autobús aunque sí pueda volver. La medida a estudiar es la entrada, no la salida.";
  else if (vuelta === "ko")
    R.veredicto = "El caso típico: la ida encaja y la vuelta no. Quien viene en transporte público tiene que volver de otra manera.";
  else
    R.veredicto = "Sobre el papel hay autobús en los dos sentidos. El informe mide además el tiempo a pie desde cada parada, el margen real de cada línea y qué zonas de residencia quedan cubiertas.";
  return R;
}

const TURNOS = [
  { label: "Mañana 06:00–14:00", e: "06:00", s: "14:00" },
  { label: "Oficina 08:30–17:30", e: "08:30", s: "17:30" },
  { label: "Tarde 14:00–22:00", e: "14:00", s: "22:00" },
  { label: "Noche 22:00–06:00", e: "22:00", s: "06:00" },
];

const BORDE: Record<Estado, string> = {
  ok: "border-l-green-600",
  mid: "border-l-beloq-yellow",
  ko: "border-l-red-700",
};

const ESTADO_TEXTO: Record<Estado, string> = {
  ok: "encaja",
  mid: "con matices",
  ko: "no encaja",
};

const HORA_RE = /^\d{2}:\d{2}$/;

const CAMPO =
  "mt-1 block w-full rounded-[0_12px_0_12px] border border-gray-300 bg-white px-3 py-2 text-base font-bold text-beloq-dark focus:border-beloq-dark focus:outline-none focus:ring-2 focus:ring-beloq-yellow";

export default function ComprobadorTurnos() {
  const [entrada, setEntrada] = useState("06:00");
  const [salida, setSalida] = useState("14:00");
  // Si el campo se queda vacío, se conserva la última hora válida.
  const r = evaluar(entrada, salida);

  const cambiar = (poner: (v: string) => void) => (v: string) => {
    if (HORA_RE.test(v)) poner(v);
  };

  const tarjetas: { titulo: string; res: Resultado }[] = [
    { titulo: "Ida en autobús", res: r.ida },
    { titulo: "Vuelta en autobús", res: r.vuelta },
    { titulo: "Lanzadera desde el metro", res: r.metro },
  ];

  return (
    <div
      id="comprobador-turnos"
      className="rounded-[0_24px_0_24px] border-2 border-beloq-dark bg-white p-5 sm:p-7"
    >
      {/* Sin JavaScript los campos no recalculan: se oculta el recuadro. */}
      <noscript>
        <style>{`#comprobador-turnos{display:none}`}</style>
      </noscript>
      <div className="grid gap-4 sm:grid-cols-2 sm:max-w-md">
        <label className="block text-sm font-bold text-beloq-dark">
          Hora de entrada
          <input
            type="time"
            step={300}
            value={entrada}
            onChange={(ev) => cambiar(setEntrada)(ev.target.value)}
            className={CAMPO}
          />
        </label>
        <label className="block text-sm font-bold text-beloq-dark">
          Hora de salida
          <input
            type="time"
            step={300}
            value={salida}
            onChange={(ev) => cambiar(setSalida)(ev.target.value)}
            className={CAMPO}
          />
        </label>
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-wider text-beloq-dark">
        Turnos de ejemplo
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {TURNOS.map((t) => {
          const activo = t.e === entrada && t.s === salida;
          return (
            <button
              key={t.label}
              type="button"
              aria-pressed={activo}
              onClick={() => {
                setEntrada(t.e);
                setSalida(t.s);
              }}
              className={`rounded-[0_12px_0_12px] border px-3 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beloq-dark ${
                activo
                  ? "border-beloq-dark bg-beloq-yellow text-beloq-dark"
                  : "border-gray-300 text-beloq-dark hover:border-beloq-dark"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div aria-live="polite">
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {tarjetas.map((t) => (
            <li
              key={t.titulo}
              className={`rounded-[0_12px_0_12px] border border-gray-200 border-l-4 bg-beloq-gray p-4 ${BORDE[t.res[0]]}`}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-gray-600">
                {t.titulo}
              </p>
              <p className="mt-1 font-bold text-beloq-dark">
                {t.res[1]}
                <span className="sr-only"> ({ESTADO_TEXTO[t.res[0]]})</span>
              </p>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">{t.res[2]}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 font-bold leading-snug text-beloq-dark">{r.veredicto}</p>
      </div>
    </div>
  );
}
