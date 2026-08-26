import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import WhatsAppFloat from '../../components/ui/WhatsAppFloat';
import { useReveal } from '../../hooks/useReveal';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { useI18n } from '../../i18n';
import type { EditorialBlock } from '../../i18n/types';
import aboutImage from '../../assets/about_prestige.webp';

function SectionBlock({ section }: { section: EditorialBlock }) {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <div
      ref={revealRef}
      className="reveal"
      style={{
        borderTop: '1px solid rgba(245,239,230,0.08)',
        padding: '38px 0',
      }}
    >
      <span
        style={{
          fontSize: 11.5,
          letterSpacing: '3.6px',
          fontWeight: 700,
          color: '#E6C878',
        }}
      >
        {section.eyebrow}
      </span>
      <h2
        style={{
          margin: '10px 0 22px',
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 32,
          fontWeight: 600,
          lineHeight: 1.15,
          color: '#F5EFE6',
        }}
      >
        {section.title}
      </h2>
      {section.paragraphs?.map((p, i) => (
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
    </div>
  );
}

function AboutPage() {
  const heroRef = useReveal<HTMLDivElement>();
  const ctaRef = useReveal<HTMLDivElement>();
  const { t, locale, pathFor } = useI18n();
  const homeHref = pathFor('home');
  const page = t.aboutPage;

  usePageMetadata({
    title: t.meta.about.title,
    description: t.meta.about.description,
    page: 'about',
    locale,
  });

  return (
    <>
      <Header />
      <main>
        <section
          className="container-pad section-pad-y"
          style={{
            maxWidth: 960,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <div ref={heroRef} className="reveal" style={{ marginBottom: 12 }}>
            <a
              href={homeHref}
              className="nav-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                color: 'rgba(245,239,230,0.6)',
                marginBottom: 26,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16">
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
            <span
              style={{
                display: 'block',
                fontSize: 12,
                letterSpacing: '3.6px',
                fontWeight: 700,
                color: '#E6C878',
              }}
            >
              {page.eyebrow}
            </span>
            <h1
              className="section-title"
              style={{
                margin: '14px 0 22px',
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 600,
                lineHeight: 1.05,
                color: '#F5EFE6',
              }}
            >
              {page.title}
            </h1>
            {page.intro.map((paragraph, i) => (
              <p
                key={i}
                style={{
                  margin: i === page.intro.length - 1 ? 0 : '0 0 14px',
                  fontSize: 16,
                  lineHeight: 1.7,
                  color:
                    i === 0
                      ? 'rgba(245,239,230,0.78)'
                      : 'rgba(245,239,230,0.72)',
                  maxWidth: 780,
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div
            style={{
              margin: '32px 0 8px',
              position: 'relative',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
              border: '1px solid rgba(245,239,230,0.08)',
              aspectRatio: '16 / 9',
            }}
          >
            <img
              src={aboutImage}
              alt={page.imageAlt}
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          <div style={{ marginTop: 22 }}>
            {page.sections.map((section) => (
              <SectionBlock key={section.title} section={section} />
            ))}
          </div>

          <div
            ref={ctaRef}
            className="reveal"
            style={{
              marginTop: 48,
              padding: 'clamp(28px, 5vw, 44px)',
              borderRadius: 20,
              background:
                'linear-gradient(135deg, rgba(230,200,120,0.08), rgba(192,154,68,0.04))',
              border: '1px solid rgba(230,200,120,0.18)',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                display: 'block',
                fontSize: 12,
                letterSpacing: '3.6px',
                fontWeight: 700,
                color: '#E6C878',
                marginBottom: 12,
              }}
            >
              {page.ctaBlock.eyebrow}
            </span>
            <h2
              style={{
                margin: '0 0 14px',
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 30,
                fontWeight: 600,
                lineHeight: 1.15,
                color: '#F5EFE6',
              }}
            >
              {page.ctaBlock.title}
            </h2>
            <p
              style={{
                margin: '0 auto 24px',
                fontSize: 15.5,
                lineHeight: 1.7,
                color: 'rgba(245,239,230,0.72)',
                maxWidth: 620,
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
                href={`${homeHref}#devis`}
                className="btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
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
                  <svg width="14" height="14" viewBox="0 0 16 16">
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
                  justifyContent: 'center',
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

export default AboutPage;
