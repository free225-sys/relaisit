import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { FORMATIONS } from "@/data/content";
import { Reveal, SectionHeading } from "./Reveal";

export const Formations = () => {
  return (
    <section id="formations" data-testid="formations-section" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <SectionHeading
            label="Formations"
            title="Formations professionnelles"
            description="Relais IT aide vos équipes à mieux utiliser les outils numériques, la bureautique et l'intelligence artificielle."
          />
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {FORMATIONS.map((f, i) => {
            const Icon = Icons[f.icon] || Icons.BookOpen;
            return (
              <motion.div
                key={f.title}
                data-testid={`formation-card-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group rounded-2xl border border-slate-100 bg-slate-50 p-7 transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-navy/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-navy shadow-sm group-hover:text-brand-orange transition-colors">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-navy">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
