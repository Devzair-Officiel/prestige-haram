import { useI18n } from '../../i18n';
import { SeoLandingPage } from '../../components/seo/SeoLandingPage';
import {
  SeoSectionText,
  SeoSectionCriteria,
  SeoSectionSteps,
} from '../../components/seo/sections';
import heroImage from '../../assets/header-hotel-mekkah.webp';

const SITE_ORIGIN = 'https://haramainprestige.com';

function TransfertJeddahMakkahPage() {
  const { t, locale, pathFor } = useI18n();
  const page = t.transfertJeddahMakkahPage;
  const homeHref = pathFor('home');
  const transfertHref = pathFor('transfertJeddahMakkah');
  const hotelsMakkahHref = pathFor('hotelsMakkah');
  const quoteHref = `${homeHref}#devis`;

  return (
    <SeoLandingPage
      page="transfertJeddahMakkah"
      metaTitle={t.meta.transfertJeddahMakkah.title}
      metaDescription={t.meta.transfertJeddahMakkah.description}
      breadcrumbLabel={
        locale === 'fr' ? 'Transfert Jeddah \u2013 Makkah' : 'التوصيل جدة \u2013 مكة'
      }
      hero={{
        backHomeLabel: page.backHome,
        backHomeHref: homeHref,
        eyebrow: page.hero.eyebrow,
        title: page.hero.title,
        intro: page.hero.intro,
        ctaPrimary: { label: page.hero.ctaPrimary, href: quoteHref },
        ctaSecondary: {
          label: page.hero.ctaSecondary,
          href: '#fonctionnement-transfert',
        },
        image: { src: heroImage, alt: page.hero.imageAlt },
      }}
      faq={{ title: page.faq.title, items: page.faq.items }}
      finalCta={{
        eyebrow: page.ctaBlock.eyebrow,
        title: page.ctaBlock.title,
        paragraph: page.ctaBlock.paragraph,
        ctaPrimary: { label: page.ctaBlock.ctaPrimary, href: quoteHref },
        ctaSecondary: {
          label: page.ctaBlock.ctaSecondary,
          href: 'https://wa.me/33773157902',
        },
      }}
      jsonLdBreadcrumbItems={[
        {
          name: locale === 'fr' ? 'Accueil' : 'الرئيسية',
          url: SITE_ORIGIN + homeHref,
        },
        {
          name:
            locale === 'fr'
              ? 'Transfert Jeddah \u2013 Makkah'
              : 'التوصيل جدة \u2013 مكة',
          url: SITE_ORIGIN + transfertHref,
        },
      ]}
    >
      <SeoSectionText
        eyebrow={page.trajetSection.eyebrow}
        title={page.trajetSection.title}
        paragraphs={page.trajetSection.paragraphs}
      />
      <SeoSectionCriteria
        eyebrow={page.criteresSection.eyebrow}
        title={page.criteresSection.title}
        paragraphs={page.criteresSection.paragraphs}
        criteriaLabel={page.criteresSection.criteriaLabel}
        criteria={page.criteresSection.criteria}
      />
      <SeoSectionText
        eyebrow={page.arriveeSection.eyebrow}
        title={page.arriveeSection.title}
        paragraphs={page.arriveeSection.paragraphs}
      />
      <SeoSectionText
        eyebrow={page.retourSection.eyebrow}
        title={page.retourSection.title}
        paragraphs={page.retourSection.paragraphs}
      />
      <SeoSectionText
        eyebrow={page.reservationSection.eyebrow}
        title={page.reservationSection.title}
        paragraphs={page.reservationSection.paragraphs}
      />
      <SeoSectionText
        eyebrow={page.makkahSection.eyebrow}
        title={page.makkahSection.title}
        paragraphs={page.makkahSection.paragraphs}
        discoverLink={{
          label: page.makkahSection.makkahLinkLabel,
          href: hotelsMakkahHref,
        }}
      />
      <SeoSectionSteps
        id="fonctionnement-transfert"
        eyebrow={page.fonctionnementSection.eyebrow}
        title={page.fonctionnementSection.title}
        paragraphs={page.fonctionnementSection.paragraphs}
        steps={page.fonctionnementSection.steps}
      />
    </SeoLandingPage>
  );
}

export default TransfertJeddahMakkahPage;
