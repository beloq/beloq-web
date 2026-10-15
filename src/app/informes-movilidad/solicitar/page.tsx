import { Mail } from "lucide-react";
import FormularioSolicitud from "../../components/informes/FormularioSolicitud";
import { Cabecera, Contenedor, ListaCheck, Tarjeta } from "../../components/informes/ui";
import {
  BASE,
  ORIGENES,
  esModalidad,
  esOrigen,
  esServicio,
  esTipo,
  metadatos,
  type Solicitud,
} from "../../lib/informes";

export const metadata = metadatos({
  titulo: "Solicitar un informe de movilidad",
  descripcion:
    "Formulario para pedir una propuesta de informe o seguimiento de movilidad a beloq: cuéntanos qué necesitas decidir, analizar o justificar.",
  ruta: `${BASE}/solicitar`,
});

type Busqueda = Record<string, string | string[] | undefined>;

function uno(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export default async function SolicitarPage({
  searchParams,
}: {
  searchParams: Promise<Busqueda>;
}) {
  // Conserva desde dónde llega el visitante (?tipo=…&servicio=…&origen=…);
  // los valores que no están en las listas se ignoran.
  const q = await searchParams;
  const tipo = uno(q.tipo);
  const servicio = uno(q.servicio);
  const modalidad = uno(q.modalidad);
  const origenQ = uno(q.origen);

  const inicial: Partial<Solicitud> = {
    ...(esTipo(tipo) ? { tipo } : {}),
    ...(esServicio(servicio) ? { servicio } : {}),
    ...(esModalidad(modalidad) ? { modalidad } : {}),
  };
  const origen = esOrigen(origenQ) ? origenQ : null;
  const premarcado = Object.keys(inicial).length > 0;

  return (
    <>
      <Cabecera
        migas={[{ label: "Solicitar un informe" }]}
        titulo="Solicitar un informe de movilidad"
        entradilla={
          <>
            <p>
              Cuéntanos qué necesitas decidir, analizar o justificar. Con esta
              información preparamos una propuesta con alcance, entregables,
              calendario y presupuesto.
            </p>
            {premarcado && (
              <p className="mt-3 text-base">
                Hemos marcado algunas opciones según la página de la que vienes
                {origen ? ` (${ORIGENES[origen]})` : ""}. Puedes cambiarlas.
              </p>
            )}
          </>
        }
      />

      <section className="bg-beloq-gray py-12 sm:py-16">
        <Contenedor className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
          <FormularioSolicitud
            key={`${inicial.tipo ?? ""}|${inicial.servicio ?? ""}|${inicial.modalidad ?? ""}|${origen ?? ""}`}
            inicial={inicial}
            origen={origen}
          />

          <aside className="space-y-6">
            <Tarjeta>
              <h2 className="text-lg font-bold text-beloq-dark">Qué pasa después</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-gray-600">
                <li>Leemos tu solicitud.</li>
                <li>
                  Si hace falta, te pedimos algún dato o una llamada para concretar el
                  alcance.
                </li>
                <li>
                  Preparamos una propuesta por escrito con alcance, entregables,
                  calendario y presupuesto.
                </li>
              </ol>
            </Tarjeta>
            <Tarjeta>
              <h2 className="text-lg font-bold text-beloq-dark">Lo que no necesitamos</h2>
              <div className="mt-4 text-sm">
                <ListaCheck
                  items={[
                    "Datos de personas concretas.",
                    "Archivos de nómina ni listados de plantilla.",
                    "Documentos adjuntos: si hacen falta, te los pediremos.",
                  ]}
                />
              </div>
            </Tarjeta>
            <Tarjeta tono="oscura">
              <Mail aria-hidden className="h-6 w-6 text-beloq-yellow" />
              <h2 className="mt-3 text-lg font-bold">¿Prefieres el correo?</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-300">
                Escríbenos a{" "}
                <a
                  href="mailto:info@beloq.es"
                  className="font-bold text-beloq-yellow underline underline-offset-4"
                >
                  info@beloq.es
                </a>{" "}
                con el nombre de tu organización y lo que necesitas.
              </p>
            </Tarjeta>
          </aside>
        </Contenedor>
      </section>
    </>
  );
}
