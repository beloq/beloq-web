import Link from "next/link";
import LegalPage from "../../components/LegalPage";

// Texto: beloq-backend/docs/Terminos, condiciones, privacidad y legal/ (fuente única).
// Se genera desde el Markdown; no editar a mano sin cambiar también el origen.
export const metadata = {
  title: "Condiciones del programa de puntos beloq · beloq",
  description: "Condiciones del programa de puntos beloq — Beloq Movilidad SL.",
  alternates: { canonical: "https://www.beloq.es/legal/programa-puntos" },
};

export default function CondicionesProgramaPuntos() {
  return (
    <LegalPage title="Condiciones del programa de puntos beloq" version="1.0" date="17 de noviembre de 2026">
      <h2>1. Qué es el programa de puntos beloq</h2>
      <p>El programa de puntos beloq (en adelante, «el programa») recompensa a los usuarios de beloq, los beloquers, por desplazarse en bicicleta o en patinete. Registras tus viajes con la app (al principio pulsando «Empezar viaje» y «Parar»; más adelante, si quieres, de forma automática), beloq los comprueba con reglas publicadas y, si el viaje es válido, te suma <strong>puntos beloq</strong> que puedes canjear por las recompensas de tu programa. La recompensa es por pedalear o patinar; los datos que hacen falta para comprobarlo son la consecuencia, no el precio.</p>
      <p>Lo organiza <strong>Beloq Movilidad SL</strong> (Sociedad Limitada con declaración de unipersonalidad inscrita; socio único: D. Jesús Gracia Casani; en adelante, «beloq»), con CIF B24990814, D-U-N-S 473117119, domicilio social en Calle Joan Verdeguer 116, 4, 46024 València (España), inscrita en el Registro Mercantil de Valencia, hoja registral V-231009, inscripción 1.ª, de fecha 26 de diciembre de 2025. Contacto: <a href="mailto:info@beloq.es">info@beloq.es</a>. Protección de datos: <a href="mailto:dpo@beloq.es">dpo@beloq.es</a>.</p>
      <p>Estas Condiciones completan los <Link href="/legal/terminos">Términos y Condiciones de uso de beloq</Link> (§3.4) y la <Link href="/legal/privacidad">Política de Privacidad</Link> (§2.6 «Programa de puntos beloq»). Para el programa mandan estas Condiciones; todo lo que no digan (cuenta, pagos, abonos, responsabilidad por el vehículo, reclamaciones) se rige por los Términos.</p>
      <p><strong>Los programas, sus organizadores y sus anexos.</strong> El programa se organiza en programas concretos: el piloto de beloq o el de un ayuntamiento, una empresa, un parque empresarial, una universidad o una entidad. Cada programa tiene un <strong>organizador</strong> (quien lo promueve y, en su caso, pone las recompensas) y un <strong>anexo</strong> con sus cifras y sus condiciones propias: quién puede entrar, quién organiza y quién responde de los datos, cuánto vale cada viaje, los topes, las recompensas y la fecha límite. La app te enseña el anexo entero, con su número de versión, <strong>antes</strong> de que te apuntes, y tienes que aceptarlo expresamente; queda registrado qué versión aceptaste. Para las cifras manda el anexo. El anexo I de este documento es el del <strong>«Programa piloto beloq»</strong>, que organiza beloq.</p>
      <p><strong>beloq es responsable de tus datos en todos los programas.</strong> El organizador no recibe tu recorrido, tu nombre, tus horas ni tus direcciones: recibe un informe mensual agregado (§10.2) y se compromete por contrato a no intentar identificar a nadie con él. Si un organizador quiere entregar una recompensa propia que exija tus datos (por ejemplo, tu nombre para darte un premio), te lo pediremos aparte y solo se los daremos si dices que sí.</p>
      <h2>2. Quién puede participar</h2>
      <ul>
        <li><strong>Quien tenga el código del programa.</strong> Se entra en «Puntos beloq» con el <strong>código</strong> que reparte el organizador (en un correo, un cartel o un enlace). La app enseña la lista de programas abiertos, pero sin el código no se puede entrar en ninguno. Si un código no vale, la app no dice por qué; tras varios intentos fallidos seguidos bloquea los intentos durante una hora.</li>
        <li><strong>Hace falta un móvil Android</strong> con los servicios de Google. En iPhone el programa llegará más adelante.</li>
        <li><strong>Tienes que indicar tu vehículo</strong> (bici, patinete o los dos) en tu perfil. Lo usamos como etiqueta de tus viajes; no decide por sí solo si un viaje es válido.</li>
        <li><strong>Los menores de 14 años no pueden participar</strong> (tampoco pueden tener cuenta, §4.1 de los Términos). Si tienes entre 14 y 17 años, puedes participar <strong>solo en modo manual</strong> y te recomendamos informar a tu tutor legal, porque la app registra por dónde te mueves durante tus viajes. La detección automática no se ofrecerá a menores de 18 años sin que beloq lo evalúe antes y lo diga en estas Condiciones.</li>
        <li>Un programa puede tener <strong>cupo</strong>, un <strong>plazo de alta</strong> y, en algunos casos, un <strong>código de alta</strong> que te da quien lo organiza. Si el cupo está lleno o el plazo ha pasado, la app te lo dice.</li>
        <li><strong>Un programa a la vez.</strong> Solo puedes estar en un programa. Para cambiar, sales del actual (§9.2) y entras en el otro con su código; los puntos no pasan de un programa a otro. Las cuentas múltiples están prohibidas (§4.1 y §9 de los Términos).</li>
        <li><strong>Apuntarte es voluntario y separado de los Términos.</strong> Usar beloq no exige participar y salir del programa no afecta a tu cuenta. Al apuntarte aceptas estas Condiciones y confirmas que has leído la Política de Privacidad en su versión 1.5 o posterior; las dos cosas quedan registradas con fecha y versión.</li>
        <li>Las cuentas del personal de beloq y las cuentas de demostración para la revisión de las tiendas de aplicaciones participan en programas de prueba que no reparten premios ni cuentan en ninguna estadística.</li>
      </ul>
      <h2>3. Qué mide la app y con qué sensores</h2>
      <h3>3.1 Lo que usa la app mientras estás en el programa</h3>
      <p><strong>Al principio, solo en modo manual.</strong> Todos los participantes empiezan en <strong>modo manual</strong>: la app registra tu posición <strong>solo entre que pulsas «Empezar viaje» y pulsas «Parar»</strong> (o se cierra sola, §4.1). Para eso necesita dos permisos: <strong>ubicación precisa</strong> y <strong>avisos</strong>. Con la pantalla apagada sigue grabando ese viaje, y lo ves en una notificación mientras dura. Fuera de esos viajes no se registra nada.</p>
      <p><strong>Más adelante, si quieres, en automático (§3.4).</strong> Solo entonces entran en juego estos dos permisos, que hoy la app ni siquiera pide:</p>
      <ul>
        <li><strong>Ubicación en segundo plano.</strong> Con la app cerrada o sin usarla, mientras estés en el programa y no lo tengas en pausa, la app registra tu posición para reconstruir el viaje. En Android hace falta el permiso «Permitir siempre». Fuera de un viaje no se registran posiciones: el GPS se enciende cuando el móvil detecta que empiezas a moverte y se apaga al terminar.</li>
        <li><strong>Reconocimiento de actividad.</strong> Tu móvil avisa a la app cuando pasas de estar quieto a moverte (en bici, en vehículo, andando). Lo usamos solo para encender el GPS en el momento justo y gastar menos batería. beloq no es una app de salud y no guarda datos de salud.</li>
      </ul>
      <p>En los dos modos:</p>
      <ul>
        <li><strong>Acelerómetro, resumido.</strong> Durante el viaje la app calcula, por tramos de unos cinco segundos, unos pocos números (cuánto vibra el móvil, si hay un ritmo de pedaleo, con qué energía) que ayudan a distinguir una bici o un patinete de un coche, un autobús o un paseo a pie. A beloq suben esos números, no la señal del sensor.</li>
        <li><strong>Avisos.</strong> El viaje en curso se ve en una notificación con el tiempo y los kilómetros; desde ella puedes decir «No voy en bici ni patinete». Al terminar, la app te avisa del resultado.</li>
        <li><strong>Tus anclajes en beloq</strong>, que beloq ya conoce: sirven para saber si el viaje acabó aparcando en un beloq y para proponerte un «viaje sin detectar» (§4.4). Retirar tu vehículo de un beloq también despierta la detección.</li>
      </ul>
      <h3>3.2 Acelerómetro en bruto: solo si te prestas como probador</h3>
      <p>Para ajustar el detector hacen falta recorridos de los que se sepa con certeza cómo y cuándo se hicieron. Si te prestas como <strong>probador</strong>, en la app podrás abrir un <strong>recorrido de referencia</strong>: dices en qué vas (bici, patinete, a pie, coche o bus), pulsas «Salgo» y, al llegar, «He llegado». <strong>Solo en esos recorridos</strong>, y solo mientras estén abiertos, la app guarda la señal del acelerómetro en bruto (cincuenta medidas por segundo) y la sube junto con el viaje.</p>
      <p>Ser probador es voluntario, no da puntos extra y exige un <strong>consentimiento aparte</strong>, que te pedimos la primera vez y que puedes retirar cuando quieras desde la app. Fuera de un recorrido de referencia, aunque seas probador, no se guarda la señal en bruto.</p>
      <h3>3.3 Lo que la app no hace</h3>
      <ul>
        <li>No graba audio ni imagen, no lee tus contactos ni tus mensajes y no usa el identificador de publicidad del móvil.</li>
        <li>No detecta nada si no estás en el programa, si lo tienes en pausa o si has salido de él. Quien no participa no ve ningún permiso nuevo ni ningún servicio en segundo plano.</li>
        <li>No comparte tu recorrido con nadie: ni con el organizador del programa, ni con otros usuarios, ni con servicios de mapas (§10).</li>
      </ul>
      <h3>3.4 Del modo manual al automático: siempre voluntario</h3>
      <p><strong>Empiezas en manual.</strong> Pulsas <strong>«Empezar viaje»</strong> al salir y <strong>«Parar»</strong> al llegar (o la app lo cierra sola cuando llevas diez minutos parado). En la pantalla de inicio verás «Empezar viaje» y, mientras grabas, «Viaje en curso».</p>
      <p><strong>El paso al automático lo propone la app, no lo impone.</strong> Cuando el organizador lo active para su programa y tú ya lleves unos viajes manuales validados (las cifras están en el anexo), la app te ofrecerá que la detección sea automática. Antes te enseñará tus propios viajes como ejemplo, te explicará qué cambia (la app podrá encender el GPS con la app cerrada cuando detecte que te mueves), qué permisos te pedirá (ubicación «Permitir siempre» y actividad física) y cómo volver atrás.</p>
      <p><strong>No estás obligado a aceptarlo</strong> ni a conceder esos permisos. Si dices que no, los retiras más tarde o tu móvil no deja a beloq trabajar en segundo plano, sigues en <strong>modo manual</strong>. Un viaje manual vale lo mismo y se comprueba con las mismas reglas que uno automático. Puedes volver a manual cuando quieras quitando el permiso en los ajustes del móvil. Si aceptas el paso al automático, quedará registrado con su fecha, además del permiso que concedas en el móvil. Antes de ofrecerlo, beloq actualizará estas Condiciones y la Política de Privacidad, y te avisará con 30 días de antelación.</p>
      <h3>3.5 Batería y dónde llevar el móvil</h3>
      <p>La detección gasta batería: poca en reposo (solo el reconocimiento de actividad) y, durante el viaje, como cualquier app que usa el GPS. Si lo notas, puedes <strong>pausar</strong> la detección «hasta mañana» o «hasta que yo lo diga» (§9.1). El móvil detecta mejor en el bolsillo o en la mochila que en el manillar o en la cesta; es un consejo, no una condición.</p>
      <h2>4. Qué es un viaje válido</h2>
      <p>Quien decide si un viaje es válido es <strong>beloq, en el servidor</strong>: recalcula la distancia y las velocidades a partir de las posiciones recibidas y aplica las reglas del programa. El móvil solo descarta lo que nunca llegaría a ser un viaje. Cada viaje queda ligado a la versión de las reglas con la que se evaluó.</p>
      <h3>4.1 Cómo empieza y cómo termina</h3>
      <ul>
        <li><strong>Empieza</strong> cuando la app confirma que te mueves a velocidad de bici o patinete: al menos 100 m recorridos en los primeros 90 segundos, a entre 7 y 35 km/h de mediana. Si en ese tiempo no se confirma (ibas andando, o era un falso aviso), no se registra nada.</li>
        <li><strong>Pausas.</strong> Si durante tres minutos no te alejas más de 50 m del punto donde paraste, el viaje queda <strong>en pausa</strong> (un semáforo largo, un recado corto). Si vuelves a moverte antes de diez minutos, el viaje sigue. Si no, <strong>termina a la hora en que paraste</strong>. Un recado más largo son dos viajes, cada uno con sus mínimos.</li>
        <li><strong>Termina también</strong> si anclas tu vehículo en un beloq (el anclaje es el fin del viaje), si pulsas «Parar» en modo manual o si pasan 50 minutos sin ninguna posición válida.</li>
      </ul>
      <h3>4.2 Las reglas</h3>
      <p>Un viaje es válido si cumple todas estas condiciones. Las cifras entre paréntesis son las iniciales del piloto (anexo I); las de cada programa están en su anexo.</p>
      <ul>
        <li><strong>Mínimos:</strong> al menos 300 m y 2 minutos en movimiento. Si no acaba anclando en un beloq, al menos 800 m.</li>
        <li><strong>Velocidad compatible con una bici o un patinete:</strong> velocidad mediana entre 5 y 35 km/h; el 5 % de tramos más rápidos, por debajo de 45 km/h; menos del 60 % del tiempo parado; duración máxima 4 horas. Un viaje en coche o autobús queda fuera por la velocidad sostenida; andar queda fuera por lenta.</li>
        <li><strong>Sin ubicación simulada.</strong> Si cualquier posición del viaje está marcada como simulada por el sistema, el viaje no es válido y se aplica lo previsto en §9 de los Términos (la app deja de funcionar hasta que quites la ubicación simulada).</li>
        <li><strong>Sin solaparse</strong> en el tiempo con otro viaje tuyo.</li>
        <li><strong>Dentro de los topes</strong> del anexo por día y por mes (§5). El día cuenta de 03:00 a 03:00, hora de Madrid, como en los Términos; el mes es el mes natural.</li>
        <li><strong>Dentro de la zona del programa</strong>, si el anexo fija una, y, si el anexo lo exige, empezando o acabando cerca (300 m) de una de las direcciones habituales que hayas declarado. En el piloto las direcciones son opcionales: sirven para que el detector acierte más, no para excluir viajes.</li>
        <li><strong>Con los datos completos.</strong> La app sube el viaje sola en cuanto hay red. Si pasan 72 horas y no ha llegado entero, se descarta como incompleto y la app te lo muestra en Diagnóstico. Si lo que calcula beloq difiere más de un 20 % del resumen que mandó tu móvil, el viaje pasa a revisión.</li>
      </ul>
      <h3>4.3 Viaje con anclaje</h3>
      <p>Un viaje «acaba en un beloq» si termina a menos de 150 m y en los 20 minutos anteriores al anclaje de tu vehículo en un beloq con tu cuenta. Da el extra del anexo y no está sujeto al mínimo de 800 m.</p>
      <h3>4.4 Viaje sin detectar</h3>
      <p>Si anclas tu vehículo en un beloq y la app no ha detectado ningún viaje que acabe ahí, pasados unos 30 minutos beloq te propone un <strong>«viaje sin detectar»</strong>: lo confirmas de un toque (bici, patinete u otra cosa). Si lo confirmas, cuenta como viaje con anclaje pero <strong>sin kilómetros</strong>, porque no hay recorrido que medir. Si no respondes en 48 horas, se descarta. Para beloq cada «viaje sin detectar» es un fallo del detector que se cuenta.</p>
      <h3>4.5 Lo que ves de cada viaje</h3>
      <p>Cada viaje tiene uno de tres estados, con el motivo en palabras: <strong>validado</strong>, <strong>en revisión</strong> (lo mira una persona) o <strong>no válido</strong> («velocidad de coche durante 6 minutos», «ubicación simulada», «menos de 300 m»). Los viajes de los que el detector duda (por ejemplo, un coche en atasco a velocidad de bici) van a revisión o te preguntan: «¿Ibas en bici, en patinete u otra cosa?».</p>
      <h2>5. Cómo se puntúa</h2>
      <ul>
        <li><strong>Puntos por viaje validado</strong>, más <strong>puntos por kilómetro</strong> hasta un máximo de kilómetros, más un <strong>extra si el viaje acaba anclando en un beloq</strong>. Un «viaje sin detectar» confirmado suma los puntos por viaje y el extra de anclaje, sin kilómetros. Los puntos se redondean hacia abajo.</li>
        <li><strong>Topes</strong> por viajes al día, puntos al día y puntos al mes. Lo que supere un tope no se guarda para otro día.</li>
        <li><strong>El motor es configurable y el anexo manda.</strong> Las cifras de cada programa (puntos por viaje, por kilómetro, extras, topes y, si las hubiera, bonificaciones por regularidad) están en su anexo y en «Puntos beloq» → «Reglas». Tu saldo, lo que llevas hoy y este mes y lo que te queda hasta el tope están en «Puntos beloq».</li>
        <li><strong>Cuándo se suman.</strong> En cuanto el viaje queda validado, normalmente en unos minutos desde que termina; con mala cobertura, cuando el móvil consiga subirlo. Son provisionales durante 48 horas (§7).</li>
        <li><strong>Qué son los puntos.</strong> Una recompensa personal e intransferible, sin valor económico fuera del canje del programa: no se cambian por dinero, no se ceden y caducan en la fecha límite de canje del anexo.</li>
      </ul>
      <h2>6. Modo «en pruebas»</h2>
      <p>Un programa puede estar <strong>en pruebas</strong>: la app detecta tus viajes y te los enseña con su estado, su motivo y la etiqueta «en pruebas», pero <strong>no suman puntos</strong>. Sirve para medir el detector con viajes reales antes de empezar a premiar, y para que veas cómo funciona. El piloto arranca así durante sus dos primeras semanas (anexo I). La app te dice cuándo empieza a contar; los viajes hechos en pruebas no se puntúan después.</p>
      <h2>7. 48 horas para cambiar de opinión, revisión humana y «No estoy de acuerdo»</h2>
      <h3>7.1 Lo que puedes hacer tú</h3>
      <p>Durante las <strong>48 horas</strong> siguientes a la evaluación de un viaje puedes, desde «Mis viajes»:</p>
      <ul>
        <li><strong>cambiar el vehículo</strong> (bici, patinete) o decir que <strong>no eras tú o no ibas en bici ni patinete</strong>: el viaje se descarta y, si ya había sumado, sus puntos se restan;</li>
        <li><strong>deshacer</strong> un descarte;</li>
        <li><strong>confirmar</strong> un «viaje sin detectar»;</li>
        <li>pulsar <strong>«No estoy de acuerdo»</strong> en un viaje no válido o en revisión y explicar por qué (hasta 500 caracteres): una persona de beloq lo revisa.</li>
      </ul>
      <p>Pasadas las 48 horas la decisión se consolida y los puntos quedan firmes. Después puedes seguir discutiendo una decisión escribiéndonos (§13), con los plazos del §17 de los Términos.</p>
      <h3>7.2 Lo que hace beloq</h3>
      <p>La validación es <strong>automática</strong>, con las reglas publicadas, y siempre con el motivo a la vista. Los viajes dudosos y los que reclamas los revisa <strong>una persona</strong> del equipo de beloq, que puede validarlos, rechazarlos o restaurarlos, siempre con un motivo que verás en el viaje. Cada decisión queda registrada con quién la tomó y cuándo. Para revisar un viaje, el personal puede ver su recorrido mientras exista (§10); cada acceso queda anotado.</p>
      <p>beloq también puede revisar de oficio un viaje ya validado si detecta un indicio de fraude (§9.3), y retirar sus puntos; si ya estaba consolidado, te avisará con el motivo y podrás alegar.</p>
      <h2>8. Canje</h2>
      <ul>
        <li><strong>Catálogo en la app.</strong> En «Puntos beloq» → «Canjear» ves las recompensas del programa, con su coste en puntos, las existencias, el máximo por participante y la fecha límite de cada una. <strong>En esta primera etapa</strong> el catálogo de la app solo tiene recompensas de beloq (días de abono); si el anexo de tu programa prevé recompensas del organizador, las entrega el organizador por su cuenta como diga el anexo, y beloq no le comunica tus datos para ello sin tu consentimiento expreso.</li>
        <li>
          <strong>Dos formas posibles de recompensa</strong>, y el anexo de cada programa fija cuál ofrece:
          <ul>
            <li><strong>Días de abono</strong> (Beloquer Flow o Beloquer Max, según el anexo). Se añaden a continuación del abono que tengas en vigor, sin solaparse, y se rigen por §3.2 de los Términos, salvo que no hay pago, desistimiento ni reembolso.</li>
            <li><strong>Saldo de horas de aparcamiento</strong>, que se consume después de tu tiempo gratis diario y antes de que empiece a cobrarse tiempo extra. En programas de un operador o institución, el anexo puede prever además recompensas que entrega el organizador.</li>
          </ul>
        </li>
        <li><strong>El canje es inmediato.</strong> Si el canje falla, los puntos vuelven a tu saldo. Un canje aplicado no se deshace ni se cambia por dinero.</li>
        <li><strong>Existencias y fecha límite.</strong> Las recompensas se entregan hasta agotar existencias. Pasada la fecha límite de canje del anexo, los puntos sin canjear <strong>caducan</strong>.</li>
        <li><strong>Tope anual de 250 €.</strong> Lo que recibas por canjes en un año natural, sumando todos los programas, no superará <strong>250 €</strong>, valorado al precio al que beloq vende esa recompensa en la app (por ejemplo, el precio del abono por día). Al llegar al tope, la app no te dejará canjear más ese año y te lo dirá; tus puntos se conservan hasta la fecha límite de canje. Las recompensas pueden tener efectos en tu declaración de la renta; con este tope, beloq no tiene que practicar retenciones ni ingresos a cuenta sobre ellas.</li>
      </ul>
      <h2>9. Pausa, salida y baja</h2>
      <h3>9.1 Pausa</h3>
      <p>Desde «Puntos beloq» puedes pausar la detección <strong>hasta mañana</strong> o <strong>hasta que tú lo digas</strong>. En pausa la app no registra posiciones ni viajes, tampoco te propone «viajes sin detectar», y tu saldo se conserva. Reanudas cuando quieras.</p>
      <h3>9.2 Salir del programa</h3>
      <p>Puedes salir cuando quieras desde «Puntos beloq» → «Salir del programa». La detección se apaga en el momento y se registra tu baja. Es también el paso para cambiar de programa. <strong>Conservas todo lo que hayas canjeado</strong> (los días de abono o las horas ya aplicados). Los puntos sin canjear se pierden al salir, así que canjéalos antes. Si el alta sigue abierta puedes volver a apuntarte. Salir del programa no afecta a tu cuenta ni a tus abonos.</p>
      <h3>9.3 Baja por fraude o abuso</h3>
      <p>beloq puede dar de baja del programa, con el motivo y con derecho a alegar (§10.3 de los Términos), a quien:</p>
      <ul>
        <li>use <strong>ubicación simulada</strong> o reproduzca recorridos grabados;</li>
        <li>presente viajes <strong>duplicados o solapados</strong>, o datos del móvil que no cuadren con las posiciones recibidas;</li>
        <li>lleve <strong>varios móviles sobre un mismo recorrido</strong> o use cuentas ajenas o múltiples;</li>
        <li>manipule la app o el envío de datos.</li>
      </ul>
      <p>Los puntos obtenidos con esos viajes se anulan, aunque ya se hubieran consolidado, y beloq puede anular los canjes que se hicieron con ellos. Además se aplica lo previsto en §9 y §10 de los Términos.</p>
      <h3>9.4 Si beloq pausa o cierra un programa</h3>
      <p>beloq o el organizador pueden pausar un programa (por mantenimiento o por una incidencia) o cerrarlo. Te lo diremos en la app y por correo. Con el programa en pausa no se suman puntos; al cerrarlo te diremos hasta cuándo puedes canjear lo que te quede. <strong>Nunca pierdes lo ya canjeado.</strong></p>
      <h2>10. Qué guardamos, quién lo ve y cuánto tiempo</h2>
      <h3>10.1 Qué y cuánto tiempo</h3>
      <table>
        <thead>
          <tr><td><strong>Dato</strong></td><td><strong>Qué es</strong></td><td><strong>Cuánto tiempo</strong></td></tr>
        </thead>
        <tbody>
          <tr><td><strong>Resumen de cada viaje</strong></td><td>Fecha, hora de inicio y fin, duración, distancia, velocidades, resumen de sensores, vehículo, estado, motivo, puntos, y un trazado reducido cuyos extremos se recortan 150 m en el servidor antes de guardarlo: tu portal exacto no aparece en el resumen</td><td>Mientras exista tu cuenta. Al eliminarla quedan solo fecha, distancia, estado y puntos, sin nada que te identifique</td></tr>
          <tr><td><strong>Recorrido completo</strong> (posiciones una por segundo y resúmenes del acelerómetro)</td><td>Lo que hace falta para recalcular el viaje, revisarlo si lo reclamas y detectar el fraude</td><td><strong>90 días</strong> desde que el viaje llega a beloq. Después se borra</td></tr>
          <tr><td><strong>Acelerómetro en bruto</strong> de los recorridos de referencia (solo probadores, §3.2)</td><td>La señal del sensor durante el recorrido</td><td><strong>90 días</strong> desde que llega a beloq</td></tr>
          <tr><td><strong>Diagnóstico del detector</strong></td><td>Permisos, batería, avisos del sistema, errores y tiempos, <strong>sin coordenadas</strong></td><td><strong>90 días</strong></td></tr>
          <tr><td><strong>Cruce con tus anclajes</strong></td><td>Qué anclajes tuvieron o no un viaje detectado</td><td><strong>90 días</strong></td></tr>
          <tr><td><strong>Direcciones habituales</strong> (si las das) y <strong>datos de tu móvil</strong> (fabricante, modelo, versión de Android, permisos concedidos, versión de la app)</td><td>Para evaluar los viajes y para saber en qué teléfonos falla la detección; de los móviles solo se publican agregados</td><td>Mientras dure tu participación; se borran al salir del programa o al eliminar tu cuenta</td></tr>
          <tr><td><strong>Libro de puntos y canjes</strong></td><td>Cada suma, resta, canje y ajuste, con su motivo</td><td>Mientras exista tu cuenta. Al eliminarla deja de estar ligado a ti; se conserva para que el libro cuadre con los abonos emitidos</td></tr>
          <tr><td><strong>Tu alta, tu baja y tus consentimientos</strong></td><td>Fecha, versión de estas Condiciones y de la Política aceptadas</td><td>5 años, como el resto de consentimientos</td></tr>
          <tr><td><strong>En tu móvil</strong></td><td>Las posiciones de un viaje se borran a los 7 días de subirse; los viajes, a los 60; el registro de eventos, a los 30</td><td></td></tr>
        </tbody>
      </table>
      <h3>10.2 Quién lo ve</h3>
      <ul>
        <li><strong>Tú</strong>, en «Mis viajes» y en «Tu cuenta» → «Copia de tus datos», que incluye tus viajes, puntos y canjes.</li>
        <li><strong>El personal de beloq</strong>: el resumen de los viajes y, <strong>solo para revisar</strong> un viaje en revisión, no válido o reclamado, su recorrido completo mientras exista. Cada acceso a un recorrido queda anotado. Los recorridos individuales no se exportan.</li>
        <li><strong>El organizador de un programa</strong> (ayuntamiento, empresa, universidad, entidad) y, si se publican informes, el público: <strong>un informe mensual solo con agregados</strong>: personas activas, viajes, kilómetros, días con viaje, reparto por vehículo y por franja horaria, puntos emitidos y canjeados, y un mapa por celdas de 500 m. <strong>Nada se entrega si describe a menos de 5 personas distintas</strong>: si el programa tiene menos de 5 personas activas ese mes no hay informe, las celdas con menos de 5 personas no aparecen, y si una categoría de un reparto queda oculta se oculta también otra para que no se pueda deducir por resta. Nunca tu recorrido, tu nombre, tus horas ni tus direcciones.</li>
        <li><strong>Servicios de mapas:</strong> el mapa que ves en la app lo sirve Stadia Maps, que recibe tu IP y la zona del mapa que miras, como ya ocurre hoy; <strong>tus recorridos no se le envían</strong>.</li>
        <li>Los avisos que recibes en el móvil dicen el estado del viaje y los puntos; no llevan coordenadas.</li>
      </ul>
      <h3>10.3 Remisión a la Política de Privacidad</h3>
      <p>Quién es el responsable, las bases jurídicas de cada uso, los proveedores que intervienen (Google Cloud en la región de Madrid, Firebase, Stadia Maps), las transferencias internacionales y cómo ejercer tus derechos de acceso, rectificación, supresión, portabilidad, oposición y limitación están en la <Link href="/legal/privacidad">Política de Privacidad</Link>, apartados «Programa de puntos beloq» (§2.6), «Para qué usamos tus datos», «Cuánto tiempo conservamos tus datos» y «Tus derechos». Protección de datos: <strong><a href="mailto:dpo@beloq.es">dpo@beloq.es</a></strong>.</p>
      <h2>11. Cambios en estas Condiciones y en los anexos</h2>
      <ul>
        <li><strong>Estas Condiciones</strong> pueden cambiar como los Términos (§15): te avisaremos por correo y en la app con al menos 30 días de antelación. Si no estás de acuerdo, puedes salir del programa antes de que entren en vigor y conservas lo canjeado.</li>
        <li><strong>Las cifras de un anexo</strong> las fija el organizador del programa y pueden ajustarse durante el programa. Las vigentes están siempre en «Puntos beloq» → «Reglas». Un cambio solo afecta a los viajes que se evalúen después: no cambia viajes ya evaluados ni puntos ya sumados, y cada viaje guarda la versión de las reglas con la que se evaluó.</li>
      </ul>
      <h2>12. Responsabilidad</h2>
      <ul>
        <li><strong>El detector puede fallar.</strong> Puede perder un viaje, cortarlo en dos o detectar uno que no era; depende del móvil, de la cobertura y de cómo lo lleves. beloq no garantiza que todos los viajes se detecten. Para que ninguno se pierda en silencio tienes el «viaje sin detectar» al anclar, el botón «Empezar viaje», la pantalla de Diagnóstico y el soporte (§13). Los puntos no son una contraprestación: beloq no compensa los viajes que el detector no registre.</li>
        <li><strong>Circula con prudencia.</strong> El programa premia moverse en bici o patinete, no la velocidad: un viaje más rápido no da más puntos y puede quedar fuera por la regla de velocidad. Respeta las normas de circulación; beloq no responde de los accidentes ni de los daños que sufras o causes durante un viaje.</li>
        <li><strong>El vehículo</strong> solo está custodiado mientras está anclado en un beloq (§5.3 y §8 de los Términos); el programa no amplía esa custodia.</li>
      </ul>
      <h2>13. Soporte, reclamaciones, ley y contacto</h2>
      <p>Para cualquier duda o reclamación sobre el programa escríbenos por el chat de <Link href="/info">beloq.es/info</Link> o a <strong><a href="mailto:info@beloq.es">info@beloq.es</a></strong>, indicando el móvil o el correo de tu cuenta y la fecha del viaje. Los plazos de respuesta, la reclamación formal, los organismos de consumo, la ley aplicable y la jurisdicción son los de §16 y §17 de los Términos. En materia de protección de datos puedes acudir a la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">https://www.aepd.es</a>).</p>
      <p><strong>Beloq Movilidad SL</strong>, CIF B24990814, Calle Joan Verdeguer 116, 4, 46024 València (España). Correo general: <a href="mailto:info@beloq.es">info@beloq.es</a>. Protección de datos: <a href="mailto:dpo@beloq.es">dpo@beloq.es</a>.</p>
      <h2>Anexo I. Programa piloto beloq</h2>
      <p><strong>Versión del anexo:</strong> 1.0 (es la que la app enseña y registra al apuntarte).</p>
      <p>Programa que organiza y opera directamente beloq, sin cliente, para probar el registro de viajes y el programa con personas reales antes de abrir programas de organizadores. <strong>Todas las cifras son iniciales y beloq puede ajustarlas</strong>; las vigentes son las que muestra la app en «Puntos beloq» → «Reglas». Si este programa pasa a tener un organizador distinto de beloq, se publicará una versión nueva de este anexo con su nombre, y la app te pedirá aceptarla.</p>
      <table>
        <thead>
          <tr><td><strong>Concepto</strong></td><td><strong>Cifra inicial</strong></td></tr>
        </thead>
        <tbody>
          <tr><td><strong>Organiza</strong></td><td>Beloq Movilidad SL (programa propio, tipo piloto)</td></tr>
          <tr><td><strong>Responde de los datos</strong></td><td>Beloq Movilidad SL. Protección de datos: <a href="mailto:dpo@beloq.es">dpo@beloq.es</a></td></tr>
          <tr><td><strong>Quién puede entrar</strong></td><td>Personas invitadas por beloq con el <strong>código del programa</strong>; móvil Android; vehículo indicado en el perfil</td></tr>
          <tr><td><strong>Participantes</strong></td><td>Hasta el cupo que fije beloq</td></tr>
          <tr><td><strong>Alta</strong></td><td>Con código, mientras el programa esté activo y en plazo</td></tr>
          <tr><td><strong>Modo de registro</strong></td><td><strong>Manual</strong>: «Empezar viaje» y «Parar». La detección automática no está disponible en esta versión del anexo; cuando lo esté, se ofrecerá tras <strong>5 viajes manuales validados</strong> y <strong>7 días</strong> desde el alta, siempre como opción</td></tr>
          <tr><td><strong>Modo «en pruebas»</strong></td><td>Activado al arrancar: se registra y se enseña, no se suman puntos. beloq avisará en la app cuando empiecen a contar</td></tr>
          <tr><td><strong>Mínimos de un viaje</strong></td><td><strong>300 m</strong> y <strong>2 minutos</strong> en movimiento; <strong>800 m</strong> si no acaba anclando en un beloq</td></tr>
          <tr><td><strong>Velocidad compatible</strong></td><td>Mediana entre <strong>5 y 35 km/h</strong>; percentil 95 hasta <strong>45 km/h</strong>; menos del <strong>60 %</strong> del tiempo parado; duración máxima <strong>4 horas</strong></td></tr>
          <tr><td><strong>Pausa y cierre</strong></td><td>Pausa a los <strong>3 minutos</strong> sin alejarse 50 m; cierre a los <strong>10 minutos</strong> de pausa; cierre a los 50 minutos sin posiciones</td></tr>
          <tr><td><strong>Viaje con anclaje</strong></td><td>Termina a menos de <strong>150 m</strong> y en los <strong>20 minutos</strong> anteriores a tu anclaje en un beloq (solo donde haya estaciones)</td></tr>
          <tr><td><strong>Puntos por viaje validado</strong></td><td><strong>10</strong></td></tr>
          <tr><td><strong>Puntos por kilómetro</strong></td><td><strong>2</strong>, hasta <strong>10 km</strong> por viaje</td></tr>
          <tr><td><strong>Extra por anclar en un beloq</strong></td><td><strong>10</strong></td></tr>
          <tr><td><strong>Topes</strong></td><td><strong>6 viajes</strong> y <strong>100 puntos</strong> al día (de 03:00 a 03:00, hora de Madrid); <strong>1.500 puntos</strong> al mes natural</td></tr>
          <tr><td><strong>Reversibilidad</strong></td><td><strong>48 horas</strong></td></tr>
          <tr><td><strong>Recompensas</strong></td><td>Días de abono de beloq desde el catálogo de la app, cuando beloq los active. Sin recompensas de terceros. Tope de <strong>250 €</strong> al año por persona (§8)</td></tr>
          <tr><td><strong>Fecha límite de canje</strong></td><td>La que fije beloq al cerrar el programa, con al menos 30 días de aviso. Después caducan los puntos sin canjear</td></tr>
          <tr><td><strong>Recorridos completos</strong></td><td><strong>90 días</strong> desde que llegan a beloq</td></tr>
          <tr><td><strong>Diagnóstico del detector</strong></td><td><strong>90 días</strong></td></tr>
          <tr><td><strong>Recorte de los extremos</strong></td><td><strong>150 m</strong> en cada extremo, en el servidor, antes de guardar el trazado</td></tr>
          <tr><td><strong>Informe al organizador</strong></td><td>No aplica: el organizador es beloq. Los agregados internos siguen la regla de celdas de <strong>500 m</strong> con al menos <strong>5 personas</strong> distintas</td></tr>
        </tbody>
      </table>
      <h3>Modelo de anexo para un organizador (plantilla, sin datos de terceros)</h3>
      <p>Solo se rellena con la <strong>autorización escrita</strong> del organizador para usar su nombre y su logo.</p>
      <table>
        <thead>
          <tr><td><strong>Concepto</strong></td><td><strong>A rellenar</strong></td></tr>
        </thead>
        <tbody>
          <tr><td>Organiza</td><td>Nombre legal del organizador; qué aporta (difusión, recompensas, presupuesto)</td></tr>
          <tr><td>Responde de los datos</td><td>Beloq Movilidad SL (<a href="mailto:dpo@beloq.es">dpo@beloq.es</a>). El organizador solo recibe el informe mensual agregado de §10.2</td></tr>
          <tr><td>A quién va dirigido</td><td>Por ejemplo, personas que trabajan en el centro del organizador o socias de la entidad; cómo se reparte el código</td></tr>
          <tr><td>Cupo y fechas</td><td>Plazas, alta desde y hasta, fecha límite de canje</td></tr>
          <tr><td>Modo de registro y paso a automático</td><td>Manual al inicio; si y cuándo se ofrece el automático (viajes y días)</td></tr>
          <tr><td>Cifras</td><td>Las de la tabla anterior que cambien</td></tr>
          <tr><td>Recompensas</td><td>Las de beloq del catálogo y, si las hay, las que entrega el organizador: qué son, cómo se entregan y qué datos necesita el organizador para entregarlas (con consentimiento aparte si son personales)</td></tr>
          <tr><td>Informe al organizador</td><td>Mensual, agregado, con la regla de 5 personas por celda y por categoría</td></tr>
        </tbody>
      </table>
    </LegalPage>
  );
}
