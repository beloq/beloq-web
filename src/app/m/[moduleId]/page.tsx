import NfcFlow from "../../components/nfc/NfcFlow";

type SP = { [key: string]: string | string[] | undefined };

function one(v: string | string[] | undefined): string | null {
  if (Array.isArray(v)) return v[0] ?? null;
  return v ?? null;
}

/**
 * El tag NTAG213 emite UID y contador juntos separados por una 'x':
 *   ?u=<14hex>x<6hex>
 * Si 'u' contiene una 'x', partimos por la primera: antes = UID (u),
 * después = contador (c). El hex no contiene 'x', así que es seguro.
 * Si no hay 'x' (URL manual con &c= aparte), se usan u y c tal cual.
 * No se normaliza el case del UID.
 */
function splitUidCounter(
  rawU: string | null,
  rawC: string | null
): { u: string | null; c: string | null } {
  if (rawU && rawU.includes("x")) {
    const i = rawU.indexOf("x");
    return { u: rawU.slice(0, i), c: rawU.slice(i + 1) };
  }
  return { u: rawU, c: rawC };
}

export default async function ModulePage({
  params,
  searchParams,
}: {
  params: Promise<{ moduleId: string }>;
  searchParams: Promise<SP>;
}) {
  const { moduleId } = await params;
  const sp = await searchParams;

  const { u, c } = splitUidCounter(one(sp.u), one(sp.c));

  return (
    <NfcFlow
      moduleId={moduleId}
      u={u}
      c={c}
      paymentIntent={one(sp.payment_intent)}
      redirectStatus={one(sp.redirect_status)}
      mockParam={one(sp.mock)}
    />
  );
}
