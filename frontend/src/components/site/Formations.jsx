import * as Icons from "lucide-react";
import { GraduationCap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FORMATIONS } from "@/data/content";
import { Reveal, SectionHeading } from "./Reveal";

const scrollToContact = () => {
  const el = document.querySelector("#contact");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export const Formations = () => {
  return (
    <section id="formations" data-testid="formations-section" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left intro / callout */}
          <Reveal className="lg:col-span-5">
            <span className="text-sm uppercase tracking-[0.2em] font-bold text-brand-orange">Formations</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-navy leading-tight">
              Formations professionnelles & montée en compétences
            </h2>
            <p className="mt-5 text-base lg:text-lg leading-relaxed text-slate-600">
              Relais IT forme vos équipes aux outils numériques et à l'intelligence artificielle,
              avec un accompagnement concret et adapté à votre organisation.
            </p>
            <div className="mt-8 rounded-2xl bg-navy p-8 text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-brand-orange/20 blur-2xl" />
              <GraduationCap size={36} strokeWidth={1.5} className="text-brand-orange" />
              <p className="mt-4 text-lg font-medium leading-relaxed">
                Des parcours sur mesure pour faire évoluer durablement vos compétences internes.
              </p>
              <button
                data-testid="formations-cta"
                onClick={scrollToContact}
                className="mt-6 group inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orangeDark text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Organiser une formation
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>

          {/* Right list */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {FORMATIONS.map((f, i) => {
              const Icon = Icons[f.icon] || Icons.BookOpen;
              return (
                <motion.div
                  key={f.title}
                  data-testid={`formation-card-${i}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                  className={`group rounded-2xl border border-slate-100 bg-slate-50 p-7 transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-navy/5 ${i === FORMATIONS.length - 1 ? "sm:col-span-2" : ""}`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-navy shadow-sm group-hover:text-brand-orange transition-colors">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-navy">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
