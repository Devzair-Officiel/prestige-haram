import { useReveal } from '../../../hooks/useReveal';
import makkahImage from '../../../assets/kaaba_1.webp';
import madinahImage from '../../../assets/hotel_medinah.webp';
import kaabaViewImage from '../../../assets/hotel_vue_kaaba.webp';

type Hotel = {
  title: string;
  description: string;
  image: string;
  cta: string;
};

const hotels: Hotel[] = [
  {
    title: 'Hôtels à Makkah',
    description: 'Proximité, confort et vue sur la Kaaba',
    image: makkahImage,
    cta: 'Voir les hôtels',
  },
  {
    title: 'Hôtels à Madinah',
    description: 'À deux pas du Masjid An-Nabawi',
    image: madinahImage,
    cta: 'Voir les hôtels',
  },
  {
    title: 'Hôtels avec vue Kaaba',
    description: 'Vivez une expérience unique',
    image: kaabaViewImage,
    cta: 'Découvrir',
  },
];

function ArrowIcon() {
  return (
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
  );
}

function Hotels() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="hotels"
      style={{
        maxWidth: 1240,
        margin: '110px auto 0',
        padding: '0 48px',
      }}
    >
      <div
        ref={revealRef}
        className="reveal"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 24,
          marginBottom: 34,
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
            NOS ADRESSES SÉLECTIONNÉES
          </span>
          <h2
            style={{
              margin: '12px 0 0',
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 600,
              fontSize: 44,
              lineHeight: 1.1,
              color: '#F5EFE6',
            }}
          >
            Hôtels à Makkah &amp; Madinah
          </h2>
        </div>
        <a
          href="#devis"
          style={{
            fontSize: 13.5,
            fontWeight: 600,
            color: '#E6C878',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          Demander un devis
          <ArrowIcon />
        </a>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: 20,
        }}
      >
        {hotels.map((hotel) => (
          <a
            key={hotel.title}
            href="#devis"
            className="hover-lift"
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              minHeight: 360,
              borderRadius: 20,
              overflow: 'hidden',
              border: '1px solid rgba(245,239,230,0.08)',
              color: 'inherit',
              textDecoration: 'none',
              isolation: 'isolate',
            }}
          >
            <img
              src={hotel.image}
              alt={hotel.title}
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
                  'linear-gradient(180deg,rgba(20,17,14,0.05) 0%,rgba(20,17,14,0.55) 55%,rgba(20,17,14,0.92) 100%)',
                zIndex: -1,
              }}
            />
            <div
              style={{
                padding: '22px 24px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 26,
                  fontWeight: 600,
                  color: '#F5EFE6',
                  lineHeight: 1.15,
                }}
              >
                {hotel.title}
              </div>
              <div
                style={{
                  fontSize: 13.5,
                  color: 'rgba(245,239,230,0.72)',
                  lineHeight: 1.5,
                }}
              >
                {hotel.description}
              </div>
              <span
                style={{
                  marginTop: 8,
                  alignSelf: 'flex-start',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '9px 16px',
                  borderRadius: 999,
                  border: '1px solid rgba(230,200,120,0.5)',
                  color: '#E6C878',
                  fontSize: 12.5,
                  fontWeight: 700,
                  letterSpacing: '0.4px',
                }}
              >
                {hotel.cta}
                <ArrowIcon />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Hotels;
