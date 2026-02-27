import { motion } from "framer-motion";
import { Award, Camera, Newspaper, PartyPopper } from "lucide-react";
import { useLang, t } from "@/lib/i18n";

const categories = [
  { icon: Award, labelEn: "Awards", labelBn: "পুরস্কার", count: 5 },
  { icon: PartyPopper, labelEn: "Handover Ceremonies", labelBn: "হ্যান্ডওভার অনুষ্ঠান", count: 8 },
  { icon: Newspaper, labelEn: "Press Coverage", labelBn: "প্রেস কভারেজ", count: 12 },
  { icon: Camera, labelEn: "Events", labelBn: "ইভেন্ট", count: 6 },
];

const Media = () => {
  const { lang } = useLang();

  return (
    <div className="pt-20">
      <section className="section-padding navy-gradient text-primary-foreground">
        <div className="container-wide">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">
            {t("Media & Updates", "মিডিয়া ও আপডেট", lang)}
          </h1>
          <p className="text-lg opacity-80">
            {t("Awards, ceremonies, and press coverage", "পুরস্কার, অনুষ্ঠান এবং প্রেস কভারেজ", lang)}
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl border border-border p-6 text-center hover:border-gold/40 transition-colors cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl gold-gradient flex items-center justify-center mx-auto mb-4">
                  <cat.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-heading font-semibold">{lang === "bn" ? cat.labelBn : cat.labelEn}</h3>
                <p className="text-sm text-muted-foreground mt-1">{cat.count} {t("items", "আইটেম", lang)}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center text-muted-foreground">
            <p>{t("Media gallery coming soon. Stay tuned for updates.", "মিডিয়া গ্যালারি শীঘ্রই আসছে।", lang)}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Media;
