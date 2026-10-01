import type { ReactNode } from 'react';

export function SectionEyebrow({ text }: { text: string }) {
  return (
    <span
      className="section-eyebrow"
      style={{
        display: 'block',
        fontSize: 11.5,
        letterSpacing: '3.6px',
        fontWeight: 700,
        color: '#E6C878',
        marginBottom: 16,
      }}
    >
      {text}
    </span>
  );
}

export function SectionH2({ children }: { children: ReactNode }) {
  return (
    <h2
      style={{
        margin: '0 0 28px',
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: 'clamp(26px, 4vw, 36px)',
        fontWeight: 600,
        lineHeight: 1.1,
        color: '#F5EFE6',
      }}
    >
      {children}
    </h2>
  );
}

export function BodyParagraph({
  children,
  style,
}: {
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <p
      style={{
        margin: '0 0 22px',
        fontSize: 15.5,
        lineHeight: 1.75,
        color: 'rgba(245,239,230,0.72)',
        maxWidth: 760,
        ...style,
      }}
    >
      {children}
    </p>
  );
}
