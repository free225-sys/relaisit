import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { SOLUTIONS } from "@/data/content";
import { Reveal, SectionHeading } from "./Reveal";

export const Solutions = () => {
  return (
    <section id="solutions" data-testid="solutions-section" className="py-16 sm:py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-navy opacity-60" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <SectionHeading
            label="Solutions"
            title="Des solutions concrètes"
            description="Une mise en œuvre simple et efficace, du diagnostic au pilotage."
          />
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOLUTIONS.map((s, i) => {
            const Icon = Icons[s.icon] || Icons.Circle;
            return (
              <motion.div
                key={s.title}
                data-testid={`solution-card-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-navy/30 hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-brand-orange group-hover:text-white">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy leading-snug">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
