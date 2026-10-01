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
      'Hôtels à Makkah',
      'Hôtels à Madinah',
      'Chambres avec vue Kaaba',
    ],
    servicesMenu: [
      'Transferts aéroport',
      'Chauffeurs & déplacements',
      'Visites & accompagnement',
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
          'Des déplacements confortables, avec chauffeur disponible 7j/7 sur place.',
      },
      {
        title: 'Visites & accompagnement',
        description:
          'Un accompagnement bienveillant pour vos visites à Makkah & Madinah.',
      },
    ],
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

  hotelsMadinahPage: {
    backHome: "Retour à l'accueil",
    hero: {
      eyebrow: 'HÔTELS À MADINAH · MÉDINE',
      title: 'Hôtels à Madinah : trouvez l\'hébergement idéal près du Masjid an-Nabawi',
      intro:
        'Haramain Prestige vous accompagne dans la recherche et la réservation de votre hôtel à Madinah (Médine). Nous sélectionnons des établissements selon votre budget, la proximité souhaitée avec le Masjid an-Nabawi, le niveau de confort et les besoins de votre séjour.',
      ctaPrimary: 'Recevoir une proposition personnalisée',
      ctaSecondary: 'Voir les hôtels sélectionnés',
      imageAlt: 'Vue sur le Masjid an-Nabawi depuis un hôtel à Madinah',
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
        'La distance jusqu\'au Masjid an-Nabawi est souvent le premier critère de choix à Madinah. Mais une distance seule ne suffit pas toujours\u00a0: l\'accès réel, le quartier, la présence d\'une navette gratuite et la porte de la Mosquée du Prophète que vous utilisez peuvent influencer vos déplacements quotidiens.',
        'Haramain Prestige étudie votre demande selon vos priorités et vous oriente vers des hôtels cohérents avec votre séjour, en tenant compte de votre budget et du niveau de confort souhaité.',
      ],
      criteria: [
        'Proximité souhaitée avec le Masjid an-Nabawi',
        'Budget par chambre et par nuit',
        'Catégorie d\'hôtel et niveau de confort',
        'Voyage en couple, famille ou groupe',
        'Présence d\'une navette gratuite vers la Mosquée',
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
        'La Omra inclut généralement un séjour à Makkah et un passage à Madinah pour visiter le Masjid an-Nabawi et ses environs. La durée du séjour à Madinah varie selon les voyageurs\u00a0: certains restent quelques jours, d\'autres davantage.',
        'Haramain Prestige organise les deux étapes de votre séjour. Nous pouvons proposer un hôtel à Makkah et un hôtel à Madinah dans la même demande, ainsi que les transferts entre les deux villes saintes si vous en avez besoin.',
      ],
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
  },
};

export default fr;
