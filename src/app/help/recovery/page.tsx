import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "beloq · recuperar mi sesión",
  description: "Qué hacer si no puedes recoger tu vehículo de un módulo beloq.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3C3C3B",
};

export default function RecoveryPage() {
  const phone = process.env.NEXT_PUBLIC_RECOVERY_PHONE || "";

  return (
    <div className="flex min-h-screen flex-col items-center bg-beloq-gray px-4 py-8">
      <Link href="/" className="mb-8 shrink-0">
        <Image
          src="/images/logo-black.png"
          alt="beloq"
          width={110}
          height={36}
          className="h-8 w-auto"
          priority
        />
      </Link>

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h1 className="mb-2 text-2xl font-bold text-beloq-dark">
          Recuperar tu sesión
        </h1>
        <p className="mb-6 leading-relaxed text-gray-600">
          ¿No puedes recoger tu vehículo o tu sesión sigue activa en otro
          móvil? Te ayudamos a liberar el módulo y tu depósito.
        </p>

        <ol className="mb-6 space-y-4">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-beloq-yellow text-sm font-bold text-beloq-dark">
              1
            </span>
            <p className="text-sm text-gray-600">
              Vuelve al módulo y{" "}
              <strong className="text-beloq-dark">
                acerca el móvil al tag
              </strong>{" "}
              con el que iniciaste la sesión. Es la forma más rápida de recoger.
            </p>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-beloq-yellow text-sm font-bold text-beloq-dark">
              2
            </span>
            <p className="text-sm text-gray-600">
              Si cambiaste de teléfono o borraste los datos del navegador, no
              hay recuperación automática: necesitamos verificar tu identidad.
            </p>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-beloq-yellow text-sm font-bold text-beloq-dark">
              3
            </span>
            <p className="text-sm text-gray-600">
              Contacta con soporte y te ayudamos a liberar el módulo y el
              depósito de forma segura.
            </p>
          </li>
        </ol>

        <p className="mb-6 rounded-xl bg-beloq-yellow/15 p-4 text-sm text-gray-700">
          <strong className="text-beloq-dark">
            Usa el mismo navegador con el que pagaste.
          </strong>{" "}
          Tu sesión se guarda en el navegador que usaste al abrir el módulo. Si
          pagaste desde el navegador de la cámara y luego vuelves con otro (por
          ejemplo, Safari), verás &quot;en uso por otra persona&quot; durante
          unos minutos, hasta que el sistema libere el depósito solo. Vuelve con
          el mismo navegador para recoger al instante.
        </p>

        <div className="rounded-xl bg-beloq-gray p-4 text-sm text-gray-600">
          <p className="font-bold text-beloq-dark">Soporte beloq</p>
          {phone ? (
            <p className="mt-1">
              Llama o escribe al{" "}
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="font-bold text-beloq-dark underline"
              >
                {phone}
              </a>
              .
            </p>
          ) : (
            <p className="mt-1">
              Escríbenos a{" "}
              <a
                href="mailto:info@beloq.es"
                className="font-bold text-beloq-dark underline"
              >
                info@beloq.es
              </a>{" "}
              con el código del módulo y te ayudamos lo antes posible.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
