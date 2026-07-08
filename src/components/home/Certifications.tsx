import { useLang, t } from "@/lib/i18n";
import { motion } from "framer-motion";
import dcciLogo from "@/icons/dcci.svg";

interface Certification {
  id: string;
  title: string;
  subtitle: string;
  logo?: string;
}

const certifications: Certification[] = [
  {
    id: "rehab",
    title: "REHAB Enlisted",
    subtitle: "Verified Certification",
  },
  {
    id: "rajuk",
    title: "RAJUK Approved",
    subtitle: "Verified Certification",
  },
  {
    id: "taxpayer",
    title: "Best Taxpayer Award",
    subtitle: "",
  },
  {
    id: "dcci",
    title: t("Verified Member", "যাচাইকৃত সদস্য"),
    subtitle: t(
      "Dhaka Chamber of Commerce & Industry",
      "ঢাকা চেম্বার অব কমার্স অ্যান্ড ইন্ডাস্ট্রি",
    ),
    logo: dcciLogo,
  },
];

const Certifications = () => {
  const { lang } = useLang();

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-card rounded-[24px] shadow-premium border border-border overflow-hidden p-6 md:p-8 lg:p-12"
        >
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground mb-2 text-center">
            {t("Certifications & Memberships", "সার্টিফিকেশন ও সদস্যপদ")}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-gold to-gold-light rounded-full mx-auto mb-8"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-xl border border-border/50 bg-secondary/30 hover:border-gold/30 transition-all duration-300 hover:shadow-subtle"
              >
                {cert.logo && (
                  <div className="w-16 h-16 mb-3 flex items-center justify-center">
                    <img
                      src={cert.logo}
                      alt={t("DCCI Logo", "ডিসিসিআই লোগো")}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                )}
                <h3 className="font-heading font-bold text-base sm:text-lg text-foreground">
                  {cert.title}
                </h3>
                {cert.subtitle && (
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                    {cert.subtitle}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
