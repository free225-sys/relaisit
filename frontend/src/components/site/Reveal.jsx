import { motion } from "framer-motion";

// Reusable fade-in / slide-up reveal wrapper
export const Reveal = ({ children, delay = 0, y = 24, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const SectionHeading = ({ label, title, description, align = "center" }) => (
  <div className={align === "center" ? "max-w-2xl mx-auto text-center" : "max-w-2xl"}>
    {label && (
      <span className="text-sm uppercase tracking-[0.2em] font-bold text-brand-orange">
        {label}
      </span>
    )}
    <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-navy">
      {title}
    </h2>
    {description && (
      <p className="mt-4 text-base lg:text-lg leading-relaxed text-slate-600">
        {description}
      </p>
    )}
  </div>
);
