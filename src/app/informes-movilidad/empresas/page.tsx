import {
  Bike,
  Bus,
  Clock,
  Gauge,
  Handshake,
  ListChecks,
  ShieldCheck,
  Users,
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
  titulo: "Diagnóstico y seguimiento de movilidad al trabajo",
  descripcion:
    "Para RRHH, PRL, sostenibilidad y responsables de centro: acceso al centro según turnos, transporte público y última etapa, bici y aparcamiento seguro, priorización de medidas e indicadores para el plan de movilidad sostenible al trabajo (PMST).",
  ruta: `${BASE}/empresas`,
});

const CTA = solicitarHref({ tipo: "empresa", origen: "empresas" });

const ANALISIS = [
  {
    icono: Clock,
    titulo: "Acceso al centro según turnos",
    texto:
      "Qué alternativas permiten llegar antes de cada entrada y volver después de cada salida, también en turnos de madrugada, noche y fin de semana.",
  },
  {
    icono: Bus,
    titulo: "Transporte público y última etapa",
    texto:
      "Paradas y estaciones que sirven al centro, frecuencia por franja, márgenes de transbordo y el tramo final a pie, en bici o en patinete hasta la puerta.",
  },
  {
    icono: Bike,
    titulo: "Alternativas ciclistas y aparcamiento seguro",
    texto:
      "Itinerarios ciclistas de acceso, bicicleta compartida cercana y capacidad de aparcamiento para bicis y patinetes, convencional o seguro.",
  },
  {
    icono: Users,
    titulo: "Orígenes agregados y encuestas",
    texto:
      "Cuando forman parte del encargo: de qué municipios o zonas viene la plantilla, en cifras agregadas, y qué responde en una encuesta de movilidad.",
  },
  {
    icono: ListChecks,
    titulo: "Priorización de medidas",
    texto:
      "Medidas candidatas ordenadas según el problema que resuelven, a cuántas personas afectan y quién puede aplicarlas: la empresa, el operador o la administración.",
  },
  {
    icono: Gauge,
    titulo: "Indicadores para su seguimiento",
    texto:
      "Indicadores definidos desde el principio, con su fuente y periodicidad, para medir la implantación de las medidas y lo que cambia después.",
  },
];

export default function EmpresasPage() {
  return (
    <>
      <Cabecera
        migas={[{ label: "Empresas y centros de trabajo" }]}
        titulo="Diagnóstico y seguimiento de movilidad al trabajo"
        entradilla={
          <p>
            Para RRHH, prevención de riesgos laborales, sostenibilidad, operaciones
            y responsables de centro: cómo puede llegar la plantilla a cada centro
            según su turno, qué alternativas al coche existen de verdad y qué
            indicadores conviene seguir.
          </p>
        }
        acciones={
          <>
            <Boton href={CTA}>Analizar la movilidad de mi centro</Boton>
            <Boton href={`${BASE}/ejemplo`} variante="borde">
              Ver un ejemplo de informe
            </Boton>
          </>
        }
        indice={[
          { href: "#que-analizamos", label: "Qué analizamos" },
          { href: "#pmst", label: "Relación con el PMST" },
          { href: "#que-aporta-la-empresa", label: "Qué aporta la empresa" },
          { href: "#consultoras", label: "Consultoras y despachos" },
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
        id="pmst"
        fondo="gris"
        titulo="Relación con el plan de movilidad sostenible al trabajo (PMST)"
        intro={
          <>
            <p>
              La Ley 9/2025 de Movilidad Sostenible obliga a las empresas y entidades
              del sector público a disponer de un plan de movilidad sostenible al
              trabajo en los centros con más de 200 personas trabajadoras o 100 por
              turno, y a elaborar informes de seguimiento de su implantación. El
              plan se negocia con la representación legal de las personas
              trabajadoras.
            </p>
            <p>
              El plazo general para disponer del plan vence el{" "}
              <strong className="text-beloq-dark">5 de diciembre de 2026</strong>, doce
              meses después de la entrada en vigor de la ley; debe comprobarse la
              normativa territorial aplicable. Lo que vence es la obligación de tener
              el plan: sus medidas se implantan después y se siguen con un primer
              informe a los dos años de su aprobación.
            </p>
            <p>
              Nuestro trabajo cubre la parte de datos de ese plan: el diagnóstico de
              partida y el seguimiento de indicadores. El resto del plan corresponde a
              la organización.
            </p>
          </>
        }
      >
        <Tabla
          titulo="Qué aporta el diagnóstico y qué corresponde a la organización"
          columnas={["Parte del plan", "Qué aportamos", "Qué corresponde a la organización"]}
          filas={[
            [
              "Diagnóstico",
              "Accesibilidad del centro por turno, alternativas disponibles, aparcamiento e indicadores de partida.",
              "Facilitar los datos agregados del centro y validar el diagnóstico.",
            ],
            [
              "Participación",
              "Si se encarga, diseño y análisis de una encuesta con resultados agregados.",
              "Organizar la participación de la plantilla.",
            ],
            [
              "Negociación",
              "Datos y escenarios para que las partes negocien con la misma información.",
              "Negociar el plan con la representación legal de las personas trabajadoras o la comisión negociadora.",
            ],
            [
              "Medidas",
              "Medidas candidatas priorizadas y justificadas con los datos.",
              "Decidir qué medidas se adoptan y con qué recursos.",
            ],
            [
              "Responsables",
              "—",
              "Designar quién impulsa cada medida y, en su caso, la persona gestora de movilidad.",
            ],
            [
              "Aprobación",
              "—",
              "Aprobar el plan y comunicarlo a la autoridad que designe la comunidad autónoma.",
            ],
            [
              "Seguimiento",
              "Cálculo de los indicadores y evaluación de las medidas aplicadas.",
              "Elaborar los informes de seguimiento que exige la ley con esos datos.",
            ],
          ]}
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Nota icono={ShieldCheck} titulo="Un informe de datos no es el plan">
            <p>
              Un diagnóstico, por completo que sea, no garantiza por sí solo el
              cumplimiento de la Ley 9/2025. Sirve para que el plan se apoye en datos
              y para medir después si las medidas funcionan.
            </p>
          </Nota>
          <Tarjeta className="flex flex-col justify-center">
            <p className="text-gray-600">
              Qué dice la ley sobre ámbito, plazos, componentes y seguimiento, con
              sus artículos:
            </p>
            <div className="mt-3">
              <EnlaceFlecha href={`${BASE}/ley-movilidad-sostenible`}>
                Guía de la Ley de Movilidad Sostenible
              </EnlaceFlecha>
            </div>
          </Tarjeta>
        </div>
      </Seccion>

      <Seccion
        id="que-aporta-la-empresa"
        titulo="Qué puede aportar la empresa"
        intro={
          <p>
            Con esta información el diagnóstico se ajusta al centro real. Todo en
            cifras agregadas: no pedimos datos de personas concretas ni archivos de
            nómina.
          </p>
        }
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <ListaCheck
            items={[
              <>
                <strong className="text-beloq-dark">Ubicación del centro</strong> y
                sus accesos: entradas de personas, vehículos y bicicletas.
              </>,
              <>
                <strong className="text-beloq-dark">Horarios</strong> de entrada y
                salida de cada turno y días en que se trabaja.
              </>,
              <>
                <strong className="text-beloq-dark">Población agregada</strong>:
                cuántas personas hay por turno y, si se dispone de ello, de qué
                municipios o zonas vienen.
              </>,
              <>
                <strong className="text-beloq-dark">Aparcamiento</strong>: plazas
                de coche, bicicleta y patinete, puntos de recarga y su ocupación
                habitual.
              </>,
              <>
                <strong className="text-beloq-dark">Actuaciones previstas</strong>:
                traslados, cambios de horario, lanzaderas, ayudas al transporte o
                ampliaciones.
              </>,
            ]}
          />
          <Tarjeta tono="gris">
            <h3 className="text-lg font-bold text-beloq-dark">Varios centros o turnos</h3>
            <p className="mt-2 leading-relaxed text-gray-600">
              Si la empresa tiene varios centros, el análisis puede hacerse por centro
              y compararlos entre sí. Los turnos se analizan por separado, porque la
              oferta de transporte a las 6:00 no tiene nada que ver con la de las
              9:00.
            </p>
            <p className="mt-3 leading-relaxed text-gray-600">
              En el formulario puedes indicar el número de centros y los turnos; con
              eso basta para preparar la propuesta.
            </p>
          </Tarjeta>
        </div>
      </Seccion>

      <Seccion
        id="consultoras"
        fondo="gris"
        titulo="Para consultoras y despachos"
        intro={
          <>
            <p>
              Si redactas planes de movilidad al trabajo o asesoras a empresas,
              podemos aportar el análisis de accesibilidad, los indicadores y su
              procedencia para que los incorpores a tu proyecto.
            </p>
            <p>
              Tú mantienes la relación con el cliente y la redacción del plan.
              Nosotros documentamos fuentes, fechas y métodos para que el trabajo se
              pueda revisar y repetir.
            </p>
          </>
        }
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            "Tablas e indicadores trazables, con fuente y fecha de cada dato.",
            "Mapas y gráficos listos para integrar en tu documento.",
            "Nota metodológica y revisión conjunta de resultados.",
          ].map((t) => (
            <Tarjeta key={t} className="font-bold leading-snug text-beloq-dark">
              {t}
            </Tarjeta>
          ))}
        </div>
        <div className="mt-8">
          <Boton
            href={solicitarHref({
              tipo: "consultora",
              servicio: "consultoras",
              origen: "consultoras",
            })}
            variante="borde"
          >
            <Handshake aria-hidden className="h-5 w-5" />
            Proponer una colaboración
          </Boton>
        </div>
      </Seccion>

      <BandaCta
        titulo="¿Cómo llega hoy tu plantilla al centro?"
        texto={
          <p>
            Indícanos la ubicación, los turnos y qué necesitas decidir. Te
            enviaremos una propuesta con alcance, entregables, calendario y
            presupuesto.
          </p>
        }
        href={CTA}
        boton="Analizar la movilidad de mi centro"
        secundario={{
          href: `${BASE}/ley-movilidad-sostenible`,
          label: "Leer la guía de la ley",
        }}
      />
    </>
  );
}
