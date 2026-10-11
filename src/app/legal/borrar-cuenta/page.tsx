import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "../../components/LegalPage";

// Google Play la exige (Seguridad de los datos → URL para eliminar la cuenta):
// se tiene que poder pedir sin la app. Texto de BELOQ_INFO §8.1.
export const metadata: Metadata = {
  title: "Borrar tu cuenta · beloq",
  description:
    "Cómo borrar tu cuenta de la app beloq, con o sin la app, y qué datos se borran y cuáles se conservan.",
};

export default function BorrarCuenta() {
  return (
    <LegalPage title="Borrar tu cuenta de beloq" date="11 de octubre de 2026">
      <p>
        Esta página es de la app <strong>beloq</strong>, de Beloq Movilidad SL.
      </p>

      <p>
        <strong>Desde la app:</strong> «Tu cuenta» → «Eliminar mi cuenta».
      </p>

      <p>
        <strong>Sin la app:</strong> escríbenos a{" "}
        <a href="mailto:dpo@beloq.es">dpo@beloq.es</a> desde el correo de tu
        cuenta, o por el chat de <Link href="/info#chat">beloq.es/info</Link>{" "}
        indicando el móvil de tu cuenta. Lo hacemos en un máximo de un mes y te
        avisamos al terminar.
      </p>

      <p>
        <strong>Qué se borra, en el momento y sin vuelta atrás:</strong> tus
        datos personales (se anonimizan), tus tarjetas guardadas y tu cliente de
        Stripe, tu ubicación guardada y tus reservas. Tus passkeys dejan de
        valer. El abono que tengas se pierde, salvo que estés en el plazo de
        desistimiento.
      </p>

      <p>
        <strong>Qué se conserva:</strong>
      </p>
      <ul>
        <li>tus pagos, 10 años, por obligación fiscal;</li>
        <li>
          si tienes una deuda pendiente, el hash de tu móvil, hasta que la
          pagues;
        </li>
        <li>
          si canjeaste un código de prueba o de invitación, el hash de tu móvil,
          para que no se repitan;
        </li>
        <li>los registros de tus consentimientos, 5 años.</li>
      </ul>

      <p>
        No se puede borrar la cuenta con un vehículo dentro de un beloq:
        retíralo primero.
      </p>

      <p>
        Más detalles en la{" "}
        <Link href="/legal/privacidad">Política de privacidad</Link>, apartado
        «Eliminación de la cuenta».
      </p>
    </LegalPage>
  );
}
