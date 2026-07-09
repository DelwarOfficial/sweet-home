import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MapPin, ArrowRight, Building } from "lucide-react";
import { useLang, t } from "@/lib/i18n";
import { projects } from "@/lib/projects-data";

type Filter = "all" | "ongoing" | "upcoming" | "completed";

const Projects = () => {
  const { lang } = useLang();
  const [dhakaFilter, setDhakaFilter] = useState<Filter>("ongoing");
  const [chandpurFilter, setChandpurFilter] = useState<Filter>("ongoing");
  const { search } = useLocation();

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const paramLocation = searchParams.get("location");
  const paramStatus = searchParams.get("status");
  const paramSize = searchParams.get("size");

  // Group projects by city
  const projectsByCity = useMemo(() => {
    const dhakaProjects = projects.filter(p => 
      p.location.toLowerCase().includes('dhaka') || 
      p.locationBn.toLowerCase().includes('ঢাকা')
    );
    
    const chandpurProjects = projects.filter(p => 
      p.location.toLowerCase().includes('chandpur') || 
      p.locationBn.toLowerCase().includes('চাঁদপুর')
    );

    return { dhaka: dhakaProjects, chandpur: chandpurProjects };
  }, []);

  // Apply filters to each city
  const filteredProjects = useMemo(() => {
    const filterProjects = (projects: typeof window.projects, filter: Filter) => {
      if (filter === "all") return projects;
      
      return projects.filter(p => 
        p.status === filter
      );
    };

    return {
      dhaka: filterProjects(projectsByCity.dhaka, dhakaFilter),
      chandpur: filterProjects(projectsByCity.chandpur, chandpurFilter)
    };
  }, [projectsByCity, dhakaFilter, chandpurFilter]);

  const filters: { key: Filter; labelEn: string; labelBn: string }[] = [
    { key: "all", labelEn: "All", labelBn: "সব" },
    { key: "ongoing", labelEn: "Ongoing", labelBn: "চলমান" },
    { key: "upcoming", labelEn: "Upcoming", labelBn: "আসন্ন" },
    { key: "completed", labelEn: "Completed", labelBn: "সম্পন্ন" },
  ];

  const getStatusClass = (isActive: boolean) => {
    return isActive 
      ? "gold-gradient text-accent-foreground" 
      : "bg-secondary text-muted-foreground hover:text-foreground";
  };

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

          {/* Dhaka Projects Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-heading font-bold mb-6 text-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {t("Dhaka Projects", "ঢাকার প্রকল্প", lang)}
            </h2>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.slice(1).map((f) => (
                <button
                  key={`dhaka-${f.key}`}
                  onClick={() => setDhakaFilter(f.key)}
                  className={`flex-1 min-w-[110px] h-11 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${getStatusClass(dhakaFilter === f.key)}`}
                >
                  {lang === "bn" ? f.labelBn : f.labelEn}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredProjects.dhaka.length > 0 ? filteredProjects.dhaka.map((project, i) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
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
                  <div key="dhaka-no-results" className="col-span-full py-12 text-center text-muted-foreground">
                    {t("No Dhaka projects match your search criteria.", "আপনার অনুসন্ধানের সাথে কোন ঢাকার প্রকল্প মেলেনি।", lang)}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Chandpur Projects Section */}
          <div>
            <h2 className="text-2xl font-heading font-bold mb-6 text-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {t("Chandpur Projects", "চাঁদপুরের প্রকল্প", lang)}
            </h2>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.slice(1).map((f) => (
                <button
                  key={`chandpur-${f.key}`}
                  onClick={() => setChandpurFilter(f.key)}
                  className={`flex-1 min-w-[110px] h-11 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${getStatusClass(chandpurFilter === f.key)}`}
                >
                  {lang === "bn" ? f.labelBn : f.labelEn}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredProjects.chandpur.length > 0 ? filteredProjects.chandpur.map((project, i) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
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
                  <div key="chandpur-no-results" className="col-span-full py-12 text-center text-muted-foreground">
                    {t("No Chandpur projects match your search criteria.", "আপনার অনুসন্ধানের সাথে কোন চাঁদপুরের প্রকল্প মেলেনি।", lang)}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
