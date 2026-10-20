import QRCode from "qrcode";

// Columna del modo feria (beloq.es/3d?feria) en el VDS 2026: dónde
// encontrar a beloq y un QR a la página de contacto. Se genera al compilar:
// el QR va como SVG en el HTML (sin servicios de QR externos) y no necesita
// red una vez cargada la página. Textos de Jesús; respetar orden y horas.

const CONTACTO = "https://beloq.es/contacto";

const DIAS = [
  {
    dia: "Miércoles 21 de octubre",
    eventos: [
      {
        hora: "11:30 a 13:00",
        texto: "Final Santander X Spain Awards · Box Santander · pitch de beloq",
      },
      { hora: "15:08", texto: "Innovation Stage · pitch de beloq" },
      {
        hora: "15:40 a 16:00",
        texto:
          "Santander Stage · mesa redonda “From Pilot to Contract: The Truth About Testing with Cities”, con Paula Llobet (Ajuntament de València), Mark-Emil Talivere (Business Tallinn) y Margot Roose",
      },
    ],
  },
  {
    dia: "Jueves 22 de octubre",
    eventos: [{ hora: "11:00", texto: "Radio VDS (Plaza Radio) · entrevista a beloq" }],
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
    <div className="flex min-h-full flex-col gap-4 px-6 py-5 text-beloq-dark">
      <h2 className="text-xl font-bold">Encuéntranos en el VDS</h2>

      {DIAS.map((d) => (
        <section key={d.dia} aria-label={d.dia}>
          <h3 className="mb-2 text-xs font-bold tracking-wider text-beloq-dark/60 uppercase">
            {d.dia}
          </h3>
          <ul className="space-y-2.5">
            {d.eventos.map((e) => (
              <li key={e.hora} className="border-l-4 border-beloq-yellow pl-3">
                <p className="text-base font-bold">{e.hora}</p>
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
          className="h-44 w-44 [&>svg]:h-full [&>svg]:w-full"
          dangerouslySetInnerHTML={{ __html: qr }}
        />
        <p className="text-base font-bold">beloq.es/contacto</p>
      </div>
    </div>
  );
}
