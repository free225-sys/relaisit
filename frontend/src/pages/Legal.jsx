import { Link } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Seo } from "@/components/site/Seo";
import { CONTACT, LEGAL } from "@/data/content";

const Shell = ({ title, testId, children }) => (
  <div className="min-h-screen bg-white" data-testid={testId}>
    <Header />
    <main>
      <section className="bg-navy-deep pt-28 pb-12 sm:pt-32 sm:pb-14">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <nav aria-label="Fil d'Ariane" className="text-xs text-slate-300">
            <Link to="/" className="hover:text-brand-orange transition-colors">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">{title}</span>
          </nav>
          <h1 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            {title}
          </h1>
        </div>
      </section>
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 [&_h2]:mt-9 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy [&_p]:mt-3 [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:text-slate-600 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:text-[15px] [&_li]:leading-relaxed [&_li]:text-slate-600 [&_li]:mt-1.5 [&_a]:text-brand-ink [&_a]:underline [&_a]:underline-offset-2">
          {children}
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

// Valeur non encore renseignée : signalée sobrement, sans surlignage.
const TODO = ({ children }) => (
  <span className="italic text-slate-400 underline decoration-dotted decoration-slate-300 underline-offset-4">
    {children}
  </span>
);

const isTodo = (value) => typeof value === "string" && value.startsWith("À COMPLÉTER");
const Value = ({ children }) => (isTodo(children) ? <TODO>{children}</TODO> : <>{children}</>);

export function MentionsLegales() {
  return (
    <>
      <Seo
        title="Mentions légales | Relais IT"
        description="Mentions légales du site relaisit.com — éditeur, directeur de publication, hébergement et propriété intellectuelle."
        path="/mentions-legales"
        noindex
      />
      <Shell title="Mentions légales" testId="page-mentions-legales">
        <>
          <p>
            Les informations en gris ci-dessous restent à compléter avec les données officielles
            de l'entreprise avant la mise en ligne. Elles sont obligatoires pour tout site
            professionnel.
          </p>

          <h2>Éditeur du site</h2>
          <ul>
            <li>Raison sociale : {LEGAL.raisonSociale}</li>
            <li>Forme juridique : <Value>{LEGAL.formeJuridique}</Value></li>
            <li>Capital social : <Value>{LEGAL.capital}</Value></li>
            <li>Registre du commerce (RCCM) : <Value>{LEGAL.rccm}</Value></li>
            <li>Siège social : <Value>{LEGAL.siege}</Value></li>
            <li>Téléphone : <a href={CONTACT.tel}>{CONTACT.phone}</a></li>
            <li>Email : <a href={CONTACT.mailto}>{CONTACT.email}</a></li>
          </ul>

          <h2>Directeur de la publication</h2>
          <p><Value>{LEGAL.directeurPublication}</Value></p>

          <h2>Hébergement</h2>
          <p><Value>{LEGAL.hebergeur}</Value></p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus de ce site — textes, images, logo, charte graphique et code —
            est la propriété de {LEGAL.raisonSociale}, sauf mention contraire. Toute reproduction ou
            réutilisation, totale ou partielle, sans autorisation écrite préalable est interdite.
          </p>

          <h2>Responsabilité</h2>
          <p>
            {LEGAL.raisonSociale} met tout en œuvre pour que les informations publiées sur ce site
            soient exactes et à jour, sans pouvoir en garantir l'exhaustivité. Les liens vers des
            sites tiers n'engagent pas la responsabilité de {LEGAL.raisonSociale} quant à leur contenu.
          </p>

          <h2>Données personnelles</h2>
          <p>
            Le traitement des données transmises via ce site est décrit dans notre{" "}
            <Link to="/confidentialite">politique de confidentialité</Link>.
          </p>
        </>
      </Shell>
    </>
  );
}

export function Confidentialite() {
  return (
    <>
      <Seo
        title="Politique de confidentialité | Relais IT"
        description="Comment Relais IT collecte, utilise et protège les données personnelles des visiteurs de relaisit.com."
        path="/confidentialite"
        noindex
      />
      <Shell title="Politique de confidentialité" testId="page-confidentialite">
        <>
          <p>
            Cette politique explique quelles données {LEGAL.raisonSociale} collecte via le site
            relaisit.com, pourquoi, combien de temps elles sont conservées, et comment exercer vos
            droits. Elle s'inscrit dans le cadre de la loi ivoirienne n° 2013-450 relative à la
            protection des données à caractère personnel et, pour les visiteurs situés dans
            l'Union européenne, du règlement général sur la protection des données (RGPD).
          </p>

          <h2>Données collectées</h2>
          <ul>
            <li>
              <strong>Formulaire de contact</strong> : nom, entreprise, adresse email, numéro de
              téléphone, objet et contenu du message. Ces champs sont fournis volontairement par vous.
            </li>
            <li>
              <strong>Mesure d'audience</strong> : pages consultées, provenance, type d'appareil et
              données techniques associées, sous forme agrégée.
            </li>
          </ul>

          <h2>Finalités</h2>
          <ul>
            <li>Répondre à votre demande et établir un devis.</li>
            <li>Assurer le suivi de la relation commerciale.</li>
            <li>Comprendre l'usage du site pour l'améliorer.</li>
          </ul>
          <p>
            Vos données ne sont ni vendues, ni louées, ni transmises à des tiers à des fins
            commerciales.
          </p>

          <h2>Durée de conservation</h2>
          <p>
            Les demandes de contact sont conservées{" "}
            <TODO>36 mois — à ajuster selon votre pratique</TODO> à compter du dernier échange,
            puis supprimées. Les données de mesure d'audience sont conservées 14 mois au maximum.
          </p>

          <h2>Mesure d'audience</h2>
          <p>
            Le site utilise PostHog pour mesurer la fréquentation. L'enregistrement des sessions
            (rejeu de la navigation) est <strong>désactivé</strong>. Aucun cookie publicitaire ni
            traceur tiers à des fins de ciblage n'est déposé.
          </p>

          <h2>Vos droits</h2>
          <p>
            Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et
            d'opposition sur vos données. Pour l'exercer, écrivez à{" "}
            <a href={CONTACT.mailto}>{CONTACT.email}</a>. Une réponse vous sera apportée dans un
            délai maximal d'un mois.
          </p>
          <p>
            En Côte d'Ivoire, vous pouvez également saisir l'Autorité de régulation des
            télécommunications (ARTCI). Dans l'Union européenne, l'autorité de protection des
            données de votre pays de résidence.
          </p>

          <h2>Sécurité</h2>
          <p>
            Les échanges avec ce site sont chiffrés (HTTPS). L'accès aux demandes de contact est
            protégé par authentification et limité aux personnes habilitées chez {LEGAL.raisonSociale}.
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question relative à cette politique :{" "}
            <a href={CONTACT.mailto}>{CONTACT.email}</a> ou{" "}
            <a href={CONTACT.tel}>{CONTACT.phone}</a>.
          </p>
        </>
      </Shell>
    </>
  );
}
