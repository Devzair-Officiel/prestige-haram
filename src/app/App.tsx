import { useEffect, useState } from 'react';
import HomePage from '../pages/Home/HomePage';
import AboutPage from '../pages/About/AboutPage';
import HotelsMakkahPage from '../pages/HotelsMakkah/HotelsMakkahPage';
import HotelsMadinahPage from '../pages/HotelsMadinah/HotelsMadinahPage';
import ChambreVueKaabaPage from '../pages/ChambreVueKaaba/ChambreVueKaabaPage';
import TransfertJeddahMakkahPage from '../pages/TransfertJeddahMakkah/TransfertJeddahMakkahPage';
import TransfertAeroportMadinahPage from '../pages/TransfertAeroportMadinah/TransfertAeroportMadinahPage';
import ChauffeurPriveMakkahMadinahPage from '../pages/ChauffeurPriveMakkahMadinah/ChauffeurPriveMakkahMadinahPage';
import VisitesMadinahPage from '../pages/VisitesMadinah/VisitesMadinahPage';
import VisitesMakkahPage from '../pages/VisitesMakkah/VisitesMakkahPage';
import ServicesPage from '../pages/Services/ServicesPage';
import MentionsLegales from '../pages/Legal/MentionsLegales';
import PolitiqueConfidentialite from '../pages/Legal/PolitiqueConfidentialite';
import NotFound from '../pages/NotFound/NotFound';
import { detectRoute } from '../i18n/routes';
import { scrollToHash } from '../i18n/utils';

function App() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const sync = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', sync);
    window.addEventListener('haramain:navigate', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('haramain:navigate', sync);
    };
  }, []);

  // After each navigation (pathname change), scroll to hash element or top.
  // requestAnimationFrame ensures the new page has rendered before scrolling.
  useEffect(() => {
    const frame = requestAnimationFrame(scrollToHash);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  const { page } = detectRoute(pathname);

  if (page === 'home') return <HomePage />;
  if (page === 'about') return <AboutPage />;
  if (page === 'hotelsMakkah') return <HotelsMakkahPage />;
  if (page === 'hotelsMadinah') return <HotelsMadinahPage />;
  if (page === 'chambreVueKaaba') return <ChambreVueKaabaPage />;
  if (page === 'transfertJeddahMakkah') return <TransfertJeddahMakkahPage />;
  if (page === 'transfertAeroportMadinah') return <TransfertAeroportMadinahPage />;
  if (page === 'chauffeurPriveMakkahMadinah') return <ChauffeurPriveMakkahMadinahPage />;
  if (page === 'visitesMadinah') return <VisitesMadinahPage />;
  if (page === 'visitesMakkah') return <VisitesMakkahPage />;
  if (page === 'services') return <ServicesPage />;
  if (page === 'legal') return <MentionsLegales />;
  if (page === 'privacy') return <PolitiqueConfidentialite />;
  return <NotFound />;
}

export default App;
