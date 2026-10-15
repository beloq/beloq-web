import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { IMAGEN_SOCIAL } from "../lib/informes";

// Imagen para compartir la sección (y sus páginas hijas). Se genera en el
// build con el logotipo y la Montserrat de la web. Sin datos ni clientes.
export const alt = IMAGEN_SOCIAL.alt;
export const size = { width: IMAGEN_SOCIAL.width, height: IMAGEN_SOCIAL.height };
export const contentType = "image/png";

export default async function Image() {
  const raiz = process.cwd();
  const [logo, negrita, normal] = await Promise.all([
    readFile(join(raiz, "public/images/logo-black.png")),
    readFile(join(raiz, "public/fonts/Montserrat-Bold.ttf")),
    readFile(join(raiz, "public/fonts/Montserrat-Regular.ttf")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFEC36",
          color: "#3C3C3B",
          padding: "64px 72px",
          fontFamily: "Montserrat",
        }}
      >
        {/* 1935×911 px: a 64 px de alto ocupa unos 136 px de ancho. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse solo admite <img> */}
        <img src={logoSrc} width={136} height={64} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>
            Informes de movilidad
          </div>
          <div style={{ marginTop: 24, fontSize: 38, lineHeight: 1.3, maxWidth: 940 }}>
            Diagnóstico, análisis y seguimiento para decidir y evaluar con datos
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            background: "#3C3C3B",
            color: "#FFEC36",
            fontSize: 30,
            fontWeight: 700,
            padding: "18px 32px",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 32,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 32,
          }}
        >
          beloq.es/informes-movilidad
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Montserrat", data: negrita, style: "normal", weight: 700 },
        { name: "Montserrat", data: normal, style: "normal", weight: 400 },
      ],
    }
  );
}
