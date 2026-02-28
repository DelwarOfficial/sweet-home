import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Building } from "lucide-react";
import { useLang, t } from "@/lib/i18n";
import { projects } from "@/lib/projects-data";



const FeaturedProjects = () => {
  const { lang } = useLang();

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            {t("Featured Projects", "বিশেষ প্রকল্প", lang)}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t(
              "Discover premium residential developments crafted with excellence",
              "উৎকর্ষতার সাথে নির্মিত প্রিমিয়াম আবাসিক উন্নয়নগুলো ঘুরে দেখুন",
              lang
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/projects/${project.slug}`}
                className="group block bg-card rounded-xl border border-border overflow-hidden hover:border-gold/40 hover:shadow-lg transition-all duration-300"
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
                  <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-gold-dark transition-colors">
                    {lang === "bn" ? project.nameBn : project.name}
                  </h3>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {lang === "bn" ? project.locationBn : project.location}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                    <span className="text-xs text-muted-foreground">{project.flatSize}</span>
                    <span className="text-xs font-medium text-gold-dark flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t("View Details", "বিস্তারিত", lang)}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors"
          >
            {t("View All Projects", "সব প্রকল্প দেখুন", lang)}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
