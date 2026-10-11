import { Link } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Seo } from "@/components/site/Seo";
import { Icons } from "@/lib/icons";
import { SERVICE_PAGE_LINKS } from "@/data/servicesPages";

/**
 * Vraie page 404.
 *
 * L'ancienne version redirigeait silencieusement vers l'accueil : le serveur
 * répondait 200 pour n'importe quelle adresse, ce que Google interprète comme
 * un « soft 404 » et finit par pénaliser. Ici la page se déclare `noindex`,
 * et un fichier `public/404.html` est généré au build pour que l'hébergeur
 * renvoie un véritable code 404 quand il le permet.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-white" data-testid="page-404">
      <Seo
        title="Page introuvable (404) | Relais IT"
        description="La page demandée n'existe pas ou a été déplacée."
        path="/404"
        noindex
      />
      <Header />
      <main>
        <section className="bg-navy-deep pt-32 pb-16 sm:pt-36 sm:pb-20">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-orange">
              Erreur 404
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              Cette page n'existe pas
            </h1>
            <p className="mt-4 max-w-xl text-base lg:text-lg leading-relaxed text-slate-300">
              L'adresse est peut-être incorrecte, ou la page a été déplacée. Voici par où
              continuer.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-4">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-cta px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-ctaDark hover:-translate-y-0.5"
              >
                <Icons.ArrowLeft size={17} /> Retour à l'accueil
              </Link>
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/60 px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-navy"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <h2 className="text-xl font-semibold text-navy">Nos services</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {SERVICE_PAGE_LINKS.map((p) => {
                const Icon = Icons[p.icon] || Icons.Circle;
                return (
                  <li key={p.slug}>
                    <Link
                      to={`/${p.slug}`}
                      className="group flex items-center gap-3 rounded-xl bg-slate-50 p-4 text-sm font-medium text-slate-700 transition-colors hover:bg-white hover:shadow-md"
                    >
                      <Icon size={18} strokeWidth={1.5} className="shrink-0 text-brand-ink" />
                      <span className="group-hover:underline underline-offset-4">{p.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
