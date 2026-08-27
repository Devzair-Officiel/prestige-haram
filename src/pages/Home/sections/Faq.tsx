import { useEffect, useState } from 'react';
import { useReveal } from '../../../hooks/useReveal';
import { useI18n } from '../../../i18n';
import type { FaqItem } from '../../../i18n/types';

type FaqRowProps = {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
};

function FaqRow({ item, isOpen, onToggle }: FaqRowProps) {
  return (
    <div
      style={{
        borderTop: '1px solid rgba(245,239,230,0.08)',
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          padding: '22px 4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          textAlign: 'start',
          color: '#F5EFE6',
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        <span>{item.question}</span>
        <span
          style={{
            flexShrink: 0,
            width: 30,
            height: 30,
            borderRadius: '50%',
            border: '1px solid rgba(245,239,230,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#E6C878',
            transition: 'transform 0.25s ease',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16">
            <path
              d="M8 3v10M3 8h10"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <div
        style={{
          overflow: 'hidden',
          maxHeight: isOpen ? 320 : 0,
          transition: 'max-height 0.35s ease',
        }}
      >
        <p
          style={{
            margin: 0,
            padding: '0 4px 22px',
            fontSize: 14.5,
            lineHeight: 1.65,
            color: 'rgba(245,239,230,0.66)',
            maxWidth: 720,
          }}
        >
          {item.answer}
        </p>
      </div>
    </div>
  );
}

const FAQ_SCHEMA_ID = 'faq-jsonld';

function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const revealRef = useReveal<HTMLDivElement>();
  const { t } = useI18n();
  const faqItems = t.faq.items;

  // Injecte le FAQPage JSON-LD à partir de la même source que le rendu :
  // le contenu balisé suit la locale active — Google reçoit les Q/R
  // dans la même langue que la page.
  useEffect(() => {
    const payload = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };
    let script = document.getElementById(
      FAQ_SCHEMA_ID,
    ) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = FAQ_SCHEMA_ID;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(payload);
    return () => {
      const existing = document.getElementById(FAQ_SCHEMA_ID);
      if (existing) existing.remove();
    };
  }, [faqItems]);

  return (
    <section
      id="faq"
      className="container-pad section-pad-y"
      style={{
        maxWidth: 960,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <div
        ref={revealRef}
        className="reveal"
        style={{ textAlign: 'center', marginBottom: 34 }}
      >
        <span
          style={{
            fontSize: 12,
            letterSpacing: '3.6px',
            fontWeight: 700,
            color: '#E6C878',
          }}
        >
          {t.faq.eyebrow}
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
          {t.faq.title}
        </h2>
      </div>

      <div style={{ borderBottom: '1px solid rgba(245,239,230,0.08)' }}>
        {faqItems.map((item, index) => (
          <FaqRow
            key={item.question}
            item={item}
            isOpen={openIndex === index}
            onToggle={() =>
              setOpenIndex((current) => (current === index ? null : index))
            }
          />
        ))}
      </div>
    </section>
  );
}

export default Faq;
