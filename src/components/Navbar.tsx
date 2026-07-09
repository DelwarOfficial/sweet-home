import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useLang, t } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

const desktopNavLinks = [
  { to: "/", labelEn: "Home", labelBn: "হোম" },
  { to: "/about", labelEn: "About Us", labelBn: "আমাদের সম্পর্কে" },
  { to: "/projects", labelEn: "Projects", labelBn: "প্রকল্প" },
  { to: "/enterprises", labelEn: "Enterprises", labelBn: "এন্টারপ্রাইজ" },
  { to: "/media", labelEn: "Media", labelBn: "মিডিয়া" },
  { to: "/blog", labelEn: "Blog", labelBn: "ব্লগ" },
  { to: "/landowners", labelEn: "Landowners", labelBn: "ভূমির মালিক" },
  { to: "/contact", labelEn: "Contact", labelBn: "যোগাযোগ" },
];

// Mobile menu uses the same links as desktop (Landowners already included)

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggle } = useLang();
  const location = useLocation();
  // Use next-themes — inherits defaultTheme="dark" from ThemeProvider in App.tsx
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b transition-shadow duration-300 ${scrolled ? "border-border shadow-md" : "border-transparent"}`}>
      <div className="container-wide flex items-center justify-between h-16 md:h-20 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/sd Logo.webp"
            alt="S & D Sweet Home Developers Ltd. Logo"
            className="w-10 h-10 object-contain"
          />
          <div className="flex flex-col">
            <p className="font-heading font-bold text-foreground text-xs sm:text-sm leading-tight whitespace-nowrap">S & D Sweet Home</p>
            <p className="text-[9px] sm:text-[10px] text-muted-foreground whitespace-nowrap">Developers Ltd.</p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {desktopNavLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 text-[13px] font-medium rounded-full transition-all duration-300 whitespace-nowrap ${location.pathname === link.to
                ? "text-primary bg-secondary shadow-subtle font-semibold"
                : "text-muted-foreground hover:text-primary hover:bg-secondary"
                }`}
            >
              {lang === "bn" ? link.labelBn : link.labelEn}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={isDark}
            className="w-8 h-8 flex items-center justify-center border border-border text-foreground rounded-full hover:bg-secondary hover:shadow-subtle transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={toggle}
            className="px-3 py-1.5 text-xs font-semibold border border-border text-primary rounded-full hover:bg-secondary hover:shadow-subtle transition-all duration-300"
          >
            {lang === "en" ? "বাংলা" : "EN"}
          </button>
          <a href="tel:+8801806999979" className="hidden md:flex">
            <Button size="sm" className="bg-linear-to-r from-primary to-navy-light text-white hover:opacity-90 shadow-premium gap-1.5 rounded-full px-5">
              <Phone className="w-3.5 h-3.5" />
              {t("Call Now", "কল করুন", lang)}
            </Button>
          </a>
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-card border-t border-border overflow-hidden"
          >
            <nav className="container-wide px-4 py-4 flex flex-col gap-1">
              {desktopNavLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${location.pathname === link.to
                    ? "text-primary bg-secondary shadow-subtle"
                    : "text-muted-foreground hover:text-primary hover:bg-secondary"
                    }`}
                >
                  {lang === "bn" ? link.labelBn : link.labelEn}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
