import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLang, t } from "@/lib/i18n";

const Footer = () => {
  const { lang } = useLang();

  return (
    <footer className="bg-[#081829] text-[#F8FAFC] border-t border-navy-light/40">
      <div className="container-wide section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/sd Logo.webp"
                alt="S & D Sweet Home Developers Ltd. Logo"
                className="w-10 h-10 object-contain"
              />
              <div>
                <p className="font-heading font-bold text-sm">S & D Sweet Home</p>
                <p className="text-[10px] opacity-70">Developers Ltd.</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xs">
              {t(
                "REHAB & RAJUK enlisted real estate developer building trust since inception. Your dream home, our commitment.",
                "আপনার স্বপ্নের বাড়ি, আমাদের প্রতিশ্রুতি। রিহ্যাব ও রাজউক তালিকাভুক্ত রিয়েল এস্টেট ডেভেলপার।",
                lang
              )}
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 text-gold">
              {t("Quick Links", "দ্রুত লিংক", lang)}
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link to="/projects" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">{t("Our Projects", "আমাদের প্রকল্প", lang)}</Link></li>
              <li><Link to="/about" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">{t("About Us", "আমাদের সম্পর্কে", lang)}</Link></li>
              <li><Link to="/managing-director-message" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">{t("MD's Message", "এমডি'র বার্তা", lang)}</Link></li>
              <li><Link to="/enterprises" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">{t("Enterprises", "এন্টারপ্রাইজ", lang)}</Link></li>
              <li><Link to="/landowners" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">{t("Landowners", "ভূমির মালিকগণ", lang)}</Link></li>
              <li><Link to="/contact" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">{t("Contact", "যোগাযোগ", lang)}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 text-gold">
              {t("Dhaka Office", "ঢাকা অফিস", lang)}
            </h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> {t("House 65, Road 2, Block C, Aftabnagar Badda. Dhaka: 1212", "হাউস ৬৫, রোড ২, ব্লক সি, আফতাবনগর বাড্ডা। ঢাকা: ১২১২", lang)}</li>
              <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0" /> +880 1806-999979</li>
              <li className="flex gap-2"><Mail className="w-4 h-4 mt-0.5 shrink-0" /> info@sdsweethome.com</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 text-gold">
              {t("Chandpur Office", "চাঁদপুর অফিস", lang)}
            </h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> {t("S & D Majeda Garden, 750 Abdul Karim Patwary Sarok Taltola, Chandpur.", "এস অ্যান্ড ডি মাজেদা গার্ডেন, ৭৫০ আব্দুল করিম পাটওয়ারী সড়ক, তালতলা, চাঁদপুর।", lang)}</li>
              <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0" /> +880 1806-999979</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} S & D Sweet Home Developers Ltd. All rights reserved.</p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-medium tracking-wide">
              {t("REHAB Enlisted", "রিহ্যাব তালিকাভুক্ত", lang)}
            </span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-medium tracking-wide">
              {t("RAJUK Enlisted", "রাজউক তালিকাভুক্ত", lang)}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
