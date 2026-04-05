"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 sm:py-28 bg-beloq-gray">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm hover:shadow-lg transition-shadow"
          >
            <h3 className="text-2xl font-bold text-beloq-dark mb-4">
              Explora nuestras soluciones
            </h3>
            <p className="text-gray-500 mb-6">
              Descubre cómo Beloq puede transformar la movilidad en tu ciudad,
              campus o empresa.
            </p>
            <a
              href="#que-es-beloq"
              className="inline-block border-2 border-beloq-dark text-beloq-dark font-bold px-8 py-3 rounded-full hover:bg-beloq-dark hover:text-white transition-all"
            >
              Descubrir Beloq
            </a>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-beloq-yellow rounded-2xl p-8 sm:p-10 shadow-sm hover:shadow-lg transition-shadow"
          >
            <h3 className="text-2xl font-bold text-beloq-dark mb-4">
              Pide tu presupuesto gratis
            </h3>
            <p className="text-beloq-dark/70 mb-6">
              Sin compromiso. Te preparamos un estudio personalizado para tu
              caso en menos de 48 horas.
            </p>
            <Link
              href="/contacto"
              className="inline-block bg-beloq-dark text-white font-bold px-8 py-3 rounded-full hover:bg-black transition-colors"
            >
              Solicitar presupuesto
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
