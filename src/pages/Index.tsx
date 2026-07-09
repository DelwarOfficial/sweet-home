import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { useLang, t } from "@/lib/i18n";
import HeroSection from "@/components/home/HeroSection";
import TrustBadges from "@/components/home/TrustBadges";
import WhyChooseUs from "@/components/home/WhyChooseUs";

const MDMessage = lazy(() => import("@/components/home/MDMessage"));
const Certifications = lazy(() => import("@/components/home/Certifications"));
const FeaturedProjects = lazy(() => import("@/components/home/FeaturedProjects"));
const MidPageCTA = lazy(() => import("@/components/home/MidPageCTA"));
const ProjectGallery = lazy(() => import("@/components/home/ProjectGallery"));
const EMICalculator = lazy(() => import("@/components/home/EMICalculator"));
const SisterConcern = lazy(() => import("@/components/home/SisterConcern"));
const StickyCTA = lazy(() => import("@/components/home/StickyCTA"));

const Index = () => {
  const { lang } = useLang();

  return (
    <>
      <Helmet>
        <title>{t("S & D Sweet Home Developers Ltd. | Premium Real Estate", "এস এন্ড ডি সুইট হোম ডেভেলপারস লিমিটেড | প্রিমিয়াম রিয়েল এস্টেট", lang)}</title>
        <meta name="description" content={t(
          "REHAB & RAJUK enlisted premium real estate developer in Dhaka and Chandpur. Award-winning residential & commercial projects.",
          "ঢাকা ও চাঁদপুরে রিহ্যাব ও রাজউক তালিকাভুক্ত প্রিমিয়াম রিয়েল এস্টেট ডেভেলপার। পুরস্কৃত আবাসিক ও বাণিজ্যিক প্রকল্প।",
          lang
        )} />
      </Helmet>
      <HeroSection />
      <TrustBadges />
      <WhyChooseUs />
      <Suspense fallback={<div className="min-h-screen bg-transparent" />}>
        <FeaturedProjects />
        <MidPageCTA />
        <MDMessage />
        <ProjectGallery />
        <Certifications />
        <EMICalculator />
        <SisterConcern />
        <StickyCTA />
      </Suspense>
    </>
  );
};

export default Index;
