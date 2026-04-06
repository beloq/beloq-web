import Image from "next/image";
import Link from "next/link";

interface LegalPageProps {
  title: string;
  version: string;
  date: string;
  children: React.ReactNode;
}

export default function LegalPage({ title, version, date, children }: LegalPageProps) {
  return (
    <section className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-block mb-8">
          <Image
            src="/images/logo-black.png"
            alt="Beloq"
            width={100}
            height={33}
            className="h-7 w-auto"
          />
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-beloq-dark mb-2">
          {title}
        </h1>
        <p className="text-sm text-gray-400 mb-10">
          Versión {version} — Última actualización: {date}
        </p>

        <div className="prose prose-gray max-w-none [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-beloq-dark [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-beloq-dark [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:text-gray-600 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2 [&_table]:w-full [&_table]:mb-6 [&_td]:py-2 [&_td]:pr-4 [&_td]:text-gray-600 [&_td]:text-sm [&_td]:border-b [&_td]:border-gray-100 [&_strong]:text-beloq-dark [&_a]:text-beloq-yellow-dark [&_a]:underline">
          {children}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-400">
          <p>
            Este documento ha sido generado con asistencia de inteligencia
            artificial y constituye un borrador inicial. Se recomienda revisión
            por un profesional legal antes de su publicación definitiva.
          </p>
          <div className="mt-6 flex gap-4 flex-wrap">
            <Link href="/legal/aviso-legal" className="hover:text-beloq-dark transition-colors">Aviso Legal</Link>
            <Link href="/legal/privacidad" className="hover:text-beloq-dark transition-colors">Privacidad</Link>
            <Link href="/legal/terminos" className="hover:text-beloq-dark transition-colors">Términos</Link>
            <Link href="/legal/cookies" className="hover:text-beloq-dark transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
