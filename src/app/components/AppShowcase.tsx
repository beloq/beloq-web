"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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

        {/* Beta CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/beta"
            className="bg-beloq-yellow text-beloq-dark font-bold px-10 py-4 rounded-full hover:bg-beloq-yellow-dark transition-colors text-base inline-flex items-center gap-2"
          >
            Prueba la app — Sé beloquer
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
