import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, LOGO_URL } from "@/data/content";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      data-testid="site-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm" : "bg-white/70 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <a
            href="#accueil"
            data-testid="logo-link"
            onClick={(e) => { e.preventDefault(); handleNav("#accueil"); }}
            className="flex items-center shrink-0"
          >
            <img src={LOGO_URL} alt="Relais IT — Trust it." className="h-10 sm:h-11 w-auto object-contain" />
          </a>

          <nav className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                data-testid={`nav-${link.href.replace("#", "")}`}
                onClick={() => handleNav(link.href)}
                className="relative text-sm font-medium text-slate-600 hover:text-navy transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-brand-orange after:transition-all hover:after:w-full"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <button
              data-testid="header-cta-devis"
              onClick={() => handleNav("#contact")}
              className="inline-flex items-center justify-center bg-brand-orange hover:bg-brand-orangeDark text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-brand-orange/20"
            >
              Demander un devis
            </button>
          </div>

          <button
            data-testid="mobile-menu-toggle"
            className="lg:hidden p-2 text-navy"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <div data-testid="mobile-menu" className="lg:hidden border-t border-slate-200 bg-white">
          <nav className="px-6 py-5 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                data-testid={`mobile-nav-${link.href.replace("#", "")}`}
                onClick={() => handleNav(link.href)}
                className="text-left py-3 text-base font-medium text-slate-700 hover:text-navy border-b border-slate-100"
              >
                {link.label}
              </button>
            ))}
            <button
              data-testid="mobile-cta-devis"
              onClick={() => handleNav("#contact")}
              className="mt-4 inline-flex items-center justify-center bg-brand-orange hover:bg-brand-orangeDark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Demander un devis
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
