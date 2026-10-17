import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

// react-query était initialisé ici sans qu'aucun composant ne l'utilise :
// ~80 ko de sources embarqués pour rien. À réintroduire le jour où le site
// consommera réellement des données distantes.

const container = document.getElementById("root");

// `hydrateRoot` lorsque la page a été pré-rendue au build (react-snap),
// `createRoot` en développement. Sans cela, React jette le HTML pré-rendu et
// on perd le bénéfice du pré-rendu.
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}
