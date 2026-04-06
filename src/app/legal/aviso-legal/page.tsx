import LegalPage from "../../components/LegalPage";
import Link from "next/link";

export const metadata = {
  title: "Aviso Legal - Beloq",
  description: "Aviso legal de beloq.es — BELOQ Movilidad S.L.",
};

export default function AvisoLegal() {
  return (
    <LegalPage title="Aviso Legal" version="1.0" date="6 de abril de 2026">
      <h2>1. Identificación del titular</h2>
      <table>
        <tbody>
          <tr><td><strong>Razón social</strong></td><td>BELOQ Movilidad S.L.</td></tr>
          <tr><td><strong>CIF</strong></td><td>B24990814</td></tr>
          <tr><td><strong>Domicilio social</strong></td><td>Calle Joan Verdeguer 116, 4.º — Valencia, España</td></tr>
          <tr><td><strong>Email de contacto</strong></td><td>info@beloq.es</td></tr>
          <tr><td><strong>Web</strong></td><td>https://beloq.es</td></tr>
          <tr><td><strong>Actividad</strong></td><td>Sistemas de estacionamiento inteligente para bicicletas y vehículos de movilidad personal (VMP)</td></tr>
        </tbody>
      </table>

      <h2>2. Actividad</h2>
      <p>BELOQ Movilidad S.L. es una empresa dedicada al diseño, fabricación y operación de un sistema de estacionamiento inteligente para bicicletas y vehículos de movilidad personal (VMP), como patinetes eléctricos. El sistema consiste en módulos electromecánicos IoT gestionados mediante una aplicación móvil, destinados a operadores e instituciones (universidades, ayuntamientos, empresas) que ofrecen el servicio de aparcamiento seguro a usuarios finales.</p>

      <h2>3. Marca registrada</h2>
      <p><strong>beloq®</strong> es marca registrada de BELOQ Movilidad S.L., con expediente OEPM número M4364283 (marca figurativa, actualmente en tramitación), registrada en las clases 06 (soportes metálicos e instalaciones para aparcar bicicletas y VMP) y 09 (aplicaciones móviles y software descargable).</p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>Todos los contenidos del sitio web beloq.es, incluyendo textos, imágenes, logotipos, diseños gráficos, vídeos, iconografía, código fuente y software, están protegidos por derechos de propiedad intelectual e industrial y son titularidad de BELOQ Movilidad S.L. o de sus legítimos licenciantes.</p>
      <p>Queda prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otra forma de explotación de estos contenidos sin autorización previa y por escrito de BELOQ Movilidad S.L., salvo uso personal y privado conforme a la legislación vigente.</p>

      <h2>5. Enlaces externos</h2>
      <p>El sitio web beloq.es puede contener enlaces a sitios web de terceros con fines informativos. BELOQ Movilidad S.L. no se responsabiliza del contenido, políticas de privacidad ni disponibilidad de estos sitios externos.</p>

      <h2>6. Exclusión de responsabilidad</h2>
      <p>BELOQ Movilidad S.L. no garantiza la disponibilidad y continuidad ininterrumpida del sitio web, ni la ausencia de errores en sus contenidos. beloq se esfuerza por mantener la información actualizada y exacta, pero no asume responsabilidad por posibles inexactitudes o información desactualizada.</p>
      <p>BELOQ Movilidad S.L. no se responsabiliza de los daños que pudieran derivarse del uso del sitio web, incluyendo daños informáticos (virus, malware) provocados por terceros.</p>

      <h2>7. Protección de datos personales</h2>
      <p>BELOQ Movilidad S.L. trata los datos personales de los usuarios conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD). Para obtener información detallada sobre el tratamiento de datos personales, consulta nuestra <Link href="/legal/privacidad">Política de Privacidad</Link>. Consulta también nuestros <Link href="/legal/terminos">Términos y Condiciones</Link> y nuestra <Link href="/legal/cookies">Política de Cookies</Link>.</p>
      <p>Para cualquier consulta sobre protección de datos, puedes contactar con nuestro Delegado de Protección de Datos en <strong>dpo@beloq.es</strong>.</p>

      <h2>8. Legislación aplicable y jurisdicción</h2>
      <p>Este Aviso Legal se rige por la legislación española. Para cualquier controversia derivada del uso del sitio web, ambas partes se someten a los Juzgados y Tribunales de Valencia (España), sin perjuicio del derecho de los consumidores a acudir a los tribunales de su domicilio.</p>

      <h2>9. Contacto</h2>
      <p><strong>Email:</strong> info@beloq.es</p>
      <p><strong>Domicilio:</strong> Calle Joan Verdeguer 116, 4.º — Valencia, España</p>
    </LegalPage>
  );
}
