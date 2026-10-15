import Link from "next/link";
import { FileSearch } from "lucide-react";
import type { ReactNode } from "react";
import {
  BandaCta,
  Cabecera,
  Contenedor,
  ListaCheck,
  Nota,
  Seccion,
  Tabla,
  Tarjeta,
} from "../../components/informes/ui";
import { BASE, metadatos, solicitarHref } from "../../lib/informes";

export const metadata = metadatos({
  titulo: "Ejemplo de informe: estructura de un diagnóstico de accesibilidad",
  descripcion:
    "Qué incluye un informe de movilidad de beloq, apartado por apartado: decisión, ámbito y periodo, indicadores, hallazgos y recomendaciones, fuentes y cobertura, y cómo se evalúa después una actuación. Caso ficticio y sin cifras.",
  ruta: `${BASE}/ejemplo`,
});

const CTA = solicitarHref({ servicio: "accesibilidad", origen: "ejemplo" });

/** Texto que en un informe real sería un dato: se ve como hueco a rellenar. */
function Hueco({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-beloq-gray px-1.5 py-0.5 font-mono text-[0.85em] text-beloq-dark">
      [{children}]
    </span>
  );
}

/** Plantilla de ficha: borde discontinuo para que no parezca un resultado. */
function Plantilla({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="rounded-[0_24px_0_24px] border-2 border-dashed border-beloq-dark bg-white p-6">
      <p className="text-xs font-bold uppercase tracking-wider text-beloq-dark">
        Plantilla · {titulo}
      </p>
      <dl className="mt-4 space-y-3 text-sm leading-relaxed">{children}</dl>
    </div>
  );
}

function Campo({ nombre, children }: { nombre: string; children: ReactNode }) {
  return (
    <div>
      <dt className="font-bold text-beloq-dark">{nombre}</dt>
      <dd className="mt-0.5 text-gray-600">{children}</dd>
    </div>
  );
}

/** Esquema del ámbito: formas genéricas, sin lugar real ni datos. */
function EsquemaAmbito() {
  const parada = (x: number, y: number, k: string) => (
    <g key={k}>
      <circle cx={x} cy={y} r={11} fill="#FFEC36" stroke="#3C3C3B" strokeWidth={2.5} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill="#3C3C3B">
        P
      </text>
    </g>
  );
  const bici = (x: number, y: number, k: string) => (
    <g key={k}>
      <rect x={x - 11} y={y - 11} width={22} height={22} fill="#FFFFFF" stroke="#3C3C3B" strokeWidth={2.5} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill="#3C3C3B">
        B
      </text>
    </g>
  );
  return (
    <figure className="rounded-[0_24px_0_24px] border border-gray-200 bg-white p-4 sm:p-6">
      <svg
        viewBox="0 0 640 380"
        role="img"
        aria-labelledby="esquema-titulo esquema-desc"
        className="h-auto w-full"
      >
        <title id="esquema-titulo">Esquema ilustrativo del ámbito de análisis</title>
        <desc id="esquema-desc">
          Un centro de trabajo ficticio con dos entradas, rodeado por un radio de
          análisis a pie. Alrededor hay paradas de autobús, estaciones de bicicleta
          compartida, una estación de tren o metro y un aparcamiento seguro. No
          representa un lugar real ni contiene datos.
        </desc>
        <rect x={0} y={0} width={640} height={380} fill="#F5F5F5" />
        {/* Calles */}
        <g stroke="#FFFFFF" strokeWidth={16} strokeLinecap="square">
          <line x1={0} y1={95} x2={640} y2={95} />
          <line x1={0} y1={300} x2={640} y2={300} />
          <line x1={150} y1={0} x2={150} y2={380} />
          <line x1={500} y1={0} x2={500} y2={380} />
          <line x1={40} y1={380} x2={330} y2={95} />
        </g>
        {/* Vía de tren o metro: línea continua con traviesas */}
        <line x1={0} y1={40} x2={640} y2={40} stroke="#3C3C3B" strokeWidth={6} />
        <line x1={0} y1={40} x2={640} y2={40} stroke="#FFFFFF" strokeWidth={2} strokeDasharray="10 10" />
        <circle cx={380} cy={40} r={13} fill="#3C3C3B" />
        <text x={380} y={44.5} textAnchor="middle" fontSize={12} fontWeight={700} fill="#FFEC36">
          T
        </text>
        {/* Radio de análisis a pie */}
        <circle cx={330} cy={200} r={150} fill="none" stroke="#3C3C3B" strokeWidth={2} strokeDasharray="6 6" />
        {/* Centro y entradas */}
        <rect x={270} y={160} width={120} height={80} fill="#3C3C3B" />
        <text x={330} y={205} textAnchor="middle" fontSize={14} fontWeight={700} fill="#FFFFFF">
          Centro
        </text>
        {[
          [300, 160, "E1"],
          [390, 215, "E2"],
        ].map(([x, y, t]) => (
          <g key={t as string}>
            <rect x={(x as number) - 14} y={(y as number) - 10} width={28} height={20} fill="#FFEC36" stroke="#3C3C3B" strokeWidth={2} />
            <text x={x as number} y={(y as number) + 4} textAnchor="middle" fontSize={10} fontWeight={700} fill="#3C3C3B">
              {t}
            </text>
          </g>
        ))}
        {parada(150, 95, "p1")}
        {parada(240, 300, "p2")}
        {parada(500, 160, "p3")}
        {parada(585, 300, "p4")}
        {bici(205, 190, "b1")}
        {bici(450, 95, "b2")}
        {bici(560, 340, "b3")}
        {/* Aparcamiento seguro */}
        <rect x={398} y={258} width={30} height={22} rx={0} fill="#FFFFFF" stroke="#3C3C3B" strokeWidth={2.5} />
        <text x={413} y={273} textAnchor="middle" fontSize={11} fontWeight={700} fill="#3C3C3B">
          AS
        </text>
      </svg>
      <ul className="mt-4 grid gap-x-6 gap-y-2 text-sm text-gray-600 sm:grid-cols-2 lg:grid-cols-3">
        <li><strong className="text-beloq-dark">E1, E2</strong>: entradas del centro</li>
        <li><strong className="text-beloq-dark">P</strong>: paradas de autobús</li>
        <li><strong className="text-beloq-dark">T</strong>: estación de tren o metro, sobre su vía</li>
        <li><strong className="text-beloq-dark">B</strong>: estaciones de bicicleta compartida</li>
        <li><strong className="text-beloq-dark">AS</strong>: aparcamiento seguro</li>
        <li><strong className="text-beloq-dark">Círculo discontinuo</strong>: radio de análisis a pie</li>
      </ul>
      <figcaption className="mt-4 text-sm font-bold text-beloq-dark">
        Esquema ilustrativo. No representa un lugar real ni contiene datos.
      </figcaption>
    </figure>
  );
}

export default function EjemploPage() {
  return (
    <>
      <Cabecera
        migas={[{ label: "Ejemplo de informe" }]}
        titulo="Ejemplo de informe: la estructura de un diagnóstico de accesibilidad"
        entradilla={
          <p>
            Qué incluye un informe, apartado por apartado, con un caso ficticio: un
            centro de trabajo con turnos que quiere saber cómo puede llegar su
            plantilla sin coche y qué medidas priorizar.
          </p>
        }
        indice={[
          { href: "#decision", label: "1. Decisión" },
          { href: "#ambito", label: "2. Ámbito y periodo" },
          { href: "#indicadores", label: "3. Indicadores" },
          { href: "#hallazgos", label: "4. Hallazgos y recomendaciones" },
          { href: "#fuentes", label: "5. Fuentes y cobertura" },
          { href: "#evaluacion", label: "6. Evaluación posterior" },
        ]}
      >
        <div className="mt-8 max-w-3xl">
          <Nota icono={FileSearch} titulo="Ejemplo de estructura, no un informe real">
            <p>
              El caso es ficticio y esta página no contiene resultados: no hay cifras,
              conclusiones ni opiniones de clientes. Los datos que en un informe real
              aparecerían se muestran como huecos entre corchetes, por ejemplo{" "}
              <Hueco>n</Hueco>.
            </p>
          </Nota>
        </div>
      </Cabecera>

      <Seccion
        id="decision"
        titulo="1. La decisión que se quiere resolver"
        intro={
          <p>
            Un informe empieza por la decisión, no por los datos. En el caso del
            ejemplo, un centro de trabajo con turnos que empiezan a las 6:00, a las
            14:00 y a las 22:00 se plantea:
          </p>
        }
      >
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <Tarjeta tono="oscura">
            <p className="text-xs font-bold uppercase tracking-wider text-beloq-yellow">
              Decisión
            </p>
            <p className="mt-3 text-lg font-bold leading-snug">
              ¿Qué medidas conviene priorizar para que la plantilla pueda llegar a
              cada turno sin depender del coche?
            </p>
          </Tarjeta>
          <div>
            <h3 className="font-bold text-beloq-dark">Preguntas de análisis que se derivan</h3>
            <div className="mt-4">
              <ListaCheck
                items={[
                  "¿Qué servicios de transporte público llegan a tiempo a cada turno, y con qué margen?",
                  "¿Qué conexiones tienen poco margen de transbordo?",
                  "¿Hay bicicleta compartida disponible cerca del centro a esas horas?",
                  "¿Es suficiente y está bien situado el aparcamiento de bicis y patinetes?",
                  "¿Qué medidas resolverían más problemas y quién puede aplicarlas?",
                ]}
              />
            </div>
          </div>
        </div>
      </Seccion>

      <Seccion
        id="ambito"
        fondo="gris"
        titulo="2. Ámbito y periodo del análisis"
        intro={
          <p>
            Se acuerda al principio y se escribe en el informe, porque cada cifra
            solo vale para ese ámbito y ese periodo.
          </p>
        }
      >
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <EsquemaAmbito />
          <Tarjeta>
            <dl className="space-y-4 text-sm leading-relaxed">
              <Campo nombre="Ámbito">
                El centro, sus dos entradas y un radio de <Hueco>distancia</Hueco> a
                pie alrededor; además, las líneas que conectan con las zonas de
                origen de la plantilla.
              </Campo>
              <Campo nombre="Periodo">
                <Hueco>4 semanas</Hueco> de días laborables entre <Hueco>fecha</Hueco>{" "}
                y <Hueco>fecha</Hueco>, sin festivos ni eventos excepcionales.
              </Campo>
              <Campo nombre="Horarios">
                La versión de horarios de cada operador vigente en ese periodo.
              </Campo>
              <Campo nombre="Franjas">
                Los 60 minutos antes y después de cada inicio y fin de turno.
              </Campo>
              <Campo nombre="Fuera del alcance">
                Viajes por motivos distintos del trabajo y desplazamientos durante la
                jornada.
              </Campo>
            </dl>
          </Tarjeta>
        </div>
      </Seccion>

      <Seccion
        id="indicadores"
        titulo="3. Indicadores seleccionados"
        intro={
          <p>
            Pocos indicadores, elegidos por la decisión. Cada uno tiene su ficha
            completa en el anexo (definición, cálculo, unidad, fuente, periodo, tipo
            de resultado y limitaciones).
          </p>
        }
      >
        <Tabla
          titulo="Indicadores del ejemplo"
          columnas={["Indicador", "Qué mide", "Fuente", "Unidad", "Desglose"]}
          filas={[
            [
              "Llegadas útiles antes del turno",
              "Servicios programados que llegan a una parada del ámbito entre 60 y 10 minutos antes del inicio del turno.",
              "Horarios de los operadores",
              "Llegadas",
              "Turno, parada y tipo de día",
            ],
            [
              "Margen de llegada a la entrada",
              "Minutos entre la llegada a pie a cada entrada y el inicio del turno, sumando el tramo a pie estimado.",
              "Horarios + red de calles",
              "Minutos",
              "Turno, entrada y servicio",
            ],
            [
              "Margen de transbordo",
              "Minutos entre la llegada de un servicio y la salida del siguiente en las conexiones relevantes.",
              "Horarios de los operadores",
              "Minutos",
              "Conexión y turno",
            ],
            [
              "Disponibilidad de bicicleta compartida",
              "Parte del tiempo en que las estaciones cercanas tienen al menos una bici (al llegar) o un anclaje libre (al salir).",
              "Disponibilidad por estación",
              "% del tiempo",
              "Estación y franja",
            ],
            [
              "Aparcamiento de bicis y patinetes",
              "Plazas disponibles por tipo y distancia a cada entrada.",
              "Inventario + datos del centro",
              "Plazas y metros",
              "Entrada y tipo de plaza",
            ],
            [
              "Ocupación del aparcamiento seguro",
              "Plazas ocupadas por franja. Solo si hay estaciones beloq en el ámbito.",
              "Telemetría beloq",
              "% de plazas",
              "Franja y tipo de día",
            ],
          ]}
        />
      </Seccion>

      <Seccion
        id="hallazgos"
        fondo="gris"
        titulo="4. Cómo se presentan los hallazgos y las recomendaciones"
        intro={
          <p>
            El informe empieza por un resumen ejecutivo: la pregunta, la respuesta
            corta, los hallazgos principales, las recomendaciones priorizadas y las
            limitaciones. Después, cada hallazgo y cada recomendación tienen su ficha.
          </p>
        }
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Plantilla titulo="Hallazgo">
            <Campo nombre="Enunciado">
              Una frase con el resultado. Por ejemplo: «En el periodo analizado,{" "}
              <Hueco>n</Hueco> de los <Hueco>n</Hueco> servicios que llegan antes del
              turno de las 6:00 lo hacen con menos de <Hueco>n</Hueco> minutos de
              margen en la entrada E2».
            </Campo>
            <Campo nombre="Evidencia">
              Indicador, valor, periodo y fuente, con el mapa o gráfico que lo
              muestra.
            </Campo>
            <Campo nombre="Tipo de resultado">
              Observación, estimación o escenario.
            </Campo>
            <Campo nombre="Alcance y limitaciones">
              Qué no permite afirmar. Por ejemplo, que los horarios describen la
              oferta programada, no los viajeros.
            </Campo>
          </Plantilla>
          <Plantilla titulo="Recomendación">
            <Campo nombre="Prioridad">
              Alta, media o baja, con el criterio: a cuántas personas afecta, qué
              problema resuelve y cuánto cuesta aplicarla.
            </Campo>
            <Campo nombre="Medida">
              Qué se propone hacer. Por ejemplo: «Estudiar con el operador el horario
              de la línea <Hueco>línea</Hueco> en la franja <Hueco>franja</Hueco>».
            </Campo>
            <Campo nombre="Hallazgos que la justifican">
              Referencia a las fichas de hallazgo.
            </Campo>
            <Campo nombre="Quién puede aplicarla">
              La empresa, el operador de transporte o la administración.
            </Campo>
            <Campo nombre="Indicador para seguirla">
              Qué indicador debería cambiar si la medida funciona.
            </Campo>
          </Plantilla>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Tarjeta>
            <h3 className="font-bold text-beloq-dark">Mapas</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Entradas, paradas, estaciones y aparcamientos del ámbito, con el
              indicador de cada punto: dónde está el problema.
            </p>
          </Tarjeta>
          <Tarjeta>
            <h3 className="font-bold text-beloq-dark">Gráficos</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Llegadas por franja alrededor de cada turno o disponibilidad de bicis a
              lo largo del día: cuándo ocurre.
            </p>
          </Tarjeta>
          <Tarjeta>
            <h3 className="font-bold text-beloq-dark">Tablas</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Los valores de los que salen mapas y gráficos, para revisarlos o
              reutilizarlos.
            </p>
          </Tarjeta>
        </div>
      </Seccion>

      <Seccion
        id="fuentes"
        titulo="5. Fuentes y cobertura"
        intro={
          <p>
            El anexo dice qué datos se han usado, de qué fechas, qué cubren y qué
            limitaciones tienen. En el caso del ejemplo sería así:
          </p>
        }
      >
        <Tabla
          titulo="Anexo de fuentes del ejemplo"
          columnas={["Fuente", "Qué aporta", "Versión o periodo", "Cobertura", "Limitaciones"]}
          filas={[
            [
              "Horarios de autobús, metro y tren (GTFS)",
              "Oferta programada por parada y hora.",
              <>Versión vigente del <Hueco>fecha</Hueco> al <Hueco>fecha</Hueco></>,
              "Todas las paradas del ámbito.",
              "No incluye retrasos ni viajeros.",
            ],
            [
              "Disponibilidad de bicicleta compartida",
              "Bicis y anclajes libres por estación.",
              <>Registros cada <Hueco>n</Hueco> minutos del periodo</>,
              <>Estaciones del radio; huecos de captura: <Hueco>lista</Hueco></>,
              "No equivale al número de viajes.",
            ],
            [
              "Inventarios municipales",
              "Aparcabicis, red ciclista, límites de barrios.",
              <>Descarga del <Hueco>fecha</Hueco></>,
              "Término municipal.",
              "Puede no recoger cambios recientes.",
            ],
            [
              "Datos del centro",
              "Turnos, personas por turno, accesos y aparcamiento propio.",
              <>Facilitados el <Hueco>fecha</Hueco></>,
              "El centro analizado.",
              "Cifras agregadas, sin datos individuales.",
            ],
            [
              "Telemetría beloq",
              "Ocupación, duración y rotación del aparcamiento seguro.",
              "Periodo analizado",
              "Solo si hay estaciones beloq en el ámbito.",
              "No mide el aparcamiento de otros sistemas.",
            ],
          ]}
        />
      </Seccion>

      <Seccion
        id="evaluacion"
        fondo="gris"
        titulo="6. Cómo se comprobaría después una actuación"
        intro={
          <p>
            Si la empresa aplica una recomendación (por ejemplo, ampliar el
            aparcamiento de bicis junto a la entrada E2 o acordar un cambio de
            horario con el operador), el informe deja preparada su evaluación:
          </p>
        }
      >
        <figure>
          <div className="grid gap-3 text-sm md:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-[0_24px_0_24px] bg-white p-5">
              <p className="font-bold text-beloq-dark">Periodo antes</p>
              <p className="mt-1 text-gray-600">
                Indicadores del informe, en <Hueco>4 semanas</Hueco> comparables.
              </p>
            </div>
            <div className="flex items-center justify-center rounded-[0_24px_0_24px] bg-beloq-dark px-5 py-4 font-bold text-beloq-yellow">
              Actuación
            </div>
            <div className="rounded-[0_24px_0_24px] bg-white p-5">
              <p className="font-bold text-beloq-dark">Periodo después</p>
              <p className="mt-1 text-gray-600">
                Mismos indicadores, mismo método y mismo tipo de días.
              </p>
            </div>
            <div className="rounded-[0_24px_0_24px] border-2 border-dashed border-beloq-dark p-5 md:col-span-3">
              <p className="font-bold text-beloq-dark">Zona de referencia</p>
              <p className="mt-1 text-gray-600">
                Si es posible, los mismos indicadores en una zona parecida sin la
                actuación y en los mismos periodos.
              </p>
            </div>
          </div>
          <figcaption className="mt-3 text-sm text-gray-600">
            Esquema de una comparación antes/después con zona de referencia.
          </figcaption>
        </figure>
        <div className="mt-8 max-w-3xl">
          <ListaCheck
            items={[
              "Los indicadores se fijan antes de la actuación, no después de ver los resultados.",
              "Se anotan los cambios de contexto: horarios nuevos del operador, obras, clima, calendario laboral.",
              "Se distingue la implantación (¿se ha hecho la medida?) del efecto (¿qué ha cambiado?).",
              "El informe de evaluación dice con qué grado de certeza se puede atribuir cada cambio a la actuación.",
            ]}
          />
        </div>
      </Seccion>

      <section className="bg-white py-10">
        <Contenedor>
          <p className="max-w-3xl text-sm leading-relaxed text-gray-600">
            Un informe real añade la portada con el cliente, la fecha y la autoría,
            el anexo de metodología y la ficha de cada indicador. Puedes leer cómo
            trabajamos en la{" "}
            <Link
              href={`${BASE}/metodologia`}
              className="font-bold text-beloq-dark underline underline-offset-4"
            >
              metodología
            </Link>
            .
          </p>
        </Contenedor>
      </section>

      <BandaCta
        titulo="Solicita este análisis para tu organización"
        texto={
          <p>
            Con tu ubicación, tus horarios y la decisión que tienes por delante,
            preparamos una propuesta con alcance, entregables, calendario y
            presupuesto.
          </p>
        }
        href={CTA}
        boton="Solicitar este análisis para mi organización"
      />
    </>
  );
}
