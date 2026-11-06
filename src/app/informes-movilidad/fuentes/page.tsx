import {
  Cabecera,
  Contenedor,
  EnlaceFlecha,
  Seccion,
  Tabla,
} from "../../components/informes/ui";
import { BASE, metadatos, solicitarHref } from "../../lib/informes";

// Texto público del encargo del 2026-11-06 (agente-movilidad), tal cual.

export const metadata = metadatos({
  titulo: "Con qué datos trabajamos: fuentes abiertas de movilidad en València | beloq",
  absoluto: true,
  descripcion:
    "Fuentes abiertas que usamos en los informes de movilidad: transporte público, bici, tráfico y aparcamiento, con frecuencia, fecha de inicio y licencia.",
  ruta: `${BASE}/fuentes`,
});

export default function FuentesPage() {
  return (
    <>
      <Cabecera
        migas={[{ label: "Con qué datos trabajamos" }]}
        titulo="Con qué datos trabajamos"
        entradilla={
          <p>
            Todos los informes se hacen con datos abiertos y sin datos personales. Cada
            dato lleva su fuente, su fecha y su licencia, y cada cifra publicada se
            contrasta con un cálculo independiente. Datos almacenados en España;
            procesamiento de IA dentro de la UE.
          </p>
        }
      />

      <Seccion id="continuo" titulo="Lo que observamos en continuo">
        <Tabla
          titulo="Fuentes observadas en continuo"
          columnas={["Qué", "Cada cuánto", "Desde", "Fuente y licencia"]}
          filas={[
            [
              "Bicis y anclajes libres en las estaciones de Valenbisi",
              "5 minutos",
              "2026-10-05",
              "Ayuntamiento de València, datos abiertos, CC BY 4.0",
            ],
            [
              "Estado del tráfico en las arterias principales",
              "3 minutos",
              "2026-11-06",
              "Ayuntamiento de València, datos abiertos, CC BY 4.0",
            ],
            [
              "Plazas libres en aparcamientos públicos",
              "3 minutos",
              "octubre de 2026",
              "Ayuntamiento de València, datos abiertos, CC BY 4.0",
            ],
            [
              "Posiciones, viajes y avisos de Cercanías",
              "1 minuto",
              "octubre de 2026",
              "Renfe, datos abiertos, CC BY 4.0",
            ],
            [
              "Espiras de tráfico, ocupaciones de la vía pública e incidencias de la DGT",
              "de 15 minutos a 6 horas",
              "octubre de 2026",
              "Ayuntamiento de València y DGT, datos abiertos",
            ],
            [
              "Contadores de bicicletas",
              "según publicación",
              "2026-10-05",
              "Ayuntamiento de València, datos abiertos (provisionales)",
            ],
          ]}
        />
      </Seccion>

      <Seccion
        id="horarios"
        fondo="gris"
        titulo="Horarios programados"
        intro={
          <p>
            GTFS de EMT, Metrovalencia, Cercanías y autobuses interurbanos de la
            Generalitat, con cada versión fechada y el calendario de servicio por día.
            Horarios publicados por otros operadores se citan con su fuente y fecha y no
            se redistribuyen.
          </p>
        }
      />

      <Seccion
        id="inventarios"
        titulo="Inventarios"
        intro={
          <p>
            Aparcabicis, red ciclista municipal y red ciclista de la Comunitat (XINM),
            paradas de EMT, estaciones y bocas de metro, estaciones de Cercanías, barrios
            y distritos, y las estaciones beloq. Todos georreferenciados y con fecha de
            descarga.
          </p>
        }
      />

      <Seccion
        id="historicas"
        fondo="gris"
        titulo="Series históricas"
        intro={
          <p>
            Viajeros de EMT por día desde 2014, bicicletas en el anillo ciclista desde
            2017, vehículos en los accesos a la ciudad desde 2012, aforos diarios de
            carreteras de la Generalitat desde 2023 y viajeros mensuales de metro y
            autobús urbano del INE desde 2000.
          </p>
        }
      />

      <Seccion
        id="no-usamos"
        titulo="Lo que no usamos"
        intro={
          <p>
            Datos personales de ningún tipo; posiciones individuales de personas;
            fuentes sin licencia de reutilización para trabajos que se entregan fuera.
            Si un cliente aporta datos propios, se tratan agregados y según lo acordado.
          </p>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-8">
          <EnlaceFlecha href={`${BASE}/metodologia`}>Cómo lo hacemos</EnlaceFlecha>
          <EnlaceFlecha href={solicitarHref({ origen: "fuentes" })}>
            Solicitar un informe
          </EnlaceFlecha>
        </div>
      </Seccion>

      <section className="bg-white pb-4">
        <Contenedor>
          <p className="text-sm text-gray-600">
            Contenido revisado el <time dateTime="2026-11-06">2026-11-06</time>.
          </p>
        </Contenedor>
      </section>
    </>
  );
}
