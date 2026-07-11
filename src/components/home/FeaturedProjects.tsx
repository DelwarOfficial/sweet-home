import { useState, useRef, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight, ArrowLeft, Building } from "lucide-react";
import { useLang, t } from "@/lib/i18n";
import { projects } from "@/lib/projects-data";

const FeaturedProjects = () => {
  const { lang } = useLang();
  const [activeFilter, setActiveFilter] = useState("All");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filters = ["All", "Dhaka", "Chandpur", "Ongoing", "Completed"];

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

  // Filter Match Logic
  const matchesFilter = (project: typeof projects[0], filter: string) => {
    if (filter === "All") return true;
    if (filter === "Ongoing") return project.status === "ongoing";
    if (filter === "Completed") return project.status === "completed";
    if (filter === "Dhaka") return project.city === "Dhaka";
    if (filter === "Chandpur") return project.city === "Chandpur";
    return true;
  };

  const itemListSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": projects.map((project, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Place",
        "name": lang === "bn" ? project.nameBn : project.name,
        "url": `${window.location.origin}/projects/${project.slug}`,
        "image": project.image ? `${window.location.origin}${project.image}` : undefined,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": lang === "bn" ? project.locationBn : project.location
        }
      }
    }))
  }), [lang]);

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="container-wide">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
              {t("Featured Projects", "বিশেষ প্রকল্প", lang)}
            </h2>
            <p className="text-muted-foreground max-w-lg">
              {t(
                "Discover premium residential developments crafted with excellence",
                "উৎকর্ষতার সাথে নির্মিত প্রিমিয়াম আবাসিক উন্নয়নগুলো ঘুরে দেখুন",
                lang
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6">
            {/* Filter Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {filters.map((filter) => {
                const isLocationLink = filter === "Dhaka" || filter === "Chandpur";
                const baseClass = `px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === filter
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-foreground hover:bg-secondary/80 border border-border"
                  }`;
                if (isLocationLink) {
                  const cityPath = filter === "Dhaka" ? "dhaka" : "chandpur";
                  return (
                    <Link
                      key={filter}
                      to={`/projects/location/${cityPath}`}
                      className={baseClass}
                    >
                      {filter}
                    </Link>
                  );
                }
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={baseClass}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            {/* View All CTA */}
            <Link
              to="/projects"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-gold-dark transition-colors group whitespace-nowrap"
              aria-label={t("Explore our complete portfolio of Real Estate Projects", "আমাদের সম্পূর্ণ রিয়েল এস্টেট প্রকল্প পোর্টফোলিও দেখুন", lang)}
            >
              {t("Explore All Real Estate Projects", "সব রিয়েল এস্টেট প্রকল্প দেখুন", lang)}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Scrollable Rail Wrapper */}
        <div className="relative group">
          {/* Scroll Prev Button (Desktop) */}
          <button
            onClick={scrollLeft}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-30 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-background border border-border shadow-md hover:shadow-premium text-foreground hover:text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Scroll left"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Cards Rail */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-5 pb-6 pt-2 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {projects.map((project, i) => (
              <div
                key={project.slug}
                className={`snap-start flex-shrink-0 transition-all duration-300 w-[85vw] sm:w-[calc(50%-10px)] md:w-[calc(33.333%-14px)] lg:w-[calc(28%-16px)] xl:w-[calc(25%-15px)] ${matchesFilter(project, activeFilter) ? "block" : "hidden"
                  }`}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block bg-card rounded-2xl border border-border overflow-hidden hover:border-gold/40 hover:shadow-premium hover:-translate-y-[2px] transition-all duration-300 h-full flex flex-col"
                >
                  <div className="aspect-[4/5] bg-secondary relative overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 pointer-events-none"></div>
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={lang === "bn" ? project.nameBn : project.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        width="400"
                        height="500"
                        decoding="async"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center z-0">
                        <Building className="w-12 h-12 text-muted-foreground/30" />
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      {project.status === "ongoing" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-full bg-[#0F2F46] text-white shadow-md transition-all duration-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          {t("Ongoing", "চলমান", lang)}
                        </span>
                      )}
                      {project.status === "completed" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-full bg-[#C9A227] text-white shadow-md transition-all duration-300">
                          {t("Completed", "সম্পন্ন", lang)}
                        </span>
                      )}
                      {project.status === "upcoming" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-full bg-[#088395] text-white shadow-md transition-all duration-300">
                          {t("Upcoming", "আসন্ন", lang)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-gold-dark transition-colors line-clamp-1">
                        {lang === "bn" ? project.nameBn : project.name}
                      </h3>
                      <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1.5 line-clamp-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        {lang === "bn" ? project.locationBn : project.location}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{project.flatSize}</span>
                      <span
                        className="text-xs font-medium text-gold-dark flex items-center gap-1 group-hover:gap-2 transition-all whitespace-nowrap"
                      >
                        {t("View Details", "বিস্তারিত", lang)}
                        <span className="sr-only">
                          {t(` for ${project.name}`, ` ${project.nameBn} এর জন্য`, lang)}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Scroll Next Button (Desktop) */}
          <button
            onClick={scrollRight}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-30 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-background border border-border shadow-md hover:shadow-premium text-foreground hover:text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Scroll right"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Call to action */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-gold-dark transition-colors group"
            aria-label={t("Explore our complete portfolio of Real Estate Projects", "আমাদের সম্পূর্ণ রিয়েল এস্টেট প্রকল্প পোর্টফোলিও দেখুন", lang)}
          >
            {t("Explore All Real Estate Projects", "সব রিয়েল এস্টেট প্রকল্প দেখুন", lang)}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
