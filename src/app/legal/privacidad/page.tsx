import LegalPage from "../../components/LegalPage";
import Link from "next/link";

export const metadata = {
  title: "Política de Privacidad - Beloq",
  description: "Política de privacidad de beloq — BELOQ Movilidad S.L.",
};

export default function PoliticaPrivacidad() {
  return (
    <LegalPage title="Política de Privacidad" version="1.0" date="6 de abril de 2026">
      <h2>1. Responsable del tratamiento</h2>
      <table>
        <tbody>
          <tr><td><strong>Razón social</strong></td><td>BELOQ Movilidad S.L.</td></tr>
          <tr><td><strong>CIF</strong></td><td>B24990814</td></tr>
          <tr><td><strong>Domicilio</strong></td><td>Calle Joan Verdeguer 116, 4.º — Valencia, España</td></tr>
          <tr><td><strong>Email contacto</strong></td><td>info@beloq.es</td></tr>
          <tr><td><strong>Email DPO / Privacidad</strong></td><td>dpo@beloq.es</td></tr>
          <tr><td><strong>Web</strong></td><td>https://beloq.es</td></tr>
        </tbody>
      </table>

      <h2>2. Qué datos personales recogemos</h2>

      <h3>2.1 Datos que nos facilitas al registrarte</h3>
      <ul>
        <li><strong>Identidad:</strong> Nombre completo y apellidos.</li>
        <li><strong>Contacto:</strong> Dirección de email (verificada mediante código OTP).</li>
        <li><strong>Edad:</strong> Fecha de nacimiento (para verificar que tienes al menos 14 años).</li>
        <li><strong>Credenciales de acceso:</strong> Contraseña (almacenada como hash seguro), o bien autenticación mediante Google Sign-In o Passkey FIDO2.</li>
        <li><strong>Teléfono:</strong> Opcional, recomendado para facilitar el soporte.</li>
        <li><strong>Tipo de vehículo:</strong> Opcional (bicicleta, patinete o ambos).</li>
        <li><strong>Documento de identidad:</strong> Solo si solicitas factura con datos fiscales.</li>
      </ul>

      <h3>2.2 Datos que recogemos automáticamente al usar el servicio</h3>
      <ul>
        <li><strong>Geolocalización (GPS):</strong> Necesaria para mostrarte las estaciones cercanas y validar proximidad al módulo. Se redondea a 3 decimales (~100 metros) y se anonimiza a los 90 días.</li>
        <li><strong>Fotografías de tu vehículo:</strong> Al estacionar, como evidencia del aparcamiento correcto. Se eliminan a los 90 días.</li>
        <li><strong>Datos de sesión:</strong> Marcas de tiempo de inicio y fin, identificador del módulo y duración.</li>
        <li><strong>Datos del dispositivo:</strong> Modelo, sistema operativo, versión de la app.</li>
        <li><strong>Token de notificaciones push:</strong> Para avisos relevantes del servicio.</li>
      </ul>

      <h3>2.3 Datos financieros</h3>
      <p>El procesamiento de pagos lo realiza Stripe. beloq <strong>no almacena en ningún momento</strong> los datos de tu tarjeta (número, CVV, fecha de caducidad). Stripe tokeniza esta información bajo el estándar PCI-DSS.</p>

      <h3>2.4 Datos de autenticación (Passkeys FIDO2)</h3>
      <p>Si utilizas Passkey, <strong>no se trata de datos biométricos</strong>. La verificación biométrica ocurre exclusivamente en tu dispositivo. Lo que beloq almacena es únicamente la <strong>clave pública</strong> criptográfica, que no permite acceder a tus datos biométricos.</p>

      <h2>3. Para qué usamos tus datos</h2>
      <table>
        <thead>
          <tr><td><strong>Finalidad</strong></td><td><strong>Base legal</strong></td></tr>
        </thead>
        <tbody>
          <tr><td>Prestación del servicio (registro, sesiones, desbloqueo)</td><td>Ejecución del contrato (Art. 6.1.b RGPD)</td></tr>
          <tr><td>Facturación y cobro</td><td>Ejecución del contrato (Art. 6.1.b RGPD)</td></tr>
          <tr><td>Verificación de aparcamiento correcto</td><td>Interés legítimo (Art. 6.1.f RGPD)</td></tr>
          <tr><td>Gestión de reclamaciones y reembolsos</td><td>Ejecución del contrato (Art. 6.1.b RGPD)</td></tr>
          <tr><td>Seguridad del sistema y prevención de fraude</td><td>Interés legítimo (Art. 6.1.f RGPD)</td></tr>
          <tr><td>Comunicaciones comerciales</td><td>Consentimiento explícito (Art. 6.1.a RGPD)</td></tr>
          <tr><td>Obligaciones legales y fiscales</td><td>Obligación legal (Art. 6.1.c RGPD)</td></tr>
        </tbody>
      </table>

      <h2>4. Cuánto tiempo conservamos tus datos</h2>
      <table>
        <thead>
          <tr><td><strong>Tipo de dato</strong></td><td><strong>Plazo</strong></td></tr>
        </thead>
        <tbody>
          <tr><td>Geolocalización (GPS)</td><td>90 días, después se anonimizan</td></tr>
          <tr><td>Fotografías de evidencia</td><td>90 días, después se eliminan</td></tr>
          <tr><td>Historial de sesiones</td><td>2 años</td></tr>
          <tr><td>Datos de facturación</td><td>10 años (obligación fiscal)</td></tr>
          <tr><td>Datos de cuenta</td><td>Mientras la cuenta esté activa + 30 días</td></tr>
          <tr><td>Registros de consentimiento</td><td>5 años</td></tr>
          <tr><td>Passkeys (clave pública)</td><td>Mientras la cuenta esté activa</td></tr>
        </tbody>
      </table>
      <p>Tras la eliminación de tu cuenta, tus datos personales se anonimizan de forma irreversible.</p>

      <h2>5. Con quién compartimos tus datos</h2>

      <h3>5.1 Operadores e instituciones (clientes B2B)</h3>
      <p>Compartimos datos de uso <strong>agregados y pseudonimizados</strong> con los operadores que gestionan las estaciones. Estos datos no permiten identificarte y están protegidos por contrato de confidencialidad (Art. 28 RGPD).</p>

      <h3>5.2 Proveedores tecnológicos</h3>
      <table>
        <thead>
          <tr><td><strong>Proveedor</strong></td><td><strong>Finalidad</strong></td><td><strong>Ubicación</strong></td></tr>
        </thead>
        <tbody>
          <tr><td>Google Cloud Platform (GCP)</td><td>Infraestructura de servidores y base de datos</td><td>UE</td></tr>
          <tr><td>Stripe</td><td>Procesamiento de pagos</td><td>EE.UU. (con SCCs)</td></tr>
          <tr><td>Firebase (Google)</td><td>Autenticación, almacenamiento, notificaciones</td><td>UE</td></tr>
        </tbody>
      </table>

      <h3>5.3 Transferencias internacionales</h3>
      <p>Stripe está ubicado en Estados Unidos, protegido mediante Cláusulas Contractuales Tipo (SCCs). El resto de la infraestructura opera dentro de la UE.</p>

      <h3>5.4 Otros destinatarios</h3>
      <p>beloq <strong>no vende, alquila ni cede</strong> tus datos personales a terceros con fines comerciales.</p>

      <h2>6. Tus derechos</h2>
      <ul>
        <li><strong>Acceso:</strong> Solicitar una copia de todos tus datos personales.</li>
        <li><strong>Rectificación:</strong> Corregir datos inexactos desde la app o contactando con dpo@beloq.es.</li>
        <li><strong>Supresión (&quot;derecho al olvido&quot;):</strong> Eliminar tu cuenta desde Ajustes → &quot;Eliminar mi cuenta&quot;.</li>
        <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado y legible.</li>
        <li><strong>Oposición:</strong> Oponerte al tratamiento basado en interés legítimo.</li>
        <li><strong>Limitación:</strong> Solicitar que limitemos el uso de tus datos.</li>
      </ul>
      <p>Envía un email a <strong>dpo@beloq.es</strong>. Responderemos en un plazo máximo de 1 mes. Si consideras que no hemos atendido tus derechos, puedes reclamar ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong>: https://www.aepd.es.</p>

      <h2>7. Medidas de seguridad</h2>
      <ul>
        <li>Comunicaciones cifradas mediante <strong>TLS 1.2/1.3</strong>.</li>
        <li>Datos sensibles cifrados con <strong>AES-256</strong>.</li>
        <li>Autenticación <strong>FIDO2/WebAuthn</strong> (Passkeys).</li>
        <li>Infraestructura en <strong>VPC privada</strong> en Google Cloud Platform.</li>
        <li>Contraseñas almacenadas como hash seguro (bcrypt).</li>
        <li>Accesos administrativos con autenticación multifactor.</li>
      </ul>

      <h2>8. Menores de edad</h2>
      <p>beloq requiere una edad mínima de <strong>14 años</strong> conforme al artículo 7 de la LOPDGDD.</p>

      <h2>9. Decisiones automatizadas y perfilado</h2>
      <p>beloq <strong>no realiza</strong> decisiones automatizadas ni perfilado que produzcan efectos jurídicos.</p>

      <h2>10. Modificaciones</h2>
      <p>Te notificaremos cualquier cambio con un mínimo de 30 días de antelación. Los cambios sustanciales requerirán tu aceptación explícita.</p>

      <h2>11. Contacto</h2>
      <p><strong>DPO:</strong> dpo@beloq.es</p>
      <p><strong>Atención general:</strong> info@beloq.es</p>
      <p><strong>Autoridad de control:</strong> <Link href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">Agencia Española de Protección de Datos (AEPD)</Link></p>
    </LegalPage>
  );
}
