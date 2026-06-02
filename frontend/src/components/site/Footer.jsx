import { Phone, Mail, MapPin } from "lucide-react";
import { NAV_LINKS, CONTACT, LOGO_URL } from "@/data/content";

const scrollTo = (href) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export const Footer = () => {
  return (
    <footer data-testid="site-footer" className="bg-navy-deep text-slate-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          {/* Left: brand */}
          <div>
            <div className="inline-flex rounded-lg bg-white px-3.5 py-2.5 shadow-md">
              <img src={LOGO_URL} alt="Relais IT — Trust it." className="h-7 w-auto object-contain" />
            </div>
            <p className="mt-3 text-sm font-medium text-white">Relais IT — Trust it.</p>
          </div>

          {/* Center: nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 md:justify-center">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                data-testid={`footer-nav-${l.href.replace("#", "")}`}
                onClick={() => scrollTo(l.href)}
                className="text-sm text-slate-400 hover:text-brand-orange transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Right: contact */}
          <ul className="space-y-2.5 text-sm md:text-right">
            <li><a href={CONTACT.tel} className="inline-flex items-center gap-2 md:flex-row-reverse hover:text-brand-orange transition-colors"><Phone size={16} className="text-brand-orange shrink-0" strokeWidth={1.5} /> {CONTACT.phone}</a></li>
            <li><a href={CONTACT.mailto} className="inline-flex items-center gap-2 md:flex-row-reverse hover:text-brand-orange transition-colors"><Mail size={16} className="text-brand-orange shrink-0" strokeWidth={1.5} /> {CONTACT.email}</a></li>
            <li className="inline-flex items-center gap-2 md:flex-row-reverse"><MapPin size={16} className="text-brand-orange shrink-0" strokeWidth={1.5} /> {CONTACT.location}</li>
          </ul>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-center md:text-left">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} Relais IT. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
