import { motion } from "framer-motion";
import { Search, MapPin, Home, Ruler } from "lucide-react";
import { useLang, t } from "@/lib/i18n";
import heroImage from "@/assets/hero-image-2.jpeg";

const HeroSection = () => {
  const { lang } = useLang();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Premium residential building by S & D Sweet Home Developers"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F2F46]/85 to-[#0A4D68]/70" />
      </div>

      <div className="relative z-10 container-wide px-4 sm:px-6 lg:px-8 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-medium mb-6">
            <Home className="w-3.5 h-3.5 mb-0.5" />
            {t("REHAB & RAJUK Enlisted Developer", "রিহ্যাব ও রাজউক তালিকাভুক্ত ডেভেলপার", lang)}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-6">
            <span className="text-white">{t("Building Dreams,", "স্বপ্ন গড়ি,", lang)}</span>
            <br />
            <span className="text-[#C9A227] mt-1 block">
              {t("Delivering Trust", "বিশ্বাস দিই", lang)}
            </span>
          </h1>

          <p className="text-lg text-primary-foreground/80 mb-10 max-w-lg leading-relaxed">
            {t(
              "Premium residential & commercial developments in Dhaka and Chandpur. Award-winning excellence since inception.",
              "ঢাকা ও চাঁদপুরে প্রিমিয়াম আবাসিক ও বাণিজ্যিক উন্নয়ন। প্রতিষ্ঠালগ্ন থেকে পুরস্কারজয়ী উৎকর্ষ।",
              lang
            )}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl bg-card rounded-xl p-4 md:p-6 shadow-[0_10px_25px_rgba(0,0,0,0.15)] border border-[rgba(15,47,70,0.10)]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2.5">
              <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
              <select className="bg-transparent text-sm text-foreground w-full outline-none">
                <option>{t("All Locations", "সকল এলাকা", lang)}</option>
                <option>Dhaka</option>
                <option>Chandpur</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2.5">
              <Home className="w-4 h-4 text-muted-foreground shrink-0" />
              <select className="bg-transparent text-sm text-foreground w-full outline-none">
                <option>{t("All Status", "সকল স্ট্যাটাস", lang)}</option>
                <option>{t("Ongoing", "চলমান", lang)}</option>
                <option>{t("Upcoming", "আসন্ন", lang)}</option>
                <option>{t("Completed", "সম্পন্ন", lang)}</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2.5">
              <Ruler className="w-4 h-4 text-muted-foreground shrink-0" />
              <select className="bg-transparent text-sm text-foreground w-full outline-none">
                <option>{t("Any Size", "যেকোনো সাইজ", lang)}</option>
                <option>1000-1200 sqft</option>
                <option>1200-1400 sqft</option>
                <option>1400-1600 sqft</option>
              </select>
            </div>
          </div>
          <button className="w-full sm:w-auto mt-4 px-8 py-3 bg-gradient-to-r from-[#C9A227] to-[#e0bc46] rounded-lg text-[#0F2F46] font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-md">
            <Search className="w-4 h-4" />
            {t("Search Properties", "প্রপার্টি খুঁজুন", lang)}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
