import { CalendarCheck, Info } from "lucide-react";
import type { ReactNode } from "react";
import {
  BandaCta,
  Cabecera,
  ListaCheck,
  Nota,
  Seccion,
  Tabla,
  Tarjeta,
} from "../../components/informes/ui";
import {
  BASE,
  REVISION_NORMATIVA,
  SITE,
  jsonLd,
  metadatos,
  solicitarHref,
} from "../../lib/informes";

export const metadata = metadatos({
  titulo: "Ley de Movilidad Sostenible: PMST, PMUS, diagnóstico y seguimiento",
  descripcion:
    "Guía informativa sobre la Ley 9/2025 de Movilidad Sostenible y el Real Decreto-ley 7/2026: diferencia entre PMST y PMUS, ámbito del centro de trabajo, componentes de un plan, papel del diagnóstico y del seguimiento y normativa valenciana. Revisada con el BOE.",
  ruta: `${BASE}/ley-movilidad-sostenible`,
});

const CTA = solicitarHref({ servicio: "indicadores-seguimiento", origen: "ley" });

const FUENTES = [
  {
    nombre: "Ley 9/2025, de 3 de diciembre, de Movilidad Sostenible",
    detalle:
      "BOE núm. 291, de 4 de diciembre de 2025; en vigor desde el 5 de diciembre de 2025. Texto consolidado, última actualización publicada el 21 de marzo de 2026.",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2025-24545",
  },
  {
    nombre:
      "Real Decreto-ley 7/2026, de 20 de marzo, por el que se aprueba el Plan Integral de Respuesta a la Crisis en Oriente Medio",
    detalle:
      "BOE núm. 71, de 21 de marzo de 2026; en vigor desde el 22 de marzo de 2026. Artículos 63 y 64. Convalidado por el Congreso de los Diputados (Resolución de 26 de marzo de 2026).",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2026-6544",
  },
  {
    nombre: "Ley 7/2021, de 20 de mayo, de cambio climático y transición energética",
    detalle: "Artículo 14.3, sobre planes de movilidad urbana sostenible.",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2021-8447",
  },
  {
    nombre: "Ley 6/2011, de 1 de abril, de Movilidad de la Comunitat Valenciana",
    detalle: "Capítulo III, artículos 9 a 15, sobre planes de movilidad.",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2011-7330",
  },
  {
    nombre:
      "Real Decreto Legislativo 2/2015, texto refundido de la Ley del Estatuto de los Trabajadores",
    detalle:
      "Artículo 1.5 (definición de centro de trabajo) y artículo 85.1 (deber de negociar medidas de movilidad sostenible).",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430",
  },
];

const articuloLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Ley de Movilidad Sostenible: planes de movilidad, diagnóstico y seguimiento",
  inLanguage: "es",
  url: `${SITE}${BASE}/ley-movilidad-sostenible`,
  datePublished: REVISION_NORMATIVA.iso,
  dateModified: REVISION_NORMATIVA.iso,
  author: { "@id": `${SITE}/#organizacion` },
  publisher: { "@id": `${SITE}/#organizacion` },
  citation: FUENTES.map((f) => f.url),
};

// Anclas de los artículos en los textos consolidados del BOE.
const BOE_LEY = "https://www.boe.es/buscar/act.php?id=BOE-A-2025-24545";
const BOE_RDL = "https://www.boe.es/buscar/act.php?id=BOE-A-2026-6544";
const ART = {
  a24: `${BOE_LEY}#a2-6`,
  a25: `${BOE_LEY}#a2-7`,
  a26: `${BOE_LEY}#a2-8`,
  rdl63: `${BOE_RDL}#a6-5`,
};

/** Referencia a un artículo, visible y discreta; con enlace al BOE si lo hay. */
function Art({ children, href }: { children: ReactNode; href?: string }) {
  const clase = "whitespace-nowrap text-sm font-bold text-beloq-dark";
  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${clase} underline decoration-beloq-yellow decoration-2 underline-offset-2`}
    >
      ({children})
    </a>
  ) : (
    <span className={clase}>({children})</span>
  );
}

export default function LeyMovilidadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(articuloLd) }}
      />
      <Cabecera
        migas={[{ label: "Ley de Movilidad Sostenible" }]}
        titulo="Ley de Movilidad Sostenible: planes de movilidad, diagnóstico y seguimiento"
        entradilla={
          <p>
            Guía informativa sobre la Ley 9/2025, de 3 de diciembre, de Movilidad
            Sostenible, con la modificación del Real Decreto-ley 7/2026, y sobre la
            normativa valenciana que se aplica en nuestro territorio. Resume lo que
            dicen los textos, con sus artículos; no es asesoramiento jurídico.
          </p>
        }
        indice={[
          { href: "#pmst-y-pmus", label: "PMST y PMUS" },
          { href: "#centro-de-trabajo", label: "Ámbito del centro" },
          { href: "#componentes", label: "Componentes del plan" },
          { href: "#diagnostico-y-seguimiento", label: "Diagnóstico y seguimiento" },
          { href: "#informacion", label: "Información necesaria" },
          { href: "#comunitat-valenciana", label: "Comunitat Valenciana" },
          { href: "#fuentes", label: "Fuentes" },
        ]}
      >
        <div className="mt-8 max-w-3xl">
          <Nota
            icono={CalendarCheck}
            titulo={
              <>
                Revisada el{" "}
                <time dateTime={REVISION_NORMATIVA.iso}>{REVISION_NORMATIVA.texto}</time>{" "}
                con los textos consolidados del BOE
              </>
            }
          >
            <p>
              Ley 9/2025 (última actualización publicada el 21 de marzo de 2026) y
              Real Decreto-ley 7/2026 (convalidado por el Congreso). Los textos
              consolidados del BOE son informativos; para fines jurídicos vale la
              publicación oficial. La normativa puede cambiar después de esta fecha.
            </p>
          </Nota>
        </div>
      </Cabecera>

      <Seccion
        id="pmst-y-pmus"
        titulo="Qué diferencia hay entre un PMST y un PMUS"
        intro={
          <>
            <p>
              Son planes distintos, de responsables distintos y con ámbitos
              distintos, aunque deben tenerse en cuenta entre sí.
            </p>
            <p>
              El <strong className="text-beloq-dark">plan de movilidad urbana sostenible (PMUS)</strong>{" "}
              es del municipio y abarca su territorio. La Ley 9/2025 lo llama «plan de
              movilidad sostenible de entidades locales» <Art>art. 2.1.q</Art>. La Ley
              7/2021 de cambio climático ya obligaba a adoptarlo a los municipios de
              más de 50.000 habitantes y a los territorios insulares, y a los de más
              de 20.000 cuando superan los valores límite de contaminantes{" "}
              <Art>art. 14.3 Ley 7/2021</Art>. La Ley 9/2025 añade que los municipios
              de más de 20.000 y menos de 50.000 habitantes deben dotarse de un plan
              simplificado en el plazo de un año desde su entrada en vigor, revisable
              al menos cada seis años salvo que la normativa autonómica fije otra
              periodicidad <Art href={ART.a24}>art. 24.1</Art>.
            </p>
            <p>
              El <strong className="text-beloq-dark">plan de movilidad sostenible al trabajo (PMST)</strong>{" "}
              es de la empresa o entidad pública y abarca los desplazamientos a un
              centro de trabajo. La ley lo define como el conjunto de medidas
              impulsadas por la dirección del centro y elaboradas en el marco de la
              negociación colectiva para racionalizar los desplazamientos de
              empleados, clientes, proveedores y visitantes <Art>art. 2.1.s</Art>.
            </p>
          </>
        }
      >
        <Tabla
          titulo="Comparación entre PMUS, PMST y plan de gran centro de actividad"
          columnas={["", "PMUS (entidades locales)", "PMST (centros de trabajo)", "Grandes centros de actividad"]}
          filas={[
            [
              "Quién lo hace",
              "El ayuntamiento o entidad local.",
              "La empresa o entidad del sector público, negociado con la representación de las personas trabajadoras.",
              "El gran centro de actividad que identifique la administración competente.",
            ],
            [
              "Ámbito",
              "El municipio o ámbito supramunicipal.",
              "Los desplazamientos a un centro de trabajo.",
              "Un lugar que concentra actividad y afluencia (sanitaria, educativa, comercial, de ocio…).",
            ],
            [
              "Quién está obligado",
              "Municipios de más de 50.000 habitantes (Ley 7/2021) y, con plan simplificado, los de más de 20.000 y menos de 50.000 habitantes (art. 24.1).",
              "Centros con más de 200 personas trabajadoras o 100 por turno (art. 26.1).",
              "Los que identifique la administración competente en transporte y movilidad conforme a los criterios aplicables. Los criterios que fijen los ministerios de Transportes y de Trabajo son supletorios respecto de la regulación territorial (art. 25.1).",
            ],
            [
              "Plazo",
              "Más de 50.000 habitantes: antes de 2023 (Ley 7/2021). Más de 20.000 y menos de 50.000: un año desde la entrada en vigor de la Ley 9/2025, con vencimiento general el 5 de diciembre de 2026 (art. 24.1).",
              <>
                <strong className="text-beloq-dark">5 de diciembre de 2026</strong>: plazo
                general de doce meses desde la entrada en vigor de la Ley 9/2025,
                conforme al{" "}
                <a href={ART.a26} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  artículo 26.1
                </a>{" "}
                modificado por el{" "}
                <a href={ART.rdl63} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  Real Decreto-ley 7/2026
                </a>
                . Debe comprobarse la normativa territorial aplicable.
              </>,
              "Dieciocho meses desde la publicación de esos criterios (art. 25.2).",
            ],
            [
              "Seguimiento",
              "Informe de seguimiento cada tres años (art. 24.4).",
              "Informe a los dos años de su aprobación y después cada dos años (art. 26.2).",
              "Revisión al menos cada cinco años (art. 25.2).",
            ],
          ]}
        />
        <p className="mt-6 max-w-3xl leading-relaxed text-gray-600">
          El plazo de los PMST era inicialmente de veinticuatro meses; el Real
          Decreto-ley 7/2026 lo redujo a doce <Art href={ART.rdl63}>art. 63 RDL 7/2026</Art>.
          La ley entró en vigor el 5 de diciembre de 2025, de modo que el plazo general
          vence el 5 de diciembre de 2026. El PMST debe tener en cuenta, cuando exista,
          el plan de movilidad de la entidad local donde está el centro{" "}
          <Art href={ART.a26}>art. 26.3</Art>.
        </p>
      </Seccion>

      <Seccion
        id="centro-de-trabajo"
        fondo="gris"
        titulo="Cómo se determina el ámbito del centro de trabajo"
        intro={
          <p>
            La obligación del PMST se mide por centro de trabajo, no por empresa.
            Estas son las piezas que fija la ley:
          </p>
        }
      >
        <div className="max-w-3xl">
          <ListaCheck
            items={[
              <>
                <strong className="text-beloq-dark">Qué es un centro de trabajo.</strong>{" "}
                La ley remite al Estatuto de los Trabajadores: «la unidad productiva
                con organización específica, que sea dada de alta, como tal, ante la
                autoridad laboral» <Art>art. 26.2 Ley 9/2025 y art. 1.5 ET</Art>.
              </>,
              <>
                <strong className="text-beloq-dark">Umbral.</strong> Más de 200
                personas trabajadoras o 100 por turno cuyo centro de trabajo habitual
                sea ese centro <Art href={ART.a26}>art. 26.1</Art>.
              </>,
              <>
                <strong className="text-beloq-dark">Quién está obligado.</strong> Las
                empresas y las entidades del sector público definidas en el artículo 2
                de la Ley 40/2015; la administración competente puede extenderlo a
                otras entidades públicas <Art href={ART.a26}>art. 26.1</Art>.
              </>,
              <>
                <strong className="text-beloq-dark">Centros de alta ocupación.</strong>{" "}
                Los de más de 1.000 personas trabajadoras en municipios o áreas
                metropolitanas de más de 500.000 habitantes deben incluir además,
                entre otras, medidas para reducir la movilidad en las horas punta o
                durante la jornada <Art href={ART.a26}>art. 26.5</Art>.
              </>,
              <>
                <strong className="text-beloq-dark">Varios centros en un mismo lugar.</strong>{" "}
                Se promoverán mecanismos de coordinación entre ellos para compartir
                información y soluciones <Art href={ART.a26}>art. 26.6</Art>.
              </>,
              <>
                <strong className="text-beloq-dark">Normas autonómicas y municipales.</strong>{" "}
                Lo que dice el artículo 26 se aplica de forma supletoria a lo que
                establezcan la administración competente en movilidad o la ordenación
                urbanística, según la legislación de cada comunidad autónoma{" "}
                <Art href={ART.a26}>art. 26.9</Art>.
              </>,
            ]}
          />
          <div className="mt-8">
            <Nota icono={Info} titulo="Datos, no calificación jurídica">
              <p>
                Si hay dudas sobre si un centro está obligado, la respuesta
                corresponde a la asesoría jurídica o laboral de la organización. Un
                diagnóstico aporta los datos (personas por centro y turno,
                ubicación, accesos), no la calificación jurídica.
              </p>
            </Nota>
          </div>
        </div>
      </Seccion>

      <Seccion
        id="componentes"
        titulo="Qué componentes tiene un plan de movilidad sostenible al trabajo"
        intro={
          <p>
            Según la Ley 9/2025, un PMST reúne estos elementos. Indicamos cuáles
            puede apoyar un trabajo de datos como el nuestro y cuáles no.
          </p>
        }
      >
        <Tabla
          titulo="Componentes de un PMST y papel de un informe de datos"
          columnas={["Componente", "Qué dice la ley", "Qué puede aportar un informe de datos"]}
          filas={[
            [
              "Impulso y negociación",
              "Lo impulsa la dirección del centro y se negocia con la representación legal de las personas trabajadoras; si no la hay, con una comisión negociadora en la que la parte social la forman los sindicatos más representativos y los representativos del sector. En las cooperativas lo aprueba el Consejo Rector (arts. 2.1.s y 26.2).",
              "Información común para la negociación. No sustituye la negociación.",
            ],
            [
              "Medidas",
              "Soluciones como movilidad activa, transporte colectivo, movilidad de bajas emisiones, compartida o colaborativa, uso y recarga de vehículos cero emisiones y teletrabajo cuando sea posible, según el principio de jerarquía del art. 28 (art. 26.3).",
              "Medidas candidatas priorizadas con los datos. La decisión es de la organización.",
            ],
            [
              "Seguridad vial",
              "Medidas para mejorar la seguridad vial y prevenir accidentes en los desplazamientos al centro, con formación (art. 26.3).",
              "Identificar itinerarios y accesos con problemas, si forma parte del encargo.",
            ],
            [
              "Personas que acceden al centro",
              "El plan considera también a visitantes, proveedores y cualquier persona que necesite acceder (art. 26.3).",
              "Analizar accesos y horarios de esos colectivos con datos agregados.",
            ],
            [
              "Coherencia con el municipio",
              "Tener en cuenta el plan de movilidad de la entidad local y los instrumentos de regulación de la movilidad aprobados (art. 26.3).",
              "Situar el centro en la red de transporte y en las actuaciones municipales previstas.",
            ],
            [
              "Seguimiento",
              "Informe sobre el nivel de implantación de las medidas a los dos años de la aprobación y después cada dos años (art. 26.2).",
              "Cálculo de indicadores y evaluación de las medidas aplicadas.",
            ],
            [
              "Comunicación",
              "Comunicar el plan en tres meses desde su aprobación a la autoridad que designe la comunidad autónoma, para el Espacio de Datos Integrado de Movilidad (art. 27.3).",
              "Nada: la comunicación corresponde a la organización.",
            ],
          ]}
        />
        <p className="mt-6 max-w-3xl leading-relaxed text-gray-600">
          La ley permite además que el plan contemple la compensación de la huella de
          carbono de la movilidad sobre la que no se haya podido actuar{" "}
          <Art href={ART.a26}>art. 26.3</Art>, y prevé que un reglamento pueda establecer la figura
          del gestor de movilidad <Art href={ART.a26}>art. 26.4</Art>. El Estatuto de los
          Trabajadores incluye el deber de negociar en los convenios colectivos
          medidas para promover estos planes <Art>art. 85.1 ET</Art>, aplicable a
          las comisiones negociadoras constituidas desde la entrada en vigor de la
          ley <Art>disposición transitoria primera</Art>.
        </p>
      </Seccion>

      <Seccion
        id="diagnostico-y-seguimiento"
        fondo="gris"
        titulo="Qué papel cumplen el diagnóstico y el seguimiento"
        intro={
          <>
            <p>
              La Ley 9/2025 exige seguimiento con informes periódicos, pero no fija
              un formato de diagnóstico para el PMST. Sí lo menciona para los planes
              municipales simplificados, que deben permitir «realizar un diagnóstico»{" "}
              <Art>art. 2.1.r</Art>, y la ley valenciana pide que los planes
              municipales incluyan un análisis de los parámetros esenciales de la
              movilidad y sus indicadores <Art>art. 10 Ley 6/2011</Art>.
            </p>
            <p>
              En la práctica, sin diagnóstico no hay con qué comparar: el seguimiento
              necesita una situación de partida medida con el mismo método.
            </p>
          </>
        }
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Tarjeta>
            <h3 className="text-lg font-bold text-beloq-dark">Diagnóstico</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-gray-600">
              <li>Describe cómo se llega hoy al centro o se mueve hoy el municipio.</li>
              <li>Identifica problemas de acceso, horarios y conexiones.</li>
              <li>Fija la situación de partida de los indicadores.</li>
              <li>Ayuda a elegir y priorizar medidas con datos.</li>
            </ul>
          </Tarjeta>
          <Tarjeta>
            <h3 className="text-lg font-bold text-beloq-dark">Seguimiento</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-gray-600">
              <li>Mide si las medidas se han aplicado (implantación).</li>
              <li>Mide qué ha cambiado después (efecto), con el mismo método.</li>
              <li>Alimenta los informes periódicos que pide la ley.</li>
              <li>Señala desviaciones a tiempo para corregir el plan.</li>
            </ul>
          </Tarjeta>
        </div>
        <div className="mt-8 max-w-3xl">
          <Nota icono={Info} titulo="Lo que no hace un informe de datos">
            <p>
              No sustituye la participación, la negociación, la decisión sobre las
              medidas, la designación de responsables ni la aprobación del plan, y no
              garantiza por sí solo el cumplimiento de la ley.
            </p>
          </Nota>
        </div>
      </Seccion>

      <Seccion
        id="informacion"
        titulo="Qué información necesita aportar la organización"
        intro={
          <p>
            Para el diagnóstico y el seguimiento de un PMST suele bastar con esta
            información, siempre agregada:
          </p>
        }
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <ListaCheck
            items={[
              "Ubicación de cada centro y sus accesos.",
              "Número de personas trabajadoras por centro y por turno.",
              "Horarios de entrada y salida de cada turno.",
              "Origen agregado de la plantilla (por municipio o código postal), si se dispone de él.",
              "Aparcamiento disponible: coche, bicicleta, patinete y recarga.",
              "Medidas existentes y previstas: lanzaderas, ayudas al transporte, teletrabajo.",
              "El plan anterior y sus informes, si existen.",
            ]}
          />
          <Tarjeta tono="gris">
            <h3 className="text-lg font-bold text-beloq-dark">Lo que no hace falta</h3>
            <p className="mt-2 leading-relaxed text-gray-600">
              Datos de personas concretas, domicilios exactos o archivos de nómina.
              Si el encargo incluye una encuesta, se diseña para obtener resultados
              agregados y se acuerda antes cómo se tratan los datos.
            </p>
          </Tarjeta>
        </div>
      </Seccion>

      <Seccion
        id="comunitat-valenciana"
        fondo="gris"
        titulo="Normativa territorial: Comunitat Valenciana"
        intro={
          <p>
            La Ley 6/2011, de 1 de abril, de Movilidad de la Comunitat Valenciana
            regula sus propios planes de movilidad. Los más relevantes para este
            servicio:
          </p>
        }
      >
        <Tabla
          titulo="Planes de movilidad en la Ley 6/2011 de la Comunitat Valenciana"
          columnas={["Plan", "Qué establece"]}
          filas={[
            [
              "Planes municipales (art. 10)",
              "Los municipios de más de 20.000 habitantes o capacidad residencial equivalente formulan un plan municipal de movilidad con análisis de la movilidad, objetivos e indicadores; la administración establece un sistema de seguimiento de esos indicadores y el ayuntamiento publica cada año un informe sobre el grado de avance.",
            ],
            [
              "Nuevas áreas generadoras de alta movilidad (art. 12)",
              "Determinadas implantaciones (servicios, áreas comerciales, residenciales o productivas que superan los umbrales de la ley) necesitan un plan de movilidad previo.",
            ],
            [
              "Implantaciones singulares preexistentes (art. 13)",
              "La autoridad competente en transporte puede instar a los centros implantados antes de la ley que generan niveles especialmente relevantes de movilidad a formular un plan.",
            ],
            [
              "Instalaciones productivas (art. 14)",
              "Pueden formular planes de movilidad para los desplazamientos de su personal, concertados con las asociaciones de usuarios y remitidos a la autoridad de transporte.",
            ],
            [
              "Centros de formación (art. 15)",
              "Los centros de formación secundaria o universitaria de más de 500 estudiantes dispondrán de un plan de movilidad para estudiantes y personal.",
            ],
          ]}
        />
        <p className="mt-6 max-w-3xl leading-relaxed text-gray-600">
          Si el centro está en otra comunidad autónoma, conviene revisar su normativa:
          los criterios de grandes centros de actividad y lo que dispone el artículo
          26 sobre los PMST se aplican de forma supletoria respecto a lo que
          establezcan la administración competente o la ordenación urbanística, según
          la legislación de cada comunidad <Art href={ART.a26}>arts. 25.1 y 26.9</Art>.
        </p>
      </Seccion>

      <Seccion
        id="otras-previsiones"
        titulo="Otras previsiones de la ley"
        intro={
          <p>
            Para completar el cuadro, sin entrar en su desarrollo:
          </p>
        }
      >
        <div className="max-w-3xl">
          <ListaCheck
            items={[
              <>
                <strong className="text-beloq-dark">Régimen sancionador.</strong> Es
                infracción leve no disponer del PMST en plazo o no elaborar el informe
                de seguimiento, cuando con ello se produzca un perjuicio para el
                sistema de movilidad <Art>art. 106.2</Art>. Las infracciones leves se
                sancionan con multas de 101 a 2.000 euros <Art>art. 107.2</Art>.
              </>,
              <>
                <strong className="text-beloq-dark">Subvenciones.</strong> La ley
                prevé que el Ministerio de Transportes y Movilidad Sostenible apruebe
                convocatorias para financiar PMST en empresas con centros de más de
                100 personas trabajadoras o 50 por turno{" "}
                <Art>disposición adicional vigesimoséptima</Art>. Esta guía no
                informa sobre convocatorias concretas.
              </>,
              <>
                <strong className="text-beloq-dark">Ayudas del Real Decreto-ley 7/2026.</strong>{" "}
                Las empresas obligadas a tener PMST que reciban las ayudas directas de
                ese real decreto-ley deben reintegrarlas si incumplen la obligación de
                disponer del plan <Art>art. 64 RDL 7/2026</Art>.
              </>,
              <>
                <strong className="text-beloq-dark">Registro.</strong> El Espacio de
                Datos Integrado de Movilidad incluirá un registro de planes con sus
                indicadores más relevantes <Art>arts. 24.5, 25.4 y 26.8</Art>.
              </>,
            ]}
          />
        </div>
      </Seccion>

      <Seccion id="fuentes" fondo="gris" titulo="Fuentes">
        <ol className="max-w-3xl space-y-4">
          {FUENTES.map((f) => (
            <li key={f.url} className="leading-relaxed">
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-beloq-dark underline underline-offset-4"
              >
                {f.nombre}
              </a>
              <p className="text-sm text-gray-600">{f.detalle}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-gray-600">
          Guía elaborada por beloq (Beloq Movilidad SL) a partir de los textos
          anteriores. Fecha de revisión:{" "}
          <time dateTime={REVISION_NORMATIVA.iso}>{REVISION_NORMATIVA.texto}</time>.
          Si detectas un error, escríbenos a{" "}
          <a href="mailto:info@beloq.es" className="font-bold text-beloq-dark underline underline-offset-4">
            info@beloq.es
          </a>
          .
        </p>
      </Seccion>

      <BandaCta
        titulo="Diagnóstico y seguimiento para tu plan de movilidad"
        texto={
          <p>
            Preparamos el diagnóstico de partida y los indicadores de seguimiento de
            un PMST o de un plan municipal. Cuéntanos tu caso y te enviaremos una
            propuesta.
          </p>
        }
        href={CTA}
        boton="Solicitar una propuesta de diagnóstico y seguimiento"
        secundario={{ href: `${BASE}/empresas`, label: "Movilidad al trabajo" }}
      />
    </>
  );
}
