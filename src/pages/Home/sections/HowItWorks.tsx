import { useReveal } from '../../../hooks/useReveal';
import { useI18n } from '../../../i18n';

function HowItWorks() {
  const revealRef = useReveal<HTMLDivElement>();
  const { t } = useI18n();

  return (
    <section
      id="fonctionnement"
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
        style={{ textAlign: 'center', marginBottom: 48 }}
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
          {t.howItWorks.eyebrow}
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
          {t.howItWorks.title}
        </h2>
      </div>

      <div className="grid-3" style={{ gap: 24 }}>
        {t.howItWorks.steps.map((step) => (
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
