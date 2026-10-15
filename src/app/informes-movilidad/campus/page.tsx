import {
  Bike,
  CalendarRange,
  DoorOpen,
  GitCompareArrows,
  Info,
  SquareParking,
  TrainFront,
} from "lucide-react";
import {
  BandaCta,
  Boton,
  Cabecera,
  EnlaceFlecha,
  ListaCheck,
  Nota,
  Seccion,
  Tabla,
  Tarjeta,
  TarjetaIcono,
} from "../../components/informes/ui";
import { BASE, metadatos, solicitarHref } from "../../lib/informes";

export const metadata = metadatos({
  titulo: "Movilidad y accesibilidad en campus y centros de actividad",
  descripcion:
    "Para universidades, hospitales y parques empresariales: accesibilidad por entradas, horarios y colectivos, bicicleta compartida, conexiones con transporte público, aparcamiento seguro y comparaciones entre periodos equivalentes.",
  ruta: `${BASE}/campus`,
});

const CTA = solicitarHref({
  tipo: "campus",
  servicio: "accesibilidad",
  origen: "campus",
});

const ANALISIS = [
  {
    icono: DoorOpen,
    titulo: "Accesibilidad por entradas, horarios y colectivos",
    texto:
      "Cómo se llega a cada entrada según la hora y el día, y qué cambia para estudiantes, personal, pacientes o visitantes, que no llegan ni se van a la misma hora.",
  },
  {
    icono: Bike,
    titulo: "Disponibilidad de bicicleta compartida",
    texto:
      "Estaciones cercanas a cada entrada, cuándo se quedan sin bicis o sin anclajes y si la saturación coincide con las horas de entrada y salida.",
  },
  {
    icono: TrainFront,
    titulo: "Conexiones con transporte público",
    texto:
      "Paradas y estaciones que sirven al centro, salidas programadas por franja, primeros y últimos servicios y márgenes de transbordo.",
  },
  {
    icono: SquareParking,
    titulo: "Utilización y distribución del aparcamiento seguro",
    texto:
      "Dónde está el aparcamiento de bicicletas y patinetes respecto a las entradas y, donde hay estaciones beloq, su ocupación, duración de las estancias y rotación.",
  },
  {
    icono: CalendarRange,
    titulo: "Seguimiento de actuaciones",
    texto:
      "Indicadores definidos antes de una actuación (una entrada nueva, un cambio de horarios, más aparcamiento) y medidos con el mismo método después.",
  },
  {
    icono: GitCompareArrows,
    titulo: "Comparaciones entre periodos equivalentes",
    texto:
      "Periodo lectivo con periodo lectivo, semana de exámenes con semana de exámenes y mismos días de la semana, para no confundir el calendario con el efecto de una medida.",
  },
];

export default function CampusPage() {
  return (
    <>
      <Cabecera
        migas={[{ label: "Campus y centros de actividad" }]}
        titulo="Movilidad y accesibilidad en campus y centros de actividad"
        entradilla={
          <p>
            Para universidades, hospitales, parques empresariales y otros centros con
            mucha afluencia: cómo se llega por cada entrada y a cada hora, qué
            funciona para cada colectivo y cómo evoluciona después de una actuación.
          </p>
        }
        acciones={
          <>
            <Boton href={CTA}>Solicitar un análisis de accesibilidad</Boton>
            <Boton href={`${BASE}/ejemplo`} variante="borde">
              Ver un ejemplo de informe
            </Boton>
          </>
        }
        indice={[
          { href: "#que-analizamos", label: "Qué analizamos" },
          { href: "#situaciones", label: "Situaciones habituales" },
          { href: "#periodos", label: "Periodos equivalentes" },
          { href: "#normativa", label: "Normativa" },
        ]}
      />

      <Seccion id="que-analizamos" titulo="Qué analizamos">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ANALISIS.map((a) => (
            <li key={a.titulo}>
              <TarjetaIcono icono={a.icono} titulo={a.titulo} tono="borde">
                <p>{a.texto}</p>
              </TarjetaIcono>
            </li>
          ))}
        </ul>
      </Seccion>

      <Seccion
        id="situaciones"
        fondo="gris"
        titulo="Situaciones habituales en centros de actividad"
        intro={
          <p>
            Problemas frecuentes que un análisis puede confirmar, descartar o medir.
            Son situaciones típicas: no describen a ninguna universidad, hospital ni
            empresa concreta.
          </p>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              t: "Varias entradas, una sola bien servida",
              d: "La oferta de transporte público se concentra junto a un acceso y el resto queda lejos de cualquier parada.",
            },
            {
              t: "Turnos que empiezan antes que el transporte",
              d: "En hospitales y centros con turnos, la entrada de madrugada puede ser anterior al primer servicio útil.",
            },
            {
              t: "Última etapa larga o poco segura",
              d: "La estación está cerca en el mapa, pero el recorrido a pie o en bici hasta la puerta es largo, poco directo o sin itinerario seguro.",
            },
            {
              t: "Aparcamiento de bicis desigual",
              d: "Lleno en unas entradas y vacío en otras, o lejos de los edificios que más personas reciben.",
            },
            {
              t: "Calendario que cambia la demanda",
              d: "Exámenes, vacaciones, congresos o campañas alteran la afluencia y pueden ocultar o exagerar el efecto de una medida.",
            },
            {
              t: "Bicicleta compartida saturada en hora punta",
              d: "Las estaciones cercanas se vacían a la entrada y se llenan a la salida, justo cuando más se necesitan.",
            },
          ].map((s) => (
            <Tarjeta key={s.t}>
              <h3 className="font-bold text-beloq-dark">{s.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{s.d}</p>
            </Tarjeta>
          ))}
        </div>
      </Seccion>

      <Seccion
        id="periodos"
        titulo="Por qué comparamos periodos equivalentes"
        intro={
          <p>
            En un campus o un hospital la afluencia cambia mucho a lo largo del año.
            Si se compara una semana de clases con una de vacaciones, cualquier
            medida parecerá un éxito o un fracaso. Por eso cada comparación se
            plantea así:
          </p>
        }
      >
        <Tabla
          titulo="Criterios para comparar periodos"
          columnas={["Criterio", "Qué significa", "Por qué importa"]}
          filas={[
            [
              "Mismo tipo de periodo",
              "Lectivo con lectivo, exámenes con exámenes, verano con verano.",
              "La afluencia depende del calendario más que de cualquier medida.",
            ],
            [
              "Mismos días de la semana",
              "Se comparan lunes con lunes, viernes con viernes.",
              "La demanda y la oferta de transporte cambian según el día.",
            ],
            [
              "Sin festivos ni eventos excepcionales",
              "Se excluyen o se analizan aparte.",
              "Un festivo o un evento alteran un día entero.",
            ],
            [
              "Misma versión de los horarios",
              "Se comprueba qué horarios estaban vigentes en cada periodo.",
              "Un cambio de horarios del operador puede explicar por sí solo una diferencia.",
            ],
            [
              "Zona de referencia",
              "Si es posible, se mide también una zona sin la actuación.",
              "Ayuda a separar el efecto de la medida de lo que cambió en toda la ciudad.",
            ],
          ]}
        />
      </Seccion>

      <Seccion
        id="normativa"
        fondo="gris"
        titulo="Normativa relacionada"
        intro={
          <p>
            Varios instrumentos pueden afectar a un centro de actividad. Los
            explicamos con sus artículos en la guía.
          </p>
        }
      >
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <ListaCheck
            items={[
              <>
                <strong className="text-beloq-dark">Centros de formación en la Comunitat Valenciana.</strong>{" "}
                La Ley 6/2011 de Movilidad de la Comunitat Valenciana (art. 15) prevé
                que los centros de formación secundaria o universitaria de más de 500
                estudiantes dispongan de un plan de movilidad.
              </>,
              <>
                <strong className="text-beloq-dark">Grandes centros de actividad.</strong>{" "}
                La Ley 9/2025 (art. 25) remite a unos criterios que deben fijar los
                ministerios competentes para identificar qué centros necesitan un
                plan de movilidad sostenible.
              </>,
              <>
                <strong className="text-beloq-dark">Movilidad al trabajo.</strong>{" "}
                La plantilla del centro puede estar además dentro del plan de
                movilidad sostenible al trabajo (art. 26 de la Ley 9/2025).
              </>,
            ]}
          />
          <Tarjeta className="flex flex-col justify-center">
            <p className="text-gray-600">Ámbito, plazos y componentes de cada plan:</p>
            <div className="mt-3">
              <EnlaceFlecha href={`${BASE}/ley-movilidad-sostenible`}>
                Guía de la Ley de Movilidad Sostenible
              </EnlaceFlecha>
            </div>
          </Tarjeta>
        </div>
      </Seccion>

      <Seccion
        id="aparcamiento-seguro"
        titulo="Aparcamiento seguro en el centro"
        intro={
          <p>
            Si el centro tiene estaciones beloq, su telemetría aporta ocupación,
            duración de las estancias y rotación, siempre agregadas. Sirve para ver
            si el aparcamiento está donde se necesita y para evaluar una ampliación o
            un traslado. Si no las tiene, el análisis se hace igual con el resto de
            fuentes.
          </p>
        }
      >
        <Nota icono={Info} titulo="Sin datos de personas">
          <p>
            Para analizar colectivos usamos cifras agregadas que facilita el centro
            (por ejemplo, número de personas por turno o por edificio). No
            necesitamos datos de estudiantes, pacientes ni personal concretos.
          </p>
        </Nota>
      </Seccion>

      <BandaCta
        titulo="¿Por qué entradas y a qué horas se llega peor a tu centro?"
        texto={
          <p>
            Cuéntanos qué centro, qué colectivos y qué decisión tienes por delante.
            Te enviaremos una propuesta con alcance, entregables, calendario y
            presupuesto.
          </p>
        }
        href={CTA}
        boton="Solicitar un análisis de accesibilidad"
        secundario={{ href: `${BASE}/metodologia`, label: "Leer la metodología" }}
      />
    </>
  );
}
