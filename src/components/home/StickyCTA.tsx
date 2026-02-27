import { Phone, FileDown } from "lucide-react";
import { useLang, t } from "@/lib/i18n";

const StickyCTA = () => {
  const { lang } = useLang();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border p-3 md:hidden">
      <div className="flex items-center gap-2">
        <a
          href="tel:+8801XXXXXXXXX"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
        >
          <Phone className="w-4 h-4" />
          {t("Call Now", "কল করুন", lang)}
        </a>
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg gold-gradient text-accent-foreground text-sm font-medium">
          <FileDown className="w-4 h-4" />
          {t("Brochure", "ব্রোশিউর", lang)}
        </button>
      </div>
    </div>
  );
};

export default StickyCTA;
