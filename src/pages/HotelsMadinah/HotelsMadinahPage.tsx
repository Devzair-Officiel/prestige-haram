import { useI18n } from '../../i18n';
import { SeoLandingPage } from '../../components/seo/SeoLandingPage';
import {
  SeoSectionHotels,
  SeoSectionCriteria,
  SeoSectionText,
  SeoSectionSteps,
} from '../../components/seo/sections';
import heroImage from '../../assets/header-hotel-madinah.webp';
import asSaafaImage from '../../assets/as_saafa.webp';
import crowneImage from '../../assets/crowne_plaza.webp';
import zamzamMadinahImage from '../../assets/zamzam_pullman_madinah.webp';
import myskImage from '../../assets/mysk_al_balad.webp';
import valyImage from '../../assets/valy_hotel.webp';

const SITE_ORIGIN = 'https://haramainprestige.com';

const MADINAH_IMAGES = [
  asSaafaImage,
  crowneImage,
  zamzamMadinahImage,
  myskImage,
  valyImage,
];

function HotelsMadinahPage() {
  const { t, locale, pathFor } = useI18n();
  const page = t.hotelsMadinahPage;
  const homeHref = pathFor('home');
  const hotelsMadinahHref = pathFor('hotelsMadinah');
  const quoteHref = `${homeHref}#devis`;

  const madinahHotels = t.hotels.categories.madinah.hotels.map((h, i) => ({
    ...h,
    image: MADINAH_IMAGES[i],
  }));

  return (
    <SeoLandingPage
      page="hotelsMadinah"
      metaTitle={t.meta.hotelsMadinah.title}
      metaDescription={t.meta.hotelsMadinah.description}
      breadcrumbLabel={locale === 'fr' ? 'Hôtels à Madinah' : 'فنادق المدينة المنورة'}
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
          name: locale === 'fr' ? 'Hôtels à Madinah' : 'فنادق المدينة المنورة',
          url: SITE_ORIGIN + hotelsMadinahHref,
        },
      ]}
    >
      <SeoSectionHotels
        title={page.hotelsSection.title}
        intro={page.hotelsSection.intro}
        hotels={madinahHotels}
        ctaLabel={page.hotelsSection.ctaLabel}
        quoteHref={quoteHref}
      />
      <SeoSectionCriteria
        eyebrow={page.nabawiSection.eyebrow}
        title={page.nabawiSection.title}
        paragraphs={page.nabawiSection.paragraphs}
        criteriaLabel={
          locale === 'fr' ? 'NOS CRITÈRES DE SÉLECTION' : 'معايير الاختيار'
        }
        criteria={page.nabawiSection.criteria}
      />
      <SeoSectionText
        eyebrow={page.choiceSection.eyebrow}
        title={page.choiceSection.title}
        paragraphs={page.choiceSection.paragraphs}
      />
      <SeoSectionText
        eyebrow={page.nabawiImportanceSection.eyebrow}
        title={page.nabawiImportanceSection.title}
        paragraphs={page.nabawiImportanceSection.paragraphs}
      />
      <SeoSectionText
        eyebrow={page.omraSection.eyebrow}
        title={page.omraSection.title}
        paragraphs={page.omraSection.paragraphs}
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

export default HotelsMadinahPage;
