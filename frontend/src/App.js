import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import ServicePage from "@/pages/ServicePage";
import NotFound from "@/pages/NotFound";
import { MentionsLegales, Confidentialite } from "@/pages/Legal";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { endHydration } from "@/lib/hydration";

// L'espace d'administration n'intéresse qu'une personne : il est chargé à la
// demande plutôt qu'inclus dans le paquet servi à tous les visiteurs
// (il embarque axios, à lui seul une centaine de kilo-octets de sources).
const Admin = lazy(() => import("@/pages/Admin"));

function App() {
  // Le premier rendu reprend le HTML pré-rendu tel quel (sans animation
  // d'apparition) pour qu'il concorde exactement. Les animations reprennent
  // ensuite, pour toute la navigation.
  useEffect(endHydration, []);

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Les chemins fixes sont prioritaires sur la route dynamique ci-dessous. */}
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          {/* La limite Suspense n'entoure que l'admin : React attend des
                marqueurs spécifiques dans le HTML pré-rendu pour hydrater une
                limite Suspense, et un instantané du DOM n'en contient pas. */}
          <Route
            path="/admin"
            element={
              <Suspense fallback={null}>
                <Admin />
              </Suspense>
            }
          />

          {/* Pages services SEO : /support-informatique-abidjan, etc.
                Un slug inconnu affiche désormais une vraie page 404 en `noindex`,
                au lieu d'une redirection silencieuse vers l'accueil (« soft 404 »). */}
          <Route path="/:slug" element={<ServicePage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
