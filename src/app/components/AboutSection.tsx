"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    icon: "🔒",
    title: "Electro-cierre IoT",
    desc: "Telemetría en tiempo real y bloqueo inteligente",
  },
  {
    icon: "📡",
    title: "Red 4G autónoma",
    desc: "Batería propia + solar opcional. Sin depender de infraestructura",
  },
  {
    icon: "📱",
    title: "App gratuita",
    desc: "Mapa de estaciones, reservas, historial y gestión completa",
  },
  {
    icon: "☁️",
    title: "Dashboard cloud",
    desc: "Consola B2B para operadores y gestores con datos en tiempo real",
  },
];

export default function AboutSection() {
  return (
    <section id="que-es-beloq" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-bold text-beloq-yellow-dark uppercase tracking-wider">
              ¿Qué es Beloq?
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-beloq-dark leading-tight">
              Más que un candado.{" "}
              <span className="text-beloq-yellow-dark">
                Infraestructura inteligente.
              </span>
            </h2>
            <p className="mt-6 text-gray-600 text-lg leading-relaxed">
              Beloq es un sistema completo de aparcamiento seguro: hardware +
              software + cloud. Cada módulo se instala sin obra civil y opera de
              forma autónoma con su propia red de datos 4G.
            </p>

            <div className="mt-10 space-y-6">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <span className="text-2xl flex-shrink-0">{f.icon}</span>
                  <div>
                    <h3 className="font-bold text-beloq-dark">{f.title}</h3>
                    <p className="text-gray-500 text-sm mt-0.5">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <Image
              src="/images/modulo-3d.png"
              alt="Módulo de anclaje inteligente Beloq"
              width={500}
              height={500}
              className="w-full max-w-md drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
