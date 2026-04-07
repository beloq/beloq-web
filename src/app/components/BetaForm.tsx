"use client";

import { useState } from "react";

export default function BetaForm() {
  const [email, setEmail] = useState("");
  const [platforms, setPlatforms] = useState({ android: false, ios: false });
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [errors, setErrors] = useState<{ email?: string; platform?: string }>(
    {}
  );

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) {
      newErrors.email = "Introduce tu email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Formato de email no válido";
    }
    if (!platforms.android && !platforms.ios) {
      newErrors.platform = "Selecciona al menos una plataforma";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");

    try {
      const selectedPlatforms = [
        platforms.android && "Android",
        platforms.ios && "iOS",
      ]
        .filter(Boolean)
        .join(", ");

      const res = await fetch("/api/beta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, platform: selectedPlatforms }),
      });

      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-beloq-yellow rounded-full flex items-center justify-center mx-auto mb-5">
          <svg
            className="w-8 h-8 text-beloq-dark"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          ¡Gracias por participar!
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
          En los próximos días recibirás en tu correo electrónico las
          instrucciones para instalar la app. Gracias por apoyar el proyecto.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Email */}
      <div className="mb-5">
        <label
          htmlFor="beta-email"
          className="block text-sm font-bold text-white mb-2"
        >
          Tu correo electrónico
        </label>
        <input
          id="beta-email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          className={`w-full px-4 py-3.5 bg-white/10 border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-beloq-yellow focus:border-transparent outline-none transition-all ${
            errors.email ? "border-red-500" : "border-white/10"
          }`}
          placeholder="tu@email.com"
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>
        )}
      </div>

      {/* Platform checkboxes */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-white mb-3">
          ¿En qué plataforma quieres probar la app?
        </label>
        <div className="flex gap-3">
          <label
            className={`flex-1 flex items-center gap-3 px-4 py-3.5 rounded-xl border cursor-pointer transition-all ${
              platforms.android
                ? "bg-beloq-yellow/10 border-beloq-yellow text-white"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
            }`}
          >
            <input
              type="checkbox"
              checked={platforms.android}
              onChange={(e) => {
                setPlatforms({ ...platforms, android: e.target.checked });
                if (errors.platform)
                  setErrors((prev) => ({ ...prev, platform: undefined }));
              }}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                platforms.android
                  ? "bg-beloq-yellow border-beloq-yellow"
                  : "border-gray-500"
              }`}
            >
              {platforms.android && (
                <svg
                  className="w-3 h-3 text-beloq-dark"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={4}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <div>
              <div className="text-sm font-bold">Android</div>
              <div className="text-xs opacity-60">Google Play</div>
            </div>
          </label>

          <label
            className={`flex-1 flex items-center gap-3 px-4 py-3.5 rounded-xl border cursor-pointer transition-all ${
              platforms.ios
                ? "bg-beloq-yellow/10 border-beloq-yellow text-white"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
            }`}
          >
            <input
              type="checkbox"
              checked={platforms.ios}
              onChange={(e) => {
                setPlatforms({ ...platforms, ios: e.target.checked });
                if (errors.platform)
                  setErrors((prev) => ({ ...prev, platform: undefined }));
              }}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                platforms.ios
                  ? "bg-beloq-yellow border-beloq-yellow"
                  : "border-gray-500"
              }`}
            >
              {platforms.ios && (
                <svg
                  className="w-3 h-3 text-beloq-dark"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={4}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <div>
              <div className="text-sm font-bold">iOS</div>
              <div className="text-xs opacity-60">App Store</div>
            </div>
          </label>
        </div>
        {errors.platform && (
          <p className="text-red-400 text-xs mt-1.5">{errors.platform}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-beloq-yellow text-beloq-dark font-bold py-4 rounded-full hover:bg-beloq-yellow-dark transition-colors disabled:opacity-50 text-base"
      >
        {status === "sending" ? "Registrando..." : "Quiero ser beloquer"}
      </button>

      {/* Legal text */}
      <p className="text-[11px] text-gray-500 text-center mt-4 leading-relaxed">
        Tu correo electrónico solo se utilizará para enviarte instrucciones de
        acceso al programa de testers. No se usará con fines comerciales ni se
        compartirá con terceros.
      </p>

      {status === "error" && (
        <p className="text-red-400 text-sm text-center mt-4">
          Hubo un error. Inténtalo de nuevo o escríbenos a info@beloq.es.
        </p>
      )}
    </form>
  );
}
