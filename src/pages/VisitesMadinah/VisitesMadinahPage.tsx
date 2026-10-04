import { useI18n } from '../../i18n';
import { SeoLandingPage } from '../../components/seo/SeoLandingPage';
import {
  SeoSectionText,
  SeoSectionCriteria,
  SeoSectionSteps,
} from '../../components/seo/sections';
import heroImage from '../../assets/masjid_nabawi.webp';

const SITE_ORIGIN = 'https://haramainprestige.com';

function VisitesMadinahPage() {
  const { t, locale, pathFor } = useI18n();
  const page = t.visitesMadinahPage;
  const homeHref = pathFor('home');
  const visitesMadinahHref = pathFor('visitesMadinah');
  const hotelsMadinahHref = pathFor('hotelsMadinah');
  const chauffeurHref = pathFor('chauffeurPriveMakkahMadinah');
  const visitesMakkahHref = pathFor('visitesMakkah');
  const quoteHref = `${homeHref}#devis`;

  return (
    <SeoLandingPage
      page="visitesMadinah"
      metaTitle={t.meta.visitesMadinah.title}
      metaDescription={t.meta.visitesMadinah.description}
      breadcrumbLabel={
        locale === 'fr' ? 'Visites à Madinah' : 'الزيارات في المدينة المنورة'
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
          href: '#fonctionnement-visites-madinah',
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
            locale === 'fr' ? 'Visites à Madinah' : 'الزيارات في المدينة المنورة',
          url: SITE_ORIGIN + visitesMadinahHref,
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
        eyebrow={page.personalisationSection.eyebrow}
        title={page.personalisationSection.title}
        paragraphs={page.personalisationSection.paragraphs}
      />
      <SeoSectionText
        eyebrow={page.hotelSection.eyebrow}
        title={page.hotelSection.title}
        paragraphs={page.hotelSection.paragraphs}
        discoverLink={{
          label: page.hotelSection.hotelLinkLabel,
          href: hotelsMadinahHref,
        }}
      />
      <SeoSectionText
        eyebrow={page.chauffeurSection.eyebrow}
        title={page.chauffeurSection.title}
        paragraphs={page.chauffeurSection.paragraphs}
        discoverLinks={[
          { label: page.chauffeurSection.chauffeurLinkLabel, href: chauffeurHref },
          { label: page.chauffeurSection.visitesMakkahLinkLabel, href: visitesMakkahHref },
        ]}
      />
      <SeoSectionSteps
        id="fonctionnement-visites-madinah"
        eyebrow={page.fonctionnementSection.eyebrow}
        title={page.fonctionnementSection.title}
        paragraphs={page.fonctionnementSection.paragraphs}
        steps={page.fonctionnementSection.steps}
      />
    </SeoLandingPage>
  );
}

export default VisitesMadinahPage;
