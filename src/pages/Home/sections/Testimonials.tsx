import { useReveal } from '../../../hooks/useReveal';
import { useI18n } from '../../../i18n';
import TestimonialsGrid from '../../../components/testimonials/TestimonialsGrid';

function Testimonials() {
  const revealRef = useReveal<HTMLDivElement>();
  const { t, pathFor } = useI18n();
  const testimonialsHref = pathFor('testimonials');

  return (
    <section
      id="temoignages"
      className="container-pad section-pad-y"
      style={{
        maxWidth: 1240,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <div
        ref={revealRef}
        className="reveal testi-header"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 24,
          marginBottom: 36,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <span
            className="section-eyebrow"
            style={{
              fontSize: 12,
              letterSpacing: '3.6px',
              fontWeight: 700,
              color: '#E6C878',
            }}
          >
            {t.testimonials.eyebrow}
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
            {t.testimonials.title}
          </h2>
        </div>
        <div className="testi-rating" style={{ textAlign: 'end' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 10,
              justifyContent: 'flex-end',
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 48,
                fontWeight: 700,
                color: '#F5EFE6',
                lineHeight: 1,
              }}
            >
              {t.testimonials.rating}
            </span>
            <span style={{ fontSize: 15, color: 'rgba(245,239,230,0.55)' }}>
              /5
            </span>
          </div>
          <div
            style={{
              color: '#E6C878',
              fontSize: 18,
              letterSpacing: '2px',
              marginTop: 4,
            }}
          >
            ★★★★★
          </div>
          <div
            style={{
              fontSize: 13,
              color: 'rgba(245,239,230,0.55)',
              marginTop: 4,
            }}
          >
            {t.testimonials.reviewsCount}
          </div>
        </div>
      </div>

      <TestimonialsGrid items={t.testimonials.items} />

      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <a
          href={testimonialsHref}
          className="nav-link"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 14,
            fontWeight: 600,
            color: '#E6C878',
            borderBottom: '1px solid rgba(230,200,120,0.35)',
            paddingBottom: 2,
          }}
        >
          {t.testimonials.discoverAll}
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
      </div>
    </section>
  );
}

export default Testimonials;
