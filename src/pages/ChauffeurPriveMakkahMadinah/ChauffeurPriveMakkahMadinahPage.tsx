import { useI18n } from '../../i18n';
import { SeoLandingPage } from '../../components/seo/SeoLandingPage';
import {
  SeoSectionText,
  SeoSectionCriteria,
  SeoSectionSteps,
} from '../../components/seo/sections';
import heroImage from '../../assets/header-transfert-jeddah-makkah.webp';

const SITE_ORIGIN = 'https://haramainprestige.com';

function ChauffeurPriveMakkahMadinahPage() {
  const { t, locale, pathFor } = useI18n();
  const page = t.chauffeurPriveMakkahMadinahPage;
  const homeHref = pathFor('home');
  const chauffeurHref = pathFor('chauffeurPriveMakkahMadinah');
  const hotelsMakkahHref = pathFor('hotelsMakkah');
  const hotelsMadinahHref = pathFor('hotelsMadinah');
  const visitesMakkahHref = pathFor('visitesMakkah');
  const visitesMadinahHref = pathFor('visitesMadinah');
  const transfertJeddahHref = pathFor('transfertJeddahMakkah');
  const transfertMadinahHref = pathFor('transfertAeroportMadinah');
  const quoteHref = `${homeHref}#devis`;

  return (
    <SeoLandingPage
      page="chauffeurPriveMakkahMadinah"
      metaTitle={t.meta.chauffeurPriveMakkahMadinah.title}
      metaDescription={t.meta.chauffeurPriveMakkahMadinah.description}
      breadcrumbLabel={
        locale === 'fr'
          ? 'Chauffeur privé Makkah & Madinah'
          : 'سائق خاص في مكة والمدينة'
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
          href: '#fonctionnement-chauffeur',
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
              ? 'Chauffeur privé Makkah & Madinah'
              : 'سائق خاص في مكة والمدينة',
          url: SITE_ORIGIN + chauffeurHref,
        },
      ]}
    >
      <SeoSectionText
        eyebrow={page.trajetPrincipalSection.eyebrow}
        title={page.trajetPrincipalSection.title}
        paragraphs={page.trajetPrincipalSection.paragraphs}
      />
      <SeoSectionCriteria
        eyebrow={page.criteresSection.eyebrow}
        title={page.criteresSection.title}
        paragraphs={page.criteresSection.paragraphs}
        criteriaLabel={page.criteresSection.criteriaLabel}
        criteria={page.criteresSection.criteria}
      />
      <SeoSectionText
        eyebrow={page.makkahSection.eyebrow}
        title={page.makkahSection.title}
        paragraphs={page.makkahSection.paragraphs}
        discoverLinks={[
          { label: page.makkahSection.makkahLinkLabel, href: hotelsMakkahHref },
          { label: page.makkahSection.visitesMakkahLinkLabel, href: visitesMakkahHref },
        ]}
      />
      <SeoSectionText
        eyebrow={page.madinahSection.eyebrow}
        title={page.madinahSection.title}
        paragraphs={page.madinahSection.paragraphs}
        discoverLinks={[
          { label: page.madinahSection.madinahLinkLabel, href: hotelsMadinahHref },
          { label: page.madinahSection.visitesMadinahLinkLabel, href: visitesMadinahHref },
        ]}
      />
      <SeoSectionText
        eyebrow={page.entreVillesSection.eyebrow}
        title={page.entreVillesSection.title}
        paragraphs={page.entreVillesSection.paragraphs}
      />
      <SeoSectionText
        eyebrow={page.chauffeurVsTransfertSection.eyebrow}
        title={page.chauffeurVsTransfertSection.title}
        paragraphs={page.chauffeurVsTransfertSection.paragraphs}
        discoverLinks={[
          {
            label: page.chauffeurVsTransfertSection.jeddahLinkLabel,
            href: transfertJeddahHref,
          },
          {
            label: page.chauffeurVsTransfertSection.madinahTransfertLinkLabel,
            href: transfertMadinahHref,
          },
        ]}
      />
      <SeoSectionText
        eyebrow={page.anticipationSection.eyebrow}
        title={page.anticipationSection.title}
        paragraphs={page.anticipationSection.paragraphs}
      />
      <SeoSectionSteps
        id="fonctionnement-chauffeur"
        eyebrow={page.fonctionnementSection.eyebrow}
        title={page.fonctionnementSection.title}
        paragraphs={page.fonctionnementSection.paragraphs}
        steps={page.fonctionnementSection.steps}
      />
    </SeoLandingPage>
  );
}

export default ChauffeurPriveMakkahMadinahPage;
