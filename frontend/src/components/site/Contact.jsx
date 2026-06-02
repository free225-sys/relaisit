import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { CONTACT } from "@/data/content";
import { Reveal } from "./Reveal";

export const Contact = () => {
  const cards = [
    { icon: Phone, label: "Téléphone", value: CONTACT.phone, href: CONTACT.tel },
    { icon: Mail, label: "Email", value: CONTACT.email, href: CONTACT.mailto },
    { icon: MapPin, label: "Localisation", value: CONTACT.location, href: null },
  ];

  return (
    <section id="contact" data-testid="contact-section" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-sm uppercase tracking-[0.2em] font-bold text-brand-orange">Contact</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-navy leading-tight">
              Parlons de votre projet IT
            </h2>
            <p className="mt-4 text-base lg:text-lg leading-relaxed text-slate-600">
              Besoin d'un devis, d'une assistance ou d'un accompagnement ? Contactez Relais IT directement.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {cards.map((c, i) => {
            const Icon = c.icon;
            const inner = (
              <div className="h-full rounded-2xl border border-slate-100 bg-slate-50 p-7 text-center transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-navy/5">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <p className="mt-4 text-xs uppercase tracking-wide text-slate-400 font-semibold">{c.label}</p>
                <p className="mt-1 text-base font-medium text-navy break-words">{c.value}</p>
              </div>
            );
            return c.href ? (
              <a key={c.label} href={c.href} data-testid={`contact-${c.label.toLowerCase()}`} className="block h-full">{inner}</a>
            ) : (
              <div key={c.label} data-testid={`contact-${c.label.toLowerCase()}`} className="h-full">{inner}</div>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={CONTACT.tel}
              data-testid="contact-call-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orangeDark text-white font-semibold py-3.5 px-8 rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-brand-orange/25"
            >
              <Phone size={18} /> Appeler maintenant
            </a>
            <a
              href={CONTACT.mailto}
              data-testid="contact-email-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold py-3.5 px-8 rounded-lg transition-all duration-300"
            >
              <Mail size={18} /> Envoyer un email
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-whatsapp-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-slate-200 text-navy hover:border-navy font-semibold py-3.5 px-8 rounded-lg transition-all duration-300"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
