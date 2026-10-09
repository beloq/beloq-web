"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { end: 12500, suffix: " kg", label: "CO₂ evitados al año", prefix: "" },
  { end: 8400, suffix: "+", label: "Vehículos aparcados de forma segura", prefix: "" },
  { end: 99, suffix: "%", label: "Tasa de recuperación ante incidencias", prefix: "" },
  { end: 15, suffix: " min", label: "Ahorrados vs buscar aparcamiento", prefix: "" },
];

export default function ImpactSection() {
  return (
    <section id="impacto" className="py-20 sm:py-28 bg-beloq-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold text-beloq-yellow uppercase tracking-wider">
            Estimación
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Impacto <span className="text-beloq-yellow">estimado</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              end={stat.end}
              suffix={stat.suffix}
              prefix={stat.prefix}
              label={stat.label}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-xs mt-12"
        >
          * Estimaciones, no resultados medidos.
        </motion.p>
      </div>
    </section>
  );
}
