import { motion } from "framer-motion";
import { SOLUTIONS } from "@/data/content";
import { Reveal, SectionHeading } from "./Reveal";

export const Solutions = () => {
  return (
    <section id="solutions" data-testid="solutions-section" className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-navy opacity-60" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <SectionHeading
            label="Nos solutions"
            title="Des solutions concrètes, prêtes à déployer"
            description="Relais IT conçoit et met en œuvre des solutions adaptées à chaque étape de votre parcours numérique."
          />
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map((s, i) => (
            <motion.div
              key={s.num}
              data-testid={`solution-card-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.07 }}
              className="group rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:border-navy/30 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl font-bold text-slate-200 transition-colors group-hover:text-brand-orange">{s.num}</span>
                <span className="h-2.5 w-2.5 rounded-full bg-navy/15 transition-colors group-hover:bg-brand-orange" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-navy leading-snug">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
