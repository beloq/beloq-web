import { readFileSync } from "node:fs";
import { join } from "node:path";
import QRCode from "qrcode";

// Columna del modo feria (beloq.es/3d?feria) en el VDS 2026: dónde
// encontrar a beloq y un QR a la página de contacto. Se genera al compilar:
// el QR va como SVG en el HTML (sin servicios de QR externos) y no necesita
// red una vez cargada la página. Textos de Jesús; respetar orden y horas.

const CONTACTO = "https://beloq.es/contacto";

/** Un fichero de public/ como data URI: va dentro de la página, sin otra descarga. */
export function dataUri(ruta: string, tipo: string) {
  return `data:${tipo};base64,${readFileSync(join(process.cwd(), "public", ruta)).toString("base64")}`;
}

// Quién nos acompaña y apoya (Medios graficos), en el orden que dio Jesús.
// Solo recortados los márgenes vacíos: colores y proporciones originales.
const APOYOS = [
  { ruta: "images/apoyos/camara-ceuta.png", tipo: "image/png", alt: "Cámara Ceuta", alto: "h-8" },
  {
    ruta: "images/apoyos/sandbox-valencia.png",
    tipo: "image/png",
    alt: "Ajuntament de València, València Innovation Capital y sandbox València",
    alto: "h-6",
  },
  {
    ruta: "images/apoyos/startupv.webp",
    tipo: "image/webp",
    alt: "StartUPV, powered by IdeasUPV y Universitat Politècnica de València",
    alto: "h-11",
  },
];

/** Logos de apoyo del modo feria: van en la franja superior del 3D. */
export function ApoyosFeria() {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-[11px] font-bold tracking-wider text-beloq-dark/50 uppercase">
        Con el apoyo de
      </p>
      <div className="flex items-center gap-4">
        {APOYOS.map((a) => (
          // eslint-disable-next-line @next/next/no-img-element -- data URI incrustado, sin optimizar
          <img key={a.ruta} src={dataUri(a.ruta, a.tipo)} alt={a.alt} className={`${a.alto} w-auto`} />
        ))}
      </div>
    </div>
  );
}

// Un color por evento: la hora en una etiqueta y la línea de la izquierda.
// Los oscuros llevan texto blanco con contraste AA; el amarillo, texto oscuro.
const COLORES = {
  amarillo: { linea: "border-beloq-yellow", hora: "bg-beloq-yellow text-beloq-dark" },
  azul: { linea: "border-[#3358D4]", hora: "bg-[#3358D4] text-white" },
  rojo: { linea: "border-[#D93036]", hora: "bg-[#D93036] text-white" },
  verde: { linea: "border-[#218358]", hora: "bg-[#218358] text-white" },
};

const DIAS: {
  dia: string;
  eventos: { hora: string; texto: string; color: keyof typeof COLORES }[];
}[] = [
  {
    dia: "Miércoles 21 de octubre",
    eventos: [
      {
        hora: "11:30 a 13:00",
        texto: "Final Santander X Spain Awards · Box Santander · pitch de beloq",
        color: "amarillo",
      },
      { hora: "15:08", texto: "Innovation Stage · pitch de beloq", color: "azul" },
      {
        hora: "15:40 a 16:00",
        texto:
          "Santander Stage · mesa redonda “From Pilot to Contract: The Truth About Testing with Cities”, con Paula Llobet (Ajuntament de València), Mark-Emil Talivere (Business Tallinn) y Margot Roose",
        color: "rojo",
      },
    ],
  },
  {
    dia: "Jueves 22 de octubre",
    eventos: [{ hora: "11:00", texto: "Radio VDS (Plaza Radio) · entrevista a beloq", color: "verde" }],
  },
];

export default async function PanelFeria() {
  const qr = await QRCode.toString(CONTACTO, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 1,
    color: { dark: "#3C3C3B", light: "#FFFFFF" },
  });

  return (
    <div className="flex min-h-full flex-col gap-3 px-6 py-5 text-beloq-dark">
      <h2 className="text-xl font-bold">Encuéntranos en el VDS</h2>

      {DIAS.map((d) => (
        <section key={d.dia} aria-label={d.dia}>
          <h3 className="mb-2 text-xs font-bold tracking-wider text-beloq-dark/60 uppercase">
            {d.dia}
          </h3>
          <ul className="space-y-2.5">
            {d.eventos.map((e) => (
              <li key={e.hora} className={`border-l-4 pl-3 ${COLORES[e.color].linea}`}>
                <p
                  className={`mb-0.5 inline-block rounded-[0_10px_0_10px] px-2 text-base leading-6 font-bold ${COLORES[e.color].hora}`}
                >
                  {e.hora}
                </p>
                <p className="text-[15px] leading-snug">{e.texto}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="rounded-[0_16px_0_16px] bg-beloq-gray px-3 py-2.5 text-sm leading-snug">
        <strong>Los dos días:</strong> nos encuentras en los pods <strong>i26C</strong> e{" "}
        <strong>i29B</strong> (València Innovation Capital y UPV Innovation).
      </p>

      <div className="mt-auto flex flex-col items-center gap-1.5 pt-1">
        <div
          role="img"
          aria-label="Código QR a beloq.es/contacto"
          className="h-40 w-40 [&>svg]:h-full [&>svg]:w-full"
          dangerouslySetInnerHTML={{ __html: qr }}
        />
        <p className="text-base font-bold">beloq.es/contacto</p>
      </div>
    </div>
  );
}
