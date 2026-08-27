import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import WhatsAppFloat from '../../components/ui/WhatsAppFloat';
import { useReveal } from '../../hooks/useReveal';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { useI18n } from '../../i18n';
import type { EditorialBlock } from '../../i18n/types';

function BlockSection({ block }: { block: EditorialBlock }) {
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
        className="section-eyebrow"
        style={{
          fontSize: 11.5,
          letterSpacing: '3.6px',
          fontWeight: 700,
          color: '#E6C878',
        }}
      >
        {block.eyebrow}
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
        {block.title}
      </h2>

      {block.paragraphs?.map((p, i) => (
        <p
          key={i}
          style={{
            margin: '0 0 14px',
            fontSize: 15,
            lineHeight: 1.7,
            color: 'rgba(245,239,230,0.72)',
            maxWidth: 780,
          }}
        >
          {p}
        </p>
      ))}

      {block.bullets && (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '10px 0 0',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            maxWidth: 780,
          }}
        >
          {block.bullets.map((b) => (
            <li
              key={b}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                fontSize: 15,
                lineHeight: 1.55,
                color: 'rgba(245,239,230,0.82)',
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#E6C878',
                  marginTop: 9,
                }}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {block.rows && (
        <dl
          style={{
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'minmax(180px, 260px) 1fr',
            rowGap: 14,
            columnGap: 24,
            fontSize: 14.5,
            lineHeight: 1.6,
          }}
        >
          {block.rows.map((row) => (
            <div key={row.label} style={{ display: 'contents' }}>
              <dt
                style={{
                  color: 'rgba(245,239,230,0.55)',
                  fontWeight: 600,
                }}
              >
                {row.label}
              </dt>
              <dd style={{ margin: 0, color: '#F5EFE6' }}>{row.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

function PolitiqueConfidentialite() {
  const heroRef = useReveal<HTMLDivElement>();
  const { t, locale, pathFor } = useI18n();
  const homeHref = pathFor('home');
  const page = t.privacyPage;

  usePageMetadata({
    title: t.meta.privacy.title,
    description: t.meta.privacy.description,
    page: 'privacy',
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
            <span
              className="section-eyebrow"
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
                margin: '14px 0 18px',
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 600,
                lineHeight: 1.05,
                color: '#F5EFE6',
              }}
            >
              {page.title}
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 15.5,
                lineHeight: 1.7,
                color: 'rgba(245,239,230,0.7)',
                maxWidth: 720,
              }}
            >
              {page.intro}
            </p>
          </div>

          <div style={{ marginTop: 22 }}>
            {page.blocks.map((block) => (
              <BlockSection key={block.title} block={block} />
            ))}
          </div>

          <p
            style={{
              marginTop: 40,
              paddingTop: 24,
              borderTop: '1px solid rgba(245,239,230,0.08)',
              fontSize: 12.5,
              color: 'rgba(245,239,230,0.42)',
              textAlign: 'center',
            }}
          >
            {t.common.lastUpdated}
          </p>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default PolitiqueConfidentialite;
