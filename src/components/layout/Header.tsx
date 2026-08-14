import { useEffect, useState } from 'react';
import logoHaramain from '../../assets/logo_haramain.webp';

type MenuKey = 'hotels' | 'services' | null;

const hotelsMenu = [
  { label: 'Hôtels à Makkah', href: '/#hotels' },
  { label: 'Hôtels à Madinah', href: '/#hotels' },
  { label: 'Chambres avec vue Kaaba', href: '/#hotels' },
];

const servicesMenu = [
  { label: 'Transferts aéroport', href: '/#services' },
  { label: 'Chauffeurs & déplacements', href: '/#services' },
  { label: 'Visites & accompagnement', href: '/#services' },
];

const simpleLinks = [
  { label: 'À propos', href: '/#apropos' },
  { label: 'Témoignages', href: '/#temoignages' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
];

const mobileNav = [
  { label: 'Accueil', href: '/' },
  { label: 'Hôtels', href: '/#hotels' },
  { label: 'Services', href: '/#services' },
  { label: 'À propos', href: '/#apropos' },
  { label: 'Témoignages', href: '/#temoignages' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
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

function menuWrapperStyle(open: boolean): React.CSSProperties {
  return {
    position: 'absolute',
    top: '100%',
    left: 0,
    paddingTop: 6,
    transition: 'opacity .2s ease, transform .2s ease',
    opacity: open ? 1 : 0,
    transform: open ? 'translateY(0)' : 'translateY(6px)',
    pointerEvents: open ? 'auto' : 'none',
    visibility: open ? 'visible' : 'hidden',
  };
}

const menuInnerStyle: React.CSSProperties = {
  minWidth: 210,
  padding: 8,
  borderRadius: 12,
  background: '#1E1A14',
  border: '1px solid rgba(245,239,230,0.1)',
  boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
};

function Header() {
  const [menu, setMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (menu === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenu(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menu]);

  const handleGroupBlur = (
    e: React.FocusEvent<HTMLDivElement>,
    key: MenuKey,
  ) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setMenu((current) => (current === key ? null : current));
    }
  };

  return (
    <header
      className="header-pad"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        background: 'rgba(20,17,14,0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(245,239,230,0.08)',
      }}
    >
      <a
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          color: 'inherit',
        }}
      >
        <img
          src={logoHaramain}
          alt="Haramain Prestige"
          width={44}
          height={44}
          decoding="async"
          style={{
            width: 44,
            height: 44,
            objectFit: 'contain',
            flexShrink: 0,
          }}
        />
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
        className="nav-desktop"
        style={{
          alignItems: 'center',
          gap: 4,
          fontSize: 13.5,
          fontWeight: 600,
        }}
      >
        <a
          href="/"
          className="nav-link"
          style={{ ...linkBase, color: '#F5EFE6' }}
        >
          Accueil
        </a>

        <div
          style={{ position: 'relative' }}
          onMouseEnter={() => setMenu('hotels')}
          onMouseLeave={() => setMenu(null)}
          onFocus={() => setMenu('hotels')}
          onBlur={(e) => handleGroupBlur(e, 'hotels')}
        >
          <a
            href="/#hotels"
            className="nav-link"
            aria-haspopup="menu"
            aria-expanded={menu === 'hotels'}
            style={{
              ...linkBase,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            Hôtels
            <svg width="11" height="11" viewBox="0 0 16 16" aria-hidden="true">
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
          <div style={menuWrapperStyle(menu === 'hotels')}>
            <div style={menuInnerStyle} role="menu" aria-label="Hôtels">
              {hotelsMenu.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  role="menuitem"
                  className="nav-dropdown-item"
                  style={dropdownItemStyle}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{ position: 'relative' }}
          onMouseEnter={() => setMenu('services')}
          onMouseLeave={() => setMenu(null)}
          onFocus={() => setMenu('services')}
          onBlur={(e) => handleGroupBlur(e, 'services')}
        >
          <a
            href="/#services"
            className="nav-link"
            aria-haspopup="menu"
            aria-expanded={menu === 'services'}
            style={{
              ...linkBase,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            Services
            <svg width="11" height="11" viewBox="0 0 16 16" aria-hidden="true">
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
          <div style={menuWrapperStyle(menu === 'services')}>
            <div style={menuInnerStyle} role="menu" aria-label="Services">
              {servicesMenu.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  role="menuitem"
                  className="nav-dropdown-item"
                  style={dropdownItemStyle}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {simpleLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="nav-link"
            style={linkBase}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <a
          href="/#devis"
          className="header-cta hide-mobile btn-primary"
          style={{
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

        <button
          type="button"
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="nav-toggle"
          style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            border: '1px solid rgba(245,239,230,0.16)',
            background: 'rgba(20,17,14,0.6)',
            color: '#F5EFE6',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {mobileOpen ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        {mobileNav.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="mobile-nav-link"
            onClick={() => setMobileOpen(false)}
            style={{
              padding: '13px 6px',
              fontSize: 15,
              fontWeight: 600,
              color: '#F5EFE6',
              borderBottom: '1px solid rgba(245,239,230,0.06)',
            }}
          >
            {item.label}
          </a>
        ))}
        <a
          href="/#devis"
          onClick={() => setMobileOpen(false)}
          className="btn-primary"
          style={{
            marginTop: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '14px 20px',
            borderRadius: 12,
            background: 'linear-gradient(135deg,#EBCE82,#C09A44)',
            color: '#14110E',
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          Obtenir un devis
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
      </div>
    </header>
  );
}

export default Header;
