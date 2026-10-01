import { useState } from 'react';
import type { FaqItem } from './types';

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const itemId = `faq-item-${i}`;
        const panelId = `faq-panel-${i}`;
        return (
          <div key={i} style={{ borderTop: '1px solid rgba(245,239,230,0.08)' }}>
            <h3 style={{ margin: 0 }}>
              <button
                id={itemId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  padding: '24px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#F5EFE6',
                  fontSize: 15.5,
                  fontWeight: 600,
                  lineHeight: 1.4,
                  textAlign: 'left',
                  fontFamily: 'inherit',
                }}
              >
                <span>{item.question}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    transition: 'transform 0.2s ease',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    color: '#E6C878',
                  }}
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={itemId}
              hidden={!isOpen}
              style={{
                paddingBottom: isOpen ? 24 : 0,
                fontSize: 15,
                lineHeight: 1.7,
                color: 'rgba(245,239,230,0.68)',
                maxWidth: 760,
              }}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
      <div style={{ borderTop: '1px solid rgba(245,239,230,0.08)' }} />
    </div>
  );
}
