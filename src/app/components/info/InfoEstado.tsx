import {
  STATUS_PAGE_URL,
  horaMadrid,
  type PublicStation,
  type PublicStatus,
  type SemaforoEstado,
} from "../../lib/info";

// Colores de estado del Design System (success / warning / error / offline).
const SEMAFORO: Record<SemaforoEstado, { label: string; color: string }> = {
  operativo: { label: "Operativo", color: "bg-[#4CAF50]" },
  incidencia: { label: "Incidencia", color: "bg-[#FFA726]" },
  caido: { label: "Caído", color: "bg-[#E53935]" },
  desconocido: { label: "Sin datos", color: "bg-gray-400" },
};

const AVISO: Record<
  NonNullable<PublicStatus["aviso"]>["nivel"],
  { fondo: string; barra: string }
> = {
  info: { fondo: "bg-beloq-gray", barra: "border-beloq-dark" },
  aviso: { fondo: "bg-[#FFF3E0]", barra: "border-[#FFA726]" },
  incidencia: { fondo: "bg-[#FDECEA]", barra: "border-[#E53935]" },
};

const ESTADO_ESTACION: Record<string, string> = {
  mantenimiento: "En mantenimiento",
  inactiva: "Fuera de servicio",
};

function desdeMadrid(iso: string): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Madrid",
  }).format(new Date(iso));
}

/** BELOQ_INFO §3.3: semáforos y aviso de /status/public, y las estaciones. */
export default function InfoEstado({
  status,
  stations,
}: {
  status: PublicStatus | null;
  stations: PublicStation[] | null;
}) {
  return (
    <section id="estado" className="scroll-mt-20 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="text-2xl font-bold text-beloq-dark sm:text-3xl">
            ¿Funciona beloq ahora?
          </h2>
          {status && (
            <p className="text-sm text-gray-500">
              Actualizado a las {horaMadrid(status.actualizado)}
            </p>
          )}
        </div>

        {status?.aviso && (
          <div
            role="status"
            className={`mt-6 rounded-[0_24px_0_24px] border-l-4 p-4 ${AVISO[status.aviso.nivel]?.fondo ?? AVISO.info.fondo} ${AVISO[status.aviso.nivel]?.barra ?? AVISO.info.barra}`}
          >
            <p className="font-bold text-beloq-dark">{status.aviso.texto}</p>
            <p className="mt-1 text-sm text-gray-600">
              Desde el {desdeMadrid(status.aviso.desde)}
            </p>
          </div>
        )}

        {status ? (
          <ul className="mt-6 divide-y divide-gray-100 rounded-[0_24px_0_24px] bg-beloq-gray px-4">
            {status.semaforos.map((s) => {
              const e = SEMAFORO[s.estado] ?? SEMAFORO.desconocido;
              return (
                <li key={s.id} className="py-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-bold text-beloq-dark">{s.nombre}</span>
                    <span className="flex shrink-0 items-center gap-2 text-sm font-bold text-beloq-dark">
                      <span aria-hidden className={`h-3 w-3 rounded-full ${e.color}`} />
                      {e.label}
                    </span>
                  </div>
                  {s.motivo && (
                    <p className="mt-1 text-sm text-gray-600">{s.motivo}</p>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-6 text-gray-700">
            Ahora no podemos mostrar el estado del sistema.
          </p>
        )}

        <p className="mt-4 text-sm">
          <a
            href={STATUS_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-beloq-dark underline"
          >
            Ver el estado detallado en status.beloq.es
          </a>
        </p>

        <h3 className="mt-10 text-xl font-bold text-beloq-dark">Estaciones</h3>
        {stations === null ? (
          <p className="mt-4 text-gray-700">
            Ahora no podemos cargar las estaciones.
          </p>
        ) : stations.length === 0 ? (
          <p className="mt-4 text-gray-700">Todavía no hay estaciones.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {stations.map((st) => {
              const direccion = [st.direccion, st.ciudad].filter(Boolean).join(", ");
              const estado = ESTADO_ESTACION[st.estado_estacion];
              return (
                <li
                  key={st.id}
                  className="flex items-center justify-between gap-4 rounded-[0_24px_0_24px] bg-white p-4 shadow-[0_4px_10px_rgba(0,0,0,0.05)] ring-1 ring-gray-100"
                >
                  <div className="min-w-0">
                    <p className="font-bold text-beloq-dark">{st.nombre_estacion}</p>
                    {direccion && (
                      <p className="text-sm text-gray-600">{direccion}</p>
                    )}
                    {estado && (
                      <p className="mt-1 text-sm font-bold text-[#E53935]">{estado}</p>
                    )}
                    {st.modulosSinSenal > 0 && (
                      <p className="mt-1 text-sm font-bold text-[#E53935]">
                        {st.modulosSinSenal} sin señal
                      </p>
                    )}
                  </div>
                  <p className="shrink-0 text-right text-beloq-dark">
                    <span className="text-3xl font-bold">{st.modulosDisponibles}</span>
                    <span className="text-gray-500"> / {st.modulosTotales}</span>
                    <span className="block text-xs text-gray-500">libres</span>
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
