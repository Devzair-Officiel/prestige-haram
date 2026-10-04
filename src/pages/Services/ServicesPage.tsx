import { useI18n } from '../../i18n';
import { SeoLandingPage } from '../../components/seo/SeoLandingPage';
import {
  SeoSectionText,
  SeoSectionSteps,
} from '../../components/seo/sections';
import heroImage480 from '../../assets/services-480.webp';
import heroImage800 from '../../assets/services-800.webp';
import heroImage1200 from '../../assets/services-1200.webp';

const SITE_ORIGIN = 'https://haramainprestige.com';

function ServicesPage() {
  const { t, locale, pathFor } = useI18n();
  const page = t.servicesPage;
  const homeHref = pathFor('home');
  const servicesHref = pathFor('services');
  const transfertJeddahHref = pathFor('transfertJeddahMakkah');
  const transfertMadinahHref = pathFor('transfertAeroportMadinah');
  const chauffeurHref = pathFor('chauffeurPriveMakkahMadinah');
  const visitesMadinahHref = pathFor('visitesMadinah');
  const visitesMakkahHref = pathFor('visitesMakkah');
  const quoteHref = `${homeHref}#devis`;

  return (
    <SeoLandingPage
      page="services"
      metaTitle={t.meta.services.title}
      metaDescription={t.meta.services.description}
      breadcrumbLabel={locale === 'fr' ? 'Services' : 'الخدمات'}
      hero={{
        backHomeLabel: page.backHome,
        backHomeHref: homeHref,
        eyebrow: page.hero.eyebrow,
        title: page.hero.title,
        intro: page.hero.intro,
        ctaPrimary: { label: page.hero.ctaPrimary, href: quoteHref },
        ctaSecondary: {
          label: page.hero.ctaSecondary,
          href: '#services-haramain',
        },
        image: {
          src: heroImage1200,
          alt: page.hero.imageAlt,
          srcSet: `${heroImage480} 480w, ${heroImage800} 800w, ${heroImage1200} 1200w`,
          sizes: '(max-width: 760px) calc(100vw - 32px), 50vw',
        },
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
          name: locale === 'fr' ? 'Services' : 'الخدمات',
          url: SITE_ORIGIN + servicesHref,
        },
      ]}
    >
      <SeoSectionText
        id="services-haramain"
        eyebrow={page.introSection.eyebrow}
        title={page.introSection.title}
        paragraphs={page.introSection.paragraphs}
      />
      <SeoSectionText
        eyebrow={page.transfertsSection.eyebrow}
        title={page.transfertsSection.title}
        paragraphs={page.transfertsSection.paragraphs}
        discoverLinks={[
          { label: page.transfertsSection.jeddahLinkLabel, href: transfertJeddahHref },
          { label: page.transfertsSection.madinahLinkLabel, href: transfertMadinahHref },
        ]}
      />
      <SeoSectionText
        eyebrow={page.chauffeurSection.eyebrow}
        title={page.chauffeurSection.title}
        paragraphs={page.chauffeurSection.paragraphs}
        discoverLink={{
          label: page.chauffeurSection.chauffeurLinkLabel,
          href: chauffeurHref,
        }}
      />
      <SeoSectionText
        eyebrow={page.visitesMadinahSection.eyebrow}
        title={page.visitesMadinahSection.title}
        paragraphs={page.visitesMadinahSection.paragraphs}
        discoverLink={{
          label: page.visitesMadinahSection.visitesMadinahLinkLabel,
          href: visitesMadinahHref,
        }}
      />
      <SeoSectionText
        eyebrow={page.visitesMakkahSection.eyebrow}
        title={page.visitesMakkahSection.title}
        paragraphs={page.visitesMakkahSection.paragraphs}
        discoverLink={{
          label: page.visitesMakkahSection.visitesMakkahLinkLabel,
          href: visitesMakkahHref,
        }}
      />
      <SeoSectionText
        eyebrow={page.multiSection.eyebrow}
        title={page.multiSection.title}
        paragraphs={page.multiSection.paragraphs}
      />
      <SeoSectionSteps
        id="fonctionnement-services"
        eyebrow={page.fonctionnementSection.eyebrow}
        title={page.fonctionnementSection.title}
        paragraphs={page.fonctionnementSection.paragraphs}
        steps={page.fonctionnementSection.steps}
      />
    </SeoLandingPage>
  );
}

export default ServicesPage;
