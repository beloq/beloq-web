import BetaForm from "../components/BetaForm";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Sé beloquer — Prueba la app antes que nadie",
  description:
    "Regístrate como tester de la app Beloq. Aparcamiento inteligente para bicis y patinetes en Valencia.",
};

export default function BetaPage() {
  return (
    <section className="pt-28 pb-20 min-h-screen bg-gradient-to-b from-beloq-dark via-beloq-dark to-[#2a2a29] relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-beloq-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-beloq-yellow/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-lg mx-auto px-4 sm:px-6 relative">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/">
            <Image
              src="/images/logo-white.png"
              alt="Beloq"
              width={120}
              height={40}
              className="h-8 w-auto mx-auto mb-8"
            />
          </Link>

          <div className="inline-block bg-beloq-yellow/10 border border-beloq-yellow/20 text-beloq-yellow text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            Beta cerrada
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            Sé <span className="text-beloq-yellow">beloquer</span>
          </h1>
          <p className="mt-4 text-gray-400 text-base sm:text-lg leading-relaxed">
            Prueba la app antes que nadie. Aparca tu bici o patinete de forma
            segura con un toque. Estamos buscando testers en Valencia.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
          <BetaForm />
        </div>

        {/* Extra info */}
        <div className="mt-10 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl mb-1">🔒</div>
            <p className="text-xs text-gray-500">Aparcamiento seguro con IoT</p>
          </div>
          <div>
            <div className="text-2xl mb-1">📱</div>
            <p className="text-xs text-gray-500">App gratuita para siempre</p>
          </div>
          <div>
            <div className="text-2xl mb-1">⚡</div>
            <p className="text-xs text-gray-500">Operativo en Valencia</p>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-8">
          <Link href="/" className="hover:text-beloq-yellow transition-colors">
            ← Volver a beloq.es
          </Link>
        </p>
      </div>
    </section>
  );
}
