import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "./components/SiteChrome";

export const metadata: Metadata = {
  title: "Beloq - Aparcamiento inteligente para bicis y patinetes",
  description:
    "Estaciones inteligentes de aparcamiento seguro para bicicletas y patinetes eléctricos. Electro-cierre IoT, telemetría en tiempo real, app gratuita. Operativo en Valencia.",
  keywords:
    "beloq, aparcamiento bicicletas, aparcamiento patinetes, smart city, movilidad urbana, Valencia, IoT",
  openGraph: {
    title: "Beloq - Aparcamiento inteligente para bicis y patinetes",
    description:
      "Estaciones inteligentes de aparcamiento seguro para bicicletas y patinetes eléctricos.",
    url: "https://beloq.es",
    siteName: "Beloq",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
