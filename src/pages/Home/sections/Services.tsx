import { useReveal } from '../../../hooks/useReveal';
import { useI18n } from '../../../i18n';
import { handleSpaNav } from '../../../i18n/utils';

// Les icônes sont figées côté vue : les libellés/descriptions viennent
// des traductions et sont zippés dans l'ordre attendu (hôtels, transferts,
// chauffeurs, visites).
const icons = [
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 8v10M3 13h18v5M21 13v-2a3 3 0 0 0-3-3h-6v5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path
      d="M10.5 4a1.5 1.5 0 0 1 3 0v5.2l7 4.1v2.1l-7-2.2v3.8l2.2 1.6v1.6L12 24l-3.7-1.2v-1.6L10.5 20v-3.8l-7 2.2v-2.1l7-4.1V4z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>,
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 11l1.4-4.2A2 2 0 0 1 8.3 5.4h7.4a2 2 0 0 1 1.9 1.4L19 11m-14 0h14m-14 0v6h2m12-6v6h-2m-8 0h8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="7.5" cy="14" r="1" fill="currentColor" />
    <circle cx="16.5" cy="14" r="1" fill="currentColor" />
  </svg>,
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M15.5 8.5l-2.2 5.2-5.2 2.2 2.2-5.2 5.2-2.2z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>,
];

function Services() {
  const revealRef = useReveal<HTMLDivElement>();
  const { t, pathFor } = useI18n();

  const CARD_HREFS: string[][] = [
    [],
    [pathFor('transfertJeddahMakkah'), pathFor('transfertAeroportMadinah')],
    [pathFor('chauffeurPriveMakkahMadinah')],
    [pathFor('visitesMadinah'), pathFor('visitesMakkah')],
  ];

  const services = t.services.cards.map((card, index) => ({
    icon: icons[index],
    title: card.title,
    description: card.description,
    links: (t.services.cardLinks[index] as string[])
      .map((label, li) => ({ label, href: CARD_HREFS[index][li] ?? '' }))
      .filter(({ label, href }) => label && href),
  }));

  return (
    <section
      id="services"
      className="container-pad section-pad-y"
      style={{
        maxWidth: 1240,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <div
        ref={revealRef}
        className="reveal"
        style={{ textAlign: 'center', marginBottom: 40 }}
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
          {t.services.eyebrow}
        </span>
        <h2
          className="section-title"
          style={{
            margin: '12px 0 0',
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 600,
            lineHeight: 1.1,
            color: '#F5EFE6',
          }}
        >
          {t.services.title}
        </h2>
        <p
          style={{
            margin: '14px auto 0',
            maxWidth: 560,
            fontSize: 15,
            color: 'rgba(245,239,230,0.62)',
          }}
        >
          {t.services.subtitle}
        </p>
      </div>

      <div
        className="grid-4"
        style={{
          gap: 1,
          background: 'rgba(245,239,230,0.08)',
          border: '1px solid rgba(245,239,230,0.08)',
          borderRadius: 22,
          overflow: 'hidden',
        }}
      >
        {services.map((service) => (
          <div
            key={service.title}
            className="hover-lift svccard"
            style={{
              background: '#161310',
              padding: '32px 26px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(201,162,75,0.1)',
                border: '1px solid rgba(201,162,75,0.24)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#E6C878',
              }}
            >
              {service.icon}
            </div>
            <div
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: '#F5EFE6',
              }}
            >
              {service.title}
            </div>
            <div
              style={{
                fontSize: 13.5,
                lineHeight: 1.6,
                color: 'rgba(245,239,230,0.6)',
              }}
            >
              {service.description}
            </div>
            {service.links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleSpaNav(e, href)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  marginTop: 4,
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: '#E6C878',
                  textDecoration: 'none',
                }}
              >
                {label}
                <svg width="11" height="11" viewBox="0 0 16 16" aria-hidden="true">
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
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
