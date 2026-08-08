import ImagePlaceholder from '../../../components/ui/ImagePlaceholder';
import { useReveal } from '../../../hooks/useReveal';

const bullets = [
  'Équipe francophone présente à Makkah &amp; Madinah, joignable 7j/7.',
  'Accords directs avec les hôtels et prestataires locaux, sans intermédiaire.',
  'Un seul interlocuteur de la première question au retour de séjour.',
  'Suivi personnalisé, adapté aux familles, aux couples et aux voyageurs seuls.',
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function About() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="apropos"
      style={{
        marginTop: 130,
        background: '#F5EFE6',
        color: '#14110E',
      }}
    >
      <div
        ref={revealRef}
        className="reveal"
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '90px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <span
            style={{
              fontSize: 12,
              letterSpacing: '3.6px',
              fontWeight: 700,
              color: '#B4892C',
            }}
          >
            PRÉSENCE LOCALE
          </span>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 600,
              fontSize: 46,
              lineHeight: 1.08,
              color: '#14110E',
            }}
          >
            Une équipe sur place, à votre écoute
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 16,
              lineHeight: 1.7,
              color: 'rgba(20,17,14,0.72)',
              maxWidth: 500,
            }}
          >
            Haramain Prestige est né du besoin d'un accompagnement humain et
            fiable à Makkah &amp; Madinah. Nous vivons sur place, nous
            connaissons les hôtels, les quartiers et les usages — et nous
            construisons chaque séjour avec la même attention.
          </p>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '8px 0 0',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            {bullets.map((bullet) => (
              <li
                key={bullet}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  fontSize: 15,
                  color: 'rgba(20,17,14,0.82)',
                  lineHeight: 1.55,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: 'rgba(180,137,44,0.14)',
                    color: '#B4892C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 1,
                  }}
                >
                  <CheckIcon />
                </span>
                <span dangerouslySetInnerHTML={{ __html: bullet }} />
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            position: 'relative',
            aspectRatio: '4 / 5',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(20,17,14,0.18)',
          }}
        >
          <ImagePlaceholder label="Photo — Équipe sur place à Makkah" />
        </div>
      </div>
    </section>
  );
}

export default About;
