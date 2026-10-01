import { useEffect, useState } from 'react';
import HomePage from '../pages/Home/HomePage';
import AboutPage from '../pages/About/AboutPage';
import HotelsMakkahPage from '../pages/HotelsMakkah/HotelsMakkahPage';
import MentionsLegales from '../pages/Legal/MentionsLegales';
import PolitiqueConfidentialite from '../pages/Legal/PolitiqueConfidentialite';
import NotFound from '../pages/NotFound/NotFound';
import { detectRoute } from '../i18n/routes';

function App() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const sync = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', sync);
    // Événement émis par navigateTo() du provider i18n après pushState.
    window.addEventListener('haramain:navigate', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('haramain:navigate', sync);
    };
  }, []);

  const { page } = detectRoute(pathname);

  if (page === 'home') return <HomePage />;
  if (page === 'about') return <AboutPage />;
  if (page === 'hotelsMakkah') return <HotelsMakkahPage />;
  if (page === 'legal') return <MentionsLegales />;
  if (page === 'privacy') return <PolitiqueConfidentialite />;
  return <NotFound />;
}

export default App;
