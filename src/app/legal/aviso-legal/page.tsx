import LegalPage from "../../components/LegalPage";
import Link from "next/link";

export const metadata = {
  title: "Aviso Legal - Beloq",
  description: "Aviso legal de beloq.es — Beloq Movilidad SL.",
};

export default function AvisoLegal() {
  return (
    <LegalPage title="Aviso Legal" version="1.2" date="28 de abril de 2026">
      <h2>1. Identificación del titular</h2>
      <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa al usuario de los siguientes datos:</p>
      <table>
        <tbody>
          <tr><td><strong>Razón social</strong></td><td>Beloq Movilidad SL (Sociedad Limitada Unipersonal según Art. 12 LSC; socio único: D. Jesús Gracia Casani)</td></tr>
          <tr><td><strong>CIF</strong></td><td>B24990814</td></tr>
          <tr><td><strong>D-U-N-S</strong></td><td>473117119</td></tr>
          <tr><td><strong>Domicilio social</strong></td><td>Calle Joan Verdeguer 116, 4 — 46024 València, España</td></tr>
          <tr><td><strong>Inscripción registral</strong></td><td>Inscrita en el Registro Mercantil de Valencia, hoja registral V-231009, inscripción 1.ª, de fecha 26 de diciembre de 2025. Folio electrónico (IRUS): 1000463742257. BORME: BORME-A-2026-2-46. Sociedad constituida mediante escritura otorgada el 4 de diciembre de 2025 ante el notario de Valencia D. Jorge Barberá Pichó, protocolo número 6145.</td></tr>
          <tr><td><strong>Email de contacto</strong></td><td>info@beloq.es</td></tr>
          <tr><td><strong>Web</strong></td><td>https://www.beloq.es</td></tr>
          <tr><td><strong>Actividad</strong></td><td>Sistemas de estacionamiento inteligente para bicicletas y vehículos de movilidad personal (VMP)</td></tr>
        </tbody>
      </table>

      <h2>2. Actividad</h2>
      <p>Beloq Movilidad SL es una empresa dedicada al diseño, fabricación y operación de un sistema de estacionamiento inteligente para bicicletas y vehículos de movilidad personal (VMP), como patinetes eléctricos. El sistema consiste en módulos electromecánicos IoT gestionados mediante una aplicación móvil, destinados a operadores e instituciones (universidades, ayuntamientos, empresas) que ofrecen el servicio de aparcamiento seguro a usuarios finales.</p>

      <h2>3. Marca registrada</h2>
      <p><strong>beloq®</strong> es marca registrada de Beloq Movilidad SL, con expediente OEPM número M4364283 (marca figurativa; publicación en el BOPI el 29 de abril de 2026), registrada en las clases 06 (soportes metálicos e instalaciones para aparcar bicicletas y VMP) y 09 (aplicaciones móviles y software descargable).</p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>Todos los contenidos del sitio web beloq.es, incluyendo textos, imágenes, logotipos, diseños gráficos, vídeos, iconografía, código fuente y software, están protegidos por derechos de propiedad intelectual e industrial y son titularidad de Beloq Movilidad SL o de sus legítimos licenciantes.</p>
      <p>Queda prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otra forma de explotación de estos contenidos sin autorización previa y por escrito de Beloq Movilidad SL, salvo uso personal y privado conforme a la legislación vigente.</p>

      <h2>5. Enlaces externos</h2>
      <p>El sitio web beloq.es puede contener enlaces a sitios web de terceros con fines informativos. Beloq Movilidad SL no se responsabiliza del contenido, políticas de privacidad ni disponibilidad de estos sitios externos. El acceso a dichos sitios a través de enlaces desde beloq.es se realiza bajo la responsabilidad del usuario.</p>

      <h2>6. Exclusión de responsabilidad</h2>
      <p>Beloq Movilidad SL no garantiza la disponibilidad y continuidad ininterrumpida del sitio web, ni la ausencia de errores en sus contenidos. beloq se esfuerza por mantener la información actualizada y exacta, pero no asume responsabilidad por posibles inexactitudes o información desactualizada.</p>
      <p>Beloq Movilidad SL no se responsabiliza de los daños que pudieran derivarse del uso del sitio web, incluyendo daños informáticos (virus, malware) provocados por terceros.</p>

      <h2>7. Protección de datos personales</h2>
      <p>Beloq Movilidad SL trata los datos personales de los usuarios conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD). Para obtener información detallada sobre el tratamiento de datos personales, consulta nuestra <Link href="/legal/privacidad">Política de Privacidad</Link>. Consulta también nuestros <Link href="/legal/terminos">Términos y Condiciones</Link> y nuestra <Link href="/legal/cookies">Política de Cookies</Link>.</p>
      <p>Para cualquier consulta sobre protección de datos, puedes contactar en <strong>info@beloq.es</strong>.</p>

      <h2>8. Legislación aplicable y jurisdicción</h2>
      <p>Este Aviso Legal se rige por la legislación española. Para cualquier controversia derivada del uso del sitio web, ambas partes se someten a los Juzgados y Tribunales de Valencia (España), sin perjuicio del derecho de los consumidores a acudir a los tribunales de su domicilio.</p>

      <h2>9. Contacto</h2>
      <p>Para cualquier consulta relacionada con este Aviso Legal o con el sitio web beloq.es:</p>
      <p><strong>Email:</strong> info@beloq.es</p>
      <p><strong>Domicilio:</strong> Calle Joan Verdeguer 116, 4 — 46024 València, España</p>
    </LegalPage>
  );
}
