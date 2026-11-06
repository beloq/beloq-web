import Link from "next/link";
import type { ReactNode } from "react";
import BarraSolicitar from "../../components/informes/BarraSolicitar";
import ComprobadorTurnos from "../../components/informes/ComprobadorTurnos";
import {
  BandaCta,
  Boton,
  Cabecera,
  Contenedor,
  EnlaceFlecha,
  ListaCheck,
  Preguntas,
  Seccion,
  Tabla,
  Tarjeta,
} from "../../components/informes/ui";
import { BASE, metadatos, solicitarHref } from "../../lib/informes";

// Texto público del encargo del 2026-11-06 (agente-movilidad): cifras y
// enlaces tal cual; solo se adapta la forma a los componentes de la sección.

export const metadata = metadatos({
  titulo:
    "Accesibilidad por turnos para el plan de movilidad al trabajo (PMST) en València | beloq",
  absoluto: true,
  descripcion:
    "Analizamos transporte público y bici para llegar y volver de cada turno. Diagnóstico e indicadores para el plan de movilidad al trabajo de tu centro en València.",
  ruta: `${BASE}/accesibilidad-por-turnos`,
});

const CTA = solicitarHref({ servicio: "accesibilidad", origen: "accesibilidad-por-turnos" });
const EJEMPLO = `${BASE}/ejemplo`;
const BOE_LEY = "https://www.boe.es/buscar/act.php?id=BOE-A-2025-24545";

function Externo({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-beloq-dark underline decoration-beloq-yellow decoration-2 underline-offset-4"
    >
      {children}
    </a>
  );
}

function Interno({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="font-bold text-beloq-dark underline decoration-beloq-yellow decoration-2 underline-offset-4"
    >
      {children}
    </Link>
  );
}

export default function AccesibilidadPorTurnosPage() {
  return (
    <>
      <Cabecera
        migas={[{ label: "Accesibilidad por turnos" }]}
        antetitulo="Análisis de accesibilidad al trabajo por turnos en València"
        titulo="¿Puede tu plantilla llegar a cada turno sin depender del coche?"
        entradilla={
          <>
            <p>
              Cruzamos los horarios reales de transporte público y las opciones en bici
              con las horas de entrada y salida de tu centro. El resultado es el
              diagnóstico de accesibilidad que necesita tu plan de movilidad sostenible
              al trabajo (PMST), o la base para decidir una medida si ya lo tienes.
            </p>
            <p className="mt-3 text-base">
              Recibes un informe por centro con las alternativas de ida y vuelta de cada
              turno, las zonas desde las que se puede llegar y los datos que sustentan
              cada recomendación. Trabajamos con responsables de personas y operaciones,
              y con las consultoras que redactan el plan.
            </p>
          </>
        }
        acciones={
          <>
            <Boton id="cta-principal" href={CTA}>
              Solicitar presupuesto
            </Boton>
            <span className="self-center">
              <EnlaceFlecha href={EJEMPLO}>Ver cómo se estructura un informe</EnlaceFlecha>
            </span>
          </>
        }
      />

      <Seccion
        id="ida-y-vuelta"
        titulo="La ida puede encajar y la vuelta quedarse sin transporte"
        intro={
          <>
            <p>
              Una parada cercana dice poco si el primer servicio llega después de la
              entrada o el último sale antes de terminar el turno. Para una misma zona
              de residencia puede haber una alternativa razonable por la mañana y
              ninguna por la noche. Los fines de semana y los festivos cambian el
              resultado.
            </p>
            <p>
              Comprobamos el recorrido completo para las fechas y horarios de tu centro:
              llegada a tiempo, regreso, transbordos y trayecto a pie hasta el acceso
              que usa la plantilla. Para la bici, los recorridos, el aparcamiento del
              entorno y, si se plantea Valenbisi, la disponibilidad observada de bicis y
              de anclajes en esa franja.
            </p>
          </>
        }
      />

      <Seccion
        id="comprobador"
        fondo="gris"
        titulo="Pruébalo con un polígono real"
        intro={
          <p>
            Horarios programados de los autobuses que entran en el Parc Tecnològic de
            Paterna en días laborables. Pon las horas de un turno y mira si la ida y la
            vuelta encajan.
          </p>
        }
      >
        <div className="max-w-3xl">
          <ComprobadorTurnos />
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            Turnos de ejemplo{" "}
            <span className="rounded-[0_6px_0_6px] bg-beloq-dark px-1.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-beloq-yellow">
              Ilustrativo
            </span>
            ; horarios reales de MetGo en paradas del parque: el primer autobús llega a
            las 06:42 y el último a las 21:40; el primero sale a las 06:44 y el último a
            las 21:35 (líneas 131, 135 y 144, hoja del 2025-09-08; lanzadera 130 desde
            el metro de Empalme, actualización del 2026-06-01). Solo laborables. Es
            horario programado: dice si el viaje encaja sobre el papel, no si el autobús
            llega puntual, y no mide la frecuencia a cada hora. En tu centro se hace con
            sus líneas, sus accesos y el tiempo a pie desde la parada.
          </p>
        </div>
      </Seccion>

      <Seccion
        id="que-recibes"
        titulo="Qué recibes"
        intro={
          <p>
            Un informe por centro, en PDF y en web, con tablas y mapas, organizado por
            turno y zona de origen. La pieza principal es la tabla de alternativas con
            tiempos, conexiones y márgenes respecto a la entrada y la salida, como la de
            arriba pero para cada línea y cada acceso.
          </p>
        }
      >
        <div className="max-w-3xl">
          {/* Sin ancho mínimo: en móvil cada fila mantiene su parte y su utilidad. */}
          <Tabla
            titulo="Partes del informe y para qué sirve cada una"
            anchoMinimo={0}
            columnas={["Parte del informe", "Para qué te sirve"]}
            filas={[
              [
                "Alternativas de ida y vuelta por turno",
                "Saber qué horarios tienen cobertura y dónde se interrumpe el recorrido",
              ],
              [
                "Cobertura por zona de origen",
                "Localizar las zonas con alternativa y, si aportas plantilla agregada por zona y turno, cuántas personas la tienen",
              ],
              [
                "Comparación de medidas",
                "Valorar un cambio de horario, transporte colectivo, bici o aparcamiento seguro con el mismo criterio",
              ],
              [
                "Indicadores de seguimiento",
                "Acordar cómo comprobar la implantación y el uso en el informe bienal que exige la ley",
              ],
            ]}
          />
          <p className="mt-8 text-base leading-relaxed text-gray-600 sm:text-lg">
            Cada cifra lleva su fuente y su fecha, y la contrastamos con un cálculo
            independiente antes de entregarla. Usamos horarios programados de EMT,
            Metrovalencia, Cercanías y autobuses interurbanos cuando hay una fuente
            vigente; confirmamos qué líneas podemos analizar antes de presupuestar.{" "}
            <Interno href={`${BASE}/metodologia`}>Cómo lo hacemos</Interno>.
          </p>
        </div>
      </Seccion>

      <Seccion id="bici" fondo="gris" titulo="La hora también importa en bici">
        <div className="max-w-3xl">
          <Tarjeta tono="blanca">
            <p className="leading-relaxed text-gray-600">
              En una muestra propia del entorno del campus de Vera (datos del 2026-10-05
              al 2026-10-15, tres laborables completos), ocho de las diez estaciones de
              Valenbisi de la ciudad con más tiempo sin anclajes libres entre las 8 y las
              11 h estaban alrededor del campus. Tener una estación cerca no garantizaba
              poder devolver la bici al llegar. Es una primera lectura, no un encargo de
              la universidad; periodo, fuentes y comprobaciones, en la{" "}
              <Interno href={`${BASE}/metodologia`}>metodología</Interno>.
            </p>
          </Tarjeta>
        </div>
      </Seccion>

      <Seccion
        id="que-necesitamos"
        titulo="Qué necesitamos para estudiar tu centro"
        intro={
          <p>
            Para pedir presupuesto basta con la ubicación, los turnos y qué quieres
            resolver. Puedes empezar por un solo centro y una pregunta concreta, como el
            acceso al turno de noche o un cambio de horario. Para el análisis
            acordaremos:
          </p>
        }
      >
        <div className="max-w-3xl">
          <ListaCheck
            items={[
              "La ubicación y los accesos que utiliza la plantilla.",
              "Las horas de entrada y salida, incluidos los turnos que terminan al día siguiente, y el calendario de trabajo.",
              "Si quieres contar personas con alternativa, una distribución agregada de plantilla por zona de residencia y turno. Nunca nombres ni direcciones.",
            ]}
          />
          <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
            Si trabajas con una consultora, nos encargamos del anexo de datos y acordamos
            con ella preguntas, formato e indicadores. La redacción del plan y su
            negociación con la representación de las personas trabajadoras corresponden
            al equipo responsable del plan.
          </p>
        </div>
      </Seccion>

      <Seccion
        id="plazo"
        fondo="gris"
        titulo="El plazo del plan de movilidad al trabajo"
        intro={
          <>
            <p>
              La Ley 9/2025 obliga a los centros de trabajo con más de 200 personas
              trabajadoras o 100 por turno a disponer de un plan de movilidad sostenible
              al trabajo antes del{" "}
              <strong className="text-beloq-dark">5 de diciembre de 2026</strong>. Se
              cuenta por centro, no por empresa. Este análisis cubre la parte de
              diagnóstico de accesibilidad del plan; no equivale al plan completo. No
              tenerlo en plazo es una infracción leve, de 101 a 2.000 euros y solo si
              causa un perjuicio al sistema de movilidad: no hay una multa automática.
            </p>
            <p className="text-base">
              Fuentes:{" "}
              <Externo href={`${BOE_LEY}#a2-8`}>artículo 26 de la Ley 9/2025</Externo> y{" "}
              <Externo href={`${BOE_LEY}#a1-18`}>artículos 106 y 107</Externo>, texto
              consolidado del BOE. Plazos, ayudas y seguimiento, en nuestra{" "}
              <Interno href={`${BASE}/ley-movilidad-sostenible`}>
                guía de la Ley de Movilidad Sostenible
              </Interno>
              .
            </p>
          </>
        }
      />

      <Seccion id="antes-de-pedir" titulo="Antes de pedir presupuesto">
        <div className="max-w-3xl">
          <Preguntas
            abiertaPrimera
            items={[
              {
                pregunta: "¿Podéis saber cómo viaja hoy la plantilla?",
                respuesta: (
                  <p>
                    Para conocerlo hace falta una encuesta o una medición específica.
                    Podemos trabajar con la que aporte tu equipo o tu consultora,
                    indicando su alcance y tasa de respuesta. Los datos públicos permiten
                    estudiar las alternativas disponibles, pero no identificar los
                    desplazamientos de tu personal.
                  </p>
                ),
              },
              {
                pregunta: "¿Cuánto cuesta y cuánto tarda?",
                respuesta: (
                  <p>
                    Depende del número de centros y turnos, de la cobertura de las fuentes
                    y de los datos de partida. Con la ubicación, los horarios y la
                    pregunta que necesitas resolver te proponemos alcance, plazo y
                    presupuesto. No hace falta preparar una encuesta para solicitarlo.
                  </p>
                ),
              },
              {
                pregunta: "¿El resultado puede ser una medida distinta al aparcamiento seguro?",
                respuesta: (
                  <p>
                    Sí. La recomendación puede ser un ajuste de horarios, transporte
                    colectivo, bici u otra medida respaldada por el diagnóstico. El
                    aparcamiento seguro es una de las opciones que evaluamos.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </Seccion>

      <div id="cta-final">
        <BandaCta
          titulo="Cuéntanos dónde está tu centro y qué turnos tiene"
          texto={
            <p>
              Indícanos la ubicación, las horas de entrada y salida y qué decisión
              quieres tomar. Si escribes desde una consultora, añade qué parte del
              diagnóstico necesitas incorporar al plan. Comprobamos la cobertura de
              datos y te proponemos el trabajo.
            </p>
          }
          href={CTA}
          boton="Solicitar presupuesto"
          secundario={{ href: EJEMPLO, label: "Ver cómo se estructura un informe" }}
        />
      </div>

      <section className="bg-white pt-10">
        <Contenedor>
          <p className="text-sm text-gray-600">
            beloq · València. Datos almacenados en España; procesamiento de IA dentro
            de la UE.
            <br />
            Contenido revisado el <time dateTime="2026-11-06">2026-11-06</time>.
          </p>
        </Contenedor>
      </section>

      <BarraSolicitar
        href={CTA}
        texto="¿Tu centro tiene turnos?"
        boton="Solicitar presupuesto"
        primero="cta-principal"
        ultimo="cta-final"
      />
    </>
  );
}
