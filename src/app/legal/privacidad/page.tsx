import LegalPage from "../../components/LegalPage";
import Link from "next/link";

export const metadata = {
  title: "Política de Privacidad - Beloq",
  description: "Política de privacidad de beloq — Beloq Movilidad SL.",
};

export default function PoliticaPrivacidad() {
  return (
    <LegalPage title="Política de Privacidad" version="1.2" date="28 de abril de 2026">
      <h2>1. Responsable del tratamiento</h2>
      <table>
        <tbody>
          <tr><td><strong>Razón social</strong></td><td>Beloq Movilidad SL (Sociedad Limitada con declaración de unipersonalidad inscrita; socio único: D. Jesús Gracia Casani)</td></tr>
          <tr><td><strong>CIF</strong></td><td>B24990814</td></tr>
          <tr><td><strong>D-U-N-S</strong></td><td>473117119</td></tr>
          <tr><td><strong>Domicilio</strong></td><td>Calle Joan Verdeguer 116, 4 — 46024 València, España</td></tr>
          <tr><td><strong>Inscripción registral</strong></td><td>Inscrita en el Registro Mercantil de Valencia, hoja registral V-231009, inscripción 1.ª, de fecha 26 de diciembre de 2025. Folio electrónico (IRUS): 1000463742257. BORME: BORME-A-2026-2-46. Sociedad constituida mediante escritura otorgada el 4 de diciembre de 2025 ante el notario de Valencia D. Jorge Barberá Pichó, protocolo número 6145.</td></tr>
          <tr><td><strong>Email contacto</strong></td><td>info@beloq.es</td></tr>
          <tr><td><strong>Web</strong></td><td>https://www.beloq.es</td></tr>
        </tbody>
      </table>

      <h2>2. Qué datos personales recogemos</h2>

      <h3>2.1 Datos que nos facilitas al registrarte</h3>
      <ul>
        <li><strong>Teléfono móvil (identificador canónico):</strong> El identificador canónico de tu cuenta Beloq es <strong>tu número de teléfono móvil</strong>, verificado mediante un código SMS-OTP enviado a través de Brevo (Sendinblue SAS, Francia). Es el dato sobre el que pivota la identidad de la cuenta.</li>
        <li><strong>Identidad:</strong> Nombre completo y apellidos.</li>
        <li><strong>Email:</strong> Dirección de email. El email es un dato secundario obligatorio en el formulario de registro, pero <strong>Beloq no verifica activamente la dirección de email</strong>. La verificación de email solo ocurrirá si el usuario activa autenticación con Google Sign-In, en cuyo caso será Google quien la valide.</li>
        <li><strong>Edad:</strong> Fecha de nacimiento (para verificar que tienes al menos 14 años).</li>
        <li><strong>Credenciales de acceso:</strong> Login mediante SMS-OTP o <strong>passkeys</strong>. Las passkeys habilitadas son: Google Sign-In, Apple Touch ID / Face ID y biometría Android. Windows Hello no se admite.</li>
        <li><strong>Tipo de vehículo:</strong> Opcional (bicicleta, patinete o ambos). Es un dato estadístico sin efecto contractual.</li>
        <li><strong>Documento de identidad:</strong> Solo si solicitas factura con datos fiscales (DNI, NIE o Pasaporte).</li>
      </ul>

      <h3>2.2 Datos que recogemos automáticamente al usar el servicio</h3>
      <ul>
        <li><strong>Geolocalización (GPS):</strong> Necesaria para mostrarte las estaciones cercanas y validar que estás próximo al módulo al desbloquearlo. La ubicación se redondea a 3 decimales (~100 metros de precisión) y se anonimiza a los 90 días.</li>
        <li><strong>Fotografías de tu vehículo:</strong> Al estacionar, la app te solicita una foto como evidencia del aparcamiento correcto. Estas imágenes deben mostrar el vehículo y el módulo, no están diseñadas para captar rostros ni personas. Se usan exclusivamente para verificar el anclaje y gestionar posibles reclamaciones. Se eliminan automáticamente a los 90 días.</li>
        <li><strong>Datos de sesión:</strong> Marcas de tiempo de inicio y fin de cada sesión de estacionamiento, identificador del módulo utilizado y duración.</li>
        <li><strong>Datos del dispositivo:</strong> Modelo de dispositivo, sistema operativo, versión de la app. Usados para soporte técnico y compatibilidad.</li>
        <li><strong>Token de notificaciones push:</strong> Para enviarte avisos relevantes del servicio (confirmación de parking, alertas de penalización, recordatorios).</li>
      </ul>

      <h3>2.3 Datos financieros</h3>
      <p><strong>Datos de pago:</strong> El procesamiento de pagos lo realiza Stripe. beloq <strong>no almacena en ningún momento</strong> los datos de tu tarjeta (número, CVV, fecha de caducidad). Stripe tokeniza esta información bajo el estándar PCI-DSS. Lo que beloq almacena es: un identificador de cliente Stripe (token, no vinculable a datos de tarjeta), historial de transacciones (importe, fecha, concepto) y estado de la deuda.</p>

      <h3>2.4 Datos de autenticación (Passkeys FIDO2)</h3>
      <p>Si utilizas Passkey como método de acceso, es importante que sepas que <strong>no se trata de datos biométricos</strong>. La verificación biométrica (huella, rostro) ocurre exclusivamente en tu dispositivo mediante su Secure Enclave o chip de seguridad. Lo que beloq almacena es únicamente la <strong>clave pública</strong> criptográfica generada en el proceso, que no permite reconstruir ni acceder a tus datos biométricos.</p>

      <h2>3. Para qué usamos tus datos (finalidades)</h2>
      <table>
        <thead>
          <tr>
            <td><strong>Finalidad</strong></td>
            <td><strong>Datos utilizados</strong></td>
            <td><strong>Base legal</strong></td>
          </tr>
        </thead>
        <tbody>
          <tr><td>Prestación del servicio (registro, sesiones, desbloqueo)</td><td>Identidad, email, credenciales, GPS, sesiones</td><td>Ejecución del contrato (Art. 6.1.b RGPD)</td></tr>
          <tr><td>Facturación y cobro</td><td>Email, datos transacciones, token Stripe</td><td>Ejecución del contrato (Art. 6.1.b RGPD)</td></tr>
          <tr><td>Verificación de aparcamiento correcto</td><td>Fotografías del vehículo</td><td>Interés legítimo (Art. 6.1.f RGPD)</td></tr>
          <tr><td>Gestión de reclamaciones y reembolsos</td><td>Identidad, email, fotos, logs sesión</td><td>Ejecución del contrato (Art. 6.1.b RGPD)</td></tr>
          <tr><td>Seguridad del sistema y prevención de fraude</td><td>IP, dispositivo, patrones de uso</td><td>Interés legítimo (Art. 6.1.f RGPD)</td></tr>
          <tr><td>Comunicaciones comerciales y promociones</td><td>Email</td><td>Consentimiento explícito (Art. 6.1.a RGPD)</td></tr>
          <tr><td>Obligaciones legales y fiscales</td><td>Datos facturación, identidad fiscal</td><td>Obligación legal (Art. 6.1.c RGPD)</td></tr>
          <tr><td>Datos agregados para operadores/instituciones</td><td>Datos pseudonimizados de uso (ver sección 5)</td><td>Interés legítimo (Art. 6.1.f RGPD)</td></tr>
        </tbody>
      </table>

      <h2>4. Cuánto tiempo conservamos tus datos</h2>
      <table>
        <thead>
          <tr>
            <td><strong>Tipo de dato</strong></td>
            <td><strong>Plazo de conservación</strong></td>
          </tr>
        </thead>
        <tbody>
          <tr><td>Datos de geolocalización (GPS)</td><td>90 días desde la sesión, después se anonimizan</td></tr>
          <tr><td>Fotografías de evidencia de parking</td><td>90 días desde la sesión, después se eliminan de Firebase Storage</td></tr>
          <tr><td>Historial de sesiones (reservas, uso)</td><td>2 años desde la sesión</td></tr>
          <tr><td>Datos de transacciones y facturación</td><td>10 años (obligación fiscal, Ley General Tributaria)</td></tr>
          <tr><td>Datos de cuenta (nombre, email)</td><td>Mientras la cuenta esté activa + 30 días tras solicitud de eliminación</td></tr>
          <tr><td>Registros de consentimiento</td><td>5 años (demostración de cumplimiento RGPD)</td></tr>
          <tr><td>Passkeys (clave pública)</td><td>Mientras la cuenta esté activa (se eliminan en cascada al borrar la cuenta)</td></tr>
        </tbody>
      </table>
      <p>Tras la eliminación de tu cuenta, tus datos personales se anonimizan de forma irreversible: tu nombre se sustituye por &quot;Usuario eliminado&quot;, tu email se convierte en un hash no reversible, tu teléfono se elimina y tu historial se desvincula de tu identidad.</p>

      <h2>5. Con quién compartimos tus datos</h2>

      <h3>5.1 Operadores e instituciones (clientes B2B de beloq)</h3>
      <p>Compartimos datos de uso <strong>agregados y pseudonimizados</strong> con los operadores e instituciones que gestionan las estaciones beloq (universidades, ayuntamientos, empresas). Estos datos incluyen: número de reservas por estación, tasa de ocupación, duración media de sesiones, horarios de mayor demanda e ingresos generados.</p>
      <p>También compartimos datos individuales <strong>pseudonimizados</strong> (identificador hash no vinculable a tu identidad, marcas de tiempo de sesiones, coordenadas GPS redondeadas, tipo de vehículo y tipo de plan). Estos datos no permiten identificarte y están protegidos por contrato de confidencialidad (Art. 28 RGPD).</p>
      <p>La finalidad de compartir estos datos es permitir al operador gestionar el servicio, realizar estudios de movilidad urbana y optimizar la red de estaciones.</p>

      <h3>5.2 Proveedores tecnológicos (subprocesadores / encargados de tratamiento)</h3>
      <table>
        <thead>
          <tr>
            <td><strong>Subprocesador</strong></td>
            <td><strong>Domicilio</strong></td>
            <td><strong>Categoría datos</strong></td>
            <td><strong>Finalidad</strong></td>
          </tr>
        </thead>
        <tbody>
          <tr><td>Sendinblue SAS (Brevo)</td><td>Châteauboeuf, Francia (UE)</td><td>Email + teléfono</td><td>Email transaccional (recibos, notificaciones) y SMS-OTP de verificación de identidad</td></tr>
          <tr><td>Stripe Payments Europe Ltd.</td><td>Dublín, Irlanda (UE)</td><td>Datos de pago</td><td>Procesamiento de cobros</td></tr>
          <tr><td>Google LLC (Firebase Authentication)</td><td>Mountain View, California, EUA</td><td>UID, tokens de autenticación</td><td>Gestión de sesiones y custom tokens</td></tr>
          <tr><td>Google Ireland Ltd. (Google Cloud — Cloud Run + Cloud SQL + Mosquitto MQTT en Compute Engine)</td><td>Dublín, Irlanda (UE región europe-southwest1, Madrid)</td><td>Datos de aplicación, telemetría módulos</td><td>Infraestructura backend y comunicación IoT</td></tr>
          <tr><td>Apple Inc. (APNs)</td><td>Cupertino, California, EUA</td><td>Tokens de notificación push</td><td>Notificaciones a dispositivos iOS</td></tr>
        </tbody>
      </table>
      <p>Mosquitto MQTT se ejecuta sobre Compute Engine de Google Cloud, por lo que queda incluido bajo la responsabilidad de Google Ireland Ltd.</p>

      <h3>5.3 Transferencias internacionales de datos</h3>
      <p><strong>Stripe (Irlanda, UE):</strong> El procesamiento de pagos se realiza con Stripe Payments Europe Ltd., entidad establecida en Dublín (Irlanda), por lo que el tratamiento de los datos de pago se realiza dentro del Espacio Económico Europeo.</p>
      <p><strong>Firebase Authentication (Estados Unidos):</strong> Firebase Authentication es un servicio prestado por Google LLC con sede en Estados Unidos. La transferencia internacional de datos (UID, tokens de autenticación) está cubierta por el <strong>EU-US Data Privacy Framework (DPF)</strong> vigente desde julio de 2023, así como por las <strong>Cláusulas Contractuales Tipo (SCCs)</strong> aprobadas por la Comisión Europea. Beloq ha realizado la Evaluación de Impacto correspondiente (EIPD V3.2) y dispone del DPA estándar firmado con Google.</p>
      <p><strong>Apple (APNs, Estados Unidos):</strong> Las notificaciones push a dispositivos iOS se entregan a través de Apple Push Notification service (APNs), prestado por Apple Inc. desde Estados Unidos. La transferencia se ampara igualmente en el EU-US Data Privacy Framework y en las Cláusulas Contractuales Tipo de la Comisión Europea.</p>
      <p>El resto de nuestra infraestructura (Google Cloud Run, Cloud SQL y Mosquitto MQTT) opera en la región europe-southwest1 de Google Cloud, en Madrid (España, UE).</p>

      <h3>5.4 Otros destinatarios</h3>
      <p>beloq no vende, alquila ni cede tus datos personales a terceros con fines comerciales. Solo compartimos datos personales identificables con terceros cuando exista una obligación legal (requerimiento judicial, Agencia Tributaria) o con tu consentimiento explícito.</p>

      <h2>6. Tus derechos</h2>
      <p>Como usuario, tienes los siguientes derechos conforme al RGPD:</p>
      <ul>
        <li><strong>Derecho de acceso:</strong> Puedes solicitar una copia de todos los datos personales que tenemos sobre ti. Desde la app, puedes consultar tu perfil en cualquier momento.</li>
        <li><strong>Derecho de rectificación:</strong> Puedes corregir cualquier dato inexacto o incompleto desde la sección &quot;Ajustes&quot; de la app o contactando con info@beloq.es.</li>
        <li><strong>Derecho de supresión (&quot;derecho al olvido&quot;):</strong> Puedes solicitar la eliminación de tu cuenta y todos tus datos personales desde Ajustes → &quot;Eliminar mi cuenta&quot;. La anonimización se ejecuta de forma inmediata, con un periodo de gracia de 30 días por si cambias de opinión. Existen excepciones y limitaciones (sesión activa, conservación legal, sanciones pendientes) que se detallan en la <strong>Sección 6.bis (Eliminación de cuenta)</strong>.</li>
        <li><strong>Derecho de portabilidad:</strong> Puedes solicitar una copia de tus datos en formato estructurado y legible por máquina para transferirlos a otro servicio.</li>
        <li><strong>Derecho de oposición:</strong> Puedes oponerte al tratamiento de tus datos basado en interés legítimo. Si te opones al tratamiento para comunicaciones comerciales, dejaremos de enviarte emails promocionales de forma inmediata.</li>
        <li><strong>Derecho de limitación del tratamiento:</strong> Puedes solicitar que limitemos el uso de tus datos mientras se resuelve una reclamación o se verifica la exactitud de los mismos.</li>
      </ul>
      <h3>Cómo ejercer tus derechos</h3>
      <p>Envía un email a <strong>info@beloq.es</strong> indicando qué derecho deseas ejercer y acompañando una copia de tu documento de identidad para verificar tu identidad. Te responderemos en un plazo máximo de <strong>1 mes</strong> desde la recepción de la solicitud. Este plazo puede prorrogarse 2 meses adicionales si la solicitud es especialmente compleja, en cuyo caso te informaremos dentro del primer mes.</p>
      <p>Si consideras que no hemos atendido correctamente tus derechos, puedes presentar una reclamación ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong>: <Link href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">https://www.aepd.es</Link>.</p>

      <h2>6.bis Eliminación de cuenta</h2>

      <h3>Cómo eliminar tu cuenta</h3>
      <p>Puedes eliminar tu cuenta desde la propia aplicación, en <strong>Ajustes → &quot;Eliminar mi cuenta&quot;</strong>. El proceso incluye una doble confirmación de seguridad para evitar eliminaciones accidentales.</p>

      <h3>Plazo de ejecución</h3>
      <p>Una vez confirmada la solicitud, la anonimización de tus datos personales se ejecuta de forma <strong>inmediata</strong> (soft delete + anonimización PII). La eliminación física definitiva en base de datos se produce a los <strong>30 días</strong> desde la solicitud, periodo durante el cual puedes revertir la eliminación si cambias de opinión. Tras este plazo, la operación es irreversible.</p>

      <h3>Datos que se conservan tras la eliminación</h3>
      <p>Aunque elimines tu cuenta, Beloq está obligado o legitimado para conservar determinados datos:</p>
      <ul>
        <li><strong>Datos de facturación:</strong> Se conservan durante <strong>10 años</strong>, conforme al artículo 30 del Código de Comercio y al artículo 7 de la Ley General Tributaria (obligación fiscal y mercantil).</li>
        <li><strong>Hash del número de teléfono (phone_hash, SHA-256):</strong> Si en el momento de la eliminación existen <strong>sanciones pendientes</strong> asociadas a tu cuenta, el hash SHA-256 de tu número de teléfono <strong>se conserva indefinidamente</strong> al amparo del artículo 17.3.b) del RGPD (formulación, ejercicio o defensa de reclamaciones). Esta medida persigue evitar que un usuario sancionado eluda su responsabilidad re-registrándose con el mismo número de teléfono. El phone_hash no permite por sí solo reidentificar al usuario, pero sí impide la elusión.</li>
        <li><strong>Registros de consentimiento:</strong> Se conservan 5 años para acreditar el cumplimiento del RGPD.</li>
        <li><strong>Logs de seguridad y trazabilidad técnica anonimizados:</strong> Conservados según política interna para defensa de reclamaciones e investigación de incidentes.</li>
      </ul>

      <h3>Condición D13 — Sesión activa: bloqueo de eliminación</h3>
      <p>La eliminación de cuenta <strong>no puede ejecutarse mientras haya una sesión activa</strong>, es decir, mientras tu vehículo esté aparcado dentro de un módulo Beloq y la sesión de custodia no se haya cerrado de forma legítima.</p>
      <p>Razón: durante la sesión, el usuario es responsable del vehículo aparcado y del propio módulo. Permitir la eliminación de cuenta en mitad de una sesión activa rompería la cadena de responsabilidad y dejaría al módulo y al vehículo en un estado inconsistente. Esta limitación se ampara en el artículo <strong>17.3.b) RGPD</strong> (necesidad de conservación para el cumplimiento del contrato y la defensa de reclamaciones).</p>
      <p>Para eliminar la cuenta, el usuario debe primero cerrar la sesión activa (recoger su vehículo y desbloquear el módulo).</p>

      <h3>Recuperación de cuenta</h3>
      <p><strong>No existe un flujo público de recuperación de cuenta.</strong> El número de teléfono es la identidad canónica de la cuenta. Si pierdes el acceso definitivo a tu número (cambio de operador sin portabilidad, baja, robo sin recuperación), perderás el acceso a tu cuenta y a los datos asociados.</p>
      <p>En casos excepcionales, el equipo de soporte podrá gestionar manualmente cambios de identidad <strong>previa verificación rigurosa</strong> (escribiendo a <strong>info@beloq.es</strong> con copia del DNI). Esta vía es excepcional y queda a discreción de Beloq.</p>

      <h2>7. Medidas de seguridad</h2>
      <p>beloq implementa medidas técnicas y organizativas para proteger tus datos personales:</p>
      <ul>
        <li>Todas las comunicaciones entre la app, los módulos y nuestros servidores están cifradas mediante <strong>TLS 1.2/1.3</strong>.</li>
        <li>Los datos sensibles almacenados se cifran con <strong>AES-256</strong>.</li>
        <li>La autenticación soporta <strong>FIDO2/WebAuthn</strong> (Passkeys), el estándar más seguro disponible, resistente a phishing.</li>
        <li>La infraestructura se ejecuta en una <strong>VPC privada</strong> en Google Cloud Platform con acceso restringido.</li>
        <li>Las contraseñas se almacenan como hash seguro (bcrypt), nunca en texto plano.</li>
        <li>Los accesos administrativos requieren autenticación multifactor.</li>
      </ul>

      <h2>8. Menores de edad</h2>
      <p>beloq requiere una edad mínima de <strong>14 años</strong> para el registro, conforme al artículo 7 de la Ley Orgánica 3/2018 (LOPDGDD). La fecha de nacimiento se verifica durante el proceso de registro y los menores de 14 años no pueden crear una cuenta.</p>
      <p>Para usuarios entre 14 y 17 años, mostramos un aviso informativo recomendando informar a su tutor legal, aunque no es un requisito bloqueante conforme a la normativa vigente.</p>

      <h2>9. Decisiones automatizadas y perfilado</h2>
      <p>beloq <strong>no realiza</strong> decisiones automatizadas ni perfilado que produzcan efectos jurídicos o te afecten significativamente. No utilizamos tus datos para crear perfiles de comportamiento, scoring crediticio ni segmentación automatizada.</p>
      <p>El cálculo automático de tarifas y penalizaciones se basa exclusivamente en datos objetivos (duración de la sesión, estado del módulo) y siempre es disputable por el usuario.</p>

      <h2>10. Modificaciones de esta Política</h2>
      <p>Podemos actualizar esta Política de Privacidad para adaptarla a cambios normativos o a la evolución del servicio. Te notificaremos cualquier cambio con un mínimo de 30 días de antelación por email y mediante aviso en la app. Los cambios sustanciales requerirán tu aceptación explícita.</p>

      <h2>11. Contacto</h2>
      <p>Para cualquier consulta relacionada con la protección de tus datos personales:</p>
      <p><strong>Atención y privacidad:</strong> info@beloq.es</p>
      <p><strong>Autoridad de control:</strong> <Link href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">Agencia Española de Protección de Datos (AEPD)</Link></p>
    </LegalPage>
  );
}
