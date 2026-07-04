import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { TrustMarquee } from "@/components/site/TrustMarquee";
import { Services } from "@/components/site/Services";
import { StatsBand } from "@/components/site/StatsBand";
import { Method } from "@/components/site/Method";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Formations } from "@/components/site/Formations";
import { About } from "@/components/site/About";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { Seo } from "@/components/site/Seo";

export default function Home() {
  const { hash } = useLocation();

  // Gère l'arrivée depuis une page interne avec une ancre (/#contact, /#services…)
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <div className="min-h-screen bg-white" data-testid="home-page">
      <Seo
        title="Relais IT — Solutions informatiques, support IT & formation à Abidjan"
        description="Relais IT accompagne les entreprises, institutions et professionnels avec des solutions informatiques fiables : support IT, matériel, réseaux, sécurité, solutions digitales et formations à Abidjan."
        path="/"
      />
      <Header />
      <main>
        <Hero />
        <TrustMarquee />
        <Services />
        <StatsBand />
        <Method />
        <About />
        <WhyChooseUs />
        <Testimonials />
        <Formations />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
