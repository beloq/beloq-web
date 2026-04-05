"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const tabs = [
  {
    id: "beloquer",
    label: "Beloquer",
    subtitle: "Usuario final",
    image: "/images/ciclista.png",
    steps: [
      {
        number: "01",
        title: "Descarga la app gratis",
        desc: "Disponible en iOS y Android. Regístrate en segundos.",
      },
      {
        number: "02",
        title: "Escanea el QR",
        desc: "Encuentra tu estación en el mapa y escanea el código QR del módulo.",
      },
      {
        number: "03",
        title: "Aparca seguro",
        desc: "3 horas al día gratis. Tu bici o patinete protegido con electro-cierre IoT.",
      },
    ],
  },
  {
    id: "gestor",
    label: "Gestor",
    subtitle: "Operador B2B/B2G",
    image: "/images/app-mockup.png",
    steps: [
      {
        number: "01",
        title: "Accede al dashboard",
        desc: "Consola cloud con datos en tiempo real de toda tu red de estaciones.",
      },
      {
        number: "02",
        title: "Monitoriza en tiempo real",
        desc: "Ocupación, incidencias, telemetría y uso por estación y módulo.",
      },
      {
        number: "03",
        title: "Cuanto más se usa, menos pagas",
        desc: "Revenue sharing: el 100% de lo que pagan los usuarios se descuenta de tu factura.",
      },
    ],
  },
  {
    id: "ciudad",
    label: "Ciudad",
    subtitle: "Institución",
    image: "/images/valencia.png",
    steps: [
      {
        number: "01",
        title: "Solicita un estudio",
        desc: "Analizamos las mejores ubicaciones y necesidades de tu municipio.",
      },
      {
        number: "02",
        title: "Desplegamos sin obra civil",
        desc: "Instalación rápida. Sin zanjas, sin cableado, sin interrupciones.",
      },
      {
        number: "03",
        title: "Revenue sharing = ahorro",
        desc: "Hardware-as-a-Service: cuanto más uso tiene, menos gasto público genera.",
      },
    ],
  },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState("beloquer");
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <section id="como-funciona" className="py-20 sm:py-28 bg-beloq-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-bold text-beloq-yellow-dark uppercase tracking-wider">
            Sencillo y rápido
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-beloq-dark">
            ¿Cómo funciona?
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full p-1.5 shadow-md">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-beloq-yellow text-beloq-dark shadow-sm"
                    : "text-gray-500 hover:text-beloq-dark"
                }`}
              >
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.slice(0, 3)}</span>
                <span className="hidden md:inline text-xs font-normal ml-1 opacity-70">
                  ({tab.subtitle})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Steps */}
            <div className="space-y-8">
              {active.steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-5"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-beloq-yellow rounded-full flex items-center justify-center font-bold text-beloq-dark text-sm">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-beloq-dark">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 mt-1">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Illustration */}
            <div className="flex justify-center">
              <Image
                src={active.image}
                alt={active.label}
                width={450}
                height={450}
                className="w-full max-w-sm"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
