import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", labelEn: "Home", labelBn: "হোম" },
  { to: "/about", labelEn: "About Us", labelBn: "আমাদের সম্পর্কে" },
  { to: "/projects", labelEn: "Projects", labelBn: "প্রকল্পসমূহ" },
  { to: "/enterprises", labelEn: "Enterprises", labelBn: "এন্টারপ্রাইজ" },
  { to: "/media", labelEn: "Media", labelBn: "মিডিয়া" },
  { to: "/contact", labelEn: "Contact", labelBn: "যোগাযোগ" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { lang, toggle } = useLang();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container-wide flex items-center justify-between h-16 md:h-20 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
            <span className="font-heading font-bold text-accent-foreground text-sm">S&D</span>
          </div>
          <div className="hidden sm:block">
            <p className="font-heading font-bold text-foreground text-sm leading-tight">S & D Sweet Home</p>
            <p className="text-[10px] text-muted-foreground">Developers Ltd.</p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === link.to
                  ? "text-accent-foreground bg-accent/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {lang === "bn" ? link.labelBn : link.labelEn}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="px-2.5 py-1.5 text-xs font-medium border border-border rounded-md hover:bg-secondary transition-colors"
          >
            {lang === "en" ? "বাংলা" : "EN"}
          </button>
          <a href="tel:+8801XXXXXXXXX" className="hidden md:flex">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-navy-light gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              Call Now
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
                className={`px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === link.to
                    ? "text-accent-foreground bg-accent/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
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
