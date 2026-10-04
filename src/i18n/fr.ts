import type { Translations } from './types';

// Source de vérité française. Toutes les chaînes user-facing du site sont
// centralisées ici. La version arabe (`ar-SA.ts`) doit satisfaire
// exactement la même forme.

const fr: Translations = {
  common: {
    languageFr: 'FR',
    languageAr: 'العربية',
    languageSwitchAria: 'Basculer vers la version arabe',
    optional: '(optionnel)',
    required: 'Champs obligatoires',
    email: 'contact@haramainprestige.com',
    whatsappPhoneDisplay: '+33 7 73 15 79 02',
    lastUpdated: 'Dernière mise à jour : août 2026',
  },

  header: {
    logoAlt: 'Haramain Prestige',
    brandLine1: 'HARAMAIN',
    brandLine2: 'PRESTIGE',
    navHome: 'Accueil',
    navHotels: 'Hôtels',
    navServices: 'Services',
    navAbout: 'À propos',
    navTestimonials: 'Témoignages',
    navFaq: 'FAQ',
    navContact: 'Contact',
    ctaQuote: 'Obtenir un devis',
    hotelsMenu: [
      'Tous nos hôtels',
      'Hôtels à Makkah',
      'Hôtels à Madinah',
      'Chambres avec vue Kaaba',
    ],
    servicesMenu: [
      'Transfert Jeddah \u2013 Makkah',
      'Transfert aéroport Madinah',
      'Chauffeur privé Makkah & Madinah',
      'Visites à Madinah',
      'Visites à Makkah',
    ],
    hotelsMenuAria: 'Hôtels',
    servicesMenuAria: 'Services',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
  },

  hero: {
    eyebrow: 'CONCIERGERIE DE SÉJOUR · MAKKAH & MADINAH',
    titleLead: 'Votre séjour à',
    titleCityMakkah: 'Makkah',
    titleCityMadinah: '& Madinah',
    titleTrailing: 'commence ici',
    paragraph:
      'Des hôtels soigneusement sélectionnés à tarifs négociés, associés à un accompagnement local et personnalisé, pour vivre votre séjour à Makkah & Madinah en toute sérénité.',
    ctaPrimary: 'Recevoir ma proposition personnalisée',
    ctaSecondary: 'Découvrir nos hôtels',
    trust: [
      { label: 'Présence locale sur place' },
      { label: 'Interlocuteur dédié' },
      { label: 'Tarifs négociés' },
    ],
    imageAlt: 'Vue depuis un hôtel de Makkah sur le Masjid al-Haram',
  },

  quoteForm: {
    eyebrow: 'DEVIS PERSONNALISÉ',
    title: 'Recevez votre proposition personnalisée',
    intro:
      'Décrivez votre projet — nous revenons vers vous avec une proposition adaptée à vos dates, votre budget et vos besoins.',
    requiredHint: 'Champs obligatoires',
    servicesLegend: 'De quels services avez-vous besoin\u00a0?',
    servicesHint: 'Cliquez pour sélectionner — plusieurs choix possibles.',
    servicesEmptyWarn: 'Sélectionnez au moins un service pour continuer.',
    servicesSelectedSingular: 'sélectionné',
    servicesSelectedPlural: 'sélectionnés',
    services: [
      { key: 'hotel', label: 'Hôtel' },
      { key: 'transfer', label: 'Transfert aéroport' },
      { key: 'driver', label: 'Chauffeur / déplacements' },
      { key: 'visit', label: 'Visites & accompagnement' },
    ],

    step1Title: 'Votre séjour',
    cityLabel: 'VILLE',
    cityPlaceholder: 'Choisir une ville',
    cityMakkah: 'Makkah',
    cityMadinah: 'Madinah',
    cityBoth: 'Makkah & Madinah',
    arrivalLabel: "DATE D'ARRIVÉE",
    departureLabel: 'DATE DE DÉPART',
    adultsLabel: 'ADULTES',
    childrenLabel: 'ENFANTS',
    incrementAdult: 'Ajouter un adulte',
    decrementAdult: 'Retirer un adulte',
    incrementChild: 'Ajouter un enfant',
    decrementChild: 'Retirer un enfant',

    step2Title: 'Vos préférences hôtel',
    step2InactiveNote:
      "Cette étape n'est demandée que si vous ajoutez «\u00a0Hôtel\u00a0» à votre demande. Vous pouvez la laisser de côté et passer aux coordonnées.",
    roomsLabel: 'NOMBRE DE CHAMBRES',
    roomsPlaceholder: 'Choisir…',
    roomsOptions: ['1 chambre', '2 chambres', '3 chambres et +'],
    categoryLabel: "CATÉGORIE D'HÔTEL",
    categoryDefault: 'Indifférent',
    categoryOptions: ['Indifférent', '3 étoiles', '4 étoiles', '5 étoiles'],
    kaabaLabel: 'CHAMBRE AVEC VUE KAABA',
    kaabaDefault: 'Indifférent',
    kaabaOptions: ['Indifférent', 'Oui, si possible', 'Indispensable'],
    budgetLabel: 'BUDGET PAR CHAMBRE / NUIT',
    budgetDefault: 'Indifférent',
    budgetOptions: ['Indifférent', 'Économique', 'Confort', 'Premium'],

    step3Title: 'Vos coordonnées',
    nameLabel: 'NOM',
    namePlaceholder: 'Votre nom complet',
    whatsappLabel: 'WHATSAPP',
    indicatifAria: 'Indicatif pays',
    phonePlaceholder: '6 12 34 56 78',
    emailLabel: 'EMAIL',
    emailPlaceholder: 'exemple@email.com',
    messageLabel: 'DEMANDE PARTICULIÈRE',
    messagePlaceholder: 'Précisez votre demande...',

    submit: 'Recevoir ma proposition gratuitement',
    submitting: 'Envoi en cours…',
    privacyNote:
      'Vos informations sont utilisées uniquement pour traiter votre demande.',

    toastSuccessTitle: 'Demande envoyée',
    toastSuccessMsg:
      'Votre demande a bien été envoyée. Nous revenons vers vous rapidement.',
    toastErrorTitle: 'Envoi impossible',
    toastErrorGeneric:
      "L'envoi a échoué. Réessayez ou contactez-nous sur WhatsApp.",
    toastErrorNetwork: 'Erreur réseau. Vérifiez votre connexion et réessayez.',
    toastCloseAria: 'Fermer la notification',
  },

  services: {
    eyebrow: 'CE QUE NOUS FAISONS',
    title: 'Nos services',
    subtitle:
      'Une prise en charge complète, sur place, pour un séjour serein à Makkah & Madinah.',
    cards: [
      {
        title: 'Hôtels',
        description:
          'Établissements sélectionnés à proximité des lieux saints, à tarifs négociés.',
      },
      {
        title: 'Transferts aéroport',
        description:
          "De Jeddah ou Madinah jusqu'à votre hôtel, sans attente ni imprévu.",
      },
      {
        title: 'Chauffeurs & VTC',
        description:
          'Des déplacements organisés à Makkah et Madinah selon votre programme et vos besoins.',
      },
      {
        title: 'Visites & accompagnement',
        description:
          'Un accompagnement bienveillant pour vos visites à Makkah & Madinah.',
      },
    ],
    cardLinks: [
      [],
      [
        'Découvrir le transfert Jeddah \u2013 Makkah',
        'Découvrir le transfert à Madinah',
      ],
      ['Découvrir notre service chauffeur'],
      [
        'Visites à Madinah',
        'Visites à Makkah',
      ],
    ],
    discoverAll: 'Découvrir tous nos services',
  },

  howItWorks: {
    eyebrow: 'COMMENT ÇA MARCHE',
    title: 'Un séjour organisé en 3 étapes',
    steps: [
      {
        number: '01',
        title: 'Vous nous parlez de votre séjour',
        description:
          'Dates, nombre de voyageurs, préférences, budget — un formulaire rapide ou un message WhatsApp suffit.',
      },
      {
        number: '02',
        title: 'Nous préparons une proposition sur mesure',
        description:
          'Hôtels sélectionnés, transferts, chauffeurs et accompagnement local pensés autour de vos besoins.',
      },
      {
        number: '03',
        title: 'Vous voyagez sereinement',
        description:
          'Un interlocuteur dédié sur place, disponible tout au long du séjour pour vous accompagner.',
      },
    ],
  },

  hotels: {
    eyebrow: 'NOS ADRESSES SÉLECTIONNÉES',
    title: 'Hôtels à Makkah & Madinah',
    intro: 'Un aperçu de nos adresses partenaires. ',
    introHighlight: 'Plus de 100 hôtels',
    introTail:
      ' disponibles à Makkah & Madinah, à tous les budgets et à toutes les distances du Haram — demandez la liste complète.',
    ctaLabel: 'Demander un devis',
    viewRates: 'Voir les tarifs',
    discoverMakkah: 'Découvrir tous les hôtels à Makkah',
    discoverMadinah: 'Découvrir tous les hôtels à Madinah',
    discoverKaaba: 'Découvrir les chambres avec vue Kaaba',
    discoverAll: 'Découvrir tous nos hôtels',
    ctaAria: (categoryTitle: string) =>
      `Demander un devis pour un séjour — ${categoryTitle}`,
    prevAria: 'Voir les hôtels précédents',
    nextAria: 'Voir les hôtels suivants',
    showMore: (n: number) => `Voir ${n} hôtel${n > 1 ? 's' : ''} de plus`,
    categories: {
      makkah: {
        eyebrow: 'MAKKAH',
        title: 'Hôtels à Makkah',
        hotels: [
          {
            name: 'Sheraton Jabal Al Kaaba',
            description:
              'Confort élégant à Jabal Al Kaaba, avec un accès pratique au Masjid Al-Haram.',
          },
          {
            name: 'Tilal Jabal Al Kaaba',
            description:
              'Élégance, sérénité et vue sur le Haram au cœur de Makkah.',
          },
          {
            name: 'Marriott Jabal Omar',
            description:
              'Confort 5 étoiles à quelques minutes du Haram, avec des vues privilégiées sur la Mosquée sacrée.',
          },
          {
            name: 'Hilton Suites Jabal Omar',
            description:
              'À deux pas du Haram, confort premium et vues privilégiées au cœur de Makkah.',
          },
          {
            name: 'Voco',
            description:
              'Confort moderne et navette pratique vers le Masjid Al-Haram.',
          },
          {
            name: 'Kiswah Towers',
            description:
              'Confort familial à proximité du Haram, avec navette gratuite 24h/24.',
          },
        ],
      },
      madinah: {
        eyebrow: 'MADINAH',
        title: 'Hôtels à Madinah',
        hotels: [
          {
            name: 'As Saafa Hôtel',
            description:
              'Confort et hospitalité à seulement 500 m de Masjid an-Nabawi.',
          },
          {
            name: 'Crowne Plaza',
            description:
              'Confort 5 étoiles à quelques pas de Masjid an-Nabawi et Bab Al Salam.',
          },
          {
            name: 'Zamzam Pullman Madinah',
            description:
              'Élégance et sérénité à quelques pas de Masjid an-Nabawi.',
          },
          {
            name: 'Mysk Al Balad',
            description:
              'Confort contemporain et accès privilégié à Masjid an-Nabawi.',
          },
          {
            name: 'Valy Hôtel',
            description:
              'Confort moderne et emplacement privilégié à moins d’1 km de Masjid an-Nabawi.',
          },
        ],
      },
      kaaba: {
        eyebrow: 'VUE KAABA',
        title: 'Chambres avec vue sur la Kaaba',
        hotels: [
          {
            name: 'Fairmont Clock Royal',
            description:
              'Luxe emblématique et vues exceptionnelles sur la Kaaba, au cœur de Makkah.',
          },
          {
            name: 'Swissôtel Makkah',
            description:
              'Confort 5 étoiles et vues privilégiées sur la Kaaba, au cœur des Clock Towers.',
          },
          {
            name: 'Zamzam Pullman Makkah',
            description:
              'Confort haut de gamme et vues privilégiées sur la Kaaba, à quelques pas du Haram.',
          },
        ],
      },
    },
  },

  about: {
    eyebrow: 'PRÉSENCE LOCALE',
    title: "Haramain Prestige, né d'un constat",
    paragraphs: [
      "Au fil du temps, nous avons constaté que de nombreux pèlerins rencontraient les mêmes difficultés : choisir le bon hôtel parmi des centaines d'offres, comprendre les réelles distances du Haram et faire face à des tarifs souvent très élevés.",
      "C'est de ce constat qu'est né Haramain Prestige.",
      'Grâce à notre présence à Makkah & Madinah et à notre connaissance du terrain, nous avons développé un réseau de partenaires afin de proposer des hôtels soigneusement sélectionnés, des tarifs négociés et un véritable accompagnement sur place.',
    ],
    accent: "C'est de ce constat qu'est né Haramain Prestige.",
    ambitionLead: 'Notre ambition :',
    ambitionTail:
      ' rendre votre séjour plus simple, plus serein et au prix le plus juste.',
    bullets: [
      'Équipe francophone présente à Makkah &amp; Madinah, joignable 7j/7.',
      'Accords directs avec les hôtels et prestataires locaux, sans intermédiaire.',
      'Un seul interlocuteur de la première question au retour de séjour.',
      'Suivi personnalisé, adapté aux familles, aux couples et aux voyageurs seuls.',
    ],
    imageAlt: 'Équipe Haramain Prestige à Makkah',
  },

  testimonials: {
    eyebrow: 'ILS NOUS ONT FAIT CONFIANCE',
    title: 'Ce que disent nos voyageurs',
    rating: '4,9',
    reviewsCount: '500+ avis vérifiés',
    verifiedBadge: 'VÉRIFIÉ',
    items: [
      {
        initial: 'Y',
        name: 'Yassin M.',
        location: 'Paris',
        quote:
          'Service au top. Hôtels magnifiques, très bien situés. Je recommande Haramain Prestige les yeux fermés.',
      },
      {
        initial: 'A',
        name: 'Amina K.',
        location: 'Lyon',
        quote:
          "Nous avons eu une chambre avec vue sur la Kaaba, c'était incroyable. Merci pour tout, du début à la fin.",
      },
      {
        initial: 'S',
        name: 'Sofiane B.',
        location: 'Bruxelles',
        quote:
          "Réponse rapide, prix imbattables et équipe très professionnelle. Qu'Allah vous préserve.",
      },
    ],
  },

  faq: {
    eyebrow: 'QUESTIONS FRÉQUENTES',
    title: 'Vos questions, nos réponses',
    items: [
      {
        question: "Qu'est-ce que Haramain Prestige ?",
        answer:
          "Haramain Prestige est une conciergerie de séjour spécialisée à Makkah et Madinah. Nous accompagnons les pèlerins francophones dans la réservation de leurs hôtels à tarifs négociés et dans l'organisation de leur séjour aux deux villes saintes, avec un interlocuteur dédié avant, pendant et après le voyage.",
      },
      {
        question: 'Haramain Prestige est-il présent en Arabie saoudite ?',
        answer:
          "Oui. Notre équipe est présente à Makkah et Madinah. Cette présence locale nous permet de connaître les hôtels, les distances réelles jusqu'au Haram et de rester joignables pour vous accompagner directement sur place, en cas de besoin ou d'imprévu.",
      },
      {
        question: 'Quels services propose Haramain Prestige ?',
        answer:
          "Nous proposons la réservation d'hôtels à Makkah et Madinah, les transferts depuis les aéroports de Djeddah et Madinah, les déplacements entre les deux villes saintes, ainsi qu'un accompagnement sur place lorsque vous en avez besoin. Vous pouvez réserver un seul service ou une organisation complète.",
      },
      {
        question: 'Comment contacter Haramain Prestige ?',
        answer:
          "Vous pouvez nous écrire à contact@haramainprestige.com, nous joindre sur WhatsApp, ou remplir le formulaire de devis en haut de la page d'accueil. Nous revenons vers vous dans la journée avec une proposition personnalisée et sans engagement.",
      },
      {
        question: 'Êtes-vous une agence de voyage ?',
        answer:
          "Haramain Prestige n'est pas une agence de voyage classique : nous sommes une conciergerie de séjour spécialisée à Makkah et Madinah. Nous organisons vos réservations d'hôtels, transferts et déplacements selon vos besoins, avec un accompagnement et un interlocuteur disponible sur place.",
      },
      {
        question: "Puis-je réserver seulement l'hôtel ?",
        answer:
          'Oui. Vous pouvez réserver uniquement votre hébergement, sans transfert ni autre service.',
      },
      {
        question:
          'Vos tarifs sont-ils moins chers que les plateformes de réservation ?',
        answer:
          "Nos partenariats en direct avec les hôtels nous permettent d'accéder à des tarifs négociés et à des conditions privilégiées. Nous recherchons pour chaque séjour la meilleure offre disponible, selon vos dates et vos besoins.",
      },
      {
        question: 'Comment obtenir un devis ?',
        answer:
          'Remplissez le formulaire en haut de page ou contactez-nous directement sur WhatsApp. Nous revenons vers vous dans la journée avec une proposition personnalisée et sans engagement.',
      },
      {
        question: 'Êtes-vous joignables une fois sur place ?',
        answer:
          "Oui, un interlocuteur dédié reste joignable pendant tout votre séjour, 7j/7. En cas d'imprévu (retard, changement de vol, besoin d'un transfert de dernière minute), nous sommes là.",
      },
    ],
  },

  contactCta: {
    eyebrow: 'PRÊT À PARTIR ?',
    titleLead: 'Discutons de votre séjour à',
    titleCouple: 'Makkah & Madinah',
    paragraph:
      'Recevez une proposition personnalisée sous 24h, sans engagement.',
    ctaPrimary: 'Demander un devis',
    ctaSecondary: 'Écrire sur WhatsApp',
    ctaSecondaryAria:
      'Écrire à Haramain Prestige sur WhatsApp au +33 7 73 15 79 02',
    imageAlt: 'Masjid an-Nabawi à Madinah',
  },

  footer: {
    logoAlt: 'Haramain Prestige',
    tagline:
      'Votre conciergerie à Makkah & Madinah, à vos côtés avant et pendant votre séjour.',
    emailAria: 'Nous écrire à contact@haramainprestige.com',
    instagramAria: 'Instagram Haramain Prestige',
    whatsappAria: 'WhatsApp Haramain Prestige : +33 7 73 15 79 02',
    columns: {
      navigation: {
        title: 'Navigation',
        items: ['À propos', 'Hôtels', 'Services'],
      },
      more: {
        title: 'En savoir plus',
        items: ['Témoignages', 'FAQ', 'Contact'],
      },
      legal: {
        title: 'Légal',
        items: ['Mentions légales', 'Politique de confidentialité'],
      },
    },
    copyright: '© 2026',
    author: '— Tous droits réservés.',
  },

  whatsappFloat: {
    ariaLabel: 'Contacter Haramain Prestige sur WhatsApp au +33 7 73 15 79 02',
    text: 'WhatsApp',
  },

  notFound: {
    eyebrow: 'ERREUR 404',
    title: 'Page introuvable',
    text: "La page que vous cherchez n'existe pas ou a été déplacée.",
    cta: "Retour à l'accueil",
  },

  aboutPage: {
    backHome: "Retour à l'accueil",
    eyebrow: 'À PROPOS',
    title: 'À propos de Haramain Prestige',
    intro: [
      "Haramain Prestige est une conciergerie de séjour spécialisée à Makkah et Madinah. Notre métier : vous accompagner de bout en bout dans l'organisation de votre séjour aux deux villes saintes, en nous appuyant sur notre présence locale, notre réseau de partenaires et notre connaissance du terrain.",
      'Nous nous adressons aux pèlerins francophones qui souhaitent un interlocuteur unique, des hôtels réellement sélectionnés à tarifs négociés et un accompagnement humain avant, pendant et après leur séjour — Omra, Hajj ou simple visite spirituelle.',
    ],
    imageAlt: 'Équipe Haramain Prestige à Makkah',
    sections: [
      {
        eyebrow: 'NOTRE ORIGINE',
        title: 'Pourquoi Haramain Prestige a été créé',
        paragraphs: [
          "Au fil du temps, nous avons constaté que de nombreux pèlerins rencontraient les mêmes difficultés au moment d'organiser leur séjour : choisir le bon hôtel parmi des centaines d'offres, comprendre les réelles distances du Haram, distinguer une vue authentique d'une photo trompeuse et faire face à des tarifs souvent très élevés selon les périodes.",
          'Haramain Prestige est né de ce constat. Notre volonté : offrir aux pèlerins francophones un accompagnement clair, honnête et humain, et leur permettre de vivre leur séjour sereinement, sans passer des heures à comparer des plateformes ou à décrypter des descriptifs approximatifs.',
        ],
      },
      {
        eyebrow: 'PRÉSENCE LOCALE',
        title: 'Une présence à Makkah et Madinah',
        paragraphs: [
          "Notre équipe est présente à Makkah et Madinah. Cette présence locale change tout : nous connaissons les quartiers, les hôtels, les distances réelles jusqu'au Masjid al-Haram et à la Mosquée du Prophète, ainsi que les particularités de chaque saison (Ramadan, Hajj, périodes creuses).",
          'Grâce à ce terrain, nous avons construit dans la durée un réseau de partenaires fiables — hôtels, chauffeurs, prestataires locaux — avec lesquels nous travaillons en direct. Cela nous permet de proposer des tarifs négociés et des conditions privilégiées à nos clients.',
          'Nous ne revendons pas des offres génériques trouvées en ligne : nous sélectionnons, vérifions et confirmons chaque prestation en fonction de votre besoin réel.',
        ],
      },
      {
        eyebrow: 'NOS SERVICES',
        title: 'Comment Haramain Prestige accompagne ses clients',
        paragraphs: [
          "Notre cœur de métier est la réservation d'hôtels à Makkah et Madinah, avec un vrai travail de sélection en fonction de votre budget, de votre distance souhaitée jusqu'au Haram et du type de séjour (famille, couple, voyageur seul).",
          "Nous organisons également les transferts depuis les aéroports de Djeddah et Madinah, les déplacements entre les deux villes saintes et l'accompagnement sur place lorsque vous en avez besoin. Chaque prestation est pensée pour vous éviter les mauvaises surprises et vous faire gagner du temps.",
          'Vous restez libre : vous pouvez réserver uniquement votre hébergement, ou choisir une organisation complète de A à Z. Nous adaptons notre accompagnement à ce que vous demandez, sans vous imposer de package figé.',
        ],
      },
      {
        eyebrow: 'NOTRE APPROCHE',
        title: "L'approche Haramain Prestige",
        paragraphs: [
          "Un séjour à Makkah et Madinah ne se traite pas comme une réservation touristique classique. C'est pour cela que nous mettons un point d'honneur à travailler avec un interlocuteur dédié : la même personne vous répond avant, pendant et après votre séjour.",
          'Nos tarifs sont négociés en direct avec les hôtels partenaires, sans intermédiaire, ce qui nous permet de proposer un rapport qualité-prix cohérent. Aucun coût caché, aucune commission opaque ajoutée en fin de parcours.',
          'Enfin, notre accompagnement est réellement personnalisé : chaque demande est étudiée individuellement, et nous préférons vous conseiller honnêtement — quitte à recommander un hôtel moins cher — plutôt que de vous vendre une offre qui ne correspondrait pas à votre besoin.',
        ],
      },
    ],
    ctaBlock: {
      eyebrow: 'PRÊT À ORGANISER VOTRE SÉJOUR ?',
      title: 'Parlons de votre séjour à Makkah & Madinah',
      paragraph:
        'Recevez une proposition personnalisée, adaptée à vos dates, votre budget et votre distance souhaitée jusqu\u2019au Haram. Sans engagement, avec un interlocuteur dédié.',
      ctaPrimary: 'Recevoir ma proposition personnalisée',
      ctaSecondary: 'Nous écrire sur WhatsApp',
    },
  },

  legalPage: {
    backHome: "Retour à l'accueil",
    eyebrow: 'INFORMATIONS LÉGALES',
    title: 'Mentions légales',
    intro:
      "Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site Haramain Prestige l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.",
    blocks: [
      {
        eyebrow: 'HÉBERGEMENT',
        title: 'Hébergeur du site',
        rows: [
          { label: 'Société', value: 'OVH SAS' },
          {
            label: 'Adresse',
            value: '2 rue Kellermann, 59100 Roubaix, France',
          },
          { label: 'Téléphone', value: '1007 (depuis la France)' },
          { label: 'Site web', value: 'www.ovh.com' },
          { label: 'RCS', value: 'Lille Métropole 424 761 419' },
        ],
      },
      {
        eyebrow: 'PROPRIÉTÉ INTELLECTUELLE',
        title: 'Contenus & droits',
        paragraphs: [
          "L'ensemble des éléments présents sur ce site (textes, photographies, logos, illustrations, éléments graphiques, mise en page) est la propriété exclusive de Haramain Prestige ou de ses partenaires, et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.",
          "Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle, de l'un quelconque de ces éléments, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable.",
          'Les photographies des hôtels partenaires sont utilisées à titre illustratif et restent la propriété de leurs ayants droit respectifs.',
        ],
      },
      {
        eyebrow: 'DONNÉES PERSONNELLES',
        title: 'Vos données & vos droits',
        paragraphs: [
          "Les informations que vous communiquez via nos formulaires (nom, prénom, e-mail, téléphone, dates de séjour) sont utilisées uniquement pour traiter votre demande de devis et vous accompagner dans l'organisation de votre séjour à Makkah & Madinah.",
          "Aucune donnée n'est revendue ni transmise à des tiers à des fins commerciales. Vos informations sont conservées le temps nécessaire au traitement de votre demande, puis pendant la durée légale requise.",
          "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de portabilité de vos données. Pour exercer ces droits, écrivez-nous à contact@haramainprestige.com.",
        ],
      },
      {
        eyebrow: 'COOKIES',
        title: 'Utilisation des cookies',
        paragraphs: [
          "Ce site ne dépose aucun cookie de sa propre initiative. Aucun cookie publicitaire, de mesure d'audience ou de suivi tiers n'est utilisé.",
          "Les polices d'écriture sont auto-hébergées : les fichiers de fonte (Cormorant Garamond, Manrope, Noto Naskh Arabic) sont servis depuis notre propre domaine, sans requête vers Google Fonts ni transfert d'adresse IP à un tiers.",
          'Vous pouvez à tout moment configurer votre navigateur pour bloquer ou supprimer les cookies déjà installés.',
        ],
      },
      {
        eyebrow: 'RESPONSABILITÉ',
        title: 'Limitation de responsabilité',
        paragraphs: [
          "Haramain Prestige met tout en œuvre pour offrir des informations exactes et à jour. Les tarifs, disponibilités et prestations des hôtels partenaires peuvent toutefois évoluer et ne sont confirmés qu'après validation écrite de votre devis personnalisé.",
          "Haramain Prestige ne pourra être tenue responsable des dommages directs ou indirects résultant de l'utilisation du site ou de l'indisponibilité temporaire de celui-ci.",
        ],
      },
      {
        eyebrow: 'DROIT APPLICABLE',
        title: 'Litiges',
        paragraphs: [
          'Les présentes mentions légales sont régies par le droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.',
        ],
      },
    ],
  },

  privacyPage: {
    backHome: "Retour à l'accueil",
    eyebrow: 'CONFIANCE & TRANSPARENCE',
    title: 'Politique de confidentialité',
    intro:
      'Chez Haramain Prestige, la protection de vos données personnelles est essentielle. Cette page explique quelles informations nous collectons, pourquoi, combien de temps nous les conservons, et quels sont vos droits.',
    blocks: [
      {
        eyebrow: 'RESPONSABLE',
        title: 'Qui traite vos données ?',
        paragraphs: [
          'Haramain Prestige est responsable du traitement des données personnelles collectées via le site haramainprestige.com. Nous nous engageons à protéger votre vie privée et à traiter vos informations avec transparence, conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.',
          'Pour toute question relative à vos données personnelles, vous pouvez nous écrire à contact@haramainprestige.com.',
        ],
      },
      {
        eyebrow: 'DONNÉES COLLECTÉES',
        title: 'Quelles informations recueillons-nous ?',
        paragraphs: [
          'Nous collectons uniquement les données que vous nous transmettez volontairement via nos formulaires (demande de devis, prise de contact, WhatsApp).',
        ],
        bullets: [
          'Nom et prénom',
          'Adresse e-mail',
          'Numéro de téléphone',
          'Dates de séjour envisagées',
          "Ville de départ, nombre de voyageurs, préférences d'hôtel",
          'Tout message ou précision que vous nous communiquez',
        ],
      },
      {
        eyebrow: 'FINALITÉS',
        title: 'Pourquoi nous utilisons vos données',
        bullets: [
          'Répondre à vos demandes de devis et de renseignements',
          'Organiser et suivre votre séjour à Makkah & Madinah',
          'Vous contacter avant, pendant et après votre séjour',
          'Améliorer la qualité de nos services',
        ],
      },
      {
        eyebrow: 'BASE LÉGALE',
        title: 'Sur quelle base légale ?',
        paragraphs: [
          "Le traitement de vos données repose sur votre consentement (envoi volontaire d'un formulaire) et sur l'exécution de mesures précontractuelles ou contractuelles prises à votre demande (préparation d'un devis, organisation d'un séjour).",
        ],
      },
      {
        eyebrow: 'DURÉE',
        title: 'Combien de temps sont-elles conservées ?',
        rows: [
          {
            label: 'Demandes sans suite',
            value: '3 ans à compter du dernier contact',
          },
          {
            label: 'Clients (après séjour)',
            value: 'Durée légale requise (facturation, comptabilité)',
          },
        ],
      },
      {
        eyebrow: 'DESTINATAIRES',
        title: 'Qui a accès à vos données ?',
        paragraphs: [
          "Vos données sont accessibles uniquement à l'équipe de Haramain Prestige, dans la stricte limite de leurs missions. Aucune donnée n'est revendue ni transmise à des tiers à des fins commerciales.",
          'Certaines données peuvent être transmises à nos partenaires hôteliers ou prestataires de transfert uniquement dans le cadre strict de la réservation de votre séjour (nom, dates, préférences), et avec votre accord.',
        ],
      },
      {
        eyebrow: 'COOKIES',
        title: 'Cookies & traceurs',
        paragraphs: [
          "Le site ne dépose aucun cookie de sa propre initiative. Aucun cookie publicitaire, de mesure d'audience tierce ou de traçage n'est utilisé.",
          "Les polices d'écriture (Cormorant Garamond, Manrope, Noto Naskh Arabic) sont auto-hébergées : les fichiers de fonte sont servis depuis notre propre domaine. Aucune requête n'est effectuée vers Google Fonts et aucune adresse IP n'est transmise à un tiers de ce fait.",
          'Vous pouvez à tout moment configurer votre navigateur pour bloquer ou supprimer les cookies déjà installés.',
        ],
      },
      {
        eyebrow: 'VOS DROITS',
        title: 'Vos droits sur vos données',
        paragraphs: [
          'Conformément au RGPD, vous disposez à tout moment des droits suivants sur vos données personnelles :',
        ],
        bullets: [
          "Droit d'accès : obtenir une copie des données que nous détenons sur vous",
          'Droit de rectification : corriger des informations inexactes',
          "Droit d'effacement : demander la suppression de vos données",
          'Droit à la limitation du traitement',
          "Droit d'opposition au traitement",
          'Droit à la portabilité de vos données',
        ],
      },
      {
        eyebrow: 'EXERCER VOS DROITS',
        title: 'Comment nous contacter ?',
        paragraphs: [
          "Pour exercer un ou plusieurs de ces droits, écrivez-nous à contact@haramainprestige.com en précisant votre demande. Nous vous répondrons dans un délai maximum d'un mois.",
          "Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (Commission Nationale de l'Informatique et des Libertés) : www.cnil.fr.",
        ],
      },
      {
        eyebrow: 'SÉCURITÉ',
        title: 'Comment vos données sont-elles protégées ?',
        paragraphs: [
          'Nous mettons en œuvre les mesures techniques et organisationnelles nécessaires pour protéger vos données contre tout accès non autorisé, altération, divulgation ou destruction : hébergement sécurisé en France, communications chiffrées (HTTPS), accès restreint aux personnes habilitées.',
        ],
      },
    ],
  },

  hotelsMakkahPage: {
    backHome: "Retour à l'accueil",
    hero: {
      eyebrow: 'HÔTELS À MAKKAH · LA MECQUE',
      title: 'Hôtels à Makkah : trouvez l\'hébergement adapté à votre séjour',
      intro:
        'Haramain Prestige vous accompagne dans la recherche et la réservation de votre hôtel à Makkah (La Mecque). Nous sélectionnons des établissements selon votre budget, la proximité souhaitée avec le Masjid al-Haram, le niveau de confort et les besoins de votre séjour.',
      ctaPrimary: 'Recevoir une proposition personnalisée',
      ctaSecondary: 'Voir les hôtels sélectionnés',
      imageAlt: 'Vue sur le Masjid al-Haram depuis un hôtel à Makkah',
    },
    hotelsSection: {
      title: 'Quelques hôtels à Makkah',
      intro:
        'Voici une sélection d\'établissements déjà proposés par Haramain Prestige. Les disponibilités, catégories de chambres et tarifs varient selon vos dates\u00a0: nous vérifions chaque demande avant de vous transmettre une proposition.',
      ctaLabel: 'Demander les disponibilités',
    },
    haramSection: {
      eyebrow: 'PROXIMITÉ DU HARAM',
      title: 'Choisir un hôtel proche du Masjid al-Haram',
      paragraphs: [
        'Pour un séjour à Makkah, la distance jusqu\'au Masjid al-Haram est souvent l\'un des premiers critères de choix. Mais une distance seule ne suffit pas toujours\u00a0: l\'accès réel, le quartier, le dénivelé, la présence d\'une navette et l\'entrée du Haram que vous utilisez peuvent également avoir un impact sur vos déplacements.',
        'Haramain Prestige étudie votre demande en fonction de vos priorités afin de vous orienter vers des hôtels cohérents avec votre séjour, plutôt que de vous proposer une liste générique d\'établissements.',
      ],
      criteria: [
        'Proximité souhaitée avec le Masjid al-Haram',
        'Budget par chambre et par nuit',
        'Catégorie d\'hôtel et niveau de confort',
        'Voyage en couple, famille ou groupe',
        'Besoin éventuel d\'une chambre avec vue sur la Kaaba',
      ],
    },
    choiceSection: {
      eyebrow: 'SELON VOTRE SÉJOUR',
      title: 'Quel hôtel choisir à Makkah\u00a0?',
      paragraphs: [
        'Il n\'existe pas un hôtel idéal pour tous les voyageurs. Une famille peut privilégier l\'espace, l\'accès et la simplicité des déplacements, tandis qu\'un couple peut rechercher un établissement premium ou une vue particulière. D\'autres voyageurs souhaitent surtout maîtriser leur budget tout en restant dans une zone pratique.',
        'Notre rôle est de comparer les options disponibles à vos dates et de vous présenter une sélection adaptée à vos critères, avec un interlocuteur unique pour votre demande.',
      ],
    },
    kaabaSection: {
      eyebrow: 'VUE KAABA',
      title: 'Hôtel à Makkah avec vue sur la Kaaba',
      paragraphs: [
        'Certaines catégories de chambres et suites offrent une vue sur la Kaaba ou sur le Masjid al-Haram. Cette caractéristique dépend de l\'établissement, de la catégorie exacte de chambre et des disponibilités au moment de la réservation.',
        'Si la vue Kaaba est importante pour votre séjour, indiquez-le dès votre demande de devis. Nous pourrons rechercher les options disponibles correspondant à ce critère et vous préciser la catégorie proposée avant confirmation.',
      ],
      discoverLabel: 'Découvrir les chambres avec vue sur la Kaaba',
      visitesMakkahLinkLabel: 'Demander un accompagnement pour vos visites à Makkah',
    },
    bookingSection: {
      eyebrow: 'RÉSERVATION',
      title: 'Comment réserver votre hôtel à Makkah avec Haramain Prestige\u00a0?',
      paragraphs: [
        'Vous nous indiquez vos dates, le nombre de voyageurs, le nombre de chambres, votre budget et vos préférences. Nous recherchons ensuite les options correspondant à votre demande auprès de notre réseau de partenaires.',
        'Vous recevez une proposition personnalisée. Vous pouvez réserver uniquement l\'hôtel ou compléter votre séjour avec les autres services disponibles, notamment les transferts et les déplacements sur place.',
      ],
      steps: [
        'Vous nous transmettez vos dates et vos critères',
        'Nous vérifions les options et disponibilités correspondant à votre demande',
        'Vous recevez une proposition personnalisée avant de confirmer',
      ],
    },
    faq: {
      title: 'FAQ — Réserver un hôtel à Makkah',
      items: [
        {
          question: 'Proposez-vous des hôtels proches du Haram à Makkah\u00a0?',
          answer:
            'Oui. Haramain Prestige sélectionne des hôtels à Makkah selon la proximité recherchée avec le Masjid al-Haram. La proposition dépend de vos dates, de votre budget et des disponibilités.',
        },
        {
          question: 'Puis-je demander un hôtel 3, 4 ou 5 étoiles à Makkah\u00a0?',
          answer:
            'Oui. Vous pouvez indiquer la catégorie souhaitée dans votre demande. Nous recherchons ensuite les établissements disponibles correspondant à vos critères.',
        },
        {
          question: 'Peut-on réserver une chambre avec vue sur la Kaaba\u00a0?',
          answer:
            'Oui, lorsque cette catégorie est proposée et disponible. Il est important de préciser que vous souhaitez une vue Kaaba afin que la catégorie exacte puisse être vérifiée avant réservation.',
        },
        {
          question: 'Puis-je réserver uniquement l\'hôtel sans autre service\u00a0?',
          answer:
            'Oui. Vous pouvez demander uniquement votre hébergement à Makkah. Les transferts, chauffeurs et autres prestations sont complémentaires et restent facultatifs.',
        },
        {
          question: 'Pourquoi les tarifs des hôtels à Makkah changent-ils selon les dates\u00a0?',
          answer:
            'Les prix et disponibilités sont variables selon l\'établissement, la période, la catégorie de chambre et la demande. C\'est pourquoi Haramain Prestige confirme les conditions correspondant à vos dates avant toute réservation.',
        },
        {
          question: 'Comment obtenir un devis pour un hôtel à Makkah\u00a0?',
          answer:
            'Indiquez vos dates, le nombre de voyageurs, votre budget et vos préférences dans le formulaire de demande. Haramain Prestige revient ensuite vers vous avec une proposition adaptée aux options disponibles.',
        },
      ],
    },
    ctaBlock: {
      eyebrow: 'VOTRE SÉJOUR À MAKKAH',
      title: 'Recevez une sélection d\'hôtels adaptée à vos critères',
      paragraph:
        'Indiquez-nous vos dates, votre budget et la proximité souhaitée avec le Haram. Nous vous répondons avec une proposition personnalisée selon les disponibilités.',
      ctaPrimary: 'Demander mon devis hôtel',
      ctaSecondary: 'Écrire sur WhatsApp',
    },
  },

  chambreVueKaabaPage: {
    backHome: "Retour à l'accueil",
    hero: {
      eyebrow: 'CHAMBRES & SUITES · VUE KAABA',
      title: 'Chambre avec vue sur la Kaaba à Makkah : trouvez la catégorie adaptée',
      intro:
        'Certaines chambres et suites à Makkah offrent une vue sur la Kaaba ou sur le Masjid al-Haram. Haramain Prestige vous accompagne pour identifier les établissements et les catégories de chambres correspondant à votre demande, selon vos dates, votre budget et les disponibilités.',
      ctaPrimary: 'Rechercher une chambre vue Kaaba',
      ctaSecondary: 'Voir les hôtels sélectionnés',
      imageAlt: 'Abraj Al-Bait et Masjid al-Haram à Makkah',
    },
    hotelsSection: {
      title: 'Quelques hôtels proposant des catégories avec vue sur la Kaaba',
      intro:
        'Certains établissements de Makkah proposent des catégories de chambres ou de suites avec vue sur la Kaaba ou le Masjid al-Haram. La vue dépend toujours de la catégorie réservée et des disponibilités au moment de votre séjour.',
      ctaLabel: 'Vérifier les chambres disponibles',
    },
    categorySection: {
      eyebrow: 'CATÉGORIE DE CHAMBRE',
      title: 'Que signifie réellement "chambre avec vue sur la Kaaba"\u00a0?',
      paragraphs: [
        'Dans un même hôtel, plusieurs catégories de chambres peuvent être proposées avec des orientations différentes. Une chambre standard, une chambre avec vue sur le Haram et une chambre avec vue sur la Kaaba ne correspondent pas nécessairement au même produit ni au même tarif.',
        'La mention exacte de la catégorie est donc essentielle. Haramain Prestige vérifie la catégorie proposée afin que vous sachiez précisément quel type de vue est associé à votre réservation avant confirmation.',
      ],
      criteriaLabel: 'POINTS À VÉRIFIER',
      criteria: [
        'Catégorie exacte de chambre ou suite',
        'Type de vue indiqué par l\'établissement',
        'Dates du séjour',
        'Nombre de voyageurs',
        'Budget',
        'Disponibilité au moment de la réservation',
      ],
    },
    viewDiffSection: {
      eyebrow: 'KAABA · HARAM · VILLE',
      title: 'Vue Kaaba, vue Haram ou vue ville\u00a0: quelle différence\u00a0?',
      paragraphs: [
        'Les établissements de Makkah peuvent proposer plusieurs types de vues. Une "vue Kaaba" désigne une catégorie depuis laquelle la Kaaba est visible selon les caractéristiques annoncées par l\'établissement. Une "vue Haram" peut offrir une vue sur le Masjid al-Haram sans garantir une vue directe sur la Kaaba.',
        'Il est donc important de ne pas se baser uniquement sur le nom de l\'hôtel. La catégorie précise de la chambre doit être vérifiée avant la réservation.',
      ],
    },
    priceSection: {
      eyebrow: 'TARIFS',
      title: 'Pourquoi le tarif d\'une chambre avec vue sur la Kaaba peut-il varier\u00a0?',
      paragraphs: [
        'Le tarif d\'une catégorie avec vue sur la Kaaba ou le Masjid al-Haram dépend notamment de l\'établissement, de la catégorie exacte, de la période du séjour et de la demande.',
        'Les prix peuvent donc varier selon vos dates. Haramain Prestige vérifie les options disponibles au moment de votre demande afin de vous proposer une solution adaptée à votre budget.',
      ],
    },
    choiceSection: {
      eyebrow: 'SELON VOTRE SÉJOUR',
      title: 'Comment choisir votre chambre avec vue sur la Kaaba\u00a0?',
      paragraphs: [
        'Le choix dépend de vos priorités. Certains voyageurs recherchent avant tout une vue particulière, tandis que d\'autres privilégient la proximité avec le Haram, la superficie de la chambre, le niveau de confort ou le budget.',
        'Indiquez-nous vos critères dès votre demande afin que nous puissions rechercher les catégories correspondant réellement à vos attentes plutôt que de vous proposer uniquement un nom d\'hôtel.',
      ],
      makkahLinkLabel: 'Découvrir notre sélection d\'hôtels à Makkah',
    },
    bookingSection: {
      eyebrow: 'RÉSERVATION',
      title: 'Comment réserver une chambre avec vue sur la Kaaba avec Haramain Prestige\u00a0?',
      paragraphs: [
        'Indiquez vos dates, le nombre de voyageurs, votre budget et précisez que vous recherchez une chambre ou une suite avec vue sur la Kaaba.',
        'Nous vérifions ensuite les établissements et les catégories disponibles avant de vous transmettre une proposition. La catégorie exacte de chambre doit être confirmée avant la réservation.',
      ],
      steps: [
        'Vous nous transmettez vos dates et vos critères',
        'Nous recherchons les catégories avec vue correspondant à votre demande',
        'Vous recevez une proposition précisant la catégorie disponible avant de confirmer',
      ],
    },
    faq: {
      title: 'FAQ — Chambre avec vue sur la Kaaba à Makkah',
      items: [
        {
          question: 'Tous les hôtels proches du Haram proposent-ils des chambres avec vue sur la Kaaba\u00a0?',
          answer:
            'Non. La proximité avec le Masjid al-Haram ne signifie pas automatiquement qu\'une chambre offre une vue sur la Kaaba. Cela dépend de l\'établissement, de son emplacement et surtout de la catégorie exacte de chambre.',
        },
        {
          question: 'Toutes les chambres d\'un hôtel vue Kaaba ont-elles la même vue\u00a0?',
          answer:
            'Non. Un même établissement peut proposer plusieurs catégories de chambres avec des orientations différentes. Il est donc important de vérifier la catégorie précise avant de réserver.',
        },
        {
          question: 'Quelle est la différence entre une vue Kaaba et une vue Haram\u00a0?',
          answer:
            'Une catégorie annoncée avec vue Kaaba indique une vue sur la Kaaba selon les caractéristiques définies par l\'établissement. Une vue Haram peut concerner le Masjid al-Haram sans nécessairement offrir une vue directe sur la Kaaba.',
        },
        {
          question: 'Peut-on réserver une suite avec vue sur la Kaaba\u00a0?',
          answer:
            'Certains établissements peuvent proposer des suites dans des catégories avec vue sur la Kaaba ou le Masjid al-Haram. Les disponibilités et catégories doivent être vérifiées pour vos dates.',
        },
        {
          question: 'Le prix d\'une chambre vue Kaaba est-il fixe\u00a0?',
          answer:
            'Non. Les tarifs varient selon l\'établissement, la catégorie de chambre, les dates du séjour et la disponibilité.',
        },
        {
          question: 'Comment demander une chambre avec vue sur la Kaaba\u00a0?',
          answer:
            'Précisez ce critère dans votre demande de devis avec vos dates, le nombre de voyageurs et votre budget. Haramain Prestige vérifie ensuite les catégories disponibles correspondant à votre demande.',
        },
      ],
    },
    ctaBlock: {
      eyebrow: 'VOTRE CHAMBRE À MAKKAH',
      title: 'Recevez une proposition pour une chambre avec vue sur la Kaaba',
      paragraph:
        'Indiquez-nous vos dates, votre budget et le type de vue recherché. Nous vérifions les catégories disponibles avant de vous transmettre une proposition personnalisée.',
      ctaPrimary: 'Demander les disponibilités',
      ctaSecondary: 'Écrire sur WhatsApp',
    },
  },

  hotelsMadinahPage: {
    backHome: "Retour à l'accueil",
    hero: {
      eyebrow: 'HÔTELS À MADINAH · MÉDINE',
      title: 'Hôtels à Madinah : trouvez l\'hébergement adapté à votre séjour à Médine',
      intro:
        'Haramain Prestige vous accompagne dans la recherche et la réservation de votre hôtel à Madinah (Médine). Nous sélectionnons des établissements selon votre budget, la proximité souhaitée avec le Masjid an-Nabawi, le niveau de confort et les besoins de votre séjour.',
      ctaPrimary: 'Recevoir une proposition personnalisée',
      ctaSecondary: 'Voir les hôtels sélectionnés',
      imageAlt: 'Vue du Masjid an-Nabawi à Madinah',
    },
    hotelsSection: {
      title: 'Quelques hôtels à Madinah',
      intro:
        'Voici une sélection d\'établissements déjà proposés par Haramain Prestige à Madinah. Les disponibilités, catégories de chambres et tarifs varient selon vos dates\u00a0: nous vérifions chaque demande avant de vous transmettre une proposition.',
      ctaLabel: 'Demander les disponibilités',
    },
    nabawiSection: {
      eyebrow: 'PROXIMITÉ DU MASJID AN-NABAWI',
      title: 'Choisir un hôtel proche du Masjid an-Nabawi',
      paragraphs: [
        'La distance jusqu\'au Masjid an-Nabawi est souvent le premier critère de choix à Madinah. Mais une distance seule ne suffit pas toujours\u00a0: l\'accès réel, le quartier, le chemin piéton et la porte de la Mosquée du Prophète que vous utilisez peuvent influencer vos déplacements quotidiens.',
        'Haramain Prestige étudie votre demande selon vos priorités et vous oriente vers des hôtels cohérents avec votre séjour, en tenant compte de votre budget et du niveau de confort souhaité.',
      ],
      criteria: [
        'Proximité souhaitée avec le Masjid an-Nabawi',
        'Budget par chambre et par nuit',
        'Catégorie d\'hôtel et niveau de confort',
        'Voyage en couple, famille ou groupe',
        'Facilité d\'accès à pied au Masjid an-Nabawi',
      ],
    },
    choiceSection: {
      eyebrow: 'SELON VOTRE SÉJOUR',
      title: 'Quel hôtel choisir à Madinah\u00a0?',
      paragraphs: [
        'Les besoins varient selon le type de séjour. Une famille avec enfants privilégiera souvent un accès simple et des espaces adaptés, tandis qu\'un voyageur seul ou un couple cherchera peut-être à maîtriser son budget tout en restant proche du Masjid an-Nabawi.',
        'Notre rôle est de comparer les options disponibles à vos dates et de vous présenter une sélection adaptée à vos critères, avec un interlocuteur unique pour votre demande.',
      ],
    },
    nabawiImportanceSection: {
      eyebrow: 'MADINAH AL-MUNAWWARAH',
      title: 'Pourquoi la proximité du Masjid an-Nabawi compte',
      paragraphs: [
        'Madinah accueille le Masjid an-Nabawi, la Mosquée du Prophète Muhammad ﷺ. Pour de nombreux pèlerins, pouvoir se rendre facilement à la Mosquée plusieurs fois par jour — pour les prières obligatoires ou les prières surérogatoires — est un élément essentiel du séjour.',
        'Un hôtel bien situé permet d\'organiser ses journées sereinement, sans dépendre d\'un transport à chaque déplacement. À l\'inverse, un établissement éloigné peut engendrer des frais supplémentaires ou une fatigue accrue. Haramain Prestige tient compte de cet équilibre dans chaque proposition.',
      ],
    },
    omraSection: {
      eyebrow: 'OMRA ET SÉJOUR À MADINAH',
      title: 'Séjour à Madinah dans le cadre de votre Omra',
      paragraphs: [
        'De nombreux voyageurs choisissent d\'associer à leur Omra un séjour à Madinah avant ou après leur passage à Makkah. La durée du séjour à Madinah varie selon les voyageurs\u00a0: certains restent quelques jours, d\'autres davantage.',
        'Haramain Prestige organise les deux étapes de votre séjour. Nous pouvons proposer un hôtel à Makkah et un hôtel à Madinah dans la même demande, ainsi que les transferts entre les deux villes si vous en avez besoin.',
      ],
      transfertDiscoverLabel: 'Organiser votre transfert depuis l\u2019a\u00e9roport de Madinah',
      visitesMadinahLinkLabel: 'Demander un accompagnement pour vos visites à Madinah',
    },
    bookingSection: {
      eyebrow: 'RÉSERVATION',
      title: 'Comment réserver votre hôtel à Madinah avec Haramain Prestige\u00a0?',
      paragraphs: [
        'Vous nous indiquez vos dates, le nombre de voyageurs, le nombre de chambres, votre budget et vos préférences. Nous recherchons ensuite les options correspondant à votre demande auprès de notre réseau de partenaires à Madinah.',
        'Vous recevez une proposition personnalisée. Vous pouvez réserver uniquement l\'hôtel ou compléter votre séjour avec les autres services disponibles, notamment les transferts depuis l\'aéroport de Madinah et les déplacements entre Makkah et Madinah.',
      ],
      steps: [
        'Vous nous transmettez vos dates et vos critères pour Madinah',
        'Nous vérifions les options et disponibilités correspondant à votre demande',
        'Vous recevez une proposition personnalisée avant de confirmer',
      ],
    },
    faq: {
      title: 'FAQ — Réserver un hôtel à Madinah',
      items: [
        {
          question: 'Proposez-vous des hôtels proches du Masjid an-Nabawi à Madinah\u00a0?',
          answer:
            'Oui. Haramain Prestige sélectionne des hôtels à Madinah selon la proximité souhaitée avec le Masjid an-Nabawi. La proposition dépend de vos dates, de votre budget et des disponibilités.',
        },
        {
          question: 'Puis-je réserver uniquement l\'hôtel à Madinah sans autre service\u00a0?',
          answer:
            'Oui. Vous pouvez demander uniquement votre hébergement à Madinah. Les transferts, chauffeurs et autres services restent facultatifs et peuvent être ajoutés selon vos besoins.',
        },
        {
          question: 'Organisez-vous le séjour complet Makkah + Madinah\u00a0?',
          answer:
            'Oui. Haramain Prestige peut organiser les deux étapes de votre séjour en même temps\u00a0: hôtel à Makkah, hôtel à Madinah et transferts entre les deux villes. Vous pouvez indiquer les deux villes dans votre demande de devis.',
        },
        {
          question: 'Puis-je demander un hôtel 3, 4 ou 5 étoiles à Madinah\u00a0?',
          answer:
            'Oui. Vous pouvez préciser la catégorie souhaitée dans votre demande. Nous recherchons ensuite les établissements disponibles correspondant à vos critères.',
        },
        {
          question: 'Comment se passe le transfert depuis l\'aéroport de Madinah\u00a0?',
          answer:
            'Nous organisons les transferts depuis l\'aéroport Prince Mohammad Bin Abdulaziz de Madinah vers votre hôtel. Ce service peut être ajouté à votre demande de devis.',
        },
        {
          question: 'Comment obtenir un devis pour un hôtel à Madinah\u00a0?',
          answer:
            'Remplissez le formulaire de demande avec vos dates, le nombre de voyageurs, votre budget et vos préférences. Haramain Prestige revient ensuite vers vous avec une proposition adaptée aux options disponibles à Madinah.',
        },
      ],
    },
    ctaBlock: {
      eyebrow: 'VOTRE SÉJOUR À MADINAH',
      title: 'Recevez une sélection d\'hôtels à Madinah adaptée à vos critères',
      paragraph:
        'Indiquez-nous vos dates, votre budget et la proximité souhaitée avec le Masjid an-Nabawi. Nous vous répondons avec une proposition personnalisée selon les disponibilités.',
      ctaPrimary: 'Demander mon devis hôtel',
      ctaSecondary: 'Écrire sur WhatsApp',
    },
  },

  transfertJeddahMakkahPage: {
    backHome: "Retour à l'accueil",
    hero: {
      eyebrow: 'TRANSFERT A\u00c9ROPORT \u00b7 JEDDAH \u2192 MAKKAH',
      title: 'Transfert a\u00e9roport Jeddah \u2013 Makkah\u00a0: organisez votre trajet vers La Mecque',
      intro:
        "Haramain Prestige vous accompagne pour organiser votre transfert entre l'a\u00e9roport de Jeddah et Makkah (La Mecque). Transmettez-nous vos informations de voyage, le nombre de passagers et vos besoins afin que nous puissions vous proposer une solution adapt\u00e9e.",
      ctaPrimary: 'Demander mon transfert',
      ctaSecondary: 'Comment \u00e7a fonctionne\u00a0?',
      imageAlt: "Transfert entre l'a\u00e9roport de Jeddah et Makkah",
    },
    trajetSection: {
      eyebrow: 'DE JEDDAH \u00c0 MAKKAH',
      title: "Un transfert organis\u00e9 depuis l'a\u00e9roport de Jeddah vers Makkah",
      paragraphs: [
        "Apr\u00e8s votre arriv\u00e9e \u00e0 Jeddah, rejoindre votre h\u00e9bergement \u00e0 Makkah n\u00e9cessite d\u2019anticiper votre transport. Haramain Prestige peut organiser votre transfert selon les informations transmises dans votre demande.",
        'Pour pr\u00e9parer la prestation, nous avons notamment besoin de conna\u00eetre votre date d\u2019arriv\u00e9e, les informations utiles li\u00e9es \u00e0 votre vol, le nombre de voyageurs et votre destination \u00e0 Makkah.',
      ],
    },
    criteresSection: {
      eyebrow: 'VOTRE DEMANDE',
      title: 'Quelles informations transmettre pour votre transfert\u00a0?',
      paragraphs: [
        'Plus votre demande est pr\u00e9cise, plus nous pouvons rechercher une solution correspondant \u00e0 votre trajet.',
      ],
      criteriaLabel: 'INFORMATIONS UTILES',
      criteria: [
        'Date du transfert',
        'Heure ou informations du vol',
        'A\u00e9roport ou terminal si n\u00e9cessaire',
        'Nombre de voyageurs',
        'Destination \u00e0 Makkah',
        'Besoins particuliers \u00e0 pr\u00e9ciser dans la demande',
      ],
    },
    arriveeSection: {
      eyebrow: 'ARRIV\u00c9E EN ARABIE SAOUDITE',
      title: "Pr\u00e9parer votre arriv\u00e9e \u00e0 l'a\u00e9roport de Jeddah",
      paragraphs: [
        "Pour limiter les impr\u00e9vus \u00e0 votre arriv\u00e9e, il est pr\u00e9f\u00e9rable d\u2019organiser votre transfert avant votre voyage. Les informations de vol permettent notamment d\u2019identifier le trajet concern\u00e9 et de pr\u00e9parer la prestation demand\u00e9e.",
        "Si vos horaires ou vos informations de voyage changent, transmettez-nous les nouvelles donn\u00e9es afin que votre demande puisse \u00eatre r\u00e9\u00e9valu\u00e9e si n\u00e9cessaire.",
      ],
    },
    retourSection: {
      eyebrow: 'MAKKAH \u2192 JEDDAH',
      title: "Transfert de Makkah vers l'a\u00e9roport de Jeddah",
      paragraphs: [
        "Le service peut \u00e9galement concerner votre trajet retour depuis Makkah vers l'a\u00e9roport de Jeddah. Indiquez votre horaire de vol et votre lieu de d\u00e9part afin que le transfert puisse \u00eatre organis\u00e9 en tenant compte de votre programme.",
        "Il est conseill\u00e9 de pr\u00e9voir une marge adapt\u00e9e avant le d\u00e9part de votre vol. L\u2019heure de prise en charge doit \u00eatre d\u00e9termin\u00e9e selon votre situation, votre vol et les conditions du trajet.",
      ],
    },
    reservationSection: {
      eyebrow: 'SERVICE PERSONNALIS\u00c9',
      title: 'Pourquoi r\u00e9server votre transfert \u00e0 l\u2019avance\u00a0?',
      paragraphs: [
        "R\u00e9server votre transport avant votre arriv\u00e9e permet de pr\u00e9parer votre trajet dans le cadre global de votre s\u00e9jour et d\u2019\u00e9viter de devoir rechercher une solution une fois sur place.",
        "Haramain Prestige centralise votre demande et peut int\u00e9grer le transfert aux autres prestations de votre s\u00e9jour, notamment votre h\u00e9bergement \u00e0 Makkah lorsque vous nous confiez \u00e9galement cette r\u00e9servation.",
      ],
      chauffeurLinkLabel: 'D\u00e9couvrir notre service chauffeur \u00e0 Makkah & Madinah',
    },
    makkahSection: {
      eyebrow: 'VOTRE S\u00c9JOUR \u00c0 MAKKAH',
      title: 'Compl\u00e9tez votre transfert avec votre h\u00f4tel \u00e0 Makkah',
      paragraphs: [
        "Vous pouvez demander uniquement votre transfert ou nous confier \u00e9galement la recherche de votre h\u00e9bergement \u00e0 Makkah. Haramain Prestige peut ainsi prendre en compte les diff\u00e9rentes \u00e9tapes de votre s\u00e9jour dans une m\u00eame demande.",
      ],
      makkahLinkLabel: "D\u00e9couvrir nos h\u00f4tels \u00e0 Makkah",
    },
    fonctionnementSection: {
      eyebrow: 'COMMENT \u00c7A MARCHE\u00a0?',
      title: 'Comment r\u00e9server votre transfert Jeddah \u2013 Makkah\u00a0?',
      paragraphs: [
        "Transmettez-nous les informations essentielles concernant votre trajet. Nous v\u00e9rifions ensuite les possibilit\u00e9s correspondant \u00e0 votre demande avant de vous transmettre une proposition.",
      ],
      steps: [
        'Vous nous transmettez vos informations de voyage',
        'Nous v\u00e9rifions la solution correspondant \u00e0 votre trajet',
        'Vous recevez une proposition avant de confirmer votre transfert',
      ],
    },
    faq: {
      title: 'FAQ \u2014 Transfert a\u00e9roport Jeddah \u2013 Makkah',
      items: [
        {
          question: "Peut-on r\u00e9server un transfert de l'a\u00e9roport de Jeddah vers Makkah\u00a0?",
          answer:
            "Oui. Haramain Prestige peut organiser votre transfert depuis l\u2019a\u00e9roport de Jeddah vers votre destination \u00e0 Makkah selon les informations et disponibilit\u00e9s correspondant \u00e0 votre demande.",
        },
        {
          question: "Peut-on r\u00e9server le trajet Makkah vers l'a\u00e9roport de Jeddah\u00a0?",
          answer:
            "Oui. Vous pouvez \u00e9galement demander un transfert depuis Makkah vers l\u2019a\u00e9roport de Jeddah pour votre vol retour.",
        },
        {
          question: 'Quelles informations faut-il transmettre pour r\u00e9server\u00a0?',
          answer:
            "Indiquez notamment votre date de transfert, les informations utiles de votre vol, le nombre de voyageurs et votre lieu de prise en charge ou de destination.",
        },
        {
          question: 'Peut-on r\u00e9server un transfert pour une famille ou un groupe\u00a0?',
          answer:
            "Oui. Pr\u00e9cisez le nombre de voyageurs dans votre demande afin qu\u2019une solution adapt\u00e9e puisse \u00eatre recherch\u00e9e selon les disponibilit\u00e9s.",
        },
        {
          question: "Puis-je r\u00e9server mon h\u00f4tel \u00e0 Makkah en m\u00eame temps que mon transfert\u00a0?",
          answer:
            "Oui. Vous pouvez demander votre transfert seul ou compl\u00e9ter votre demande avec une r\u00e9servation d\u2019h\u00f4tel \u00e0 Makkah et les autres services propos\u00e9s par Haramain Prestige.",
        },
        {
          question: 'Comment obtenir le tarif d\u2019un transfert Jeddah \u2013 Makkah\u00a0?',
          answer:
            "Transmettez les informations de votre trajet dans votre demande. Haramain Prestige vous communiquera une proposition correspondant \u00e0 votre besoin et aux options disponibles.",
        },
      ],
    },
    ctaBlock: {
      eyebrow: 'VOTRE TRANSFERT',
      title: 'Organisez votre transfert entre Jeddah et Makkah',
      paragraph:
        "Indiquez-nous votre date, vos informations de voyage et le nombre de passagers afin de recevoir une proposition adapt\u00e9e \u00e0 votre trajet.",
      ctaPrimary: 'Demander mon transfert',
      ctaSecondary: '\u00c9crire sur WhatsApp',
    },
  },

  transfertAeroportMadinahPage: {
    backHome: "Retour à l'accueil",
    hero: {
      eyebrow: 'TRANSFERT A\u00c9ROPORT \u00b7 MADINAH',
      title: 'Transfert a\u00e9roport Madinah\u00a0: rejoignez votre h\u00f4tel \u00e0 M\u00e9dine sereinement',
      intro:
        "Haramain Prestige vous accompagne pour organiser votre transfert entre l'a\u00e9roport de Madinah et votre h\u00e9bergement \u00e0 M\u00e9dine. Transmettez-nous vos informations de voyage, le nombre de passagers et votre destination afin que nous puissions rechercher une solution adapt\u00e9e.",
      ctaPrimary: 'Demander mon transfert',
      ctaSecondary: 'Comment \u00e7a fonctionne\u00a0?',
      imageAlt: 'Vue du Masjid an-Nabawi \u00e0 Madinah',
    },
    trajetSection: {
      eyebrow: "DE L'A\u00c9ROPORT \u00c0 VOTRE H\u00d4TEL",
      title: "Organiser votre transfert depuis l'a\u00e9roport de Madinah",
      paragraphs: [
        "Apr\u00e8s votre arriv\u00e9e \u00e0 l'a\u00e9roport de Madinah, votre transfert vers votre h\u00f4tel peut \u00eatre pr\u00e9par\u00e9 \u00e0 l'avance selon les informations transmises dans votre demande.",
        "Indiquez notamment votre date d'arriv\u00e9e, les informations utiles li\u00e9es \u00e0 votre vol, le nombre de voyageurs et votre destination \u00e0 M\u00e9dine afin que Haramain Prestige puisse rechercher une solution adapt\u00e9e.",
      ],
    },
    criteresSection: {
      eyebrow: 'VOTRE DEMANDE',
      title: 'Quelles informations transmettre pour votre transfert \u00e0 Madinah\u00a0?',
      paragraphs: [
        'Plus votre demande est pr\u00e9cise, plus nous pouvons rechercher une solution correspondant \u00e0 votre trajet.',
      ],
      criteriaLabel: 'INFORMATIONS UTILES',
      criteria: [
        'Date du transfert',
        'Heure ou informations du vol',
        'Nombre de voyageurs',
        'H\u00f4tel ou adresse de destination',
        'Besoins particuliers \u00e0 pr\u00e9ciser',
        'Informations compl\u00e9mentaires utiles au trajet',
      ],
    },
    aeroportSection: {
      eyebrow: 'A\u00c9ROPORT DE MADINAH',
      title: 'Votre arriv\u00e9e \u00e0 l\u2019a\u00e9roport Prince Mohammad Bin Abdulaziz',
      paragraphs: [
        "L'a\u00e9roport Prince Mohammad Bin Abdulaziz dessert Madinah et accueille de nombreux voyageurs se rendant dans la ville. Pr\u00e9parer votre transfert avant votre arriv\u00e9e permet d\u2019int\u00e9grer ce trajet \u00e0 l\u2019organisation g\u00e9n\u00e9rale de votre s\u00e9jour.",
        "Si vos horaires ou vos informations de voyage changent, transmettez-nous les nouvelles donn\u00e9es afin que votre demande puisse \u00eatre adapt\u00e9e si n\u00e9cessaire.",
      ],
    },
    retourSection: {
      eyebrow: 'H\u00d4TEL \u2192 A\u00c9ROPORT',
      title: "Transfert de votre h\u00f4tel \u00e0 Madinah vers l'a\u00e9roport",
      paragraphs: [
        "Le service peut \u00e9galement concerner votre trajet retour depuis votre h\u00f4tel \u00e0 Madinah vers l'a\u00e9roport. Indiquez votre horaire de vol et votre lieu de d\u00e9part afin que la prestation puisse \u00eatre organis\u00e9e selon votre programme.",
        "L\u2019heure de prise en charge doit \u00eatre d\u00e9finie en fonction de votre vol, de votre lieu de d\u00e9part et des conditions du trajet.",
      ],
    },
    nabawiSection: {
      eyebrow: 'VOTRE S\u00c9JOUR \u00c0 MADINAH',
      title: 'Rejoindre votre h\u00f4tel pr\u00e8s du Masjid an-Nabawi',
      paragraphs: [
        'De nombreux voyageurs choisissent un h\u00f4tel situ\u00e9 \u00e0 proximit\u00e9 du Masjid an-Nabawi. Lors de votre demande de transfert, indiquez simplement votre h\u00f4tel ou votre destination exacte afin que le trajet corresponde \u00e0 votre h\u00e9bergement.',
        'Vous pouvez \u00e9galement confier \u00e0 Haramain Prestige la recherche de votre h\u00f4tel \u00e0 Madinah dans la m\u00eame demande.',
      ],
      madinahLinkLabel: 'D\u00e9couvrir nos h\u00f4tels \u00e0 Madinah',
    },
    reservationSection: {
      eyebrow: 'SERVICE PERSONNALIS\u00c9',
      title: 'Pourquoi organiser votre transfert avant votre arriv\u00e9e\u00a0?',
      paragraphs: [
        "Pr\u00e9parer votre transfert \u00e0 l\u2019avance permet d\u2019int\u00e9grer votre arriv\u00e9e \u00e0 Madinah dans l\u2019organisation g\u00e9n\u00e9rale de votre s\u00e9jour et d\u2019\u00e9viter de rechercher une solution au dernier moment.",
        "Haramain Prestige peut centraliser votre demande de transfert avec les autres prestations de votre s\u00e9jour lorsque vous nous confiez \u00e9galement votre h\u00e9bergement ou d\u2019autres d\u00e9placements.",
      ],
      chauffeurLinkLabel: 'D\u00e9couvrir notre service chauffeur \u00e0 Makkah & Madinah',
    },
    fonctionnementSection: {
      eyebrow: 'COMMENT \u00c7A MARCHE\u00a0?',
      title: "Comment r\u00e9server votre transfert depuis l'a\u00e9roport de Madinah\u00a0?",
      paragraphs: [
        "Transmettez-nous les informations essentielles concernant votre arriv\u00e9e ou votre d\u00e9part. Nous v\u00e9rifions ensuite les possibilit\u00e9s correspondant \u00e0 votre demande avant de vous transmettre une proposition.",
      ],
      steps: [
        'Vous nous transmettez vos informations de voyage',
        'Nous v\u00e9rifions la solution correspondant \u00e0 votre trajet',
        'Vous recevez une proposition avant de confirmer votre transfert',
      ],
    },
    faq: {
      title: 'FAQ \u2014 Transfert a\u00e9roport Madinah',
      items: [
        {
          question: "Peut-on r\u00e9server un transfert depuis l'a\u00e9roport de Madinah\u00a0?",
          answer:
            "Oui. Haramain Prestige peut organiser votre transfert depuis l\u2019a\u00e9roport de Madinah vers votre h\u00f4tel ou votre destination dans la ville selon les informations et disponibilit\u00e9s correspondant \u00e0 votre demande.",
        },
        {
          question: 'Peut-on r\u00e9server le transfert retour vers l\u2019a\u00e9roport\u00a0?',
          answer:
            "Oui. Vous pouvez \u00e9galement demander un transfert depuis votre h\u00f4tel \u00e0 Madinah vers l\u2019a\u00e9roport pour votre d\u00e9part.",
        },
        {
          question: 'Quelles informations faut-il transmettre\u00a0?',
          answer:
            "Indiquez notamment votre date de transfert, les informations utiles li\u00e9es \u00e0 votre vol, le nombre de voyageurs et votre h\u00f4tel ou adresse de destination.",
        },
        {
          question: 'Peut-on r\u00e9server un transfert pour une famille ou un groupe\u00a0?',
          answer:
            "Oui. Pr\u00e9cisez le nombre de voyageurs dans votre demande afin qu\u2019une solution adapt\u00e9e puisse \u00eatre recherch\u00e9e selon les disponibilit\u00e9s.",
        },
        {
          question: 'Puis-je r\u00e9server mon h\u00f4tel \u00e0 Madinah en m\u00eame temps\u00a0?',
          answer:
            "Oui. Vous pouvez demander uniquement votre transfert ou compl\u00e9ter votre demande avec une r\u00e9servation d\u2019h\u00f4tel \u00e0 Madinah et les autres services propos\u00e9s par Haramain Prestige.",
        },
        {
          question: 'Comment obtenir le tarif du transfert\u00a0?',
          answer:
            "Transmettez les informations de votre trajet dans votre demande. Haramain Prestige vous communiquera une proposition correspondant \u00e0 votre besoin et aux options disponibles.",
        },
      ],
    },
    ctaBlock: {
      eyebrow: 'VOTRE ARRIV\u00c9E \u00c0 MADINAH',
      title: "Organisez votre transfert depuis l'a\u00e9roport de Madinah",
      paragraph:
        "Indiquez-nous votre date, vos informations de voyage, votre destination et le nombre de passagers afin de recevoir une proposition adapt\u00e9e.",
      ctaPrimary: 'Demander mon transfert',
      ctaSecondary: '\u00c9crire sur WhatsApp',
    },
  },

  chauffeurPriveMakkahMadinahPage: {
    backHome: "Retour \u00e0 l\u2019accueil",
    hero: {
      eyebrow: 'SERVICE DE TRANSPORT',
      title: 'Chauffeur priv\u00e9 \u00e0 Makkah et Madinah\u00a0: organisez vos d\u00e9placements',
      intro:
        'Organisez vos d\u00e9placements locaux \u00e0 Makkah et Madinah avec un service de chauffeur adapt\u00e9 \u00e0 votre programme de s\u00e9jour.',
      ctaPrimary: 'Faire une demande',
      ctaSecondary: 'Voir comment \u00e7a marche',
      imageAlt: 'V\u00e9hicule de transfert sur la route vers Makkah',
    },
    trajetPrincipalSection: {
      eyebrow: 'D\u00c9PLACEMENTS SUR MESURE',
      title: 'Vos d\u00e9placements \u00e0 Makkah et Madinah avec chauffeur',
      paragraphs: [
        "Haramain Prestige vous propose une solution de transport avec chauffeur pour vos d\u00e9placements \u00e0 Makkah et \u00e0 Madinah, selon votre programme de s\u00e9jour. Que vous souhaitiez vous rendre entre deux sites spirituels, rejoindre votre h\u00f4tel ou organiser un trajet sp\u00e9cifique, nous \u00e9tudions votre demande et vous transmettons une proposition adapt\u00e9e.",
        "Ce service s\u2019adresse aux p\u00e8lerins et aux voyageurs qui souhaitent organiser leurs transports locaux \u00e0 l\u2019avance, sans avoir \u00e0 g\u00e9rer cela sur place. Votre confort et votre s\u00e9r\u00e9nit\u00e9 pendant votre s\u00e9jour sont au c\u0153ur de notre d\u00e9marche.",
      ],
    },
    criteresSection: {
      eyebrow: 'VOTRE DEMANDE',
      title: 'Quelles informations transmettre pour r\u00e9server un chauffeur\u00a0?',
      paragraphs: [
        'Plus votre demande est pr\u00e9cise, plus il est simple de rechercher une solution correspondant \u00e0 votre programme.',
      ],
      criteriaLabel: 'INFORMATIONS UTILES',
      criteria: [
        'Date du d\u00e9placement',
        'Heure souhait\u00e9e',
        'Lieu de d\u00e9part',
        'Destination',
        'Nombre de voyageurs',
        'Besoins particuliers \u00e0 pr\u00e9ciser dans la demande',
      ],
    },
    makkahSection: {
      eyebrow: 'D\u00c9PLACEMENTS \u00c0 MAKKAH',
      title: 'Service de chauffeur pour vos d\u00e9placements \u00e0 Makkah',
      paragraphs: [
        "Pendant votre s\u00e9jour \u00e0 Makkah, certains d\u00e9placements peuvent n\u00e9cessiter une organisation pr\u00e9alable selon votre h\u00e9bergement et votre programme.",
        "Indiquez votre lieu de d\u00e9part, votre destination et l\u2019horaire souhait\u00e9 afin que Haramain Prestige puisse rechercher une solution correspondant \u00e0 votre demande.",
      ],
      makkahLinkLabel: 'Voir nos h\u00f4tels \u00e0 Makkah',
      visitesMakkahLinkLabel: 'Visites à Makkah',
    },
    madinahSection: {
      eyebrow: 'D\u00c9PLACEMENTS \u00c0 MADINAH',
      title: 'Service de chauffeur pour vos d\u00e9placements \u00e0 Madinah',
      paragraphs: [
        "Haramain Prestige peut \u00e9galement prendre en compte vos besoins de d\u00e9placement pendant votre s\u00e9jour \u00e0 Madinah. Votre demande doit pr\u00e9ciser le point de d\u00e9part, la destination, les horaires souhait\u00e9s et le nombre de voyageurs.",
        "Vous pouvez int\u00e9grer ces d\u00e9placements \u00e0 une demande comprenant \u00e9galement votre h\u00e9bergement \u00e0 Madinah.",
      ],
      madinahLinkLabel: 'Voir nos h\u00f4tels \u00e0 Madinah',
      visitesMadinahLinkLabel: 'Visites à Madinah',
    },
    entreVillesSection: {
      eyebrow: 'MAKKAH \u2194 MADINAH',
      title: 'D\u00e9placements entre Makkah et Madinah',
      paragraphs: [
        "Le trajet entre Makkah et Madinah est une \u00e9tape cl\u00e9 pour de nombreux p\u00e8lerins. Il peut s\u2019effectuer par diff\u00e9rents moyens, selon votre situation et vos pr\u00e9f\u00e9rences. Haramain Prestige peut \u00e9tudier cette option dans votre demande globale.",
        "Si vous pr\u00e9voyez un s\u00e9jour dans les deux villes, indiquez-le lors de votre demande. Nous pourrons ainsi prendre en compte l\u2019ensemble de vos besoins de transport et vous proposer une organisation coh\u00e9rente.",
      ],
    },
    chauffeurVsTransfertSection: {
      eyebrow: 'COMPRENDRE NOS SERVICES',
      title: 'Chauffeur priv\u00e9 ou transfert\u00a0: quelles diff\u00e9rences\u00a0?',
      paragraphs: [
        "Le transfert a\u00e9roport est un trajet ponctuel entre un a\u00e9roport et votre h\u00f4tel. Le service chauffeur couvre des d\u00e9placements plus larges pendant votre s\u00e9jour\u00a0: visites, trajets entre villes, courses diverses selon votre programme.",
        "Ces deux services sont compl\u00e9mentaires et peuvent \u00eatre inclus dans votre demande globale chez Haramain Prestige. Consultez nos pages d\u00e9di\u00e9es aux transferts pour en savoir plus.",
      ],
      jeddahLinkLabel: 'Transfert a\u00e9roport Jeddah \u2013 Makkah',
      madinahTransfertLinkLabel: 'Transfert a\u00e9roport Madinah',
    },
    anticipationSection: {
      eyebrow: 'R\u00c9SERVATION \u00c0 L\u2019AVANCE',
      title: 'Pourquoi organiser vos d\u00e9placements avant votre arriv\u00e9e\u00a0?',
      paragraphs: [
        "Organiser vos transports \u00e0 l\u2019avance vous permet de pr\u00e9parer votre s\u00e9jour sereinement et d\u2019\u00e9viter les impr\u00e9vus sur place, notamment pendant les p\u00e9riodes de forte affluence comme le Hajj ou le Ramadan.",
        "En nous transmettant votre programme et vos besoins avant votre d\u00e9part, nous pouvons \u00e9tablir une proposition adapt\u00e9e et la valider avec vous dans les meilleures conditions.",
      ],
    },
    fonctionnementSection: {
      eyebrow: 'COMMENT \u00c7A MARCHE\u00a0?',
      title: 'Comment r\u00e9server votre service de chauffeur\u00a0?',
      paragraphs: [
        "Pour demander un service de chauffeur avec Haramain Prestige, il vous suffit de nous transmettre votre programme et vos besoins. Nous \u00e9tudions votre demande et vous proposons une organisation adapt\u00e9e.",
      ],
      steps: [
        "Transmettez votre demande via le formulaire ou WhatsApp avec vos dates, villes et besoins",
        "Nous \u00e9tudions votre programme et vous contactons pour pr\u00e9ciser les d\u00e9tails",
        "Nous vous soumettons une proposition adapt\u00e9e \u00e0 votre s\u00e9jour",
        "Vous confirmez et nous finalisons l\u2019organisation selon votre programme",
      ],
    },
    faq: {
      title: 'Questions fr\u00e9quentes sur notre service chauffeur',
      items: [
        {
          question: 'Le service chauffeur est-il disponible \u00e0 Makkah et Madinah\u00a0?',
          answer:
            "Oui, Haramain Prestige peut organiser des d\u00e9placements avec chauffeur dans les deux villes. Transmettez-nous votre programme et vos besoins pour que nous puissions \u00e9tudier votre demande.",
        },
        {
          question: 'Puis-je r\u00e9server un chauffeur juste pour une journ\u00e9e\u00a0?',
          answer:
            "Nous \u00e9tudions chaque demande individuellement. Selon votre programme et vos besoins, nous vous proposerons une organisation adapt\u00e9e. Transmettez-nous les d\u00e9tails de votre s\u00e9jour pour recevoir une proposition.",
        },
        {
          question: 'Puis-je combiner chauffeur et h\u00f4tel dans une seule demande\u00a0?',
          answer:
            "Oui, c\u2019est m\u00eame recommand\u00e9. En confiant l\u2019ensemble de votre s\u00e9jour \u00e0 Haramain Prestige, nous pouvons coordonner votre h\u00e9bergement et vos transports selon votre programme global.",
        },
        {
          question: 'Comment puis-je demander un service de chauffeur\u00a0?',
          answer:
            "Utilisez notre formulaire de demande ou contactez-nous directement via WhatsApp. Pr\u00e9cisez vos dates, villes concern\u00e9es, type de d\u00e9placements et nombre de personnes.",
        },
        {
          question: 'Le chauffeur parlera-t-il fran\u00e7ais\u00a0?',
          answer:
            "Nous ne pouvons pas garantir un chauffeur francophone dans tous les cas. Nous vous indiquerons les conditions de communication lors de la proposition.",
        },
        {
          question: 'Quel est le d\u00e9lai pour soumettre une demande\u00a0?',
          answer:
            "Nous vous recommandons de soumettre votre demande le plus t\u00f4t possible avant votre d\u00e9part, afin d\u2019avoir le temps de valider ensemble les d\u00e9tails de l\u2019organisation.",
        },
      ],
    },
    ctaBlock: {
      eyebrow: 'PR\u00cAT \u00c0 PARTIR\u00a0?',
      title: 'Demandez votre service de chauffeur',
      paragraph:
        "Transmettez-nous votre programme et nous \u00e9tudions comment organiser vos d\u00e9placements \u00e0 Makkah et Madinah selon vos besoins.",
      ctaPrimary: 'Faire une demande',
      ctaSecondary: '\u00c9crire sur WhatsApp',
    },
  },

  meta: {
    home: {
      title: "Haramain Prestige – Réservation d'hôtels à Makkah & Madinah",
      description:
        "Haramain Prestige — réservation d'hôtels et accompagnement à Makkah & Madinah.",
    },
    about: {
      title: 'Haramain Prestige | Conciergerie à Makkah & Madinah',
      description:
        "Haramain Prestige, conciergerie de séjour à Makkah et Madinah : présence locale, réservation d'hôtels à tarifs négociés et accompagnement personnalisé pour votre séjour.",
    },
    legal: {
      title: 'Mentions légales — Haramain Prestige',
      description:
        'Mentions légales du site Haramain Prestige : éditeur, hébergeur, propriété intellectuelle et contact.',
    },
    privacy: {
      title: 'Politique de confidentialité — Haramain Prestige',
      description:
        'Politique de confidentialité de Haramain Prestige : données collectées, finalités, durée de conservation et droits RGPD.',
    },
    notFound: {
      title: 'Page introuvable — Haramain Prestige',
      description: "La page que vous cherchez n'existe pas ou a été déplacée.",
    },
    hotelsMakkah: {
      title: 'Hôtels à Makkah près du Haram | Haramain Prestige',
      description:
        'Trouvez votre hôtel à Makkah avec Haramain Prestige\u00a0: établissements sélectionnés près du Masjid al-Haram, tarifs négociés et accompagnement personnalisé.',
    },
    hotelsMadinah: {
      title: 'Hôtels à Madinah près du Masjid an-Nabawi | Haramain Prestige',
      description:
        'Trouvez votre hôtel à Madinah avec Haramain Prestige\u00a0: établissements sélectionnés près du Masjid an-Nabawi, tarifs négociés et accompagnement personnalisé.',
    },
    chambreVueKaaba: {
      title: 'Chambre avec vue sur la Kaaba à Makkah | Haramain Prestige',
      description:
        'Recherchez une chambre ou suite avec vue sur la Kaaba à Makkah. Haramain Prestige vérifie les catégories disponibles selon vos dates et vos critères.',
    },
    transfertJeddahMakkah: {
      title: 'Transfert aéroport Jeddah \u2013 Makkah | Haramain Prestige',
      description:
        "Organisez votre transfert entre l'aéroport de Jeddah et Makkah avec Haramain Prestige. Indiquez vos horaires et le nombre de voyageurs pour recevoir une proposition personnalisée.",
    },
    transfertAeroportMadinah: {
      title: 'Transfert a\u00e9roport Madinah \u2013 h\u00f4tel | Haramain Prestige',
      description:
        "Organisez votre transfert entre l'a\u00e9roport de Madinah et votre h\u00f4tel \u00e0 M\u00e9dine avec Haramain Prestige. Indiquez vos horaires et le nombre de voyageurs pour recevoir une proposition personnalis\u00e9e.",
    },
    chauffeurPriveMakkahMadinah: {
      title: 'Chauffeur priv\u00e9 Makkah & Madinah | Haramain Prestige',
      description:
        "Organisez vos d\u00e9placements locaux \u00e0 Makkah et Madinah avec un service de chauffeur. Haramain Prestige \u00e9tudie votre demande et vous propose une organisation adapt\u00e9e \u00e0 votre programme.",
    },
    visitesMadinah: {
      title: 'Visites à Madinah : sites spirituels & accompagnement | Haramain Prestige',
      description:
        'Découvrez les sites spirituels de Madinah — Masjid Quba, Mont Uhud, Masjid al-Qiblatayn et plus. Haramain Prestige peut organiser un accompagnement selon les possibilités disponibles.',
    },
    visitesMakkah: {
      title: 'Visites à Makkah : sites historiques & accompagnement | Haramain Prestige',
      description:
        'Découvrez les sites historiques de Makkah — Jabal al-Nour, Jabal Thawr, Arafat et plus. Haramain Prestige peut organiser un accompagnement selon les possibilités disponibles.',
    },
    services: {
      title: 'Services à Makkah & Madinah | Haramain Prestige',
      description:
        'Découvrez les services Haramain Prestige à Makkah et Madinah : transferts aéroport, chauffeur privé et organisation de visites selon votre programme.',
    },
    hotels: {
      title: 'Hôtels à Makkah & Madinah | Haramain Prestige',
      description:
        'Découvrez les hôtels Haramain Prestige à Makkah et Madinah : établissements sélectionnés près du Haram, tarifs négociés et accompagnement personnalisé.',
    },
  },

  visitesMadinahPage: {
    backHome: "Retour à l'accueil",
    hero: {
      eyebrow: 'VISITES · MADINAH AL-MUNAWWARAH',
      title: 'Visites à Madinah : découvrez les sites spirituels de la Ville du Prophète',
      intro:
        'Madinah abrite des sites de grande importance spirituelle que de nombreux pèlerins souhaitent visiter lors de leur séjour. Haramain Prestige peut, selon les possibilités disponibles, organiser un accompagnement pour vous permettre de vous rendre sur ces lieux dans de bonnes conditions.',
      ctaPrimary: 'Préciser ma demande de visite',
      ctaSecondary: 'Comment ça fonctionne\u00a0?',
      imageAlt: 'Vue du Masjid an-Nabawi à Madinah',
    },
    decouvrirSection: {
      eyebrow: 'MADINAH AL-MUNAWWARAH',
      title: 'Visiter les sites spirituels de Madinah',
      paragraphs: [
        "Madinah est l'une des deux villes saintes de l'islam. Elle abrite le Masjid an-Nabawi, la Mosquée du Prophète Muhammad ﷺ, ainsi que d'autres sites d'une grande valeur spirituelle pour les pèlerins et les voyageurs qui s'y rendent.",
        "Lors d'un séjour à Madinah, certains pèlerins souhaitent visiter des lieux emblématiques au-delà de la Mosquée du Prophète. Haramain Prestige peut, selon les possibilités disponibles, organiser un accompagnement pour vous aider à vous rendre sur ces sites dans de bonnes conditions.",
      ],
    },
    lieuxSection: {
      eyebrow: 'SITES À VISITER',
      title: 'Quelques lieux emblématiques que vous pouvez demander à visiter',
      paragraphs: [
        'Ces sites peuvent être inclus dans votre demande d\'accompagnement, selon les possibilités disponibles. Précisez les lieux qui vous intéressent lors de votre demande.',
      ],
      criteriaLabel: 'EXEMPLES DE SITES',
      criteria: [
        'Masjid Quba',
        'Mont Uhud',
        'Masjid al-Qiblatayn',
        'Autres lieux selon votre demande',
        'Votre hôtel ou point de départ',
        'Étapes supplémentaires à préciser',
      ],
    },
    ziyaratSection: {
      eyebrow: 'VOTRE DEMANDE',
      title: 'Comment demander un accompagnement pour vos visites à Madinah',
      paragraphs: [
        'Pour permettre à Haramain Prestige d\'étudier votre demande, précisez les sites que vous souhaitez visiter, la date envisagée, le nombre de personnes et votre point de départ (généralement votre hôtel). Plus votre demande est précise, mieux nous pouvons rechercher une solution correspondant à votre programme.',
        "Haramain Prestige ne garantit pas un programme fixe ni un itinéraire prédéfini. Chaque demande est étudiée selon les possibilités disponibles au moment de votre séjour.",
      ],
    },
    personalisationSection: {
      eyebrow: 'SELON VOS BESOINS',
      title: 'Un accompagnement adapté à votre séjour',
      paragraphs: [
        "Votre demande peut être intégrée à une organisation plus large de votre séjour : hébergement à Madinah, transfert depuis l'aéroport, déplacements entre Makkah et Madinah. Haramain Prestige étudie l'ensemble de votre programme pour vous proposer une organisation cohérente.",
        "Si vous souhaitez visiter plusieurs sites lors d'une même journée, indiquez-le dans votre demande. Nous vérifions si cette organisation est réalisable selon les disponibilités et nous vous transmettons une proposition.",
      ],
    },
    hotelSection: {
      eyebrow: 'HÉBERGEMENT À MADINAH',
      title: 'Combinez vos visites avec votre hôtel à Madinah',
      paragraphs: [
        "Si vous n'avez pas encore réservé votre hébergement à Madinah, Haramain Prestige peut également vous accompagner dans la recherche de votre hôtel. Nous sélectionnons des établissements proches du Masjid an-Nabawi selon vos critères et disponibilités.",
      ],
      hotelLinkLabel: 'Voir nos hôtels à Madinah',
    },
    chauffeurSection: {
      eyebrow: 'DÉPLACEMENTS & TRANSPORT',
      title: 'Service de chauffeur pour vos déplacements à Madinah',
      paragraphs: [
        "Pour vous rendre sur les sites spirituels de Madinah, un service de transport avec chauffeur peut être demandé. Haramain Prestige peut étudier cette option dans votre demande et vous proposer une organisation selon les possibilités disponibles.",
      ],
      chauffeurLinkLabel: 'Découvrir le service chauffeur',
      visitesMakkahLinkLabel: 'Visites à Makkah',
    },
    fonctionnementSection: {
      eyebrow: 'COMMENT ÇA MARCHE\u00a0?',
      title: 'Comment organiser vos visites à Madinah avec Haramain Prestige',
      paragraphs: [
        "Transmettez-nous les informations concernant vos visites souhaitées. Nous étudions les possibilités disponibles et vous transmettons une proposition avant de confirmer l'organisation.",
      ],
      steps: [
        'Vous précisez les sites souhaités, la date, le nombre de personnes et votre hôtel',
        'Haramain Prestige étudie les possibilités disponibles pour votre demande',
        'Vous recevez une proposition et confirmez l\'organisation selon vos besoins',
      ],
    },
    faq: {
      title: 'Questions fréquentes — Visites à Madinah',
      items: [
        {
          question: 'Proposez-vous des visites guidées à Madinah\u00a0?',
          answer:
            "Le contenu exact de la prestation dépend de la proposition qui vous est transmise. Si vous recherchez un accompagnement particulier ou des explications pendant les visites, précisez-le dans votre demande afin que nous puissions vous confirmer ce qui peut être proposé.",
        },
        {
          question: 'Quels sites peut-on visiter à Madinah\u00a0?',
          answer:
            "Parmi les lieux souvent demandés : Masjid Quba, le Mont Uhud, Masjid al-Qiblatayn. D'autres sites peuvent être précisés dans votre demande. Haramain Prestige vérifie les possibilités selon votre programme.",
        },
        {
          question: 'Peut-on demander plusieurs lieux dans le même programme\u00a0?',
          answer:
            "Oui. Vous pouvez indiquer plusieurs lieux dans votre demande. Leur intégration dans le programme dépendra des possibilités et des conditions applicables au moment de votre séjour.",
        },
        {
          question: 'Peut-on combiner visites et hôtel dans une seule demande\u00a0?',
          answer:
            "Oui. Vous pouvez demander votre hébergement à Madinah, votre transfert depuis l'aéroport et un accompagnement pour vos visites dans la même demande. Haramain Prestige organise l'ensemble selon votre programme.",
        },
        {
          question: 'Peut-on visiter les sites de Madinah le matin et ceux de Makkah un autre jour\u00a0?',
          answer:
            "Oui, si votre séjour inclut les deux villes. Précisez dans votre demande les étapes souhaitées à Madinah et à Makkah, et Haramain Prestige étudiera l'organisation selon votre programme global.",
        },
        {
          question: 'Quel délai pour faire une demande de visite à Madinah\u00a0?',
          answer:
            "Nous vous recommandons de soumettre votre demande le plus tôt possible avant votre séjour. Cela nous permet d'étudier les possibilités disponibles et de vous transmettre une proposition dans de bonnes conditions.",
        },
      ],
    },
    ctaBlock: {
      eyebrow: 'VOTRE SÉJOUR À MADINAH',
      title: 'Demandez un accompagnement pour vos visites à Madinah',
      paragraph:
        "Précisez les sites que vous souhaitez visiter, votre date de séjour et le nombre de personnes. Haramain Prestige étudie les possibilités disponibles et vous transmet une proposition.",
      ctaPrimary: 'Préciser ma demande',
      ctaSecondary: 'Écrire sur WhatsApp',
    },
  },

  visitesMakkahPage: {
    backHome: "Retour à l'accueil",
    hero: {
      eyebrow: 'VISITES · MAKKAH AL-MUKARRAMAH',
      title: 'Visites à Makkah : découvrez les sites historiques et spirituels de la ville sainte',
      intro:
        'Makkah abrite des lieux d\'une grande importance spirituelle et historique. Au-delà du Masjid al-Haram, certains pèlerins souhaitent visiter d\'autres sites emblématiques. Haramain Prestige peut, selon les possibilités disponibles, organiser un accompagnement pour ces visites.',
      ctaPrimary: 'Préciser ma demande de visite',
      ctaSecondary: 'Comment ça fonctionne\u00a0?',
      imageAlt: 'Vue de Makkah',
    },
    decouvrirSection: {
      eyebrow: 'MAKKAH AL-MUKARRAMAH',
      title: 'Visiter les sites spirituels et historiques de Makkah',
      paragraphs: [
        "Makkah est la ville sainte de l'islam, destination du pèlerinage du Hajj et de l'Omra. Elle abrite le Masjid al-Haram et la Kaaba, mais également d'autres sites d'une grande valeur historique et spirituelle que certains pèlerins souhaitent visiter lors de leur séjour.",
        "Haramain Prestige peut, selon les possibilités disponibles, vous aider à organiser un accompagnement pour vous rendre sur ces lieux. Précisez vos souhaits dans votre demande afin que nous puissions étudier les options correspondant à votre programme.",
      ],
    },
    lieuxSection: {
      eyebrow: 'SITES À VISITER',
      title: 'Quelques lieux emblématiques que vous pouvez demander à visiter',
      paragraphs: [
        'Ces sites peuvent être inclus dans votre demande d\'accompagnement, selon les possibilités disponibles. Précisez les lieux qui vous intéressent lors de votre demande.',
      ],
      criteriaLabel: 'EXEMPLES DE SITES',
      criteria: [
        'Arafat',
        'Mina',
        'Muzdalifah',
        'Jabal al-Nour',
        'Jabal Thawr',
        'Autres lieux selon votre demande',
      ],
    },
    ziyaratSection: {
      eyebrow: 'VOTRE DEMANDE',
      title: 'Comment demander un accompagnement pour vos visites à Makkah',
      paragraphs: [
        'Pour permettre à Haramain Prestige d\'étudier votre demande, précisez les sites que vous souhaitez visiter, la date envisagée, le nombre de personnes et votre hôtel à Makkah. Plus votre demande est détaillée, mieux nous pouvons rechercher une solution correspondant à votre programme.',
        "Haramain Prestige ne garantit pas un programme fixe ni un itinéraire prédéfini. Chaque demande est étudiée selon les possibilités disponibles au moment de votre séjour.",
      ],
    },
    hadjSection: {
      eyebrow: 'ARAFAT · MINA · MUZDALIFAH',
      title: 'Les sites du pèlerinage : Arafat, Mina et Muzdalifah',
      paragraphs: [
        "Arafat, Mina et Muzdalifah occupent une place importante dans le déroulement du Hajj et font également partie des lieux que certains voyageurs souhaitent découvrir lors de leur séjour à Makkah.",
        "Si vous souhaitez inclure ces lieux dans votre programme de visite, précisez-le dans votre demande. Leur intégration dépend des possibilités et des conditions applicables au moment de votre séjour.",
      ],
    },
    hotelSection: {
      eyebrow: 'HÉBERGEMENT À MAKKAH',
      title: 'Combinez vos visites avec votre hôtel à Makkah',
      paragraphs: [
        "Si vous n'avez pas encore réservé votre hébergement à Makkah, Haramain Prestige peut également vous accompagner dans la recherche de votre hôtel. Nous sélectionnons des établissements proches du Masjid al-Haram selon vos critères et disponibilités.",
      ],
      hotelLinkLabel: 'Voir nos hôtels à Makkah',
    },
    chauffeurSection: {
      eyebrow: 'DÉPLACEMENTS & TRANSPORT',
      title: 'Service de chauffeur pour vos déplacements à Makkah',
      paragraphs: [
        "Pour vous rendre sur les sites spirituels et historiques de Makkah, un service de transport avec chauffeur peut être demandé. Certains sites, comme Arafat ou Jabal al-Nour, nécessitent un déplacement en véhicule depuis votre hôtel. Haramain Prestige peut étudier cette option dans votre demande selon les possibilités disponibles.",
      ],
      chauffeurLinkLabel: 'Découvrir le service chauffeur',
      visitesMadinahLinkLabel: 'Visites à Madinah',
    },
    fonctionnementSection: {
      eyebrow: 'COMMENT ÇA MARCHE\u00a0?',
      title: 'Comment organiser vos visites à Makkah avec Haramain Prestige',
      paragraphs: [
        "Transmettez-nous les informations concernant vos visites souhaitées à Makkah. Nous étudions les possibilités disponibles et vous transmettons une proposition avant de confirmer l'organisation.",
      ],
      steps: [
        'Vous précisez les sites souhaités, la date, le nombre de personnes et votre hôtel à Makkah',
        'Haramain Prestige étudie les possibilités disponibles pour votre demande',
        'Vous recevez une proposition et confirmez l\'organisation selon vos besoins',
      ],
    },
    faq: {
      title: 'Questions fréquentes — Visites à Makkah',
      items: [
        {
          question: 'Proposez-vous des visites à Makkah en dehors du Masjid al-Haram\u00a0?',
          answer:
            "Haramain Prestige peut organiser un accompagnement pour vous aider à vous rendre sur des sites de Makkah au-delà du Haram, selon les possibilités disponibles. Précisez les lieux souhaités dans votre demande.",
        },
        {
          question: 'S\u2019agit-il d\u2019une visite guidée\u00a0?',
          answer:
            "Le contenu exact de la prestation dépend de la proposition qui vous est transmise. Si vous recherchez un accompagnement particulier ou des explications pendant les visites, précisez-le dans votre demande afin que nous puissions vous confirmer ce qui peut être proposé.",
        },
        {
          question: 'Peut-on visiter Arafat, Mina, Muzdalifah ou Jabal al-Nour lors d\u2019un séjour à Makkah\u00a0?',
          answer:
            "L'intégration de ces lieux à votre programme dépend des possibilités et des conditions applicables au moment de votre séjour. Précisez votre souhait dans votre demande afin qu'il puisse être pris en compte.",
        },
        {
          question: 'L\'accès à Makkah est-il ouvert à tous\u00a0?',
          answer:
            "L'accès à Makkah est réservé aux musulmans. Haramain Prestige s'adresse aux pèlerins et aux voyageurs concernés. Si vous avez un doute sur les conditions d'accès, n'hésitez pas à nous contacter.",
        },
        {
          question: 'Peut-on combiner visites à Makkah et hôtel dans une seule demande\u00a0?',
          answer:
            "Oui. Vous pouvez demander votre hébergement à Makkah, votre transfert depuis l'aéroport de Jeddah et un accompagnement pour vos visites dans la même demande. Haramain Prestige organise l'ensemble selon votre programme.",
        },
        {
          question: 'Peut-on demander des visites à Makkah et à Madinah dans le même séjour\u00a0?',
          answer:
            "Oui. Si votre séjour inclut les deux villes, précisez vos souhaits pour Makkah et pour Madinah dans votre demande. Haramain Prestige étudiera l'organisation selon votre programme global.",
        },
      ],
    },
    ctaBlock: {
      eyebrow: 'VOTRE SÉJOUR À MAKKAH',
      title: 'Demandez un accompagnement pour vos visites à Makkah',
      paragraph:
        "Précisez les sites que vous souhaitez visiter, votre date de séjour et le nombre de personnes. Haramain Prestige étudie les possibilités disponibles et vous transmet une proposition.",
      ctaPrimary: 'Préciser ma demande',
      ctaSecondary: 'Écrire sur WhatsApp',
    },
  },

  servicesPage: {
    backHome: "Retour à l'accueil",
    hero: {
      eyebrow: 'NOS SERVICES',
      title: 'Nos services à Makkah et Madinah',
      intro:
        'Haramain Prestige vous accompagne dans l\u2019organisation de vos déplacements et de certaines visites à Makkah et Madinah. Transferts aéroport, chauffeur privé et visites peuvent être organisés selon votre programme et les informations communiquées dans votre demande.',
      ctaPrimary: 'Demander une proposition',
      ctaSecondary: 'Découvrir nos services',
      imageAlt: 'Déplacements organisés à Makkah et Madinah',
    },
    introSection: {
      eyebrow: 'VOS DÉPLACEMENTS',
      title: 'Des services adaptés à votre programme',
      paragraphs: [
        'Selon votre séjour, vous pouvez avoir besoin d\u2019organiser votre arrivée depuis l\u2019aéroport, certains déplacements à Makkah ou Madinah, ou des visites vers différents lieux.',
        'Vous pouvez demander un seul service ou regrouper plusieurs besoins dans une même demande.',
      ],
    },
    transfertsSection: {
      eyebrow: 'TRANSFERTS AÉROPORT',
      title: 'Organiser votre arrivée et votre départ',
      paragraphs: [
        'Haramain Prestige peut étudier l\u2019organisation de votre transfert entre l\u2019aéroport et votre lieu d\u2019hébergement selon les informations communiquées dans votre demande.',
        'Des pages dédiées permettent notamment de préparer votre transfert entre l\u2019aéroport de Jeddah et Makkah ou entre l\u2019aéroport de Madinah et votre hôtel.',
      ],
      jeddahLinkLabel: 'Transfert Jeddah \u2013 Makkah',
      madinahLinkLabel: 'Transfert aéroport Madinah',
    },
    chauffeurSection: {
      eyebrow: 'CHAUFFEUR PRIVÉ',
      title: 'Organiser vos déplacements à Makkah et Madinah',
      paragraphs: [
        'Pour vos déplacements pendant le séjour, vous pouvez transmettre votre trajet, vos horaires, votre point de départ, votre destination et le nombre de voyageurs.',
        'Haramain Prestige étudie ensuite les possibilités correspondant à votre demande.',
      ],
      chauffeurLinkLabel: 'Découvrir notre service chauffeur',
    },
    visitesMadinahSection: {
      eyebrow: 'VISITES À MADINAH',
      title: 'Organiser vos visites à Madinah',
      paragraphs: [
        'Vous pouvez nous indiquer les lieux que vous souhaitez découvrir pendant votre séjour à Madinah afin que votre programme puisse être étudié selon votre demande.',
        'Masjid Quba, le Mont Uhud ou Masjid al-Qiblatayn peuvent notamment être mentionnés dans votre demande.',
      ],
      visitesMadinahLinkLabel: 'Découvrir les visites à Madinah',
    },
    visitesMakkahSection: {
      eyebrow: 'VISITES À MAKKAH',
      title: 'Organiser vos visites à Makkah',
      paragraphs: [
        'Vous pouvez également préciser les lieux que vous souhaitez découvrir à Makkah et dans ses environs afin qu\u2019ils soient pris en compte dans l\u2019étude de votre programme.',
        'Arafat, Mina, Muzdalifah, Jabal al-Nour ou Jabal Thawr peuvent notamment être indiqués dans votre demande.',
      ],
      visitesMakkahLinkLabel: 'Découvrir les visites à Makkah',
    },
    multiSection: {
      eyebrow: 'UNE SEULE DEMANDE',
      title: 'Regroupez plusieurs services',
      paragraphs: [
        'Si votre séjour nécessite plusieurs prestations, vous pouvez regrouper dans une seule demande votre transfert aéroport, certains déplacements avec chauffeur et vos visites.',
        'Haramain Prestige étudie les différentes étapes communiquées afin de vous transmettre une proposition correspondant à votre programme.',
      ],
    },
    fonctionnementSection: {
      eyebrow: 'COMMENT ÇA MARCHE\u00a0?',
      title: 'Organiser vos services en quelques étapes',
      paragraphs: [
        'Décrivez les services dont vous avez besoin ainsi que les informations utiles concernant votre séjour. Haramain Prestige étudie ensuite votre demande avant de vous transmettre une proposition.',
      ],
      steps: [
        'Vous indiquez vos dates, vos besoins et le nombre de voyageurs',
        'Nous étudions les possibilités correspondant à votre demande',
        'Vous recevez une proposition avant de confirmer l\u2019organisation',
      ],
    },
    faq: {
      title: 'Questions fréquentes — Services à Makkah & Madinah',
      items: [
        {
          question: 'Quels services propose Haramain Prestige\u00a0?',
          answer:
            'Haramain Prestige propose l\u2019organisation de transferts aéroport, de déplacements avec chauffeur et de visites à Makkah et Madinah selon votre demande.',
        },
        {
          question: 'Peut-on réserver plusieurs services en même temps\u00a0?',
          answer:
            'Oui, vous pouvez regrouper plusieurs prestations dans une même demande : transfert aéroport, chauffeur privé et visites peuvent être organisés ensemble selon votre programme.',
        },
        {
          question: 'Peut-on réserver uniquement un transfert\u00a0?',
          answer:
            'Oui. Vous pouvez demander uniquement votre transfert aéroport sans autre prestation.',
        },
        {
          question: 'Peut-on réserver uniquement un service chauffeur\u00a0?',
          answer:
            'Oui, selon votre demande et les possibilités disponibles correspondant à votre programme.',
        },
        {
          question: 'Peut-on organiser des visites à Makkah ou Madinah\u00a0?',
          answer:
            'Oui. En indiquant les lieux souhaités et votre programme, Haramain Prestige étudie les possibilités correspondant à votre demande.',
        },
        {
          question: 'Comment obtenir le tarif de ces services\u00a0?',
          answer:
            'Transmettez les informations correspondant à votre demande afin de recevoir une proposition adaptée aux prestations souhaitées.',
        },
      ],
    },
    ctaBlock: {
      eyebrow: 'VOTRE PROGRAMME',
      title: 'Organisez vos services à Makkah et Madinah',
      paragraph:
        'Indiquez-nous vos dates, le nombre de voyageurs et les services dont vous avez besoin afin de recevoir une proposition correspondant à votre demande.',
      ctaPrimary: 'Demander une proposition',
      ctaSecondary: 'Écrire sur WhatsApp',
    },
  },

  hotelsPage: {
    backHome: "Retour à l'accueil",
    hero: {
      eyebrow: 'HÔTELS · MAKKAH & MADINAH',
      title: 'Hôtels à Makkah & Madinah : adresses sélectionnées près du Haram',
      intro:
        'Haramain Prestige sélectionne et propose des hôtels à Makkah et Madinah pour des séjours lors du Hajj, de la Omra ou d\'un voyage spirituel. Établissements situés à proximité du Masjid al-Haram et du Masjid an-Nabawi, à tous les budgets.',
      ctaPrimary: 'Recevoir une proposition hôtel',
      ctaSecondary: 'Voir nos adresses',
      imageAlt: 'Vue sur le Masjid al-Haram depuis un hôtel de Makkah',
    },
    introSection: {
      eyebrow: 'NOS HÔTELS',
      title: 'Des hôtels sélectionnés à Makkah et Madinah',
      paragraphs: [
        'Haramain Prestige propose des hôtels à Makkah et Madinah adaptés aux séjours lors du Hajj, de la Omra ou d\'un voyage spirituel. Chaque établissement est sélectionné selon sa proximité avec les lieux de culte, son confort et sa disponibilité selon les dates demandées.',
        'Notre sélection couvre différentes gammes tarifaires : des hôtels économiques aux adresses premium avec vue sur la Kaaba, en passant par des établissements milieu de gamme bien situés. Vous indiquez vos critères, nous étudions les disponibilités et vous transmettons une proposition.',
      ],
    },
    makkahSection: {
      eyebrow: 'MAKKAH AL-MUKARRAMAH',
      title: 'Hôtels à Makkah près du Masjid al-Haram',
      paragraphs: [
        'Makkah concentre la majorité des séjours lors de la Omra ou du Hajj. Haramain Prestige propose des hôtels situés à différentes distances du Masjid al-Haram, selon vos préférences et votre budget.',
        'Selon les dates et la disponibilité, il est possible de trouver des chambres standard, des suites familiales ou des chambres avec vue directe sur la Kaaba. Indiquez vos critères pour recevoir une proposition adaptée à votre séjour.',
      ],
      makkahLinkLabel: 'Voir tous les hôtels à Makkah',
    },
    madinahSection: {
      eyebrow: 'MADINAH AL-MUNAWWARAH',
      title: 'Hôtels à Madinah près du Masjid an-Nabawi',
      paragraphs: [
        'Madinah accueille les pèlerins souhaitant se recueillir près du Masjid an-Nabawi, la Mosquée du Prophète Muhammad ﷺ. Haramain Prestige propose des établissements à proximité de la Mosquée, à différents budgets.',
        'Que vous séjourniez à Madinah en début ou en fin de voyage, une bonne localisation facilite l\'accès au Masjid an-Nabawi et aux sites environnants. Indiquez vos dates et vos besoins pour recevoir une proposition.',
      ],
      madinahLinkLabel: 'Voir tous les hôtels à Madinah',
    },
    kaabaSection: {
      eyebrow: 'VUE SUR LA KAABA',
      title: 'Chambres avec vue sur la Kaaba',
      paragraphs: [
        'Certains hôtels situés dans les tours autour du Masjid al-Haram proposent des chambres avec vue directe sur la Kaaba. Cette catégorie est très demandée et soumise à disponibilité selon les établissements et les dates.',
        'Haramain Prestige vérifie les disponibilités des chambres avec vue Kaaba selon votre demande et vous transmet une proposition si cette catégorie est accessible à vos dates.',
      ],
      kaabaLinkLabel: 'Découvrir les chambres avec vue Kaaba',
    },
    doubleSection: {
      eyebrow: 'MAKKAH & MADINAH',
      title: 'Séjour combiné Makkah et Madinah',
      paragraphs: [
        'De nombreux pèlerins séjournent à la fois à Makkah et à Madinah lors d\'un même voyage. Haramain Prestige peut organiser les deux séjours dans une seule demande, en tenant compte de vos dates, du nombre de nuits dans chaque ville et de vos préférences.',
        'Précisez les deux destinations, vos dates d\'arrivée et de départ, ainsi que vos critères pour recevoir une proposition globale pour votre séjour à Makkah et à Madinah.',
      ],
    },
    criteresSection: {
      eyebrow: 'CRITÈRES DE SÉLECTION',
      title: 'Comment nous sélectionnons les hôtels',
      paragraphs: [
        'Haramain Prestige sélectionne les établissements proposés selon plusieurs critères déterminants pour la qualité d\'un séjour à Makkah ou Madinah.',
      ],
      criteriaLabel: 'NOS CRITÈRES',
      criteria: [
        'Proximité avec le Masjid al-Haram ou le Masjid an-Nabawi',
        'Disponibilité d\'une navette vers le Haram',
        'Catégorie adaptée : standard, familiale, vue Kaaba',
        'Rapport qualité/prix selon le budget communiqué',
        'Retours d\'expérience de voyageurs précédents',
        'Fiabilité des confirmations et des disponibilités',
      ],
    },
    fonctionnementSection: {
      eyebrow: 'COMMENT ÇA MARCHE\u00a0?',
      title: 'Réserver votre hôtel en quelques étapes',
      paragraphs: [
        'Indiquez vos dates, la ville souhaitée, le nombre de voyageurs et vos préférences. Haramain Prestige étudie les disponibilités et vous transmet une proposition adaptée à votre demande.',
      ],
      steps: [
        'Vous indiquez vos dates, la destination et le nombre de voyageurs',
        'Nous étudions les disponibilités correspondant à vos critères',
        'Vous recevez une proposition avant de confirmer votre réservation',
      ],
    },
    faq: {
      title: 'Questions fréquentes — Hôtels à Makkah & Madinah',
      items: [
        {
          question: 'Haramain Prestige propose-t-il des hôtels à Makkah et Madinah\u00a0?',
          answer:
            'Oui. Haramain Prestige propose des hôtels à Makkah et Madinah selon vos dates, votre budget et vos critères. Vous transmettez votre demande et nous étudions les disponibilités pour vous transmettre une proposition.',
        },
        {
          question: 'Peut-on réserver un hôtel avec vue sur la Kaaba\u00a0?',
          answer:
            'Oui, selon la disponibilité. Les chambres avec vue Kaaba sont très demandées. Haramain Prestige vérifie les disponibilités selon vos dates et vous indique si cette catégorie est accessible.',
        },
        {
          question: 'Peut-on réserver des hôtels dans les deux villes en même temps\u00a0?',
          answer:
            'Oui. Haramain Prestige peut organiser un séjour combiné Makkah et Madinah dans une seule demande. Indiquez vos dates pour chaque ville et le nombre de nuits souhaité.',
        },
        {
          question: 'Les tarifs proposés sont-ils négociés\u00a0?',
          answer:
            'Haramain Prestige travaille avec des établissements partenaires et peut proposer des tarifs adaptés selon les disponibilités et la période.',
        },
        {
          question: 'Comment obtenir une proposition hôtel\u00a0?',
          answer:
            'Transmettez vos dates, la ville souhaitée, le nombre de voyageurs, vos préférences et votre budget via le formulaire de devis. Haramain Prestige étudie votre demande et vous transmet une proposition.',
        },
        {
          question: 'Peut-on réserver un hôtel sans réserver d\'autres services\u00a0?',
          answer:
            'Oui. Vous pouvez soumettre une demande uniquement pour un hôtel, sans inclure de transfert, de chauffeur ou de visites.',
        },
      ],
    },
    ctaBlock: {
      eyebrow: 'VOTRE SÉJOUR',
      title: 'Réservez votre hôtel à Makkah ou Madinah',
      paragraph:
        'Indiquez-nous vos dates, la destination, le nombre de voyageurs et vos préférences afin de recevoir une proposition adaptée à votre séjour.',
      ctaPrimary: 'Recevoir une proposition hôtel',
      ctaSecondary: 'Écrire sur WhatsApp',
    },
  },
};

export default fr;
