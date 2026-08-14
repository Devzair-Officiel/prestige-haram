import { useEffect, useState } from 'react';
import HomePage from '../pages/Home/HomePage';
import MentionsLegales from '../pages/Legal/MentionsLegales';
import PolitiqueConfidentialite from '../pages/Legal/PolitiqueConfidentialite';
import NotFound from '../pages/NotFound/NotFound';

function App() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  if (pathname === '/') return <HomePage />;
  if (pathname === '/mentions-legales') return <MentionsLegales />;
  if (pathname === '/politique-de-confidentialite')
    return <PolitiqueConfidentialite />;
  return <NotFound />;
}

export default App;
