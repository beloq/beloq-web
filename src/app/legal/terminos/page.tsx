import Link from "next/link";
import LegalPage from "../../components/LegalPage";
import PricingTable from "../../components/PricingTable";

// Texto: beloq-backend/docs/Terminos, condiciones, privacidad y legal/ (fuente única).
// Se genera desde el Markdown; no editar a mano sin cambiar también el origen.
export const metadata = {
  title: "Términos y Condiciones · beloq",
  description: "Términos y condiciones de uso de beloq — Beloq Movilidad SL.",
};

export default function TerminosCondiciones() {
  return (
    <LegalPage title="Términos y Condiciones de Uso" version="1.4" date="11 de octubre de 2026">
      <h2>1. Aceptación de los Términos</h2>
      <p>Estos Términos y Condiciones (en adelante, &quot;Términos&quot;) regulan el uso de la aplicación móvil beloq (disponible en iOS y Android), de la web beloq.es y de los módulos de aparcamiento beloq (en adelante, conjuntamente, &quot;el Servicio&quot;).</p>
      <p>Al registrarte, acceder o utilizar el Servicio, aceptas estos Términos en su totalidad. Si no estás de acuerdo, no podrás utilizar beloq.</p>
      <p>El Servicio es titularidad de <strong>Beloq Movilidad SL</strong> (Sociedad Limitada con declaración de unipersonalidad inscrita en el Registro Mercantil; socio único: D. Jesús Gracia Casani; en adelante, &quot;beloq&quot;), con CIF B24990814, D-U-N-S 473117119, domicilio social en Calle Joan Verdeguer 116, 4 — 46024 València (España), e inscrita en el Registro Mercantil de Valencia, hoja registral V-231009, inscripción 1.ª, de fecha 26 de diciembre de 2025. Folio electrónico (IRUS): 1000463742257. BORME: BORME-A-2026-2-46. Sociedad constituida mediante escritura otorgada el 4 de diciembre de 2025 ante el notario de Valencia D. Jorge Barberá Pichó, protocolo número 6145.</p>
      <h2>2. Descripción del Servicio</h2>
      <p>beloq es un sistema de aparcamiento seguro en la calle para bicicletas y vehículos de movilidad personal (VMP), como patinetes eléctricos. Cada estación tiene módulos electromecánicos conectados (&quot;beloqs&quot;): los abres con el móvil, anclas tu vehículo bajando la barra y beloq lo custodia hasta que vuelves a por él.</p>
      <p>beloq es una empresa <strong>B2B</strong>: diseña, fabrica y opera la infraestructura para operadores e instituciones (universidades, ayuntamientos, empresas), que ofrecen el servicio de aparcamiento a sus usuarios.</p>
      <p><strong>Estaciones piloto.</strong> En las estaciones piloto que opera directamente beloq, para validar el producto, Beloq Movilidad SL cobra a los usuarios los abonos y las tarifas descritos en estos Términos. Es un cobro experimental y sin ánimo de lucro, que cubre en parte los gastos de operación del piloto. En las estaciones de un operador o institución, las condiciones económicas pueden ser las suyas; si es así, la app te lo indicará antes de usar la estación.</p>
      <h2>3. Planes</h2>
      <h3>3.1 Beloquer (gratuito)</h3>
      <p>Incluye cada día un tiempo de aparcamiento gratis. El día cuenta de 03:00 a 03:00 (hora de Madrid). Con tu vehículo dentro puedes ver anuncios de la comunidad beloq en la app: cada uno suma minutos gratis a ese día, hasta el máximo diario. Si ya se estaba cobrando tiempo extra, el anuncio lo pausa. Las horas gratis, los minutos por anuncio y el máximo diario son los publicados en la app y en <Link href="/info">beloq.es/info</Link>.</p>
      <h3>3.2 Abonos Beloquer Flow y Beloquer Max</h3>
      <p>Son <strong>abonos de aparcamiento físico de 30 días</strong>, de pago único y <strong>sin renovación automática</strong>. Dan más tiempo gratis al día y permiten reservar un beloq con antelación (dispones de 15 minutos para llegar). El precio, las horas incluidas y la fecha de fin se muestran en la app antes de pagar.</p>
      <ul>
        <li><strong>Inicio y fin.</strong> El abono empieza en el momento del pago. El día de la compra ya cuenta con las horas del abono, y el abono vale hasta las 03:00 del día siguiente al trigésimo, que en la app aparece como «hasta el día X incluido».</li>
        <li><strong>Renovar.</strong> Cuando a tu abono le quedan 30 días o menos, puedes comprar otro del mismo plan: se suma a continuación del que tienes.</li>
        <li><strong>Subir de Flow a Max.</strong> Max empieza al momento y del precio se descuenta la parte no usada de tu Flow, proporcional al tiempo que le quedaba. El Flow sustituido termina en ese momento.</li>
        <li><strong>Bajar de Max a Flow.</strong> Podrás comprar Flow cuando termine tu Max.</li>
        <li>Los abonos son personales e intransferibles y no se pueden canjear por dinero, salvo lo previsto en §6.5.</li>
      </ul>
      <p>Los abonos <strong>no son suscripciones digitales</strong>: son un servicio físico de aparcamiento prestado fuera de la app, en módulos instalados en la calle.</p>
      <h3>3.3 Pruebas gratis e invitaciones</h3>
      <ul>
        <li><strong>Códigos de prueba.</strong> beloq puede repartir códigos que dan unos días de Flow o Max sin coste. Solo se pueden canjear desde el plan gratuito, una vez por persona (por cuenta y por número de móvil), y no se cambian por dinero.</li>
        <li><strong>Invitaciones.</strong> Cada usuario tiene un código para invitar. Si una persona lo introduce en sus primeros 7 días desde el alta, antes de usar beloq por primera vez, y termina su primera custodia, quien la invitó recibe días gratis de Beloquer Flow. Solo los recibe si en ese momento está en el plan gratuito, y con un máximo de regalos por año. Los días y el máximo son los publicados en la app. No hay ninguna contraprestación económica.</li>
        <li>beloq puede modificar o terminar estos programas, y anular los regalos obtenidos con cuentas falsas, móviles ajenos o cualquier otro abuso.</li>
      </ul>
      <h2>4. Registro y cuenta de usuario</h2>
      <h3>4.1 Requisitos</h3>
      <p>Para usar la app necesitas crear una cuenta. El identificador de la cuenta es <strong>tu número de teléfono móvil</strong>, verificado con un código por SMS: es lo primero que se registra y el que carga con las deudas pendientes. Es obligatorio facilitar tu número de teléfono, nombre, apellidos, correo electrónico y fecha de nacimiento. El correo <strong>se verifica</strong> con un código (o lo verifica Google o Apple si te registras con ellos): toda cuenta tiene, además del número, al menos una segunda llave de acceso (correo verificado, Google o Apple). Para entrar se admiten el código por SMS, el código al correo verificado, Google, Apple y las passkeys (huella o cara del móvil). No hay contraseñas.</p>
      <p><strong>Edad mínima:</strong> debes tener al menos <strong>14 años</strong>, conforme al artículo 7 de la LOPDGDD.</p>
      <p>Cada persona puede tener una única cuenta. Está prohibido crear cuentas múltiples o compartir las llaves de acceso con terceros.</p>
      <h3>4.2 Consentimientos en el registro</h3>
      <p>Durante el registro marcas de forma activa (sin casillas premarcadas):</p>
      <ul>
        <li><strong>Aceptación de estos Términos</strong> (obligatoria).</li>
        <li><strong>Lectura de la Política de Privacidad</strong> (obligatoria).</li>
        <li><strong>Recepción de novedades por correo</strong> (opcional; puedes cambiarlo cuando quieras en «Tu cuenta»).</li>
      </ul>
      <h3>4.3 Gestión y eliminación de la cuenta</h3>
      <p>Puedes ver y cambiar tus datos en «Tu cuenta», dentro de la app. Para eliminar la cuenta: «Tu cuenta» → «Eliminar mi cuenta», o como se explica en <Link href="/legal/borrar-cuenta">beloq.es/legal/borrar-cuenta</Link>. La eliminación es inmediata y no se puede deshacer: se anonimizan tus datos personales, se borran tus tarjetas guardadas y el abono que tengas en vigor se pierde, salvo que estés dentro del plazo de desistimiento (§6.5).</p>
      <p>No se puede eliminar la cuenta <strong>mientras tengas un vehículo en un beloq</strong>: primero retíralo. La eliminación no cancela las deudas pendientes, que quedan ligadas al hash de tu número de teléfono hasta que se pagan. Los detalles de lo que se conserva y durante cuánto tiempo están en la <strong>Política de Privacidad, sección 6.bis</strong>.</p>
      <h3>4.4 Identidad de la cuenta y recuperación</h3>
      <p>Puedes cambiar tu número desde la app («Tu cuenta» → «Métodos de acceso») verificando el nuevo por SMS. Sin tu número puedes entrar con las otras llaves: correo verificado, Google, Apple o passkeys. <strong>Si pierdes a la vez tu número y todas tus llaves, la cuenta no se puede recuperar</strong>: beloq no ofrece recuperación manual de cuentas.</p>
      <h2>5. Uso del Servicio</h2>
      <h3>5.1 Abrir un beloq</h3>
      <p>Desde la app, junto a la estación, puedes abrir un beloq de tres formas: pulsando «DESBLOQUEAR», pasando el móvil por su etiqueta NFC o leyendo su código QR con la cámara del móvil. Para abrirlo hay que estar a menos de 500 metros de la estación, con la ubicación del móvil activada, y confirmar con tu huella o tu cara. Antes de abrirse, el beloq pita y parpadea para que sepas cuál es el tuyo.</p>
      <h3>5.2 Aparcar</h3>
      <p>Sube la barra, mete la rueda de tu vehículo y baja la barra con firmeza hasta oír <strong>el clic y el doble pitido</strong>: el vehículo queda anclado. Después, la app te pide que confirmes cómo ha quedado aparcado. Desde que se abre el beloq tienes <strong>5 minutos</strong> para dejarlo anclado. Pasado el primer minuto, el beloq pita y la app te avisa cada minuto.</p>
      <h3>5.3 Custodia</h3>
      <p>La custodia empieza cuando la barra queda anclada (clic y doble pitido) y termina cuando desbloqueas el beloq para retirar tu vehículo. Si la barra no llega a anclarse, la custodia no empieza.</p>
      <h3>5.4 Retirar</h3>
      <p>Desbloquea el beloq desde la app con tu huella o tu cara, saca tu vehículo y vuelve a bajar la barra hasta oír el clic. También tienes 5 minutos para dejarla anclada.</p>
      <h3>5.5 Mantenimiento y falta de señal</h3>
      <p>Si un beloq entra en mantenimiento o se queda sin señal con tu vehículo dentro, el vehículo sigue anclado y custodiado, pero no podrás desbloquearlo hasta que se resuelva. Mientras dure el mantenimiento no se descuenta tu tiempo gratis ni corre el tiempo extra. Te avisamos en cuanto puedas retirarlo; si te urge, escríbenos (§17).</p>
      <h3>5.6 Uso sin la app</h3>
      <p>Sin la app, pasando el móvil por la etiqueta del beloq se abre una web desde la que se puede usar sin cuenta. Se hace una retención (fianza) en tu tarjeta, por el importe publicado, que se libera al terminar. La fianza se cobra si no anclas el vehículo en 5 minutos, si dejas la barra abierta al retirarlo o si pasan 3 horas sin recogerlo.</p>
      <h2>6. Tarifas y pagos</h2>
      <h3>6.1 Quién cobra y qué se cobra</h3>
      <p>En las estaciones piloto cobra <strong>Beloq Movilidad SL</strong> (§2). Se pueden cobrar:</p>
      <ul>
        <li><strong>Los abonos</strong> Flow y Max (§3.2), al comprarlos.</li>
        <li><strong>El tiempo extra:</strong> cuando el uso de un día supera su tiempo gratis, se cobra cada minuto empezado de más a la tarifa por hora publicada. Se calcula al terminar la custodia y se suma a tu cuenta. La app te avisa antes de empezar a cobrarlo.</li>
        <li><strong>Las penalizaciones</strong> por dejar un beloq abierto (§7).</li>
      </ul>
      <p>Las tarifas y los precios vigentes se publican en la app y en <Link href="/info">beloq.es/info</Link>. Todos incluyen IVA. Los cambios de precio se avisan conforme a §15 y nunca afectan a un abono ya pagado.</p>
      <PricingTable titulo="h3" />
      <h3>6.2 Método de pago</h3>
      <p>Los pagos se procesan con <strong>Stripe Payments Europe Ltd.</strong> (Dublín, Irlanda), procesador certificado PCI-DSS. Si guardas una tarjeta, la guarda Stripe, no beloq: beloq solo ve la marca, los cuatro últimos números y la caducidad. Puedes ver, elegir la predeterminada, añadir o quitar tus tarjetas en «Tu cuenta».</p>
      <h3>6.3 Deuda y cobro automático</h3>
      <p>Lo cobrado por tiempo extra y penalizaciones se acumula como deuda en tu cuenta. Si tienes una tarjeta guardada, beloq puede cobrar la deuda en tu tarjeta predeterminada cuando llegue al umbral publicado. Si ese cobro falla, la deuda sigue pendiente y te avisamos. Mientras tu deuda supere el umbral no podrás abrir un beloq nuevo hasta pagarla desde la app, pero <strong>siempre podrás retirar tu vehículo</strong>.</p>
      <h3>6.4 Abonos de aparcamiento físico y App Store (Guideline 3.1.3(e))</h3>
      <p>Los abonos dan acceso a un servicio físico de aparcamiento prestado fuera de la app. Por eso el pago se procesa con Stripe y no con las compras integradas de Apple o de Google, como permiten la <strong>Guideline 3.1.3(e)</strong> de Apple (&quot;Goods and Services Outside of the App&quot;) y la política de pagos de Google Play para bienes y servicios físicos.</p>
      <h3>6.5 Desistimiento y reembolsos</h3>
      <ul>
        <li><strong>Desistimiento de un abono.</strong> Tienes 14 días naturales desde la compra para desistir, sin dar explicaciones. Como el abono empieza en cuanto lo pagas, a petición tuya, te devolvemos la parte no usada, proporcional al tiempo que le queda. Pídelo por el chat de <Link href="/info">beloq.es/info</Link> o en <a href="mailto:info@beloq.es">info@beloq.es</a>; la devolución se hace en la misma tarjeta en un máximo de 14 días.</li>
        <li><strong>Fallos del servicio.</strong> También puedes pedir un reembolso si un beloq defectuoso no se abre, por un error del sistema (cobro duplicado o cálculo incorrecto) o por una penalización causada por un fallo técnico del beloq. Escríbenos a <a href="mailto:info@beloq.es">info@beloq.es</a> o por el chat; lo resolvemos en menos de 7 días laborables, sin coste para ti.</li>
      </ul>
      <h2>7. Penalizaciones</h2>
      <p>Si un beloq queda abierto más de <strong>5 minutos</strong> sin un vehículo anclado, al aparcar o al retirar, se cobra la tarifa por hora publicada desde que terminan esos 5 minutos hasta que la barra queda anclada, la anclas tú o cualquier otra persona. No hay importe máximo. Te avisamos en el momento por notificación, SMS y correo.</p>
      <p>Si consideras que una penalización es injusta (por ejemplo, porque el beloq falló y no ancló), puedes disputarla por el chat o en <a href="mailto:info@beloq.es">info@beloq.es</a>. beloq revisará los registros técnicos del beloq y, si procede, la anulará y te devolverá lo cobrado.</p>
      <h2>8. Responsabilidad por robo o daños al vehículo</h2>
      <h3>8.1 Cuándo beloq es responsable</h3>
      <p>beloq responde del robo o de los daños a tu vehículo <strong>durante la custodia</strong> (§5.3), es decir, desde que la barra quedó anclada hasta que la desbloqueaste para retirarlo. La cobertura se gestiona con la póliza de Responsabilidad Civil de beloq. Comunica el incidente en las 24 horas siguientes desde la app (botón de reportar del beloq) o en <a href="mailto:info@beloq.es">info@beloq.es</a>; beloq revisará los registros técnicos del beloq y lo resolverá en un máximo de 30 días.</p>
      <h3>8.2 Cuándo beloq NO es responsable</h3>
      <p>Fuera de la custodia (antes de que la barra quede anclada o después de desbloquearla), si la barra no llegó a anclarse, en casos de fuerza mayor (incendio, inundación o vandalismo ajeno al beloq) o por negligencia del usuario.</p>
      <h3>8.3 Daños al módulo por parte del usuario</h3>
      <p>Te comprometes a usar el beloq de forma adecuada. En caso de daños intencionados o negligencia grave (vandalismo, manipulación del hardware o del firmware, uso de fuerza excesiva), beloq podrá reclamar el coste de la reparación. Los daños por el uso normal están cubiertos por el servicio.</p>
      <h2>9. Prohibiciones</h2>
      <p>Queda expresamente prohibido:</p>
      <ul>
        <li>Aparcar vehículos que no sean tuyos sin autorización de su propietario.</li>
        <li>Dejar un beloq abierto sin vehículo anclado más allá de los 5 minutos de §7.</li>
        <li>Utilizar el servicio con fines comerciales sin un contrato con beloq (por ejemplo, empresas de reparto o de alquiler de bicicletas).</li>
        <li>Manipular el hardware o el firmware de los módulos (destornillar, flashear el firmware, abrir carcasas).</li>
        <li>Hacer ingeniería inversa del software, la API o los protocolos de comunicación de beloq.</li>
        <li>Automatizar el uso del servicio con bots, scripts o herramientas de extracción de datos.</li>
        <li>Crear cuentas múltiples, compartir las llaves de acceso o usar móviles ajenos para conseguir pruebas gratis o regalos por invitación.</li>
      </ul>
      <p>Las consecuencias incluyen penalizaciones económicas, la anulación de regalos, la suspensión o cancelación de la cuenta y, en casos de vandalismo, sabotaje o ataque informático, la denuncia ante las autoridades y la reclamación de daños.</p>
      <h2>10. Suspensión y terminación de la cuenta</h2>
      <h3>10.1 Bloqueo por deuda y contracargos</h3>
      <p>Con la deuda por encima del umbral publicado no puedes abrir un beloq nuevo (§6.3). Si se produce un contracargo injustificado (una reclamación de un cargo a través de tu banco sin motivo), beloq puede suspender la cuenta hasta aclararlo.</p>
      <h3>10.2 Suspensión por revisión</h3>
      <p>beloq puede suspender tu cuenta para revisarla en caso de penalizaciones acumuladas, reportes de vandalismo asociados a ella, abuso de los códigos o reclamaciones fraudulentas reiteradas.</p>
      <h3>10.3 Terminación definitiva</h3>
      <p>En caso de vandalismo comprobado, ataque informático o manipulación del sistema, o de deuda no pagada tras haberte avisado y pasados 30 días.</p>
      <p>En todos los casos te avisaremos por correo con la causa, tendrás 7 días laborables para presentar alegaciones y beloq tomará una decisión final en las 48 horas siguientes a recibirlas. Puedes ejercer tu derecho de supresión de datos en cualquier momento conforme al RGPD.</p>
      <h2>11. Disponibilidad del Servicio</h2>
      <p>beloq trabaja para ofrecer el servicio las 24 horas del día, los 7 días de la semana, pero en la fase actual no garantiza un porcentaje de disponibilidad concreto.</p>
      <p>Puede haber interrupciones temporales por mantenimiento técnico (de menos de 2 horas) sin previo aviso. El firmware de los módulos se actualiza a distancia.</p>
      <p>Si un beloq no se abre, repórtalo desde la app: beloq lo revisa y te devuelve lo que se haya cobrado por ese fallo. Si tu vehículo se queda bloqueado, el equipo de soporte puede abrir el beloq a distancia en menos de 15 minutos. Contacto: chat de <Link href="/info">beloq.es/info</Link> o <a href="mailto:info@beloq.es">info@beloq.es</a> (respuesta en menos de 24 horas laborables).</p>
      <h2>12. Propiedad intelectual</h2>
      <h3>12.1 Derechos de beloq</h3>
      <p>Todo el software (servidor, app, web y firmware), el diseño industrial de los módulos, el contenido de la app y de la web (textos, imágenes, vídeos) y la marca &quot;beloq&quot; (marca figurativa registrada OEPM M4364283, publicación BOPI 29-abr-2026) son propiedad exclusiva de Beloq Movilidad SL.</p>
      <p>Queda prohibida la reproducción, distribución, modificación o uso de cualquier elemento del Servicio sin autorización previa y por escrito de beloq.</p>
      <h3>12.2 Lo que nos envías</h3>
      <p>Lo que escribes al reportar un fallo o en el chat de soporte sigue siendo tuyo. Nos permites usarlo solo para atenderte, revisar la incidencia y mejorar el servicio.</p>
      <h2>13. Protección de datos</h2>
      <p>beloq trata tus datos personales conforme al Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD). Qué datos recogemos, para qué, con quién los compartimos y cómo ejercer tus derechos está en nuestra <Link href="/legal/privacidad">Política de Privacidad</Link>.</p>
      <p>Consulta también el <Link href="/legal/aviso-legal">Aviso Legal</Link> y la <Link href="/legal/cookies">Política de Cookies</Link>.</p>
      <h2>14. Servicios de terceros</h2>
      <p>El Servicio usa servicios de terceros necesarios para funcionar:</p>
      <ul>
        <li><strong>Stripe:</strong> pagos y tarjetas guardadas. Política de privacidad: <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">stripe.com/privacy</a>.</li>
        <li><strong>Google (Firebase y Google Cloud):</strong> cuentas y entrada con Google, avisos al móvil, analítica de uso y registro de fallos de la app, y la infraestructura del servicio, alojada en la Unión Europea.</li>
        <li><strong>Apple:</strong> entrada con Apple.</li>
        <li><strong>Brevo:</strong> envío de SMS y correos.</li>
        <li><strong>Stadia Maps:</strong> el mapa de estaciones.</li>
      </ul>
      <h2>15. Modificación de los Términos</h2>
      <p>beloq puede modificar estos Términos. Te avisaremos por correo y en la app con al menos 30 días de antelación. Si no estás de acuerdo, puedes eliminar tu cuenta antes de que entren en vigor; si sigues usando el Servicio después, se entiende que aceptas la versión nueva. Un abono ya pagado mantiene hasta su fin las condiciones con las que se compró.</p>
      <p>La versión vigente se publica siempre en <Link href="/legal/terminos">beloq.es/legal/terminos</Link>, con su número y su fecha.</p>
      <h2>16. Ley aplicable y jurisdicción</h2>
      <p>Estos Términos se rigen por la legislación española. Para cualquier controversia, ambas partes se someten a los Juzgados y Tribunales de Valencia (España), sin perjuicio del derecho de los consumidores a acudir a los tribunales de su domicilio conforme al artículo 90 del Real Decreto Legislativo 1/2007.</p>
      <h2>17. Atención al usuario y reclamaciones</h2>
      <h3>Soporte y reclamaciones</h3>
      <p>Si tienes cualquier problema, escríbenos por el chat de <Link href="/info">beloq.es/info</Link> o a <strong><a href="mailto:info@beloq.es">info@beloq.es</a></strong> indicando el correo o el móvil de tu cuenta, la fecha y hora del incidente y qué ha pasado. Respondemos en menos de 7 días laborables.</p>
      <p>Si no estás satisfecho con la respuesta, puedes presentar una reclamación formal por escrito al mismo correo, que se responderá de forma motivada en un máximo de 15 días.</p>
      <h3>Organismos externos</h3>
      <p>Si la discrepancia persiste, puedes acudir a la autoridad de consumo competente (OMIC de Valencia o la oficina autonómica correspondiente) y, para cuestiones de privacidad, a la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">https://www.aepd.es</a>).</p>
      <h2>18. Contacto</h2>
      <p><strong>Beloq Movilidad SL</strong> (Sociedad Limitada Unipersonal según Art. 12 LSC; socio único: D. Jesús Gracia Casani)<br />
        CIF: B24990814<br />
        D-U-N-S: 473117119<br />
        Domicilio: Calle Joan Verdeguer 116, 4 — 46024 València, España<br />
        Inscripción registral: Inscrita en el Registro Mercantil de Valencia, hoja registral V-231009, inscripción 1.ª, de fecha 26 de diciembre de 2025. Folio electrónico (IRUS): 1000463742257. BORME: BORME-A-2026-2-46. Sociedad constituida mediante escritura otorgada el 4 de diciembre de 2025 ante el notario de Valencia D. Jorge Barberá Pichó, protocolo número 6145.<br />
        Correo general: <a href="mailto:info@beloq.es">info@beloq.es</a> · Protección de datos: <a href="mailto:dpo@beloq.es">dpo@beloq.es</a></p>
    </LegalPage>
  );
}
