import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import WhatsAppFloat from '../../components/ui/WhatsAppFloat';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { useI18n } from '../../i18n';

function NotFound() {
  const { t, locale, pathFor } = useI18n();

  usePageMetadata({
    title: t.meta.notFound.title,
    description: t.meta.notFound.description,
    page: null,
    locale,
    noindex: true,
  });

  return (
    <>
      <Header />
      <main className="notfound">
        <div className="notfound__inner">
          <p className="notfound__eyebrow">{t.notFound.eyebrow}</p>
          <h1 className="notfound__title">{t.notFound.title}</h1>
          <p className="notfound__text">{t.notFound.text}</p>
          <a href={pathFor('home')} className="notfound__cta">
            {t.notFound.cta}
          </a>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default NotFound;
