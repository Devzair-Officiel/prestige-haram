import { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import WhatsAppFloat from '../../components/ui/WhatsAppFloat';
import { useReveal } from '../../hooks/useReveal';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { useI18n } from '../../i18n';
import { navigateTo } from '../../i18n/utils';
import heroImage from '../../assets/header-hotel-mekkah.webp';
import sheratonImage from '../../assets/sheraton_jabal_al_kaaba.webp';
import tilalImage from '../../assets/tilal_jabal_al_kaaba.webp';
import marriottImage from '../../assets/marriott_jabal_omar.webp';
import hiltonImage from '../../assets/hilton_suites_jabal_omar.webp';
import vocoImage from '../../assets/voco.webp';
import kiswahImage from '../../assets/kiswah_towers.webp';

const SITE_ORIGIN = 'https://haramainprestige.com';

const MAKKAH_IMAGES = [
  sheratonImage,
  tilalImage,
  marriottImage,
  hiltonImage,
  vocoImage,
  kiswahImage,
];

// ---------------------------------------------------------------------------
// Composants de section réutilisables
// ---------------------------------------------------------------------------

function SectionEyebrow({ text }: { text: string }) {
  return (
    <span
      className="section-eyebrow"
      style={{
        display: 'block',
        fontSize: 11.5,
        letterSpacing: '3.6px',
        fontWeight: 700,
        color: '#E6C878',
        marginBottom: 16,
      }}
    >
      {text}
    </span>
  );
}

function SectionH2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        margin: '0 0 28px',
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: 'clamp(26px, 4vw, 36px)',
        fontWeight: 600,
        lineHeight: 1.1,
        color: '#F5EFE6',
      }}
    >
      {children}
    </h2>
  );
}

function BodyParagraph({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <p
      style={{
        margin: '0 0 22px',
        fontSize: 15.5,
        lineHeight: 1.75,
        color: 'rgba(245,239,230,0.72)',
        maxWidth: 760,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

// ---------------------------------------------------------------------------
// Carte hôtel (version grille, sans carousel)
// ---------------------------------------------------------------------------

function HotelGridCard({
  name,
  description,
  image,
  ctaLabel,
  quoteHref,
}: {
  name: string;
  description: string;
  image?: string;
  ctaLabel: string;
  quoteHref: string;
}) {
  return (
    <a
      href={quoteHref}
      className="hotel-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        minHeight: 300,
        borderRadius: 18,
        border: '1px solid rgba(245,239,230,0.08)',
        color: 'inherit',
        textDecoration: 'none',
        isolation: 'isolate',
      }}
    >
      {image ? (
        <>
          <img
            src={image}
            alt={name}
            className="hotel-card-img"
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            draggable={false}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -2,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg,rgba(20,17,14,0.15) 0%,rgba(20,17,14,0.6) 55%,rgba(20,17,14,0.95) 100%)',
              zIndex: -1,
            }}
          />
        </>
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: -2,
            background:
              'radial-gradient(circle at 25% 20%, rgba(230,200,120,0.14) 0%, transparent 45%),' +
              'linear-gradient(135deg, #1E1913 0%, #14110E 100%)',
          }}
        />
      )}
      <div
        style={{
          padding: '22px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 21,
            fontWeight: 600,
            color: '#F5EFE6',
            lineHeight: 1.2,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 13,
            color: 'rgba(245,239,230,0.68)',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </div>
        <span
          className="hotel-card-pill"
          style={{
            marginTop: 14,
            alignSelf: 'flex-start',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            padding: '7px 13px',
            borderRadius: 999,
            border: '1px solid rgba(230,200,120,0.45)',
            color: '#E6C878',
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: '0.4px',
          }}
        >
          {ctaLabel}
          <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true">
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
      </div>
    </a>
  );
}

// ---------------------------------------------------------------------------
// FAQ accordéon accessible
// ---------------------------------------------------------------------------

function FaqAccordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const itemId = `faq-item-${i}`;
        const panelId = `faq-panel-${i}`;
        return (
          <div
            key={i}
            style={{
              borderTop: '1px solid rgba(245,239,230,0.08)',
            }}
          >
            <h3 style={{ margin: 0 }}>
              <button
                id={itemId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  padding: '24px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#F5EFE6',
                  fontSize: 15.5,
                  fontWeight: 600,
                  lineHeight: 1.4,
                  textAlign: 'left',
                  fontFamily: 'inherit',
                }}
              >
                <span>{item.question}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    transition: 'transform 0.2s ease',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    color: '#E6C878',
                  }}
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={itemId}
              hidden={!isOpen}
              style={{
                paddingBottom: isOpen ? 24 : 0,
                fontSize: 15,
                lineHeight: 1.7,
                color: 'rgba(245,239,230,0.68)',
                maxWidth: 760,
              }}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
      <div style={{ borderTop: '1px solid rgba(245,239,230,0.08)' }} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page principale
// ---------------------------------------------------------------------------

function HotelsMakkahPage() {
  const heroRef = useReveal<HTMLDivElement>();
  const hotelsRef = useReveal<HTMLDivElement>();
  const haramRef = useReveal<HTMLDivElement>();
  const choiceRef = useReveal<HTMLDivElement>();
  const kaabaRef = useReveal<HTMLDivElement>();
  const bookingRef = useReveal<HTMLDivElement>();
  const faqRef = useReveal<HTMLDivElement>();
  const ctaRef = useReveal<HTMLDivElement>();

  const { t, locale, pathFor } = useI18n();
  const page = t.hotelsMakkahPage;
  const homeHref = pathFor('home');
  const hotelsMakkahHref = pathFor('hotelsMakkah');
  const quoteHref = `${homeHref}#devis`;

  usePageMetadata({
    title: t.meta.hotelsMakkah.title,
    description: t.meta.hotelsMakkah.description,
    page: 'hotelsMakkah',
    locale,
  });

  // Injection JSON-LD : BreadcrumbList + FAQPage
  useEffect(() => {
    const breadcrumbId = 'jsonld-breadcrumb-hotels-makkah';
    const faqSchemaId = 'jsonld-faq-hotels-makkah';

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
          name: locale === 'fr' ? 'Hôtels à Makkah' : 'فنادق مكة المكرمة',
          item: SITE_ORIGIN + hotelsMakkahHref,
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
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
    document.head.appendChild(faqScript);

    return () => {
      document.getElementById(breadcrumbId)?.remove();
      document.getElementById(faqSchemaId)?.remove();
    };
  }, [locale, homeHref, hotelsMakkahHref, page.faq.items]);

  const handleInternalNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith('http') || href.startsWith('mailto:')) return;
    if (href.startsWith('#')) return;
    if (typeof window !== 'undefined') {
      const [path, hash] = href.split('#');
      if (path === window.location.pathname && hash) return;
    }
    e.preventDefault();
    navigateTo(href);
  };

  const makkahHotels = t.hotels.categories.makkah.hotels.map((h, i) => ({
    ...h,
    image: MAKKAH_IMAGES[i],
  }));

  return (
    <>
      <Header />
      <main>
        {/* ----------------------------------------------------------------
            Breadcrumb
        ---------------------------------------------------------------- */}
        <nav
          aria-label={locale === 'fr' ? 'Fil d\u2019Ariane' : 'مسار التنقل'}
          className="container-pad"
          style={{ maxWidth: 1280, marginLeft: 'auto', marginRight: 'auto', paddingTop: 20, paddingBottom: 0 }}
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
                onClick={(e) => handleInternalNav(e, homeHref)}
                className="nav-link"
                style={{ color: 'rgba(245,239,230,0.5)' }}
              >
                {locale === 'fr' ? 'Accueil' : 'الرئيسية'}
              </a>
            </li>
            <li aria-hidden="true" style={{ opacity: 0.35 }}>›</li>
            <li aria-current="page" style={{ color: '#E6C878' }}>
              {locale === 'fr' ? 'Hôtels à Makkah' : 'فنادق مكة المكرمة'}
            </li>
          </ol>
        </nav>

        {/* ----------------------------------------------------------------
            HERO
        ---------------------------------------------------------------- */}
        <section
          id="hero"
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
            {/* Texte */}
            <div>
              <a
                href={homeHref}
                onClick={(e) => handleInternalNav(e, homeHref)}
                className="nav-link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 13,
                  color: 'rgba(245,239,230,0.6)',
                  marginBottom: 22,
                }}
              >
                <svg
                  className="dir-arrow"
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path
                    d="M10 3L5 8l5 5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {page.backHome}
              </a>

              <SectionEyebrow text={page.hero.eyebrow} />

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
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 12,
                  maxWidth: 460,
                }}
              >
                <a
                  href={quoteHref}
                  onClick={(e) => handleInternalNav(e, quoteHref)}
                  className="btn-primary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 9,
                    padding: '14px 16px',
                    borderRadius: 12,
                    background: 'linear-gradient(135deg,#EBCE82,#C09A44)',
                    color: '#14110E',
                    fontWeight: 700,
                    fontSize: 14,
                    textAlign: 'center',
                  }}
                >
                  {page.hero.ctaPrimary}
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
                  href="#hotels-liste"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 9,
                    padding: '14px 16px',
                    borderRadius: 12,
                    border: '1px solid rgba(245,239,230,0.22)',
                    background: 'rgba(20,17,14,0.35)',
                    color: '#F5EFE6',
                    fontWeight: 600,
                    fontSize: 14,
                    textAlign: 'center',
                  }}
                >
                  {page.hero.ctaSecondary}
                </a>
              </div>
            </div>

            {/* Image */}
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

        {/* ----------------------------------------------------------------
            SECTION HÔTELS
        ---------------------------------------------------------------- */}
        <section
          id="hotels-liste"
          className="container-pad"
          style={{
            maxWidth: 1280,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: 'clamp(64px, 9vw, 96px)',
            paddingBottom: 'clamp(64px, 9vw, 96px)',
            borderTop: '1px solid rgba(245,239,230,0.06)',
          }}
        >
          <div ref={hotelsRef} className="reveal">
            <SectionH2>{page.hotelsSection.title}</SectionH2>
            <BodyParagraph style={{ marginBottom: 36 }}>
              {page.hotelsSection.intro}
            </BodyParagraph>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 28,
              }}
            >
              {makkahHotels.map((hotel) => (
                <HotelGridCard
                  key={hotel.name}
                  name={hotel.name}
                  description={hotel.description}
                  image={hotel.image}
                  ctaLabel={page.hotelsSection.ctaLabel}
                  quoteHref={quoteHref}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------
            SECTION PROXIMITÉ DU HARAM
        ---------------------------------------------------------------- */}
        <section
          className="container-pad"
          style={{
            maxWidth: 1280,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: 'clamp(64px, 9vw, 96px)',
            paddingBottom: 'clamp(64px, 9vw, 96px)',
            borderTop: '1px solid rgba(245,239,230,0.06)',
          }}
        >
          <div ref={haramRef} className="reveal">
            <SectionEyebrow text={page.haramSection.eyebrow} />
            <SectionH2>{page.haramSection.title}</SectionH2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'clamp(24px, 4vw, 48px)',
                alignItems: 'start',
              }}
            >
              <div>
                {page.haramSection.paragraphs.map((p, i) => (
                  <BodyParagraph key={i}>{p}</BodyParagraph>
                ))}
              </div>

              <div
                style={{
                  padding: 'clamp(24px, 3.5vw, 36px)',
                  borderRadius: 16,
                  background:
                    'linear-gradient(135deg, rgba(230,200,120,0.06), rgba(192,154,68,0.03))',
                  border: '1px solid rgba(230,200,120,0.14)',
                }}
              >
                <p
                  style={{
                    margin: '0 0 20px',
                    fontSize: 12,
                    letterSpacing: '2.5px',
                    fontWeight: 700,
                    color: '#E6C878',
                  }}
                >
                  {locale === 'fr' ? 'NOS CRITÈRES DE SÉLECTION' : 'معايير الاختيار'}
                </p>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 18,
                  }}
                >
                  {page.haramSection.criteria.map((criterion, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        fontSize: 14.5,
                        color: 'rgba(245,239,230,0.72)',
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{
                          marginTop: 4,
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: '#E6C878',
                          flexShrink: 0,
                        }}
                        aria-hidden="true"
                      />
                      {criterion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------
            SECTION AIDE AU CHOIX
        ---------------------------------------------------------------- */}
        <section
          className="container-pad"
          style={{
            maxWidth: 1280,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: 'clamp(64px, 9vw, 96px)',
            paddingBottom: 'clamp(64px, 9vw, 96px)',
            borderTop: '1px solid rgba(245,239,230,0.06)',
          }}
        >
          <div ref={choiceRef} className="reveal">
            <SectionEyebrow text={page.choiceSection.eyebrow} />
            <SectionH2>{page.choiceSection.title}</SectionH2>
            {page.choiceSection.paragraphs.map((p, i) => (
              <BodyParagraph key={i}>{p}</BodyParagraph>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------------------
            SECTION VUE KAABA
        ---------------------------------------------------------------- */}
        <section
          className="container-pad"
          style={{
            maxWidth: 1280,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: 'clamp(64px, 9vw, 96px)',
            paddingBottom: 'clamp(64px, 9vw, 96px)',
            borderTop: '1px solid rgba(245,239,230,0.06)',
          }}
        >
          <div ref={kaabaRef} className="reveal">
            <SectionEyebrow text={page.kaabaSection.eyebrow} />
            <SectionH2>{page.kaabaSection.title}</SectionH2>
            {page.kaabaSection.paragraphs.map((p, i) => (
              <BodyParagraph key={i}>{p}</BodyParagraph>
            ))}
            {/* Maillage interne préparé : lorsque /chambre-vue-kaaba existera,
                remplacer le texte par un <a href={pathFor('chambreVueKaaba')}> */}
            <p
              style={{
                marginTop: 8,
                fontSize: 13.5,
                color: 'rgba(245,239,230,0.45)',
                fontStyle: 'italic',
              }}
            >
              {locale === 'fr'
                ? 'Une page dédiée aux chambres avec vue Kaaba sera bientôt disponible.'
                : 'ستتوفر قريبًا صفحة خاصة بغرف الإطلالة على الكعبة المشرفة.'}
            </p>
          </div>
        </section>

        {/* ----------------------------------------------------------------
            SECTION PROCESSUS DE RÉSERVATION
        ---------------------------------------------------------------- */}
        <section
          className="container-pad"
          style={{
            maxWidth: 1280,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: 'clamp(64px, 9vw, 96px)',
            paddingBottom: 'clamp(64px, 9vw, 96px)',
            borderTop: '1px solid rgba(245,239,230,0.06)',
          }}
        >
          <div ref={bookingRef} className="reveal">
            <SectionEyebrow text={page.bookingSection.eyebrow} />
            <SectionH2>{page.bookingSection.title}</SectionH2>

            {page.bookingSection.paragraphs.map((p, i) => (
              <BodyParagraph key={i}>{p}</BodyParagraph>
            ))}

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 28,
                marginTop: 40,
              }}
            >
              {page.bookingSection.steps.map((step, i) => (
                <div
                  key={i}
                  style={{
                    padding: 'clamp(22px, 3vw, 32px)',
                    borderRadius: 16,
                    border: '1px solid rgba(245,239,230,0.08)',
                    background: 'rgba(20,17,14,0.4)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 36,
                      fontWeight: 600,
                      color: 'rgba(230,200,120,0.3)',
                      lineHeight: 1,
                      marginBottom: 18,
                    }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 15,
                      fontWeight: 600,
                      lineHeight: 1.5,
                      color: '#F5EFE6',
                    }}
                  >
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------
            SECTION FAQ
        ---------------------------------------------------------------- */}
        <section
          className="container-pad"
          style={{
            maxWidth: 1280,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: 'clamp(64px, 9vw, 96px)',
            paddingBottom: 'clamp(64px, 9vw, 96px)',
            borderTop: '1px solid rgba(245,239,230,0.06)',
          }}
        >
          <div ref={faqRef} className="reveal">
            <SectionH2>{page.faq.title}</SectionH2>
            <FaqAccordion items={page.faq.items} />
          </div>
        </section>

        {/* ----------------------------------------------------------------
            CTA FINAL
        ---------------------------------------------------------------- */}
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
            <SectionEyebrow text={page.ctaBlock.eyebrow} />
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
                onClick={(e) => handleInternalNav(e, quoteHref)}
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

export default HotelsMakkahPage;
