import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Bike,
  BookOpen,
  Building2,
  Bus,
  Car,
  Clock,
  Construction,
  Database,
  FileSearch,
  FileText,
  Gauge,
  GitCompareArrows,
  GraduationCap,
  Landmark,
  ListChecks,
  Map as MapIcon,
  MessagesSquare,
  Monitor,
  Presentation,
  Repeat,
  Scale,
  SquareParking,
  Waypoints,
} from "lucide-react";
import {
  BandaCta,
  Boton,
  Cabecera,
  EnlaceFlecha,
  ListaCheck,
  Pasos,
  Preguntas,
  Seccion,
  Tarjeta,
  TarjetaIcono,
} from "../components/informes/ui";
import {
  BASE,
  SERVICIOS,
  SITE,
  jsonLd,
  metadatos,
  solicitarHref,
} from "../lib/informes";

export const metadata = metadatos({
  titulo: "Informes de movilidad para decidir y evaluar con datos · beloq",
  absoluto: true,
  descripcion:
    "Diagnóstico, análisis y seguimiento de movilidad para ayuntamientos, empresas, universidades y centros de actividad en València: transporte público, bicicleta, tráfico y aparcamiento, con cifras, mapas, fuentes y recomendaciones.",
  ruta: BASE,
});

const COMPRADORES = [
  {
    icono: Landmark,
    titulo: "Ayuntamientos y administraciones",
    texto:
      "Los datos de autobús, metro, bicicleta, tráfico y aparcamiento están repartidos entre operadores y servicios. Los reunimos en indicadores comparables por barrio, corredor y franja para seguir el plan de movilidad y justificar actuaciones.",
    href: `${BASE}/ayuntamientos`,
    enlace: "Movilidad municipal",
  },
  {
    icono: Building2,
    titulo: "Empresas y centros de trabajo",
    texto:
      "Cómo puede llegar la plantilla a cada turno, qué alternativas al coche funcionan de verdad y qué medidas conviene priorizar y seguir en un plan de movilidad sostenible al trabajo.",
    href: `${BASE}/empresas`,
    enlace: "Movilidad al trabajo",
  },
  {
    icono: GraduationCap,
    titulo: "Universidades y centros de actividad",
    texto:
      "Campus, hospitales y parques empresariales con varias entradas, horarios y colectivos: dónde falla el acceso y cómo evoluciona después de cada actuación.",
    href: `${BASE}/campus`,
    enlace: "Campus y centros de actividad",
  },
];

const ENTREGABLES = [
  {
    icono: FileText,
    titulo: "Resumen ejecutivo",
    texto:
      "La pregunta, la respuesta corta, los hallazgos principales y las recomendaciones, en pocas páginas.",
  },
  {
    icono: MapIcon,
    titulo: "Mapas, gráficos y tablas",
    texto:
      "Dónde y cuándo ocurre cada problema, junto con las tablas de las que salen los gráficos.",
  },
  {
    icono: Gauge,
    titulo: "Indicadores definidos y comparables",
    texto:
      "Cada indicador con su definición, unidad, fuente y periodo, para repetir el cálculo más adelante.",
  },
  {
    icono: ListChecks,
    titulo: "Recomendaciones priorizadas",
    texto:
      "Medidas ordenadas por prioridad, con el hallazgo que las justifica y quién puede aplicarlas.",
  },
  {
    icono: Database,
    titulo: "Anexo de fuentes, metodología y cobertura",
    texto:
      "Qué datos se han usado, de qué fechas, qué zona cubren y qué limitaciones tienen.",
  },
  {
    icono: Presentation,
    titulo: "Reunión de resultados",
    texto:
      "Presentamos el informe a tu equipo y resolvemos las dudas sobre cifras y método.",
  },
  {
    icono: Repeat,
    titulo: "Actualizaciones",
    texto:
      "Si se contrata seguimiento, recalculamos los indicadores con el mismo método en cada periodo.",
  },
];

const PREGUNTAS_ESTUDIO = [
  {
    icono: Clock,
    pregunta:
      "¿Qué alternativas permiten llegar a un centro antes del comienzo de un turno?",
    necesita:
      "Horarios programados de los operadores, accesos del centro y hora de inicio de cada turno.",
  },
  {
    icono: Bike,
    pregunta:
      "¿Qué estaciones de bicicleta compartida presentan falta recurrente de bicicletas o anclajes?",
    necesita:
      "Registro continuado de la disponibilidad de cada estación durante varias semanas.",
  },
  {
    icono: Waypoints,
    pregunta: "¿Qué conexiones de transporte tienen poco margen de transbordo?",
    necesita:
      "Horarios de las líneas que conectan y tiempo de paso entre andenes o paradas.",
  },
  {
    icono: SquareParking,
    pregunta: "¿Dónde conviene estudiar un refuerzo de aparcamiento seguro?",
    necesita:
      "Inventario de aparcamiento, demanda ciclista observada y, si existen, datos de uso de aparcamiento seguro.",
  },
  {
    icono: Construction,
    pregunta: "¿Cómo evoluciona la movilidad alrededor de una obra o un evento?",
    necesita:
      "Fechas de la obra o del evento, periodos comparables y datos de la zona y de una zona de referencia.",
  },
  {
    icono: GitCompareArrows,
    pregunta: "¿Qué cambia después de aplicar una medida?",
    necesita:
      "Indicadores definidos antes de la medida y medidos con el mismo método después.",
  },
];

const PASOS = [
  {
    titulo: "Definimos la pregunta, el territorio y el periodo",
    texto: "Qué hay que decidir, para qué zona y con qué fechas. Acordamos también qué queda fuera.",
  },
  {
    titulo: "Revisamos las fuentes y los datos necesarios",
    texto: "Qué fuentes públicas sirven, qué puede aportar tu organización y qué cobertura tiene cada una.",
  },
  {
    titulo: "Elaboramos y comprobamos el análisis",
    texto: "Calculamos los indicadores y comprobamos las cifras con un cálculo independiente antes de usarlas.",
  },
  {
    titulo: "Entregamos resultados y recomendaciones",
    texto: "Informe, anexos y reunión para presentar hallazgos, límites y prioridades.",
  },
  {
    titulo: "Seguimos los indicadores",
    texto: "Si el encargo lo requiere, actualizamos los indicadores con el mismo método en cada periodo.",
  },
];

const FAQ: { pregunta: string; respuesta: string }[] = [
  {
    pregunta: "¿Qué territorio cubrís?",
    respuesta:
      "Empezamos por València y su entorno, donde ya trabajamos con las fuentes públicas de transporte, bicicleta compartida, tráfico y aparcamiento. Otros territorios son posibles según el alcance del encargo y los datos disponibles; lo comprobamos antes de enviar la propuesta.",
  },
  {
    pregunta: "¿Hace falta tener estaciones beloq para contratar un informe?",
    respuesta:
      "No. El análisis se basa en fuentes públicas y en los datos que aporte tu organización. La telemetría de beloq solo se incorpora cuando hay estaciones beloq en la zona estudiada.",
  },
  {
    pregunta: "¿El informe recomendará siempre aparcamiento seguro beloq?",
    respuesta:
      "No. Las recomendaciones salen de los datos: pueden ser cambios de horario, mejoras del acceso a pie o en bici, peticiones al operador de transporte, aparcamiento convencional o aparcamiento seguro. Si una recomendación tiene que ver con productos de beloq, lo indicamos expresamente.",
  },
  {
    pregunta: "¿Qué datos tiene que aportar mi organización?",
    respuesta:
      "Depende de la pregunta. Para un centro de trabajo suelen bastar la ubicación y los accesos, los horarios o turnos, el número de personas por turno y el aparcamiento disponible. Siempre en cifras agregadas: no necesitamos datos de personas concretas ni nóminas.",
  },
  {
    pregunta: "¿Cómo tratáis los datos personales?",
    respuesta:
      "Trabajamos con datos agregados. Si un encargo incluye una encuesta u otra recogida de datos, acordamos antes con tu organización cómo se hace, quién responde de cada dato y cuánto tiempo se conserva. Los datos que nos envías en la solicitud se tratan según nuestra política de privacidad.",
  },
  {
    pregunta: "¿Cuánto cuesta un informe?",
    respuesta:
      "Depende del número de centros o zonas, del periodo y la extensión territorial, de los datos disponibles, de si hay encuestas u otros trabajos adicionales y de si se contrata seguimiento. Con tu solicitud preparamos una propuesta con el presupuesto de ese alcance.",
  },
  {
    pregunta: "¿Cuánto se tarda?",
    respuesta:
      "El calendario se fija en la propuesta. Depende sobre todo del periodo que haya que observar: algunas preguntas se responden con horarios publicados y otras necesitan varias semanas de datos.",
  },
  {
    pregunta: "¿Qué papel tiene la inteligencia artificial?",
    respuesta:
      "La usamos para consultar los datos en castellano y agilizar el análisis. Las cifras salen de consultas comprobadas con un cálculo independiente, y las conclusiones y recomendaciones las revisa una persona del equipo antes de entregarlas. El agente se identifica siempre como una IA.",
  },
  {
    pregunta: "¿Un informe sirve para cumplir la Ley de Movilidad Sostenible?",
    respuesta:
      "Un informe de datos no garantiza por sí solo el cumplimiento. Puede aportar el diagnóstico y los indicadores de seguimiento de un plan, pero el plan incluye además participación, negociación, medidas, responsables y aprobación. Lo explicamos en nuestra guía de la ley.",
  },
  {
    pregunta: "¿Trabajáis con consultoras e ingenierías?",
    respuesta:
      "Sí. Podemos aportar análisis, mapas e indicadores con su procedencia para que se integren en un plan o un estudio que redacta otro equipo.",
  },
];

const servicioLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Informes de movilidad",
  serviceType: "Diagnóstico, análisis y seguimiento de movilidad",
  description:
    "Análisis de transporte público, movilidad ciclista, tráfico y aparcamiento para identificar problemas de acceso, priorizar actuaciones y seguir sus resultados, con informes que incluyen cifras, mapas, fuentes y recomendaciones.",
  url: `${SITE}${BASE}`,
  provider: { "@id": `${SITE}/#organizacion` },
  areaServed: { "@type": "City", name: "València" },
  audience: [
    "Ayuntamientos y administraciones",
    "Empresas y centros de trabajo",
    "Universidades y centros de actividad",
    "Consultoras e ingenierías",
  ].map((a) => ({ "@type": "Audience", audienceType: a })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de informes de movilidad",
    itemListElement: SERVICIOS.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.titulo, description: s.resumen },
    })),
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.pregunta,
    acceptedAnswer: { "@type": "Answer", text: f.respuesta },
  })),
};

/** Esquema en HTML (texto real, no imagen): fuentes → análisis → entrega. */
function CruceDeFuentes() {
  const fuentes = [
    { icono: Bus, label: "Transporte público" },
    { icono: Bike, label: "Movilidad ciclista" },
    { icono: Car, label: "Tráfico" },
    { icono: SquareParking, label: "Aparcamiento" },
    { icono: Building2, label: "Datos de tu organización" },
  ];
  const entrega = ["Cifras", "Mapas y gráficos", "Recomendaciones", "Fuentes y método"];
  return (
    <figure className="rounded-[0_24px_0_24px] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] sm:p-8">
      <div className="grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-beloq-dark">
            Fuentes
          </p>
          <ul className="mt-3 space-y-2">
            {fuentes.map((f) => (
              <li
                key={f.label}
                className="flex items-center gap-3 rounded-[0_12px_0_12px] bg-beloq-gray px-3 py-2 text-sm font-bold text-beloq-dark"
              >
                <f.icono aria-hidden className="h-4 w-4 shrink-0" />
                {f.label}
              </li>
            ))}
          </ul>
        </div>
        <Flecha />
        <div className="rounded-[0_24px_0_24px] bg-beloq-dark p-5 text-white">
          <p className="text-xs font-bold uppercase tracking-wider text-beloq-yellow">
            Análisis
          </p>
          <p className="mt-2 font-bold leading-snug">
            Indicadores comparables por zona, franja horaria y día
          </p>
          <p className="mt-2 text-sm leading-relaxed text-gray-300">
            Cada cifra comprobada con un cálculo independiente.
          </p>
        </div>
        <Flecha />
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-beloq-dark">
            Entrega
          </p>
          <ul className="mt-3 space-y-2">
            {entrega.map((e) => (
              <li
                key={e}
                className="rounded-[0_12px_0_12px] border-2 border-beloq-yellow px-3 py-2 text-sm font-bold text-beloq-dark"
              >
                {e}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="mt-5 text-sm text-gray-600">
        Cómo se combinan las fuentes en un informe. Qué fuentes entran en cada caso
        depende de la pregunta y de los datos disponibles.
      </figcaption>
    </figure>
  );
}

function Flecha() {
  return (
    <div aria-hidden className="flex justify-center text-beloq-dark">
      <ArrowDown className="h-6 w-6 lg:hidden" />
      <ArrowRight className="hidden h-6 w-6 lg:block" />
    </div>
  );
}

export default function InformesMovilidadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(servicioLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqLd) }}
      />

      <Cabecera
        migas={[]}
        titulo="Informes de movilidad para decidir y evaluar con datos"
        entradilla={
          <>
            <p>
              Analizamos transporte público, movilidad ciclista y aparcamiento para
              identificar problemas de acceso, priorizar actuaciones y seguir sus
              resultados. Recibe un informe con cifras, mapas, fuentes y
              recomendaciones, y consulta los indicadores en castellano mediante
              nuestro agente.
            </p>
            <p className="mt-3 text-base">
              Cobertura inicial: València y su entorno. Otros territorios, según el
              alcance y los datos disponibles.
            </p>
          </>
        }
        acciones={
          <>
            <Boton href={solicitarHref({ origen: "inicio" })}>Solicitar un informe</Boton>
            <Boton href={`${BASE}/ejemplo`} variante="borde">
              Ver qué incluye un informe
            </Boton>
          </>
        }
      />

      <Seccion
        id="para-quien"
        titulo="Para quién trabajamos"
        intro={
          <p>
            Tres tipos de organización con problemas distintos. Cada página explica
            qué analizamos en su caso y qué datos puede aportar.
          </p>
        }
      >
        <div className="grid gap-6 md:grid-cols-3">
          {COMPRADORES.map((c) => (
            <TarjetaIcono
              key={c.titulo}
              icono={c.icono}
              titulo={c.titulo}
              tono="borde"
              pie={<EnlaceFlecha href={c.href}>{c.enlace}</EnlaceFlecha>}
            >
              <p>{c.texto}</p>
            </TarjetaIcono>
          ))}
        </div>
      </Seccion>

      <Seccion
        id="que-analizamos"
        fondo="gris"
        titulo="Cruzamos fuentes para responder preguntas concretas"
        intro={
          <p>
            Combinamos transporte público, movilidad ciclista, tráfico y
            aparcamiento con los datos que aporte tu organización para:
          </p>
        }
      >
        <div className="space-y-10">
          <ListaCheck
            items={[
              "Identificar problemas de acceso y de conexión entre modos.",
              "Priorizar actuaciones e inversiones.",
              "Analizar diferencias por horarios, zonas y días.",
              "Seguir los indicadores de un plan de movilidad.",
              "Evaluar qué cambia después de una actuación.",
            ]}
          />
          <CruceDeFuentes />
        </div>
      </Seccion>

      <Seccion
        id="servicios"
        titulo="Servicios que puedes contratar"
        intro={
          <p>
            Cada encargo parte de una pregunta. Estos son los cinco tipos de trabajo
            más habituales; se pueden combinar en un mismo encargo.
          </p>
        }
      >
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICIOS.map((s, i) => (
            <li key={s.id} id={`servicio-${s.id}`} className="scroll-mt-32">
              <Tarjeta tono="borde" className="flex h-full flex-col">
                <span className="text-sm font-bold text-beloq-dark">
                  Servicio {i + 1}
                </span>
                <h3 className="mt-1 text-lg font-bold leading-snug text-beloq-dark">
                  {s.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.resumen}</p>
                <p className="mt-4 text-sm font-bold text-beloq-dark">Incluye, según el caso:</p>
                <ul className="mt-2 flex-1 list-disc space-y-1 pl-5 text-sm leading-relaxed text-gray-600">
                  {s.entregables.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
                <div className="mt-5">
                  <EnlaceFlecha href={solicitarHref({ servicio: s.id, origen: "inicio" })}>
                    Solicitar este servicio
                  </EnlaceFlecha>
                </div>
              </Tarjeta>
            </li>
          ))}
          <li>
            <Tarjeta tono="oscura" className="flex h-full flex-col">
              <h3 className="text-lg font-bold leading-snug">¿No encaja ninguno?</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-300">
                Cuéntanos la pregunta que tienes y el territorio. Te diremos qué se
                puede analizar con los datos disponibles y qué haría falta.
              </p>
              <Link
                href={solicitarHref({ origen: "inicio" })}
                className="mt-5 font-bold text-beloq-yellow"
              >
                <span className="underline underline-offset-4">Plantear mi pregunta</span>
                <ArrowRight aria-hidden className="ml-1.5 inline h-4 w-4 align-[-0.15em]" />
              </Link>
            </Tarjeta>
          </li>
        </ol>
      </Seccion>

      <Seccion
        id="que-recibes"
        fondo="gris"
        titulo="Qué recibes"
        intro={<p>Un informe que se puede leer en una reunión y revisar línea a línea.</p>}
      >
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ENTREGABLES.map((e) => (
            <li key={e.titulo}>
              <TarjetaIcono icono={e.icono} titulo={e.titulo}>
                <p>{e.texto}</p>
              </TarjetaIcono>
            </li>
          ))}
          <li className="sm:col-span-2 lg:col-span-1">
            <Tarjeta tono="oscura" className="flex h-full flex-col">
              <span className="flex h-11 w-11 items-center justify-center rounded-[0_12px_0_12px] bg-beloq-yellow text-beloq-dark">
                <MessagesSquare aria-hidden className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold leading-snug">
                Consulta en castellano con el agente
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-300">
                Pregunta por los indicadores del informe con tus palabras. El agente
                es una IA: responde con cifra, unidad, periodo y fuente, y avisa
                cuando un cálculo no está verificado. El acceso y su alcance se
                acuerdan en cada encargo.
              </p>
              <Link
                href={`${BASE}/metodologia#agente`}
                className="mt-5 font-bold text-beloq-yellow"
              >
                <span className="underline underline-offset-4">
                  Qué hace el agente y qué se revisa
                </span>
                <ArrowRight aria-hidden className="ml-1.5 inline h-4 w-4 align-[-0.15em]" />
              </Link>
            </Tarjeta>
          </li>
        </ul>
      </Seccion>

      <Seccion
        id="preguntas-de-analisis"
        titulo="Preguntas que podemos estudiar"
        intro={
          <p>
            Son preguntas de análisis, no respuestas: la respuesta depende del
            territorio, del periodo y de los datos disponibles en cada caso.
          </p>
        }
      >
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PREGUNTAS_ESTUDIO.map((p) => (
            <li key={p.pregunta}>
              <TarjetaIcono icono={p.icono} titulo={p.pregunta} tono="borde">
                <p>
                  <strong className="text-beloq-dark">Qué hace falta:</strong>{" "}
                  {p.necesita}
                </p>
              </TarjetaIcono>
            </li>
          ))}
        </ul>
      </Seccion>

      <Seccion id="como-trabajamos" fondo="gris" titulo="Cómo trabajamos">
        <Pasos pasos={PASOS} />
        <p className="mt-10 text-gray-600">
          Qué fuentes usamos y cómo comprobamos cada cifra:{" "}
          <EnlaceFlecha href={`${BASE}/metodologia`}>Metodología</EnlaceFlecha>
        </p>
      </Seccion>

      <Seccion
        id="presupuesto"
        titulo="Cómo se calcula el presupuesto"
        intro={
          <p>
            No publicamos tarifas cerradas: cada encargo se presupuesta según su
            alcance. La propuesta llega por escrito, con alcance, entregables,
            calendario y presupuesto, antes de empezar.
          </p>
        }
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-bold text-beloq-dark">De qué depende</h3>
            <div className="mt-4">
              <ListaCheck
                items={[
                  "Número de centros o zonas que se analizan.",
                  "Periodo de análisis y extensión territorial.",
                  "Datos disponibles y trabajo necesario para prepararlos.",
                  "Encuestas, conteos u otros trabajos adicionales.",
                  "Periodicidad del seguimiento, si se contrata.",
                ]}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Tarjeta tono="gris" className="flex flex-col">
              <h3 className="text-lg font-bold text-beloq-dark">Encargo puntual</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                Un análisis con fecha de entrega para responder una pregunta o
                preparar una decisión.
              </p>
              <div className="mt-4">
                <EnlaceFlecha href={solicitarHref({ modalidad: "puntual", origen: "inicio" })}>
                  Pedir un encargo puntual
                </EnlaceFlecha>
              </div>
            </Tarjeta>
            <Tarjeta tono="gris" className="flex flex-col">
              <h3 className="text-lg font-bold text-beloq-dark">Seguimiento periódico</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                Indicadores actualizados con el mismo método cada mes, trimestre o
                año, para seguir un plan o una actuación.
              </p>
              <div className="mt-4">
                <EnlaceFlecha
                  href={solicitarHref({ modalidad: "seguimiento", origen: "inicio" })}
                >
                  Pedir un seguimiento
                </EnlaceFlecha>
              </div>
            </Tarjeta>
          </div>
        </div>
      </Seccion>

      <Seccion
        id="estaciones-beloq"
        fondo="gris"
        titulo="Aparcamiento seguro beloq: datos de uso para evaluar actuaciones"
        intro={
          <>
            <p>
              beloq fabrica estaciones de aparcamiento seguro para bicicletas y
              patinetes. Donde hay estaciones beloq instaladas, su telemetría permite
              medir de forma agregada, sin identificar a nadie, la ocupación por
              franja, la duración de las estancias y la rotación de las plazas.
            </p>
            <p>
              Con esos datos observados se puede evaluar una actuación: por ejemplo,
              comparar la ocupación antes y después de un cambio en la zona. La
              cobertura depende de dónde haya estaciones: no hay estaciones beloq en
              toda la ciudad y el análisis no depende de ellas. Según lo que digan los
              datos, el informe puede recomendar medidas muy distintas: aparcamiento
              convencional, aparcamiento seguro, mejoras en la última etapa a pie o
              ajustes de horarios.
            </p>
          </>
        }
      >
        <Tarjeta className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0_12px_0_12px] bg-beloq-yellow text-beloq-dark">
            <Monitor aria-hidden className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <h3 className="font-bold text-beloq-dark">Demostración de beloq Console</h3>
            <p className="mt-1 text-sm leading-relaxed text-gray-600">
              Una muestra de la interfaz de gestión de estaciones.{" "}
              <strong className="text-beloq-dark">Funciona con datos simulados</strong>:
              no es un informe real ni refleja ninguna implantación, y los lugares y
              cifras que aparecen forman parte de la simulación.
            </p>
          </div>
          {/* /console es una demo estática (rewrite), no una ruta de Next. */}
          <a
            href="/console"
            className="inline-flex shrink-0 items-center gap-1.5 font-bold text-beloq-dark underline decoration-beloq-yellow decoration-2 underline-offset-4"
          >
            Abrir la demostración
            <ArrowRight aria-hidden className="h-4 w-4" />
          </a>
        </Tarjeta>
      </Seccion>

      <Seccion
        id="antes-de-pedir"
        titulo="Antes de pedir un informe"
        intro={<p>Todo lo esencial está en estas páginas, sin registro ni descargas.</p>}
      >
        <div className="grid gap-6 md:grid-cols-3">
          <TarjetaIcono
            icono={FileSearch}
            titulo="Ejemplo de informe"
            tono="borde"
            pie={<EnlaceFlecha href={`${BASE}/ejemplo`}>Ver el ejemplo</EnlaceFlecha>}
          >
            <p>
              La estructura completa de un diagnóstico con un caso ficticio, sin
              cifras ni conclusiones inventadas.
            </p>
          </TarjetaIcono>
          <TarjetaIcono
            icono={BookOpen}
            titulo="Metodología"
            tono="borde"
            pie={<EnlaceFlecha href={`${BASE}/metodologia`}>Leer la metodología</EnlaceFlecha>}
          >
            <p>Fuentes, comprobaciones y cómo leer cada tipo de dato.</p>
          </TarjetaIcono>
          <TarjetaIcono
            icono={Scale}
            titulo="Guía de la Ley de Movilidad Sostenible"
            tono="borde"
            pie={
              <EnlaceFlecha href={`${BASE}/ley-movilidad-sostenible`}>
                Leer la guía
              </EnlaceFlecha>
            }
          >
            <p>
              PMST, PMUS, diagnóstico y seguimiento, contrastados con el texto del
              BOE.
            </p>
          </TarjetaIcono>
        </div>
      </Seccion>

      <Seccion id="preguntas-frecuentes" fondo="gris" titulo="Preguntas frecuentes">
        <div className="max-w-3xl">
          <Preguntas
            items={FAQ.map((f) => ({
              pregunta: f.pregunta,
              respuesta: <p>{f.respuesta}</p>,
            }))}
          />
        </div>
      </Seccion>

      <BandaCta
        titulo="¿Qué necesitas decidir, analizar o justificar?"
        texto={
          <p>
            Cuéntanoslo en el formulario y prepararemos una propuesta con alcance,
            entregables, calendario y presupuesto.
          </p>
        }
        href={solicitarHref({ origen: "inicio" })}
        boton="Solicitar un informe"
        secundario={{ href: `${BASE}/ejemplo`, label: "Ver un ejemplo de informe" }}
      />
    </>
  );
}
