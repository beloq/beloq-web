import Image from "next/image";
import { APPS_PUBLICADAS, APP_STORE_URL, GOOGLE_PLAY_URL } from "../../lib/info";

const BOTON =
  "inline-flex items-center justify-center rounded-[0_24px_0_24px] bg-beloq-dark px-6 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[#1A1A1A]";

/** BELOQ_INFO §3.1: tiendas (o «Muy pronto») y, en el ordenador, el QR de /app. */
export default function InfoApps() {
  return (
    <section id="apps" className="scroll-mt-20 bg-white py-12 sm:py-16">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between">
        <div className="md:max-w-md">
          <h2 className="text-2xl font-bold text-beloq-dark sm:text-3xl">
            La app de beloq
          </h2>
          {APPS_PUBLICADAS ? (
            <>
              <p className="mt-3 text-gray-700">
                Abre tu beloq con el móvil y tu huella.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href={GOOGLE_PLAY_URL} className={BOTON}>
                  Google Play
                </a>
                <a href={APP_STORE_URL} className={BOTON}>
                  App Store
                </a>
              </div>
            </>
          ) : (
            <>
              <p className="mt-3 text-xl font-bold text-beloq-dark">
                Muy pronto en Google Play y App Store.
              </p>
              <p className="mt-2 text-gray-700">
                Mientras tanto, puedes usar beloq sin la app: acerca tu móvil a
                la etiqueta del beloq.
              </p>
            </>
          )}
        </div>

        {/* El QR lleva a /app: solo tiene sentido cuando las tiendas funcionan. */}
        {APPS_PUBLICADAS && (
          <div className="hidden items-center gap-4 rounded-[0_24px_0_24px] bg-beloq-gray p-4 md:flex">
            <Image
              src="/info/qr-app.svg"
              alt="QR para descargar la app de beloq"
              width={128}
              height={128}
              unoptimized
            />
            <p className="max-w-[9rem] text-sm text-gray-700">
              Escanéalo con tu móvil
              <strong className="mt-1 block text-beloq-dark">beloq.es/app</strong>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
