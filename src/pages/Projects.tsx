import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useParams } from "react-router-dom";
import { MapPin, ArrowRight, Building, Search } from "lucide-react";
import { useLang, t } from "@/lib/i18n";
import { projects } from "@/lib/projects-data";

type Filter = "all" | "ongoing" | "upcoming" | "completed";
type LocationFilter = "all" | "Dhaka" | "Chandpur";

const Projects = () => {
  const { lang } = useLang();
  const { city } = useParams();
  const [filter, setFilter] = useState<Filter>("all");
  const { search } = useLocation();

  const validCity = city === "dhaka" || city === "chandpur";
  const presetLocation: LocationFilter = city === "dhaka" ? "Dhaka" : city === "chandpur" ? "Chandpur" : "all";
  const [locationFilter, setLocationFilter] = useState<LocationFilter>(presetLocation);
  const [searchTerm, setSearchTerm] = useState("");

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const paramLocation = searchParams.get("location");
  const paramStatus = searchParams.get("status");
  const paramSize = searchParams.get("size");

  const filtered = useMemo(() => {
    let result = projects;

    // Apply Local Tab Filter (status)
    if (filter !== "all") {
      result = result.filter((p) => p.status === filter);
    }

    // Apply Location Tab Filter
    if (locationFilter !== "all") {
      result = result.filter((p) => p.city === locationFilter);
    }

    // Apply URL Query String Filters from Hero Search
    if (paramLocation) {
      result = result.filter((p) =>
        p.location.toLowerCase().includes(paramLocation.toLowerCase()) ||
        p.locationBn.toLowerCase().includes(paramLocation.toLowerCase())
      );
    }

    if (paramStatus) {
      result = result.filter((p) =>
        p.status.toLowerCase() === paramStatus.toLowerCase()
      );
    }

    if (paramSize) {
      result = result.filter((p) => {
        const match = paramSize.match(/(\d+)-(\d+)/);
        if (!match) return true;

        const [_, min, max] = match;
        const sizeNumMatch = p.flatSize.match(/(\d+)/);
        if (!sizeNumMatch) return true;

        const sizeNum = parseInt(sizeNumMatch[0]);
        return sizeNum >= parseInt(min) && sizeNum <= parseInt(max);
      });
    }

    // Apply Free-text Search
    const q = searchTerm.trim().toLowerCase();
    if (q) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.nameBn.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.locationBn.toLowerCase().includes(q)
      );
    }

    return result;
  }, [filter, locationFilter, paramLocation, paramStatus, paramSize, searchTerm]);

  const statusFilters: { key: Filter; labelEn: string; labelBn: string }[] = [
    { key: "all", labelEn: "All", labelBn: "সব" },
    { key: "ongoing", labelEn: "Ongoing", labelBn: "চলমান" },
    { key: "upcoming", labelEn: "Upcoming", labelBn: "আসন্ন" },
    { key: "completed", labelEn: "Completed", labelBn: "সম্পন্ন" },
  ];

  const locationFilters: { key: LocationFilter; labelEn: string; labelBn: string }[] = [
    { key: "all", labelEn: "All", labelBn: "সব" },
    { key: "Dhaka", labelEn: "Dhaka", labelBn: "ঢাকা" },
    { key: "Chandpur", labelEn: "Chandpur", labelBn: "চাঁদপুর" },
  ];

  if (city && !validCity) {
    return (
      <div className="pt-20 section-padding text-center">
        <h1 className="text-2xl font-heading font-bold">{t("Location not found", "অবস্থান পাওয়া যায়নি", lang)}</h1>
        <Link to="/projects" className="text-gold-dark mt-4 inline-block">{t("← Back to projects", "← প্রজেক্টে ফিরে যান", lang)}</Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="section-padding navy-gradient text-primary-foreground">
        <div className="container-wide">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">
            {t("Our Projects", "আমাদের প্রকল্প", lang)}
          </h1>
          <p className="text-lg opacity-80">
            {t("Premium residential developments in Dhaka & Chandpur", "ঢাকা ও চাঁদপুরে প্রিমিয়াম আবাসিক উন্নয়ন", lang)}
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide">

          {/* Active Search Param Indicator */}
          {(paramLocation || paramStatus || paramSize) && (
            <div className="mb-6 p-4 bg-secondary border border-border rounded-xl text-sm flex items-center justify-between">
              <div>
                <span className="text-muted-foreground mr-2">{t("Showing results for:", "ফলাফল দেখানো হচ্ছে:", lang)}</span>
                <span className="font-semibold text-foreground">
                  {[paramLocation, paramStatus, paramSize].filter(Boolean).join(" • ")}
                </span>
              </div>
              <Link to="/projects" className="text-gold hover:text-gold-dark font-medium underline">
                {t("Clear Filters", "ফিল্টার মুছুন", lang)}
              </Link>
            </div>
          )}

          {/* Search Input */}
          <div className="relative mb-8 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t("Search projects...", "প্রকল্প খুঁজুন...", lang)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>

          {/* Status Filter Row */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-sm font-medium text-muted-foreground mr-1">{t("Status", "অবস্থা", lang)}:</span>
            {statusFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f.key
                  ? "gold-gradient text-accent-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
              >
                {lang === "bn" ? f.labelBn : f.labelEn}
              </button>
            ))}
          </div>

          {/* Location Filter Row */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-sm font-medium text-muted-foreground mr-1">{t("Location", "অবস্থান", lang)}:</span>
            {locationFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setLocationFilter(f.key)}
                disabled={validCity && f.key !== presetLocation}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${locationFilter === f.key
                  ? "gold-gradient text-accent-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                  }`}
              >
                {lang === "bn" ? f.labelBn : f.labelEn}
              </button>
            ))}
            {validCity && (
              <Link to="/projects" className="ml-2 text-sm text-gold hover:text-gold-dark font-medium underline">
                {t("Clear", "মুছুন", lang)}
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length > 0 ? filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block bg-card rounded-xl border border-border overflow-hidden hover:border-gold/40 hover:shadow-lg transition-all"
                >
                  <div className="aspect-[4/3] bg-secondary relative overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={lang === "bn" ? project.nameBn : project.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Building className="w-12 h-12 text-muted-foreground/30" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4 z-20">
                      {project.status === "ongoing" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-full bg-[#0F2F46]/90 text-white shadow-md backdrop-blur-sm transition-all duration-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          {t("Ongoing", "চলমান", lang)}
                        </span>
                      )}
                      {project.status === "completed" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-full bg-[#C9A227]/90 text-white shadow-md backdrop-blur-sm transition-all duration-300">
                          {t("Completed", "সম্পন্ন", lang)}
                        </span>
                      )}
                      {project.status === "upcoming" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-full bg-[#088395]/90 text-white shadow-md backdrop-blur-sm transition-all duration-300">
                          {t("Upcoming", "আসন্ন", lang)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-semibold text-lg">{lang === "bn" ? project.nameBn : project.name}</h3>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3.5 h-3.5" /> {lang === "bn" ? project.locationBn : project.location}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                      <span className="text-xs text-muted-foreground">{project.flatSize}</span>
                      <span className="text-xs font-medium text-gold-dark flex items-center gap-1">
                        {t("Details", "বিস্তারিত", lang)} <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )) : (
              <div className="col-span-full py-20 text-center text-muted-foreground">
                {t("No projects match your search criteria.", "আপনার অনুসন্ধানের সাথে কোন প্রকল্প মেলেনি।", lang)}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
