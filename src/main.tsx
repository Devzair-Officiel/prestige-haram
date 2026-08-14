import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
// Sous-set latin uniquement (contenu 100% français, aucun caractère hors
// U+00xx). Chaque fichier ne déclare qu'un seul @font-face sans
// unicode-range → CSS bundle réduit, un seul woff2 par graisse chargé.
import '@fontsource/cormorant-garamond/latin-600.css';
import '@fontsource/cormorant-garamond/latin-700.css';
import '@fontsource/cormorant-garamond/latin-600-italic.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/latin-600.css';
import '@fontsource/manrope/latin-700.css';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
