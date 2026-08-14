import logoHaramain from '../../assets/logo_haramain.webp';

const navigationLinks = [
  { label: 'À propos', href: '/#apropos' },
  { label: 'Hôtels', href: '/#hotels' },
  { label: 'Services', href: '/#services' },
];

const moreLinks = [
  { label: 'Témoignages', href: '/#temoignages' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
];

const legalLinks = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  {
    label: 'Politique de confidentialité',
    href: '/politique-de-confidentialite',
  },
];

const socialBase: React.CSSProperties = {
  width: 38,
  height: 38,
  borderRadius: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#FFFFFF',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
};

const instagramStyle: React.CSSProperties = {
  ...socialBase,
  background:
    'linear-gradient(45deg,#F58529 0%,#DD2A7B 45%,#8134AF 75%,#515BD4 100%)',
  boxShadow: '0 4px 12px rgba(221,42,123,0.25)',
};

const whatsappStyle: React.CSSProperties = {
  ...socialBase,
  background: '#25D366',
  boxShadow: '0 4px 12px rgba(37,211,102,0.28)',
};

const columnTitle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  color: '#F5EFE6',
  marginBottom: 2,
};

const columnLink: React.CSSProperties = {
  fontSize: 13,
  color: 'rgba(245,239,230,0.55)',
};

type LinkColumnProps = {
  title: string;
  links: { label: string; href: string }[];
};

function LinkColumn({ title, links }: LinkColumnProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={columnTitle}>{title}</div>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="nav-link"
          style={columnLink}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer
      style={{
        marginTop: 100,
        borderTop: '1px solid rgba(245,239,230,0.08)',
        background: '#100D0B',
      }}
    >
      <div
        className="footer-grid footer-pad"
        style={{
          maxWidth: 1240,
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src={logoHaramain}
              alt="Haramain Prestige"
              width={42}
              height={42}
              loading="lazy"
              decoding="async"
              style={{
                width: 42,
                height: 42,
                objectFit: 'contain',
                flexShrink: 0,
              }}
            />
            <div style={{ lineHeight: 1 }}>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 17,
                  fontWeight: 600,
                  letterSpacing: 2.5,
                  color: '#F5EFE6',
                }}
              >
                HARAMAIN
              </span>
              <div
                style={{
                  fontSize: 8,
                  letterSpacing: 4.5,
                  color: '#C9A24B',
                  marginTop: 3,
                  fontWeight: 700,
                }}
              >
                PRESTIGE
              </div>
            </div>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              lineHeight: 1.6,
              color: 'rgba(245,239,230,0.5)',
              maxWidth: 300,
            }}
          >
            Votre conciergerie à Makkah &amp; Madinah, à vos côtés avant et
            pendant votre séjour.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <a
              href="https://www.instagram.com/haramainprestige?igsh=MTBzYmt5MTZjeHVxZQ%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Haramain Prestige"
              className="social-icon"
              style={instagramStyle}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5.4"
                  stroke="#FFFFFF"
                  strokeWidth="1.9"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="#FFFFFF"
                  strokeWidth="1.9"
                />
                <circle cx="17.6" cy="6.4" r="1.25" fill="#FFFFFF" />
              </svg>
            </a>
            <a
              href="https://wa.me/33773157902"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Haramain Prestige : +33 7 73 15 79 02"
              className="social-icon"
              style={whatsappStyle}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
                  fill="#FFFFFF"
                />
              </svg>
            </a>
          </div>
        </div>

        <LinkColumn title="Navigation" links={navigationLinks} />
        <LinkColumn title="En savoir plus" links={moreLinks} />
        <LinkColumn title="Légal" links={legalLinks} />
      </div>

      <div
        className="container-pad"
        style={{
          borderTop: '1px solid rgba(245,239,230,0.06)',
          padding: '18px clamp(20px, 5vw, 48px)',
          textAlign: 'center',
        }}
      >
        <span style={{ fontSize: 12, color: 'rgba(245,239,230,0.38)' }}>
          © 2026{' '}
          <a
            href="https://devzair.fr"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#E6C878', textDecoration: 'none' }}
          >
            Devzair
          </a>{' '}
          — Tous droits réservés.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
