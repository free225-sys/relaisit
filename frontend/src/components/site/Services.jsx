import * as Icons from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { SERVICES } from "@/data/content";
import { Reveal, SectionHeading } from "./Reveal";

const scrollToContact = () => {
  const el = document.querySelector("#contact");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export const Services = () => {
  return (
    <section id="services" data-testid="services-section" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <SectionHeading
            label="Nos services"
            title="Des services IT complets pour votre entreprise"
            description="De l'assistance quotidienne à la transformation digitale, Relais IT couvre l'ensemble de vos besoins informatiques."
          />
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s, i) => {
            const Icon = Icons[s.icon] || Icons.Circle;
            return (
              <motion.div
                key={s.title}
                data-testid={`service-card-${i}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 lg:p-9 shadow-sm hover:shadow-xl hover:shadow-navy/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 h-1 w-0 bg-brand-orange transition-all duration-300 group-hover:w-full" />
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-navy group-hover:text-white">
                  <Icon size={26} strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-navy">{s.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{s.desc}</p>
                <button
                  onClick={scrollToContact}
                  data-testid={`service-more-${i}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:gap-2.5 transition-all"
                >
                  En savoir plus <ArrowUpRight size={16} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
