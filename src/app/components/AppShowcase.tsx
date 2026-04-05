"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  { icon: "🗺️", label: "Mapa en tiempo real" },
  { icon: "⏱️", label: "3 horas gratis al día" },
  { icon: "📅", label: "Reserva anticipada" },
  { icon: "📊", label: "Historial completo" },
  { icon: "⭐", label: "Programa VIP" },
  { icon: "👥", label: "Invita amigxs" },
];

export default function AppShowcase() {
  return (
    <section
      id="app"
      className="py-20 sm:py-28 bg-gradient-to-br from-beloq-yellow/20 via-beloq-yellow/10 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold text-beloq-yellow-dark uppercase tracking-wider">
            Todo en tu bolsillo
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-beloq-dark">
            La app de Beloq
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Encuentra estaciones, reserva tu plaza, gestiona tu historial y
            mucho más. Gratuita para siempre.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Left features */}
          <div className="space-y-6">
            {features.slice(0, 3).map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm"
              >
                <span className="text-2xl">{f.icon}</span>
                <span className="font-bold text-beloq-dark">{f.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <Image
              src="/images/app-mockup.png"
              alt="App Beloq - Interfaz de la aplicación móvil"
              width={400}
              height={400}
              className="w-full max-w-xs drop-shadow-2xl"
            />
          </motion.div>

          {/* Right features */}
          <div className="space-y-6">
            {features.slice(3).map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm"
              >
                <span className="text-2xl">{f.icon}</span>
                <span className="font-bold text-beloq-dark">{f.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* App Store badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mt-12"
        >
          <a
            href="#"
            className="bg-beloq-dark text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-black transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left">
              <div className="text-xs opacity-70">Próximamente en</div>
              <div className="text-sm font-bold">App Store</div>
            </div>
          </a>
          <a
            href="#"
            className="bg-beloq-dark text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-black transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3.18 23.77c.55.31 1.22.28 1.74-.08l11.65-6.73-2.89-2.89L3.18 23.77zM.42 1.31C.15 1.64 0 2.08 0 2.6v18.8c0 .52.15.96.42 1.29l.1.1 10.5-10.5v-.25L.52 1.55l-.1-.1v-.14zM22.07 10.14L18.6 8.14l-3.18 3.18 3.18 3.18 3.47-2c.99-.57.99-1.79 0-2.36zM16.92 9.28L5.28 2.55c-.55-.32-1.22-.35-1.74-.08L14.04 13l2.88-3.72z" />
            </svg>
            <div className="text-left">
              <div className="text-xs opacity-70">Próximamente en</div>
              <div className="text-sm font-bold">Google Play</div>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
