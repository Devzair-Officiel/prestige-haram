import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import { I18nProvider } from './i18n';
// Sous-set latin pour le français (aucun caractère hors U+00xx).
import '@fontsource/cormorant-garamond/latin-600.css';
import '@fontsource/cormorant-garamond/latin-700.css';
import '@fontsource/cormorant-garamond/latin-600-italic.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/latin-600.css';
import '@fontsource/manrope/latin-700.css';
// Sous-set arabe (Noto Naskh Arabic) chargé pour la version /ar-sa/.
// Les subsets `arabic-*` déclarent le bon unicode-range, donc les
// navigateurs ne téléchargent la woff2 arabe que sur pages arabes.
import '@fontsource/noto-naskh-arabic/arabic-400.css';
import '@fontsource/noto-naskh-arabic/arabic-500.css';
import '@fontsource/noto-naskh-arabic/arabic-600.css';
import '@fontsource/noto-naskh-arabic/arabic-700.css';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
);
