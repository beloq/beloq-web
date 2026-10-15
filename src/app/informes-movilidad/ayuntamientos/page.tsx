import {
  Bike,
  CalendarRange,
  ClipboardList,
  Combine,
  Construction,
  FileText,
  Gauge,
  Map as MapIcon,
  SquareParking,
  Wallet,
} from "lucide-react";
import {
  BandaCta,
  Boton,
  Cabecera,
  EnlaceFlecha,
  ListaCheck,
  Seccion,
  Tabla,
  Tarjeta,
  TarjetaIcono,
} from "../../components/informes/ui";
import { BASE, metadatos, solicitarHref } from "../../lib/informes";

export const metadata = metadatos({
  titulo: "Indicadores e informes para el seguimiento de la movilidad municipal",
  descripcion:
    "Para departamentos de Movilidad y Medio Ambiente: integramos transporte público, bicicleta, tráfico y aparcamiento en indicadores del PMUS comparables por barrio, corredor y franja, y preparamos evidencia para informes técnicos.",
  ruta: `${BASE}/ayuntamientos`,
});

const CTA = solicitarHref({ tipo: "ayuntamiento", origen: "ayuntamientos" });

const TRABAJOS = [
  {
    icono: Combine,
    titulo: "Integración de fuentes dispersas",
    texto:
      "Horarios de cada operador, bicicleta compartida, contadores, aparcamientos e inventarios municipales llegan en formatos y fechas distintos. Los reunimos con la misma referencia de lugar, fecha y unidad, y anotamos de dónde sale cada dato.",
  },
  {
    icono: Gauge,
    titulo: "Seguimiento de indicadores del PMUS",
    texto:
      "Definimos cada indicador con su fórmula, fuente y periodicidad, fijamos la situación de partida y lo recalculamos siempre con el mismo método. Si una fuente cambia o deja de publicarse, lo señalamos en lugar de rellenar el hueco.",
  },
  {
    icono: MapIcon,
    titulo: "Comparación por barrios, corredores y franjas",
    texto:
      "Barrios y distritos oficiales, corredores definidos con el equipo técnico, franjas horarias y tipos de día (laborable, sábado, festivo), para ver dónde y cuándo se concentran los problemas.",
  },
  {
    icono: Bike,
    titulo: "Movilidad ciclista y conexiones con transporte público",
    texto:
      "Red ciclista, aparcabicis y disponibilidad de bicicleta compartida junto a estaciones de metro, tren y paradas principales: dónde la bici completa el viaje en transporte público y dónde no.",
  },
  {
    icono: SquareParking,
    titulo: "Disponibilidad de aparcamiento",
    texto:
      "Plazas libres en los aparcamientos públicos que las publican, inventario de aparcamiento de bicicletas y patinetes y, donde hay estaciones beloq, ocupación y rotación del aparcamiento seguro.",
  },
  {
    icono: Construction,
    titulo: "Análisis de obras, cortes y eventos",
    texto:
      "Comparamos el entorno de una obra, un corte de calle o un evento con periodos equivalentes y con una zona de referencia, para separar su efecto de lo que habría pasado igualmente.",
  },
  {
    icono: ClipboardList,
    titulo: "Evaluación de actuaciones y evidencia para informes técnicos",
    texto:
      "Tablas, mapas e indicadores con su procedencia y su método, listos para incorporarlos a memorias, informes de seguimiento o documentación de una actuación.",
  },
];

export default function AyuntamientosPage() {
  return (
    <>
      <Cabecera
        migas={[{ label: "Ayuntamientos y administraciones" }]}
        titulo="Indicadores e informes para el seguimiento de la movilidad municipal"
        entradilla={
          <p>
            Para departamentos de Movilidad, Medio Ambiente y personal técnico
            municipal. Reunimos las fuentes de transporte público, bicicleta,
            tráfico y aparcamiento, calculamos indicadores comparables y preparamos
            la evidencia que necesitan los informes técnicos.
          </p>
        }
        acciones={
          <>
            <Boton href={CTA}>Solicitar una propuesta para mi municipio</Boton>
            <Boton href={`${BASE}/ejemplo`} variante="borde">
              Ver un ejemplo de informe
            </Boton>
          </>
        }
        indice={[
          { href: "#que-resolvemos", label: "Qué resolvemos" },
          { href: "#informacion-municipal", label: "Información municipal" },
          { href: "#documentacion", label: "Documentación para valorar el encargo" },
        ]}
      />

      <Seccion
        id="que-resolvemos"
        titulo="Qué resolvemos"
        intro={
          <p>
            La información para seguir un plan de movilidad urbana sostenible
            (PMUS) existe, pero está repartida entre servicios municipales,
            operadores y otras administraciones, con fechas y formatos distintos.
            Estos son los trabajos que hacemos con ella.
          </p>
        }
      >
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TRABAJOS.map((t) => (
            <li key={t.titulo}>
              <TarjetaIcono icono={t.icono} titulo={t.titulo} tono="borde">
                <p>{t.texto}</p>
              </TarjetaIcono>
            </li>
          ))}
        </ul>
      </Seccion>

      <Seccion
        id="preguntas"
        fondo="gris"
        titulo="Preguntas municipales que se pueden estudiar"
        intro={
          <p>
            Ejemplos de preguntas de análisis. La respuesta depende del municipio,
            del periodo y de los datos disponibles.
          </p>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          {[
            "¿Qué barrios tienen menos salidas de transporte público antes de las 7:00 o después de las 22:00?",
            "¿Qué estaciones de bicicleta compartida junto a estaciones de metro o tren se quedan sin bicis o sin anclajes en hora punta?",
            "¿Cómo ha evolucionado un indicador del PMUS desde la situación de partida?",
            "¿Qué cambió en la oferta de autobús y en el tráfico de una zona durante el corte de una calle?",
            "¿Dónde hay más demanda ciclista y menos aparcamiento de bicicletas?",
            "¿Cuánto tarda el entorno de un gran evento en volver a la normalidad?",
          ].map((p) => (
            <Tarjeta key={p} className="font-bold leading-snug text-beloq-dark">
              {p}
            </Tarjeta>
          ))}
        </div>
      </Seccion>

      <Seccion
        id="informacion-municipal"
        titulo="Información municipal que enriquece el trabajo"
        intro={
          <>
            <p>
              Con datos públicos se puede empezar. Con información del propio
              ayuntamiento, más preguntas se responden con cifras observadas en lugar
              de estimaciones.
            </p>
          </>
        }
      >
        <Tabla
          titulo="Información municipal útil para el análisis"
          columnas={["Información", "Para qué sirve", "Ejemplos"]}
          filas={[
            [
              "Inventarios",
              "Saber qué hay y dónde: la oferta con la que se compara la demanda.",
              "Aparcabicis, plazas de carga y descarga, carriles bici, paradas, aparcamientos.",
            ],
            [
              "Fechas de actuaciones",
              "Situar en el tiempo cada cambio para comparar antes y después.",
              "Inicio y fin de obras, cambios de líneas o de horarios, apertura de una infraestructura.",
            ],
            [
              "Aforos",
              "Medir pasos de vehículos, bicicletas o peatones en puntos concretos.",
              "Campañas de aforo, contadores permanentes, espiras.",
            ],
            [
              "Encuestas",
              "Conocer motivos, orígenes y destinos que no aparecen en los registros.",
              "Encuestas de movilidad domiciliaria, encuestas en centros o en eventos (resultados agregados).",
            ],
            [
              "Datos agregados de operadores",
              "Pasar de la oferta programada a la demanda observada.",
              "Validaciones por línea o parada, uso de bicicleta compartida, ocupación de aparcamientos.",
            ],
          ]}
        />
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-gray-600">
          Trabajamos con información agregada. Si algún dato contiene información
          personal, se acuerda antes cómo se entrega y se trata.
        </p>
      </Seccion>

      <Seccion
        id="documentacion"
        fondo="gris"
        titulo="Documentación para valorar el encargo"
        intro={
          <p>
            Antes de empezar entregamos una propuesta por escrito para que el
            servicio técnico pueda valorarla. Incluye cuatro bloques:
          </p>
        }
      >
        <div className="grid gap-6 md:grid-cols-2">
          <TarjetaIcono icono={MapIcon} titulo="Alcance">
            <p>
              La pregunta que se responde, el ámbito territorial, el periodo, las
              fuentes previstas y lo que queda fuera del encargo.
            </p>
          </TarjetaIcono>
          <TarjetaIcono icono={FileText} titulo="Entregables">
            <p>
              Qué documentos, tablas, mapas e indicadores se entregan, en qué formato,
              y si incluye reunión de resultados, acceso al agente o actualizaciones.
            </p>
          </TarjetaIcono>
          <TarjetaIcono icono={CalendarRange} titulo="Calendario">
            <p>
              Fases con sus fechas: preparación de datos, análisis, entrega y, si
              hay seguimiento, cada actualización. Depende de los datos que haya que
              reunir y del periodo que haya que observar.
            </p>
          </TarjetaIcono>
          <TarjetaIcono icono={Wallet} titulo="Presupuesto">
            <p>
              Importe desglosado por fases. Depende del número de zonas, del periodo,
              de los datos disponibles, de los trabajos adicionales y de la
              periodicidad del seguimiento.
            </p>
          </TarjetaIcono>
        </div>
        <div className="mt-8 max-w-3xl">
          <ListaCheck
            items={[
              "El procedimiento de contratación lo determina la administración; nos adaptamos a la documentación que pida.",
              "La cobertura inicial es València y su entorno. Para otros municipios comprobamos antes qué datos hay disponibles.",
              <>
                Puedes ver cómo es un informe en el{" "}
                <EnlaceFlecha href={`${BASE}/ejemplo`}>ejemplo de informe</EnlaceFlecha>
              </>,
            ]}
          />
        </div>
      </Seccion>

      <Seccion
        id="normativa"
        titulo="PMUS y Ley de Movilidad Sostenible"
        intro={
          <p>
            La Ley 9/2025 de Movilidad Sostenible pide informes de seguimiento de los
            planes de movilidad de las entidades locales obligadas, y la normativa
            valenciana pide un sistema de seguimiento de los indicadores del plan
            municipal. Lo resumimos, con los artículos, en nuestra guía.
          </p>
        }
      >
        <EnlaceFlecha href={`${BASE}/ley-movilidad-sostenible`}>
          Guía de la Ley de Movilidad Sostenible
        </EnlaceFlecha>
      </Seccion>

      <BandaCta
        titulo="¿Qué necesita seguir o justificar tu municipio?"
        texto={
          <p>
            Cuéntanos la pregunta, la zona y el plazo. Te enviaremos una propuesta con
            alcance, entregables, calendario y presupuesto.
          </p>
        }
        href={CTA}
        boton="Solicitar una propuesta para mi municipio"
        secundario={{ href: `${BASE}/metodologia`, label: "Leer la metodología" }}
      />
    </>
  );
}
