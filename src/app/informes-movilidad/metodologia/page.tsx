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
import { BASE, metadatos, solicitarHref } from "../../lib/informes";

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
            ["Cálculo", "Fórmula, filtros y agregación (por zona, franja y tipo de día)."],
            ["Unidad", "Salidas, minutos, plazas, porcentaje del tiempo…"],
            ["Fuente y versión", "De dónde salen los datos y qué versión o fechas se usan."],
            ["Periodo", "Fechas que cubre y días excluidos."],
            ["Tipo de resultado", "Observación, estimación o escenario (ver más abajo)."],
            ["Limitaciones", "Lo que el indicador no dice y los huecos conocidos."],
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
