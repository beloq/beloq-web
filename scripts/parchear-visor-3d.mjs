#!/usr/bin/env node
// Prepara el visor 3D exportado de Claude Design para la web (beloq.es/3d).
//
// Uso:
//   node scripts/parchear-visor-3d.mjs <carpeta de la exportación>
//
// La carpeta es la «web/» del zip de Claude Design («Ensamblado Beloq 3D.zip»),
// con index.html (módulo) y estacion.html (estación). Escribe en
// public/3d/visor/modulo.html y public/3d/visor/estacion.html. Hay que volver a
// ejecutarlo tras cada exportación nueva. Cada cambio tiene que encajar
// exactamente: si el visor cambia por dentro, el script falla en lugar de
// publicar algo a medias.
//
// Qué cambia:
//  1. Sin código de fuera: anula la carga de mp4-muxer desde cdn.jsdelivr.net
//     (exportar vídeo), que se ejecutaría en el dominio de beloq.es.
//  2. Siempre en calidad alta, en todos los dispositivos, hasta 2× de nitidez
//     (de serie, en pantallas táctiles arranca en «Fluida», a 1×).
//  3. Sin la demo automática a los 60 s sin tocar (es para la tableta de feria).
//  4. viewport-fit=cover, para ocupar la pantalla entera en el iPhone.
//  5. Oculta su barra propia: los controles los pone la página /3d
//     (src/app/components/Pantalla3D.tsx), que acciona estos mismos botones.
//  6. Encuadre para esos controles, no para los de la tableta: sin el
//     desplazamiento de 64×18 px hacia la barra lateral y, en la estación,
//     la estación ocupa el 100 % del ancho (de borde a borde, sin márgenes ni
//     holgura a los lados) y deja 72 px arriba y abajo para los controles. Antes
//     reservaba 150 px a cada lado y 95 arriba y abajo: en un móvil en vertical
//     la estación quedaba en la mitad del ancho.
//  7. La cámara no puede entrar en el módulo, la barra ni la estación (no se
//     enseña el interior) y no se desplaza: scripts/visor-3d-limites-camara.js.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const origen = process.argv[2];
if (!origen) {
  console.error("Uso: node scripts/parchear-visor-3d.mjs <carpeta de la exportación>");
  process.exit(1);
}
const destino = join(raiz, "public", "3d", "visor");

const ARCHIVOS = [
  { de: "index.html", a: "modulo.html" },
  { de: "estacion.html", a: "estacion.html" },
];

// Lo que usan la página /3d y el límite de cámara: tiene que existir.
const SELECTORES = [
  'data-tv="bici"',
  'data-tv="patinete"',
  'id="tDock"',
  'id="tUndock"',
  'id="tb"',
  "this._scene = scene",
  "this._camera = camera",
  "this._controls = controls",
];

const LIMITES_CAMARA = readFileSync(join(raiz, "scripts", "visor-3d-limites-camara.js"), "utf8");
if (LIMITES_CAMARA.includes("</script")) throw new Error("visor-3d-limites-camara.js no puede contener </script");

const MARCA = "<!-- parcheado por scripts/parchear-visor-3d.mjs -->";

/** Sustituye `de` por `a` exactamente una vez (o ninguna si `opcional`). */
function cambiar(html, de, a, nombre, { opcional = false } = {}) {
  const n = html.split(de).length - 1;
  if (n === 0 && opcional) return html;
  if (n !== 1) throw new Error(`${nombre}: se esperaba 1 coincidencia y hay ${n}`);
  return html.replace(de, a);
}

mkdirSync(destino, { recursive: true });

for (const { de, a } of ARCHIVOS) {
  let html = readFileSync(join(origen, de), "utf8");
  if (html.includes(MARCA)) throw new Error(`${de}: ya está parcheado; usa la exportación original`);
  for (const s of SELECTORES) {
    if (!html.includes(s)) throw new Error(`${de}: falta ${s}`);
  }

  html = cambiar(
    html,
    "import('https://cdn.jsdelivr.net/npm/mp4-muxer@5/+esm')",
    "Promise.reject(new Error('Exportar vídeo no está disponible en la web'))",
    `${de} · jsdelivr`,
    { opcional: true },
  );
  html = cambiar(
    html,
    "let q = localStorage.getItem('beloq_tab_q') || (navigator.maxTouchPoints > 0 ? 'fluida' : 'alta');",
    "let q = 'alta';",
    `${de} · calidad por defecto`,
  );
  html = cambiar(
    html,
    "alta: { pr: Math.min(window.devicePixelRatio || 1, 1.5)",
    "alta: { pr: Math.min(window.devicePixelRatio || 1, 2)",
    `${de} · nitidez`,
  );
  html = cambiar(
    html,
    "if (performance.now() - lastTouch < 60000",
    "return; if (performance.now() - lastTouch < 60000",
    `${de} · demo automática`,
  );
  html = cambiar(
    html,
    '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">',
    '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">',
    `${de} · viewport`,
  );
  html = cambiar(
    html,
    "camT.setViewOffset(w, h, 64, 18, w, h)",
    "camT.setViewOffset(w, h, 0, 0, w, h)",
    `${de} · desplazamiento de la vista`,
  );
  const encuadreTableta =
    "const fw = Math.max(0.5, (w - 2 * 150) / w), fh = Math.max(0.5, (h - 2 * 95) / h);";
  if (de === "estacion.html" && !html.includes(encuadreTableta)) {
    throw new Error(`${de}: falta el encuadre de la estación (fitAll)`);
  }
  html = cambiar(
    html,
    encuadreTableta,
    "const fw = 1, fh = Math.max(0.5, (h - 2 * 72) / h);",
    `${de} · encuadre de la estación`,
    { opcional: true },
  );
  html = cambiar(
    html,
    "const dist = Math.max(ey / (tn * fh), ex / (tn * camT.aspect * fw)) * 1.08 + ez;",
    "const dist = Math.max((ey / (tn * fh)) * 1.08, ex / (tn * camT.aspect * fw)) + ez;",
    `${de} · estación al 100 % del ancho`,
    { opcional: de !== "estacion.html" },
  );
  html = cambiar(
    html,
    "</head>",
    `${MARCA}\n<style>#tt,#tv,#tb{display:none!important}</style>\n<script>\n${LIMITES_CAMARA}</script>\n</head>`,
    `${de} · </head>`,
  );

  if (html.includes("cdn.jsdelivr.net/npm/")) throw new Error(`${de}: sigue cargando código de jsdelivr`);
  writeFileSync(join(destino, a), html);
  console.log(`✓ ${de} → public/3d/visor/${a} (${(html.length / 1e6).toFixed(1)} MB)`);
}
