import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MapPin, ArrowRight, Building, Search } from "lucide-react";
import { useLang, t } from "@/lib/i18n";
import { projects } from "@/lib/projects-data";

type Filter = "all" | "ongoing" | "upcoming" | "completed";

const Projects = () => {
  const { lang } = useLang();
  const { city } = useParams();
  const [dhakaFilter, setDhakaFilter] = useState<Filter>("all");
  const [chandpurFilter, setChandpurFilter] = useState<Filter>("all");
  const [cityFilter, setCityFilter] = useState<"all" | "dhaka" | "chandpur">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { search } = useLocation();

  const validCity = city === "dhaka" || city === "chandpur";
  const presetLocation = city === "dhaka" ? "dhaka" : city === "chandpur" ? "chandpur" : "all";

  useEffect(() => {
    if (validCity) setCityFilter(presetLocation);
    else setCityFilter("all");
  }, [city, validCity, presetLocation]);

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const paramLocation = searchParams.get("location");
  const paramStatus = searchParams.get("status");
  const paramSize = searchParams.get("size");

  useEffect(() => {
    if (paramLocation) {
      const loc = paramLocation.toLowerCase();
      if (loc === "dhaka" || loc === "chandpur") setCityFilter(loc as "dhaka" | "chandpur");
      else setCityFilter("all");
    } else if (!validCity) {
      setCityFilter("all");
    }
  }, [paramLocation, validCity]);

  useEffect(() => {
    if (paramStatus) {
      const s = paramStatus.toLowerCase() as Filter;
      if (["ongoing", "upcoming", "completed"].includes(s)) {
        setDhakaFilter(s);
        setChandpurFilter(s);
      }
    }
  }, [paramStatus]);

  const projectsByCity = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSize = (sizeStr: string) => {
      if (!paramSize) return true;
      const projectNums = sizeStr.replace(/,/g, "").match(/\d+/g);
      const searchNums = paramSize.replace(/,/g, "").match(/\d+/g);
      if (!projectNums || !searchNums) return false;
      const pMin = parseInt(projectNums[0], 10);
      const pMax = projectNums.length > 1 ? parseInt(projectNums[1], 10) : pMin;
      const sMin = parseInt(searchNums[0], 10);
      const sMax = searchNums.length > 1 ? parseInt(searchNums[1], 10) : sMin;
      return Math.max(pMin, sMin) <= Math.min(pMax, sMax);
    };
    const textMatch = (p: typeof projects[number]) =>
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.nameBn.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.locationBn.toLowerCase().includes(q);

    let dhakaProjects = projects.filter((p) => p.city === "Dhaka");
    let chandpurProjects = projects.filter((p) => p.city === "Chandpur");

    if (paramSize) {
      dhakaProjects = dhakaProjects.filter((p) => matchesSize(p.flatSize));
      chandpurProjects = chandpurProjects.filter((p) => matchesSize(p.flatSize));
    }
    if (q) {
      dhakaProjects = dhakaProjects.filter(textMatch);
      chandpurProjects = chandpurProjects.filter(textMatch);
    }
    return { dhaka: dhakaProjects, chandpur: chandpurProjects };
  }, [paramSize, searchTerm]);

  const showDhaka = cityFilter === "all" || cityFilter === "dhaka";
  const showChandpur = cityFilter === "all" || cityFilter === "chandpur";

  const filteredProjects = useMemo(() => {
    const filterProjects = (list: typeof projects, filter: Filter) => {
      if (filter === "all") return list;
      return list.filter((p) => p.status === filter);
    };
    return {
      dhaka: filterProjects(projectsByCity.dhaka, dhakaFilter),
      chandpur: filterProjects(projectsByCity.chandpur, chandpurFilter),
    };
  }, [projectsByCity, dhakaFilter, chandpurFilter]);

  const statusFilters: { key: Filter; labelEn: string; labelBn: string }[] = [
    { key: "all", labelEn: "All", labelBn: "সব" },
    { key: "ongoing", labelEn: "Ongoing", labelBn: "চলমান" },
    { key: "upcoming", labelEn: "Upcoming", labelBn: "আসন্ন" },
    { key: "completed", labelEn: "Completed", labelBn: "সম্পন্ন" },
  ];

  if (city && !validCity) {
    return (
      <div className="pt-20 section-padding text-center">
        <h1 className="text-2xl font-heading font-bold">{t("Location not found", "অবস্থান পাওয়া যায়নি", lang)}</h1>
        <Link to="/projects" className="text-gold-dark mt-4 inline-block">{t("← Back to projects", "← প্রজেক্টে ফিরে যান", lang)}</Link>
      </div>
    );
  }

  const getStatusClass = (isActive: boolean) =>
    isActive
      ? "gold-gradient text-accent-foreground"
      : "bg-secondary text-muted-foreground hover:text-foreground";

  const formatLocation = (p: typeof projects[number]) =>
    lang === "bn"
      ? `${p.city === "Dhaka" ? "ঢাকা" : "চাঁদপুর"} > ${p.locationBn}`
      : `${p.city} > ${p.location}`;

  const renderCard = (project: typeof projects[number]) => (
    <motion.div
      key={project.slug}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
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
            <MapPin className="w-3.5 h-3.5" /> {formatLocation(project)}
          </p>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
            <span className="text-xs text-muted-foreground">{project.floors}{project.flatSize ? ` • ${project.flatSize}` : ""}</span>
            <span className="text-xs font-medium text-gold-dark flex items-center gap-1">
              {t("Details", "বিস্তারিত", lang)} <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <div className="pt-20">
      <Helmet>
        <title>{t("Our Projects | S & D Sweet Home", "আমাদের প্রকল্প | এস এন্ড ডি সুইট হোম", lang)}</title>
        <meta name="description" content={t(
          "Explore premium residential projects by S & D Sweet Home Developers in Dhaka and Chandpur. Ongoing, upcoming, and completed developments.",
          "ঢাকা ও চাঁদপুরে এস এন্ড ডি সুইট হোম ডেভেলপারসের প্রিমিয়াম আবাসিক প্রকল্প অন্বেষণ করুন। চলমান, আসন্ন এবং সম্পন্ন উন্নয়ন।",
          lang
        )} />
      </Helmet>
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

          {/* City Toggle Buttons */}
          <div className="flex justify-center gap-3 mb-10 max-w-md mx-auto">
            <button
              onClick={() => setCityFilter("all")}
              className={`flex-1 h-11 px-4 rounded-lg text-sm font-medium transition-colors ${
                cityFilter === "all"
                  ? "gold-gradient text-accent-foreground font-bold shadow-md"
                  : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {t("All Cities", "সব শহর", lang)}
            </button>
            <button
              onClick={() => setCityFilter("dhaka")}
              className={`flex-1 h-11 px-4 rounded-lg text-sm font-medium transition-colors ${
                cityFilter === "dhaka"
                  ? "gold-gradient text-accent-foreground font-bold shadow-md"
                  : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {t("Dhaka", "ঢাকা", lang)}
            </button>
            <button
              onClick={() => setCityFilter("chandpur")}
              className={`flex-1 h-11 px-4 rounded-lg text-sm font-medium transition-colors ${
                cityFilter === "chandpur"
                  ? "gold-gradient text-accent-foreground font-bold shadow-md"
                  : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {t("Chandpur", "চাঁদপুর", lang)}
            </button>
          </div>

          {/* Dhaka Projects Section */}
          {showDhaka && (
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-6 text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {t("Dhaka Projects", "ঢাকার প্রকল্প", lang)}
              </h2>

              <div className="grid grid-cols-3 gap-2 mb-6">
                {statusFilters.slice(1).map((f) => (
                  <button
                    key={`dhaka-${f.key}`}
                    onClick={() => setDhakaFilter(f.key)}
                    className={`h-11 px-2 rounded-lg text-[13px] sm:text-sm font-medium transition-colors ${getStatusClass(dhakaFilter === f.key)}`}
                  >
                    {lang === "bn" ? f.labelBn : f.labelEn}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredProjects.dhaka.length > 0 ? (
                    filteredProjects.dhaka.map((project) => renderCard(project))
                  ) : (
                    <div key="dhaka-no-results" className="col-span-full py-12 text-center text-muted-foreground">
                      {t("No Dhaka projects match your search criteria.", "আপনার অনুসন্ধানের সাথে কোন ঢাকার প্রকল্প মেলেনি।", lang)}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Chandpur Projects Section */}
          {showChandpur && (
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-6 text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {t("Chandpur Projects", "চাঁদপুরের প্রকল্প", lang)}
              </h2>

              <div className="grid grid-cols-3 gap-2 mb-6">
                {statusFilters.slice(1).map((f) => (
                  <button
                    key={`chandpur-${f.key}`}
                    onClick={() => setChandpurFilter(f.key)}
                    className={`h-11 px-2 rounded-lg text-[13px] sm:text-sm font-medium transition-colors ${getStatusClass(chandpurFilter === f.key)}`}
                  >
                    {lang === "bn" ? f.labelBn : f.labelEn}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredProjects.chandpur.length > 0 ? (
                    filteredProjects.chandpur.map((project) => renderCard(project))
                  ) : (
                    <div key="chandpur-no-results" className="col-span-full py-12 text-center text-muted-foreground">
                      {t("No Chandpur projects match your search criteria.", "আপনার অনুসন্ধানের সাথে কোন চাঁদপুরের প্রকল্প মেলেনি।", lang)}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
