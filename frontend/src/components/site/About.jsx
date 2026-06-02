import { CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";

const POINTS = [
  "Optimisation de votre environnement technologique",
  "Renforcement de votre efficacité opérationnelle",
  "Des outils numériques mieux maîtrisés",
];

export const About = () => {
  return (
    <section id="apropos" data-testid="about-section" className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 h-full w-1/3 bg-grid-navy opacity-50" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="text-sm uppercase tracking-[0.2em] font-bold text-brand-orange">À propos</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-navy leading-tight">
              Un partenaire IT de confiance
            </h2>
            <p className="mt-6 text-base lg:text-lg leading-relaxed text-slate-600">
              Relais IT se positionne comme un partenaire informatique de confiance, aux côtés des
              organisations qui souhaitent améliorer leur environnement technologique, optimiser leurs
              outils numériques et renforcer leur efficacité opérationnelle.
            </p>
            <p className="mt-4 text-base lg:text-lg leading-relaxed text-slate-600">
              Notre approche est claire, professionnelle et orientée résultats : comprendre vos besoins,
              proposer des solutions adaptées et vous accompagner dans la durée.
            </p>
            <ul className="mt-8 space-y-3">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 size={22} className="text-brand-orange shrink-0 mt-0.5" strokeWidth={1.75} />
                  <span className="text-base">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-5">
              {[
                { k: "Expertise", v: "IT & digital" },
                { k: "Réactivité", v: "Support rapide" },
                { k: "Sécurité", v: "Données protégées" },
                { k: "Sur mesure", v: "Selon votre budget" },
              ].map((item, i) => (
                <div
                  key={item.k}
                  className={`rounded-2xl p-8 ${i % 3 === 0 ? "bg-navy text-white" : "bg-white border border-slate-100 shadow-sm"}`}
                >
                  <p className={`text-2xl font-bold ${i % 3 === 0 ? "text-white" : "text-navy"}`}>{item.k}</p>
                  <p className={`mt-2 text-sm ${i % 3 === 0 ? "text-slate-300" : "text-slate-500"}`}>{item.v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
