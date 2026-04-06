import LegalPage from "../../components/LegalPage";
import Link from "next/link";

export const metadata = {
  title: "Términos y Condiciones - Beloq",
  description: "Términos y condiciones de uso de beloq — BELOQ Movilidad S.L.",
};

export default function TerminosCondiciones() {
  return (
    <LegalPage title="Términos y Condiciones de Uso" version="1.0" date="6 de abril de 2026">
      <h2>1. Aceptación de los Términos</h2>
      <p>Estos Términos y Condiciones regulan el uso de la aplicación móvil beloq (disponible en iOS y Android) y de la plataforma web beloq.es (en adelante, &quot;el Servicio&quot;). Al registrarte, acceder o utilizar el Servicio, aceptas estos Términos en su totalidad.</p>
      <p>El Servicio es titularidad de <strong>BELOQ Movilidad S.L.</strong>, con CIF B24990814 y domicilio social en Calle Joan Verdeguer 116, 4.º, Valencia, España.</p>

      <h2>2. Descripción del Servicio</h2>
      <p>beloq es un sistema de estacionamiento inteligente para bicicletas y vehículos de movilidad personal (VMP) que funciona mediante módulos electromecánicos IoT gestionados a través de una aplicación móvil.</p>
      <p>beloq opera bajo un modelo B2B2C: beloq proporciona la infraestructura a operadores e instituciones, que son quienes ofrecen el servicio de aparcamiento a los usuarios finales.</p>

      <h2>3. Planes y modelo de uso</h2>
      <p><strong>Plan Gratuito (Freemium):</strong> Incluye un número limitado de horas de uso diarias sin coste. Tras agotar las horas gratuitas, se aplica la tarifa vigente definida por el operador. El usuario puede ganar horas adicionales mediante anuncios, encuestas o promociones.</p>
      <p><strong>Planes Premium (Urban beloquer y Special beloquer):</strong> Incluyen más horas, reserva anticipada, prioridad de acceso y funcionalidades futuras como recarga de vehículos eléctricos.</p>

      <h2>4. Registro y cuenta de usuario</h2>
      <h3>4.1 Requisitos</h3>
      <p>Debes tener al menos <strong>14 años</strong>. Cada persona puede tener una única cuenta. Está prohibido crear cuentas múltiples o compartir credenciales.</p>
      <h3>4.2 Consentimientos en el registro</h3>
      <ul>
        <li>Aceptación de estos Términos y Condiciones (obligatorio).</li>
        <li>Confirmación de lectura de la <Link href="/legal/privacidad">Política de Privacidad</Link> (obligatorio).</li>
        <li>Recepción de comunicaciones comerciales (opcional).</li>
      </ul>
      <h3>4.3 Gestión y eliminación de cuenta</h3>
      <p>Puedes modificar tus datos desde &quot;Ajustes&quot;. Para eliminar tu cuenta: Ajustes → &quot;Eliminar mi cuenta&quot;. La eliminación no cancela deudas pendientes.</p>

      <h2>5. Uso del Servicio</h2>
      <h3>5.1 Proceso de estacionamiento</h3>
      <ul>
        <li><strong>Desbloqueo:</strong> Selecciona un módulo y desbloquéalo escaneando el QR o desde el mapa.</li>
        <li><strong>Estacionamiento:</strong> Inserta la rueda en el módulo y espera al cierre (LED verde + señal sonora).</li>
        <li><strong>Confirmación:</strong> Fotografía tu vehículo para generar evidencia (60 segundos).</li>
        <li><strong>Recogida:</strong> Desbloquea desde la app y retira tu vehículo.</li>
      </ul>

      <h2>6. Tarifas y pagos</h2>
      <p>Las tarifas son establecidas por cada operador y se muestran en la app antes de cada sesión. Todos los precios incluyen IVA. Los pagos se procesan a través de <strong>Stripe</strong> (certificado PCI-DSS). beloq no almacena datos de tu tarjeta.</p>
      <h3>Reembolsos</h3>
      <p>Puedes solicitar un reembolso por módulo defectuoso, error del sistema o penalización por fallo técnico. Contacta con info@beloq.es. Plazo de resolución: 7 días laborables.</p>

      <h2>7. Penalizaciones</h2>
      <p>Si dejas un módulo desbloqueado sin vehículo durante más de 60 segundos, se aplicará una penalización. Puedes disputarla enviando evidencia a info@beloq.es.</p>

      <h2>8. Responsabilidad por robo o daños</h2>
      <h3>8.1 Cuándo beloq es responsable</h3>
      <p>beloq asume responsabilidad siempre que hayas completado correctamente el proceso de confirmación (foto + anclaje correcto + &quot;Parking confirmado&quot;). La cobertura se gestiona a través de la póliza de Responsabilidad Civil de beloq.</p>
      <h3>8.2 Cuándo beloq NO es responsable</h3>
      <p>Si no completaste la confirmación, si el incidente ocurrió fuera del periodo de custodia, en casos de fuerza mayor, o por negligencia del usuario.</p>

      <h2>9. Prohibiciones</h2>
      <ul>
        <li>Estacionar vehículos ajenos sin autorización.</li>
        <li>Dejar módulos desbloqueados sin vehículo (+60 seg).</li>
        <li>Uso comercial sin contrato B2B.</li>
        <li>Manipular hardware o firmware de los módulos.</li>
        <li>Ingeniería inversa sobre software, API o protocolos.</li>
        <li>Automatizar el uso mediante bots o scripts.</li>
        <li>Crear cuentas múltiples o compartir credenciales.</li>
      </ul>

      <h2>10. Suspensión y terminación de cuenta</h2>
      <p><strong>Suspensión automática:</strong> Por deuda acumulada o chargeback.</p>
      <p><strong>Suspensión por revisión:</strong> Penalizaciones acumuladas, vandalismo o reclamaciones fraudulentas.</p>
      <p><strong>Terminación definitiva:</strong> Vandalismo comprobado, hackeo o impago reiterado (3 intentos + 30 días). En todos los casos dispones de 7 días para presentar alegaciones.</p>

      <h2>11. Disponibilidad del Servicio</h2>
      <p>beloq trabaja para ofrecer disponibilidad 24/7 pero no garantiza un porcentaje específico. Para emergencias (vehículo bloqueado), desbloqueo remoto en menos de 15 minutos. Soporte: info@beloq.es.</p>

      <h2>12. Propiedad intelectual</h2>
      <p>Todo el software, diseño industrial, contenido y la marca &quot;beloq&quot; son propiedad exclusiva de BELOQ Movilidad S.L. Las fotografías que tomes siguen siendo tuyas; concedes a beloq una licencia limitada para verificación y reclamaciones. Las fotos se eliminan a los 90 días.</p>

      <h2>13. Protección de datos</h2>
      <p>Consulta nuestra <Link href="/legal/privacidad">Política de Privacidad</Link>, el <Link href="/legal/aviso-legal">Aviso Legal</Link> y la <Link href="/legal/cookies">Política de Cookies</Link>.</p>

      <h2>14. Servicios de terceros</h2>
      <ul>
        <li><strong>Google Maps Platform:</strong> Visualización de estaciones y geolocalización.</li>
        <li><strong>Stripe:</strong> Procesamiento seguro de pagos.</li>
        <li><strong>Firebase (Google):</strong> Autenticación, almacenamiento y notificaciones push.</li>
      </ul>

      <h2>15. Modificación de los Términos</h2>
      <p>Te notificaremos cambios con 30 días de antelación. Los cambios sustanciales requieren tu aceptación explícita.</p>

      <h2>16. Ley aplicable y jurisdicción</h2>
      <p>Legislación española. Juzgados y Tribunales de Valencia, sin perjuicio del derecho de los consumidores a acudir a los tribunales de su domicilio.</p>

      <h2>17. Resolución de disputas</h2>
      <p>Contacta con <strong>info@beloq.es</strong>. Si no estás satisfecho, puedes acudir a la OMIC Valencia, la Plataforma de Resolución de Litigios en Línea de la UE o la AEPD para cuestiones de privacidad.</p>

      <h2>18. Contacto</h2>
      <p><strong>BELOQ Movilidad S.L.</strong> — CIF: B24990814</p>
      <p><strong>Domicilio:</strong> Calle Joan Verdeguer 116, 4.º — Valencia, España</p>
      <p><strong>Email general:</strong> info@beloq.es</p>
      <p><strong>Email protección de datos:</strong> dpo@beloq.es</p>
    </LegalPage>
  );
}
