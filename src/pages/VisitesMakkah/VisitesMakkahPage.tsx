import { useI18n } from '../../i18n';
import { SeoLandingPage } from '../../components/seo/SeoLandingPage';
import {
  SeoSectionText,
  SeoSectionCriteria,
  SeoSectionSteps,
} from '../../components/seo/sections';
import heroImage from '../../assets/header-hotel-mekkah.webp';

const SITE_ORIGIN = 'https://haramainprestige.com';

function VisitesMakkahPage() {
  const { t, locale, pathFor } = useI18n();
  const page = t.visitesMakkahPage;
  const homeHref = pathFor('home');
  const visitesMakkahHref = pathFor('visitesMakkah');
  const hotelsMakkahHref = pathFor('hotelsMakkah');
  const chauffeurHref = pathFor('chauffeurPriveMakkahMadinah');
  const visitesMadinahHref = pathFor('visitesMadinah');
  const quoteHref = `${homeHref}#devis`;

  return (
    <SeoLandingPage
      page="visitesMakkah"
      metaTitle={t.meta.visitesMakkah.title}
      metaDescription={t.meta.visitesMakkah.description}
      breadcrumbLabel={
        locale === 'fr' ? 'Visites à Makkah' : 'الزيارات في مكة المكرمة'
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
          href: '#fonctionnement-visites-makkah',
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
            locale === 'fr' ? 'Visites à Makkah' : 'الزيارات في مكة المكرمة',
          url: SITE_ORIGIN + visitesMakkahHref,
        },
      ]}
    >
      <SeoSectionText
        eyebrow={page.decouvrirSection.eyebrow}
        title={page.decouvrirSection.title}
        paragraphs={page.decouvrirSection.paragraphs}
      />
      <SeoSectionCriteria
        eyebrow={page.lieuxSection.eyebrow}
        title={page.lieuxSection.title}
        paragraphs={page.lieuxSection.paragraphs}
        criteriaLabel={page.lieuxSection.criteriaLabel}
        criteria={page.lieuxSection.criteria}
      />
      <SeoSectionText
        eyebrow={page.ziyaratSection.eyebrow}
        title={page.ziyaratSection.title}
        paragraphs={page.ziyaratSection.paragraphs}
      />
      <SeoSectionText
        eyebrow={page.hadjSection.eyebrow}
        title={page.hadjSection.title}
        paragraphs={page.hadjSection.paragraphs}
      />
      <SeoSectionText
        eyebrow={page.hotelSection.eyebrow}
        title={page.hotelSection.title}
        paragraphs={page.hotelSection.paragraphs}
        discoverLink={{
          label: page.hotelSection.hotelLinkLabel,
          href: hotelsMakkahHref,
        }}
      />
      <SeoSectionText
        eyebrow={page.chauffeurSection.eyebrow}
        title={page.chauffeurSection.title}
        paragraphs={page.chauffeurSection.paragraphs}
        discoverLinks={[
          { label: page.chauffeurSection.chauffeurLinkLabel, href: chauffeurHref },
          { label: page.chauffeurSection.visitesMadinahLinkLabel, href: visitesMadinahHref },
        ]}
      />
      <SeoSectionSteps
        id="fonctionnement-visites-makkah"
        eyebrow={page.fonctionnementSection.eyebrow}
        title={page.fonctionnementSection.title}
        paragraphs={page.fonctionnementSection.paragraphs}
        steps={page.fonctionnementSection.steps}
      />
    </SeoLandingPage>
  );
}

export default VisitesMakkahPage;
