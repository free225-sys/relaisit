import { Icons } from "@/lib/icons";
import { motion } from "framer-motion";
import { reveal } from "@/lib/hydration";
import { WHY } from "@/data/content";
import { Reveal } from "./Reveal";

export const WhyChooseUs = () => {
  return (
    <section id="pourquoi" data-testid="why-section" className="py-16 sm:py-20 bg-navy relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <Reveal>
            <span className="text-sm uppercase tracking-[0.2em] font-bold text-brand-light">Pourquoi nous</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              Pourquoi Relais IT ?
            </h2>
            <p className="mt-5 text-base lg:text-lg leading-relaxed text-slate-300">
              Une équipe réactive, une approche claire et des solutions pensées pour vos objectifs.
            </p>
          </Reveal>

          {/* Right grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {WHY.map((w, i) => {
              const Icon = Icons[w.icon] || Icons.CheckCircle2;
              return (
                <motion.div
                  key={w.title}
                  data-testid={`why-card-${i}`}
                  {...reveal({

                    initial: { opacity: 0, y: 18 },

                    whileInView: { opacity: 1, y: 0 },

                    viewport: { once: true, margin: "-60px" },

                    transition: { duration: 0.45, delay: (i % 2) * 0.08 },

                  })}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.1] hover:border-brand-orange/40"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-orange/15 text-brand-orange">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white leading-tight">{w.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">{w.desc}</p>
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
