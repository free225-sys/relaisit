import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Network, Cpu, Activity } from "lucide-react";

const scrollTo = (href) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export const Hero = () => {
  return (
    <section id="accueil" data-testid="hero-section" className="relative overflow-hidden bg-white">
      {/* Abstract background */}
      <div className="absolute inset-0 bg-grid-navy opacity-70" />
      <div className="absolute -top-40 -right-40 h-[34rem] w-[34rem] rounded-full bg-navy/5 blur-3xl" />
      <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-brand-orange/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-navy shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" /> Trust it.
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-navy leading-[1.08]"
            >
              Votre partenaire de confiance pour vos solutions IT
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-base lg:text-lg leading-relaxed text-slate-600 max-w-xl"
            >
              Relais IT accompagne les entreprises, institutions et professionnels dans la mise en
              place de solutions informatiques fiables, modernes et adaptées à leurs besoins.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-9 flex flex-col sm:flex-row gap-4"
            >
              <button
                data-testid="hero-cta-services"
                onClick={() => scrollTo("#services")}
                className="group inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orangeDark text-white font-semibold py-3.5 px-8 rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-brand-orange/25"
              >
                Découvrir nos services
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                data-testid="hero-cta-devis"
                onClick={() => scrollTo("#contact")}
                className="inline-flex items-center justify-center border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold py-3.5 px-8 rounded-lg transition-all duration-300"
              >
                Demander un devis
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate-500"
            >
              <span className="flex items-center gap-2"><ShieldCheck size={18} className="text-navy" strokeWidth={1.5} /> Sécurité & fiabilité</span>
              <span className="flex items-center gap-2"><Activity size={18} className="text-navy" strokeWidth={1.5} /> Support réactif</span>
              <span className="flex items-center gap-2"><Network size={18} className="text-navy" strokeWidth={1.5} /> Infrastructure moderne</span>
            </motion.div>
          </div>

          {/* Right: abstract IT visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl shadow-navy/10">
              <svg viewBox="0 0 400 360" className="w-full h-auto">
                <defs>
                  <linearGradient id="nodeg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#1B4C6B" />
                    <stop offset="100%" stopColor="#153B54" />
                  </linearGradient>
                </defs>
                {/* connections */}
                {[
                  [200,60,90,180],[200,60,310,180],[200,60,200,300],
                  [90,180,200,300],[310,180,200,300],[90,180,310,180]
                ].map(([x1,y1,x2,y2],i)=>(
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1B4C6B" strokeOpacity="0.18" strokeWidth="2" />
                ))}
                {/* central node */}
                <circle cx="200" cy="60" r="34" fill="url(#nodeg)" />
                <circle cx="90" cy="180" r="26" fill="#F1F5F9" stroke="#1B4C6B" strokeWidth="2" />
                <circle cx="310" cy="180" r="26" fill="#F1F5F9" stroke="#1B4C6B" strokeWidth="2" />
                <circle cx="200" cy="300" r="30" fill="#E8743B" />
              </svg>
              <div className="absolute top-7 left-1/2 -translate-x-1/2"><Cpu size={26} className="text-white" strokeWidth={1.5} /></div>
              <div className="absolute bottom-7 left-1/2 -translate-x-1/2"><ShieldCheck size={24} className="text-white" strokeWidth={1.5} /></div>
            </div>

            {/* floating stat cards */}
            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-xl">
              <p className="text-2xl font-bold text-navy">24/7</p>
              <p className="text-xs text-slate-500">Assistance & support</p>
            </div>
            <div className="absolute -top-6 -right-6 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-xl">
              <p className="text-2xl font-bold text-brand-orange">100%</p>
              <p className="text-xs text-slate-500">Confidentialité</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
