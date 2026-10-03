import { useEffect, useState } from 'react';
import logoHaramain from '../../assets/logo_haramain.webp';
import { useI18n } from '../../i18n';
import { navigateTo } from '../../i18n/utils';

type MenuKey = 'hotels' | 'services' | null;

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
    insetInlineStart: 0,
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
  const { t, locale, otherLocale, pathFor, altPathFor } = useI18n();
  const [menu, setMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const homeHref = pathFor('home');
  const aboutHref = pathFor('about');

  const hotelsMakkahHref = pathFor('hotelsMakkah');
  const hotelsMadinahHref = pathFor('hotelsMadinah');
  const chambreVueKaabaHref = pathFor('chambreVueKaaba');
  const hotelsMenu = t.header.hotelsMenu.map((label, index) => ({
    label,
    href:
      index === 0 ? hotelsMakkahHref :
      index === 1 ? hotelsMadinahHref :
      index === 2 ? chambreVueKaabaHref :
      `${homeHref}#hotels`,
  }));
  const servicesMenu = [
    { label: t.header.servicesMenu[0], href: pathFor('transfertJeddahMakkah') },
    { label: t.header.servicesMenu[1], href: pathFor('transfertAeroportMadinah') },
    { label: t.header.servicesMenu[2], href: `${homeHref}#services` },
    { label: t.header.servicesMenu[3], href: `${homeHref}#services` },
  ];
  const simpleLinks = [
    { label: t.header.navAbout, href: aboutHref },
    { label: t.header.navTestimonials, href: `${homeHref}#temoignages` },
    { label: t.header.navFaq, href: `${homeHref}#faq` },
    { label: t.header.navContact, href: `${homeHref}#contact` },
  ];
  const mobileNav = [
    { label: t.header.navHome, href: homeHref },
    { label: t.header.navHotels, href: `${homeHref}#hotels` },
    { label: t.header.navServices, href: `${homeHref}#services` },
    { label: t.header.navAbout, href: aboutHref },
    { label: t.header.navTestimonials, href: `${homeHref}#temoignages` },
    { label: t.header.navFaq, href: `${homeHref}#faq` },
    { label: t.header.navContact, href: `${homeHref}#contact` },
  ];

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

  // Le sélecteur de langue conserve la page courante mais bascule le
  // préfixe /ar-sa/. On récupère la page courante via detectRoute, mais
  // pour rester léger on utilise directement la version « home »
  // par défaut : les usePageMetadata de chaque page définissent ensuite
  // la bonne canonique. On préserve toutefois la page réelle pour le
  // cas courant (about/legal/privacy).
  const languageSwitchHref = (() => {
    // On lit le pathname courant et on remappe vers la locale opposée
    // en gardant la même page — cela évite de forcer un retour à
    // l'accueil quand on est sur /a-propos ou /mentions-legales.
    if (typeof window === 'undefined') return altPathFor('home');
    // Recompose à partir des routes connues : si la page courante n'est
    // pas mappée (404), on retombe sur l'accueil de l'autre locale.
    return altPathFor(guessPageFromPath(window.location.pathname));
  })();

  const otherLabel =
    otherLocale === 'fr' ? t.common.languageFr : t.common.languageAr;
  const currentLabel =
    locale === 'fr' ? t.common.languageFr : t.common.languageAr;

  const handleLanguageSwitch = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(languageSwitchHref);
  };

  const handleInternalNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    // Interception seulement pour les liens internes (pas hash-only ni
    // externe) afin de garder la navigation SPA + notifier le provider
    // i18n via navigateTo.
    if (href.startsWith('http')) return;
    if (href.startsWith('mailto:')) return;
    if (href.startsWith('#')) return;
    // Si la cible est la page courante avec juste un hash, laisser le
    // navigateur gérer l'ancre.
    if (typeof window !== 'undefined') {
      const [path, hash] = href.split('#');
      if (path === window.location.pathname && hash) return;
    }
    e.preventDefault();
    navigateTo(href);
    setMobileOpen(false);
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
        href={homeHref}
        onClick={(e) => handleInternalNav(e, homeHref)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          color: 'inherit',
        }}
      >
        <img
          src={logoHaramain}
          alt={t.header.logoAlt}
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
            className="header-brand-name"
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 3,
              color: '#F5EFE6',
            }}
          >
            {t.header.brandLine1}
          </span>
          <span
            className="header-brand-tagline"
            style={{
              fontSize: 8,
              letterSpacing: 5,
              color: '#C9A24B',
              marginTop: 3,
              fontWeight: 700,
            }}
          >
            {t.header.brandLine2}
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
          href={homeHref}
          onClick={(e) => handleInternalNav(e, homeHref)}
          className="nav-link"
          style={{ ...linkBase, color: '#F5EFE6' }}
        >
          {t.header.navHome}
        </a>

        <div
          style={{ position: 'relative' }}
          onMouseEnter={() => setMenu('hotels')}
          onMouseLeave={() => setMenu(null)}
          onFocus={() => setMenu('hotels')}
          onBlur={(e) => handleGroupBlur(e, 'hotels')}
        >
          <a
            href={`${homeHref}#hotels`}
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
            {t.header.navHotels}
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
            <div
              style={menuInnerStyle}
              role="menu"
              aria-label={t.header.hotelsMenuAria}
            >
              {hotelsMenu.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  role="menuitem"
                  className="nav-dropdown-item"
                  onClick={(e) => handleInternalNav(e, item.href)}
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
            href={`${homeHref}#services`}
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
            {t.header.navServices}
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
            <div
              style={menuInnerStyle}
              role="menu"
              aria-label={t.header.servicesMenuAria}
            >
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
            onClick={(e) => handleInternalNav(e, link.href)}
            className="nav-link"
            style={linkBase}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <a
          href={languageSwitchHref}
          onClick={handleLanguageSwitch}
          className="lang-switch"
          aria-label={t.common.languageSwitchAria}
          lang={otherLocale}
          title={otherLabel}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 12px',
            borderRadius: 999,
            border: '1px solid rgba(245,239,230,0.16)',
            color: '#F5EFE6',
            fontSize: 12.5,
            fontWeight: 700,
            letterSpacing: '0.3px',
            background: 'rgba(20,17,14,0.6)',
          }}
        >
          <span aria-hidden="true" style={{ opacity: 0.5 }}>
            {currentLabel}
          </span>
          <span aria-hidden="true" style={{ opacity: 0.35 }}>
            ·
          </span>
          <span>{otherLabel}</span>
        </a>

        <a
          href={`${homeHref}#devis`}
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
          {t.header.ctaQuote}
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
          aria-label={mobileOpen ? t.header.closeMenu : t.header.openMenu}
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
            onClick={(e) => handleInternalNav(e, item.href)}
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
          href={`${homeHref}#devis`}
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
          {t.header.ctaQuote}
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

// Helper local : mappe un pathname vers la clé de page correspondante,
// pour que le sélecteur de langue préserve la page courante. Doublon
// discret de `detectRoute` (importé par ailleurs par App/provider) —
// gardé local ici pour ne pas coupler le Header aux slugs FR.
function guessPageFromPath(
  pathname: string,
): 'home' | 'about' | 'legal' | 'privacy' | 'hotelsMakkah' | 'hotelsMadinah' | 'chambreVueKaaba' | 'transfertJeddahMakkah' | 'transfertAeroportMadinah' {
  const stripped = pathname.replace(/^\/ar-sa/, '').replace(/\/+$/, '') || '/';
  if (stripped === '/a-propos') return 'about';
  if (stripped === '/mentions-legales') return 'legal';
  if (stripped === '/politique-de-confidentialite') return 'privacy';
  if (stripped === '/hotels-makkah') return 'hotelsMakkah';
  if (stripped === '/hotels-madinah') return 'hotelsMadinah';
  if (stripped === '/chambre-vue-kaaba') return 'chambreVueKaaba';
  if (stripped === '/transfert-aeroport-jeddah-makkah') return 'transfertJeddahMakkah';
  if (stripped === '/transfert-aeroport-madinah') return 'transfertAeroportMadinah';
  return 'home';
}

export default Header;
