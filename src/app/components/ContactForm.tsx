"use client";

import { useState } from "react";

type ContactType = "usuario" | "empresa" | "partner";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    tipo: "empresa" as ContactType,
    mensaje: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("sent");
        setFormData({ nombre: "", email: "", tipo: "empresa", mensaje: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-beloq-dark mb-2">
          ¡Mensaje enviado!
        </h3>
        <p className="text-gray-500">
          Te responderemos en menos de 48 horas.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-beloq-yellow-dark font-bold hover:underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-bold text-beloq-dark mb-2"
          >
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            required
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-beloq-yellow focus:border-transparent outline-none transition-all"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-bold text-beloq-dark mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-beloq-yellow focus:border-transparent outline-none transition-all"
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-beloq-dark mb-2">
          Soy...
        </label>
        <div className="flex gap-3">
          {[
            { value: "usuario", label: "Usuario" },
            { value: "empresa", label: "Empresa / Institución" },
            { value: "partner", label: "Partner" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  tipo: opt.value as ContactType,
                })
              }
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                formData.tipo === opt.value
                  ? "bg-beloq-yellow text-beloq-dark"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="mensaje"
          className="block text-sm font-bold text-beloq-dark mb-2"
        >
          Mensaje
        </label>
        <textarea
          id="mensaje"
          required
          rows={5}
          value={formData.mensaje}
          onChange={(e) =>
            setFormData({ ...formData, mensaje: e.target.value })
          }
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-beloq-yellow focus:border-transparent outline-none transition-all resize-none"
          placeholder="Cuéntanos en qué podemos ayudarte..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-beloq-yellow text-beloq-dark font-bold py-4 rounded-full hover:bg-beloq-yellow-dark transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "Enviando..." : "Enviar mensaje"}
      </button>

      {status === "error" && (
        <p className="text-red-500 text-sm text-center">
          Hubo un error. Por favor, inténtalo de nuevo o escríbenos a
          contacto@beloq.es
        </p>
      )}
    </form>
  );
}
