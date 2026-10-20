import type { Metadata, Viewport } from "next";
import PanelFeria, { ApoyosFeria, dataUri } from "../components/PanelFeria";
import Pantalla3D from "../components/Pantalla3D";

export const metadata: Metadata = {
  title: "beloq en 3D",
  description:
    "El módulo y la estación beloq en 3D: gíralos, acércate y prueba a anclar una bici o un patinete.",
  alternates: { canonical: "https://www.beloq.es/3d" },
};

// viewport-fit=cover: en el iPhone ocupa también la zona de la muesca y de la
// barra inferior; los controles respetan las zonas seguras.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F5F5F5",
};

// Modo feria: el logo va dentro de la página (data URI), sin otra descarga.
const LOGO = dataUri("images/logo-black.png", "image/png");

export default function Pagina3D() {
  return <Pantalla3D logoFeria={LOGO} panelFeria={<PanelFeria />} apoyosFeria={<ApoyosFeria />} />;
}
