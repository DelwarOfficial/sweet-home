import { motion } from "framer-motion";
import { Award, Shield, Building2 } from "lucide-react";
import { useLang, t } from "@/lib/i18n";

const badges = [
  { icon: Shield, labelEn: "REHAB Enlisted", labelBn: "রিহ্যাব তালিকাভুক্ত" },
  { icon: Building2, labelEn: "RAJUK Approved", labelBn: "রাজউক অনুমোদিত" },
  { icon: Award, labelEn: "Best Taxpayer Award", labelBn: "সেরা করদাতা পুরস্কার" },
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
              className="flex items-center gap-4 p-6 rounded-2xl border border-border bg-white shadow-subtle hover:shadow-premium hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-lg bg-[#F1F5F9] flex items-center justify-center shrink-0">
                <badge.icon className="w-6 h-6 text-[#0A4D68]" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-[#1E293B]">
                  {lang === "bn" ? badge.labelBn : badge.labelEn}
                </h3>
                <p className="text-xs text-[#475569] mt-1 font-medium">
                  {t("Verified Certification", "যাচাইকৃত সনদ", lang)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
