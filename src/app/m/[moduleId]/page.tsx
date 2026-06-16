import NfcFlow from "../../components/nfc/NfcFlow";

type SP = { [key: string]: string | string[] | undefined };

function one(v: string | string[] | undefined): string | null {
  if (Array.isArray(v)) return v[0] ?? null;
  return v ?? null;
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

  return (
    <NfcFlow
      moduleId={moduleId}
      u={one(sp.u)}
      c={one(sp.c)}
      paymentIntent={one(sp.payment_intent)}
      redirectStatus={one(sp.redirect_status)}
      mockParam={one(sp.mock)}
    />
  );
}
