import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Ruler, Building, Layers, Compass, CheckCircle, ArrowLeft, FileDown, Calendar, Eye, X } from "lucide-react";
import { useLang, t } from "@/lib/i18n";
import { projects } from "@/lib/projects-data";

const ProjectDetail = () => {
  const { slug } = useParams();
  const { lang } = useLang();
  const project = projects.find((p) => p.slug === slug);
  const [activeImage, setActiveImage] = useState(0);

  if (!project) {
    return (
      <div className="pt-20 section-padding text-center">
        <h1 className="text-2xl font-heading font-bold">{t("Project not found", "প্রকল্প পাওয়া যায়নি", lang)}</h1>
        <Link to="/projects" className="text-gold-dark mt-4 inline-block">{t("← Back to projects", "← প্রজেক্টে ফিরে যান", lang)}</Link>
      </div>
    );
  }

  const details = [
    { icon: Ruler, label: t("Flat Size", "ফ্ল্যাটের সাইজ", lang), value: project.flatSize },
    { icon: Layers, label: t("Land Area", "জমির পরিমাণ", lang), value: project.landArea },
    { icon: Building, label: t("Floors", "তলা", lang), value: project.floors },
    { icon: Compass, label: t("Facing", "মুখী", lang), value: project.facing },
  ];

  const gallery = project.images && project.images.length > 0 ? project.images : (project.image ? [project.image] : []);
  const activeIdx = Math.min(activeImage, gallery.length - 1);

  return (
    <div className="pt-20">
      <section className="section-padding navy-gradient text-primary-foreground">
        <div className="container-wide">
          <Link to="/projects" className="inline-flex items-center gap-1 text-sm opacity-70 hover:opacity-100 mb-4 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> {t("All Projects", "সব প্রজেক্ট", lang)}
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">{lang === "bn" ? project.nameBn : project.name}</h1>
              <p className="flex items-center gap-1 text-lg opacity-80">
                <MapPin className="w-4 h-4" /> {lang === "bn" ? `${project.city === "Dhaka" ? "ঢাকা" : "চাঁদপুর"} > ${project.locationBn}` : `${project.city} > ${project.location}`}
              </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {gallery.length === 0 ? (
                <div className="aspect-[4/5] lg:aspect-[5/4] bg-[#F1F5F9] rounded-2xl flex items-center justify-center border border-[rgba(15,47,70,0.10)]">
                  <Building className="w-16 h-16 text-[#94A3B8]/30" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="aspect-[4/5] lg:aspect-[5/4] bg-linear-to-br from-[#0F2F46]/5 to-[#0A4D68]/10 rounded-2xl flex items-center justify-center overflow-hidden border border-[rgba(15,47,70,0.10)] relative">
                    <img
                      src={gallery[activeIdx]}
                      alt={lang === "bn" ? project.nameBn : project.name}
                      className="w-full h-full object-contain p-4 drop-shadow-lg transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-[rgba(15,47,70,0.05)] pointer-events-none" />
                  </div>
                  {gallery.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2 px-1 snap-x scrollbar-hide">
                      {gallery.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          className={`relative h-20 w-28 shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${activeIdx === i ? 'border-[#C9A227] shadow-md opacity-100 scale-105' : 'border-transparent opacity-50 hover:opacity-100'}`}
                        >
                          <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" loading="lazy" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div>
                <h2 className="text-2xl font-heading font-semibold mb-3">{t("Overview", "সংক্ষিপ্ত বিবরণ", lang)}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {lang === "bn" ? project.descriptionBn : project.description}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">{t("Amenities", "সুযোগ-সুবিধা", lang)}</h2>
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
                <h3 className="font-heading font-semibold">{t("Project Details", "প্রকল্পের বিস্তারিত", lang)}</h3>
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

              {project.brochure ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={encodeURI(project.brochure)}
                    download
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-linear-to-r from-[#C9A227] to-[#e0bc46] text-[#0F2F46] shadow-md font-bold text-sm hover:opacity-90 transition-opacity"
                  >
                    <FileDown className="w-4 h-4" /> {t("Download", "ডাউনলোড", lang)}
                  </a>
                  <a
                    href={`${encodeURI(project.brochure)}#view=FitH&toolbar=1`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-[#F1F5F9] text-[#0F2F46] border border-[rgba(15,47,70,0.15)] font-semibold text-sm hover:bg-[#0F2F46] hover:text-white transition-all duration-300"
                  >
                    <Eye className="w-4 h-4" /> {t("Preview", "প্রিভিউ", lang)}
                  </a>
                </div>
              ) : (
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#F1F5F9] text-[#94A3B8] border border-[rgba(15,47,70,0.05)] font-semibold text-sm cursor-not-allowed"
                >
                  <FileDown className="w-4 h-4" /> {t("Brochure Coming Soon", "ব্রোশার শিঘ্রই আসবে", lang)}
                </button>
              )}
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors">
                <Calendar className="w-4 h-4" /> {t("Schedule Site Visit", "সাইট ভিজিটের সময় নির্ধারণ করুন", lang)}
              </button>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default ProjectDetail;
