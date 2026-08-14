import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import WhatsAppFloat from '../../components/ui/WhatsAppFloat';
import { usePageMetadata } from '../../hooks/usePageMetadata';

function NotFound() {
  usePageMetadata({
    title: 'Page introuvable — Haramain Prestige',
    description: "La page que vous cherchez n'existe pas ou a été déplacée.",
    path: '/404',
    noindex: true,
  });

  return (
    <>
      <Header />
      <main className="notfound">
        <div className="notfound__inner">
          <p className="notfound__eyebrow">ERREUR 404</p>
          <h1 className="notfound__title">Page introuvable</h1>
          <p className="notfound__text">
            La page que vous cherchez n'existe pas ou a été déplacée.
          </p>
          <a href="/" className="notfound__cta">
            Retour à l'accueil
          </a>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default NotFound;
