import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// ⚠️ Ajustez ces chiffres avec vos vraies données avant mise en ligne
const STATS = [
  { value: 150, suffix: "+", label: "Interventions réalisées" },
  { value: 98, suffix: "%", label: "Clients satisfaits" },
  { value: 24, prefix: "< ", suffix: "h", label: "Délai moyen de prise en charge" },
  { value: 6, suffix: "", label: "Domaines d'expertise" },
];

const Counter = ({ value, prefix = "", suffix = "", duration = 1.6 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

export const StatsBand = () => {
  return (
    <section
      data-testid="stats-band"
      className="relative overflow-hidden bg-navy-deep py-14 sm:py-16"
    >
      {/* Lueur orange décorative */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand-orange/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              data-testid={`stat-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium text-slate-300">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
