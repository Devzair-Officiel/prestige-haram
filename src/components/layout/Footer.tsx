import logoHaramain from '../../assets/logo_haramain.png';

const navigationLinks = [
  { label: 'À propos', href: '#apropos' },
  { label: 'Hôtels', href: '#hotels' },
  { label: 'Services', href: '#services' },
];

const moreLinks = [
  { label: 'Témoignages', href: '#temoignages' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const legalLinks = [
  { label: 'Mentions légales', href: '#' },
  { label: 'Politique de confidentialité', href: '#' },
];

const socialIconStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 9,
  border: '1px solid rgba(245,239,230,0.12)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#E6C878',
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
              href="#"
              aria-label="Instagram"
              className="social-icon"
              style={socialIconStyle}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="WhatsApp"
              className="social-icon"
              style={socialIconStyle}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
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
          © 2026 Haramain Prestige — Tous droits réservés.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
