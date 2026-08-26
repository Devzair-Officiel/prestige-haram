import { useReveal } from '../../../hooks/useReveal';
import { useI18n } from '../../../i18n';
import heroImage from '../../../assets/header-hotel-mekkah.webp';

const trustIcons = [
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="11" r="2.3" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.3" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>,
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3l2.3 4.7 5.2.8-3.7 3.6.9 5.1L12 15l-4.6 2.4.9-5.1L4.5 8.5l5.2-.8L12 3z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>,
];

function Hero() {
  const zoomRef = useReveal<HTMLDivElement>();
  const { t, pathFor } = useI18n();
  const homeHref = pathFor('home');

  const trustItems = t.hero.trust.map((entry, index) => ({
    icon: trustIcons[index],
    label: entry.label,
  }));

  return (
    <section
      style={{
        position: 'relative',
        minHeight: 'clamp(560px, 90vh, 720px)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        ref={zoomRef}
        className="hzoom"
        style={{ position: 'absolute', inset: 0 }}
      >
        <img
          src={heroImage}
          alt={t.hero.imageAlt}
          width={1600}
          height={901}
          fetchPriority="high"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
      <div
        className="hero-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(100deg,rgba(20,17,14,0.96) 0%,rgba(20,17,14,0.82) 36%,rgba(20,17,14,0.28) 64%,rgba(20,17,14,0.12) 100%)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="hero-pad"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1240,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            maxWidth: 720,
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
          }}
        >
          <span
            style={{
              fontSize: 12,
              letterSpacing: '3.6px',
              fontWeight: 700,
              color: '#E6C878',
            }}
          >
            {t.hero.eyebrow}
          </span>
          <h1
            className="hero-title"
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 600,
              lineHeight: 1.02,
              color: '#F8F2E8',
              textWrap: 'pretty',
            }}
          >
            {/* Nom de marque en surtitre du H1 : renforce l'association
                Haramain Prestige ↔ Makkah/Madinah sans casser le layout
                typographique existant. Non traduit (identité de marque). */}
            <span className="hero-title-brand">Haramain Prestige</span>
            {t.hero.titleLead}{' '}
            <span className="hero-title-couple">
              {t.hero.titleCityMakkah}
              <br className="hero-title-br" />{' '}
              <span style={{ fontStyle: 'italic', color: '#E6C878' }}>
                {t.hero.titleCityMadinah}
              </span>
            </span>{' '}
            {t.hero.titleTrailing}
          </h1>
          <div
            className="goldline"
            style={{ width: 72, height: 1.5, borderRadius: 2 }}
          />
          <p
            style={{
              margin: 0,
              fontSize: 17,
              lineHeight: 1.65,
              color: 'rgba(248,242,232,0.78)',
              maxWidth: 560,
            }}
          >
            {t.hero.paragraph}
          </p>
          <div
            style={{
              display: 'flex',
              gap: 14,
              marginTop: 8,
              flexWrap: 'wrap',
            }}
          >
            <a
              href={`${homeHref}#devis`}
              className="btn-primary hero-cta-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 9,
                padding: '15px 26px',
                borderRadius: 12,
                background: 'linear-gradient(135deg,#EBCE82,#C09A44)',
                color: '#14110E',
                fontWeight: 700,
                fontSize: 15,
                whiteSpace: 'nowrap',
              }}
            >
              {t.hero.ctaPrimary}
              <span className="btn-arrow">
                <svg width="16" height="16" viewBox="0 0 16 16">
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
              href={`${homeHref}#hotels`}
              className="btn-secondary hero-cta-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '15px 26px',
                borderRadius: 12,
                border: '1px solid rgba(245,239,230,0.28)',
                background: 'rgba(20,17,14,0.35)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                color: '#F5EFE6',
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
          <div
            className="hero-trust"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 26,
              marginTop: 24,
              flexWrap: 'wrap',
              color: 'rgba(245,239,230,0.72)',
              fontSize: 13.5,
              fontWeight: 500,
            }}
          >
            {trustItems.map((item, index) => (
              <div
                key={item.label}
                style={{ display: 'flex', alignItems: 'center', gap: 26 }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span style={{ color: '#E6C878' }}>{item.icon}</span>
                  {item.label}
                </span>
                {index < trustItems.length - 1 && (
                  <span
                    className="hero-trust-sep"
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: 'rgba(245,239,230,0.25)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
