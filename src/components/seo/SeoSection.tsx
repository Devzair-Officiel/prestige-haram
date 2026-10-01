import type { ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';

export function SeoSection({ children, id }: { children: ReactNode; id?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section
      id={id}
      className="container-pad"
      style={{
        maxWidth: 1280,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: 'clamp(64px, 9vw, 96px)',
        paddingBottom: 'clamp(64px, 9vw, 96px)',
        borderTop: '1px solid rgba(245,239,230,0.06)',
      }}
    >
      <div ref={ref} className="reveal">
        {children}
      </div>
    </section>
  );
}
