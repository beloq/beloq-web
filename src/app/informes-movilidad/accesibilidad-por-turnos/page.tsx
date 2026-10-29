import Link from "next/link";
import { FileSearch } from "lucide-react";
import type { ReactNode } from "react";
import {
  BandaCta,
  Boton,
  Cabecera,
  Contenedor,
  EnlaceFlecha,
  ListaCheck,
  Nota,
  Preguntas,
  Seccion,
  Tabla,
} from "../../components/informes/ui";
import { BASE, metadatos, solicitarHref } from "../../lib/informes";

// Texto aprobado por Jesús el 2026-10-29 (agente-movilidad,
// investigaciones/web_2026-11/prompt_para_claude_web_2026-10-29.md). Cifras y
// enlaces tal cual; solo se adapta la forma a los componentes de la sección.
//
// PENDIENTE ANTES DE PUBLICAR: el apartado «Un ejemplo de por qué importa la
// hora» usa el estudio de Vera, que no se va a publicar como ejemplo. Hay que
// sustituirlo por el nuevo informe de ejemplo cuando exista, y que /ejemplo
// contenga de verdad lo que este apartado dice que contiene.

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
const BOE_RDL = "https://www.boe.es/buscar/act.php?id=BOE-A-2026-6544";

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
        titulo={
          <>
            <span className="block text-lg font-bold sm:text-2xl">
              Accesibilidad al trabajo
            </span>{" "}
            ¿Puede tu plantilla llegar a cada turno sin depender del coche?
          </>
        }
        entradilla={
          <>
            <p>
              <strong>Análisis por turnos en València.</strong> Analizamos las opciones
              de transporte público y bici para la entrada y la salida de tu centro.
              Con esa información puedes preparar el diagnóstico de tu plan de
              movilidad sostenible al trabajo —PMST— o decidir qué medida conviene
              aplicar si ya tienes uno.
            </p>
            <p className="mt-3 text-base">
              Recibes un informe por centro, con alternativas por turno, las zonas
              desde las que se puede llegar y los datos que sustentan cada
              recomendación. Trabajamos con responsables de personas y operaciones, y
              con las consultoras que redactan el plan.
            </p>
          </>
        }
        acciones={
          <>
            <Boton href={CTA}>Pedir un análisis de mi centro</Boton>
            <span className="self-center">
              <EnlaceFlecha href={EJEMPLO}>Ver un informe de ejemplo</EnlaceFlecha>
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
              ninguna por la noche. Los fines de semana y los festivos también cambian
              el resultado.
            </p>
            <p>
              Comprobamos el recorrido completo para las fechas y los horarios de tu
              centro: llegada a tiempo, regreso, transbordos y trayectos a pie hasta el
              acceso que utiliza la plantilla. Para la bici, revisamos los recorridos y
              el aparcamiento del entorno. Si se plantea usar Valenbisi, miramos la
              disponibilidad observada en esa franja, tanto de bicicletas como de
              anclajes para devolverlas.
            </p>
            <p>
              El diagnóstico sirve para comparar medidas concretas: ajustar una
              entrada, estudiar transporte de empresa o mejorar el acceso en bici. La
              recomendación dependerá de las alternativas que existan y, cuando haya
              datos agregados de plantilla, de cuántas personas puedan aprovecharlas.
            </p>
          </>
        }
      />

      <Seccion
        id="que-incluye"
        fondo="gris"
        titulo="Qué incluye el análisis de accesibilidad"
        intro={
          <p>
            La entrega se organiza por centro, zona de origen y turno. La pieza
            principal es una tabla de alternativas con tiempos, conexiones y márgenes
            respecto a la entrada y la salida. La acompaña una explicación de los
            problemas encontrados y de las medidas que merece la pena estudiar.
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
                "Identificar qué horarios tienen cobertura y dónde se interrumpe el recorrido",
              ],
              [
                "Cobertura por zona de origen",
                "Localizar las zonas con alternativa; cuantificar personas si aportas plantilla agregada por zona y turno",
              ],
              [
                "Comparación de medidas",
                "Valorar ajustes de horario, transporte colectivo, bici o aparcamiento seguro con el mismo criterio de análisis",
              ],
              [
                "Indicadores de seguimiento",
                "Acordar cómo comprobar la implantación, el uso y los resultados que puedan medirse",
              ],
            ]}
          />
          <div className="mt-8 space-y-3 text-base leading-relaxed text-gray-600 sm:text-lg">
            <p>
              Incluimos las fuentes, su fecha, los calendarios utilizados y los
              supuestos del cálculo. Contrastamos las cifras con un cálculo
              independiente antes de la entrega. Así, tu equipo o tu consultora pueden
              incorporar el análisis al plan y revisar cómo se ha obtenido cada
              resultado.{" "}
              <Interno href={`${BASE}/metodologia`}>Consulta nuestra metodología</Interno>.
            </p>
            <p>
              La cobertura se comprueba para cada encargo. Utilizamos horarios
              programados de EMT, Metrovalencia, Cercanías y, cuando disponemos de una
              fuente vigente y utilizable, autobuses interurbanos. Confirmamos qué
              servicios podemos analizar antes de presupuestar. Un horario programado
              permite comprobar si el viaje encaja sobre el papel; la puntualidad
              necesita observaciones adicionales.
            </p>
          </div>
        </div>
      </Seccion>

      {/* PENDIENTE: sustituir este apartado por el nuevo informe de ejemplo. */}
      <Seccion id="ejemplo" titulo="Un ejemplo de por qué importa la hora">
        <div className="max-w-3xl">
          <Nota icono={FileSearch} titulo="Extracto de un análisis propio">
            <p>
              En una muestra propia del entorno del campus de Vera, ocho de las diez
              estaciones de Valenbisi de la ciudad con más tiempo sin anclajes libres
              entre las 8 y las 11 h de los laborables analizados estaban alrededor del
              campus. Tener una estación cerca no garantizaba encontrar dónde devolver
              la bicicleta al llegar.
            </p>
            <p>
              El ejemplo utiliza datos del 2026-10-05 al 2026-10-15, con días parciales
              y un corte de captura; solo incluye tres laborables completos. Es una
              primera lectura, no un patrón consolidado ni un encargo de la
              universidad. En el informe puedes consultar el periodo, las fuentes y las
              comprobaciones del cálculo.
            </p>
          </Nota>
          <p className="mt-6">
            <EnlaceFlecha href={EJEMPLO}>
              Ver el informe de ejemplo y sus datos de partida
            </EnlaceFlecha>
          </p>
        </div>
      </Seccion>

      <Seccion
        id="que-necesitamos"
        fondo="gris"
        titulo="Qué necesitamos para estudiar tu centro"
        intro={
          <>
            <p>
              Para pedir un presupuesto basta con indicar dónde está el centro, sus
              turnos y qué necesitas resolver. Puedes empezar por un único centro y una
              pregunta concreta, como comprobar el acceso al turno de noche o comparar
              un cambio de horario.
            </p>
            <p>Para realizar el análisis acordaremos estos datos:</p>
          </>
        }
      >
        <div className="max-w-3xl">
          <ListaCheck
            items={[
              "La ubicación y los accesos que utiliza la plantilla.",
              "Las horas de entrada y salida, incluidos los turnos que terminan al día siguiente.",
              "Los días de trabajo, fines de semana y festivos que debamos considerar.",
              "Si quieres cuantificar personas con alternativa, una distribución agregada de plantilla por zona de residencia y turno.",
            ]}
          />
          <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
            No necesitamos nombres ni direcciones particulares. Si todavía no tienes la
            distribución de orígenes, podemos estudiar las zonas con oferta compatible
            con cada turno. Ese resultado describe la cobertura del transporte; para
            contar personas necesitamos relacionarlo con la plantilla agregada.
          </p>
        </div>
      </Seccion>

      <Seccion
        id="consultora"
        titulo="Si ya estás preparando el plan con una consultora"
        intro={
          <>
            <p>
              Podemos encargarnos del anexo de datos y coordinar su alcance con quien
              redacte el PMST. Acordamos las preguntas, el formato y los indicadores
              para que el trabajo pueda incorporarse al diagnóstico. La redacción del
              plan, su negociación con la representación de las personas trabajadoras
              y la comprobación de cumplimiento corresponden al equipo responsable del
              plan.
            </p>
            <p>
              Si el plan ya está aprobado, podemos centrarnos en una medida pendiente o
              revisar una que esté en marcha. Por ejemplo, comprobar si un nuevo
              horario mejora las conexiones o si se utiliza el aparcamiento instalado.
              Medir un cambio en la forma de viajar requiere, además, una situación de
              partida y datos adecuados para compararla.
            </p>
          </>
        }
      />

      <Seccion
        id="plazo"
        fondo="gris"
        titulo="El plazo del plan de movilidad al trabajo"
        intro={
          <>
            <p>
              El artículo 26 de la Ley 9/2025 establece la obligación para los centros
              de trabajo «con más de 200 personas trabajadoras o 100 por turno», en los
              términos que recoge la norma. El plazo vigente es de doce meses desde su
              entrada en vigor: <strong className="text-beloq-dark">2026-12-05</strong>.
              El umbral se refiere a cada centro de trabajo.
            </p>
            <p>
              El análisis de accesibilidad aporta parte del diagnóstico; contratarlo no
              equivale a disponer del plan completo. La ley también exige negociar el
              plan y elaborar un informe de seguimiento a los dos años de su
              aprobación, que se repite cada dos años de vigencia.
            </p>
            <p>
              No disponer del plan en plazo es una infracción leve, con multa de 101 a
              2.000 euros, y solo cuando con ello se produzca un perjuicio para el
              sistema de movilidad. Las empresas obligadas que hayan recibido las
              ayudas directas del Real Decreto-ley 7/2026 y no dispongan del plan deben
              devolverlas. No hay una multa automática ni de decenas de miles de euros
              por no tener el documento.
            </p>
            <p className="text-base">
              Fuentes:{" "}
              <Externo href={`${BOE_LEY}#a2-8`}>
                artículo 26 de la Ley 9/2025, texto consolidado del BOE
              </Externo>
              ;{" "}
              <Externo href={`${BOE_LEY}#a1-18`}>
                artículos 106 y 107, infracciones y cuantías
              </Externo>
              ;{" "}
              <Externo href={BOE_RDL}>Real Decreto-ley 7/2026, artículos 63 y 64</Externo>
              . Puedes ampliar la información sobre obligaciones y contenido en nuestra{" "}
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
                pregunta: "¿Cuánto cuesta y cuánto tarda el análisis?",
                respuesta: (
                  <p>
                    Depende del número de centros y turnos, la cobertura de las fuentes y
                    los datos de partida. Con la ubicación, los horarios y la pregunta
                    que necesitas resolver podemos proponerte un alcance, un plazo y un
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
                    aparcamiento seguro es una de las opciones que evaluamos. La decisión
                    se apoya en las necesidades del centro y en las alternativas
                    analizadas.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </Seccion>

      <BandaCta
        titulo="Cuéntanos dónde está tu centro y qué turnos tiene"
        texto={
          <p>
            Indícanos la ubicación, las horas de entrada y salida y qué decisión
            quieres tomar. Si escribes desde una consultora, añade qué parte del
            diagnóstico necesitas incorporar al plan. Comprobaremos la cobertura de
            datos y te propondremos el trabajo que podemos realizar.
          </p>
        }
        href={CTA}
        boton="Pedir un análisis de mi centro"
        secundario={{ href: EJEMPLO, label: "Consultar el informe de ejemplo" }}
      />

      <section className="bg-white pt-10">
        <Contenedor>
          <p className="text-sm text-gray-600">
            beloq · València. Datos almacenados en España; procesamiento de IA dentro
            de la UE.
            <br />
            Contenido revisado el <time dateTime="2026-10-29">2026-10-29</time>.
          </p>
        </Contenedor>
      </section>
    </>
  );
}
