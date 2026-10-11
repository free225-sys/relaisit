import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icons } from "@/lib/icons";
import { NAV_LINKS, LOGO_URL } from "@/data/content";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(
    ({ refocus = false } = {}) => {
      setOpen(false);
      if (refocus) toggleRef.current?.focus();
    },
    [],
  );

  // Fermeture du menu mobile à la touche Échap et au clic à l'extérieur.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") close({ refocus: true });
    };
    const onPointerDown = (e) => {
      if (panelRef.current?.contains(e.target) || toggleRef.current?.contains(e.target)) return;
      close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, close]);

  // Les entrées de menu sont de vrais liens : explorables par les moteurs,
  // ouvrables dans un nouvel onglet, copiables. Le clic est intercepté
  // uniquement pour éviter un rechargement complet depuis une page interne.
  const hrefFor = (hash) => (isHome ? hash : `/${hash}`);

  const handleClick = (hash) => (event) => {
    close();
    if (isHome) return; // défilement natif, déjà fluide via scroll-behavior
    event.preventDefault();
    navigate(`/${hash}`);
  };

  // Transparent uniquement en haut de l'accueil (au-dessus de la vidéo du hero)
  const solid = scrolled || open || !isHome;

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <a
            href={hrefFor("#accueil")}
            data-testid="logo-link"
            onClick={handleClick("#accueil")}
            aria-label="Relais IT — retour à l'accueil"
            className={`flex items-center shrink-0 transition-all duration-300 ${
              solid ? "" : "bg-white rounded-xl px-2.5 py-1.5 shadow-md"
            }`}
          >
            <img
              src={LOGO_URL}
              alt="Relais IT — Trust it."
              width="128"
              height="43"
              className="h-auto w-[112px] sm:w-[128px] object-contain"
            />
          </a>

          <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={hrefFor(link.href)}
                onClick={handleClick(link.href)}
                data-testid={`nav-${link.href.replace("#", "")}`}
                className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-brand-cta after:transition-all hover:after:w-full ${
                  solid
                    ? "text-slate-600 hover:text-navy"
                    : "text-white/90 hover:text-white drop-shadow-sm"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <a
              href={hrefFor("#contact")}
              onClick={handleClick("#contact")}
              data-testid="header-cta-devis"
              className="inline-flex items-center justify-center bg-brand-cta hover:bg-brand-ctaDark text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Demander un devis
            </a>
          </div>

          <button
            ref={toggleRef}
            type="button"
            data-testid="mobile-menu-toggle"
            className={`lg:hidden p-2 transition-colors ${solid ? "text-navy" : "text-white"}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
          >
            {open ? <Icons.X size={26} /> : <Icons.Menu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="menu-mobile"
          ref={panelRef}
          data-testid="mobile-menu"
          className="lg:hidden border-t border-slate-200 bg-white"
        >
          <nav aria-label="Navigation principale" className="px-6 py-5 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={hrefFor(link.href)}
                onClick={handleClick(link.href)}
                data-testid={`mobile-nav-${link.href.replace("#", "")}`}
                className="py-3 text-base font-medium text-slate-700 hover:text-navy border-b border-slate-100"
              >
                {link.label}
              </a>
            ))}
            <a
              href={hrefFor("#contact")}
              onClick={handleClick("#contact")}
              data-testid="mobile-cta-devis"
              className="mt-4 inline-flex items-center justify-center bg-brand-cta hover:bg-brand-ctaDark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Demander un devis
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
