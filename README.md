# Relais IT — site web

Site vitrine de Relais IT (Abidjan, Côte d'Ivoire) : services informatiques,
matériel, réseaux et sécurité, solutions digitales, conseil et formations.

- **Front-end** — React 19, Tailwind CSS, Framer Motion, build create-react-app via craco.
- **Back-end** — FastAPI + MongoDB. Il sert le formulaire de contact et l'espace d'administration.
- **Contenu** — entièrement en français, centralisé dans `frontend/src/data/`.

---

## Démarrage

### Prérequis

- Node.js 18 à 22
- Python 3.11 ou plus récent
- Un MongoDB accessible (local ou hébergé)

### Back-end

```bash
cd backend
cp .env.example .env          # puis renseignez les valeurs
python -m venv .venv && .venv/bin/pip install -r requirements.txt
.venv/bin/uvicorn server:app --reload --port 8001
```

Générez les deux secrets avec :

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### Front-end

```bash
cd frontend
npm install
npx playwright install chromium   # une seule fois, pour le pré-rendu
echo "REACT_APP_BACKEND_URL=http://localhost:8001" > .env
npm start
```

---

## Commandes

| Commande | Effet |
| --- | --- |
| `npm start` | Serveur de développement (port 3000) |
| `npm run build` | Sitemap + build de production + **pré-rendu** — c'est la commande à utiliser pour déployer |
| `npm run build:only` | Build sans pré-rendu (dépannage) |
| `npm run prerender` | Pré-rendu seul, sur un `build/` existant |
| `npm run sitemap` | Régénère `public/sitemap.xml` |
| `npm run lint` | ESLint, contrôle d'accessibilité inclus |
| `npm run verify` | Vérification fonctionnelle du site construit (20 contrôles) |

Côté back-end :

```bash
cd backend && .venv/bin/python -m pytest tests -q
```

---

## Le pré-rendu, et pourquoi il ne faut pas le retirer

Le site est une application React rendue côté client : le `build/index.html`
brut ne contient qu'un `<div id="root">` vide. Les titres, descriptions, balises
Open Graph et données structurées propres à chaque page sont écrits par
JavaScript.

Or **les robots d'aperçu de WhatsApp, LinkedIn, Facebook et X n'exécutent pas
JavaScript**. Sans pré-rendu, toutes les pages partagées affichaient l'aperçu de
l'accueil, et toutes se déclaraient comme des copies de l'accueil via la balise
`canonical`.

`scripts/prerender.js` ouvre chaque route dans un navigateur sans interface et
écrit le HTML obtenu dans `build/<route>/index.html`. Au chargement, React
« hydrate » ce HTML plutôt que de le reconstruire.

Deux conséquences à connaître avant de modifier le code :

1. **Toute nouvelle page doit être ajoutée à `ROUTES` dans `scripts/prerender.js`.**
2. **Le premier rendu doit produire exactement le HTML pré-rendu.** C'est le rôle
   de `src/lib/hydration.js` : pendant l'hydratation initiale, les animations
   d'apparition sont neutralisées et les compteurs partent de leur valeur finale.
   Un composant dont le rendu dépend de l'heure, du hasard ou d'un état chargé
   après coup provoquerait une erreur d'hydratation. `scripts/smoke-test.js`
   vérifie ce point à chaque exécution.

---

## Déploiement

### Netlify

Le fichier `netlify.toml` à la racine contient toute la configuration. Il suffit
de connecter le dépôt : Netlify construit `frontend/`, installe Chromium pour le
pré-rendu et publie `frontend/build/`.

**Aucune règle de redirection attrape-tout n'est déclarée, et c'est voulu.**
Chaque page publique existe comme fichier statique grâce au pré-rendu : Netlify
les sert directement et renvoie `404.html` avec un vrai code HTTP 404 pour les
adresses inconnues. Une règle `/* /index.html 200` annulerait ces deux
comportements et ferait réapparaître le problème de « soft 404 ».

Sans back-end relié, le formulaire de contact reste affiché et invite à appeler
ou à écrire sur WhatsApp. Pour le brancher :

1. Hébergez `backend/` (Render, Railway, Fly.io…).
2. Netlify → Site settings → Environment variables →
   `REACT_APP_BACKEND_URL = https://votre-api.exemple.com`
3. Ajoutez le domaine Netlify au `CORS_ORIGINS` du back-end, puis redéployez.

Les balises `canonical` pointent toujours vers `https://relaisit.com`. Un aperçu
publié sur une adresse `*.netlify.app` ne sera donc pas indexé en doublon. Le
jour où le domaine définitif pointe sur Netlify, il n'y a rien à changer.

### Autre hébergeur

Déployez le contenu de `frontend/build/`. Configurez l'hébergeur pour :

- servir `404.html` avec un vrai code HTTP 404 ;
- servir les fichiers `build/<route>/index.html` tels quels, sans les réécrire vers `index.html` — sinon le pré-rendu ne sert à rien.

Variables d'environnement du back-end : voir `backend/.env.example`.
**`CORS_ORIGINS` ne doit jamais valoir `*` en production.**

---

## À compléter avant la mise en ligne

- [ ] **Mentions légales** — les champs `LEGAL` de `frontend/src/data/content.js` contiennent des valeurs `À COMPLÉTER` (forme juridique, RCCM, siège, directeur de publication, hébergeur). Elles apparaissent surlignées sur la page.
- [ ] **Durée de conservation des demandes** — à confirmer dans la politique de confidentialité (`frontend/src/pages/Legal.jsx`).
- [ ] **Témoignages** — ceux affichés sont des exemples (voir l'avertissement en tête de `frontend/src/components/site/Testimonials.jsx`). À remplacer par de vrais retours clients, avec leur accord, ou à retirer.
- [ ] **Chiffres du bandeau statistiques** — mêmes réserves (`frontend/src/components/site/StatsBand.jsx`).
- [ ] **Bandeau de confiance** — `TrustMarquee.jsx` affiche vos domaines d'expertise faute de logos clients.
- [ ] **Dépôt Git** — le passer en privé, ou en retirer `memory/`, `test_result.md`, `test_reports/` et `.emergent/`, qui décrivent l'architecture interne et la route d'administration.
- [ ] **Fiche Google Business Profile** — à créer, puis renseigner `sameAs` et l'adresse complète dans le JSON-LD de `frontend/public/index.html`.

---

## Structure

```
backend/
  server.py              API FastAPI (contact, administration)
  tests/backend_test.py  Tests (base simulée en mémoire, aucun MongoDB requis)
  .env.example           Variables d'environnement attendues
frontend/
  public/                index.html, images, robots.txt, sitemap.xml
  scripts/
    generate-sitemap.js  Sitemap généré depuis le code
    prerender.js         Pré-rendu des pages
    smoke-test.js        Vérification fonctionnelle du build
  src/
    components/site/     Sections du site
    components/ui/       Bibliothèque shadcn/ui (non modifiée)
    data/                Tout le contenu éditorial
    lib/
      icons.js           Icônes importées nommément (voir plus bas)
      hydration.js       Neutralise les animations pendant l'hydratation
    pages/               Home, ServicePage, Legal, NotFound, Admin
```

### Icônes

Utilisez toujours `import { Icons } from "@/lib/icons"`, jamais
`import * as Icons from "lucide-react"` : cette seconde forme empêche
l'élimination du code mort et fait entrer les 2,3 Mo de sources de la
bibliothèque entière dans le paquet livré au visiteur. Pour ajouter une icône,
déclarez-la dans `src/lib/icons.js`.
