import { useLang, t } from "@/lib/i18n";
import { motion } from "framer-motion";
import dcciLogo from "@/icons/dcci.svg";
import rehabIcon from "@/icons/rehab-icon.png";
import rajukIcon from "@/icons/Rajuk.png";
import taxIcon from "@/icons/Government_Seal.png";

interface Certification {
  id: string;
  titleEn: string;
  titleBn: string;
  subtitleEn: string;
  subtitleBn: string;
  logo?: string;
}

const certifications: Certification[] = [
  {
    id: "rehab",
    titleEn: "REHAB Enlisted",
    titleBn: "রিহ্যাব তালিকাভুক্ত",
    subtitleEn: "Verified Certification",
    subtitleBn: "যাচাইকৃত সনদ",
    logo: rehabIcon,
  },
  {
    id: "rajuk",
    titleEn: "RAJUK Approved",
    titleBn: "রাজউক অনুমোদিত",
    subtitleEn: "Verified Certification",
    subtitleBn: "যাচাইকৃত সনদ",
    logo: rajukIcon,
  },
  {
    id: "taxpayer",
    titleEn: "Best Taxpayer Award",
    titleBn: "সেরা করদাতা পুরস্কার",
    subtitleEn: "",
    subtitleBn: "",
    logo: taxIcon,
  },
  {
    id: "dcci",
    titleEn: "Verified Member",
    titleBn: "যাচাইকৃত সদস্য",
    subtitleEn: "Dhaka Chamber of Commerce & Industry",
    subtitleBn: "ঢাকা চেম্বার অব কমার্স অ্যান্ড ইন্ডাস্ট্রি",
    logo: dcciLogo,
  },
];

const Certifications = () => {
  const { lang } = useLang();

  return (
    <section className="section-padding bg-card">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="rounded-[24px] shadow-premium border border-border overflow-hidden p-6 md:p-8 lg:p-12"
        >
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground mb-2 text-center">
            {t("Certifications & Memberships", "সার্টিফিকেশন ও সদস্যপদ", lang)}
          </h2>
          <div className="w-16 h-1 bg-linear-to-r from-gold to-gold-light rounded-full mx-auto mb-8"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-xl border border-border bg-white shadow-subtle hover:shadow-premium hover:-translate-y-1 transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:hover:border-white/20 dark:hover:shadow-[0_8px_24px_rgba(201,162,39,0.08)]"
              >
                {cert.logo && (
                  <div className="w-14 h-14 rounded-lg bg-[#F1F5F9] dark:bg-white/10 dark:ring-1 dark:ring-gold/25 flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={cert.logo}
                      alt={t(cert.titleEn, cert.titleBn, lang)}
                      className="w-10 h-10 object-contain"
                      width="40"
                      height="40"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                )}
                <h3 className="font-heading font-semibold text-[#1E293B] dark:text-slate-100">
                  {t(cert.titleEn, cert.titleBn, lang)}
                </h3>
                {cert.subtitleEn && (
                  <p className="text-xs text-[#475569] dark:text-slate-400 mt-1 font-medium">
                    {t(cert.subtitleEn, cert.subtitleBn, lang)}
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
