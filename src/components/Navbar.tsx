import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Moon, Sun } from "lucide-react";
import { useLang, t } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", labelEn: "Home", labelBn: "হোম" },
  { to: "/about", labelEn: "About Us", labelBn: "আমাদের সম্পর্কে" },
  { to: "/projects", labelEn: "Projects", labelBn: "প্রকল্প" },
  { to: "/enterprises", labelEn: "Enterprises", labelBn: "এন্টারপ্রাইজ" },
  { to: "/media", labelEn: "Media", labelBn: "মিডিয়া" },
  { to: "/contact", labelEn: "Contact", labelBn: "যোগাযোগ" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const { lang, toggle } = useLang();
  const location = useLocation();

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const isDark = theme === "dark";
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
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

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${location.pathname === link.to
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
            aria-label="Toggle dark mode"
            aria-pressed={theme === "dark"}
            className="w-8 h-8 flex items-center justify-center border border-border text-foreground rounded-full hover:bg-secondary hover:shadow-subtle transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button
            onClick={toggle}
            className="px-3 py-1.5 text-xs font-semibold border border-border text-primary rounded-full hover:bg-secondary hover:shadow-subtle transition-all duration-300"
          >
            {lang === "en" ? "বাংলা" : "EN"}
          </button>
          <a href="tel:+8801806999979" className="hidden md:flex">
            <Button size="sm" className="bg-gradient-to-r from-primary to-navy-light text-white hover:opacity-90 shadow-premium gap-1.5 rounded-full px-5">
              <Phone className="w-3.5 h-3.5" />
              {t("Call Now", "কল করুন", lang)}
            </Button>
          </a>
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="container-wide px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
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
        </div>
      )}
    </header>
  );
};

export default Navbar;
