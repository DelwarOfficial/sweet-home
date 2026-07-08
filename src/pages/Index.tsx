import { lazy, Suspense } from "react";
import HeroSection from "@/components/home/HeroSection";

const MDMessage = lazy(() => import("@/components/home/MDMessage"));
const Certifications = lazy(() => import("@/components/home/Certifications"));
const FeaturedProjects = lazy(() => import("@/components/home/FeaturedProjects"));
const EMICalculator = lazy(() => import("@/components/home/EMICalculator"));
const SisterConcern = lazy(() => import("@/components/home/SisterConcern"));
const StickyCTA = lazy(() => import("@/components/home/StickyCTA"));

const Index = () => {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<div className="min-h-screen bg-transparent" />}>
        <MDMessage />
        <Certifications />
        <FeaturedProjects />
        <EMICalculator />
        <SisterConcern />
        <StickyCTA />
      </Suspense>
    </>
  );
};

export default Index;
