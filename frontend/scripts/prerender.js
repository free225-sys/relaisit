#!/usr/bin/env node
/**
 * Pré-rendu des pages du site.
 *
 * Pourquoi : le site est une application React rendue côté client. Le fichier
 * `build/index.html` produit par create-react-app ne contient qu'un
 * `<div id="root"></div>` vide, et les balises propres à chaque page (titre,
 * description, Open Graph, canonical, JSON-LD) sont écrites par JavaScript.
 * Or les robots d'aperçu de WhatsApp, LinkedIn, Facebook et X n'exécutent pas
 * JavaScript : ils voyaient donc toujours les balises de l'accueil, quelle que
 * soit la page partagée.
 *
 * Ce script ouvre chaque route dans un navigateur sans interface, laisse la
 * page se construire, fait défiler l'ensemble du contenu pour que les
 * animations d'apparition soient terminées, puis écrit le HTML obtenu dans
 * `build/<route>/index.html`. Au chargement, React « hydrate » ce HTML au lieu
 * de le reconstruire (voir src/index.js).
 *
 * Prérequis : `npx playwright install chromium` (une seule fois par machine).
 * Usage :     node scripts/prerender.js
 */
const fs = require("fs");
const http = require("http");
const path = require("path");

const BUILD_DIR = path.join(__dirname, "..", "build");
const PORT = 45678;

const ROUTES = [
  "/",
  "/support-informatique-abidjan",
  "/materiel-informatique-cote-divoire",
  "/reseaux-securite-informatique-abidjan",
  "/solutions-digitales-abidjan",
  "/formation-informatique-abidjan",
  "/formation-intelligence-artificielle-abidjan",
  "/mentions-legales",
  "/confidentialite",
  "/404",
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

// Petit serveur statique avec repli sur index.html, comme en production.
function startServer() {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    let filePath = path.join(BUILD_DIR, urlPath);
    if (!filePath.startsWith(BUILD_DIR)) {
      res.writeHead(403).end();
      return;
    }
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(BUILD_DIR, "index.html");
    }
    res.writeHead(200, { "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

function outputFile(route) {
  return route === "/"
    ? path.join(BUILD_DIR, "index.html")
    : path.join(BUILD_DIR, route.slice(1), "index.html");
}

// Sur un hébergeur dont l'image de build n'embarque pas Chromium, le pré-rendu
// ne doit pas faire échouer le déploiement : le site se construit quand même,
// simplement sans HTML figé. L'absence est signalée bruyamment, et
// `npm run verify` la détecte (les pages n'ont alors plus leur propre
// canonical). Mettre PRERENDER_STRICT=1 pour exiger l'échec à la place.
const STRICT = process.env.PRERENDER_STRICT === "1";

function giveUp(reason) {
  const msg =
    "\n" +
    "═".repeat(72) +
    "\n  PRÉ-RENDU NON EFFECTUÉ — " +
    reason +
    "\n" +
    "  Le site est construit, mais chaque page partagée affichera l'aperçu\n" +
    "  de l'accueil (WhatsApp, LinkedIn, Facebook, X) et les balises\n" +
    "  canonical pointeront toutes vers `/`.\n\n" +
    "  Pour corriger : installer Chromium dans l'image de build, puis\n" +
    "  `npx playwright install chromium`, ou renseigner CHROMIUM_PATH.\n" +
    "═".repeat(72) +
    "\n";
  if (STRICT) {
    console.error(msg);
    process.exit(1);
  }
  console.warn(msg);
  process.exit(0);
}

// Cherche un Chromium déjà installé dans l'image (apt, snap, poste de travail)
// avant de se rabattre sur celui que télécharge Playwright.
function findSystemChromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const candidates = [
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/google-chrome",
    "/snap/bin/chromium",
  ];
  for (const c of candidates) {
    try {
      fs.accessSync(c, fs.constants.X_OK);
      return c;
    } catch {
      /* candidat suivant */
    }
  }
  return undefined;
}

// Dernière chance avant d'abandonner : télécharger le navigateur. Utile sur un
// hébergeur où `npm ci` n'a pas déclenché le post-install de Playwright.
function tryInstallChromium() {
  try {
    const { execFileSync } = require("child_process");
    console.warn("  Chromium introuvable — tentative de téléchargement…");
    execFileSync("npx", ["--yes", "playwright", "install", "chromium"], {
      stdio: "inherit",
      timeout: 180000,
    });
    return true;
  } catch {
    return false;
  }
}

async function main() {
  let chromium;
  try {
    ({ chromium } = require("playwright"));
  } catch {
    giveUp("le paquet `playwright` est absent.");
  }

  const indexPath = path.join(BUILD_DIR, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.error("✗ Aucun build trouvé. Lancez `npm run build:only` d'abord.");
    process.exit(1);
  }

  // Coquille d'origine (racine vide), conservée avant d'être remplacée par la
  // version pré-rendue de l'accueil. Elle sert aux pages qu'on ne pré-rend pas.
  const emptyShell = fs.readFileSync(indexPath, "utf8");

  const launchOptions = {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    // Permet d'utiliser un Chromium déjà présent (image de build, poste de
    // travail) au lieu de celui téléchargé par Playwright.
    executablePath: findSystemChromium(),
  };

  let browser;
  try {
    browser = await chromium.launch(launchOptions);
  } catch (first) {
    if (!launchOptions.executablePath && tryInstallChromium()) {
      try {
        browser = await chromium.launch(launchOptions);
      } catch (second) {
        giveUp("aucun navigateur utilisable — " + second.message.split("\n")[0]);
      }
    } else {
      giveUp("aucun navigateur utilisable — " + first.message.split("\n")[0]);
    }
  }

  const server = await startServer();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    // « Animations réduites » : les compteurs affichent immédiatement leur
    // valeur finale au lieu de dépendre du moment où la capture intervient
    // pendant leur décompte. Le pré-rendu devient reproductible à l'identique.
    reducedMotion: "reduce",
  });

  // Les appels sortants (polices, mesure d'audience, vidéo) ne servent à rien
  // pour le pré-rendu et ralentiraient chaque page.
  await context.route("**/*", (route) => {
    const url = route.request().url();
    return url.includes(`localhost:${PORT}`) ? route.continue() : route.abort();
  });

  const results = [];

  for (const routePath of ROUTES) {
    const page = await context.newPage();
    await page.goto(`http://localhost:${PORT}${routePath}`, { waitUntil: "networkidle" });
    await page.waitForSelector("#root > *", { timeout: 15000 });

    // Parcourt la page pour déclencher les animations d'apparition, sinon les
    // sections situées sous la ligne de flottaison resteraient à opacité 0
    // dans le HTML figé.
    // Le nettoyage et la capture ont lieu dans le même passage : sinon la
    // bibliothèque d'animation réécrirait ses styles en ligne entre les deux.
    const html = await page.evaluate(async () => {
      // Défilement instantané : avec `scroll-behavior: smooth`, des appels
      // rapprochés s'annulent entre eux et le bas de page n'est jamais atteint.
      const previousBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";

      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 150));
      }
      window.scrollTo(0, 0);
      document.documentElement.style.scrollBehavior = previousBehavior;
      // Laisse toutes les animations d'apparition se terminer.
      await new Promise((r) => setTimeout(r, 1500));

      // Nettoyage des styles laissés par la bibliothèque d'animation.
      //
      // Deux raisons. D'abord une section figée en pleine apparition resterait
      // à l'opacité 0 dans le HTML : le visiteur verrait un trou tant que
      // JavaScript n'a pas repris la main. Ensuite, ces styles en ligne
      // n'existent pas dans le rendu initial de React (voir src/lib/hydration.js) :
      // les laisser provoquerait une erreur d'hydratation et la reconstruction
      // de la section côté client.
      // La vidéo décorative du hero n'est insérée qu'après le montage côté
      // client (voir Hero.jsx) : elle ne doit pas figurer dans le HTML figé.
      document.querySelectorAll('video[aria-hidden="true"]').forEach((el) => el.remove());
      document.querySelectorAll('[data-testid="hero-video-toggle"]').forEach((el) => el.remove());

      document.querySelectorAll("[style]").forEach((el) => {
        const kept = el
          .getAttribute("style")
          .split(";")
          .map((d) => d.trim())
          .filter((d) => d && !/^(opacity|transform|will-change)\s*:/i.test(d));
        if (kept.length) el.setAttribute("style", kept.join("; ") + ";");
        else el.removeAttribute("style");
      });

      // Sépare les nœuds de texte voisins par un commentaire vide.
      //
      // `Appeler {numero}` produit deux nœuds de texte distincts dans le DOM.
      // À la sérialisation ils fusionnent en un seul, et React ne retrouve plus
      // sa structure au moment d'hydrater. Le rendu côté serveur de React
      // insère exactement ce même séparateur pour cette raison.
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
      const elements = [document.body];
      while (walker.nextNode()) elements.push(walker.currentNode);
      for (const el of elements) {
        let child = el.firstChild;
        while (child && child.nextSibling) {
          const next = child.nextSibling;
          if (child.nodeType === Node.TEXT_NODE && next.nodeType === Node.TEXT_NODE) {
            el.insertBefore(document.createComment(""), next);
          }
          child = next;
        }
      }

      return "<!doctype html>\n" + document.documentElement.outerHTML;
    });

    const file = outputFile(routePath);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, html);

    const title = await page.title();
    results.push({ routePath, title, size: Buffer.byteLength(html) });
    await page.close();
  }

  await browser.close();
  server.close();

  // Copie de la page 404 à la racine : la plupart des hébergeurs statiques
  // servent `404.html` avec un vrai code HTTP 404.
  const notFound = outputFile("/404");
  if (fs.existsSync(notFound)) fs.copyFileSync(notFound, path.join(BUILD_DIR, "404.html"));

  // L'espace d'administration n'est pas pré-rendu (il est privé, en `noindex`,
  // et chargé à la demande). On lui laisse la coquille d'origine pour qu'un
  // accès direct à /admin fonctionne sur un hébergeur statique.
  const adminDir = path.join(BUILD_DIR, "admin");
  fs.mkdirSync(adminDir, { recursive: true });
  fs.writeFileSync(path.join(adminDir, "index.html"), emptyShell);

  console.log("\nPages pré-rendues :");
  for (const r of results) {
    console.log(`  ${r.routePath.padEnd(42)} ${String(Math.round(r.size / 1024)).padStart(4)} ko  ${r.title}`);
  }
  console.log("");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
