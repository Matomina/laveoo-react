import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Les pages sont pré-rendues en HTML statique (scripts/prerender.mjs) pour le
// SEO et le premier affichage. hydrateRoot réutilise ce HTML existant au lieu
// de le remplacer : createRoot le viderait et le reconstruirait entièrement
// une fois le JS chargé, provoquant un flash de contenu vide (gros CLS).
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}
