import { useState } from "react";
import { Icons } from "@/lib/icons";
import { toast } from "sonner";
import { CONTACT } from "@/data/content";

// `fetch` plutôt qu'axios : axios pèse une centaine de kilo-octets de sources
// et n'est utilisé que par l'espace d'administration, qui est chargé à part.
const API = `${process.env.REACT_APP_BACKEND_URL || ""}/api`;

const OBJETS = [
  "Support et maintenance informatique",
  "Matériel informatique",
  "Réseaux et sécurité",
  "Solutions digitales",
  "Formation professionnelle",
  "Formation intelligence artificielle",
  "Conseil IT",
  "Autre demande",
];

const EMPTY = {
  nom: "",
  entreprise: "",
  email: "",
  telephone: "",
  objet: OBJETS[0],
  message: "",
  site_web: "", // champ leurre anti-robot, masqué aux humains
};

const field =
  "w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-navy " +
  "placeholder:text-slate-400 transition-colors " +
  "focus:border-brand-cta focus:outline-none focus:ring-2 focus:ring-brand-cta/30";

const labelClass = "block text-xs font-semibold uppercase tracking-wide text-slate-500";

export const ContactForm = () => {
  const [values, setValues] = useState(EMPTY);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const update = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      const res = await fetch(`${API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      // Site déployé sans back-end (aperçu de démonstration) : la route
      // n'existe pas et l'hébergeur renvoie la page 404 du site.
      if (res.status === 404 || res.status === 405) {
        setError("backend-absent");
        return;
      }
      if (res.status === 429) {
        setError(
          "Vous avez déjà envoyé plusieurs demandes. Réessayez dans un moment, ou appelez-nous directement.",
        );
        return;
      }
      if (res.status === 422) {
        setError("Certaines informations sont incomplètes ou mal formatées. Vérifiez le formulaire.");
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setSent(true);
      setValues(EMPTY);
      toast.success("Votre demande a bien été envoyée.");
    } catch {
      setError("backend-absent");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div
        data-testid="contact-form-success"
        role="status"
        className="rounded-2xl border border-slate-100 bg-slate-50 p-8 text-center"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-cta text-white">
          <Icons.CheckCircle2 size={24} strokeWidth={1.5} />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-navy">Demande envoyée</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
          Merci. Nous revenons vers vous sous 24 heures ouvrées. Pour une urgence,
          appelez-nous ou écrivez-nous sur WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-5 text-sm font-semibold text-brand-ink hover:underline underline-offset-4"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      data-testid="contact-form"
      noValidate
      className="rounded-2xl border border-slate-100 bg-slate-50 p-6 sm:p-8"
    >
      <h3 className="text-lg font-semibold text-navy">Décrivez votre besoin</h3>
      <p className="mt-1 text-sm text-slate-600">
        Réponse sous 24 heures ouvrées. Les champs marqués d'un astérisque sont obligatoires.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="cf-nom">
            Nom et prénom *
          </label>
          <input
            id="cf-nom"
            name="nom"
            data-testid="cf-nom"
            className={`mt-1.5 ${field}`}
            value={values.nom}
            onChange={update("nom")}
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="cf-entreprise">
            Entreprise
          </label>
          <input
            id="cf-entreprise"
            name="entreprise"
            data-testid="cf-entreprise"
            className={`mt-1.5 ${field}`}
            value={values.entreprise}
            onChange={update("entreprise")}
            maxLength={160}
            autoComplete="organization"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="cf-email">
            Email *
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            data-testid="cf-email"
            className={`mt-1.5 ${field}`}
            value={values.email}
            onChange={update("email")}
            required
            autoComplete="email"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="cf-telephone">
            Téléphone
          </label>
          <input
            id="cf-telephone"
            name="telephone"
            type="tel"
            data-testid="cf-telephone"
            className={`mt-1.5 ${field}`}
            value={values.telephone}
            onChange={update("telephone")}
            maxLength={40}
            autoComplete="tel"
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="cf-objet">
            Votre besoin *
          </label>
          <select
            id="cf-objet"
            name="objet"
            data-testid="cf-objet"
            className={`mt-1.5 ${field}`}
            value={values.objet}
            onChange={update("objet")}
            required
          >
            {OBJETS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="cf-message">
            Message *
          </label>
          <textarea
            id="cf-message"
            name="message"
            data-testid="cf-message"
            rows={5}
            className={`mt-1.5 ${field} resize-y`}
            value={values.message}
            onChange={update("message")}
            required
            minLength={10}
            maxLength={4000}
            placeholder="Nombre de postes, contexte, échéance souhaitée…"
          />
        </div>
      </div>

      {/* Champ leurre : invisible et hors du parcours clavier, rempli par les robots. */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden -m-px p-0 border-0 [clip:rect(0,0,0,0)]">
        <label htmlFor="cf-site-web">Ne remplissez pas ce champ</label>
        <input
          id="cf-site-web"
          name="site_web"
          tabIndex={-1}
          autoComplete="off"
          value={values.site_web}
          onChange={update("site_web")}
        />
      </div>

      {error === "backend-absent" ? (
        <div
          data-testid="contact-form-error"
          role="alert"
          className="mt-5 rounded-lg border border-slate-200 bg-white p-4"
        >
          <p className="text-sm font-medium text-navy">
            L'envoi automatique n'est pas disponible pour le moment.
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            Écrivez-nous directement, la réponse sera tout aussi rapide :
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            <a href={CONTACT.tel} className="text-brand-ink hover:underline underline-offset-4">
              Appeler le {CONTACT.phone}
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-ink hover:underline underline-offset-4"
            >
              Écrire sur WhatsApp
            </a>
            <a href={CONTACT.mailto} className="text-brand-ink hover:underline underline-offset-4">
              {CONTACT.email}
            </a>
          </div>
        </div>
      ) : (
        error && (
          <p data-testid="contact-form-error" role="alert" className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )
      )}

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          data-testid="contact-form-submit"
          disabled={sending}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-cta px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-ctaDark hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0"
        >
          {sending ? (
            <Icons.Loader2 size={17} className="animate-spin" />
          ) : (
            <Icons.Send size={17} />
          )}
          {sending ? "Envoi en cours…" : "Envoyer ma demande"}
        </button>
        <p className="text-xs leading-relaxed text-slate-500">
          Vos informations servent uniquement à traiter votre demande.{" "}
          <a href="/confidentialite" className="text-brand-ink hover:underline underline-offset-2">
            Politique de confidentialité
          </a>
        </p>
      </div>
    </form>
  );
};
