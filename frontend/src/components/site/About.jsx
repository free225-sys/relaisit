import { Reveal } from "./Reveal";

export const About = () => {
  return (
    <section id="apropos" data-testid="about-section" className="py-16 sm:py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 h-full w-1/3 bg-grid-navy opacity-50" />
      <div className="relative max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <Reveal>
          <span className="text-sm uppercase tracking-[0.2em] font-bold text-brand-orange">À propos</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-navy leading-tight">
            À propos de Relais IT
          </h2>
          <p className="mt-6 text-base lg:text-lg leading-relaxed text-slate-600">
            Relais IT aide les organisations à améliorer leur environnement informatique, sécuriser
            leurs outils et gagner en efficacité grâce à des solutions simples, fiables et adaptées.
          </p>
        </Reveal>
      </div>
    </section>
  );
};
