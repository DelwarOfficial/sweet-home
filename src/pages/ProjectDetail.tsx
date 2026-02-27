import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Ruler, Building, Layers, Compass, CheckCircle, ArrowLeft, FileDown, Calendar } from "lucide-react";
import { useLang, t } from "@/lib/i18n";
import { projects } from "@/lib/projects-data";

const ProjectDetail = () => {
  const { slug } = useParams();
  const { lang } = useLang();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="pt-20 section-padding text-center">
        <h1 className="text-2xl font-heading font-bold">{t("Project not found", "প্রকল্প পাওয়া যায়নি", lang)}</h1>
        <Link to="/projects" className="text-gold-dark mt-4 inline-block">{t("← Back to projects", "← প্রকল্পে ফিরুন", lang)}</Link>
      </div>
    );
  }

  const details = [
    { icon: Ruler, label: t("Flat Size", "ফ্ল্যাট সাইজ", lang), value: project.flatSize },
    { icon: Layers, label: t("Land Area", "জমির আয়তন", lang), value: project.landArea },
    { icon: Building, label: t("Floors", "তলা", lang), value: project.floors },
    { icon: Compass, label: t("Facing", "মুখ", lang), value: project.facing },
  ];

  return (
    <div className="pt-20">
      <section className="section-padding navy-gradient text-primary-foreground">
        <div className="container-wide">
          <Link to="/projects" className="inline-flex items-center gap-1 text-sm opacity-70 hover:opacity-100 mb-4 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> {t("All Projects", "সব প্রকল্প", lang)}
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">{lang === "bn" ? project.nameBn : project.name}</h1>
            <p className="flex items-center gap-1 text-lg opacity-80">
              <MapPin className="w-4 h-4" /> {lang === "bn" ? project.locationBn : project.location}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="aspect-video bg-secondary rounded-xl flex items-center justify-center">
                <Building className="w-16 h-16 text-muted-foreground/30" />
              </div>

              <div>
                <h2 className="text-2xl font-heading font-semibold mb-3">{t("Overview", "সংক্ষিপ্ত বিবরণ", lang)}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {lang === "bn" ? project.descriptionBn : project.description}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">{t("Amenities", "সুবিধাসমূহ", lang)}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-gold" /> {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <h3 className="font-heading font-semibold">{t("Project Details", "প্রকল্পের বিবরণ", lang)}</h3>
                {details.map((d) => (
                  <div key={d.label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                      <d.icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{d.label}</p>
                      <p className="text-sm font-medium">{d.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg gold-gradient text-accent-foreground font-semibold text-sm">
                <FileDown className="w-4 h-4" /> {t("Download Brochure", "ব্রোশিউর ডাউনলোড", lang)}
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors">
                <Calendar className="w-4 h-4" /> {t("Schedule Site Visit", "সাইট ভিজিট শিডিউল", lang)}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
