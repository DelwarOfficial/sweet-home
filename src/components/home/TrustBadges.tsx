import { motion } from "framer-motion";
import { useLang, t } from "@/lib/i18n";
import { Shield, Building2, MapPin, Award } from "lucide-react";
import rehabIcon from "@/icons/rehab-icon.png";
import rajukIcon from "@/icons/Rajuk.png";
import taxIcon from "@/icons/Government_Seal.png";

const badges = [
  { img: rehabIcon, labelEn: "REHAB Enlisted", labelBn: "রিহ্যাব তালিকাভুক্ত" },
  { img: rajukIcon, labelEn: "RAJUK Approved", labelBn: "রাজউক অনুমোদিত" },
  { img: taxIcon, labelEn: "Best Taxpayer Award", labelBn: "সেরা করদাতা পুরস্কার" },
];

const stats = [
  { icon: Building2, value: "11+", labelEn: "Projects Delivered", labelBn: "প্রকল্প সম্পন্ন" },
  { icon: Award, value: "15+", labelEn: "Years of Trust", labelBn: "বছরের বিশ্বাস" },
  { icon: MapPin, value: "2", labelEn: "Cities Covered", labelBn: "শহর কভার" },
];

const TrustBadges = () => {
  const { lang } = useLang();

  return (
    <section className="relative -mt-10 pb-12 pt-0 bg-transparent z-20">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl shadow-premium border border-border overflow-hidden"
        >
          {/* Stats Row */}
          <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center py-5 px-3 text-center">
                <stat.icon className="w-5 h-5 text-gold mb-2" />
                <span className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground mt-1 font-medium">
                  {lang === "bn" ? stat.labelBn : stat.labelEn}
                </span>
              </div>
            ))}
          </div>

          {/* Badges Row */}
          <div className="grid grid-cols-3 divide-x divide-border">
            {badges.map((badge, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center py-4 px-3 text-center gap-2 hover:bg-secondary/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] dark:bg-white/10 dark:ring-1 dark:ring-gold/25 flex items-center justify-center shrink-0 overflow-hidden">
                  <img
                    src={badge.img}
                    alt={lang === "bn" ? badge.labelBn : badge.labelEn}
                    className="w-7 h-7 object-contain"
                    width="28"
                    height="28"
                    decoding="async"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm text-foreground">
                    {lang === "bn" ? badge.labelBn : badge.labelEn}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">
                    {t("Verified Certification", "যাচাইকৃত সনদ", lang)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Credibility Caption */}
        <p className="text-center text-sm text-muted-foreground mt-5 font-medium">
          <Shield className="w-4 h-4 inline-block mr-1.5 -mt-0.5 text-gold" />
          {t(
            "A REHAB & RAJUK enlisted developer with 15+ years of excellence in Dhaka & Chandpur",
            "ঢাকা ও চাঁদপুরে ১৫+ বছরের দক্ষতা সহ রিহ্যাব ও রাজউক তালিকাভুক্ত ডেভেলপার",
            lang
          )}
        </p>
      </div>
    </section>
  );
};

export default TrustBadges;
