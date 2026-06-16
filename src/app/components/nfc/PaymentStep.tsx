"use client";

import { useState } from "react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Card, PrimaryButton, Spinner } from "./ui";

// Memoiza loadStripe por clave pública (no recargar el SDK en cada render).
const stripeCache = new Map<string, Promise<Stripe | null>>();
function getStripe(pk: string): Promise<Stripe | null> {
  let p = stripeCache.get(pk);
  if (!p) {
    p = loadStripe(pk);
    stripeCache.set(pk, p);
  }
  return p;
}

export interface PaymentStepProps {
  mock: boolean;
  publishableKey: string;
  clientSecret: string;
  amountLabel: string;
  returnUrl: string;
  submitLabel: string;
  onConfirmed: (paymentIntentId: string, paymentMethodId?: string) => void;
}

/** Formulario interno: vive dentro de <Elements>, usa useStripe/useElements. */
function PaymentForm({
  amountLabel,
  returnUrl,
  submitLabel,
  onConfirmed,
}: Omit<PaymentStepProps, "mock" | "publishableKey" | "clientSecret">) {
  const stripe = useStripe();
  const elements = useElements();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay() {
    if (!stripe || !elements) return;
    setBusy(true);
    setError(null);

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: { return_url: returnUrl },
    });

    if (confirmError) {
      setError(
        confirmError.message ||
          "No se pudo procesar el pago. Revisa los datos e inténtalo de nuevo."
      );
      setBusy(false);
      return;
    }

    if (paymentIntent) {
      const pmId =
        typeof paymentIntent.payment_method === "string"
          ? paymentIntent.payment_method
          : undefined;
      onConfirmed(paymentIntent.id, pmId);
      // No reseteamos busy: el padre transiciona a 'confirming'.
      return;
    }

    // Sin paymentIntent ni error → caso de redirect (se resuelve al volver).
    setBusy(false);
  }

  return (
    <div>
      <PaymentElement options={{ layout: "tabs" }} />
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      <div className="mt-6">
        <PrimaryButton onClick={handlePay} disabled={!stripe || busy}>
          {busy ? <Spinner /> : `${submitLabel} · ${amountLabel}`}
        </PrimaryButton>
      </div>
      <p className="mt-3 text-center text-xs text-gray-400">
        Es una retención reembolsable, no un cargo. Se libera al terminar.
      </p>
    </div>
  );
}

/** Panel simulado para el modo mock (sin Stripe real). */
function MockPaymentPanel({
  amountLabel,
  submitLabel,
  onConfirmed,
}: {
  amountLabel: string;
  submitLabel: string;
  onConfirmed: (paymentIntentId: string, paymentMethodId?: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  return (
    <div>
      <div className="rounded-xl border border-dashed border-gray-300 bg-beloq-gray p-4 text-center text-sm text-gray-500">
        Panel de pago simulado (modo demo). En producción aquí aparece Apple
        Pay / Google Pay / tarjeta.
      </div>
      <div className="mt-6">
        <PrimaryButton
          onClick={() => {
            setBusy(true);
            onConfirmed("pi_mock_123", "pm_mock_123");
          }}
          disabled={busy}
        >
          {busy ? <Spinner /> : `${submitLabel} · ${amountLabel}`}
        </PrimaryButton>
      </div>
      <p className="mt-3 text-center text-xs text-gray-400">
        Es una retención reembolsable, no un cargo. Se libera al terminar.
      </p>
    </div>
  );
}

export default function PaymentStep(props: PaymentStepProps) {
  const { mock, publishableKey, clientSecret, ...rest } = props;

  return (
    <Card>
      <h2 className="mb-1 text-lg font-bold text-beloq-dark">
        Depósito reembolsable
      </h2>
      <p className="mb-5 text-sm text-gray-500">
        Autoriza el depósito para abrir el módulo. Se te devuelve íntegro al
        recoger.
      </p>

      {mock ? (
        <MockPaymentPanel
          amountLabel={rest.amountLabel}
          submitLabel={rest.submitLabel}
          onConfirmed={rest.onConfirmed}
        />
      ) : (
        <Elements
          key={clientSecret}
          stripe={getStripe(publishableKey)}
          options={{
            clientSecret,
            appearance: {
              theme: "stripe",
              variables: { colorPrimary: "#FFEC36", borderRadius: "12px" },
            },
          }}
        >
          <PaymentForm {...rest} />
        </Elements>
      )}
    </Card>
  );
}
