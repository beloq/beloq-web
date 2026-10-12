import Link from "next/link";
import LegalPage from "../../components/LegalPage";

// Texto: beloq-backend/docs/Terminos, condiciones, privacidad y legal/ (fuente única).
// Se genera desde el Markdown; no editar a mano sin cambiar también el origen.
export const metadata = {
  title: "Política de Privacidad · beloq",
  description: "Política de privacidad de beloq — Beloq Movilidad SL.",
};

export default function PoliticaPrivacidad() {
  return (
    <LegalPage title="Política de Privacidad" version="1.3" date="11 de octubre de 2026">
      <h2>1. Responsable del tratamiento</h2>
      <table>
        <tbody>
          <tr><td><strong>Razón social</strong></td><td>Beloq Movilidad SL (Sociedad Limitada con declaración de unipersonalidad inscrita; socio único: D. Jesús Gracia Casani)</td></tr>
          <tr><td><strong>CIF</strong></td><td>B24990814</td></tr>
          <tr><td><strong>D-U-N-S</strong></td><td>473117119</td></tr>
          <tr><td><strong>Domicilio</strong></td><td>Calle Joan Verdeguer 116, 4 — 46024 València, España</td></tr>
          <tr><td><strong>Inscripción registral</strong></td><td>Inscrita en el Registro Mercantil de Valencia, hoja registral V-231009, inscripción 1.ª, de fecha 26 de diciembre de 2025. Folio electrónico (IRUS): 1000463742257. BORME: BORME-A-2026-2-46. Sociedad constituida mediante escritura otorgada el 4 de diciembre de 2025 ante el notario de Valencia D. Jorge Barberá Pichó, protocolo número 6145.</td></tr>
          <tr><td><strong>Contacto general</strong></td><td><a href="mailto:info@beloq.es">info@beloq.es</a></td></tr>
          <tr><td><strong>Protección de datos</strong></td><td><a href="mailto:dpo@beloq.es">dpo@beloq.es</a></td></tr>
          <tr><td><strong>Web</strong></td><td><a href="https://www.beloq.es" target="_blank" rel="noopener noreferrer">https://www.beloq.es</a></td></tr>
        </tbody>
      </table>
      <h2>2. Qué datos personales recogemos</h2>
      <h3>2.1 Datos que nos das al registrarte</h3>
      <ul>
        <li><strong>Teléfono móvil:</strong> es el identificador de tu cuenta. Se verifica con un código por SMS que se envía a través de Brevo.</li>
        <li><strong>Identidad:</strong> nombre y apellidos.</li>
        <li><strong>Correo electrónico:</strong> se verifica con un código de 6 dígitos (o lo verifica Google o Apple si te registras con ellos). Es una de las llaves para entrar si pierdes tu número.</li>
        <li><strong>Fecha de nacimiento:</strong> para comprobar que tienes al menos 14 años.</li>
        <li><strong>Llaves de acceso:</strong> código por SMS, código al correo verificado, Google, Apple o <strong>passkeys</strong> (huella o cara del móvil). No hay contraseñas. Los cambios de número se verifican con un SMS al número nuevo y quedan registrados (fecha, número anterior y nuevo).</li>
        <li><strong>Vehículo con el que vas:</strong> bici, patinete o los dos. Es opcional y sirve para enseñarte el vídeo adecuado al aparcar y para estadística.</li>
        <li><strong>Documento de identidad:</strong> solo si pides una factura con datos fiscales.</li>
      </ul>
      <h3>2.2 Datos que se generan al usar el servicio</h3>
      <ul>
        <li><strong>Ubicación (GPS):</strong> solo con la app abierta, para enseñarte las estaciones cercanas y comprobar que estás junto al beloq que abres (a menos de 500 metros). La de cada apertura se guarda con ella y se anonimiza o se borra a los 90 días.</li>
        <li><strong>Uso del servicio:</strong> aperturas, inicio y fin de cada custodia, beloq y estación usados, tiempo gratis consumido, anuncios vistos, reservas, abonos, avisos enviados y respuestas a las preguntas de la app (por ejemplo, si había un vehículo al cerrar un beloq).</li>
        <li><strong>Dispositivo:</strong> modelo, sistema y versión de la app, para soporte y compatibilidad; el token de notificaciones, para avisarte; y el identificador de instalación de la app.</li>
        <li><strong>Analítica y fallos de la app:</strong> Firebase Analytics registra cómo se usa la app (pantallas y acciones) y Firebase Crashlytics registra los fallos (qué falló, en qué versión y en qué modelo). No se usan para publicidad ni para seguirte en otras apps, y la app no usa el identificador de publicidad del móvil.</li>
        <li><strong>Soporte:</strong> lo que escribes al reportar un fallo de un beloq y en el chat de soporte de <Link href="/info">beloq.es/info</Link>, con el nombre y el correo que nos des.</li>
        <li><strong>Códigos e invitaciones:</strong> los códigos que canjeas, quién te invitó y a quién has invitado, y el hash de tu número de móvil (ver §4).</li>
      </ul>
      <h3>2.3 Datos de pago</h3>
      <p>Los pagos los procesa Stripe. Si guardas una tarjeta, <strong>la guarda Stripe, no beloq</strong>: beloq no tiene el número completo ni el CVV. Lo que beloq guarda es el identificador de cliente en Stripe; de cada tarjeta, la marca, los cuatro últimos números, la caducidad y si es la predeterminada; el historial de pagos, cargos, devoluciones y abonos (importe, fecha y concepto); y el estado de tu deuda.</p>
      <h3>2.4 Passkeys</h3>
      <p>Las passkeys <strong>no son datos biométricos</strong>. La huella o la cara se comprueban solo en tu móvil, en su chip de seguridad. beloq guarda únicamente la <strong>clave pública</strong> criptográfica, que no permite reconstruir ni acceder a tu huella ni a tu cara.</p>
      <h2>3. Para qué usamos tus datos</h2>
      <table>
        <thead>
          <tr><td><strong>Finalidad</strong></td><td><strong>Datos</strong></td><td><strong>Base legal</strong></td></tr>
        </thead>
        <tbody>
          <tr><td>Prestar el servicio (cuenta, aperturas, custodia, avisos)</td><td>Identidad, teléfono, correo, llaves, GPS, uso, dispositivo</td><td>Ejecución del contrato (art. 6.1.b RGPD)</td></tr>
          <tr><td>Cobros, abonos, tarjetas guardadas y cobro automático de la deuda</td><td>Correo, pagos, identificador de Stripe</td><td>Ejecución del contrato (art. 6.1.b RGPD)</td></tr>
          <tr><td>Atención al usuario, reclamaciones y reembolsos</td><td>Identidad, correo, uso, mensajes de soporte</td><td>Ejecución del contrato (art. 6.1.b RGPD)</td></tr>
          <tr><td>Seguridad del sistema y prevención del fraude (incluido el abuso de pruebas gratis e invitaciones)</td><td>IP, dispositivo, patrones de uso, hash del móvil</td><td>Interés legítimo (art. 6.1.f RGPD)</td></tr>
          <tr><td>Mejorar la app y corregir fallos</td><td>Analítica y registros de fallos</td><td>Interés legítimo (art. 6.1.f RGPD)</td></tr>
          <tr><td>Novedades por correo</td><td>Correo</td><td>Consentimiento (art. 6.1.a RGPD)</td></tr>
          <tr><td>Obligaciones legales y fiscales</td><td>Datos de facturación e identidad fiscal</td><td>Obligación legal (art. 6.1.c RGPD)</td></tr>
          <tr><td>Datos agregados para operadores e instituciones</td><td>Datos de uso pseudonimizados (ver §5.1)</td><td>Interés legítimo (art. 6.1.f RGPD)</td></tr>
        </tbody>
      </table>
      <h2>4. Cuánto tiempo conservamos tus datos</h2>
      <table>
        <thead>
          <tr><td><strong>Dato</strong></td><td><strong>Plazo</strong></td></tr>
        </thead>
        <tbody>
          <tr><td>Datos de la cuenta (nombre, correo, teléfono)</td><td>Mientras la cuenta exista. Al eliminarla se anonimizan en el momento</td></tr>
          <tr><td>Ubicación (GPS)</td><td>90 días; después se anonimiza o se borra</td></tr>
          <tr><td>Historial de uso (custodias, reservas, avisos)</td><td>Mientras la cuenta exista. Al eliminarla deja de estar ligado a ti</td></tr>
          <tr><td>Pagos, cargos, devoluciones y abonos</td><td>10 años (Código de Comercio, art. 30, y Ley General Tributaria)</td></tr>
          <tr><td>Chat de soporte</td><td>90 días desde el último mensaje</td></tr>
          <tr><td>Códigos SMS de verificación</td><td>7 días</td></tr>
          <tr><td>Registros de consentimiento</td><td>5 años, para acreditar el cumplimiento del RGPD</td></tr>
          <tr><td>Passkeys (clave pública)</td><td>Mientras la cuenta exista; se desactivan al eliminarla</td></tr>
          <tr><td>Hash del móvil por una deuda pendiente al eliminar la cuenta</td><td>Hasta que se paga la deuda</td></tr>
          <tr><td>Hash del móvil de quien canjea un código de prueba o de invitación</td><td>Indefinidamente, para impedir que se repita una prueba gratis o una invitación</td></tr>
        </tbody>
      </table>
      <p>Al eliminar la cuenta, tus datos se anonimizan de forma irreversible: tu nombre pasa a «[eliminado]», tu correo se sustituye por una dirección sin relación contigo, tu teléfono se borra, y se borran tu cliente de Stripe y tus tarjetas guardadas.</p>
      <h2>5. Con quién compartimos tus datos</h2>
      <h3>5.1 Operadores e instituciones (clientes de beloq)</h3>
      <p>Compartimos con los operadores e instituciones que gestionan las estaciones datos de uso <strong>agregados y pseudonimizados</strong>: aperturas y custodias por estación, ocupación, duración media, horas de más demanda e ingresos.</p>
      <p>También podemos compartir datos individuales <strong>pseudonimizados</strong> (un identificador cifrado que no te identifica, las horas de cada custodia, la estación, el tipo de vehículo y el tipo de plan), protegidos por contrato de confidencialidad (art. 28 RGPD), para gestionar el servicio, hacer estudios de movilidad y mejorar la red de estaciones.</p>
      <h3>5.2 Proveedores (encargados del tratamiento)</h3>
      <table>
        <thead>
          <tr><td><strong>Proveedor</strong></td><td><strong>Domicilio</strong></td><td><strong>Datos</strong></td><td><strong>Para qué</strong></td></tr>
        </thead>
        <tbody>
          <tr><td><strong>Sendinblue SAS (Brevo)</strong></td><td>Francia (UE)</td><td>Correo y teléfono</td><td>Correos del servicio y SMS de verificación y avisos</td></tr>
          <tr><td><strong>Stripe Payments Europe Ltd.</strong></td><td>Dublín, Irlanda (UE)</td><td>Datos de pago y tarjetas</td><td>Cobros, tarjetas guardadas y devoluciones</td></tr>
          <tr><td><strong>Google Ireland Ltd. (Google Cloud)</strong></td><td>Irlanda; datos en la región europe-southwest1 (Madrid) y BigQuery en la UE</td><td>Datos de la app y de los módulos</td><td>Servidores, base de datos y comunicación con los módulos</td></tr>
          <tr><td><strong>Google LLC (Firebase: Authentication, Cloud Messaging, Analytics y Crashlytics)</strong></td><td>EE. UU.</td><td>Identificador de usuario, tokens, uso de la app y fallos</td><td>Cuentas y entrada con Google, avisos al móvil, analítica y registro de fallos</td></tr>
          <tr><td><strong>Apple Inc.</strong></td><td>EE. UU.</td><td>Tokens de notificación y entrada con Apple</td><td>Avisos a iPhone y «Iniciar sesión con Apple»</td></tr>
          <tr><td><strong>Stadia Maps, Inc.</strong></td><td>Delaware, EE. UU.</td><td>IP y zona del mapa que se mira</td><td>Mapa de estaciones</td></tr>
        </tbody>
      </table>
      <h3>5.3 Transferencias internacionales</h3>
      <p>Stripe, Brevo y la infraestructura de Google Cloud tratan los datos dentro del Espacio Económico Europeo. Firebase (Google LLC) y Apple Inc. están en Estados Unidos: la transferencia se ampara en el <strong>Marco de Privacidad de Datos UE-EE. UU.</strong> (EU-US Data Privacy Framework) y en las <strong>Cláusulas Contractuales Tipo</strong> aprobadas por la Comisión Europea. Stadia Maps, Inc. (Estados Unidos) recibe solo la IP y la zona del mapa que se mira, con su acuerdo de tratamiento de datos conforme al RGPD; no guarda ubicaciones ligadas a personas.</p>
      <h3>5.4 Otros destinatarios</h3>
      <p>beloq no vende, alquila ni cede tus datos a terceros con fines comerciales. Solo los comparte con terceros identificables cuando la ley lo obliga (requerimiento judicial, Agencia Tributaria) o con tu consentimiento.</p>
      <h2>6. Tus derechos</h2>
      <ul>
        <li><strong>Acceso:</strong> en «Tu cuenta» → «Copia de tus datos» ves y puedes copiar lo que guardamos de ti. También puedes pedirlo por correo.</li>
        <li><strong>Rectificación:</strong> desde «Tu cuenta» o escribiéndonos.</li>
        <li><strong>Supresión:</strong> eliminando tu cuenta (ver §6.bis). La anonimización es inmediata e irreversible.</li>
        <li><strong>Portabilidad:</strong> puedes pedir tus datos en un formato estructurado y legible por máquina.</li>
        <li><strong>Oposición:</strong> al tratamiento basado en interés legítimo. Si te opones a las novedades por correo, dejamos de enviarlas en el momento (también lo cambias en «Tu cuenta»).</li>
        <li><strong>Limitación:</strong> puedes pedir que limitemos el uso de tus datos mientras se resuelve una reclamación.</li>
      </ul>
      <h3>Cómo ejercerlos</h3>
      <p>Escribe a <strong><a href="mailto:dpo@beloq.es">dpo@beloq.es</a></strong> desde el correo verificado de tu cuenta, o por el chat de <Link href="/info">beloq.es/info</Link>, indicando qué derecho quieres ejercer. Solo si no podemos vincular la solicitud con tu cuenta te pediremos un dato más para verificarla. Te respondemos en un máximo de <strong>1 mes</strong>, ampliable 2 meses más si la solicitud es especialmente compleja, en cuyo caso te avisaremos dentro del primer mes.</p>
      <p>Si crees que no hemos atendido bien tus derechos, puedes reclamar ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong>: <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">https://www.aepd.es</a>.</p>
      <h2>6.bis Eliminación de la cuenta</h2>
      <h3>Cómo eliminarla</h3>
      <ul>
        <li><strong>Desde la app:</strong> «Tu cuenta» → «Eliminar mi cuenta», y confirmar.</li>
        <li><strong>Sin la app:</strong> como se explica en <Link href="/legal/borrar-cuenta">beloq.es/legal/borrar-cuenta</Link>, escribiendo a <a href="mailto:dpo@beloq.es">dpo@beloq.es</a> desde el correo de la cuenta o por el chat de <Link href="/info">beloq.es/info</Link> indicando el móvil de la cuenta.</li>
      </ul>
      <h3>Qué pasa al eliminarla</h3>
      <p>En el momento, y sin vuelta atrás: se anonimizan tus datos personales, se borran tu cliente de Stripe y tus tarjetas guardadas, se borra tu ubicación guardada, se desactivan tus passkeys y se cancelan tus reservas. El abono que tengas en vigor se pierde, salvo que estés dentro del plazo de desistimiento.</p>
      <h3>Qué se conserva</h3>
      <ul>
        <li><strong>Pagos y facturación:</strong> 10 años, por obligación fiscal y mercantil (art. 30 del Código de Comercio y art. 7 de la Ley General Tributaria).</li>
        <li>
          <strong>Hash del número de teléfono (SHA-256):</strong>
          <ul>
            <li>Si al eliminar la cuenta tienes una deuda pendiente, se conserva hasta que la pagues, para que no se pueda eludir volviendo a registrarse con el mismo número (art. 17.3.b RGPD).</li>
            <li>Si has canjeado un código de prueba o de invitación, se conserva indefinidamente para que no se puedan repetir.</li>
          </ul>
          <p>El hash por sí solo no permite identificarte.</p>
        </li>
        <li><strong>Registros de consentimiento:</strong> 5 años.</li>
        <li><strong>Registros técnicos y de seguridad, anonimizados:</strong> para defenderse de reclamaciones e investigar incidentes.</li>
      </ul>
      <h3>Con el vehículo dentro</h3>
      <p>No se puede eliminar la cuenta mientras tengas un vehículo en un beloq: durante la custodia eres responsable del vehículo y del uso del módulo, y borrar la cuenta en mitad dejaría ambos sin titular (art. 17.3.b RGPD). Retira primero tu vehículo.</p>
      <h3>Recuperación</h3>
      <p>El número de teléfono es la identidad de la cuenta. Si lo pierdes, entra con otra de tus llaves (correo verificado, Google, Apple o passkey) y cámbialo desde dentro. <strong>Si pierdes a la vez tu número y todas tus llaves, no hay recuperación manual de la cuenta.</strong></p>
      <h2>7. Medidas de seguridad</h2>
      <ul>
        <li>Las comunicaciones entre la app, los módulos y nuestros servidores van cifradas con <strong>TLS 1.2/1.3</strong>, y los módulos se identifican con certificados propios que se pueden revocar.</li>
        <li>Los datos almacenados se cifran con <strong>AES-256</strong>.</li>
        <li>La entrada admite <strong>passkeys (FIDO2/WebAuthn)</strong>, resistentes al phishing, y no hay contraseñas que robar.</li>
        <li>La infraestructura se ejecuta en Google Cloud con acceso restringido.</li>
        <li>Los accesos del equipo de beloq requieren la huella o la cara en su dispositivo y quedan registrados.</li>
      </ul>
      <h2>8. Menores de edad</h2>
      <p>La edad mínima para registrarse es de <strong>14 años</strong>, conforme al artículo 7 de la LOPDGDD. La fecha de nacimiento se comprueba en el registro y los menores de 14 años no pueden crear una cuenta.</p>
      <p>A quienes tienen entre 14 y 17 años les recomendamos informar a su tutor legal.</p>
      <h2>9. Decisiones automatizadas</h2>
      <p>beloq no hace perfiles de comportamiento, scoring crediticio ni segmentación automatizada.</p>
      <p>Algunas decisiones del servicio son automáticas y se basan solo en datos objetivos:</p>
      <ul>
        <li>el cálculo de las tarifas, el tiempo extra y las penalizaciones (duración y estado del beloq);</li>
        <li>el bloqueo para abrir un beloq nuevo cuando la deuda supera el umbral;</li>
        <li>el cobro automático de la deuda en tu tarjeta guardada.</li>
      </ul>
      <p>Puedes pedir que las revise una persona, dar tu punto de vista y discutirlas escribiendo a <a href="mailto:info@beloq.es">info@beloq.es</a> o por el chat de <Link href="/info">beloq.es/info</Link>.</p>
      <h2>10. Cambios en esta Política</h2>
      <p>Podemos actualizar esta Política para adaptarla a cambios normativos o del servicio. Te avisaremos por correo y en la app con al menos 30 días de antelación. La versión vigente se publica siempre en <Link href="/legal/privacidad">beloq.es/legal/privacidad</Link>, con su número y su fecha.</p>
      <h2>11. Contacto</h2>
      <p><strong>Protección de datos:</strong> <a href="mailto:dpo@beloq.es">dpo@beloq.es</a><br />
        <strong>Atención general:</strong> <a href="mailto:info@beloq.es">info@beloq.es</a></p>
      <p><strong>Autoridad de control:</strong> Agencia Española de Protección de Datos (AEPD) — <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">https://www.aepd.es</a></p>
    </LegalPage>
  );
}
