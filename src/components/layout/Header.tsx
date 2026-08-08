import { useState } from 'react';

type MenuKey = 'hotels' | 'services' | null;

const hotelsMenu = [
  { label: 'Hôtels à Makkah', href: '#hotels' },
  { label: 'Hôtels à Madinah', href: '#hotels' },
  { label: 'Chambres avec vue Kaaba', href: '#hotels' },
];

const servicesMenu = [
  { label: 'Transferts aéroport', href: '#services' },
  { label: 'Chauffeurs & déplacements', href: '#services' },
  { label: 'Visites & accompagnement', href: '#services' },
];

const simpleLinks = [
  { label: 'À propos', href: '#apropos' },
  { label: 'Témoignages', href: '#temoignages' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const linkBase: React.CSSProperties = {
  padding: '9px 12px',
  color: 'rgba(245,239,230,0.7)',
};

const dropdownItemStyle: React.CSSProperties = {
  display: 'block',
  padding: '10px 14px',
  borderRadius: 9,
  color: 'rgba(245,239,230,0.78)',
  fontSize: 13,
};

function menuStyle(open: boolean): React.CSSProperties {
  return {
    position: 'absolute',
    top: '100%',
    left: 0,
    marginTop: 6,
    minWidth: 210,
    padding: 8,
    borderRadius: 12,
    background: '#1E1A14',
    border: '1px solid rgba(245,239,230,0.1)',
    boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
    transition: 'opacity .2s ease, transform .2s ease',
    opacity: open ? 1 : 0,
    transform: open ? 'translateY(0)' : 'translateY(6px)',
    pointerEvents: open ? 'auto' : 'none',
    visibility: open ? 'visible' : 'hidden',
  };
}

function Header() {
  const [menu, setMenu] = useState<MenuKey>(null);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        padding: '16px 48px',
        background: 'rgba(20,17,14,0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(245,239,230,0.08)',
      }}
    >
      <a
        href="#"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          color: 'inherit',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 9,
            background: 'linear-gradient(135deg,#EBCE82,#C09A44)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 700,
              fontSize: 21,
              color: '#14110E',
              letterSpacing: '0.5px',
            }}
          >
            HP
          </span>
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 3,
              color: '#F5EFE6',
            }}
          >
            HARAMAIN
          </span>
          <span
            style={{
              fontSize: 8,
              letterSpacing: 5,
              color: '#C9A24B',
              marginTop: 3,
              fontWeight: 700,
            }}
          >
            PRESTIGE
          </span>
        </div>
      </a>

      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          fontSize: 13.5,
          fontWeight: 600,
        }}
      >
        <a href="#" style={{ ...linkBase, color: '#F5EFE6' }}>
          Accueil
        </a>

        <div
          style={{ position: 'relative' }}
          onMouseEnter={() => setMenu('hotels')}
          onMouseLeave={() => setMenu(null)}
        >
          <a
            href="#hotels"
            style={{
              ...linkBase,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            Hôtels
            <svg width="11" height="11" viewBox="0 0 16 16">
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <div style={menuStyle(menu === 'hotels')}>
            {hotelsMenu.map((item) => (
              <a key={item.label} href={item.href} style={dropdownItemStyle}>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div
          style={{ position: 'relative' }}
          onMouseEnter={() => setMenu('services')}
          onMouseLeave={() => setMenu(null)}
        >
          <a
            href="#services"
            style={{
              ...linkBase,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            Services
            <svg width="11" height="11" viewBox="0 0 16 16">
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <div style={menuStyle(menu === 'services')}>
            {servicesMenu.map((item) => (
              <a key={item.label} href={item.href} style={dropdownItemStyle}>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {simpleLinks.map((link) => (
          <a key={link.label} href={link.href} style={linkBase}>
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="#devis"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '11px 20px',
          borderRadius: 10,
          background: 'linear-gradient(135deg,#EBCE82,#C09A44)',
          color: '#14110E',
          fontWeight: 700,
          fontSize: 13.5,
          whiteSpace: 'nowrap',
        }}
      >
        Obtenir un devis
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
      </a>
    </header>
  );
}

export default Header;
