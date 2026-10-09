import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import HowItWorks from "./components/HowItWorks";
import SectorsGrid from "./components/SectorsGrid";
import ImpactSection from "./components/ImpactSection";
import AppShowcase from "./components/AppShowcase";
import CTASection from "./components/CTASection";
import { getPricing } from "./lib/info";

// Las horas gratis salen de /pricing/public (nunca escritas a mano): la
// portada se regenera como mucho cada 5 min, igual que la caché del servidor.
export const revalidate = 300;

export default async function Home() {
  const pricing = await getPricing();
  const horasGratis =
    pricing?.plans.find((p) => p.id === "freemium")?.free_hours ?? null;

  return (
    <>
      <HeroSection horasGratis={horasGratis} />
      <AboutSection />
      <HowItWorks horasGratis={horasGratis} />
      <SectorsGrid />
      <ImpactSection />
      <AppShowcase horasGratis={horasGratis} />
      <CTASection />
    </>
  );
}
