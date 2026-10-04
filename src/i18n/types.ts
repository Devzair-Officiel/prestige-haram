// Types partagés du système i18n. Sert de contrat entre `fr.ts` et
// `ar-SA.ts` : toute chaîne ajoutée en français DOIT être présente en
// arabe (et vice-versa) — le compilateur TypeScript refusera sinon.

export type Locale = 'fr' | 'ar-SA';

/** Direction textuelle induite par la locale. */
export type Direction = 'ltr' | 'rtl';

export type PageKey = 'home' | 'about' | 'legal' | 'privacy' | 'notFound' | 'hotelsMakkah' | 'hotelsMadinah' | 'chambreVueKaaba' | 'transfertJeddahMakkah' | 'transfertAeroportMadinah' | 'chauffeurPriveMakkahMadinah' | 'visitesMadinah' | 'visitesMakkah' | 'services' | 'hotels' | 'testimonials';

/** Une entrée FAQ, utilisée pour le rendu ET le JSON-LD FAQPage. */
export type FaqItem = {
  question: string;
  answer: string;
};

/** Une entrée témoignage. Les prénoms/villes sont conservés
 *  verbatim (identifient un vrai client) ; seule la citation est
 *  linguistiquement adaptée. */
export type TestimonialItem = {
  initial: string;
  name: string;
  location: string;
  quote: string;
};

/** Un hôtel affiché dans la section Hotels. Le `name` commercial
 *  n'est jamais traduit (identité de l'établissement). Seule la
 *  description l'est. */
export type HotelItem = {
  name: string;
  description: string;
};

/** Sections éditoriales longues (À propos, Mentions légales, Politique). */
export type EditorialBlock = {
  eyebrow: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  rows?: { label: string; value: string }[];
};

export type PageMeta = {
  title: string;
  description: string;
};

/** Forme complète des traductions. Chaque locale doit fournir cet
 *  objet dans son intégralité — pas d'entrée optionnelle. */
export interface Translations {
  common: {
    /** Label du sélecteur de langue pour l'autre langue. */
    languageFr: string;
    languageAr: string;
    languageSwitchAria: string;
    optional: string;
    required: string;
    email: string;
    whatsappPhoneDisplay: string;
    lastUpdated: string;
  };

  header: {
    logoAlt: string;
    brandLine1: string;
    brandLine2: string;
    navHome: string;
    navHotels: string;
    navServices: string;
    navAbout: string;
    navTestimonials: string;
    navFaq: string;
    navContact: string;
    ctaQuote: string;
    /** Labels du sous-menu Hôtels (ordre : Makkah, Madinah, Vue Kaaba). */
    hotelsMenu: string[];
    /** Labels du sous-menu Services (ordre : Transferts Jeddah, Transferts Madinah, Chauffeur, Visites Madinah, Visites Makkah). */
    servicesMenu: string[];
    hotelsMenuAria: string;
    servicesMenuAria: string;
    openMenu: string;
    closeMenu: string;
  };

  hero: {
    eyebrow: string;
    titleLead: string;
    titleCityMakkah: string;
    titleCityMadinah: string;
    titleTrailing: string;
    paragraph: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: { label: string }[];
    imageAlt: string;
  };

  quoteForm: {
    eyebrow: string;
    title: string;
    intro: string;
    requiredHint: string;
    servicesLegend: string;
    servicesHint: string;
    servicesEmptyWarn: string;
    servicesSelectedSingular: string;
    servicesSelectedPlural: string;
    services: {
      key: 'hotel' | 'transfer' | 'driver' | 'visit';
      label: string;
    }[];

    step1Title: string;
    cityLabel: string;
    cityPlaceholder: string;
    cityMakkah: string;
    cityMadinah: string;
    cityBoth: string;
    arrivalLabel: string;
    departureLabel: string;
    adultsLabel: string;
    childrenLabel: string;
    incrementAdult: string;
    decrementAdult: string;
    incrementChild: string;
    decrementChild: string;

    step2Title: string;
    step2InactiveNote: string;
    roomsLabel: string;
    roomsPlaceholder: string;
    roomsOptions: string[];
    categoryLabel: string;
    categoryDefault: string;
    categoryOptions: string[];
    kaabaLabel: string;
    kaabaDefault: string;
    kaabaOptions: string[];
    budgetLabel: string;
    budgetDefault: string;
    budgetOptions: string[];

    step3Title: string;
    nameLabel: string;
    namePlaceholder: string;
    whatsappLabel: string;
    indicatifAria: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;

    submit: string;
    submitting: string;
    privacyNote: string;

    toastSuccessTitle: string;
    toastSuccessMsg: string;
    toastErrorTitle: string;
    toastErrorGeneric: string;
    toastErrorNetwork: string;
    toastCloseAria: string;
  };

  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: { title: string; description: string }[];
    /** Libellés de liens par carte (ordre = cards). Tableau vide = pas de lien. */
    cardLinks: string[][];
    /** Lien de maillage interne vers la page hub /services. */
    discoverAll: string;
  };

  howItWorks: {
    eyebrow: string;
    title: string;
    steps: { number: string; title: string; description: string }[];
  };

  hotels: {
    eyebrow: string;
    title: string;
    intro: string;
    introHighlight: string;
    introTail: string;
    ctaLabel: string;
    viewRates: string;
    ctaAria: (categoryTitle: string) => string;
    prevAria: string;
    nextAria: string;
    showMore: (n: number) => string;
    /** Lien de maillage interne vers la landing page Hôtels Makkah. */
    discoverMakkah: string;
    /** Lien de maillage interne vers la landing page Hôtels Madinah. */
    discoverMadinah: string;
    /** Lien de maillage interne vers la landing page Chambre vue Kaaba. */
    discoverKaaba: string;
    /** Lien de maillage interne vers la page hub /hotels. */
    discoverAll: string;
    categories: {
      makkah: { eyebrow: string; title: string; hotels: HotelItem[] };
      madinah: { eyebrow: string; title: string; hotels: HotelItem[] };
      kaaba: { eyebrow: string; title: string; hotels: HotelItem[] };
    };
  };

  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    accent: string;
    ambitionLead: string;
    ambitionTail: string;
    bullets: string[];
    imageAlt: string;
  };

  testimonials: {
    eyebrow: string;
    title: string;
    rating: string;
    reviewsCount: string;
    verifiedBadge: string;
    items: TestimonialItem[];
    /** Lien de maillage interne vers la page hub /temoignages. */
    discoverAll: string;
  };

  faq: {
    eyebrow: string;
    title: string;
    items: FaqItem[];
  };

  contactCta: {
    eyebrow: string;
    titleLead: string;
    titleCouple: string;
    paragraph: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaSecondaryAria: string;
    imageAlt: string;
  };

  footer: {
    logoAlt: string;
    tagline: string;
    emailAria: string;
    instagramAria: string;
    whatsappAria: string;
    columns: {
      /** Labels de la colonne Navigation : [À propos, Hôtels, Services]. */
      navigation: { title: string; items: string[] };
      /** Labels de la colonne "En savoir plus" : [Témoignages, FAQ, Contact]. */
      more: { title: string; items: string[] };
      /** Labels de la colonne Légal : [Mentions légales, Politique de conf.]. */
      legal: { title: string; items: string[] };
    };
    copyright: string;
    author: string;
  };

  whatsappFloat: {
    ariaLabel: string;
    text: string;
  };

  notFound: {
    eyebrow: string;
    title: string;
    text: string;
    cta: string;
  };

  aboutPage: {
    backHome: string;
    eyebrow: string;
    title: string;
    intro: string[];
    imageAlt: string;
    sections: EditorialBlock[];
    ctaBlock: {
      eyebrow: string;
      title: string;
      paragraph: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
  };

  legalPage: {
    backHome: string;
    eyebrow: string;
    title: string;
    intro: string;
    blocks: EditorialBlock[];
  };

  privacyPage: {
    backHome: string;
    eyebrow: string;
    title: string;
    intro: string;
    blocks: EditorialBlock[];
  };

  hotelsMakkahPage: {
    backHome: string;
    hero: {
      eyebrow: string;
      title: string;
      intro: string;
      ctaPrimary: string;
      ctaSecondary: string;
      imageAlt: string;
    };
    hotelsSection: {
      title: string;
      intro: string;
      ctaLabel: string;
    };
    haramSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      criteria: string[];
    };
    choiceSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    kaabaSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      discoverLabel: string;
      visitesMakkahLinkLabel: string;
    };
    bookingSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      steps: string[];
    };
    faq: {
      title: string;
      items: FaqItem[];
    };
    ctaBlock: {
      eyebrow: string;
      title: string;
      paragraph: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
  };

  chambreVueKaabaPage: {
    backHome: string;
    hero: {
      eyebrow: string;
      title: string;
      intro: string;
      ctaPrimary: string;
      ctaSecondary: string;
      imageAlt: string;
    };
    hotelsSection: {
      title: string;
      intro: string;
      ctaLabel: string;
    };
    categorySection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      criteriaLabel: string;
      criteria: string[];
    };
    viewDiffSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    priceSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    choiceSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      makkahLinkLabel: string;
    };
    bookingSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      steps: string[];
    };
    faq: {
      title: string;
      items: FaqItem[];
    };
    ctaBlock: {
      eyebrow: string;
      title: string;
      paragraph: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
  };

  hotelsMadinahPage: {
    backHome: string;
    hero: {
      eyebrow: string;
      title: string;
      intro: string;
      ctaPrimary: string;
      ctaSecondary: string;
      imageAlt: string;
    };
    hotelsSection: {
      title: string;
      intro: string;
      ctaLabel: string;
    };
    nabawiSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      criteria: string[];
    };
    choiceSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    nabawiImportanceSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    omraSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      transfertDiscoverLabel: string;
      visitesMadinahLinkLabel: string;
    };
    bookingSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      steps: string[];
    };
    faq: {
      title: string;
      items: FaqItem[];
    };
    ctaBlock: {
      eyebrow: string;
      title: string;
      paragraph: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
  };

  transfertJeddahMakkahPage: {
    backHome: string;
    hero: {
      eyebrow: string;
      title: string;
      intro: string;
      ctaPrimary: string;
      ctaSecondary: string;
      imageAlt: string;
    };
    trajetSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    criteresSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      criteriaLabel: string;
      criteria: string[];
    };
    arriveeSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    retourSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    reservationSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      chauffeurLinkLabel: string;
    };
    makkahSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      makkahLinkLabel: string;
    };
    fonctionnementSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      steps: string[];
    };
    faq: {
      title: string;
      items: FaqItem[];
    };
    ctaBlock: {
      eyebrow: string;
      title: string;
      paragraph: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
  };

  transfertAeroportMadinahPage: {
    backHome: string;
    hero: {
      eyebrow: string;
      title: string;
      intro: string;
      ctaPrimary: string;
      ctaSecondary: string;
      imageAlt: string;
    };
    trajetSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    criteresSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      criteriaLabel: string;
      criteria: string[];
    };
    aeroportSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    retourSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    nabawiSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      madinahLinkLabel: string;
    };
    reservationSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      chauffeurLinkLabel: string;
    };
    fonctionnementSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      steps: string[];
    };
    faq: {
      title: string;
      items: FaqItem[];
    };
    ctaBlock: {
      eyebrow: string;
      title: string;
      paragraph: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
  };

  chauffeurPriveMakkahMadinahPage: {
    backHome: string;
    hero: {
      eyebrow: string;
      title: string;
      intro: string;
      ctaPrimary: string;
      ctaSecondary: string;
      imageAlt: string;
    };
    trajetPrincipalSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    criteresSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      criteriaLabel: string;
      criteria: string[];
    };
    makkahSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      makkahLinkLabel: string;
      visitesMakkahLinkLabel: string;
    };
    madinahSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      madinahLinkLabel: string;
      visitesMadinahLinkLabel: string;
    };
    entreVillesSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    chauffeurVsTransfertSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      jeddahLinkLabel: string;
      madinahTransfertLinkLabel: string;
    };
    anticipationSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    fonctionnementSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      steps: string[];
    };
    faq: {
      title: string;
      items: FaqItem[];
    };
    ctaBlock: {
      eyebrow: string;
      title: string;
      paragraph: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
  };

  visitesMadinahPage: {
    backHome: string;
    hero: {
      eyebrow: string;
      title: string;
      intro: string;
      ctaPrimary: string;
      ctaSecondary: string;
      imageAlt: string;
    };
    decouvrirSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    lieuxSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      criteriaLabel: string;
      criteria: string[];
    };
    ziyaratSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    personalisationSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    hotelSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      hotelLinkLabel: string;
    };
    chauffeurSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      chauffeurLinkLabel: string;
      visitesMakkahLinkLabel: string;
    };
    fonctionnementSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      steps: string[];
    };
    faq: {
      title: string;
      items: FaqItem[];
    };
    ctaBlock: {
      eyebrow: string;
      title: string;
      paragraph: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
  };

  visitesMakkahPage: {
    backHome: string;
    hero: {
      eyebrow: string;
      title: string;
      intro: string;
      ctaPrimary: string;
      ctaSecondary: string;
      imageAlt: string;
    };
    decouvrirSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    lieuxSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      criteriaLabel: string;
      criteria: string[];
    };
    ziyaratSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    hadjSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    hotelSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      hotelLinkLabel: string;
    };
    chauffeurSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      chauffeurLinkLabel: string;
      visitesMadinahLinkLabel: string;
    };
    fonctionnementSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      steps: string[];
    };
    faq: {
      title: string;
      items: FaqItem[];
    };
    ctaBlock: {
      eyebrow: string;
      title: string;
      paragraph: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
  };

  servicesPage: {
    backHome: string;
    hero: {
      eyebrow: string;
      title: string;
      intro: string;
      ctaPrimary: string;
      ctaSecondary: string;
      imageAlt: string;
    };
    introSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    transfertsSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      jeddahLinkLabel: string;
      madinahLinkLabel: string;
    };
    chauffeurSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      chauffeurLinkLabel: string;
    };
    visitesMadinahSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      visitesMadinahLinkLabel: string;
    };
    visitesMakkahSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      visitesMakkahLinkLabel: string;
    };
    multiSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    fonctionnementSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      steps: string[];
    };
    faq: {
      title: string;
      items: FaqItem[];
    };
    ctaBlock: {
      eyebrow: string;
      title: string;
      paragraph: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
  };

  hotelsPage: {
    backHome: string;
    hero: {
      eyebrow: string;
      title: string;
      intro: string;
      ctaPrimary: string;
      ctaSecondary: string;
      imageAlt: string;
    };
    introSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    makkahSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      makkahLinkLabel: string;
    };
    madinahSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      madinahLinkLabel: string;
    };
    kaabaSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      kaabaLinkLabel: string;
    };
    doubleSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    criteresSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      criteriaLabel: string;
      criteria: string[];
    };
    fonctionnementSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      steps: string[];
    };
    faq: {
      title: string;
      items: FaqItem[];
    };
    ctaBlock: {
      eyebrow: string;
      title: string;
      paragraph: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
  };

  testimonialsPage: {
    backHome: string;
    hero: {
      eyebrow: string;
      title: string;
      intro: string;
      ctaPrimary: string;
      imageAlt: string;
    };
    introSection: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
    };
    ctaBlock: {
      eyebrow: string;
      title: string;
      paragraph: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
  };

  meta: Record<PageKey, PageMeta>;
}
