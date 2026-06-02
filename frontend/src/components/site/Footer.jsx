import { Phone, Mail, MapPin } from "lucide-react";
import { NAV_LINKS, SERVICES, CONTACT, LOGO_URL } from "@/data/content";

const scrollTo = (href) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export const Footer = () => {
  return (
    <footer data-testid="site-footer" className="bg-navy-deep text-slate-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="inline-flex rounded-xl bg-white px-5 py-4 shadow-lg">
              <img src={LOGO_URL} alt="Relais IT — Trust it." className="h-9 w-auto object-contain" />
            </div>
            <p className="mt-6 text-lg font-medium text-white">Relais IT — Trust it.</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 max-w-xs">
              Votre partenaire de confiance pour des solutions informatiques fiables, modernes et sécurisées.
            </p>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Navigation</h4>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <button
                    data-testid={`footer-nav-${l.href.replace("#", "")}`}
                    onClick={() => scrollTo(l.href)}
                    className="text-sm text-slate-400 hover:text-brand-orange transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Services</h4>
            <ul className="mt-5 space-y-3">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.title} className="text-sm text-slate-400">{s.title}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Contact</h4>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-center gap-3"><Phone size={18} className="text-brand-orange shrink-0" strokeWidth={1.5} /> {CONTACT.phone}</li>
              <li className="flex items-center gap-3"><Mail size={18} className="text-brand-orange shrink-0" strokeWidth={1.5} /> {CONTACT.email}</li>
              <li className="flex items-center gap-3"><MapPin size={18} className="text-brand-orange shrink-0" strokeWidth={1.5} /> {CONTACT.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} Relais IT. Tous droits réservés.</p>
          <p className="text-sm text-slate-500">Trust it.</p>
        </div>
      </div>
    </footer>
  );
};
