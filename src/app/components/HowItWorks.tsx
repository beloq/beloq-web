"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Tab = {
  id: string;
  label: string;
  subtitle: string;
  image: string;
  steps: { number: string; title: string; desc: string }[];
  cta?: { label: string; href: string; helper: string };
};

const tabs: Tab[] = [
  {
    id: "beloquer",
    label: "Beloquer",
    subtitle: "Usuario",
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
    subtitle: "Operador",
    image: "/images/console-mockup.png",
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
    cta: {
      label: "Ver Demo",
      href: "/console",
      helper: "Demo interactiva con datos en vivo. Sin registro.",
    },
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
          <div className="inline-flex bg-white rounded-2xl sm:rounded-full p-1.5 shadow-md gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full text-sm font-bold transition-all flex flex-col items-center ${
                  activeTab === tab.id
                    ? "bg-beloq-yellow text-beloq-dark shadow-sm"
                    : "text-gray-500 hover:text-beloq-dark"
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[10px] sm:text-xs font-normal opacity-60 leading-tight mt-0.5">
                  {tab.subtitle}
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

              {active.cta && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 }}
                  className="rounded-2xl bg-beloq-dark p-6 sm:p-7 shadow-lg"
                >
                  <p className="text-beloq-yellow text-xs font-bold uppercase tracking-wider">
                    Pruébalo ahora
                  </p>
                  <p className="mt-2 text-white text-lg font-bold">
                    Explora la consola con datos de demo en vivo
                  </p>
                  <p className="mt-1 text-white/70 text-sm">
                    {active.cta.helper}
                  </p>
                  <Link
                    href={active.cta.href}
                    className="mt-5 inline-flex items-center gap-2 bg-beloq-yellow text-beloq-dark font-bold px-6 py-3 rounded-full hover:bg-beloq-yellow-dark transition-colors"
                  >
                    {active.cta.label}
                    <span aria-hidden>→</span>
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Illustration */}
            <div className="flex justify-center">
              <Image
                src={active.image}
                alt={active.label}
                width={450}
                height={450}
                className={`w-full ${active.cta ? "max-w-none" : "max-w-sm"}`}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
