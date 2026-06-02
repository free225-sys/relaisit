import { Phone, Mail, MapPin } from "lucide-react";
import { CONTACT, LOGO_URL } from "@/data/content";

export const Footer = () => {
  return (
    <footer data-testid="site-footer" className="bg-navy-deep text-slate-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="inline-flex rounded-xl bg-white px-4 py-3 shadow-lg">
              <img src={LOGO_URL} alt="Relais IT — Trust it." className="h-9 w-auto object-contain" />
            </div>
            <p className="mt-5 text-base font-medium text-white">Relais IT — Trust it.</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Votre partenaire IT de confiance.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Contact</h4>
            <ul className="mt-5 space-y-4 text-sm">
              <li><a href={CONTACT.tel} className="flex items-center gap-3 hover:text-brand-orange transition-colors"><Phone size={18} className="text-brand-orange shrink-0" strokeWidth={1.5} /> {CONTACT.phone}</a></li>
              <li><a href={CONTACT.mailto} className="flex items-center gap-3 hover:text-brand-orange transition-colors"><Mail size={18} className="text-brand-orange shrink-0" strokeWidth={1.5} /> {CONTACT.email}</a></li>
              <li className="flex items-center gap-3"><MapPin size={18} className="text-brand-orange shrink-0" strokeWidth={1.5} /> {CONTACT.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} Relais IT. Tous droits réservés.</p>
          <p className="text-sm text-slate-500">Trust it.</p>
        </div>
      </div>
    </footer>
  );
};
