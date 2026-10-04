import type { TestimonialItem } from '../../i18n/types';

type TestimonialsGridProps = {
  items: TestimonialItem[];
};

function TestimonialsGrid({ items }: TestimonialsGridProps) {
  return (
    <div className="grid-3">
      {items.map((testimonial) => (
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
          <div style={{ color: '#E6C878', fontSize: 15, letterSpacing: 1 }}>
            ★★★★★
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
  );
}

export default TestimonialsGrid;
