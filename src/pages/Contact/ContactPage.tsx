import { useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import WhatsAppFloat from '../../components/ui/WhatsAppFloat';
import QuoteForm from '../Home/sections/QuoteForm';
import { FaqAccordion } from '../../components/seo/FaqAccordion';
import { useReveal } from '../../hooks/useReveal';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { useI18n } from '../../i18n';
import heroImage480 from '../../assets/contact-480.webp';
import heroImage800 from '../../assets/contact-800.webp';
import heroImage1200 from '../../assets/contact-1200.webp';

const SITE_ORIGIN = 'https://haramainprestige.com';

function ContactPage() {
  const heroRef = useReveal<HTMLDivElement>();
  const contactCardsRef = useReveal<HTMLDivElement>();
  const infoRef = useReveal<HTMLDivElement>();
  const discoverRef = useReveal<HTMLDivElement>();
  const faqRef = useReveal<HTMLDivElement>();
  const ctaRef = useReveal<HTMLDivElement>();

  const { t, locale, pathFor } = useI18n();
  const page = t.contactPage;
  const homeHref = pathFor('home');
  const contactHref = pathFor('contact');
  const hotelsHref = pathFor('hotels');
  const servicesHref = pathFor('services');
  const testimonialsHref = pathFor('testimonials');
  const quoteHref = '#devis';

  usePageMetadata({
    title: t.meta.contact.title,
    description: t.meta.contact.description,
    page: 'contact',
    locale,
  });

  useEffect(() => {
    const breadcrumbId = 'jsonld-breadcrumb-contact';
    const faqSchemaId = 'jsonld-faq-contact';
    document.getElementById(breadcrumbId)?.remove();
    document.getElementById(faqSchemaId)?.remove();

    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.id = breadcrumbId;
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify({
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
          name: locale === 'fr' ? 'Contact' : 'تواصل معنا',
          item: SITE_ORIGIN + contactHref,
        },
      ],
    });
    document.head.appendChild(breadcrumbScript);

    const faqScript = document.createElement('script');
    faqScript.id = faqSchemaId;
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faq.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
    document.head.appendChild(faqScript);

    return () => {
      document.getElementById(breadcrumbId)?.remove();
      document.getElementById(faqSchemaId)?.remove();
    };
  }, [locale, homeHref, contactHref, page.faq.items]);

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
              {locale === 'fr' ? 'Contact' : 'تواصل معنا'}
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
            paddingBottom: 'clamp(88px, 10vw, 112px)',
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
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  flexWrap: 'wrap',
                }}
              >
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
                <a
                  href="https://wa.me/33773157902"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 9,
                    padding: '12px 22px',
                    borderRadius: 12,
                    border: '1px solid rgba(245,239,230,0.22)',
                    background: 'rgba(20,17,14,0.35)',
                    color: '#F5EFE6',
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  {page.hero.ctaSecondary}
                </a>
              </div>
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
                src={heroImage1200}
                alt={page.hero.imageAlt}
                width={1200}
                height={900}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                srcSet={`${heroImage480} 480w, ${heroImage800} 800w, ${heroImage1200} 1200w`}
                sizes="(max-width: 760px) calc(100vw - 32px), 50vw"
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

        {/* Formulaire de demande — composant existant réutilisé sans modification.
            Le wrapper absorbe le margin-top: -48px interne du composant. */}
        <div style={{ marginTop: 48 }}>
          <QuoteForm />
        </div>

        {/* Section moyens de contact */}
        <section
          id="contact-coordonnees"
          className="container-pad"
          style={{
            maxWidth: 1280,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: 'clamp(56px, 8vw, 80px)',
            paddingBottom: 'clamp(48px, 7vw, 64px)',
            borderTop: '1px solid rgba(245,239,230,0.06)',
          }}
        >
          <div ref={contactCardsRef} className="reveal">
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
              {page.contactSection.eyebrow}
            </span>
            <h2
              style={{
                margin: '0 0 36px',
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 'clamp(24px, 3.5vw, 34px)',
                fontWeight: 600,
                lineHeight: 1.12,
                color: '#F5EFE6',
              }}
            >
              {page.contactSection.title}
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 20,
              }}
            >
              {/* Carte WhatsApp */}
              <div
                style={{
                  background: '#161310',
                  border: '1px solid rgba(245,239,230,0.08)',
                  borderRadius: 20,
                  padding: 'clamp(24px, 3vw, 32px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: 'rgba(37,211,102,0.12)',
                      border: '1px solid rgba(37,211,102,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
                        fill="#25D366"
                      />
                    </svg>
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 22,
                      fontWeight: 600,
                      color: '#F5EFE6',
                    }}
                  >
                    {page.contactSection.whatsapp.title}
                  </h3>
                </div>

                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: 'rgba(245,239,230,0.68)',
                  }}
                >
                  {page.contactSection.whatsapp.text}
                </p>

                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#F5EFE6',
                    letterSpacing: '0.2px',
                  }}
                  dir="ltr"
                >
                  {page.contactSection.whatsapp.phone}
                </div>

                <a
                  href="https://wa.me/33773157902"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginTop: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '11px 18px',
                    borderRadius: 10,
                    background: '#25D366',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 13.5,
                    alignSelf: 'flex-start',
                  }}
                >
                  {page.contactSection.whatsapp.ctaLabel}
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
                </a>
              </div>

              {/* Carte Email */}
              <div
                style={{
                  background: '#161310',
                  border: '1px solid rgba(245,239,230,0.08)',
                  borderRadius: 20,
                  padding: 'clamp(24px, 3vw, 32px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: 'rgba(230,200,120,0.1)',
                      border: '1px solid rgba(230,200,120,0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      style={{ color: '#E6C878' }}
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
                      <path d="M3.5 6.5 12 13l8.5-6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 22,
                      fontWeight: 600,
                      color: '#F5EFE6',
                    }}
                  >
                    {page.contactSection.email.title}
                  </h3>
                </div>

                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: 'rgba(245,239,230,0.68)',
                  }}
                >
                  {page.contactSection.email.text}
                </p>

                <div
                  style={{
                    fontSize: 14.5,
                    fontWeight: 700,
                    color: '#F5EFE6',
                    wordBreak: 'break-all',
                  }}
                  dir="ltr"
                >
                  {page.contactSection.email.address}
                </div>

                <a
                  href="mailto:contact@haramainprestige.com"
                  style={{
                    marginTop: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '11px 18px',
                    borderRadius: 10,
                    background: 'linear-gradient(135deg,#EBCE82,#C09A44)',
                    color: '#14110E',
                    fontWeight: 700,
                    fontSize: 13.5,
                    alignSelf: 'flex-start',
                  }}
                >
                  {page.contactSection.email.ctaLabel}
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
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section informations à préparer */}
        <section
          className="container-pad"
          style={{
            maxWidth: 1280,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: 'clamp(48px, 7vw, 72px)',
            paddingBottom: 'clamp(48px, 7vw, 72px)',
            borderTop: '1px solid rgba(245,239,230,0.06)',
          }}
        >
          <div ref={infoRef} className="reveal">
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
              {page.infoSection.eyebrow}
            </span>
            <h2
              style={{
                margin: '0 0 18px',
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 'clamp(24px, 3.5vw, 34px)',
                fontWeight: 600,
                lineHeight: 1.12,
                color: '#F5EFE6',
              }}
            >
              {page.infoSection.title}
            </h2>
            <p
              style={{
                margin: '0 0 24px',
                fontSize: 15.5,
                lineHeight: 1.7,
                color: 'rgba(245,239,230,0.72)',
                maxWidth: 700,
              }}
            >
              {page.infoSection.intro}
            </p>
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                maxWidth: 600,
              }}
            >
              {page.infoSection.items.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    fontSize: 15,
                    color: 'rgba(245,239,230,0.78)',
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#E6C878',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section découvrir — maillage interne */}
        <section
          className="container-pad"
          style={{
            maxWidth: 1280,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: 'clamp(48px, 7vw, 72px)',
            paddingBottom: 'clamp(48px, 7vw, 72px)',
            borderTop: '1px solid rgba(245,239,230,0.06)',
          }}
        >
          <div ref={discoverRef} className="reveal">
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
              {page.discoverSection.eyebrow}
            </span>
            <h2
              style={{
                margin: '0 0 18px',
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 'clamp(24px, 3.5vw, 34px)',
                fontWeight: 600,
                lineHeight: 1.12,
                color: '#F5EFE6',
              }}
            >
              {page.discoverSection.title}
            </h2>
            <p
              style={{
                margin: '0 0 28px',
                fontSize: 15.5,
                lineHeight: 1.7,
                color: 'rgba(245,239,230,0.72)',
                maxWidth: 700,
              }}
            >
              {page.discoverSection.paragraph}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href={hotelsHref}
                className="nav-link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '10px 18px',
                  borderRadius: 10,
                  border: '1px solid rgba(245,239,230,0.16)',
                  background: 'rgba(20,17,14,0.4)',
                  color: '#F5EFE6',
                  fontSize: 13.5,
                  fontWeight: 600,
                }}
              >
                {page.discoverSection.hotelsLink}
                <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href={servicesHref}
                className="nav-link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '10px 18px',
                  borderRadius: 10,
                  border: '1px solid rgba(245,239,230,0.16)',
                  background: 'rgba(20,17,14,0.4)',
                  color: '#F5EFE6',
                  fontSize: 13.5,
                  fontWeight: 600,
                }}
              >
                {page.discoverSection.servicesLink}
                <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href={testimonialsHref}
                className="nav-link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '10px 18px',
                  borderRadius: 10,
                  border: '1px solid rgba(245,239,230,0.16)',
                  background: 'rgba(20,17,14,0.4)',
                  color: '#F5EFE6',
                  fontSize: 13.5,
                  fontWeight: 600,
                }}
              >
                {page.discoverSection.testimonialsLink}
                <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          className="container-pad"
          style={{
            maxWidth: 1280,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: 'clamp(48px, 7vw, 72px)',
            paddingBottom: 'clamp(48px, 7vw, 72px)',
            borderTop: '1px solid rgba(245,239,230,0.06)',
          }}
        >
          <div ref={faqRef} className="reveal">
            <h2
              style={{
                margin: '0 0 8px',
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 'clamp(24px, 3.5vw, 34px)',
                fontWeight: 600,
                lineHeight: 1.12,
                color: '#F5EFE6',
              }}
            >
              {page.faq.title}
            </h2>
            <div style={{ marginTop: 24 }}>
              <FaqAccordion items={page.faq.items} />
            </div>
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
                    <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
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

export default ContactPage;
