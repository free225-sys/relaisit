#!/usr/bin/env node
/**
 * Génère public/sitemap.xml à partir des pages réellement déclarées dans le code.
 *
 * Auparavant le fichier était écrit à la main : les dates `lastmod` restaient
 * figées et une nouvelle page pouvait être oubliée. Ce script est appelé
 * automatiquement par `npm run build`.
 */
const fs = require("fs");
const path = require("path");

const SITE_URL = "https://relaisit.com";
const PUBLIC_DIR = path.join(__dirname, "..", "public");
const SERVICES_FILE = path.join(__dirname, "..", "src", "data", "servicesPages.js");

// Les slugs sont lus dans la source plutôt que recopiés : une page ajoutée à
// servicesPages.js apparaît automatiquement dans le sitemap.
function readServiceSlugs() {
  const source = fs.readFileSync(SERVICES_FILE, "utf8");
  const block = source.slice(source.indexOf("export const SERVICE_PAGES"));
  const slugs = [...block.matchAll(/^\s{2}"([a-z0-9-]+)":\s*\{/gm)].map((m) => m[1]);
  if (slugs.length === 0) {
    throw new Error("Aucun slug de page service trouvé dans servicesPages.js");
  }
  return slugs;
}

// Date de dernière modification réelle, prise sur le fichier source.
function lastModified(file) {
  return fs.statSync(file).mtime.toISOString().slice(0, 10);
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

const servicesLastmod = lastModified(SERVICES_FILE);
const homeLastmod = lastModified(path.join(__dirname, "..", "src", "pages", "Home.jsx"));

const entries = [
  urlEntry({ loc: `${SITE_URL}/`, lastmod: homeLastmod, changefreq: "monthly", priority: "1.0" }),
  ...readServiceSlugs().map((slug) =>
    urlEntry({
      loc: `${SITE_URL}/${slug}`,
      lastmod: servicesLastmod,
      changefreq: "monthly",
      priority: "0.8",
    }),
  ),
];

// Les pages légales sont volontairement absentes : elles sont en `noindex`.

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), xml);
console.log(`sitemap.xml : ${entries.length} URL générées.`);
