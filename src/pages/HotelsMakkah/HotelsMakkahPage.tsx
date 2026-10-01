import { useI18n } from '../../i18n';
import { SeoLandingPage } from '../../components/seo/SeoLandingPage';
import {
  SeoSectionHotels,
  SeoSectionCriteria,
  SeoSectionText,
  SeoSectionSteps,
} from '../../components/seo/sections';
import heroImage from '../../assets/header-hotel-mekkah.webp';
import sheratonImage from '../../assets/sheraton_jabal_al_kaaba.webp';
import tilalImage from '../../assets/tilal_jabal_al_kaaba.webp';
import marriottImage from '../../assets/marriott_jabal_omar.webp';
import hiltonImage from '../../assets/hilton_suites_jabal_omar.webp';
import vocoImage from '../../assets/voco.webp';
import kiswahImage from '../../assets/kiswah_towers.webp';

const SITE_ORIGIN = 'https://haramainprestige.com';

const MAKKAH_IMAGES = [
  sheratonImage,
  tilalImage,
  marriottImage,
  hiltonImage,
  vocoImage,
  kiswahImage,
];

function HotelsMakkahPage() {
  const { t, locale, pathFor } = useI18n();
  const page = t.hotelsMakkahPage;
  const homeHref = pathFor('home');
  const hotelsMakkahHref = pathFor('hotelsMakkah');
  const quoteHref = `${homeHref}#devis`;

  const makkahHotels = t.hotels.categories.makkah.hotels.map((h, i) => ({
    ...h,
    image: MAKKAH_IMAGES[i],
  }));

  return (
    <SeoLandingPage
      page="hotelsMakkah"
      metaTitle={t.meta.hotelsMakkah.title}
      metaDescription={t.meta.hotelsMakkah.description}
      breadcrumbLabel={locale === 'fr' ? 'Hôtels à Makkah' : 'فنادق مكة المكرمة'}
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
          name: locale === 'fr' ? 'Hôtels à Makkah' : 'فنادق مكة المكرمة',
          url: SITE_ORIGIN + hotelsMakkahHref,
        },
      ]}
    >
      <SeoSectionHotels
        title={page.hotelsSection.title}
        intro={page.hotelsSection.intro}
        hotels={makkahHotels}
        ctaLabel={page.hotelsSection.ctaLabel}
        quoteHref={quoteHref}
      />
      <SeoSectionCriteria
        eyebrow={page.haramSection.eyebrow}
        title={page.haramSection.title}
        paragraphs={page.haramSection.paragraphs}
        criteriaLabel={
          locale === 'fr' ? 'NOS CRITÈRES DE SÉLECTION' : 'معايير الاختيار'
        }
        criteria={page.haramSection.criteria}
      />
      <SeoSectionText
        eyebrow={page.choiceSection.eyebrow}
        title={page.choiceSection.title}
        paragraphs={page.choiceSection.paragraphs}
      />
      <SeoSectionText
        eyebrow={page.kaabaSection.eyebrow}
        title={page.kaabaSection.title}
        paragraphs={page.kaabaSection.paragraphs}
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

export default HotelsMakkahPage;
