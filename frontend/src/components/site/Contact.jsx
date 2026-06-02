import { useState } from "react";
import axios from "axios";
import { Phone, Mail, MapPin, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { CONTACT } from "@/data/content";
import { Reveal } from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const INITIAL = { nom: "", email: "", telephone: "", objet: "", message: "" };

export const Contact = () => {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nom || !form.email || !form.objet || !form.message) {
      toast.error("Veuillez remplir les champs obligatoires.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Votre demande a bien été envoyée. Nous vous recontacterons rapidement.");
      setForm(INITIAL);
    } catch (err) {
      toast.error("Une erreur est survenue. Merci de réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const infos = [
    { icon: Phone, label: "Téléphone", value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: MapPin, label: "Localisation", value: CONTACT.location, href: null },
  ];

  return (
    <section id="contact" data-testid="contact-section" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Info side */}
          <Reveal>
            <span className="text-sm uppercase tracking-[0.2em] font-bold text-brand-orange">Contact</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-navy leading-tight">
              Parlons de votre projet IT
            </h2>
            <p className="mt-5 text-base lg:text-lg leading-relaxed text-slate-600">
              Une question, un besoin, un devis ? Notre équipe vous répond rapidement.
            </p>

            <div className="mt-10 space-y-5">
              {infos.map((info) => {
                const Icon = info.icon;
                const content = (
                  <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 transition-all duration-300 hover:bg-white hover:shadow-md">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white shrink-0">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">{info.label}</p>
                      <p className="text-base font-medium text-navy">{info.value}</p>
                    </div>
                  </div>
                );
                return info.href ? (
                  <a key={info.label} href={info.href} data-testid={`contact-${info.label.toLowerCase()}`} className="block">{content}</a>
                ) : (
                  <div key={info.label} data-testid={`contact-${info.label.toLowerCase()}`}>{content}</div>
                );
              })}
            </div>
          </Reveal>

          {/* Form side */}
          <Reveal delay={0.1}>
            <form
              data-testid="contact-form"
              onSubmit={handleSubmit}
              className="rounded-3xl border border-slate-100 bg-white p-8 lg:p-10 shadow-xl shadow-navy/5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Nom *">
                  <Input data-testid="input-nom" value={form.nom} onChange={update("nom")} placeholder="Votre nom" className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-navy" />
                </Field>
                <Field label="Email *">
                  <Input data-testid="input-email" type="email" value={form.email} onChange={update("email")} placeholder="vous@entreprise.com" className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-navy" />
                </Field>
                <Field label="Téléphone">
                  <Input data-testid="input-telephone" value={form.telephone} onChange={update("telephone")} placeholder="07 00 00 00 00" className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-navy" />
                </Field>
                <Field label="Objet *">
                  <Input data-testid="input-objet" value={form.objet} onChange={update("objet")} placeholder="Sujet de votre demande" className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-navy" />
                </Field>
              </div>
              <div className="mt-5">
                <Field label="Message *">
                  <Textarea data-testid="input-message" value={form.message} onChange={update("message")} rows={5} placeholder="Décrivez votre besoin..." className="bg-slate-50 border-slate-200 focus-visible:ring-navy resize-none" />
                </Field>
              </div>
              <button
                type="submit"
                data-testid="contact-submit"
                disabled={loading}
                className="mt-7 w-full inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orangeDark text-white font-semibold py-3.5 px-8 rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-brand-orange/25 disabled:opacity-60 disabled:translate-y-0"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                {loading ? "Envoi en cours..." : "Envoyer la demande"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, children }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-medium text-navy">{label}</span>
    {children}
  </label>
);
