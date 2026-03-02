import HeroSection from "@/components/home/HeroSection";
import TrustBadges from "@/components/home/TrustBadges";
import MDMessage from "@/components/home/MDMessage";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import EMICalculator from "@/components/home/EMICalculator";
import SisterConcern from "@/components/home/SisterConcern";
import StickyCTA from "@/components/home/StickyCTA";

const Index = () => {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <MDMessage />
      <FeaturedProjects />
      <EMICalculator />
      <SisterConcern />
      <StickyCTA />
    </>
  );
};

export default Index;
