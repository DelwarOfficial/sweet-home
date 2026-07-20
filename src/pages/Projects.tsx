import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MapPin, ArrowRight, Building, Search, Maximize, Layers, Ruler } from "lucide-react";
import { useLang, t } from "@/lib/i18n";
import { projects, getImage, type Project } from "@/lib/projects";

type Filter = "all" | "ongoing" | "upcoming" | "completed";

/** Compact stat tile rendered on each project card (At-a-Glance row). */
const AtAGlance = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex flex-col gap-0.5 min-w-0">
    <span className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-muted-foreground">
      <span className="text-gold/80">{icon}</span>
      {label}
    </span>
    <span className="text-xs font-semibold text-foreground truncate" title={value}>
      {value}
    </span>
  </div>
);

// --- Build-progress heuristic -------------------------------------------------
// Assume a ~36-month build window ending at the handover date. If we can't
// parse a date, fall back to status-based defaults so the bar still reflects
// something truthful.
const BUILD_WINDOW_MONTHS = 36;
const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

/** Parse loose handover strings ("Dec 2026", "December 2026", "12/2026", "Q4 2026"). */
function parseHandover(input?: string): Date | null {
  if (!input) return null;
  const s = input.trim().toLowerCase();
  if (!s) return null;

  // "12/2026" or "12-2026" (MM/YYYY)
  let m = s.match(/^(\d{1,2})[/-](\d{4})$/);
  if (m) {
    const d = new Date(Number(m[2]), Number(m[1]) - 1, 1);
    return isNaN(d.getTime()) ? null : d;
  }
  // "Dec 2026" / "December 2026"
  m = s.match(/^([a-z]{3,})\.?\s+(\d{4})$/);
  if (m) {
    const mon = MONTHS.indexOf(m[1].slice(0, 3));
    if (mon >= 0) {
      const d = new Date(Number(m[2]), mon, 1);
      return isNaN(d.getTime()) ? null : d;
    }
  }
  // "Q4 2026" — treat as last month of the quarter
  m = s.match(/^q([1-4])\s+(\d{4})$/);
  if (m) {
    const mon = Number(m[1]) * 3 - 1;
    const d = new Date(Number(m[2]), mon, 1);
    return isNaN(d.getTime()) ? null : d;
  }
  // Last resort: native Date parse (ISO, etc.)
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

/** Map a project onto a 0–100 build-progress percentage. */
function progressFor(p: Project): number {
  if (p.status === "completed") return 100;
  if (p.status === "upcoming") return 12;

  const handover = parseHandover(p.handover);
  if (!handover) return 55; // ongoing, no date → indeterminate middle

  const DAY = 86400000;
  const end = handover.getTime();
  const start = end - BUILD_WINDOW_MONTHS * 30 * DAY;
  const now = Date.now();
  if (now <= start) return 5;
  if (now >= end) return 95;
  return Math.max(5, Math.min(95, Math.round(((now - start) / (end - start)) * 100)));
}

/** Thin colored progress bar — color tracks project status. */
const ProgressBar = ({ value, status }: { value: number; status: Project["status"] }) => {
  const color =
    status === "completed"
      ? "from-[#C9A227] to-[#e0bc46]"
      : status === "upcoming"
      ? "from-sky-500 to-sky-400"
      : "from-emerald-500 to-emerald-400";
  return (
    <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
      <motion.div
        className={`h-full bg-linear-to-r ${color}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
};

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
    const textMatch = (p: Project) =>
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

  const formatLocation = (p: Project) =>
    lang === "bn"
      ? `${p.city === "Dhaka" ? "ঢাকা" : "চাঁদপুর"} > ${p.locationBn}`
      : `${p.city} > ${p.location}`;

  const renderCard = (project: Project) => (
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
          {(() => {
            const src = getImage(project);
            if (!src) {
              return (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building className="w-12 h-12 text-muted-foreground/30" />
                </div>
              );
            }
            return (
              <img
                src={src}
                alt={lang === "bn" ? project.nameBn : project.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  // If the cover 404s or fails to decode, swap to placeholder
                  // icon so the card never shows a broken-image glyph.
                  const el = e.currentTarget;
                  el.style.display = "none";
                  const parent = el.parentElement;
                  if (parent && !parent.querySelector("[data-fallback-icon]")) {
                    const fallback = document.createElement("div");
                    fallback.setAttribute("data-fallback-icon", "");
                    fallback.className =
                      "absolute inset-0 flex items-center justify-center";
                    fallback.innerHTML =
                      '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground/30"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>';
                    parent.appendChild(fallback);
                  }
                }}
              />
            );
          })()}
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

          {/* Build progress bar — always visible, color tracks status */}
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-wide text-muted-foreground">
              <span>{t("Progress", "অগ্রগতি", lang)}</span>
              <span className="font-semibold text-foreground">
                {project.status === "completed"
                  ? t("Ready", "সম্পন্ন", lang)
                  : `${progressFor(project)}%`}
              </span>
            </div>
            <ProgressBar value={progressFor(project)} status={project.status} />
          </div>

          {/* At-a-Glance: revealed on hover (tap on touch) */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out mt-3">
            <div className="overflow-hidden">
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
                <AtAGlance
                  icon={<Maximize className="w-3.5 h-3.5" />}
                  label={t("Land", "জমি", lang)}
                  value={
                    project.landSize
                      ? `${project.landSize.value} ${project.landSize.unit}`
                      : project.landArea || "—"
                  }
                />
                <AtAGlance
                  icon={<Layers className="w-3.5 h-3.5" />}
                  label={t("Floors", "তলা", lang)}
                  value={
                    project.buildingHeight != null
                      ? `G+${project.buildingHeight}`
                      : project.floors || "—"
                  }
                />
                <AtAGlance
                  icon={<Ruler className="w-3.5 h-3.5" />}
                  label={t("Flats", "ফ্ল্যাট", lang)}
                  value={
                    project.flatSizes && project.flatSizes.length
                      ? project.flatSizes.length === 1
                        ? `${project.flatSizes[0]}`
                        : `${Math.min(...project.flatSizes)}–${Math.max(...project.flatSizes)}`
                      : project.flatSize || "—"
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end mt-3 pt-3 border-t border-border">
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
