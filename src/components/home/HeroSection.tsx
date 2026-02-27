import { motion } from "framer-motion";
import { Search, MapPin, Home, Ruler } from "lucide-react";
import { useLang, t } from "@/lib/i18n";
import heroImage from "@/assets/hero-building.jpg";

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
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
      </div>

      <div className="relative z-10 container-wide px-4 sm:px-6 lg:px-8 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-medium mb-6">
            <Home className="w-3.5 h-3.5" />
            {t("REHAB & RAJUK Enlisted Developer", "REHAB ও RAJUK তালিকাভুক্ত ডেভেলপার", lang)}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-6">
            {t("Building Dreams,", "স্বপ্ন গড়ি,", lang)}
            <br />
            <span className="text-gold-gradient">
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
          className="max-w-3xl bg-card/95 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-2xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2.5">
              <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
              <select className="bg-transparent text-sm text-foreground w-full outline-none">
                <option>{t("All Locations", "সব এলাকা", lang)}</option>
                <option>Dhaka</option>
                <option>Chandpur</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2.5">
              <Home className="w-4 h-4 text-muted-foreground shrink-0" />
              <select className="bg-transparent text-sm text-foreground w-full outline-none">
                <option>{t("All Status", "সব স্ট্যাটাস", lang)}</option>
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
          <button className="w-full sm:w-auto mt-3 px-6 py-2.5 gold-gradient rounded-lg text-accent-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <Search className="w-4 h-4" />
            {t("Search Properties", "প্রপার্টি খুঁজুন", lang)}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
