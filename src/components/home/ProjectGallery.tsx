import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Camera } from "lucide-react";
import { useLang, t } from "@/lib/i18n";
import { projects } from "@/lib/projects-data";

const ProjectGallery = () => {
  const { lang } = useLang();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  }, []);

  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-primary font-semibold text-xs mb-4">
            <Camera className="w-3.5 h-3.5 text-gold" />
            {t("Project Gallery", "প্রজেক্ট গ্যালারি", lang)}
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            {t("A Glimpse of Our Work", "আমাদের কাজের এক ঝলক", lang)}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t(
              "Explore the craftsmanship and quality behind every project we deliver",
              "আমাদের প্রতিটি প্রকল্পের পেছনের কারুকাজ এবং গুণমান অন্বেষণ করুন",
              lang
            )}
          </p>
        </motion.div>

        <div className="relative group">
          <button
            onClick={scrollLeft}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-30 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-background border border-border shadow-md hover:shadow-premium text-foreground hover:text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Scroll left"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-5 pb-6 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {projects
              .filter((p) => p.image)
              .map((project, i) => (
                <div
                  key={project.slug}
                  className="snap-start flex-shrink-0 w-[85vw] sm:w-[400px] md:w-[450px]"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-subtle hover:shadow-premium transition-shadow duration-300"
                  >
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                      <img
                        src={project.image}
                        alt={lang === "bn" ? project.nameBn : project.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        width="450"
                        height="281"
                        decoding="async"
                        loading="lazy"
                      />
                      <div className="absolute bottom-4 left-4 z-20">
                        <p className="text-white font-heading font-semibold text-lg">
                          {lang === "bn" ? project.nameBn : project.name}
                        </p>
                        <p className="text-white/70 text-sm">
                          {lang === "bn" ? project.locationBn : project.location}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-30 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-background border border-border shadow-md hover:shadow-premium text-foreground hover:text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Scroll right"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;
