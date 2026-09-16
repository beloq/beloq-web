// Bloque "Tarifas vigentes" (server component). Fuente única de precios:
// GET /pricing/public del backend. Nunca cablear cifras a mano (L2 / §4).

interface PricingResponse {
  pricing_version?: string;
  currency: string;
  vat_included: boolean;
  deposit: { amount_cents: number };
  usage: { penalty_per_hour_eur: number };
  plans: {
    id: string;
    name: string;
    price_cents: number;
    duration_days: number | null;
  }[];
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

function euros(cents: number, currency: string): string {
  try {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: currency || "EUR",
      minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    }).format(cents / 100);
  } catch {
    return `${(cents / 100).toFixed(2)} ${currency || "EUR"}`;
  }
}

async function getPricing(): Promise<PricingResponse | null> {
  if (!API_BASE) return null;
  try {
    const res = await fetch(`${API_BASE}/pricing/public`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return (await res.json()) as PricingResponse;
  } catch {
    return null;
  }
}

/**
 * Renderiza el bloque de tarifas leyendo del endpoint público. Si el endpoint
 * no responde (o no hay API_BASE en build), muestra un texto de reserva sin
 * cifras cableadas. Cacheado por ISR (revalidate 300 s).
 */
export default async function PricingTable() {
  const data = await getPricing();

  if (!data) {
    return (
      <>
        <h2>Tarifas vigentes</h2>
        <p>
          Las tarifas vigentes (depósito, tarifa por hora y abonos) se muestran
          siempre de forma actualizada en la app antes de contratar.
        </p>
      </>
    );
  }

  const perHour = data.usage.penalty_per_hour_eur.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
  });

  return (
    <>
      <h2>Tarifas vigentes</h2>
      <p>
        Depósito reembolsable:{" "}
        <strong>{euros(data.deposit.amount_cents, data.currency)}</strong> — se
        retiene al abrir y se devuelve íntegro al terminar. Tarifa de uso, una
        vez agotadas las horas incluidas: <strong>{perHour} €/hora</strong>.{" "}
        {data.vat_included ? "IVA incluido." : "IVA no incluido."}
      </p>
      <table>
        <thead>
          <tr>
            <td>
              <strong>Plan</strong>
            </td>
            <td>
              <strong>Precio</strong>
            </td>
            <td>
              <strong>Duración</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {data.plans.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>
                {p.price_cents === 0
                  ? "Gratis"
                  : euros(p.price_cents, data.currency)}
              </td>
              <td>{p.duration_days ? `${p.duration_days} días` : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Beloquer Flow y Beloquer Max son abonos mensuales de aparcamiento
        físico, de pago único y sin renovación automática.
      </p>
    </>
  );
}
