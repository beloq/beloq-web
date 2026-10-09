"use client";

import { motion } from "framer-motion";
import {
  Building2,
  GraduationCap,
  Landmark,
  ShoppingCart,
  Tent,
  TrainFront,
} from "lucide-react";

const sectors = [
  {
    icon: Landmark,
    title: "Ayuntamientos",
    desc: "Una plataforma para toda tu red de movilidad ciclista. Revenue sharing que reduce gasto público.",
  },
  {
    icon: GraduationCap,
    title: "Universidades",
    desc: "El campus al que quieren pedalear. Amenidad competitiva para atraer estudiantes.",
  },
  {
    icon: ShoppingCart,
    title: "Centros Comerciales",
    desc: "Atrae al cliente que pedalea. Aparcamiento seguro como valor diferencial.",
  },
  {
    icon: Building2,
    title: "Oficinas",
    desc: "Movilidad sostenible como beneficio laboral. Bienestar + sostenibilidad.",
  },
  {
    icon: TrainFront,
    title: "Transporte Público",
    desc: "Resuelve el problema de la primera y última milla con aparcamiento seguro.",
  },
  {
    icon: Tent,
    title: "Eventos y Festivales",
    desc: "Aparcamiento temporal inteligente. Instalación rápida, sin obra, desmontable.",
  },
];

export default function SectorsGrid() {
  return (
    <section id="sectores" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold text-beloq-yellow-dark uppercase tracking-wider">
            Versatilidad total
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-beloq-dark">
            Diseñado para el mundo real
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            beloq se adapta a cualquier entorno urbano. Hardware resistente,
            software flexible, modelo de negocio que beneficia a todos.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, i) => (
            <motion.div
              key={sector.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:border-beloq-yellow transition-all duration-300"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[0_12px_0_12px] bg-beloq-yellow text-beloq-dark">
                <sector.icon aria-hidden className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-beloq-dark mb-2">
                {sector.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {sector.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
