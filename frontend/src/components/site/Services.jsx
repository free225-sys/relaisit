import { Icons } from "@/lib/icons";
import { motion } from "framer-motion";
import { reveal } from "@/lib/hydration";
import { Link } from "react-router-dom";
import { SERVICES } from "@/data/content";
import { SERVICE_CARD_LINKS } from "@/data/servicesPages";
import { Reveal, SectionHeading } from "./Reveal";

export const Services = () => {
  return (
    <section id="services" data-testid="services-section" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <SectionHeading
            label="Nos services"
            title="Nos services IT"
            description="Des solutions pratiques pour accompagner votre activité au quotidien."
          />
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = Icons[s.icon] || Icons.Circle;
            const href = SERVICE_CARD_LINKS[i];
            const cardClasses =
              "group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-200 hover:shadow-lg hover:shadow-navy/5";

            const inner = (
              <>
                <div className="absolute top-0 left-0 h-1 w-0 bg-brand-orange transition-all duration-300 group-hover:w-full" />
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-navy group-hover:text-white">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-navy">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                {href && (
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink">
                    En savoir plus
                    <Icons.ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                )}
              </>
            );

            return href ? (
              <motion.div
                key={s.title}
                {...reveal({

                  initial: { opacity: 0, y: 28 },

                  whileInView: { opacity: 1, y: 0 },

                  viewport: { once: true, margin: "-60px" },

                  transition: { duration: 0.5, delay: (i % 3) * 0.08 },

                })}
              >
                <Link
                  to={href}
                  data-testid={`service-card-${i}`}
                  aria-label={`${s.title} — en savoir plus`}
                  className={`${cardClasses} h-full`}
                >
                  {inner}
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key={s.title}
                data-testid={`service-card-${i}`}
                {...reveal({

                  initial: { opacity: 0, y: 28 },

                  whileInView: { opacity: 1, y: 0 },

                  viewport: { once: true, margin: "-60px" },

                  transition: { duration: 0.5, delay: (i % 3) * 0.08 },

                })}
                className={cardClasses}
              >
                {inner}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
