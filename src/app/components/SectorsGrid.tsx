"use client";

import { motion } from "framer-motion";

const sectors = [
  {
    icon: "🏛️",
    title: "Ayuntamientos",
    desc: "Una plataforma para toda tu red de movilidad ciclista. Revenue sharing que reduce gasto público.",
    color: "from-amber-400 to-yellow-500",
  },
  {
    icon: "🎓",
    title: "Universidades",
    desc: "El campus al que quieren pedalear. Amenidad competitiva para atraer estudiantes.",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: "🛒",
    title: "Centros Comerciales",
    desc: "Atrae al cliente que pedalea. Aparcamiento seguro como valor diferencial.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: "🏢",
    title: "Oficinas",
    desc: "Movilidad sostenible como beneficio laboral. Bienestar + sostenibilidad.",
    color: "from-purple-400 to-violet-500",
  },
  {
    icon: "🚇",
    title: "Transporte Público",
    desc: "Resuelve el problema de la primera y última milla con aparcamiento seguro.",
    color: "from-red-400 to-rose-500",
  },
  {
    icon: "🎪",
    title: "Eventos y Festivales",
    desc: "Aparcamiento temporal inteligente. Instalación rápida, sin obra, desmontable.",
    color: "from-orange-400 to-amber-500",
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
            Beloq se adapta a cualquier entorno urbano. Hardware resistente,
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
              className="group relative bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:border-beloq-yellow transition-all duration-300 cursor-pointer"
            >
              <div className="text-4xl mb-4">{sector.icon}</div>
              <h3 className="text-xl font-bold text-beloq-dark mb-2">
                {sector.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {sector.desc}
              </p>
              <div className="mt-4 text-beloq-yellow-dark font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Saber más →
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
