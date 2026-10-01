export function HotelGridCard({
  name,
  description,
  image,
  ctaLabel,
  quoteHref,
}: {
  name: string;
  description: string;
  image?: string;
  ctaLabel: string;
  quoteHref: string;
}) {
  return (
    <a
      href={quoteHref}
      className="hotel-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        minHeight: 300,
        borderRadius: 18,
        border: '1px solid rgba(245,239,230,0.08)',
        color: 'inherit',
        textDecoration: 'none',
        isolation: 'isolate',
      }}
    >
      {image ? (
        <>
          <img
            src={image}
            alt={name}
            className="hotel-card-img"
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            draggable={false}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -2,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg,rgba(20,17,14,0.15) 0%,rgba(20,17,14,0.6) 55%,rgba(20,17,14,0.95) 100%)',
              zIndex: -1,
            }}
          />
        </>
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: -2,
            background:
              'radial-gradient(circle at 25% 20%, rgba(230,200,120,0.14) 0%, transparent 45%),' +
              'linear-gradient(135deg, #1E1913 0%, #14110E 100%)',
          }}
        />
      )}
      <div
        style={{
          padding: '22px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 21,
            fontWeight: 600,
            color: '#F5EFE6',
            lineHeight: 1.2,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 13,
            color: 'rgba(245,239,230,0.68)',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </div>
        <span
          className="hotel-card-pill"
          style={{
            marginTop: 14,
            alignSelf: 'flex-start',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            padding: '7px 13px',
            borderRadius: 999,
            border: '1px solid rgba(230,200,120,0.45)',
            color: '#E6C878',
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: '0.4px',
          }}
        >
          {ctaLabel}
          <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true">
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
      </div>
    </a>
  );
}
