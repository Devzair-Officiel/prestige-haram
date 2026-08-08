import { useReveal } from '../../../hooks/useReveal';

type Testimonial = {
  initial: string;
  name: string;
  location: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    initial: 'Y',
    name: 'Yassin M.',
    location: 'Paris',
    quote:
      'Service au top. Hôtels magnifiques, très bien situés. Je recommande Haramain Prestige les yeux fermés.',
  },
  {
    initial: 'A',
    name: 'Amina K.',
    location: 'Lyon',
    quote:
      "Nous avons eu une chambre avec vue sur la Kaaba, c'était incroyable. Merci pour tout, du début à la fin.",
  },
  {
    initial: 'S',
    name: 'Sofiane B.',
    location: 'Bruxelles',
    quote:
      "Réponse rapide, prix imbattables et équipe très professionnelle. Qu'Allah vous préserve.",
  },
];

const rating = '4,9';
const reviewCount = 500;

function Testimonials() {
  const revealRef = useReveal<HTMLDivElement>();

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
            style={{
              fontSize: 12,
              letterSpacing: '3.6px',
              fontWeight: 700,
              color: '#E6C878',
            }}
          >
            ILS NOUS FONT CONFIANCE
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
            Ce que disent nos voyageurs
          </h2>
        </div>
        <div className="testi-rating" style={{ textAlign: 'right' }}>
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
              {rating}
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
            {reviewCount}+ avis vérifiés
          </div>
        </div>
      </div>

      <div className="grid-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            style={{
              margin: 0,
              background: '#161310',
              border: '1px solid rgba(245,239,230,0.08)',
              borderRadius: 20,
              padding: 26,
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ color: '#E6C878', fontSize: 15, letterSpacing: 1 }}>
                ★★★★★
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  color: '#4FB477',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '1px',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="#4FB477"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                VÉRIFIÉ
              </div>
            </div>
            <blockquote
              style={{
                margin: 0,
                fontSize: 15,
                lineHeight: 1.6,
                color: 'rgba(245,239,230,0.82)',
                fontStyle: 'italic',
              }}
            >
              « {testimonial.quote} »
            </blockquote>
            <figcaption
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginTop: 'auto',
                paddingTop: 6,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg,#3a332a,#26201a)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: '#E6C878',
                }}
              >
                {testimonial.initial}
              </div>
              <div style={{ lineHeight: 1.25 }}>
                <div
                  style={{
                    fontSize: 14.5,
                    fontWeight: 700,
                    color: '#F5EFE6',
                  }}
                >
                  {testimonial.name}
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: 'rgba(245,239,230,0.5)',
                    marginTop: 2,
                  }}
                >
                  {testimonial.location}
                </div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
