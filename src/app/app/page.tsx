import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { APPS_PUBLICADAS, APP_STORE_URL, GOOGLE_PLAY_URL } from "../lib/info";

export const metadata: Metadata = {
  title: "beloq · la app",
  description: "Descarga la app de beloq para aparcar tu bici o tu patinete.",
};

/**
 * Destino del QR de los vinilos de las estaciones (BELOQ_INFO §1): un solo QR
 * para los dos sistemas. Android → Google Play, iPhone/iPad → App Store y el
 * ordenador → /info#apps. Mientras las tiendas no estén abiertas al público,
 * enseña «Muy pronto» (interruptor APPS_PUBLICADAS en lib/info.ts).
 */
export default async function AppPage() {
  if (APPS_PUBLICADAS) {
    const ua = (await headers()).get("user-agent") ?? "";
    if (/android/i.test(ua)) redirect(GOOGLE_PLAY_URL);
    if (/iphone|ipad|ipod/i.test(ua)) redirect(APP_STORE_URL);
    redirect("/info#apps");
  }

  return (
    <section className="flex min-h-[70vh] items-center bg-beloq-yellow pt-24 pb-16">
      <div className="mx-auto max-w-xl px-4 text-center">
        <h1 className="text-3xl font-bold text-beloq-dark sm:text-4xl">
          Muy pronto en Google Play y App Store
        </h1>
        <p className="mt-4 text-lg text-beloq-dark">
          Mientras tanto, puedes usar beloq sin la app: acerca tu móvil a la
          etiqueta del beloq.
        </p>
        <Link
          href="/info"
          className="mt-8 inline-flex items-center justify-center rounded-[0_24px_0_24px] bg-beloq-dark px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[#1A1A1A]"
        >
          Ver beloq info
        </Link>
      </div>
    </section>
  );
}
