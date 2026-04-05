import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import HowItWorks from "./components/HowItWorks";
import SectorsGrid from "./components/SectorsGrid";
import ImpactSection from "./components/ImpactSection";
import AppShowcase from "./components/AppShowcase";
import CTASection from "./components/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <HowItWorks />
      <SectorsGrid />
      <ImpactSection />
      <AppShowcase />
      <CTASection />
    </>
  );
}
