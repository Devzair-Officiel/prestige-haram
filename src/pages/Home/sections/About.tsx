import { useReveal } from '../../../hooks/useReveal';
import { useI18n } from '../../../i18n';
import aboutImage from '../../../assets/about_prestige.webp';

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function About() {
  const revealRef = useReveal<HTMLDivElement>();
  const { t } = useI18n();

  // On isole le paragraphe accentué (italique) parmi les paragraphs :
  // les traductions garantissent qu'`accent` correspond exactement à
  // l'un des paragraphes fournis, ce qui laisse la mise en forme
  // (italique + non-italique) locale-agnostique.
  const paragraphs = t.about.paragraphs;

  return (
    <section
      id="apropos"
      className="section-pad-y"
      style={{
        color: '#F5EFE6',
      }}
    >
      <div
        ref={revealRef}
        className="reveal about-grid container-pad"
        style={{
          maxWidth: 1240,
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <span
            className="section-eyebrow"
            style={{
              fontSize: 12,
              letterSpacing: '3.6px',
              fontWeight: 700,
              color: '#E6C878',
            }}
          >
            {t.about.eyebrow}
          </span>
          <h2
            className="about-title"
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 600,
              lineHeight: 1.08,
              color: '#F8F2E8',
            }}
          >
            {t.about.title}
          </h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              maxWidth: 520,
            }}
          >
            {paragraphs.map((paragraph) => {
              const isAccent = paragraph === t.about.accent;
              return (
                <p
                  key={paragraph}
                  style={{
                    margin: 0,
                    fontSize: 16,
                    lineHeight: 1.7,
                    color: isAccent ? '#F5EFE6' : 'rgba(245,239,230,0.72)',
                    fontStyle: isAccent ? 'italic' : 'normal',
                  }}
                >
                  {paragraph}
                </p>
              );
            })}
            <p
              style={{
                margin: 0,
                fontSize: 16,
                lineHeight: 1.7,
                color: 'rgba(245,239,230,0.82)',
              }}
            >
              <span style={{ color: '#E6C878', fontWeight: 600 }}>
                {t.about.ambitionLead}
              </span>
              {t.about.ambitionTail}
            </p>
          </div>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '8px 0 0',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            {t.about.bullets.map((bullet) => (
              <li
                key={bullet}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  fontSize: 15,
                  color: 'rgba(245,239,230,0.82)',
                  lineHeight: 1.55,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: 'rgba(201,162,75,0.15)',
                    color: '#E6C878',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 1,
                  }}
                >
                  <CheckIcon />
                </span>
                <span dangerouslySetInnerHTML={{ __html: bullet }} />
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            position: 'relative',
            aspectRatio: '4 / 5',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            border: '1px solid rgba(245,239,230,0.08)',
          }}
        >
          <img
            src={aboutImage}
            alt={t.about.imageAlt}
            width={1000}
            height={750}
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
      </div>
    </section>
  );
}

export default About;
