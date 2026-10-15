import {
  Building2,
  Bus,
  CalendarClock,
  Landmark,
  MessagesSquare,
  Scale,
  SquareParking,
  TriangleAlert,
  UserCheck,
} from "lucide-react";
import {
  BandaCta,
  Cabecera,
  ListaCheck,
  Seccion,
  Tabla,
  Tarjeta,
  TarjetaIcono,
} from "../../components/informes/ui";
import type { ReactNode } from "react";
import {
  BASE,
  REVISION_FUENTES,
  metadatos,
  solicitarHref,
} from "../../lib/informes";

export const metadata = metadatos({
  titulo: "Metodología: fuentes, comprobaciones y cómo leer los datos",
  descripcion:
    "Qué fuentes de movilidad utilizamos, cómo combinamos datos públicos, del cliente y telemetría, cómo revisamos fechas y cobertura, cómo comprobamos cada indicador y qué hace el agente de IA.",
  ruta: `${BASE}/metodologia`,
});

const FAMILIAS = [
  {
    icono: Landmark,
    titulo: "Ayuntamientos",
    texto:
      "Datos abiertos municipales: disponibilidad de bicicleta compartida, contadores, estado del tráfico, plazas libres en aparcamientos públicos, obras y ocupaciones de la vía pública e inventarios (aparcabicis, red ciclista, barrios y distritos).",
    nota: "Unas se publican casi en tiempo real, otras cada cierto tiempo, y algunas cambian de formato o dejan de actualizarse.",
  },
  {
    icono: Bus,
    titulo: "Operadores de transporte",
    texto:
      "Horarios programados de autobús, metro y tren de cercanías en formato abierto (GTFS) y, cuando el operador los publica, avisos, posiciones o previsiones en tiempo real y datos agregados de viajeros.",
    nota: "Los horarios tienen fechas de vigencia: cada análisis indica qué versión se ha usado.",
  },
  {
    icono: Scale,
    titulo: "Generalitat",
    texto:
      "Datos de la administración autonómica, como conteos de ciclistas en vías interurbanas, inventarios y planificación de infraestructuras y servicios de transporte.",
    nota: "Suelen ser series históricas o periódicas, no datos al minuto.",
  },
  {
    icono: TriangleAlert,
    titulo: "DGT",
    texto:
      "Incidencias y afecciones en la red viaria que publica la Dirección General de Tráfico: obras, cortes, accidentes o retenciones en el área de estudio.",
    nota: "Se filtran a la zona y al periodo del análisis.",
  },
  {
    icono: Building2,
    titulo: "Datos del cliente",
    texto:
      "Ubicación y accesos, horarios y turnos, población agregada, aparcamiento, actuaciones previstas y, si forman parte del encargo, encuestas o aforos propios.",
    nota: "Siempre agregados. Se usan solo para el encargo.",
  },
  {
    icono: SquareParking,
    titulo: "beloq",
    texto:
      "Telemetría de las estaciones beloq donde están instaladas: ocupación, duración de las estancias y rotación del aparcamiento seguro, agregadas y sin identificar a nadie.",
    nota: "Solo existe donde hay estaciones; no cubre toda la ciudad.",
  },
];

/** Enlace a la ficha oficial de una fuente (sale de la web). */
function Ficha({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-beloq-dark underline decoration-beloq-yellow decoration-2 underline-offset-2"
    >
      {children}
    </a>
  );
}

const VLCI = "https://opendata.vlci.valencia.es/dataset";
const HISTORICO_PROPIO =
  "Pública. El histórico propio de beloq, si lo hay, se confirma en la propuesta.";

// Cada fila sale de la ficha publicada por el organismo, revisada en
// REVISION_FUENTES. Solo datos públicos: nada del estado interno de las capturas.
const FUENTES_CONCRETAS: { fuente: ReactNode; filas: string[] }[] = [
  {
    fuente: (
      <>
        <Ficha href={`${VLCI}/google-transit-lines-stops-bus-schedules`}>
          Horarios de autobús EMT (GTFS)
        </Ficha>
        
        <span className="mt-1 block font-normal text-gray-600">Ajuntament de València · CC BY 4.0</span>
      </>
    ),
    filas: [
      "Líneas, paradas y horarios programados.",
      "Red de la EMT de València.",
      "La versión publicada, con sus fechas de vigencia.",
      "Sin frecuencia declarada en la ficha; cada versión indica su vigencia.",
      "Pública. Se usa la versión vigente en el periodo del encargo.",
    ],
  },
  {
    fuente: (
      <>
        <Ficha href="https://www.metrovalencia.es/google_transit_feed/google_transit.zip">
          Horarios de Metrovalencia (GTFS)
        </Ficha>
        
        <span className="mt-1 block font-normal text-gray-600">FGV, Generalitat Valenciana</span>
      </>
    ),
    filas: [
      "Líneas, estaciones y horarios programados de metro y tranvía.",
      "Red de Metrovalencia.",
      "La versión publicada, con sus fechas de vigencia.",
      "Sin frecuencia declarada; cada versión indica su vigencia.",
      "Pública. Se usa la versión vigente en el periodo del encargo.",
    ],
  },
  {
    fuente: (
      <>
        <Ficha href="https://data.renfe.com/dataset/horarios-cercanias">
          Horarios de Cercanías (GTFS)
        </Ficha>
        
        <span className="mt-1 block font-normal text-gray-600">Renfe · CC BY 4.0</span>
      </>
    ),
    filas: [
      "Horarios programados de Cercanías y Rodalies.",
      "Toda España; se filtra el núcleo de València.",
      "La versión publicada, con sus fechas de vigencia.",
      "Sin frecuencia declarada; el fichero consultado estaba actualizado el mismo día de la revisión.",
      "Pública. Se usa la versión vigente en el periodo del encargo.",
    ],
  },
  {
    fuente: (
      <>
        <Ficha href={`${VLCI}/valenbisi-disponibilitat-valenbisi-dsiponibilidad`}>
          Disponibilidad de Valenbisi
        </Ficha>
        
        <span className="mt-1 block font-normal text-gray-600">Ajuntament de València · CC BY 4.0</span>
      </>
    ),
    filas: [
      "Bicicletas y anclajes libres por estación, con su ubicación y capacidad. No son viajes.",
      "Estaciones Valenbisi de València.",
      "Solo el estado actual: la ficha no publica histórico.",
      "Cada 10 minutos, según la ficha.",
      HISTORICO_PROPIO,
    ],
  },
  {
    fuente: (
      <>
        <Ficha
          href={`${VLCI}/punts-mesura-bicis-espires-electromagnetiques-puntos-medida-bicis-espiras-electr`}
        >
          Contadores de bicicletas (espiras)
        </Ficha>
        
        <span className="mt-1 block font-normal text-gray-600">Ajuntament de València · CC BY 4.0</span>
      </>
    ),
    filas: [
      "Intensidad de bicicletas por punto de medida. Cuenta pasos, no personas distintas.",
      "Puntos de medida de la ciudad.",
      "Estado actual.",
      "Sin frecuencia declarada. La ficha avisa de errores de procesamiento temporales.",
      "Condicionada a que la fuente resuelva la incidencia; se valida en cada encargo.",
    ],
  },
  {
    fuente: (
      <>
        <Ficha href={`${VLCI}/estat-transit-temps-real-estado-trafico-tiempo-real`}>
          Estado del tráfico en tiempo real
        </Ficha>
        
        <span className="mt-1 block font-normal text-gray-600">Ajuntament de València · CC BY 4.0</span>
      </>
    ),
    filas: [
      "Estado por tramo: fluido, denso, congestionado, cortado o sin datos.",
      "Tramos de la red viaria de la ciudad.",
      "Solo el estado actual.",
      "Cada 3 minutos, según la ficha.",
      HISTORICO_PROPIO,
    ],
  },
  {
    fuente: (
      <>
        <Ficha href={`${VLCI}/parkings`}>Aparcamientos públicos</Ficha>
        
        <span className="mt-1 block font-normal text-gray-600">Ajuntament de València · CC BY 4.0</span>
      </>
    ),
    filas: [
      "Plazas totales y libres de aparcamientos públicos, con la fecha de su última actualización.",
      "Aparcamientos públicos de la ciudad.",
      "Solo el estado actual.",
      "Sin frecuencia declarada; cada registro lleva su propia fecha, que hay que revisar.",
      HISTORICO_PROPIO,
    ],
  },
  {
    fuente: (
      <>
        <Ficha href={`${VLCI}/ocupacio-via-publica-ocupacion-via-publica`}>
          Ocupación de la vía pública
        </Ficha>
        
        <span className="mt-1 block font-normal text-gray-600">Ajuntament de València · CC BY 4.0</span>
      </>
    ),
    filas: [
      "Ocupaciones por obras, festejos o incidencias.",
      "Término municipal.",
      "Las ocupaciones publicadas en el momento de la consulta.",
      "Sin frecuencia declarada.",
      HISTORICO_PROPIO,
    ],
  },
  {
    fuente: (
      <>
        <Ficha href={`${VLCI}/aparcaments-bicicletes-aparcamientos-bicicletas`}>
          Aparcabicis
        </Ficha>
        {", "}
        <Ficha href={`${VLCI}/itinerarios-ciclistas-itineraris-ciclistes`}>
          itinerarios ciclistas
        </Ficha>
        {" y "}
        <Ficha href={`${VLCI}/barris-barrios`}>barrios</Ficha>
        
        <span className="mt-1 block font-normal text-gray-600">Ajuntament de València · CC BY 4.0</span>
      </>
    ),
    filas: [
      "Inventario y geometría: aparcabicis con su número de plazas, carriles bici y límites de barrios.",
      "Término municipal.",
      "El inventario publicado en el momento de la descarga.",
      "Sin frecuencia declarada.",
      "Pública. Se descarga para el encargo y se anota la fecha.",
    ],
  },
  {
    fuente: (
      <>
        <Ficha href="https://dadesobertes.gva.es/dataset/tra-int-cr-2026">
          Usuarios de ciclorrutas
        </Ficha>
        
        <span className="mt-1 block font-normal text-gray-600">Generalitat Valenciana · CC BY</span>
      </>
    ),
    filas: [
      "Usuarios diarios totales (peatones, patinetes y bicicletas) y ciclistas en las ciclorrutas.",
      "Red autonómica de ciclorrutas.",
      "Ficheros anuales; hay conjuntos publicados para 2024, 2025 y 2026.",
      "Sin frecuencia declarada; el de 2026 se actualizó por última vez el 18/09/2026.",
      "Pública. Se descarga para el encargo.",
    ],
  },
  {
    fuente: (
      <>
        <Ficha href="https://nap.dgt.es/dataset/incidencias-dgt-datex2-v3-7">
          Incidencias de tráfico (DATEX II)
        </Ficha>
        
        <span className="mt-1 block font-normal text-gray-600">DGT · Punto de Acceso Nacional</span>
      </>
    ),
    filas: [
      "Incidencias en carreteras: obras, cortes, accidentes, retenciones.",
      "Red estatal de carreteras, salvo País Vasco y Cataluña; se filtra la zona del encargo.",
      "Solo las situaciones vigentes.",
      "Cada minuto, según la ficha.",
      HISTORICO_PROPIO,
    ],
  },
  {
    fuente: (
      <>
        Datos del cliente
        
        <span className="mt-1 block font-normal text-gray-600">La organización que encarga</span>
      </>
    ),
    filas: [
      "Ubicación, horarios, población agregada, aparcamiento y actuaciones previstas.",
      "El centro o la zona del encargo.",
      "El que se acuerde.",
      "La que se acuerde.",
      "La aporta el cliente, siempre agregada.",
    ],
  },
  {
    fuente: (
      <>
        Telemetría de estaciones beloq
        
        <span className="mt-1 block font-normal text-gray-600">beloq</span>
      </>
    ),
    filas: [
      "Ocupación, duración de las estancias y rotación del aparcamiento seguro, agregadas.",
      "Solo donde hay estaciones beloq instaladas.",
      "Desde la puesta en marcha de cada estación.",
      "Continua mientras la estación está en servicio.",
      "Solo si hay estaciones beloq en el ámbito del encargo.",
    ],
  },
];

export default function MetodologiaPage() {
  return (
    <>
      <Cabecera
        migas={[{ label: "Metodología" }]}
        titulo="Metodología: de dónde salen las cifras y cómo se comprueban"
        entradilla={
          <p>
            Qué fuentes usamos, cómo las combinamos, cómo revisamos fechas y
            cobertura, cómo se calcula cada indicador y qué hace el agente de IA. Con
            ejemplos de cómo leer cada tipo de dato.
          </p>
        }
        indice={[
          { href: "#fuentes", label: "Fuentes" },
          { href: "#fuentes-concretas", label: "Fuentes concretas" },
          { href: "#combinacion", label: "Cómo se combinan" },
          { href: "#revision", label: "Revisión de datos" },
          { href: "#indicadores", label: "Indicadores" },
          { href: "#agente", label: "El agente" },
          { href: "#lectura", label: "Cómo leer los datos" },
        ]}
      />

      <Seccion
        id="fuentes"
        titulo="Qué fuentes utilizamos"
        intro={
          <>
            <p>
              Seis familias de fuentes. En cada encargo usamos las que responden a la
              pregunta y estén disponibles para ese territorio y periodo.
            </p>
            <p>
              No todas están conectadas en tiempo real: algunas se capturan de forma
              continua, otras se descargan cuando se publica una versión nueva y otras
              se reciben del cliente para un encargo concreto. El anexo de cada
              informe indica qué fuente se ha usado, con qué fecha y qué cobertura
              tiene.
            </p>
          </>
        }
      >
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FAMILIAS.map((f) => (
            <li key={f.titulo}>
              <TarjetaIcono
                icono={f.icono}
                titulo={f.titulo}
                tono="borde"
                pie={
                  <p className="border-t border-gray-200 pt-3 text-sm text-gray-600">
                    {f.nota}
                  </p>
                }
              >
                <p>{f.texto}</p>
              </TarjetaIcono>
            </li>
          ))}
        </ul>
      </Seccion>

      <Seccion
        id="fuentes-concretas"
        titulo="Fuentes concretas, cobertura y disponibilidad"
        intro={
          <>
            <p>
              Las fuentes públicas que usamos en València y su entorno, con el enlace
              a su ficha oficial. Lo que dice cada fila sale de esa ficha, revisada
              el <time dateTime={REVISION_FUENTES.iso}>{REVISION_FUENTES.texto}</time>.
              Las fuentes cambian: en cada propuesta se vuelve a comprobar su estado.
            </p>
            <p>
              «Periodo disponible» es lo que publica la propia fuente. Cuando solo
              publica el estado actual, el histórico depende de una recopilación
              propia, y su periodo se confirma en la propuesta.
            </p>
          </>
        }
      >
        <Tabla
          titulo="Fuentes concretas, cobertura y disponibilidad"
          anchoMinimo={1040}
          columnas={[
            "Fuente y publicador",
            "Qué aporta",
            "Territorio",
            "Periodo disponible",
            "Actualización de la fuente",
            "Disponibilidad para el encargo",
            "Revisión",
          ]}
          filas={FUENTES_CONCRETAS.map((x) => [
            x.fuente,
            ...x.filas,
            <time key="revision" dateTime={REVISION_FUENTES.iso}>
              {REVISION_FUENTES.texto}
            </time>,
          ])}
        />
      </Seccion>

      <Seccion
        id="combinacion"
        fondo="gris"
        titulo="Cómo combinamos datos públicos, del cliente y telemetría"
        intro={
          <p>
            Para cruzar fuentes distintas, todas se llevan a tres referencias
            comunes. Cada tabla conserva además su origen: fuente, fecha de la fuente,
            fecha de descarga y versión.
          </p>
        }
      >
        <div className="grid gap-6 md:grid-cols-3">
          <Tarjeta>
            <h3 className="font-bold text-beloq-dark">Lugar</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Coordenadas y zonas: barrios y distritos oficiales, corredores o un
              radio alrededor de cada entrada del centro. Las distancias se indican
              siempre diciendo si son en línea recta o por la red de calles.
            </p>
          </Tarjeta>
          <Tarjeta>
            <h3 className="font-bold text-beloq-dark">Tiempo</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Fecha y hora local de Madrid, franjas horarias y tipo de día
              (laborable, sábado, domingo, festivo). Los servicios que pasan de
              medianoche se asignan al día en que ocurren.
            </p>
          </Tarjeta>
          <Tarjeta>
            <h3 className="font-bold text-beloq-dark">Unidad</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Salidas, plazas, bicicletas, pasos, minutos o porcentaje del tiempo.
              Una cifra nunca se suma con otra de unidad distinta ni se presenta sin
              su unidad.
            </p>
          </Tarjeta>
        </div>
      </Seccion>

      <Seccion
        id="revision"
        titulo="Cómo revisamos fechas, cobertura y coherencia"
        intro={<p>Antes de calcular nada, cada fuente pasa estas comprobaciones:</p>}
      >
        <div className="max-w-3xl">
          <ListaCheck
            items={[
              <>
                <strong className="text-beloq-dark">Fecha del dato frente a fecha de captura.</strong>{" "}
                Un dato descargado hoy puede llevar semanas sin actualizarse. Las
                observaciones antiguas se marcan o se excluyen.
              </>,
              <>
                <strong className="text-beloq-dark">Vigencia de los horarios.</strong>{" "}
                Cada versión de horarios vale para unas fechas; se usa la que estaba
                vigente en el periodo analizado.
              </>,
              <>
                <strong className="text-beloq-dark">Huecos.</strong> Los periodos sin
                datos se señalan. La ausencia de un dato no se convierte en cero.
              </>,
              <>
                <strong className="text-beloq-dark">Cobertura.</strong> Qué parte del
                territorio y del periodo cubre cada fuente, y qué puntos o estaciones
                faltan.
              </>,
              <>
                <strong className="text-beloq-dark">Coherencia.</strong> Duplicados,
                valores imposibles, cambios de formato o de unidad y recuentos
                comparados con el fichero original.
              </>,
            ]}
          />
        </div>
      </Seccion>

      <Seccion
        id="indicadores"
        fondo="gris"
        titulo="Cómo calculamos los indicadores y comprobamos las consultas"
        intro={
          <p>
            Cada indicador tiene una ficha y cada cifra que aparece en un informe se
            puede rastrear hasta la consulta que la produce.
          </p>
        }
      >
        <Tabla
          titulo="Contenido de la ficha de un indicador"
          columnas={["Campo", "Qué recoge"]}
          filas={[
            ["Definición", "Qué mide, en una frase que se entienda sin conocer la fuente."],
            ["Ámbito", "Puntos, estaciones o zonas que entran en el cálculo y los que quedan fuera."],
            [
              "Cálculo",
              "Fórmula, filtros, agregación (por zona, franja y tipo de día) y denominador que utiliza.",
            ],
            ["Unidad", "Salidas, minutos, plazas, porcentaje del tiempo…"],
            ["Fuente y versión", "De dónde salen los datos y qué versión o fechas se usan."],
            ["Periodo", "Fechas que cubre y días excluidos."],
            [
              "Cobertura válida",
              "Tiempo o registros válidos respecto de los esperados, con el criterio propio de cada fuente y los motivos de exclusión. Un valor que la fuente repite sin actualizarlo no cuenta como observación nueva.",
            ],
            [
              "Actualidad",
              "Fecha del dato según la fuente y fecha en que se capturó o descargó, por separado.",
            ],
            ["Tipo de resultado", "Observación, estimación o escenario (ver más abajo)."],
            ["Limitaciones", "Lo que el indicador no dice y los huecos conocidos."],
            [
              "Validación y actualización",
              "Cuándo se comprobó el cálculo con la referencia independiente y cuándo se actualizó el indicador por última vez.",
            ],
          ]}
        />
        <div className="mt-8 max-w-3xl space-y-3 leading-relaxed text-gray-600">
          <p>
            Las consultas que alimentan un informe se comprueban con un cálculo
            independiente, hecho por otro camino sobre los mismos datos de origen. Si
            los dos resultados no coinciden, la cifra no se publica hasta encontrar la
            causa.
          </p>
          <p>
            Cuando se repite un informe de seguimiento, se usa el mismo método. Si hay
            que cambiarlo (porque cambia una fuente, por ejemplo), se explica el
            cambio y su efecto en la comparación.
          </p>
        </div>
      </Seccion>

      <Seccion
        id="agente"
        titulo="Qué aporta el agente y qué se revisa técnicamente"
        intro={
          <p>
            El agente es una inteligencia artificial que permite consultar los
            indicadores en castellano, sin escribir consultas ni abrir tablas. Se
            identifica siempre como IA.
          </p>
        }
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <TarjetaIcono icono={MessagesSquare} titulo="Lo que hace el agente" tono="gris">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                Responde preguntas como «¿qué paradas tienen salidas antes de las
                6:00 este lunes?» con la cifra, la unidad, el periodo y la fuente.
              </li>
              <li>
                Usa las consultas verificadas cuando la pregunta encaja con una de
                ellas.
              </li>
              <li>
                Si tiene que hacer un cálculo nuevo, lo marca como no verificado.
              </li>
              <li>
                Si faltan datos para responder, lo dice y responde solo la parte que
                se puede calcular.
              </li>
            </ul>
          </TarjetaIcono>
          <TarjetaIcono icono={UserCheck} titulo="Lo que revisa el equipo" tono="gris">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>La definición de cada indicador y su ficha.</li>
              <li>Las consultas verificadas, comparadas con el cálculo independiente.</li>
              <li>Cada cifra del informe antes de entregarlo.</li>
              <li>
                Los hallazgos y las recomendaciones: no los decide el agente; los
                redacta y revisa el equipo con los datos comprobados.
              </li>
            </ul>
          </TarjetaIcono>
        </div>
      </Seccion>

      <Seccion
        id="tipos-de-resultado"
        fondo="gris"
        titulo="Observaciones, estimaciones y escenarios"
        intro={
          <p>
            En los informes, cada resultado lleva una etiqueta que dice de qué tipo
            es. No pesan lo mismo a la hora de decidir.
          </p>
        }
      >
        <div className="grid gap-6 md:grid-cols-3">
          <Tarjeta>
            <h3 className="font-bold text-beloq-dark">Observación</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Lo que registra una fuente en un momento dado. Por ejemplo, las
              bicicletas disponibles en una estación a las 8:15 de un día concreto.
            </p>
          </Tarjeta>
          <Tarjeta>
            <h3 className="font-bold text-beloq-dark">Estimación</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Un valor calculado a partir de observaciones con algún supuesto
              explícito. Por ejemplo, el tiempo a pie desde una parada hasta una
              entrada, calculado por la red de calles a una velocidad media.
            </p>
          </Tarjeta>
          <Tarjeta>
            <h3 className="font-bold text-beloq-dark">Escenario</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              El resultado de suponer un cambio que aún no ha ocurrido. Por ejemplo,
              cuántas salidas llegarían a tiempo si un turno empezara media hora más
              tarde.
            </p>
          </Tarjeta>
        </div>
      </Seccion>

      <Seccion
        id="lectura"
        titulo="Cómo leer cada tipo de dato"
        intro={
          <p>
            Cada fuente responde a una pregunta y no a otras. Así lo tenemos en
            cuenta al interpretar:
          </p>
        }
      >
        <Tabla
          titulo="Qué dice y qué no dice cada tipo de dato"
          columnas={["Dato", "Qué dice", "Qué no dice por sí solo"]}
          filas={[
            [
              "Horarios",
              "La oferta programada: qué servicios están previstos y a qué hora.",
              "Cuántos viajeros los usan ni si el servicio se prestó tal cual.",
            ],
            [
              "Disponibilidad de bicicletas",
              "Cuántas bicis y anclajes libres había en cada estación y momento.",
              "El número de viajes: una estación puede estar llena porque nadie la usa o porque se repone.",
            ],
            [
              "Contadores",
              "Cuántos pasos se registran en un punto.",
              "Cuántas personas distintas pasan: la misma persona puede contar varias veces.",
            ],
            [
              "Proximidad entre estaciones",
              "Que dos estaciones están cerca.",
              "Que haya transbordos: hacen falta horarios, itinerario a pie y datos de uso.",
            ],
            [
              "Comparación antes/después",
              "Que un indicador ha cambiado entre dos periodos.",
              "Que el cambio se deba a la actuación: hace falta contexto (calendario, clima, eventos, otras obras) y, si es posible, una zona de referencia.",
            ],
          ]}
        />
      </Seccion>

      <Seccion
        id="privacidad-y-cobertura"
        fondo="gris"
        titulo="Privacidad y cobertura"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <TarjetaIcono icono={Building2} titulo="Datos agregados">
            <p>
              Trabajamos con datos agregados. No pedimos datos de personas concretas
              ni nóminas, y la telemetría de beloq se usa agregada. Si un encargo
              necesita una encuesta u otra recogida de datos, se acuerda antes cómo se
              hace y cómo se tratan los datos.
            </p>
          </TarjetaIcono>
          <TarjetaIcono icono={CalendarClock} titulo="Territorio">
            <p>
              Cobertura inicial: València y su entorno. Para otros territorios
              comprobamos antes qué fuentes existen y con qué calidad, y lo indicamos
              en la propuesta.
            </p>
          </TarjetaIcono>
        </div>
      </Seccion>

      <BandaCta
        titulo="¿Quieres aplicar este método a tu caso?"
        texto={
          <p>
            Cuéntanos la pregunta y el territorio. En la propuesta indicaremos qué
            fuentes servirían y qué cobertura tienen.
          </p>
        }
        href={solicitarHref({ origen: "metodologia" })}
        boton="Solicitar un informe"
        secundario={{ href: `${BASE}/ejemplo`, label: "Ver un ejemplo de informe" }}
      />
    </>
  );
}
