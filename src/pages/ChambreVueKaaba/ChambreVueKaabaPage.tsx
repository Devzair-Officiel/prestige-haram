import { useI18n } from '../../i18n';
import { SeoLandingPage } from '../../components/seo/SeoLandingPage';
import {
  SeoSectionHotels,
  SeoSectionCriteria,
  SeoSectionText,
  SeoSectionSteps,
} from '../../components/seo/sections';
import heroImage from '../../assets/fairmont_clock_royal.webp';
import sheratonImage from '../../assets/sheraton_jabal_al_kaaba.webp';
import tilalImage from '../../assets/tilal_jabal_al_kaaba.webp';
import marriottImage from '../../assets/marriott_jabal_omar.webp';
import hiltonImage from '../../assets/hilton_suites_jabal_omar.webp';
import vocoImage from '../../assets/voco.webp';
import kiswahImage from '../../assets/kiswah_towers.webp';

const SITE_ORIGIN = 'https://haramainprestige.com';

const KAABA_IMAGES = [
  sheratonImage,
  tilalImage,
  marriottImage,
  hiltonImage,
  vocoImage,
  kiswahImage,
];

function ChambreVueKaabaPage() {
  const { t, locale, pathFor } = useI18n();
  const page = t.chambreVueKaabaPage;
  const homeHref = pathFor('home');
  const chambreVueKaabaHref = pathFor('chambreVueKaaba');
  const hotelsMakkahHref = pathFor('hotelsMakkah');
  const quoteHref = `${homeHref}#devis`;

  const kaabaHotels = t.hotels.categories.kaaba.hotels.map((h, i) => ({
    ...h,
    image: KAABA_IMAGES[i],
  }));

  return (
    <SeoLandingPage
      page="chambreVueKaaba"
      metaTitle={t.meta.chambreVueKaaba.title}
      metaDescription={t.meta.chambreVueKaaba.description}
      breadcrumbLabel={
        locale === 'fr' ? 'Chambre vue Kaaba' : 'غرفة بإطلالة على الكعبة'
      }
      hero={{
        backHomeLabel: page.backHome,
        backHomeHref: homeHref,
        eyebrow: page.hero.eyebrow,
        title: page.hero.title,
        intro: page.hero.intro,
        ctaPrimary: { label: page.hero.ctaPrimary, href: quoteHref },
        ctaSecondary: { label: page.hero.ctaSecondary, href: '#hotels-liste' },
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
          name: locale === 'fr' ? 'Chambre vue Kaaba' : 'غرفة بإطلالة على الكعبة',
          url: SITE_ORIGIN + chambreVueKaabaHref,
        },
      ]}
    >
      <SeoSectionHotels
        title={page.hotelsSection.title}
        intro={page.hotelsSection.intro}
        hotels={kaabaHotels}
        ctaLabel={page.hotelsSection.ctaLabel}
        quoteHref={quoteHref}
      />
      <SeoSectionCriteria
        eyebrow={page.categorySection.eyebrow}
        title={page.categorySection.title}
        paragraphs={page.categorySection.paragraphs}
        criteriaLabel={page.categorySection.criteriaLabel}
        criteria={page.categorySection.criteria}
      />
      <SeoSectionText
        eyebrow={page.viewDiffSection.eyebrow}
        title={page.viewDiffSection.title}
        paragraphs={page.viewDiffSection.paragraphs}
      />
      <SeoSectionText
        eyebrow={page.priceSection.eyebrow}
        title={page.priceSection.title}
        paragraphs={page.priceSection.paragraphs}
      />
      <SeoSectionText
        eyebrow={page.choiceSection.eyebrow}
        title={page.choiceSection.title}
        paragraphs={page.choiceSection.paragraphs}
        discoverLink={{
          label: page.choiceSection.makkahLinkLabel,
          href: hotelsMakkahHref,
        }}
      />
      <SeoSectionSteps
        eyebrow={page.bookingSection.eyebrow}
        title={page.bookingSection.title}
        paragraphs={page.bookingSection.paragraphs}
        steps={page.bookingSection.steps}
      />
    </SeoLandingPage>
  );
}

export default ChambreVueKaabaPage;
