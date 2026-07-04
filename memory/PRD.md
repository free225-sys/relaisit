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
- P2: Restrict CORS to production domain
- P2: Purge orphaned POST /api/contact logic if form permanently removed

## Admin Auth (added 2026-06)
- /admin protected by password-only login (ADMIN_PASSWORD + JWT_SECRET in backend/.env)
- POST /api/admin/login → JWT (12h); GET/DELETE /api/contact + GET /api/admin/me require Bearer token (401 otherwise)
- Frontend: login gate in Admin.jsx, token in sessionStorage, auto-logout on 401, logout button
- robots.txt: Disallow: /admin added
- Verified end-to-end (curl + browser: 401s, wrong/correct password, dashboard, logout)

## Notes for Agents
- Respond to user in English; all site content stays in French
- Site is polished/deployment-ready — no visual changes unless requested
