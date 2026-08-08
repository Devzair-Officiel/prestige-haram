import { useReveal } from '../../../hooks/useReveal';

const steps = [
  {
    number: '01',
    title: 'Vous nous parlez de votre séjour',
    description:
      'Dates, nombre de voyageurs, préférences, budget — un formulaire rapide ou un message WhatsApp suffit.',
  },
  {
    number: '02',
    title: 'Nous préparons une proposition sur mesure',
    description:
      'Hôtels sélectionnés, transferts, chauffeurs et accompagnement local pensés autour de vos besoins.',
  },
  {
    number: '03',
    title: 'Vous voyagez sereinement',
    description:
      'Un interlocuteur dédié sur place, disponible tout au long du séjour pour vous accompagner.',
  },
];

function HowItWorks() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="fonctionnement"
      style={{
        maxWidth: 1240,
        margin: '110px auto 0',
        padding: '0 48px',
      }}
    >
      <div
        ref={revealRef}
        className="reveal"
        style={{ textAlign: 'center', marginBottom: 48 }}
      >
        <span
          style={{
            fontSize: 12,
            letterSpacing: '3.6px',
            fontWeight: 700,
            color: '#E6C878',
          }}
        >
          COMMENT ÇA MARCHE
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
          Un séjour organisé en 3 étapes
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: 24,
        }}
      >
        {steps.map((step) => (
          <div
            key={step.number}
            style={{
              position: 'relative',
              padding: '34px 28px 30px',
              borderRadius: 20,
              background:
                'linear-gradient(180deg,#1B1712 0%,rgba(27,23,18,0.4) 100%)',
              border: '1px solid rgba(245,239,230,0.08)',
            }}
          >
            <div
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 56,
                fontWeight: 600,
                lineHeight: 1,
                color: 'transparent',
                WebkitTextStroke: '1px rgba(230,200,120,0.5)',
                marginBottom: 18,
              }}
            >
              {step.number}
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#F5EFE6',
                marginBottom: 10,
                lineHeight: 1.3,
              }}
            >
              {step.title}
            </div>
            <div
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: 'rgba(245,239,230,0.62)',
              }}
            >
              {step.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
