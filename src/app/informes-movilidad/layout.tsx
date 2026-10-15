import type { Metadata } from "next";
import SubNav from "../components/informes/SubNav";
import { Identidad } from "../components/informes/ui";
import { IDENTIDAD, SITE, jsonLd } from "../lib/informes";

export const metadata: Metadata = {
  // URLs absolutas de og:image y twitter:image (opengraph-image.tsx).
  metadataBase: new URL(SITE),
  title: {
    template: "%s · Informes de movilidad · beloq",
    default: "Informes de movilidad · beloq",
  },
};

// Organización que presta el servicio: lo mismo que se ve en el bloque
// «Quién presta el servicio» al pie de cada página de la sección.
const organizacion = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}/#organizacion`,
  name: "beloq",
  legalName: IDENTIDAD.razonSocial,
  taxID: IDENTIDAD.cif,
  url: SITE,
  logo: `${SITE}/images/logo-black.png`,
  email: IDENTIDAD.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: IDENTIDAD.direccion,
    postalCode: IDENTIDAD.cp,
    addressLocality: IDENTIDAD.ciudad,
    addressCountry: "ES",
  },
};

export default function InformesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // pt-14: la cabecera del sitio es fija (56 px) y la subnavegación va debajo.
    <div className="pt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(organizacion) }}
      />
      <SubNav />
      {children}
      <Identidad />
    </div>
  );
}
