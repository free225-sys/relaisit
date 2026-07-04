import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Reveal } from "./Reveal";

// ⚠️ Témoignages fictifs à remplacer par de vrais retours clients (avec leur accord)
const TESTIMONIALS = [
  {
    quote:
      "Une équipe réactive qui a remis notre réseau sur pied en une journée. Depuis, plus aucune interruption d'activité.",
    name: "A. Koné",
    role: "Gérant, PME de distribution — Abidjan",
  },
  {
    quote:
      "La formation IA a transformé la façon dont notre équipe administrative travaille au quotidien. Concret et immédiatement applicable.",
    name: "M. Diabaté",
    role: "Responsable RH, institution privée",
  },
  {
    quote:
      "Du conseil au matériel, un seul interlocuteur clair et de confiance. Exactement ce que nous cherchions.",
    name: "S. Yao",
    role: "Directeur, cabinet de services",
  },
];

export const Testimonials = () => {
  return (
    <section
      id="temoignages"
      data-testid="testimonials-section"
      className="relative overflow-hidden bg-navy py-16 sm:py-20"
    >
      {/* Décor subtil */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-grid-navy invert" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-brand-orange/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-sm uppercase tracking-[0.2em] font-bold text-brand-orange">
              Témoignages
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              Ils nous font confiance
            </h2>
            <p className="mt-4 text-base lg:text-lg leading-relaxed text-slate-300">
              La confiance se construit sur des résultats concrets, intervention après intervention.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              data-testid={`testimonial-${i}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-all duration-300 hover:border-brand-orange/40 hover:bg-white/[0.08] hover:-translate-y-1"
            >
              <Quote size={26} strokeWidth={1.5} className="text-brand-orange" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-200">
                « {t.quote} »
              </blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{t.role}</p>
                  </div>
                  <div className="flex gap-0.5" aria-label="5 étoiles sur 5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={13} className="fill-brand-orange text-brand-orange" />
                    ))}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};
