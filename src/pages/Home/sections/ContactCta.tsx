import { useReveal } from '../../../hooks/useReveal';
import { useI18n } from '../../../i18n';
import nabawiImage from '../../../assets/masjid_nabawi.webp';

function ContactCta() {
  const revealRef = useReveal<HTMLDivElement>();
  const { t, pathFor } = useI18n();
  const homeHref = pathFor('home');
  const contactHref = pathFor('contact');

  return (
    <section id="contact" className="container-pad section-pad-y">
      <div
        ref={revealRef}
        className="reveal contact-pad"
        style={{
          position: 'relative',
          maxWidth: 1240,
          margin: '0 auto',
          borderRadius: 24,
          overflow: 'hidden',
          minHeight: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <img
          src={nabawiImage}
          alt={t.contactCta.imageAlt}
          width={1500}
          height={1125}
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg,rgba(20,17,14,0.55) 0%,rgba(20,17,14,0.78) 60%,rgba(20,17,14,0.9) 100%)',
          }}
        />
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            maxWidth: 820,
          }}
        >
          <span
            className="section-eyebrow"
            style={{
              fontSize: 12,
              letterSpacing: '3.6px',
              fontWeight: 700,
              color: '#E6C878',
            }}
          >
            {t.contactCta.eyebrow}
          </span>
          <h2
            className="section-title cta-title-nowrap"
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 600,
              lineHeight: 1.1,
              color: '#F8F2E8',
            }}
          >
            {t.contactCta.titleLead}{' '}
            <span style={{ fontStyle: 'italic', color: '#E6C878' }}>
              {t.contactCta.titleCouple}
            </span>
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 15.5,
              lineHeight: 1.6,
              color: 'rgba(248,242,232,0.78)',
              maxWidth: 520,
            }}
          >
            {t.contactCta.paragraph}
          </p>
          <div
            style={{
              display: 'flex',
              gap: 14,
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: 8,
            }}
          >
            <a
              href={`${homeHref}#devis`}
              className="btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                padding: '15px 26px',
                borderRadius: 12,
                background: 'linear-gradient(135deg,#EBCE82,#C09A44)',
                color: '#14110E',
                fontWeight: 700,
                fontSize: 14.5,
              }}
            >
              {t.contactCta.ctaPrimary}
              <span className="btn-arrow">
                <svg width="15" height="15" viewBox="0 0 16 16">
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
              aria-label={t.contactCta.ctaSecondaryAria}
              className="btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                padding: '15px 26px',
                borderRadius: 12,
                border: '1px solid rgba(245,239,230,0.28)',
                background: 'rgba(20,17,14,0.35)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                color: '#F5EFE6',
                fontWeight: 600,
                fontSize: 14.5,
              }}
            >
              <span style={{ color: '#6FD397', display: 'flex' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {t.contactCta.ctaSecondary}
            </a>
            <a
              href={contactHref}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '15px 22px',
                borderRadius: 12,
                border: '1px solid rgba(245,239,230,0.18)',
                background: 'transparent',
                color: 'rgba(248,242,232,0.65)',
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {t.contactCta.ctaContact}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactCta;
