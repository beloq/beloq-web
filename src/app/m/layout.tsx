import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "beloq · desbloquear módulo",
  description: "Desbloquea tu módulo beloq y aparca seguro.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3C3C3B",
};

export default function ModuleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <div className="flex w-full flex-1 items-start justify-center">
        {children}
      </div>
    </div>
  );
}
