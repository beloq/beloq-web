import LegalPage from "../../components/LegalPage";

export const metadata = {
  title: "Política de Cookies - Beloq",
  description: "Política de cookies de beloq.es — BELOQ Movilidad S.L.",
};

export default function PoliticaCookies() {
  return (
    <LegalPage title="Política de Cookies" version="1.0" date="6 de abril de 2026">
      <h2>Estado actual</h2>
      <p><strong>A fecha de publicación de esta política, beloq.es únicamente utiliza cookies técnicas estrictamente necesarias para el funcionamiento del sitio.</strong> En concreto, el panel de gestión B2B utiliza una cookie de sesión (token JWT, duración 24 horas) imprescindible para mantener tu sesión iniciada.</p>
      <p>Conforme al artículo 22.2 de la Ley 34/2002 (LSSI-CE), las cookies técnicas están exentas de la obligación de consentimiento previo, por lo que <strong>actualmente no es necesario mostrar un banner de cookies</strong> al acceder a beloq.es.</p>
      <p>Esta política se publica a título informativo y se actualizará si en el futuro se incorporan cookies de análisis, publicidad u otras finalidades no técnicas.</p>

      <h2>¿Qué son las cookies?</h2>
      <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en tu navegador al visitarlos. Se utilizan para recordar preferencias, mantener sesiones abiertas o recopilar información sobre cómo se usa un sitio web.</p>

      <h2>Cookies que utiliza beloq.es</h2>
      <table>
        <thead>
          <tr><td><strong>Cookie</strong></td><td><strong>Tipo</strong></td><td><strong>Finalidad</strong></td><td><strong>Duración</strong></td></tr>
        </thead>
        <tbody>
          <tr><td>Token de sesión (JWT)</td><td>Técnica / estrictamente necesaria</td><td>Mantener la sesión iniciada en el panel B2B</td><td>24 horas</td></tr>
        </tbody>
      </table>

      <h2>Cookies de terceros</h2>
      <p>Actualmente beloq.es <strong>no carga</strong> scripts de analítica (Google Analytics, Meta Pixel, etc.) ni de publicidad de terceros. Por tanto, no se instalan cookies de terceros en tu navegador al visitar beloq.es.</p>
      <p>Si en el futuro se incorporan herramientas de análisis o publicidad, esta política se actualizará y se implementará un banner de consentimiento previo conforme al RGPD y la LSSI-CE.</p>

      <h2>Cómo gestionar las cookies desde tu navegador</h2>
      <p>Puedes configurar tu navegador para bloquear o eliminar cookies. Ten en cuenta que si bloqueas las cookies técnicas de beloq.es, el panel de gestión B2B podría dejar de funcionar correctamente.</p>
      <ul>
        <li><strong>Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</li>
        <li><strong>Mozilla Firefox:</strong> Configuración → Privacidad y seguridad → Cookies y datos del sitio</li>
        <li><strong>Safari:</strong> Preferencias → Privacidad → Gestionar datos de sitios web</li>
        <li><strong>Microsoft Edge:</strong> Configuración → Cookies y permisos del sitio → Cookies y datos almacenados</li>
      </ul>

      <h2>Contacto</h2>
      <p>Si tienes alguna pregunta sobre nuestra política de cookies, puedes contactarnos en <strong>info@beloq.es</strong>.</p>
    </LegalPage>
  );
}
