import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { reveal } from "@/lib/hydration";
import { Icons } from "@/lib/icons";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4";

// Image affichée immédiatement, sous la vidéo. Elle évite le fond vide pendant
// le téléchargement — ce qui pénalisait le Largest Contentful Paint — et sert
// de fond définitif sur mobile et en mode « animations réduites ».
const POSTER_URL = "/hero-poster.webp";

// En dessous de cette largeur, la vidéo n'est pas chargée du tout : elle coûte
// cher en données mobiles pour un simple décor.
const VIDEO_MIN_WIDTH = 768;

export const Hero = () => {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef(null);
  const [largeScreen, setLargeScreen] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= VIDEO_MIN_WIDTH,
  );
  const [playing, setPlaying] = useState(true);

  // La vidéo n'est insérée qu'après le montage. Deux bénéfices : le HTML
  // pré-rendu et le premier rendu de React concordent exactement (pas d'erreur
  // d'hydratation), et le téléchargement de la vidéo ne concurrence plus
  // l'affichage du contenu.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${VIDEO_MIN_WIDTH}px)`);
    const onChange = (e) => setLargeScreen(e.matches);
    setLargeScreen(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const showVideo = mounted && largeScreen && !reduceMotion;

  // WCAG 2.2.2 : toute animation automatique de plus de cinq secondes doit
  // pouvoir être mise en pause par l'utilisateur.
  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const fadeUp = (delay = 0) =>
    reveal({
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
      {/* Image de fond : affichée instantanément, préchargée depuis index.html.
          C'est elle qui porte le Largest Contentful Paint, la vidéo n'arrivant
          qu'ensuite et uniquement sur grand écran. */}
      <img
        src={POSTER_URL}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {showVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={VIDEO_URL}
          poster={POSTER_URL}
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          tabIndex={-1}
        />
      )}

      {/* Voile navy pour la lisibilité (charte Relais IT) */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/40 to-navy-deep/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/50 via-transparent to-transparent" />

      {/* Contenu ancré en bas à gauche */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-1 flex items-end pb-14 sm:pb-20 lg:pb-24">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-xl">
              {/* Badge / slogan */}
              <motion.a
                {...fadeUp(0)}
                href="#apropos"
                data-testid="hero-badge"
                className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-orange hover:text-white transition-colors duration-200 mb-4"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                Trust it.
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </motion.a>

              {/* Titre : le H1 porte le métier et la ville, le slogan passe en sous-titre. */}
              <motion.h1
                {...fadeUp(0.05)}
                className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.12] text-white mb-3"
              >
                Solutions informatiques pour les entreprises à Abidjan
              </motion.h1>

              <motion.p
                {...fadeUp(0.12)}
                className="text-lg lg:text-xl font-medium text-white/90 mb-3"
              >
                Votre partenaire IT de confiance.
              </motion.p>

              {/* Sous-texte */}
              <motion.p
                {...fadeUp(0.18)}
                className="text-base lg:text-lg leading-relaxed text-slate-200/85 max-w-md mb-7"
              >
                Support, matériel, réseaux, sécurité et formations : des solutions
                fiables, simples et adaptées à votre activité.
              </motion.p>

              {/* CTAs — de vrais liens : ouvrables dans un nouvel onglet, suivis par les moteurs. */}
              <motion.div
                {...fadeUp(0.25)}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="#services"
                  data-testid="hero-cta-services"
                  className="group inline-flex items-center justify-center gap-2 bg-brand-cta hover:bg-brand-ctaDark text-white font-semibold text-sm py-3.5 px-8 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                >
                  Découvrir nos services
                  <Icons.ArrowRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </a>
                <a
                  href="#contact"
                  data-testid="hero-cta-devis"
                  className="inline-flex items-center justify-center border border-white/60 text-white font-semibold text-sm py-3.5 px-8 rounded-full hover:bg-white hover:text-navy hover:border-white transition-all duration-200"
                >
                  Demander un devis
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {showVideo && (
        <button
          type="button"
          onClick={togglePlayback}
          data-testid="hero-video-toggle"
          aria-label={
            playing ? "Mettre en pause la vidéo d'arrière-plan" : "Relancer la vidéo d'arrière-plan"
          }
          className="absolute bottom-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-navy-deep/60 text-white backdrop-blur-sm transition-colors hover:bg-navy-deep/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {playing ? <Icons.Pause size={15} /> : <Icons.Play size={15} />}
        </button>
      )}
    </section>
  );
};
