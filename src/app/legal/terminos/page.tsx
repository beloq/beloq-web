import LegalPage from "../../components/LegalPage";
import Link from "next/link";

export const metadata = {
  title: "Términos y Condiciones - Beloq",
  description: "Términos y condiciones de uso de beloq — Beloq Movilidad SL.",
};

export default function TerminosCondiciones() {
  return (
    <LegalPage title="Términos y Condiciones de Uso" version="1.3" date="29 de abril de 2026">
      <h2>1. Aceptación de los Términos</h2>
      <p>Estos Términos y Condiciones (en adelante, &quot;Términos&quot;) regulan el uso de la aplicación móvil beloq (disponible en iOS y Android) y de la plataforma web beloq.es (en adelante, conjuntamente, &quot;el Servicio&quot;).</p>
      <p>Al registrarte, acceder o utilizar el Servicio, aceptas estos Términos en su totalidad. Si no estás de acuerdo, no podrás utilizar beloq. El uso continuado del Servicio tras la publicación de cambios implica la aceptación de la versión actualizada.</p>
      <p>El Servicio es titularidad de <strong>Beloq Movilidad SL</strong> (Sociedad Limitada con declaración de unipersonalidad inscrita en el Registro Mercantil; socio único: D. Jesús Gracia Casani; en adelante, &quot;beloq&quot;), con CIF B24990814, D-U-N-S 473117119, domicilio social en Calle Joan Verdeguer 116, 4 — 46024 València (España), e inscrita en el Registro Mercantil de Valencia, hoja registral V-231009, inscripción 1.ª, de fecha 26 de diciembre de 2025. Folio electrónico (IRUS): 1000463742257. BORME: BORME-A-2026-2-46. Sociedad constituida mediante escritura otorgada el 4 de diciembre de 2025 ante el notario de Valencia D. Jorge Barberá Pichó, protocolo número 6145.</p>

      <h2>2. Descripción del Servicio</h2>
      <p>beloq es un sistema de estacionamiento inteligente para bicicletas y vehículos de movilidad personal (VMP) —como patinetes eléctricos— que funciona mediante módulos electromecánicos IoT gestionados a través de una aplicación móvil.</p>
      <p>El servicio funciona así: desbloqueas un módulo desde la app, estacionas tu vehículo, el módulo lo asegura, y cuando quieres irte, desbloqueas desde la app y te llevas tu vehículo. Durante la custodia, beloq se encarga de la seguridad del anclaje.</p>
      <p>beloq opera bajo un modelo B2B2C: beloq proporciona la infraestructura a operadores e instituciones (universidades, ayuntamientos, empresas), que son quienes ofrecen el servicio de aparcamiento a los usuarios finales.</p>

      <h2>3. Planes y modelo de uso</h2>
      <p>beloq ofrece un modelo gratuito complementado con <strong>abonos mensuales de aparcamiento físico</strong> que dan acceso preferente a la infraestructura física de aparcamiento (módulos IoT con electrocierre instalados en ubicaciones físicas):</p>
      <p><strong>Plan Gratuito (Freemium):</strong> Incluye un número limitado de horas de uso diarias sin coste. Tras agotar las horas gratuitas, se aplica la tarifa vigente definida por el operador o institución que gestiona la estación. El usuario puede ganar horas adicionales gratuitas mediante la visualización de anuncios, la participación en encuestas o las promociones que active el operador.</p>
      <p><strong>Abonos mensuales de aparcamiento físico (Beloquer Flow y Beloquer Max):</strong> Son abonos físicos que incluyen más horas de uso diarias, capacidad de reserva anticipada de módulo, prioridad de acceso frente a usuarios gratuitos, y acceso a funcionalidades futuras como la recarga de vehículos eléctricos cuando esté disponible. <strong>No son suscripciones digitales</strong>: son abonos a un servicio físico de aparcamiento prestado fuera de la aplicación móvil mediante hardware físico (módulos electromecánicos IoT) instalado en ubicaciones físicas.</p>
      <p>Las condiciones concretas de cada abono, incluyendo el número de horas incluidas y las funcionalidades disponibles, se muestran siempre de forma actualizada en la app antes de contratar.</p>

      <h2>4. Registro y cuenta de usuario</h2>

      <h3>4.1 Requisitos</h3>
      <p>Para usar beloq necesitas crear una cuenta. El identificador canónico de la cuenta es <strong>tu número de teléfono móvil</strong>, verificado mediante código SMS-OTP. Es obligatorio facilitar tu número de teléfono, nombre completo, apellidos, dirección de email (Beloq no verifica activamente el email; sólo se valida si activas Google Sign-In) y fecha de nacimiento. Como métodos de autenticación se admiten <strong>SMS-OTP</strong> y <strong>passkeys</strong> (Google Sign-In, Apple Touch ID / Face ID y biometría Android). Windows Hello no se admite.</p>
      <p><strong>Edad mínima:</strong> Debes tener al menos <strong>14 años</strong> para registrarte y utilizar beloq, conforme al artículo 7 de la LOPDGDD. Si eres menor de 14 años, no podrás crear una cuenta.</p>
      <p>Cada persona puede tener una única cuenta. Está prohibido crear cuentas múltiples o compartir credenciales de acceso con terceros.</p>

      <h3>4.2 Consentimientos en el registro</h3>
      <p>Durante el registro, deberás marcar de forma activa (sin premarcado) los siguientes consentimientos:</p>
      <ul>
        <li><strong>Aceptación de estos Términos y Condiciones</strong> (obligatorio para completar el registro).</li>
        <li><strong>Confirmación de lectura de la <Link href="/legal/privacidad">Política de Privacidad</Link></strong> (obligatorio).</li>
        <li><strong>Recepción de comunicaciones comerciales</strong> (opcional; puedes activarlo o desactivarlo en cualquier momento desde la app).</li>
      </ul>

      <h3>4.3 Gestión y eliminación de cuenta</h3>
      <p>Puedes modificar tus datos personales en cualquier momento desde la sección &quot;Ajustes&quot; de la app. Si deseas eliminar tu cuenta, puedes hacerlo desde Ajustes → &quot;Eliminar mi cuenta&quot;. El proceso incluye una confirmación doble por seguridad, y tus datos personales serán anonimizados. La eliminación de la cuenta <strong>no se puede ejecutar mientras haya una sesión activa</strong> (vehículo aparcado en un módulo Beloq): primero deberás cerrar la sesión legítimamente. La eliminación de la cuenta tampoco cancela las deudas pendientes ni las sanciones pendientes que pudieran existir, las cuales permanecen ligadas al hash SHA-256 de tu número de teléfono. Para más detalles sobre datos conservados, plazos y excepciones, consulta la <Link href="/legal/privacidad">Política de Privacidad — Sección 6.bis (Eliminación de cuenta)</Link>.</p>

      <h3>4.4 Identidad de la cuenta y recuperación</h3>
      <p><strong>El número de teléfono móvil es el identificador canónico de tu cuenta Beloq.</strong> Si pierdes el acceso definitivo a tu número (cambio de operador sin portabilidad, baja, robo sin recuperación), perderás el acceso a tu cuenta y a los datos asociados. Las sanciones pendientes permanecen ligadas al número original. Beloq no ofrece flujo público de recuperación de cuenta. En casos excepcionales, el soporte podrá gestionar manualmente cambios de identidad previa verificación rigurosa, escribiendo a <strong>info@beloq.es</strong> con copia de DNI.</p>

      <h2>5. Uso del Servicio</h2>

      <h3>5.1 Proceso de estacionamiento</h3>
      <p>El flujo normal de uso es el siguiente:</p>
      <ul>
        <li><strong>Desbloqueo:</strong> Desde la app, seleccionas un módulo disponible y lo desbloqueas (escaneando su QR o desde el mapa).</li>
        <li><strong>Estacionamiento:</strong> Insertas la rueda de tu vehículo en la ranura del módulo y esperas a que la cerradura cierre completamente (indicado por LED verde y señal sonora).</li>
        <li><strong>Confirmación:</strong> Fotografías tu vehículo desde la app para generar evidencia del aparcamiento correcto. Debes confirmar en un plazo de 60 segundos tras el desbloqueo.</li>
        <li><strong>Recogida:</strong> Cuando quieras recoger tu vehículo, desbloqueas desde la app y lo retiras.</li>
      </ul>

      <h3>5.2 Sesiones y duración</h3>
      <p>Una sesión comprende desde el momento de la confirmación del estacionamiento hasta el desbloqueo de salida. La duración de la sesión determina el coste aplicable según la tarifa vigente del operador, una vez agotadas las horas incluidas en tu plan.</p>

      <h2>6. Tarifas y pagos</h2>

      <h3>6.1 Estructura de precios</h3>
      <p>Las tarifas de uso son establecidas por cada operador o institución y se muestran de forma clara en la app antes de cada sesión. Todos los precios incluyen IVA.</p>
      <p>beloq no cobra directamente a los usuarios finales: los ingresos generados por el uso del servicio son gestionados por el operador o institución titular de la estación.</p>

      <h3>6.2 Método de pago</h3>
      <p>Los pagos se procesan a través de <strong>Stripe Payments Europe Ltd.</strong> (Dublín, Irlanda), un procesador de pagos certificado PCI-DSS. beloq no almacena en ningún momento los datos de tu tarjeta de crédito o débito; estos se gestionan de forma segura por Stripe.</p>
      <p>El cobro funciona a posteriori: al finalizar una sesión, si la duración ha generado un coste, se carga automáticamente en el método de pago registrado. Si el cobro falla, la deuda queda pendiente en tu cuenta.</p>

      <h3>6.3 Abonos físicos y exención de In-App Purchase (Apple Guideline 3.1.3(e))</h3>
      <p>Los abonos mensuales de Beloq dan derecho a acceso preferente a infraestructura física de aparcamiento (módulos IoT con electrocierre instalados en ubicaciones físicas). El pago se procesa a través de Stripe (Irlanda) por tratarse de servicios físicos prestados fuera de la aplicación móvil. Esta modalidad de cobro está amparada en la <strong>Guideline 3.1.3(e)</strong> del App Store Review de Apple (&quot;Goods and Services Outside of the App&quot;), que exime del uso obligatorio de In-App Purchase a los servicios físicos no consumibles dentro de la app.</p>

      <h3>6.4 Reembolsos</h3>
      <p>Puedes solicitar un reembolso en los siguientes casos: módulo defectuoso que impide el desbloqueo, error del sistema (cobro duplicado o cálculo incorrecto de duración) o penalización aplicada por un fallo técnico del módulo. Para solicitarlo, contacta con info@beloq.es. El plazo de resolución es inferior a 7 días laborables, y beloq asume los costes de gestión del reembolso.</p>

      <h2>7. Penalizaciones</h2>
      <p>Si dejas un módulo en estado inseguro durante más de 60 segundos (cerradura desbloqueada sin vehículo anclado), se aplicará una penalización equivalente a <strong>0,45 €/hora</strong> —la misma tarifa que el uso normal del servicio—, calculada desde el momento en que termina el periodo de gracia de 60 segundos hasta el momento en que el módulo vuelve a estado seguro. No hay importe máximo por penalización individual. Esta penalización se comunica de forma inmediata mediante notificación push y por email.</p>
      <p>Si otro usuario asegura el módulo en tu nombre dentro de los primeros 2 minutos desde el inicio de la penalización, ésta se anula automáticamente y no se te cobra nada.</p>
      <p>beloq puede modificar esta tarifa con un mínimo de 30 días de aviso por email y notificación en la app, conforme a lo previsto en la sección 13.</p>
      <p>Si consideras que una penalización es injusta (por ejemplo, porque el módulo presentó un fallo técnico y no cerró correctamente), puedes disputarla enviando un email a info@beloq.es con la evidencia disponible. beloq revisará los registros técnicos del módulo y, si procede, anulará la penalización y realizará el reembolso correspondiente.</p>

      <h2>8. Responsabilidad por robo o daños al vehículo</h2>

      <h3>8.1 Cuándo beloq es responsable</h3>
      <p>beloq asume responsabilidad por robo o daños a tu vehículo <strong>siempre que</strong> hayas completado correctamente el proceso de confirmación de estacionamiento:</p>
      <ul>
        <li>Fotografiaste tu vehículo desde la app al estacionar.</li>
        <li>La foto muestra el vehículo correctamente anclado en el módulo (rueda insertada, cerradura cerrada, vehículo estable).</li>
        <li>El sistema confirmó &quot;Parking confirmado&quot; dentro del plazo de 60 segundos.</li>
      </ul>
      <p>En estos casos, la cobertura se gestiona a través de la póliza de Responsabilidad Civil de beloq. El procedimiento consiste en reportar el incidente dentro de las 24 horas siguientes a través de la app, tras lo cual beloq revisará la evidencia fotográfica y los registros técnicos. La resolución se produce en un plazo máximo de 30 días.</p>

      <h3>8.2 Cuándo beloq NO es responsable</h3>
      <p>beloq no asume responsabilidad en los siguientes supuestos: si no completaste la confirmación fotográfica o la foto no muestra un anclaje correcto; si el incidente ocurrió fuera del periodo de custodia (antes de anclar o después de desbloquear); en casos de fuerza mayor (incendio, inundación, vandalismo ajeno al módulo); o por negligencia del usuario.</p>

      <h3>8.3 Daños al módulo por parte del usuario</h3>
      <p>El usuario se compromete a hacer un uso adecuado del módulo beloq. En caso de daños intencionados o negligencia grave (vandalismo, manipulación del hardware o firmware, uso de fuerza excesiva), beloq se reserva el derecho a reclamar los costes de reparación. Los daños derivados del uso normal están cubiertos por el servicio.</p>

      <h2>9. Prohibiciones</h2>
      <p>Queda expresamente prohibido:</p>
      <ul>
        <li>Estacionar vehículos que no sean de tu propiedad sin autorización del propietario.</li>
        <li>Dejar un módulo desbloqueado sin vehículo anclado durante más de 60 segundos.</li>
        <li>Utilizar el servicio con fines comerciales sin un contrato B2B con beloq (por ejemplo, empresas de reparto o alquiler de bicicletas).</li>
        <li>Manipular el hardware o firmware de los módulos (destornillar, flashear firmware, abrir carcasas).</li>
        <li>Realizar ingeniería inversa sobre el software, API o protocolos de comunicación de beloq.</li>
        <li>Automatizar el uso del servicio mediante bots, scripts o herramientas de scraping.</li>
        <li>Crear cuentas múltiples o compartir credenciales.</li>
      </ul>
      <p>Las consecuencias de estas infracciones incluyen penalizaciones económicas, suspensión o cancelación de la cuenta y, en casos de vandalismo, sabotaje o hackeo, denuncia ante las autoridades competentes y reclamación de daños.</p>

      <h2>10. Suspensión y terminación de cuenta</h2>

      <h3>10.1 Suspensión automática</h3>
      <p>Tu cuenta puede ser suspendida automáticamente si acumulas deuda pendiente por encima del umbral establecido por el operador, o si se produce un chargeback (reclamación de cargo injustificada a través de tu banco).</p>

      <h3>10.2 Suspensión por revisión</h3>
      <p>beloq puede suspender tu cuenta para revisión en caso de penalizaciones acumuladas, reportes múltiples de vandalismo asociados a tu cuenta o reclamaciones fraudulentas reiteradas.</p>

      <h3>10.3 Terminación definitiva</h3>
      <p>Se procederá a la terminación definitiva de la cuenta en caso de vandalismo comprobado, hackeo o manipulación del sistema, o impago reiterado (tras tres intentos de cobro fallidos y 30 días sin regularizar).</p>
      <p>En todos los casos, serás notificado por email con la causa de la suspensión o terminación, dispondrás de 7 días laborables para presentar alegaciones, y beloq emitirá una decisión final en 48 horas tras recibir las alegaciones. Puedes ejercer tu derecho de supresión de datos en cualquier momento conforme al RGPD.</p>

      <h2>11. Disponibilidad del Servicio</h2>
      <p>beloq trabaja para ofrecer un servicio disponible las 24 horas del día, los 7 días de la semana. No obstante, en la fase actual del servicio no se garantiza un porcentaje de disponibilidad específico.</p>
      <p>Pueden producirse interrupciones temporales por mantenimiento técnico (inferiores a 2 horas) sin previo aviso. Las actualizaciones de firmware de los módulos se realizan de forma remota (OTA) sin interrumpir el servicio.</p>
      <p>Si un módulo no desbloquea correctamente, puedes reportar la incidencia desde la app y se realizará un reembolso automático de la sesión. Para emergencias (si tu vehículo queda bloqueado), el equipo de soporte realizará un desbloqueo remoto en un plazo inferior a 15 minutos. Puedes contactar con soporte técnico en info@beloq.es (respuesta en menos de 24 horas laborables).</p>

      <h2>12. Propiedad intelectual</h2>

      <h3>12.1 Derechos de beloq</h3>
      <p>Todo el software (backend, frontend, firmware), el diseño industrial de los módulos, el contenido de la app y la web (textos, imágenes, vídeos) y la marca &quot;beloq&quot; (marca figurativa registrada OEPM M4364283, publicación BOPI 29-abr-2026) son propiedad exclusiva de Beloq Movilidad SL.</p>
      <p>Queda prohibida la reproducción, distribución, modificación o uso de cualquier elemento del Servicio sin autorización previa y por escrito de beloq.</p>

      <h3>12.2 Contenido del usuario (fotos de evidencia)</h3>
      <p>Las fotografías que tomes de tu vehículo al estacionar siguen siendo de tu propiedad. Al subirlas, concedes a beloq una licencia no exclusiva, gratuita y limitada para utilizarlas exclusivamente con fines de verificación operativa (comprobar el correcto anclaje), resolución de disputas y gestión de reclamaciones ante la aseguradora.</p>
      <p>beloq no utilizará tus fotos para marketing, publicidad, redes sociales ni las cederá a terceros. Las fotos se eliminan automáticamente a los 90 días de la sesión, o antes si eliminas tu cuenta.</p>

      <h2>13. Protección de datos</h2>
      <p>beloq trata tus datos personales conforme al Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales (LOPDGDD). Puedes consultar todos los detalles sobre qué datos recogemos, para qué los usamos, con quién los compartimos y cómo ejercer tus derechos en nuestra <Link href="/legal/privacidad">Política de Privacidad</Link>.</p>
      <p>Consulta también nuestro <Link href="/legal/aviso-legal">Aviso Legal</Link> y nuestra <Link href="/legal/cookies">Política de Cookies</Link>.</p>

      <h2>14. Servicios de terceros</h2>
      <p>El Servicio utiliza plataformas y servicios de terceros necesarios para su funcionamiento:</p>
      <ul>
        <li><strong>Google Maps Platform:</strong> Para la visualización de estaciones y geolocalización. Su uso implica la aceptación de los términos de Google Maps.</li>
        <li><strong>Stripe:</strong> Para el procesamiento seguro de pagos. beloq no almacena datos de tarjetas. Puedes consultar la política de privacidad de Stripe en stripe.com/privacy.</li>
        <li><strong>Firebase (Google):</strong> Para autenticación, almacenamiento de fotos de evidencia y notificaciones push.</li>
      </ul>

      <h2>15. Modificación de los Términos</h2>
      <p>beloq puede modificar estos Términos. Te notificaremos cualquier cambio con un mínimo de 30 días de antelación por email y mediante aviso en la app. Si los cambios son sustanciales (por ejemplo, modificación del modelo de precios o introducción de videovigilancia), requeriremos tu aceptación explícita.</p>
      <p>Si no estás de acuerdo con los nuevos Términos, puedes eliminar tu cuenta antes de su entrada en vigor. Si continúas utilizando el Servicio tras el periodo de 30 días, se entenderá que aceptas la versión actualizada.</p>

      <h2>16. Ley aplicable y jurisdicción</h2>
      <p>Estos Términos se rigen por la legislación española. Para cualquier controversia, ambas partes se someten a los Juzgados y Tribunales de Valencia (España), sin perjuicio del derecho de los consumidores a acudir a los tribunales de su domicilio conforme al artículo 90 del Real Decreto Legislativo 1/2007.</p>

      <h2>17. Resolución de disputas</h2>

      <h3>Soporte y reclamaciones</h3>
      <p>Si tienes cualquier problema, contacta con nosotros en <strong>info@beloq.es</strong> indicando el email de tu cuenta, la fecha y hora del incidente y una descripción detallada. El plazo de respuesta es inferior a 7 días laborables.</p>
      <p>Si no estás satisfecho con la resolución, puedes presentar una reclamación formal por escrito al mismo email, que será revisada y respondida de forma motivada en un plazo máximo de 15 días.</p>

      <h3>Organismos externos</h3>
      <p>Si la discrepancia persiste, puedes acudir a la autoridad de consumo competente (OMIC Valencia o la oficina autonómica correspondiente), a la Plataforma de Resolución de Litigios en Línea de la UE en <Link href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</Link>, o a la Agencia Española de Protección de Datos (<Link href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">https://www.aepd.es</Link>) para cuestiones relacionadas con privacidad.</p>

      <h2>18. Contacto</h2>
      <p><strong>Beloq Movilidad SL</strong> (Sociedad Limitada Unipersonal según Art. 12 LSC; socio único: D. Jesús Gracia Casani)</p>
      <p><strong>CIF:</strong> B24990814</p>
      <p><strong>D-U-N-S:</strong> 473117119</p>
      <p><strong>Domicilio:</strong> Calle Joan Verdeguer 116, 4 — 46024 València, España</p>
      <p><strong>Inscripción registral:</strong> Inscrita en el Registro Mercantil de Valencia, hoja registral V-231009, inscripción 1.ª, de fecha 26 de diciembre de 2025. Folio electrónico (IRUS): 1000463742257. BORME: BORME-A-2026-2-46. Sociedad constituida mediante escritura otorgada el 4 de diciembre de 2025 ante el notario de Valencia D. Jorge Barberá Pichó, protocolo número 6145.</p>
      <p><strong>Email general / protección de datos:</strong> info@beloq.es</p>
    </LegalPage>
  );
}
