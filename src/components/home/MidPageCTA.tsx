import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useLang, t } from "@/lib/i18n";
import { Link } from "react-router-dom";

const MidPageCTA = () => {
  const { lang } = useLang();

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Gold gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-navy via-[#0F2F46] to-[#0A4D68]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(201,162,39,0.3) 1px, rgba(201,162,39,0.3) 2px)",
        }}
      />

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            {t("Ready to Find Your Home?", "আপনার বাড়ি খুঁজতে প্রস্তুত?", lang)}
          </h2>
          <p className="text-white/70 text-lg mb-8 leading-relaxed">
            {t(
              "Explore our portfolio of premium residential projects across Dhaka and Chandpur",
              "ঢাকা ও চাঁদপুর জুড়ে আমাদের প্রিমিয়াম আবাসিক প্রকল্পের পোর্টফোলিও অন্বেষণ করুন",
              lang
            )}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-linear-to-r from-gold to-gold-light rounded-xl text-navy font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-gold/25"
            >
              {t("Explore Projects", "প্রকল্প দেখুন", lang)}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {t("Contact Us", "যোগাযোগ করুন", lang)}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MidPageCTA;
