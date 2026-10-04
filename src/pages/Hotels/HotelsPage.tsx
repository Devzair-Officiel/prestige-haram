import { useI18n } from '../../i18n';
import { SeoLandingPage } from '../../components/seo/SeoLandingPage';
import {
  SeoSectionText,
  SeoSectionCriteria,
  SeoSectionSteps,
} from '../../components/seo/sections';
import heroImage480 from '../../assets/hotel-page-480.webp';
import heroImage800 from '../../assets/hotel-page-800.webp';
import heroImage1200 from '../../assets/hotel-page-1200.webp';

const SITE_ORIGIN = 'https://haramainprestige.com';

function HotelsPage() {
  const { t, locale, pathFor } = useI18n();
  const page = t.hotelsPage;
  const homeHref = pathFor('home');
  const hotelsHref = pathFor('hotels');
  const hotelsMakkahHref = pathFor('hotelsMakkah');
  const hotelsMadinahHref = pathFor('hotelsMadinah');
  const chambreVueKaabaHref = pathFor('chambreVueKaaba');
  const quoteHref = `${homeHref}#devis`;

  return (
    <SeoLandingPage
      page="hotels"
      metaTitle={t.meta.hotels.title}
      metaDescription={t.meta.hotels.description}
      breadcrumbLabel={locale === 'fr' ? 'Hôtels' : 'الفنادق'}
      hero={{
        backHomeLabel: page.backHome,
        backHomeHref: homeHref,
        eyebrow: page.hero.eyebrow,
        title: page.hero.title,
        intro: page.hero.intro,
        ctaPrimary: { label: page.hero.ctaPrimary, href: quoteHref },
        ctaSecondary: {
          label: page.hero.ctaSecondary,
          href: '#hotels-haramain',
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
          name: locale === 'fr' ? 'Hôtels' : 'الفنادق',
          url: SITE_ORIGIN + hotelsHref,
        },
      ]}
    >
      <SeoSectionText
        id="hotels-haramain"
        eyebrow={page.introSection.eyebrow}
        title={page.introSection.title}
        paragraphs={page.introSection.paragraphs}
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
      <SeoSectionText
        eyebrow={page.madinahSection.eyebrow}
        title={page.madinahSection.title}
        paragraphs={page.madinahSection.paragraphs}
        discoverLink={{
          label: page.madinahSection.madinahLinkLabel,
          href: hotelsMadinahHref,
        }}
      />
      <SeoSectionText
        eyebrow={page.kaabaSection.eyebrow}
        title={page.kaabaSection.title}
        paragraphs={page.kaabaSection.paragraphs}
        discoverLink={{
          label: page.kaabaSection.kaabaLinkLabel,
          href: chambreVueKaabaHref,
        }}
      />
      <SeoSectionText
        eyebrow={page.doubleSection.eyebrow}
        title={page.doubleSection.title}
        paragraphs={page.doubleSection.paragraphs}
      />
      <SeoSectionCriteria
        eyebrow={page.criteresSection.eyebrow}
        title={page.criteresSection.title}
        paragraphs={page.criteresSection.paragraphs}
        criteriaLabel={page.criteresSection.criteriaLabel}
        criteria={page.criteresSection.criteria}
      />
      <SeoSectionSteps
        id="fonctionnement-hotels"
        eyebrow={page.fonctionnementSection.eyebrow}
        title={page.fonctionnementSection.title}
        paragraphs={page.fonctionnementSection.paragraphs}
        steps={page.fonctionnementSection.steps}
      />
    </SeoLandingPage>
  );
}

export default HotelsPage;
