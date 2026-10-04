import { useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import WhatsAppFloat from '../../components/ui/WhatsAppFloat';
import TestimonialsGrid from '../../components/testimonials/TestimonialsGrid';
import { useReveal } from '../../hooks/useReveal';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { useI18n } from '../../i18n';
import heroImage from '../../assets/temoignage.webp';

const SITE_ORIGIN = 'https://haramainprestige.com';

function TestimonialsPage() {
  const heroRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();
  const ctaRef = useReveal<HTMLDivElement>();
  const { t, locale, pathFor } = useI18n();
  const page = t.testimonialsPage;
  const homeHref = pathFor('home');
  const testimonialsHref = pathFor('testimonials');
  const quoteHref = `${homeHref}#devis`;

  usePageMetadata({
    title: t.meta.testimonials.title,
    description: t.meta.testimonials.description,
    page: 'testimonials',
    locale,
  });

  useEffect(() => {
    const scriptId = 'jsonld-breadcrumb-testimonials';
    document.getElementById(scriptId)?.remove();

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: locale === 'fr' ? 'Accueil' : 'الرئيسية',
          item: SITE_ORIGIN + homeHref,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: locale === 'fr' ? 'Témoignages' : 'شهادات',
          item: SITE_ORIGIN + testimonialsHref,
        },
      ],
    });
    document.head.appendChild(script);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [locale, homeHref, testimonialsHref]);

  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb */}
        <nav
          aria-label={locale === 'fr' ? 'Fil d\u2019Ariane' : 'مسار التنقل'}
          className="container-pad"
          style={{
            maxWidth: 1280,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: 20,
            paddingBottom: 0,
          }}
        >
          <ol
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '4px 8px',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              fontSize: 13,
              color: 'rgba(245,239,230,0.5)',
            }}
          >
            <li>
              <a
                href={homeHref}
                className="nav-link"
                style={{ color: 'rgba(245,239,230,0.5)' }}
              >
                {locale === 'fr' ? 'Accueil' : 'الرئيسية'}
              </a>
            </li>
            <li aria-hidden="true" style={{ opacity: 0.35 }}>›</li>
            <li aria-current="page" style={{ color: '#E6C878' }}>
              {locale === 'fr' ? 'Témoignages' : 'شهادات'}
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <section
          className="container-pad"
          style={{
            maxWidth: 1280,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: 'clamp(40px, 6vw, 64px)',
            paddingBottom: 'clamp(64px, 9vw, 96px)',
          }}
        >
          <div
            ref={heroRef}
            className="reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(32px, 5vw, 64px)',
              alignItems: 'center',
            }}
          >
            <div>
              <span
                className="section-eyebrow"
                style={{
                  display: 'block',
                  fontSize: 12,
                  letterSpacing: '3.6px',
                  fontWeight: 700,
                  color: '#E6C878',
                  marginBottom: 16,
                }}
              >
                {page.hero.eyebrow}
              </span>
              <h1
                className="section-title"
                style={{
                  margin: '0 0 26px',
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  lineHeight: 1.05,
                  color: '#F5EFE6',
                }}
              >
                {page.hero.title}
              </h1>
              <p
                style={{
                  margin: '0 0 30px',
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: 'rgba(245,239,230,0.72)',
                  maxWidth: 560,
                }}
              >
                {page.hero.intro}
              </p>
              <a
                href={quoteHref}
                className="btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 22px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg,#EBCE82,#C09A44)',
                  color: '#14110E',
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                {page.hero.ctaPrimary}
                <span className="btn-arrow">
                  <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      d="M3 8h9M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </div>

            <div
              style={{
                position: 'relative',
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                border: '1px solid rgba(245,239,230,0.08)',
                aspectRatio: '4 / 3',
              }}
            >
              <img
                src={heroImage}
                alt={page.hero.imageAlt}
                width={1200}
                height={900}
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </section>

        {/* Intro section */}
        <section
          className="container-pad"
          style={{
            maxWidth: 1280,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: 'clamp(40px, 5vw, 56px)',
            paddingBottom: 'clamp(40px, 5vw, 56px)',
            borderTop: '1px solid rgba(245,239,230,0.06)',
          }}
        >
          <span
            className="section-eyebrow"
            style={{
              display: 'block',
              fontSize: 12,
              letterSpacing: '3.6px',
              fontWeight: 700,
              color: '#E6C878',
              marginBottom: 14,
            }}
          >
            {page.introSection.eyebrow}
          </span>
          <h2
            style={{
              margin: '0 0 22px',
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 'clamp(24px, 3.5vw, 34px)',
              fontWeight: 600,
              lineHeight: 1.12,
              color: '#F5EFE6',
            }}
          >
            {page.introSection.title}
          </h2>
          {page.introSection.paragraphs.map((p, i) => (
            <p
              key={i}
              style={{
                margin: '0 0 14px',
                fontSize: 15.5,
                lineHeight: 1.7,
                color: 'rgba(245,239,230,0.72)',
                maxWidth: 780,
              }}
            >
              {p}
            </p>
          ))}
        </section>

        {/* Testimonials grid */}
        <section
          id="temoignages-liste"
          className="container-pad"
          style={{
            maxWidth: 1280,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: 'clamp(40px, 5vw, 56px)',
            paddingBottom: 'clamp(48px, 7vw, 72px)',
          }}
        >
          <div ref={gridRef} className="reveal">
            <TestimonialsGrid items={t.testimonials.items} />
          </div>
        </section>

        {/* CTA final */}
        <section
          className="container-pad"
          style={{
            maxWidth: 1280,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: 'clamp(56px, 8vw, 80px)',
            paddingBottom: 'clamp(72px, 10vw, 112px)',
            borderTop: '1px solid rgba(245,239,230,0.06)',
          }}
        >
          <div
            ref={ctaRef}
            className="reveal"
            style={{
              padding: 'clamp(32px, 5vw, 52px)',
              borderRadius: 20,
              background:
                'linear-gradient(135deg, rgba(230,200,120,0.09), rgba(192,154,68,0.04))',
              border: '1px solid rgba(230,200,120,0.18)',
              textAlign: 'center',
            }}
          >
            <span
              className="section-eyebrow"
              style={{
                display: 'block',
                fontSize: 12,
                letterSpacing: '3.6px',
                fontWeight: 700,
                color: '#E6C878',
                marginBottom: 14,
              }}
            >
              {page.ctaBlock.eyebrow}
            </span>
            <h2
              style={{
                margin: '0 0 20px',
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 'clamp(24px, 3.5vw, 34px)',
                fontWeight: 600,
                lineHeight: 1.12,
                color: '#F5EFE6',
              }}
            >
              {page.ctaBlock.title}
            </h2>
            <p
              style={{
                margin: '0 auto 28px',
                fontSize: 15.5,
                lineHeight: 1.7,
                color: 'rgba(245,239,230,0.68)',
                maxWidth: 580,
              }}
            >
              {page.ctaBlock.paragraph}
            </p>
            <div
              style={{
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <a
                href={quoteHref}
                className="btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '14px 24px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg,#EBCE82,#C09A44)',
                  color: '#14110E',
                  fontWeight: 700,
                  fontSize: 14.5,
                }}
              >
                {page.ctaBlock.ctaPrimary}
                <span className="btn-arrow">
                  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      d="M3 8h9M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
              <a
                href="https://wa.me/33773157902"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '14px 24px',
                  borderRadius: 12,
                  border: '1px solid rgba(245,239,230,0.28)',
                  background: 'rgba(20,17,14,0.35)',
                  color: '#F5EFE6',
                  fontWeight: 600,
                  fontSize: 14.5,
                }}
              >
                {page.ctaBlock.ctaSecondary}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default TestimonialsPage;
