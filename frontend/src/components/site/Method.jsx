import { Icons } from "@/lib/icons";
import { motion } from "framer-motion";
import { reveal } from "@/lib/hydration";
import { METHOD } from "@/data/content";
import { Reveal, SectionHeading } from "./Reveal";

export const Method = () => {
  return (
    <section id="solutions" data-testid="method-section" className="py-16 sm:py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-navy opacity-50" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <SectionHeading
            label="Méthode"
            title="Notre méthode"
            description="Une approche simple pour comprendre, déployer et accompagner."
          />
        </Reveal>

        <div className="relative mt-14 grid md:grid-cols-3 gap-6 lg:gap-8">
          {/* connecting line on desktop */}
          <div className="hidden md:block absolute top-9 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-navy/20 to-transparent" />
          {METHOD.map((m, i) => {
            const Icon = Icons[m.icon] || Icons.Circle;
            return (
              <motion.div
                key={m.title}
                data-testid={`method-card-${i}`}
                {...reveal({

                  initial: { opacity: 0, y: 24 },

                  whileInView: { opacity: 1, y: 0 },

                  viewport: { once: true, margin: "-60px" },

                  transition: { duration: 0.5, delay: i * 0.12 },

                })}
                className="relative text-center"
              >
                <div className="relative mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-navy text-white">
                  <Icon size={28} strokeWidth={1.5} />
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-cta text-xs font-bold text-white">
                    {m.step}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-navy">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 max-w-xs mx-auto">{m.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
