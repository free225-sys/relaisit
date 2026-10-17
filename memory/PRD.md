# Relais IT — Corporate Website PRD

## Original Problem Statement
Build a professional corporate single-page website for "Relais IT" (IT services company, Abidjan, Côte d'Ivoire). Trustworthy, modern, structured design with dark navy blue and orange brand colors. Sections: Header, Hero, Services, Method, About, Why Choose Us, Training, Contact. Stack: React + FastAPI + MongoDB. Site content is 100% French; user communicates in English.

## Core Requirements
- Clean, premium, concise UI
- No contact form — direct action links only (WhatsApp wa.me, mailto, tel)
- Floating WhatsApp button (number: 01 61 31 97 82)
- SEO-optimized: OpenGraph, JSON-LD, Twitter cards, favicons, robots.txt, sitemap.xml
- Mobile-responsive
- Production domain already live

## What's Been Implemented
- Full single-page site (Home.jsx + components in /app/frontend/src/components/site/)
- Multiple UI refinement passes (shortened copy, "Method" 3-step section)
- PNG logo integration, SEO/metadata pass, domain setup, final delivery audit (all tests passed, iterations 1–7)
- 2026-06: Replaced Hero.jsx (full-screen video background hero, bottom-left content, pill CTAs) and Header.jsx (transparent over hero → solid white on scroll/menu open) with user-provided files; added `section[id] { scroll-margin-top: 5rem; }` to index.css. Verified via screenshots.
- 2026-06 (polish-seo drop): Integrated user's 14-file archive as-is: overwrote App.js, index.css, Home.jsx, Header.jsx, Footer.jsx, Services.jsx, sitemap.xml; added ServicePage.jsx, StatsBand.jsx, TrustMarquee.jsx, Testimonials.jsx, Seo.jsx, ScrollToTop.jsx, servicesPages.js. New homepage sections: trust marquee, animated stats band, dark testimonials. 6 new SEO service routes (/support-informatique-abidjan, /materiel-informatique-cote-divoire, /reseaux-securite-informatique-abidjan, /solutions-digitales-abidjan, /formation-informatique-abidjan, /formation-intelligence-artificielle-abidjan) — all verified 200 on direct access with correct SEO titles. Production build passes. No new dependencies.

## Architecture
- Backend: /app/backend/server.py (FastAPI, CRUD for contact_submissions — legacy, form removed from frontend)
- Frontend: React + Tailwind + Framer Motion; content centralized in /app/frontend/src/data/content.js
- Routes: / (Home), /admin (unprotected admin view of contact submissions)

## Backlog
- (all P2 items closed as of 2026-02 deployment prep)

## Deployment Readiness (2026-02)
- CORS_ORIGINS set to `*` in backend/.env (required by Emergent Deployer Agent for preview + production hosting).
- Orphaned `POST /api/contact` endpoint and `ContactSubmissionCreate` model purged from server.py.
- No hardcoded localhost/0.0.0.0/:8001/127.0.0.1 in backend or frontend source (grep-verified).
- Deployer Agent health check: **PASS** (all checks green).

## Admin Auth (added 2026-06)
- /admin protected by password-only login (ADMIN_PASSWORD + JWT_SECRET in backend/.env)
- POST /api/admin/login → JWT (12h); GET/DELETE /api/contact + GET /api/admin/me require Bearer token (401 otherwise)
- Frontend: login gate in Admin.jsx, token in sessionStorage, auto-logout on 401, logout button
- robots.txt: Disallow: /admin added
- Verified end-to-end (curl + browser: 401s, wrong/correct password, dashboard, logout)

## SEO Extras
- 2026-06: Google Search Console verification meta tag (jNN4qvQkKMSFWD3ZabxVylBXuYJEnzdjvI_hZMmfrtQ) added in index.html right after robots meta. User's pasted tag was malformed/nested; corrected valid form inserted. Verified by testing agent (iteration_8): served HTML + build/index.html contain the tag, all regressions pass.

## Notes for Agents
- Respond to user in English; all site content stays in French
- Site is polished/deployment-ready — no visual changes unless requested

## Chantier de corrections (2026-08-08)

Suite à un audit complet. Tout est vérifié par tests automatisés
(`backend/tests/backend_test.py`, 14 tests ; `frontend/scripts/smoke-test.js`, 16 vérifications).

### Sécurité (backend/server.py réécrit)
- `POST/GET /api/status` supprimés : ils permettaient d'écrire en base sans authentification.
- CORS : `allow_credentials` est désormais toujours `False` (l'auth passe par en-tête `Authorization`, jamais par cookie) et les origines sont lues depuis `CORS_ORIGINS`. Un `*` déclenche un avertissement au démarrage.
- Limitation de débit en mémoire : 5 tentatives / 15 min sur `/api/admin/login`, 5 envois / heure sur `POST /api/contact`.
- `on_event("shutdown")` → `lifespan`. Index MongoDB créés au démarrage.
- `requirements.txt` : 27 → 8 paquets (pandas, numpy, boto3, passlib, bcrypt, python-jose, typer, emergentintegrations supprimés — non utilisés).
- `backend/.env.example` ajouté.

### Formulaire de contact
- `POST /api/contact` rétabli avec validation (EmailStr, longueurs), champ leurre `site_web` et limitation de débit.
- Nouveau composant `frontend/src/components/site/ContactForm.jsx` (fetch natif, pas axios), intégré dans `Contact.jsx`.
- Le back-office `/admin` reçoit donc à nouveau des demandes. Champ `entreprise` ajouté au modèle.

### SEO
- **Pré-rendu** : `frontend/scripts/prerender.js` (Playwright). Chaque route est figée dans `build/<route>/index.html`. Corrige les aperçus WhatsApp/LinkedIn/Facebook et les balises canonical, qui pointaient toutes vers l'accueil.
- `src/index.js` utilise `hydrateRoot` quand le HTML est pré-rendu.
- `src/lib/hydration.js` : neutralise les animations d'apparition pendant l'hydratation initiale pour que le rendu concorde exactement (sinon erreur React #418).
- Vraie page 404 (`src/pages/NotFound.jsx`, `noindex`) au lieu de la redirection silencieuse ; `build/404.html` généré.
- Navigation en `<a href>` au lieu de `<button>` (explorable, ouvrable en nouvel onglet).
- H1 de l'accueil : « Solutions informatiques pour les entreprises à Abidjan » ; le slogan passe en sous-titre.
- `sitemap.xml` généré au build (`scripts/generate-sitemap.js`) ; `meta keywords` retirée ; JSON-LD enrichi (horaires, priceRange, devise).

### Performance
- `import * as Icons from "lucide-react"` remplacé par `src/lib/icons.js` (imports nommés) dans 6 fichiers.
- `/admin` chargé en différé ; react-query retiré (initialisé sans être utilisé).
- **Paquet principal : 293,4 ko → 143,8 ko compressés.**
- Logo : 361 ko → 7,2 ko (WebP 384 px) ; `LOGO_URL` pointe sur `.webp`.
- Vidéo du hero : image `hero-poster.webp` préchargée, vidéo insérée seulement après montage, uniquement ≥ 768 px et hors `prefers-reduced-motion`, avec bouton pause (WCAG 2.2.2).
- Script `assets.emergent.sh/scripts/emergent-main.js` retiré de la production.
- PostHog : `disable_session_recording: true`, `autocapture: false`.

### Accessibilité
- Nouveaux jetons Tailwind : `brand-cta` #C45017 (4,66:1 avec blanc), `brand-ctaDark` #A8430F, `brand-ink` #C45017 (texte sur fond clair), `brand-light` #F0A47F (texte sur fond navy). `brand-orange` #E8743B reste pour les aplats décoratifs et les icônes.
- Gris trop clairs corrigés (slate-400 sur blanc, slate-500 sur navy-deep, slate-400 sur navy).
- Menu mobile : `aria-expanded`, `aria-controls`, fermeture à Échap et au clic extérieur, focus rendu au bouton.
- `autoFocus` retiré du champ mot de passe admin.

### Juridique
- Pages `/mentions-legales` et `/confidentialite` (`src/pages/Legal.jsx`), liées depuis le pied de page, en `noindex`.
- Champs `LEGAL` dans `content.js` avec valeurs « À COMPLÉTER » surlignées à l'écran.
- Téléphone unifié : `07 47 73 25 57` partout, WhatsApp compris (`wa.me/2250747732557`).

### Outillage
- `package-lock.json` versionné ; `ajv` / `ajv-keywords` figés (le build cassait sinon selon l'ordre d'installation).
- `@emergentbase/visual-edits` déplacé en `optionalDependencies` (son hébergement peut être injoignable).
- `eslint.config.mjs` (format plat, contrôle d'accessibilité inclus) ; `npm run lint` propre.
- README réécrit.

### Reste à faire (décisions métier)
- Témoignages et chiffres du bandeau statistiques : toujours fictifs, inchangés à la demande du client.
- Champs `LEGAL` à renseigner.
- Logos clients réels pour `TrustMarquee`.
- Fiche Google Business Profile et `sameAs`.
- Dépôt Git à passer en privé.
