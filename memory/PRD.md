# Relais IT — Corporate Website (PRD)

## Problem Statement
Professional corporate single-page website for "Relais IT", an IT services & technology
solutions company in Abidjan, Côte d'Ivoire. Slogan: "Trust it." Brand: trustworthy,
modern, structured. Colors: dark navy (#1B4C6B) + orange accent (#E8743B), white/light-grey
backgrounds. Font: Jost (Century Gothic alternative). French only content.

## User Choices
- Contact submissions: store in DB + simple admin view
- Single-page scroll with anchor nav
- French only
- Abstract CSS/SVG visuals (no stock/AI images)
- Email sending deferred

## Architecture
- Backend: FastAPI + MongoDB (motor). Routes under /api: contact (POST/GET/DELETE), status.
- Frontend: React SPA. Home (single-page sections) + /admin route. framer-motion, lucide-react, shadcn ui, Tailwind, sonner toasts.
- Content data centralized in src/data/content.js. Logo used as-is (provided JPEG).

## Implemented (2026-06-02)
- Header (sticky, smooth-scroll nav, mobile hamburger, CTA "Demander un devis")
- Hero (headline, subtext, dual CTAs, abstract SVG network visual, stat cards)
- Services (6 cards), Solutions (7 cards), Why Choose Us (6, navy section)
- Formations (callout + 5 programs), About, Contact (form -> /api/contact), Footer
- Admin page /admin: list, refresh, delete submissions
- Backend CRUD for contact submissions; 100% tests passing

## Backlog / Next
- P1: Add auth gate to /admin (shared-secret or login) before production
- P2: Email notification on new contact (Resend/SendGrid) when key provided
- P2: trim()/whitespace validation on form fields; tighten CORS for production
- P2: SEO meta tags, favicon, OpenGraph; multi-language toggle (FR/EN)
