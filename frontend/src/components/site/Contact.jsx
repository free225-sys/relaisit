import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { CONTACT } from "@/data/content";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";

export const Contact = () => {
  const cards = [
    { icon: Phone, label: "Téléphone", value: CONTACT.phone, href: CONTACT.tel, tid: "contact-telephone" },
    { icon: Mail, label: "Email", value: CONTACT.email, href: CONTACT.mailto, tid: "contact-email" },
    { icon: MapPin, label: "Localisation", value: CONTACT.location, href: null, tid: "contact-localisation" },
  ];

  return (
    <section id="contact" data-testid="contact-section" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-sm uppercase tracking-[0.2em] font-bold text-brand-ink">Contact</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-navy leading-tight">
              Parlons de votre projet IT
            </h2>
            <p className="mt-4 text-base lg:text-lg leading-relaxed text-slate-600">
              Décrivez-nous votre besoin en deux minutes, ou joignez-nous directement.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Formulaire */}
          <div className="lg:col-span-3">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>

          {/* Voies de contact directes */}
          <div className="lg:col-span-2">
            <Reveal delay={0.1}>
              <div className="space-y-4">
                {cards.map((c) => {
                  const Icon = c.icon;
                  const inner = (
                    <div className="flex h-full items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:shadow-navy/5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
                        <Icon size={20} strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">{c.label}</p>
                        <p className="mt-0.5 text-base font-medium text-navy break-words">{c.value}</p>
                      </div>
                    </div>
                  );
                  return c.href ? (
                    <a key={c.label} href={c.href} data-testid={c.tid} className="block">{inner}</a>
                  ) : (
                    <div key={c.label} data-testid={c.tid}>{inner}</div>
                  );
                })}

                <div className="rounded-2xl bg-navy p-6 text-white">
                  <p className="text-sm font-semibold">Besoin d'une réponse immédiate ?</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300">
                    Le téléphone et WhatsApp restent les plus rapides pour une panne bloquante.
                  </p>
                  <div className="mt-4 flex flex-col gap-3">
                    <a
                      href={CONTACT.tel}
                      data-testid="contact-call-btn"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-cta px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-ctaDark hover:-translate-y-0.5"
                    >
                      <Phone size={17} /> Appeler {CONTACT.phone}
                    </a>
                    <a
                      href={CONTACT.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="contact-whatsapp-btn"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-navy"
                    >
                      <MessageCircle size={17} /> Écrire sur WhatsApp
                    </a>
                    <a
                      href={CONTACT.mailto}
                      data-testid="contact-email-btn"
                      className="text-center text-sm text-slate-300 hover:text-white transition-colors"
                    >
                      ou {CONTACT.email}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
