import ImagePlaceholder from '../../../components/ui/ImagePlaceholder';
import { useReveal } from '../../../hooks/useReveal';

function ContactCta() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="contact"
      style={{
        marginTop: 130,
        padding: '0 48px',
      }}
    >
      <div
        ref={revealRef}
        className="reveal"
        style={{
          position: 'relative',
          maxWidth: 1240,
          margin: '0 auto',
          borderRadius: 24,
          overflow: 'hidden',
          minHeight: 340,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '80px 40px',
        }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <ImagePlaceholder label="Photo — Masjid an-Nabawi au coucher du soleil" />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg,rgba(20,17,14,0.5) 0%,rgba(20,17,14,0.82) 100%)',
          }}
        />
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            maxWidth: 620,
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
            PRÊT À PARTIR ?
          </span>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 600,
              fontSize: 44,
              lineHeight: 1.1,
              color: '#F8F2E8',
            }}
          >
            Discutons de votre séjour à{' '}
            <span style={{ fontStyle: 'italic', color: '#E6C878' }}>
              Makkah &amp; Madinah
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
            Recevez une proposition personnalisée sous 24h, sans engagement.
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
              href="#devis"
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
              Demander un devis
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
            </a>
            <a
              href="#"
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
              Écrire sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactCta;
