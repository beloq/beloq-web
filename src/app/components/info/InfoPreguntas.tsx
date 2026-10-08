import type { ReactNode } from "react";
import { euros, eurosFromCents, type PublicPricing } from "../../lib/info";

interface Pregunta {
  q: string;
  a: ReactNode;
}

// Nombres de los planes para la web (BELOQ_INFO §2.1).
const PLANES = {
  freemium: "Beloquer",
  urban: "Beloquer Flow",
  special: "Beloquer Max",
} as const;

/**
 * Textos de BELOQ_INFO §4. Las cifras entre llaves del documento salen de
 * /pricing/public; si falta alguna, esa pregunta no se pinta (nunca una cifra
 * escrita a mano).
 */
function preguntas(p: PublicPricing | null): Pregunta[] {
  const tarifa = p ? euros(p.usage.penalty_per_hour_eur, p.currency) : null;
  const deposito = p ? eurosFromCents(p.deposit.amount_cents, p.currency) : null;
  const plan = (id: keyof typeof PLANES) => p?.plans.find((x) => x.id === id);
  const beloquer = plan("freemium");
  const flow = plan("urban");
  const max = plan("special");
  const gratis = p?.free_time;
  const precios =
    p &&
    gratis &&
    beloquer?.free_hours != null &&
    flow?.free_hours != null &&
    max?.free_hours != null
      ? {
          // «03:00» → «3:00»
          inicioDia: gratis.day_starts_at.replace(/^0/, ""),
          horasBeloquer: beloquer.free_hours,
          precioFlow: eurosFromCents(flow.price_cents, p.currency),
          horasFlow: flow.free_hours,
          precioMax: eurosFromCents(max.price_cents, p.currency),
          horasMax: max.free_hours,
          tiempoExtra: p.usage.extra_time_billing === true,
        }
      : null;

  const lista: (Pregunta | null)[] = [
    {
      q: "¿Qué es beloq?",
      a: (
        <p>
          Un aparcamiento en la calle para tu bici o tu patinete. Lo abres con el
          móvil y tu huella, lo dejas anclado y beloq lo guarda hasta que vuelvas.
        </p>
      ),
    },
    {
      q: "¿Cómo aparco?",
      a: (
        <ol className="list-decimal space-y-2 pl-5">
          <li>Acércate a un beloq libre y ábrelo desde la app con tu huella.</li>
          <li>
            Sube la barra, mete tu bici o patinete y baja la barra con firmeza
            hasta oír <strong>el clic y el doble pitido</strong>: ya está anclado.
          </li>
          <li>
            Para irte, desbloquéalo con tu huella, saca tu vehículo y vuelve a
            bajar la barra hasta oír el clic.
          </li>
        </ol>
      ),
    },
    {
      q: "¿Cómo abro un beloq?",
      a: (
        <p>
          Con la app, junto a la estación: pulsa DESBLOQUEAR en la estación, pasa
          el móvil por la etiqueta del beloq o lee su QR. Te pedirá tu huella o tu
          cara. Antes de abrirse, el beloq pita dos veces y parpadea, para que
          sepas cuál es el tuyo.
        </p>
      ),
    },
    tarifa
      ? {
          q: "¿Cuánto tiempo tengo para dejarlo anclado?",
          a: (
            <p>
              5 minutos desde que se abre. Si pasa un minuto sin anclar, el beloq
              pita y te avisamos en el móvil cada minuto. Pasados los 5 minutos se
              cobran {tarifa} por hora hasta que la barra quede anclada.
            </p>
          ),
        }
      : null,
    {
      q: "¿Y al retirarlo?",
      a: (
        <p>
          Desbloquea con tu huella desde la app, saca tu vehículo y vuelve a bajar
          la barra hasta oír el clic. También tienes 5 minutos; pasado ese tiempo,
          se cobra igual hasta que quede anclada.
        </p>
      ),
    },
    precios
      ? {
          q: "¿Cuánto cuesta?",
          a: (
            <>
              <p>
                Cada día tienes un tiempo gratis según tu plan, que empieza de
                nuevo a las {precios.inicioDia}:
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  <strong>{PLANES.freemium}</strong>, gratis,{" "}
                  {precios.horasBeloquer} h al día.
                </li>
                <li>
                  <strong>{PLANES.urban}</strong>, {precios.precioFlow} al mes,{" "}
                  {precios.horasFlow} h al día y reserva.
                </li>
                <li>
                  <strong>{PLANES.special}</strong>, {precios.precioMax} al mes,{" "}
                  {precios.horasMax} h al día.
                </li>
              </ul>
              {precios.tiempoExtra && (
                <p>
                  El tiempo que pase de tu tiempo gratis se cobra a {tarifa} por
                  hora, por minuto, y se carga al retirar tu vehículo.
                </p>
              )}
            </>
          ),
        }
      : null,
    gratis
      ? {
          q: "¿Puedo tener más tiempo gratis?",
          a: (
            <p>
              Sí: con tu vehículo dentro, cada anuncio que veas en la app te suma{" "}
              {gratis.ad_minutes} minutos, hasta {gratis.ads_per_day} al día. Si ya
              se estaba cobrando tiempo extra, el anuncio lo pausa.
            </p>
          ),
        }
      : null,
    {
      q: "¿Puedo reservar un beloq?",
      a: (
        <p>
          Con Beloquer Flow y Beloquer Max: lo reservas desde el mapa y tienes 15
          minutos para llegar.
        </p>
      ),
    },
    {
      q: "¿Qué pasa si el beloq entra en mantenimiento con mi vehículo dentro?",
      a: (
        <p>
          Tu vehículo sigue dentro y seguro. Mientras dure no podrás
          desbloquearlo, tu tiempo gratis se para y te avisamos en cuanto puedas
          retirarlo.
        </p>
      ),
    },
    {
      q: "¿Y si el beloq se queda sin señal?",
      a: (
        <p>
          Tu vehículo sigue dentro. Hasta que recupere la señal no se puede
          desbloquear; en la app lo verás indicado. Si te urge, escríbenos por el{" "}
          <a href="#chat" className="font-bold text-beloq-dark underline">
            chat
          </a>
          .
        </p>
      ),
    },
    {
      q: "Tengo una deuda: ¿qué pasa?",
      a: (
        <p>
          Lo que se cobra por dejar la barra abierta o por el tiempo extra se suma
          a tu deuda. Cuando llega a 5 €, tienes que pagarla desde la app para
          volver a abrir un beloq. Tu vehículo nunca se queda dentro por deber
          dinero.
        </p>
      ),
    },
    deposito
      ? {
          q: "No tengo la app: ¿puedo usar beloq?",
          a: (
            <p>
              Sí: pasa el móvil por la etiqueta del beloq. Se abre una web y se
              hace una retención de {deposito} en tu tarjeta, que se libera al
              terminar. Se cobra si no anclas tu vehículo en 5 minutos, si dejas
              la barra abierta al retirarlo o si pasan 3 horas sin recogerlo.
            </p>
          ),
        }
      : null,
    {
      q: "¿beloq se hace responsable de mi vehículo?",
      a: (
        <p>
          Sí, mientras está anclado: desde que la barra hace clic y suena el doble
          pitido hasta que la desbloqueas para retirarlo. Si la barra no llega a
          anclarse, la custodia no empieza.
        </p>
      ),
    },
    {
      q: "Algo no funciona: ¿qué hago?",
      a: (
        <p>
          En la app, el botón de reportar de la pantalla del beloq avisa al equipo
          con tu beloq ya identificado. También puedes escribirnos en el{" "}
          <a href="#chat" className="font-bold text-beloq-dark underline">
            chat de esta página
          </a>{" "}
          o a{" "}
          <a
            href="mailto:info@beloq.es"
            className="font-bold text-beloq-dark underline"
          >
            info@beloq.es
          </a>
          .
        </p>
      ),
    },
    {
      q: "¿Necesito una cuenta?",
      a: (
        <p>
          Para usar la app, sí: con Google, Apple o tu correo, y tu número de
          móvil. Tienes que tener al menos 14 años y solo puedes tener una cuenta.
        </p>
      ),
    },
    {
      q: "¿Por qué me pide la huella?",
      a: (
        <p>
          Tu móvil es la llave de tu beloq: con tu huella o tu cara, solo tú puedes
          abrirlo y retirar tu vehículo.
        </p>
      ),
    },
  ];

  return lista.filter((x): x is Pregunta => x !== null);
}

/** BELOQ_INFO §3.4: acordeón nativo (sin JavaScript). */
export default function InfoPreguntas({ pricing }: { pricing: PublicPricing | null }) {
  return (
    <section id="preguntas" className="scroll-mt-20 bg-beloq-gray py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-2xl font-bold text-beloq-dark sm:text-3xl">
          Preguntas frecuentes
        </h2>
        <div className="mt-6 space-y-3">
          {preguntas(pricing).map((item) => (
            <details
              key={item.q}
              className="group rounded-[0_24px_0_24px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 font-bold text-beloq-dark [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="shrink-0 text-2xl leading-none transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="space-y-3 px-4 pb-5 leading-relaxed text-gray-700">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
