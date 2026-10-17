import { useEffect } from "react";

const SITE_URL = "https://relaisit.com";

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setCanonical = (href) => {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

/**
 * Gère title, description, canonical, Open Graph et JSON-LD par page.
 * Sans dépendance externe (pas de react-helmet).
 *
 * Important : ces balises sont écrites par JavaScript. Les robots d'aperçu de
 * WhatsApp, LinkedIn ou Facebook n'exécutent pas JavaScript — c'est le
 * pré-rendu au build (react-snap, voir `npm run build`) qui fige le résultat
 * dans le HTML livré et rend ces balises visibles pour eux.
 */
export const Seo = ({ title, description, path = "/", jsonLd = null, noindex = false }) => {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setCanonical(url);

    // JSON-LD spécifique à la page (breadcrumb, service, FAQ…)
    const SCRIPT_ID = "page-jsonld";
    document.getElementById(SCRIPT_ID)?.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = SCRIPT_ID;
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => document.getElementById(SCRIPT_ID)?.remove();
  }, [title, description, path, jsonLd, noindex]);

  return null;
};
