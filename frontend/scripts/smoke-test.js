#!/usr/bin/env node
/**
 * Vérification fonctionnelle du site construit.
 *
 * Sert `build/` en local, lance un vrai navigateur et contrôle les points
 * corrigés : hydratation, formulaire de contact, menu mobile accessible,
 * page 404, contrastes des boutons, liens de navigation.
 *
 * Usage : npm run build && node scripts/smoke-test.js
 */
const fs = require("fs");
const http = require("http");
const path = require("path");

const BUILD_DIR = path.join(__dirname, "..", "build");
const PORT = 45679;

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

const received = [];

function startServer() {
  const server = http.createServer((req, res) => {
    // Fausse API : le formulaire pointe vers /api/contact sur la même origine.
    if (req.url === "/api/contact" && req.method === "POST") {
      let body = "";
      req.on("data", (c) => (body += c));
      req.on("end", () => {
        received.push(JSON.parse(body));
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, id: "test" }));
      });
      return;
    }
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    let filePath = path.join(BUILD_DIR, urlPath);
    if (!filePath.startsWith(BUILD_DIR)) return res.writeHead(403).end();
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      const nested = path.join(filePath, "index.html");
      filePath = fs.existsSync(nested) ? nested : path.join(BUILD_DIR, "index.html");
    }
    res.writeHead(200, { "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
  });
  return new Promise((r) => server.listen(PORT, () => r(server)));
}

const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`  ${ok ? "✓" : "✗"} ${name}${detail ? ` — ${detail}` : ""}`);
};

// Contraste WCAG entre deux couleurs CSS « rgb(r, g, b) ».
function contrast(a, b) {
  const parse = (c) => c.match(/\d+/g).slice(0, 3).map(Number);
  const lum = (rgb) =>
    rgb
      .map((v) => v / 255)
      .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
      .reduce((acc, v, i) => acc + v * [0.2126, 0.7152, 0.0722][i], 0);
  const [l1, l2] = [lum(parse(a)), lum(parse(b))].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

async function main() {
  const { chromium } = require("playwright");
  const server = await startServer();
  const browser = await chromium.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath: process.env.CHROMIUM_PATH || undefined,
  });
  const base = `http://localhost:${PORT}`;

  // ---------------------------------------------------------------- accueil
  console.log("\nAccueil");
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.route("**/*", (r) =>
    r.request().url().includes(`localhost:${PORT}`) ? r.continue() : r.abort(),
  );
  const errors = [];
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    // Les requêtes vers l'extérieur (polices, mesure d'audience, vidéo) sont
    // volontairement bloquées par ce test : leurs échecs ne sont pas des bogues.
    if (m.type() === "error" && !m.text().includes("Failed to load resource")) {
      errors.push(m.text());
    }
  });

  await page.goto(base, { waitUntil: "networkidle" });
  check("le H1 porte le métier et la ville", (await page.locator("h1").innerText()).includes("Abidjan"));
  check("aucune erreur JavaScript à l'hydratation", errors.length === 0, errors[0] || "");
  check(
    "les liens de navigation sont de vrais <a href>",
    (await page.locator('header nav a[href="#services"]').count()) === 1,
  );

  // Contraste du bouton d'action principal
  const cta = page.locator('[data-testid="hero-cta-services"]');
  const [bg, fg] = await cta.evaluate((el) => {
    const s = getComputedStyle(el);
    return [s.backgroundColor, s.color];
  });
  const ratio = contrast(bg, fg);
  check(`contraste du bouton principal ≥ 4,5:1`, ratio >= 4.5, `${ratio.toFixed(2)}:1`);

  // Le numéro affiché et le lien WhatsApp doivent concorder
  const wa = await page.locator('[data-testid="whatsapp-float"]').getAttribute("href");
  check("le lien WhatsApp utilise le numéro affiché", wa.includes("2250747732557"), wa);

  // ------------------------------------------------------- formulaire de contact
  console.log("\nFormulaire de contact");
  await page.locator('[data-testid="cf-nom"]').fill("Awa Traoré");
  await page.locator('[data-testid="cf-email"]').fill("awa@example.com");
  await page.locator('[data-testid="cf-entreprise"]').fill("Cabinet Traoré");
  await page
    .locator('[data-testid="cf-message"]')
    .fill("Bonjour, nous avons douze postes à Cocody et cherchons un contrat de maintenance.");
  await page.locator('[data-testid="contact-form-submit"]').click();
  await page.locator('[data-testid="contact-form-success"]').waitFor({ timeout: 5000 });
  check("la demande est envoyée et confirmée", received.length === 1);
  check("le champ leurre part vide", received[0]?.site_web === "");
  check("les champs saisis sont transmis", received[0]?.nom === "Awa Traoré" && received[0]?.entreprise === "Cabinet Traoré");

  // Cas du déploiement de démonstration : aucune API reliée.
  const noApi = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await noApi.route("**/*", (r) => {
    const u = r.request().url();
    if (u.endsWith("/api/contact")) return r.fulfill({ status: 404, body: "" });
    return u.includes(`localhost:${PORT}`) ? r.continue() : r.abort();
  });
  const np = await noApi.newPage();
  await np.goto(base, { waitUntil: "networkidle" });
  await np.locator('[data-testid="cf-nom"]').fill("Test");
  await np.locator('[data-testid="cf-email"]').fill("test@example.com");
  await np.locator('[data-testid="cf-message"]').fill("Message de vérification suffisamment long.");
  await np.locator('[data-testid="contact-form-submit"]').click();
  const fallback = np.locator('[data-testid="contact-form-error"]');
  await fallback.waitFor({ timeout: 5000 });
  check(
    "sans API reliée, le formulaire renvoie vers téléphone et WhatsApp",
    (await fallback.innerText()).includes("WhatsApp") && (await fallback.innerText()).includes("07 47 73 25 57"),
  );

  // --------------------------------------------------------------- menu mobile
  console.log("\nMenu mobile");
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await mobile.route("**/*", (r) =>
    r.request().url().includes(`localhost:${PORT}`) ? r.continue() : r.abort(),
  );
  const mp = await mobile.newPage();
  await mp.goto(base, { waitUntil: "networkidle" });
  const toggle = mp.locator('[data-testid="mobile-menu-toggle"]');
  check("l'état du menu est annoncé (aria-expanded)", (await toggle.getAttribute("aria-expanded")) === "false");
  await toggle.click();
  check("aria-expanded passe à true à l'ouverture", (await toggle.getAttribute("aria-expanded")) === "true");
  await mp.keyboard.press("Escape");
  await mp.waitForTimeout(150);
  check("la touche Échap referme le menu", (await mp.locator('[data-testid="mobile-menu"]').count()) === 0);
  check("la vidéo n'est pas chargée sur mobile", (await mp.locator("video").count()) === 0);

  // ------------------------------------------------------------------- design
  console.log("\nDesign");
  const halos = await page.locator('[class*="blur-3xl"], [class*="blur-2xl"]').count();
  check("aucun halo orange flouté", halos === 0);
  const glowShadows = await page.evaluate(() =>
    [...document.querySelectorAll("*")].filter((el) => {
      const s = getComputedStyle(el).boxShadow;
      return s && s !== "none" && /rgba?\((?:19[0-9]|2[0-4][0-9]|25[0-5]),\s*(?:6[0-9]|[7-9][0-9]|1[0-2][0-9]),/.test(s);
    }).length,
  );
  check("aucune ombre portée orange", glowShadows === 0, `${glowShadows} trouvée(s)`);
  check(
    "le pied de page tient sur une bande unique",
    (await page.locator("footer nav").count()) === 1,
  );

  // ---------------------------------------------------------------------- 404
  console.log("\nPages");
  const p404 = await ctx.newPage();
  await p404.goto(`${base}/une-adresse-qui-n-existe-pas`, { waitUntil: "networkidle" });
  check("une adresse inconnue affiche une vraie page 404", (await p404.locator('[data-testid="page-404"]').count()) === 1);
  check(
    "la page 404 est en noindex",
    (await p404.locator('meta[name="robots"]').getAttribute("content")).includes("noindex"),
  );

  const pLegal = await ctx.newPage();
  await pLegal.goto(`${base}/mentions-legales`, { waitUntil: "networkidle" });
  check("les mentions légales sont accessibles", (await pLegal.locator("h1").innerText()) === "Mentions légales");

  const pService = await ctx.newPage();
  await pService.goto(`${base}/support-informatique-abidjan`, { waitUntil: "networkidle" });
  check(
    "les pages services ont leur propre balise canonical",
    (await pService.locator('link[rel="canonical"]').getAttribute("href")).endsWith("/support-informatique-abidjan"),
  );

  // Les contrôles ci-dessus passent dans un navigateur : le JavaScript y
  // réécrit les balises, même sans pré-rendu. Les robots d'aperçu, eux,
  // n'exécutent rien. Ce dernier bloc lit donc le HTML BRUT, sans navigateur :
  // c'est le seul contrôle capable de détecter un pré-rendu qui n'a pas eu
  // lieu, et sans lui la panne est invisible.
  const rawHtml = (p) =>
    new Promise((resolve, reject) => {
      http
        .get(`${base}${p}`, (res) => {
          let body = "";
          res.on("data", (c) => (body += c));
          res.on("end", () => resolve(body));
        })
        .on("error", reject);
    });

  const rawService = await rawHtml("/support-informatique-abidjan");
  check(
    "HTML brut : la page service porte son propre titre (pré-rendu)",
    /<title>Support informatique à Abidjan/.test(rawService),
    rawService.includes('<div id="root"></div>') ? "coquille vide : le pré-rendu n'a pas tourné" : "",
  );
  check(
    "HTML brut : la page service porte son propre canonical (pré-rendu)",
    /<link[^>]+rel="canonical"[^>]+href="[^"]*\/support-informatique-abidjan"/.test(rawService),
  );

  const rawLegal = await rawHtml("/mentions-legales");
  check(
    "HTML brut : les mentions légales portent leur titre (pré-rendu)",
    /<title>Mentions légales/.test(rawLegal),
  );

  await browser.close();
  server.close();

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} vérifications passées.\n`);
  process.exit(failed.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
