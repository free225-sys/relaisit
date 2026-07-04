import { Phone, Mail, MapPin } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NAV_LINKS, CONTACT, LOGO_URL } from "@/data/content";
import { SERVICE_PAGE_LINKS } from "@/data/servicesPages";

export const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = (href) => {
    if (location.pathname !== "/") {
      navigate(`/${href}`);
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer data-testid="site-footer" className="bg-navy-deep text-slate-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marque */}
          <div>
            <div className="inline-flex rounded-lg bg-white px-3.5 py-2.5 shadow-md">
              <img src={LOGO_URL} alt="Relais IT — Trust it." className="h-7 w-auto object-contain" />
            </div>
            <p className="mt-3 text-sm font-medium text-white">Relais IT — Trust it.</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-400 max-w-[16rem]">
              Solutions informatiques fiables pour les entreprises, institutions et professionnels à Abidjan.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Navigation du site">
            <h3 className="text-sm font-semibold text-white">Navigation</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <button
                    data-testid={`footer-nav-${l.href.replace("#", "")}`}
                    onClick={() => handleNav(l.href)}
                    className="text-sm text-slate-400 hover:text-brand-orange transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services (maillage interne SEO) */}
          <nav aria-label="Nos services">
            <h3 className="text-sm font-semibold text-white">Nos services</h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICE_PAGE_LINKS.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/${p.slug}`}
                    data-testid={`footer-service-${p.slug}`}
                    className="text-sm text-slate-400 hover:text-brand-orange transition-colors"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href={CONTACT.tel} className="inline-flex items-center gap-2 hover:text-brand-orange transition-colors"><Phone size={16} className="text-brand-orange shrink-0" strokeWidth={1.5} /> {CONTACT.phone}</a></li>
              <li><a href={CONTACT.mailto} className="inline-flex items-center gap-2 hover:text-brand-orange transition-colors"><Mail size={16} className="text-brand-orange shrink-0" strokeWidth={1.5} /> {CONTACT.email}</a></li>
              <li className="inline-flex items-center gap-2"><MapPin size={16} className="text-brand-orange shrink-0" strokeWidth={1.5} /> {CONTACT.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-5 text-center md:text-left">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} Relais IT. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
