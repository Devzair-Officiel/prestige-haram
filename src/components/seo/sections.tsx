import { SeoSection } from './SeoSection';
import { SectionEyebrow, SectionH2, BodyParagraph } from './primitives';
import { HotelGridCard } from './HotelGridCard';
import { handleSpaNav } from '../../i18n/utils';

export function SeoSectionText({
  id,
  eyebrow,
  title,
  paragraphs,
  discoverLink,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  discoverLink?: { label: string; href: string };
}) {
  return (
    <SeoSection id={id}>
      {eyebrow && <SectionEyebrow text={eyebrow} />}
      <SectionH2>{title}</SectionH2>
      {paragraphs.map((p, i) => (
        <BodyParagraph key={i}>{p}</BodyParagraph>
      ))}
      {discoverLink && (
        <a
          href={discoverLink.href}
          onClick={(e) => handleSpaNav(e, discoverLink.href)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            fontSize: 13.5,
            fontWeight: 600,
            color: '#E6C878',
            marginTop: 8,
            textDecoration: 'none',
          }}
        >
          {discoverLink.label}
          <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true">
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
      )}
    </SeoSection>
  );
}

export function SeoSectionCriteria({
  eyebrow,
  title,
  paragraphs,
  criteriaLabel,
  criteria,
}: {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  criteriaLabel: string;
  criteria: string[];
}) {
  return (
    <SeoSection>
      {eyebrow && <SectionEyebrow text={eyebrow} />}
      <SectionH2>{title}</SectionH2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(24px, 4vw, 48px)',
          alignItems: 'start',
        }}
      >
        <div>
          {paragraphs.map((p, i) => (
            <BodyParagraph key={i}>{p}</BodyParagraph>
          ))}
        </div>
        <div
          style={{
            padding: 'clamp(24px, 3.5vw, 36px)',
            borderRadius: 16,
            background:
              'linear-gradient(135deg, rgba(230,200,120,0.06), rgba(192,154,68,0.03))',
            border: '1px solid rgba(230,200,120,0.14)',
          }}
        >
          <p
            style={{
              margin: '0 0 20px',
              fontSize: 12,
              letterSpacing: '2.5px',
              fontWeight: 700,
              color: '#E6C878',
            }}
          >
            {criteriaLabel}
          </p>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
            }}
          >
            {criteria.map((criterion, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  fontSize: 14.5,
                  color: 'rgba(245,239,230,0.72)',
                  lineHeight: 1.5,
                }}
              >
                <span
                  style={{
                    marginTop: 4,
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#E6C878',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                />
                {criterion}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SeoSection>
  );
}

export function SeoSectionSteps({
  id,
  eyebrow,
  title,
  paragraphs,
  steps,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  steps: string[];
}) {
  return (
    <SeoSection id={id}>
      {eyebrow && <SectionEyebrow text={eyebrow} />}
      <SectionH2>{title}</SectionH2>
      {paragraphs.map((p, i) => (
        <BodyParagraph key={i}>{p}</BodyParagraph>
      ))}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 28,
          marginTop: 40,
        }}
      >
        {steps.map((step, i) => (
          <div
            key={i}
            style={{
              padding: 'clamp(22px, 3vw, 32px)',
              borderRadius: 16,
              border: '1px solid rgba(245,239,230,0.08)',
              background: 'rgba(20,17,14,0.4)',
            }}
          >
            <div
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 36,
                fontWeight: 600,
                color: 'rgba(230,200,120,0.3)',
                lineHeight: 1,
                marginBottom: 18,
              }}
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 15,
                fontWeight: 600,
                lineHeight: 1.5,
                color: '#F5EFE6',
              }}
            >
              {step}
            </p>
          </div>
        ))}
      </div>
    </SeoSection>
  );
}

export function SeoSectionHotels({
  title,
  intro,
  hotels,
  ctaLabel,
  quoteHref,
}: {
  title: string;
  intro: string;
  hotels: Array<{ name: string; description: string; image?: string }>;
  ctaLabel: string;
  quoteHref: string;
}) {
  return (
    <SeoSection id="hotels-liste">
      <SectionH2>{title}</SectionH2>
      <BodyParagraph style={{ marginBottom: 36 }}>{intro}</BodyParagraph>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 28,
        }}
      >
        {hotels.map((hotel) => (
          <HotelGridCard
            key={hotel.name}
            name={hotel.name}
            description={hotel.description}
            image={hotel.image}
            ctaLabel={ctaLabel}
            quoteHref={quoteHref}
          />
        ))}
      </div>
    </SeoSection>
  );
}
