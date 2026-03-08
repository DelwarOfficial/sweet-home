import { motion } from "framer-motion";
import { useLang, t } from "@/lib/i18n";
import rehabIcon from "@/icons/rehab-icon.png";
import rajukIcon from "@/icons/Rajuk.png";
import taxIcon from "@/icons/Government_Seal.png";

const badges = [
  { img: rehabIcon, labelEn: "REHAB Enlisted", labelBn: "রিহ্যাব তালিকাভুক্ত" },
  { img: rajukIcon, labelEn: "RAJUK Approved", labelBn: "রাজউক অনুমোদিত" },
  { img: taxIcon, labelEn: "Best Taxpayer Award", labelBn: "সেরা করদাতা পুরস্কার" },
];

const TrustBadges = () => {
  const { lang } = useLang();

  return (
    <section className="section-padding bg-card">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-4 p-6 rounded-2xl border border-border bg-white shadow-subtle hover:shadow-premium hover:-translate-y-1 transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:hover:border-white/20 dark:hover:shadow-[0_8px_24px_rgba(201,162,39,0.08)]"
            >
              <div className="w-14 h-14 rounded-lg bg-[#F1F5F9] dark:bg-white/10 dark:ring-1 dark:ring-gold/25 flex items-center justify-center shrink-0 overflow-hidden">
                <img
                  src={badge.img}
                  alt={lang === "bn" ? badge.labelBn : badge.labelEn}
                  className="w-10 h-10 object-contain"
                  width="40"
                  height="40"
                  decoding="async"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-[#1E293B] dark:text-slate-100">
                  {lang === "bn" ? badge.labelBn : badge.labelEn}
                </h3>
                <p className="text-xs text-[#475569] dark:text-slate-400 mt-1 font-medium">
                  {t("Verified Certification", "যাচাইকৃত সনদ", lang)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section >
  );
};

export default TrustBadges;
