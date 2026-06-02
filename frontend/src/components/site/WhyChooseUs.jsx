import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { WHY } from "@/data/content";
import { Reveal } from "./Reveal";

export const WhyChooseUs = () => {
  return (
    <section id="pourquoi" data-testid="why-section" className="py-16 sm:py-20 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-navy opacity-[0.08]" style={{ filter: "invert(1)" }} />
      <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-brand-orange/10 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-sm uppercase tracking-[0.2em] font-bold text-brand-orange">Pourquoi nous</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              Pourquoi Relais IT ?
            </h2>
            <p className="mt-4 text-base lg:text-lg leading-relaxed text-slate-300">
              Une approche fiable, réactive et orientée résultats.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY.map((w, i) => {
            const Icon = Icons[w.icon] || Icons.CheckCircle2;
            return (
              <motion.div
                key={w.title}
                data-testid={`why-card-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08] hover:border-brand-orange/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange/15 text-brand-orange">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{w.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{w.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
