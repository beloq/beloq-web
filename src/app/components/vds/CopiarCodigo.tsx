"use client";

import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";

/**
 * El código en grande y un botón para copiarlo. Si el portapapeles no está
 * disponible (o el navegador lo bloquea), deja el código seleccionado para
 * copiarlo a mano.
 */
export default function CopiarCodigo({ codigo }: { codigo: string }) {
  const texto = useRef<HTMLSpanElement>(null);
  const [estado, setEstado] = useState<"" | "copiado" | "manual">("");

  const seleccionar = () => {
    const el = texto.current;
    const sel = window.getSelection();
    if (!el || !sel) return;
    const rango = document.createRange();
    rango.selectNodeContents(el);
    sel.removeAllRanges();
    sel.addRange(rango);
  };

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(codigo);
      setEstado("copiado");
      window.setTimeout(() => setEstado(""), 2500);
    } catch {
      seleccionar();
      setEstado("manual");
    }
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <span
          ref={texto}
          onClick={seleccionar}
          className="flex flex-1 items-center justify-center rounded-[0_24px_0_24px] border-2 border-dashed border-beloq-dark bg-beloq-yellow px-4 py-4 text-4xl font-bold tracking-[0.12em] text-beloq-dark select-all sm:text-5xl"
        >
          {codigo}
        </span>
        <button
          type="button"
          onClick={copiar}
          className="inline-flex items-center justify-center gap-2 rounded-[0_24px_0_24px] bg-beloq-dark px-6 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[#1A1A1A]"
        >
          {estado === "copiado" ? (
            <Check aria-hidden className="h-5 w-5" strokeWidth={2.5} />
          ) : (
            <Copy aria-hidden className="h-5 w-5" strokeWidth={2.25} />
          )}
          {estado === "copiado" ? "Copiado" : "Copiar"}
        </button>
      </div>
      <p aria-live="polite" className="mt-2 min-h-5 text-sm text-gray-700">
        {estado === "copiado" && "Código copiado. Pégalo en la app."}
        {estado === "manual" && "Mantén pulsado el código para copiarlo."}
      </p>
    </div>
  );
}
