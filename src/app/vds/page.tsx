import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import CopiarCodigo from "../components/vds/CopiarCodigo";
import DescargaOrdenador from "../components/vds/DescargaOrdenador";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "../lib/info";

// beloq.es/vds: la página del QR del stand en el VDS (22-oct-2026). Descarga
// según el móvil, el código VDS2026 y el chat de /info. Textos de Jesús, tal
// cual. El QR para imprimir está en public/vds/ (scripts/generar-qr-vds.mjs).

const CODIGO = "VDS2026";

export const metadata: Metadata = {
  title: "beloq en el VDS",
  description: "Descarga beloq y canjea tu código VDS2026",
  alternates: { canonical: "https://www.beloq.es/vds" },
  openGraph: {
    title: "beloq en el VDS",
    description: "Descarga beloq y canjea tu código VDS2026",
    url: "https://www.beloq.es/vds",
    siteName: "beloq",
    locale: "es_ES",
    type: "website",
  },
};

const BOTON =
  "inline-flex w-full items-center justify-center rounded-[0_24px_0_24px] bg-beloq-dark px-6 py-4 text-sm font-bold whitespace-nowrap uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[#1A1A1A] sm:w-auto";

function BotonTienda({ tienda }: { tienda: "ios" | "android" }) {
  return tienda === "ios" ? (
    <a href={APP_STORE_URL} className={BOTON}>
      App Store
    </a>
  ) : (
    <a href={GOOGLE_PLAY_URL} className={BOTON}>
      Google Play
    </a>
  );
}

function Paso({ n, children }: { n: number; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span
        aria-hidden
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0_14px_0_14px] bg-beloq-yellow text-lg font-bold text-beloq-dark"
      >
        {n}
      </span>
      <div className="min-w-0 flex-1 pt-1.5">{children}</div>
    </li>
  );
}

export default async function VdsPage() {
  const ua = (await headers()).get("user-agent") ?? "";
  const dispositivo = /android/i.test(ua)
    ? "android"
    : /iphone|ipad|ipod/i.test(ua)
      ? "ios"
      : "ordenador";

  return (
    <>
      <section className="bg-beloq-yellow pt-20 pb-8 sm:pt-28 sm:pb-12">
        <div className="mx-auto max-w-xl px-4">
          <h1 className="text-3xl leading-tight font-bold text-beloq-dark sm:text-4xl">
            ¡Te damos la bienvenida a la comunidad beloquer! 🎉
          </h1>
          <p className="mt-4 text-lg leading-snug text-beloq-dark">
            Gracias por pasarte por nuestro stand del VDS 💛 Con beloq tu bici o tu patinete se
            quedan anclados y custodiados en la calle, y los abres con tu huella desde el móvil 🔒
          </p>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <ol className="mx-auto flex max-w-xl flex-col gap-8 px-4">
          <Paso n={1}>
            <p className="text-lg font-bold text-beloq-dark">Descarga beloq 📲</p>
            <div className="mt-4">
              {dispositivo === "ordenador" ? (
                <DescargaOrdenador
                  ipad={<BotonTienda tienda="ios" />}
                  ordenador={
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                      <div className="flex flex-col gap-3">
                        <BotonTienda tienda="ios" />
                        <BotonTienda tienda="android" />
                      </div>
                      <div className="flex items-center gap-4 rounded-[0_24px_0_24px] bg-beloq-gray p-4">
                        <Image
                          src="/vds/qr-vds.svg"
                          alt="QR de beloq.es/vds"
                          width={128}
                          height={128}
                          unoptimized
                        />
                        <p className="max-w-[9rem] text-sm text-gray-700">
                          Escanéalo con tu móvil
                          <strong className="mt-1 block text-beloq-dark">beloq.es/vds</strong>
                        </p>
                      </div>
                    </div>
                  }
                />
              ) : (
                <BotonTienda tienda={dispositivo} />
              )}
            </div>
          </Paso>

          <Paso n={2}>
            <p className="text-lg font-bold text-beloq-dark">
              Canjea tu código {CODIGO} en Menú → Tu plan → ¿Tienes un código? 🎁
            </p>
            <CopiarCodigo codigo={CODIGO} />
          </Paso>

          <Paso n={3}>
            <p className="text-lg font-bold text-beloq-dark">
              Reserva un beloq de demo en la estación del Mercado Central 📍
            </p>
            <p className="mt-1 text-gray-700">Son de demostración: se reservan, pero no se abren.</p>
          </Paso>
        </ol>
      </section>

      <section className="bg-beloq-gray py-10 sm:py-14">
        <div className="mx-auto max-w-xl px-4">
          <p className="text-lg leading-snug text-beloq-dark">
            ¿Te ha encantado? ¿Mejorarías algo? Cuéntanoslo en el chat de{" "}
            <Link href="/info#chat" className="font-bold underline underline-offset-2">
              beloq.es/info
            </Link>{" "}
            💬 Leemos todo: los aplausos y lo que toca pulir 😉
          </p>
        </div>
      </section>
    </>
  );
}
