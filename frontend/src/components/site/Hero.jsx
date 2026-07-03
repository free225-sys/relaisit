import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4";

const scrollTo = (href) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export const Hero = () => {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  });

  return (
    <section
      id="accueil"
      data-testid="hero-section"
      className="relative min-h-screen overflow-hidden bg-navy-deep"
    >
      {/* Vidéo de fond plein écran */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* Voile navy pour la lisibilité (charte Relais IT) */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/40 to-navy-deep/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/50 via-transparent to-transparent" />

      {/* Contenu ancré en bas à gauche */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-1 flex items-end pb-14 sm:pb-20 lg:pb-24">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-xl">
              {/* Badge / slogan */}
              <motion.button
                {...fadeUp(0)}
                data-testid="hero-badge"
                onClick={() => scrollTo("#apropos")}
                className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-orange hover:text-white transition-colors duration-200 mb-4"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                Trust it.
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </motion.button>

              {/* Titre */}
              <motion.h1
                {...fadeUp(0.05)}
                className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.12] text-white mb-4"
              >
                Votre partenaire IT de confiance
              </motion.h1>

              {/* Sous-texte */}
              <motion.p
                {...fadeUp(0.15)}
                className="text-base lg:text-lg leading-relaxed text-slate-200/85 max-w-md mb-7"
              >
                Relais IT accompagne les entreprises avec des solutions
                informatiques fiables, simples et adaptées.
              </motion.p>

              {/* CTAs */}
              <motion.div
                {...fadeUp(0.25)}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button
                  data-testid="hero-cta-services"
                  onClick={() => scrollTo("#services")}
                  className="group inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orangeDark text-white font-semibold text-sm py-3.5 px-8 rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-brand-orange/25"
                >
                  Découvrir nos services
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </button>
                <button
                  data-testid="hero-cta-devis"
                  onClick={() => scrollTo("#contact")}
                  className="inline-flex items-center justify-center border border-white/60 text-white font-semibold text-sm py-3.5 px-8 rounded-full hover:bg-white hover:text-navy hover:border-white transition-all duration-200"
                >
                  Demander un devis
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
