import { useState } from 'react';
import { useReveal } from '../../../hooks/useReveal';

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: 'Êtes-vous une agence de voyage ?',
    answer:
      'Non, nous sommes une conciergerie de séjour. Nous ne vendons pas de packs tout inclus : nous vous aidons à réserver hôtels, transferts et déplacements sur mesure, et nous vous accompagnons sur place à Makkah & Madinah.',
  },
  {
    question: "Puis-je réserver seulement l'hôtel ?",
    answer:
      "Oui, vous pouvez ne réserver qu'un ou plusieurs services. Beaucoup de voyageurs nous demandent uniquement l'hôtel, ou uniquement le transfert aéroport. Vous choisissez ce dont vous avez besoin.",
  },
  {
    question: 'Comment obtenir un devis ?',
    answer:
      'Remplissez le formulaire en haut de page ou contactez-nous directement sur WhatsApp. Nous revenons vers vous dans la journée avec une proposition personnalisée et sans engagement.',
  },
  {
    question: 'Êtes-vous joignables une fois sur place ?',
    answer:
      "Oui, un interlocuteur dédié reste joignable pendant tout votre séjour, 7j/7. En cas d'imprévu (retard, changement de vol, besoin d'un transfert de dernière minute), nous sommes là.",
  },
];

type FaqItemProps = {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
};

function FaqRow({ item, isOpen, onToggle }: FaqItemProps) {
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
          textAlign: 'left',
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

function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="faq"
      style={{
        maxWidth: 960,
        margin: '110px auto 0',
        padding: '0 48px',
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
          QUESTIONS FRÉQUENTES
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
          Vos questions, nos réponses
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
