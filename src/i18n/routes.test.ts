// Tests légers du contrat i18n : les URLs canoniques et la détection
// de locale sont critiques pour l'indexation Google (hreflang) et le
// switcher de langue. Un renommage silencieux d'un slug casserait les
// permaliens ; ces tests jouent le rôle de garde-fou.

import { describe, expect, it } from 'vitest';
import { detectRoute, localizedPath, otherLocale } from './routes';
import type { PageKey } from './types';

describe('localizedPath', () => {
  it('renvoie / pour la home FR', () => {
    expect(localizedPath('home', 'fr')).toBe('/');
  });

  it('renvoie /ar-sa/ pour la home AR (trailing slash canonique)', () => {
    expect(localizedPath('home', 'ar-SA')).toBe('/ar-sa/');
  });

  it('préserve les slugs FR sur les autres pages en FR', () => {
    expect(localizedPath('about', 'fr')).toBe('/a-propos');
    expect(localizedPath('legal', 'fr')).toBe('/mentions-legales');
    expect(localizedPath('privacy', 'fr')).toBe(
      '/politique-de-confidentialite',
    );
  });

  it('préfixe /ar-sa sur les autres pages en AR sans dupliquer les slashes', () => {
    expect(localizedPath('about', 'ar-SA')).toBe('/ar-sa/a-propos');
    expect(localizedPath('legal', 'ar-SA')).toBe('/ar-sa/mentions-legales');
    expect(localizedPath('privacy', 'ar-SA')).toBe(
      '/ar-sa/politique-de-confidentialite',
    );
  });
});

describe('detectRoute', () => {
  it('renvoie FR + home pour /', () => {
    expect(detectRoute('/')).toEqual({ locale: 'fr', page: 'home' });
  });

  it('renvoie AR + home pour /ar-sa et /ar-sa/', () => {
    expect(detectRoute('/ar-sa')).toEqual({ locale: 'ar-SA', page: 'home' });
    expect(detectRoute('/ar-sa/')).toEqual({ locale: 'ar-SA', page: 'home' });
  });

  it('mappe les slugs sur leur PageKey en FR', () => {
    expect(detectRoute('/a-propos')).toEqual({ locale: 'fr', page: 'about' });
    expect(detectRoute('/mentions-legales')).toEqual({
      locale: 'fr',
      page: 'legal',
    });
    expect(detectRoute('/politique-de-confidentialite')).toEqual({
      locale: 'fr',
      page: 'privacy',
    });
  });

  it('mappe les slugs sur leur PageKey en AR (préfixe /ar-sa)', () => {
    expect(detectRoute('/ar-sa/a-propos')).toEqual({
      locale: 'ar-SA',
      page: 'about',
    });
    expect(detectRoute('/ar-sa/mentions-legales')).toEqual({
      locale: 'ar-SA',
      page: 'legal',
    });
    expect(detectRoute('/ar-sa/politique-de-confidentialite')).toEqual({
      locale: 'ar-SA',
      page: 'privacy',
    });
  });

  it('tolère un trailing slash quelconque', () => {
    // Note : côté client, detectRoute('/a-propos/') est accepté pour
    // rester tolérant si un utilisateur tape l'URL manuellement. En
    // production Nginx canonicalise cette URL vers /a-propos (301)
    // avant même que le SPA soit chargé — cf. docker/nginx.conf.
    expect(detectRoute('/a-propos/')).toEqual({ locale: 'fr', page: 'about' });
    expect(detectRoute('/ar-sa/a-propos/')).toEqual({
      locale: 'ar-SA',
      page: 'about',
    });
  });

  it('retourne page=null pour un slug inconnu (déclencheur 404)', () => {
    expect(detectRoute('/inexistant')).toEqual({ locale: 'fr', page: null });
    expect(detectRoute('/ar-sa/inconnu')).toEqual({
      locale: 'ar-SA',
      page: null,
    });
  });
});

describe('otherLocale', () => {
  it('renvoie la locale opposée', () => {
    expect(otherLocale('fr')).toBe('ar-SA');
    expect(otherLocale('ar-SA')).toBe('fr');
  });
});

describe('localizedPath — hotelsMakkah', () => {
  it('renvoie /hotels-makkah en FR', () => {
    expect(localizedPath('hotelsMakkah', 'fr')).toBe('/hotels-makkah');
  });

  it('renvoie /ar-sa/hotels-makkah en AR', () => {
    expect(localizedPath('hotelsMakkah', 'ar-SA')).toBe(
      '/ar-sa/hotels-makkah',
    );
  });
});

describe('detectRoute — hotelsMakkah', () => {
  it('détecte FR + hotelsMakkah pour /hotels-makkah', () => {
    expect(detectRoute('/hotels-makkah')).toEqual({
      locale: 'fr',
      page: 'hotelsMakkah',
    });
  });

  it('détecte AR + hotelsMakkah pour /ar-sa/hotels-makkah', () => {
    expect(detectRoute('/ar-sa/hotels-makkah')).toEqual({
      locale: 'ar-SA',
      page: 'hotelsMakkah',
    });
  });

  it('tolère le trailing slash sur /hotels-makkah/', () => {
    expect(detectRoute('/hotels-makkah/')).toEqual({
      locale: 'fr',
      page: 'hotelsMakkah',
    });
  });

  it('tolère le trailing slash sur /ar-sa/hotels-makkah/', () => {
    expect(detectRoute('/ar-sa/hotels-makkah/')).toEqual({
      locale: 'ar-SA',
      page: 'hotelsMakkah',
    });
  });
});

describe('localizedPath — hotelsMadinah', () => {
  it('renvoie /hotels-madinah en FR', () => {
    expect(localizedPath('hotelsMadinah', 'fr')).toBe('/hotels-madinah');
  });

  it('renvoie /ar-sa/hotels-madinah en AR', () => {
    expect(localizedPath('hotelsMadinah', 'ar-SA')).toBe(
      '/ar-sa/hotels-madinah',
    );
  });
});

describe('detectRoute — hotelsMadinah', () => {
  it('détecte FR + hotelsMadinah pour /hotels-madinah', () => {
    expect(detectRoute('/hotels-madinah')).toEqual({
      locale: 'fr',
      page: 'hotelsMadinah',
    });
  });

  it('détecte AR + hotelsMadinah pour /ar-sa/hotels-madinah', () => {
    expect(detectRoute('/ar-sa/hotels-madinah')).toEqual({
      locale: 'ar-SA',
      page: 'hotelsMadinah',
    });
  });

  it('tolère le trailing slash sur /hotels-madinah/', () => {
    expect(detectRoute('/hotels-madinah/')).toEqual({
      locale: 'fr',
      page: 'hotelsMadinah',
    });
  });

  it('tolère le trailing slash sur /ar-sa/hotels-madinah/', () => {
    expect(detectRoute('/ar-sa/hotels-madinah/')).toEqual({
      locale: 'ar-SA',
      page: 'hotelsMadinah',
    });
  });
});

describe('localizedPath — chambreVueKaaba', () => {
  it('renvoie /chambre-vue-kaaba en FR', () => {
    expect(localizedPath('chambreVueKaaba', 'fr')).toBe('/chambre-vue-kaaba');
  });

  it('renvoie /ar-sa/chambre-vue-kaaba en AR', () => {
    expect(localizedPath('chambreVueKaaba', 'ar-SA')).toBe(
      '/ar-sa/chambre-vue-kaaba',
    );
  });
});

describe('detectRoute — chambreVueKaaba', () => {
  it('détecte FR + chambreVueKaaba pour /chambre-vue-kaaba', () => {
    expect(detectRoute('/chambre-vue-kaaba')).toEqual({
      locale: 'fr',
      page: 'chambreVueKaaba',
    });
  });

  it('détecte AR + chambreVueKaaba pour /ar-sa/chambre-vue-kaaba', () => {
    expect(detectRoute('/ar-sa/chambre-vue-kaaba')).toEqual({
      locale: 'ar-SA',
      page: 'chambreVueKaaba',
    });
  });

  it('tolère le trailing slash sur /chambre-vue-kaaba/', () => {
    expect(detectRoute('/chambre-vue-kaaba/')).toEqual({
      locale: 'fr',
      page: 'chambreVueKaaba',
    });
  });

  it('tolère le trailing slash sur /ar-sa/chambre-vue-kaaba/', () => {
    expect(detectRoute('/ar-sa/chambre-vue-kaaba/')).toEqual({
      locale: 'ar-SA',
      page: 'chambreVueKaaba',
    });
  });
});

describe('localizedPath — transfertJeddahMakkah', () => {
  it('renvoie /transfert-aeroport-jeddah-makkah en FR', () => {
    expect(localizedPath('transfertJeddahMakkah', 'fr')).toBe(
      '/transfert-aeroport-jeddah-makkah',
    );
  });

  it('renvoie /ar-sa/transfert-aeroport-jeddah-makkah en AR', () => {
    expect(localizedPath('transfertJeddahMakkah', 'ar-SA')).toBe(
      '/ar-sa/transfert-aeroport-jeddah-makkah',
    );
  });
});

describe('detectRoute — transfertJeddahMakkah', () => {
  it('détecte FR + transfertJeddahMakkah', () => {
    expect(detectRoute('/transfert-aeroport-jeddah-makkah')).toEqual({
      locale: 'fr',
      page: 'transfertJeddahMakkah',
    });
  });

  it('détecte AR + transfertJeddahMakkah', () => {
    expect(detectRoute('/ar-sa/transfert-aeroport-jeddah-makkah')).toEqual({
      locale: 'ar-SA',
      page: 'transfertJeddahMakkah',
    });
  });

  it('tolère le trailing slash FR', () => {
    expect(detectRoute('/transfert-aeroport-jeddah-makkah/')).toEqual({
      locale: 'fr',
      page: 'transfertJeddahMakkah',
    });
  });

  it('tolère le trailing slash AR', () => {
    expect(detectRoute('/ar-sa/transfert-aeroport-jeddah-makkah/')).toEqual({
      locale: 'ar-SA',
      page: 'transfertJeddahMakkah',
    });
  });
});

describe('localizedPath — transfertAeroportMadinah', () => {
  it('renvoie /transfert-aeroport-madinah en FR', () => {
    expect(localizedPath('transfertAeroportMadinah', 'fr')).toBe(
      '/transfert-aeroport-madinah',
    );
  });

  it('renvoie /ar-sa/transfert-aeroport-madinah en AR', () => {
    expect(localizedPath('transfertAeroportMadinah', 'ar-SA')).toBe(
      '/ar-sa/transfert-aeroport-madinah',
    );
  });
});

describe('detectRoute — transfertAeroportMadinah', () => {
  it('détecte FR + transfertAeroportMadinah', () => {
    expect(detectRoute('/transfert-aeroport-madinah')).toEqual({
      locale: 'fr',
      page: 'transfertAeroportMadinah',
    });
  });

  it('détecte AR + transfertAeroportMadinah', () => {
    expect(detectRoute('/ar-sa/transfert-aeroport-madinah')).toEqual({
      locale: 'ar-SA',
      page: 'transfertAeroportMadinah',
    });
  });

  it('tolère le trailing slash FR', () => {
    expect(detectRoute('/transfert-aeroport-madinah/')).toEqual({
      locale: 'fr',
      page: 'transfertAeroportMadinah',
    });
  });

  it('tolère le trailing slash AR', () => {
    expect(detectRoute('/ar-sa/transfert-aeroport-madinah/')).toEqual({
      locale: 'ar-SA',
      page: 'transfertAeroportMadinah',
    });
  });
});

describe('localizedPath — chauffeurPriveMakkahMadinah', () => {
  it('renvoie /chauffeur-prive-makkah-madinah en FR', () => {
    expect(localizedPath('chauffeurPriveMakkahMadinah', 'fr')).toBe(
      '/chauffeur-prive-makkah-madinah',
    );
  });

  it('renvoie /ar-sa/chauffeur-prive-makkah-madinah en AR', () => {
    expect(localizedPath('chauffeurPriveMakkahMadinah', 'ar-SA')).toBe(
      '/ar-sa/chauffeur-prive-makkah-madinah',
    );
  });
});

describe('detectRoute — chauffeurPriveMakkahMadinah', () => {
  it('détecte FR + chauffeurPriveMakkahMadinah', () => {
    expect(detectRoute('/chauffeur-prive-makkah-madinah')).toEqual({
      locale: 'fr',
      page: 'chauffeurPriveMakkahMadinah',
    });
  });

  it('détecte AR + chauffeurPriveMakkahMadinah', () => {
    expect(detectRoute('/ar-sa/chauffeur-prive-makkah-madinah')).toEqual({
      locale: 'ar-SA',
      page: 'chauffeurPriveMakkahMadinah',
    });
  });

  it('tolère le trailing slash FR', () => {
    expect(detectRoute('/chauffeur-prive-makkah-madinah/')).toEqual({
      locale: 'fr',
      page: 'chauffeurPriveMakkahMadinah',
    });
  });

  it('tolère le trailing slash AR', () => {
    expect(detectRoute('/ar-sa/chauffeur-prive-makkah-madinah/')).toEqual({
      locale: 'ar-SA',
      page: 'chauffeurPriveMakkahMadinah',
    });
  });
});

describe('localizedPath — visitesMadinah', () => {
  it('renvoie /visites-madinah en FR', () => {
    expect(localizedPath('visitesMadinah', 'fr')).toBe('/visites-madinah');
  });

  it('renvoie /ar-sa/visites-madinah en AR', () => {
    expect(localizedPath('visitesMadinah', 'ar-SA')).toBe('/ar-sa/visites-madinah');
  });
});

describe('detectRoute — visitesMadinah', () => {
  it('détecte FR + visitesMadinah pour /visites-madinah', () => {
    expect(detectRoute('/visites-madinah')).toEqual({
      locale: 'fr',
      page: 'visitesMadinah',
    });
  });

  it('détecte AR + visitesMadinah pour /ar-sa/visites-madinah', () => {
    expect(detectRoute('/ar-sa/visites-madinah')).toEqual({
      locale: 'ar-SA',
      page: 'visitesMadinah',
    });
  });

  it('tolère le trailing slash FR', () => {
    expect(detectRoute('/visites-madinah/')).toEqual({
      locale: 'fr',
      page: 'visitesMadinah',
    });
  });

  it('tolère le trailing slash AR', () => {
    expect(detectRoute('/ar-sa/visites-madinah/')).toEqual({
      locale: 'ar-SA',
      page: 'visitesMadinah',
    });
  });
});

describe('localizedPath — visitesMakkah', () => {
  it('renvoie /visites-makkah en FR', () => {
    expect(localizedPath('visitesMakkah', 'fr')).toBe('/visites-makkah');
  });

  it('renvoie /ar-sa/visites-makkah en AR', () => {
    expect(localizedPath('visitesMakkah', 'ar-SA')).toBe('/ar-sa/visites-makkah');
  });
});

describe('detectRoute — visitesMakkah', () => {
  it('détecte FR + visitesMakkah pour /visites-makkah', () => {
    expect(detectRoute('/visites-makkah')).toEqual({
      locale: 'fr',
      page: 'visitesMakkah',
    });
  });

  it('détecte AR + visitesMakkah pour /ar-sa/visites-makkah', () => {
    expect(detectRoute('/ar-sa/visites-makkah')).toEqual({
      locale: 'ar-SA',
      page: 'visitesMakkah',
    });
  });

  it('tolère le trailing slash FR', () => {
    expect(detectRoute('/visites-makkah/')).toEqual({
      locale: 'fr',
      page: 'visitesMakkah',
    });
  });

  it('tolère le trailing slash AR', () => {
    expect(detectRoute('/ar-sa/visites-makkah/')).toEqual({
      locale: 'ar-SA',
      page: 'visitesMakkah',
    });
  });
});

describe('localizedPath — services', () => {
  it('renvoie /services en FR', () => {
    expect(localizedPath('services', 'fr')).toBe('/services');
  });

  it('renvoie /ar-sa/services en AR', () => {
    expect(localizedPath('services', 'ar-SA')).toBe('/ar-sa/services');
  });
});

describe('detectRoute — services', () => {
  it('détecte FR + services pour /services', () => {
    expect(detectRoute('/services')).toEqual({
      locale: 'fr',
      page: 'services',
    });
  });

  it('détecte AR + services pour /ar-sa/services', () => {
    expect(detectRoute('/ar-sa/services')).toEqual({
      locale: 'ar-SA',
      page: 'services',
    });
  });

  it('tolère le trailing slash FR', () => {
    expect(detectRoute('/services/')).toEqual({
      locale: 'fr',
      page: 'services',
    });
  });

  it('tolère le trailing slash AR', () => {
    expect(detectRoute('/ar-sa/services/')).toEqual({
      locale: 'ar-SA',
      page: 'services',
    });
  });
});

describe('équivalence localizedPath ↔ detectRoute', () => {
  const pages: PageKey[] = [
    'home', 'about', 'legal', 'privacy',
    'hotelsMakkah', 'hotelsMadinah', 'chambreVueKaaba',
    'transfertJeddahMakkah', 'transfertAeroportMadinah',
    'chauffeurPriveMakkahMadinah',
    'visitesMadinah', 'visitesMakkah',
    'services',
  ];

  it('round-trip FR : detectRoute(localizedPath(p, "fr")) → { fr, p }', () => {
    for (const page of pages) {
      const path = localizedPath(page, 'fr');
      expect(detectRoute(path)).toEqual({ locale: 'fr', page });
    }
  });

  it('round-trip AR : detectRoute(localizedPath(p, "ar-SA")) → { ar-SA, p }', () => {
    for (const page of pages) {
      const path = localizedPath(page, 'ar-SA');
      expect(detectRoute(path)).toEqual({ locale: 'ar-SA', page });
    }
  });
});
