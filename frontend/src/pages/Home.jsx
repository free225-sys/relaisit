import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Solutions } from "@/components/site/Solutions";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Formations } from "@/components/site/Formations";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white" data-testid="home-page">
      <Header />
      <main>
        <Hero />
        <Services />
        <Solutions />
        <About />
        <WhyChooseUs />
        <Formations />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
