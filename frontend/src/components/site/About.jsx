import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { ABOUT_VALUES } from "@/data/content";
import { Reveal } from "./Reveal";

export const About = () => {
  return (
    <section id="apropos" data-testid="about-section" className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: presentation */}
          <Reveal>
            <span className="text-sm uppercase tracking-[0.2em] font-bold text-brand-orange">À propos</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-navy leading-tight">
              Un partenaire IT proche de vos réalités
            </h2>
            <p className="mt-6 text-base lg:text-lg leading-relaxed text-slate-600">
              Relais IT accompagne les entreprises, institutions et professionnels dans l'amélioration
              de leur environnement informatique. Notre approche privilégie la simplicité, la fiabilité
              et des solutions adaptées au terrain.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <div className="rounded-2xl bg-navy px-6 py-4 text-white">
                <p className="text-2xl font-bold">Trust it.</p>
                <p className="mt-1 text-xs text-slate-300">Notre engagement</p>
              </div>
              <p className="text-sm text-slate-500 max-w-[12rem]">
                Une relation de confiance, durable et orientée résultats.
              </p>
            </div>
          </Reveal>

          {/* Right: value cards */}
          <div className="grid gap-5">
            {ABOUT_VALUES.map((v, i) => {
              const Icon = Icons[v.icon] || Icons.CheckCircle2;
              return (
                <motion.div
                  key={v.title}
                  data-testid={`about-value-${i}`}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-5 rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-navy/5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-navy shadow-sm">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy">{v.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{v.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
