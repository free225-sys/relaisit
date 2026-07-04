import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { Seo } from "@/components/site/Seo";
import { Reveal } from "@/components/site/Reveal";
import { SERVICE_PAGES, SERVICE_PAGE_LINKS } from "@/data/servicesPages";
import { CONTACT } from "@/data/content";

const SITE_URL = "https://relaisit.com";

const FaqItem = ({ q, a, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-100 bg-white transition-shadow hover:shadow-md">
      <button
        data-testid={`faq-toggle-${index}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span className="text-base font-semibold text-navy">{q}</span>
        <Icons.ChevronDown
          size={20}
          className={`shrink-0 text-brand-orange transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{a}</p>
      )}
    </div>
  );
};

export default function ServicePage() {
  const { slug } = useParams();
  const page = SERVICE_PAGES[slug];

  if (!page) return <Navigate to="/" replace />;

  const Icon = Icons[page.icon] || Icons.Circle;
  const otherPages = SERVICE_PAGE_LINKS.filter((p) => p.slug !== slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: page.h1,
        description: page.metaDescription,
        provider: { "@type": "ProfessionalService", name: "Relais IT", url: SITE_URL },
        areaServed: { "@type": "City", name: "Abidjan" },
        url: `${SITE_URL}/${slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: page.h1, item: `${SITE_URL}/${slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white" data-testid={`service-page-${slug}`}>
      <Seo
        title={page.title}
        description={page.metaDescription}
        path={`/${slug}`}
        jsonLd={jsonLd}
      />
      <Header />

      <main>
        {/* Bandeau d'en-tête navy */}
        <section className="relative overflow-hidden bg-navy-deep pt-28 pb-14 sm:pt-32 sm:pb-16">
          <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-brand-orange/15 blur-3xl" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
            <nav aria-label="Fil d'Ariane" className="text-xs text-slate-400">
              <Link to="/" className="hover:text-brand-orange transition-colors">Accueil</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-300">{page.h1}</span>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-6 flex items-start gap-5"
            >
              <div className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-brand-orange">
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
                  {page.h1}
                </h1>
                <p className="mt-3 max-w-2xl text-base lg:text-lg text-slate-300">
                  {page.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contenu principal */}
        <section className="py-14 sm:py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Reveal>
                <p className="text-lg leading-relaxed text-slate-700">{page.intro}</p>
              </Reveal>

              {page.sections.map((s, i) => (
                <Reveal key={s.heading} delay={0.05 * (i + 1)}>
                  <h2 className="mt-10 text-2xl sm:text-3xl font-semibold tracking-tight text-navy">
                    {s.heading}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">{s.body}</p>
                </Reveal>
              ))}

              <Reveal delay={0.1}>
                <h2 className="mt-10 text-2xl sm:text-3xl font-semibold tracking-tight text-navy">
                  Nos prestations
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {page.prestations.map((p) => (
                    <li key={p} className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                      <Icons.CheckCircle2 size={19} strokeWidth={1.5} className="mt-0.5 shrink-0 text-brand-orange" />
                      <span className="text-sm leading-relaxed text-slate-700">{p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="mt-12 text-2xl sm:text-3xl font-semibold tracking-tight text-navy">
                  Questions fréquentes
                </h2>
                <div className="mt-5 space-y-3">
                  {page.faq.map((f, i) => (
                    <FaqItem key={f.q} q={f.q} a={f.a} index={i} />
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Colonne latérale : CTA + maillage interne */}
            <aside className="space-y-6 lg:sticky lg:top-28 self-start">
              <Reveal>
                <div className="rounded-2xl bg-navy p-7 text-white">
                  <h3 className="text-xl font-semibold">Parlons de votre besoin</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    Devis gratuit et réponse sous 24h ouvrées.
                  </p>
                  <div className="mt-5 flex flex-col gap-3">
                    <Link
                      to="/#contact"
                      data-testid="service-cta-devis"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-orangeDark hover:-translate-y-0.5"
                    >
                      Demander un devis
                      <Icons.ArrowRight size={17} />
                    </Link>
                    <a
                      href={CONTACT.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="service-cta-whatsapp"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-navy"
                    >
                      Discuter sur WhatsApp
                    </a>
                    <a
                      href={CONTACT.tel}
                      className="text-center text-sm text-slate-300 hover:text-brand-orange transition-colors"
                    >
                      ou appelez le {CONTACT.phone}
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-7">
                  <h3 className="text-base font-semibold text-navy">Nos autres services</h3>
                  <ul className="mt-4 space-y-3">
                    {otherPages.map((p) => {
                      const PIcon = Icons[p.icon] || Icons.Circle;
                      return (
                        <li key={p.slug}>
                          <Link
                            to={`/${p.slug}`}
                            className="group flex items-center gap-3 text-sm font-medium text-slate-600 hover:text-navy transition-colors"
                          >
                            <PIcon size={17} strokeWidth={1.5} className="shrink-0 text-brand-orange" />
                            <span className="group-hover:underline underline-offset-4">{p.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
