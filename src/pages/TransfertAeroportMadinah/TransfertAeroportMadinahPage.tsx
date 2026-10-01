import { useI18n } from '../../i18n';
import { SeoLandingPage } from '../../components/seo/SeoLandingPage';
import {
  SeoSectionText,
  SeoSectionCriteria,
  SeoSectionSteps,
} from '../../components/seo/sections';
import heroImage from '../../assets/header-hotel-madinah.webp';

const SITE_ORIGIN = 'https://haramainprestige.com';

function TransfertAeroportMadinahPage() {
  const { t, locale, pathFor } = useI18n();
  const page = t.transfertAeroportMadinahPage;
  const homeHref = pathFor('home');
  const transfertHref = pathFor('transfertAeroportMadinah');
  const hotelsMadinahHref = pathFor('hotelsMadinah');
  const quoteHref = `${homeHref}#devis`;

  return (
    <SeoLandingPage
      page="transfertAeroportMadinah"
      metaTitle={t.meta.transfertAeroportMadinah.title}
      metaDescription={t.meta.transfertAeroportMadinah.description}
      breadcrumbLabel={
        locale === 'fr' ? 'Transfert aéroport Madinah' : 'التوصيل من مطار المدينة المنورة'
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
          href: '#fonctionnement-transfert-madinah',
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
              ? 'Transfert aéroport Madinah'
              : 'التوصيل من مطار المدينة المنورة',
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
        eyebrow={page.aeroportSection.eyebrow}
        title={page.aeroportSection.title}
        paragraphs={page.aeroportSection.paragraphs}
      />
      <SeoSectionText
        eyebrow={page.retourSection.eyebrow}
        title={page.retourSection.title}
        paragraphs={page.retourSection.paragraphs}
      />
      <SeoSectionText
        eyebrow={page.nabawiSection.eyebrow}
        title={page.nabawiSection.title}
        paragraphs={page.nabawiSection.paragraphs}
        discoverLink={{
          label: page.nabawiSection.madinahLinkLabel,
          href: hotelsMadinahHref,
        }}
      />
      <SeoSectionText
        eyebrow={page.reservationSection.eyebrow}
        title={page.reservationSection.title}
        paragraphs={page.reservationSection.paragraphs}
      />
      <SeoSectionSteps
        id="fonctionnement-transfert-madinah"
        eyebrow={page.fonctionnementSection.eyebrow}
        title={page.fonctionnementSection.title}
        paragraphs={page.fonctionnementSection.paragraphs}
        steps={page.fonctionnementSection.steps}
      />
    </SeoLandingPage>
  );
}

export default TransfertAeroportMadinahPage;
