import { useEffect, type ReactNode } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import WhatsAppFloat from '../ui/WhatsAppFloat';
import { useReveal } from '../../hooks/useReveal';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { useI18n } from '../../i18n';
import { handleSpaNav } from '../../i18n/utils';
import type { PageKey } from '../../i18n/types';
import type { HeroConfig, FinalCtaConfig, FaqConfig, BreadcrumbItem } from './types';
import { SectionEyebrow, SectionH2 } from './primitives';
import { SeoSection } from './SeoSection';
import { FaqAccordion } from './FaqAccordion';

type SeoLandingPageProps = {
  page: PageKey;
  metaTitle: string;
  metaDescription: string;
  breadcrumbLabel: string;
  hero: HeroConfig;
  faq: FaqConfig;
  finalCta: FinalCtaConfig;
  jsonLdBreadcrumbItems: BreadcrumbItem[];
  children: ReactNode;
};

export function SeoLandingPage({
  page,
  metaTitle,
  metaDescription,
  breadcrumbLabel,
  hero,
  faq,
  finalCta,
  jsonLdBreadcrumbItems,
  children,
}: SeoLandingPageProps) {
  const { locale } = useI18n();
  const heroRef = useReveal<HTMLDivElement>();
  const ctaRef = useReveal<HTMLDivElement>();

  usePageMetadata({ title: metaTitle, description: metaDescription, page, locale });

  useEffect(() => {
    const breadcrumbId = `jsonld-breadcrumb-${page}`;
    const faqSchemaId = `jsonld-faq-${page}`;

    document.getElementById(breadcrumbId)?.remove();
    document.getElementById(faqSchemaId)?.remove();

    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.id = breadcrumbId;
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: jsonLdBreadcrumbItems.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    });
    document.head.appendChild(breadcrumbScript);

    const faqScript = document.createElement('script');
    faqScript.id = faqSchemaId;
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.items.map((faqItem) => ({
        '@type': 'Question',
        name: faqItem.question,
        acceptedAnswer: { '@type': 'Answer', text: faqItem.answer },
      })),
    });
    document.head.appendChild(faqScript);

    return () => {
      document.getElementById(breadcrumbId)?.remove();
      document.getElementById(faqSchemaId)?.remove();
    };
  }, [page, faq.items, jsonLdBreadcrumbItems]);

  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb */}
        <nav
          aria-label={locale === 'fr' ? 'Fil d\u2019Ariane' : 'مسار التنقل'}
          className="container-pad"
          style={{
            maxWidth: 1280,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: 20,
            paddingBottom: 0,
          }}
        >
          <ol
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '4px 8px',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              fontSize: 13,
              color: 'rgba(245,239,230,0.5)',
            }}
          >
            <li>
              <a
                href={hero.backHomeHref}
                onClick={(e) => handleSpaNav(e, hero.backHomeHref)}
                className="nav-link"
                style={{ color: 'rgba(245,239,230,0.5)' }}
              >
                {locale === 'fr' ? 'Accueil' : 'الرئيسية'}
              </a>
            </li>
            <li aria-hidden="true" style={{ opacity: 0.35 }}>›</li>
            <li aria-current="page" style={{ color: '#E6C878' }}>
              {breadcrumbLabel}
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <section
          id="hero"
          className="container-pad"
          style={{
            maxWidth: 1280,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: 'clamp(40px, 6vw, 64px)',
            paddingBottom: 'clamp(64px, 9vw, 96px)',
          }}
        >
          <div
            ref={heroRef}
            className="reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(32px, 5vw, 64px)',
              alignItems: 'center',
            }}
          >
            <div>
              <SectionEyebrow text={hero.eyebrow} />

              <h1
                className="section-title"
                style={{
                  margin: '0 0 26px',
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  lineHeight: 1.05,
                  color: '#F5EFE6',
                }}
              >
                {hero.title}
              </h1>

              <p
                style={{
                  margin: '0 0 30px',
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: 'rgba(245,239,230,0.72)',
                  maxWidth: 560,
                }}
              >
                {hero.intro}
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 12,
                  maxWidth: 460,
                }}
              >
                <a
                  href={hero.ctaPrimary.href}
                  onClick={(e) => handleSpaNav(e, hero.ctaPrimary.href)}
                  className="btn-primary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '10px 14px',
                    borderRadius: 12,
                    background: 'linear-gradient(135deg,#EBCE82,#C09A44)',
                    color: '#14110E',
                    fontWeight: 700,
                    fontSize: 13,
                    textAlign: 'center',
                    lineHeight: 1.3,
                  }}
                >
                  {hero.ctaPrimary.label}
                  <span className="btn-arrow" style={{ flexShrink: 0 }}>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
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
                </a>

                <a
                  href={hero.ctaSecondary.href}
                  onClick={(e) => handleSpaNav(e, hero.ctaSecondary.href)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 9,
                    padding: '10px 14px',
                    borderRadius: 12,
                    border: '1px solid rgba(245,239,230,0.22)',
                    background: 'rgba(20,17,14,0.35)',
                    color: '#F5EFE6',
                    fontWeight: 600,
                    fontSize: 13,
                    textAlign: 'center',
                    lineHeight: 1.3,
                  }}
                >
                  {hero.ctaSecondary.label}
                </a>
              </div>
            </div>

            <div
              style={{
                position: 'relative',
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                border: '1px solid rgba(245,239,230,0.08)',
                aspectRatio: '4 / 3',
              }}
            >
              <img
                src={hero.image.src}
                alt={hero.image.alt}
                width={1200}
                height={900}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                {...(hero.image.srcSet ? { srcSet: hero.image.srcSet } : {})}
                {...(hero.image.sizes ? { sizes: hero.image.sizes } : {})}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </section>

        {/* Middle sections injected by the calling page */}
        {children}

        {/* FAQ */}
        <SeoSection>
          <SectionH2>{faq.title}</SectionH2>
          <FaqAccordion items={faq.items} />
        </SeoSection>

        {/* CTA final */}
        <section
          className="container-pad"
          style={{
            maxWidth: 1280,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: 'clamp(56px, 8vw, 80px)',
            paddingBottom: 'clamp(72px, 10vw, 112px)',
            borderTop: '1px solid rgba(245,239,230,0.06)',
          }}
        >
          <div
            ref={ctaRef}
            className="reveal"
            style={{
              padding: 'clamp(32px, 5vw, 52px)',
              borderRadius: 20,
              background:
                'linear-gradient(135deg, rgba(230,200,120,0.09), rgba(192,154,68,0.04))',
              border: '1px solid rgba(230,200,120,0.18)',
              textAlign: 'center',
            }}
          >
            <SectionEyebrow text={finalCta.eyebrow} />
            <h2
              style={{
                margin: '0 0 20px',
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 'clamp(24px, 3.5vw, 34px)',
                fontWeight: 600,
                lineHeight: 1.12,
                color: '#F5EFE6',
              }}
            >
              {finalCta.title}
            </h2>
            <p
              style={{
                margin: '0 auto 28px',
                fontSize: 15.5,
                lineHeight: 1.7,
                color: 'rgba(245,239,230,0.68)',
                maxWidth: 580,
              }}
            >
              {finalCta.paragraph}
            </p>
            <div
              style={{
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <a
                href={finalCta.ctaPrimary.href}
                onClick={(e) => handleSpaNav(e, finalCta.ctaPrimary.href)}
                className="btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '14px 24px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg,#EBCE82,#C09A44)',
                  color: '#14110E',
                  fontWeight: 700,
                  fontSize: 14.5,
                }}
              >
                {finalCta.ctaPrimary.label}
                <span className="btn-arrow">
                  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
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
              </a>

              <a
                href={finalCta.ctaSecondary.href}
                onClick={(e) => handleSpaNav(e, finalCta.ctaSecondary.href)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '14px 24px',
                  borderRadius: 12,
                  border: '1px solid rgba(245,239,230,0.28)',
                  background: 'rgba(20,17,14,0.35)',
                  color: '#F5EFE6',
                  fontWeight: 600,
                  fontSize: 14.5,
                }}
              >
                {finalCta.ctaSecondary.label}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
