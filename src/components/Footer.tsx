import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLang, t } from "@/lib/i18n";

const Footer = () => {
  const { lang } = useLang();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
                <span className="font-heading font-bold text-accent-foreground text-sm">S&D</span>
              </div>
              <div>
                <p className="font-heading font-bold text-sm">S & D Sweet Home</p>
                <p className="text-[10px] opacity-70">Developers Ltd.</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              {t(
                "REHAB & RAJUK enlisted real estate developer building trust since inception. Your dream home, our commitment.",
                "আপনার স্বপ্নের বাড়ি, আমাদের প্রতিশ্রুতি। REHAB ও RAJUK তালিকাভুক্ত রিয়েল এস্টেট ডেভেলপার।",
                lang
              )}
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-gold">
              {t("Quick Links", "দ্রুত লিংক", lang)}
            </h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/projects" className="hover:text-gold transition-colors">{t("Our Projects", "আমাদের প্রকল্প", lang)}</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">{t("About Us", "আমাদের সম্পর্কে", lang)}</Link></li>
              <li><Link to="/enterprises" className="hover:text-gold transition-colors">{t("Enterprises", "এন্টারপ্রাইজ", lang)}</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">{t("Contact", "যোগাযোগ", lang)}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-gold">
              {t("Dhaka Office", "ঢাকা অফিস", lang)}
            </h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> Aftabnagar, Dhaka</li>
              <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0" /> +880 1XXXXXXXXX</li>
              <li className="flex gap-2"><Mail className="w-4 h-4 mt-0.5 shrink-0" /> info@sdsweethome.com</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-gold">
              {t("Chandpur Office", "চাঁদপুর অফিস", lang)}
            </h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> Chandpur Sadar, Chandpur</li>
              <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0" /> +880 1XXXXXXXXX</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs opacity-60">
          <p>© {new Date().getFullYear()} S & D Sweet Home Developers Ltd. All rights reserved.</p>
          <p>REHAB & RAJUK Enlisted</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
