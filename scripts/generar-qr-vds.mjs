#!/usr/bin/env node
// QR de beloq.es/vds para imprimir y proyectar en el VDS.
//
// Uso: node scripts/generar-qr-vds.mjs
//
// Escribe public/vds/qr-vds.svg y public/vds/qr-vds.png (2048 px). Corrección
// de errores alta (H), margen blanco de 4 módulos y el logo de beloq en el
// centro sobre un recuadro blanco (ocupa poco más del 6 % del símbolo; la H
// aguanta hasta un 30 %). Comprobar con un lector de QR tras regenerarlo.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";
import sharp from "sharp";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const URL_VDS = "https://beloq.es/vds";
const MARGEN = 4; // módulos de margen blanco
const OSCURO = "#1A1A1A";

const qr = QRCode.create(URL_VDS, { errorCorrectionLevel: "H" });
const n = qr.modules.size;
const total = n + 2 * MARGEN;

let d = "";
for (let y = 0; y < n; y++) {
  for (let x = 0; x < n; x++) {
    if (qr.modules.get(y, x)) d += `M${x + MARGEN} ${y + MARGEN}h1v1h-1z`;
  }
}

// Logo (1935×911) centrado: 36 % del ancho del símbolo, con recuadro blanco.
const logo = readFileSync(join(raiz, "public", "images", "logo-black.png")).toString("base64");
const lw = n * 0.36, lh = (lw * 911) / 1935, pad = 0.6;
const lx = (total - lw) / 2, ly = (total - lh) / 2;
const r = (v) => Math.round(v * 1000) / 1000;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" width="2048" height="2048" shape-rendering="crispEdges">
<title>beloq.es/vds</title>
<rect width="${total}" height="${total}" fill="#FFFFFF"/>
<path fill="${OSCURO}" d="${d}"/>
<rect x="${r(lx - pad)}" y="${r(ly - pad)}" width="${r(lw + 2 * pad)}" height="${r(lh + 2 * pad)}" rx="0.8" fill="#FFFFFF" shape-rendering="geometricPrecision"/>
<image x="${r(lx)}" y="${r(ly)}" width="${r(lw)}" height="${r(lh)}" href="data:image/png;base64,${logo}"/>
</svg>
`;

writeFileSync(join(raiz, "public", "vds", "qr-vds.svg"), svg);
// El SVG mide 2048 px: a 72 ppp sale el PNG justo a ese tamaño.
await sharp(Buffer.from(svg), { density: 72 })
  .flatten({ background: "#FFFFFF" })
  .png({ compressionLevel: 9 })
  .toFile(join(raiz, "public", "vds", "qr-vds.png"));
console.log(`✓ public/vds/qr-vds.svg y qr-vds.png (2048 px) · versión ${qr.version}, ${n}×${n} módulos, H`);
