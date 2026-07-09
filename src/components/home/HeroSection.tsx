import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, MapPin, Home, Ruler, ArrowRight, Phone } from "lucide-react";
import { useLang, t } from "@/lib/i18n";
import { useNavigate, Link } from "react-router-dom";
import heroImage from "@/assets/hero-image-2.jpeg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const HeroSection = () => {
  const { lang } = useLang();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 200]);

  // Search States
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [size, setSize] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location && location !== "All Locations" && location !== "সকল এলাকা") {
      params.append("location", location);
    }
    if (status && status !== "All Status" && status !== "সকল স্ট্যাটাস") {
      let formattedStatus = status;
      if (status === "চলমান") formattedStatus = "Ongoing";
      if (status === "আসন্ন") formattedStatus = "Upcoming";
      if (status === "সম্পন্ন") formattedStatus = "Completed";
      params.append("status", formattedStatus);
    }
    if (size && size !== "Any Size" && size !== "যেকোনো সাইজ") {
      params.append("size", size);
    }

    navigate(`/projects?${params.toString()}`);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={heroImage}
          alt="Premium residential building by S & D Sweet Home Developers"
          className="w-full h-[120%] object-cover -mt-[10%]"
          width="1920"
          height="1080"
          fetchPriority="high"
          decoding="async"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,47,70,0.88) 0%, rgba(10,77,104,0.65) 50%, rgba(15,47,70,0.82) 100%)",
          }}
        />
        {/* Subtle architectural pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)",
          }}
        />
      </motion.div>

      <div className="relative z-10 container-wide px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-medium mb-6"
          >
            <Home className="w-3.5 h-3.5" />
            {t("REHAB & RAJUK Enlisted Developer", "রিহ্যাব ও রাজউক তালিকাভুক্ত ডেভেলপার", lang)}
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-[clamp(2rem,5vw,3.75rem)] font-heading font-bold text-primary-foreground leading-[1.1] mb-6"
          >
            <span className="text-white">
              {t("Building the Future", "ভবিষ্যৎ নির্মাণে", lang)}
            </span>
            <br />
            <span className="text-gold block">
              {t("Delivering Trust", "বিশ্বাসের প্রতিশ্রুতি", lang)}
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-white/75 mb-8 max-w-lg leading-relaxed"
          >
            {t(
              "A Trusted Name in Residential & Commercial Development",
              "আবাসিক ও বাণিজ্যিক উন্নয়নে বিশ্বস্ত নাম",
              lang
            )}
            <br />
            <span className="font-semibold text-white/90">
              {t("S & D Sweet Home Developers", "এস এন্ড ডি সুইট হোম ডেভেলপারস", lang)}
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-10">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-gold to-gold-light rounded-xl text-navy font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-gold/25"
            >
              {t("Explore Projects", "প্রকল্প দেখুন", lang)}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {t("Contact Us", "যোগাযোগ করুন", lang)}
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 text-sm font-medium text-white/80"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              {t("REHAB & RAJUK Enlisted", "রিহ্যাব ও রাজউক তালিকাভুক্ত", lang)}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              {t("Award Recognition (Best Taxpayer)", "সেরা করদাতা পুরস্কার", lang)}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              {t("Dhaka & Chandpur Projects", "ঢাকা ও চাঁদপুর প্রকল্প", lang)}
            </div>
          </motion.div>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="max-w-3xl bg-card rounded-2xl p-4 md:p-6 shadow-premium border border-border mt-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2.5">
              <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent text-sm text-foreground w-full outline-hidden"
              >
                <option value="">{t("All Locations", "সকল এলাকা", lang)}</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chandpur">Chandpur</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2.5">
              <Home className="w-4 h-4 text-muted-foreground shrink-0" />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-transparent text-sm text-foreground w-full outline-hidden"
              >
                <option value="">{t("All Status", "সকল স্ট্যাটাস", lang)}</option>
                <option value="Ongoing">{t("Ongoing", "চলমান", lang)}</option>
                <option value="Upcoming">{t("Upcoming", "আসন্ন", lang)}</option>
                <option value="Completed">{t("Completed", "সম্পন্ন", lang)}</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2.5">
              <Ruler className="w-4 h-4 text-muted-foreground shrink-0" />
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="bg-transparent text-sm text-foreground w-full outline-hidden"
              >
                <option value="">{t("Any Size", "যেকোনো সাইজ", lang)}</option>
                <option value="1000-1200">1000-1200 sqft</option>
                <option value="1200-1400">1200-1400 sqft</option>
                <option value="1400-1600">1400-1600 sqft</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="w-full sm:w-auto mt-4 px-8 py-3 bg-linear-to-r from-gold to-gold-light rounded-xl text-navy font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-gold/25"
          >
            <Search className="w-4 h-4" />
            {t("Search Properties", "প্রপার্টি খুঁজুন", lang)}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
