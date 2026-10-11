import {
  LifeBuoy, Server, ShieldCheck, Workflow, GraduationCap, Compass, BrainCircuit, Zap,
} from "lucide-react";

// Remplacez par un marquee de logos clients/partenaires dès que vous en disposez
const ITEMS = [
  { icon: LifeBuoy, label: "Support informatique" },
  { icon: Server, label: "Matériel professionnel" },
  { icon: ShieldCheck, label: "Réseaux & sécurité" },
  { icon: Workflow, label: "Solutions digitales" },
  { icon: GraduationCap, label: "Formation professionnelle" },
  { icon: BrainCircuit, label: "Formation IA" },
  { icon: Compass, label: "Conseil IT" },
  { icon: Zap, label: "Intervention rapide" },
];

const Row = ({ ariaHidden = false }) => (
  <ul
    aria-hidden={ariaHidden}
    className="flex shrink-0 items-center gap-10 pr-10"
  >
    {ITEMS.map(({ icon: Icon, label }) => (
      <li key={label} className="flex items-center gap-2.5 whitespace-nowrap">
        <Icon size={17} strokeWidth={1.5} className="text-brand-ink shrink-0" />
        <span className="text-sm font-medium tracking-wide text-slate-600">{label}</span>
      </li>
    ))}
  </ul>
);

export const TrustMarquee = () => {
  return (
    <div
      data-testid="trust-marquee"
      className="border-b border-slate-100 bg-white py-4 overflow-hidden marquee-mask"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Row />
        <Row ariaHidden />
      </div>
    </div>
  );
};
