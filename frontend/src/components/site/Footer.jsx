import { Link, useLocation, useNavigate } from "react-router-dom";
import { CONTACT, LOGO_URL } from "@/data/content";

/**
 * Pied de page minimal : logo, liens essentiels, coordonnées, copyright.
 *
 * Les liens vers les pages services n'y figurent plus : ils restent
 * atteignables depuis le menu, les cartes de la section Services et la colonne
 * latérale de chaque page service.
 */
export const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const hrefFor = (hash) => (isHome ? hash : `/${hash}`);

  const handleClick = (hash) => (event) => {
    if (isHome) return; // défilement natif
    event.preventDefault();
    navigate(`/${hash}`);
  };

  const linkClass = "text-slate-300 transition-colors hover:text-white";

  const links = [
    { label: "Services", hash: "#services" },
    { label: "Formations", hash: "#formations" },
    { label: "À propos", hash: "#apropos" },
    { label: "Contact", hash: "#contact" },
  ];

  return (
    <footer data-testid="site-footer" className="bg-navy-deep text-slate-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="inline-flex w-fit rounded-lg bg-white px-3 py-2">
            <img
              src={LOGO_URL}
              alt="Relais IT — Trust it."
              width="112"
              height="38"
              className="h-6 w-auto object-contain"
            />
          </div>

          <nav aria-label="Liens du pied de page">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              {links.map((l) => (
                <li key={l.hash}>
                  <a
                    href={hrefFor(l.hash)}
                    onClick={handleClick(l.hash)}
                    data-testid={`footer-nav-${l.hash.replace("#", "")}`}
                    className={linkClass}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <Link to="/mentions-legales" className={linkClass}>
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/confidentialite" className={linkClass}>
                  Confidentialité
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Relais IT. Tous droits réservés.</p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <a href={CONTACT.tel} className="hover:text-white transition-colors">
              {CONTACT.phone}
            </a>
            <span aria-hidden="true" className="text-slate-600">
              ·
            </span>
            <a href={CONTACT.mailto} className="hover:text-white transition-colors">
              {CONTACT.email}
            </a>
            <span aria-hidden="true" className="text-slate-600">
              ·
            </span>
            <span>{CONTACT.location}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
