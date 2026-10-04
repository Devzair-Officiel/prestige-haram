// Table de correspondance des routes entre locales. Les slugs restent
// en caractères latins des deux côtés — on préfixe simplement /ar-sa
// pour l'arabe (SEO clair, canonicals stables, pas de percent-encoding
// dans la barre d'URL).

import type { Locale, PageKey } from './types';

export const LOCALE_PREFIX: Record<Locale, string> = {
  fr: '',
  'ar-SA': '/ar-sa',
};

const PATHS: Record<PageKey, string> = {
  home: '/',
  about: '/a-propos',
  legal: '/mentions-legales',
  privacy: '/politique-de-confidentialite',
  notFound: '/404',
  hotelsMakkah: '/hotels-makkah',
  hotelsMadinah: '/hotels-madinah',
  chambreVueKaaba: '/chambre-vue-kaaba',
  transfertJeddahMakkah: '/transfert-aeroport-jeddah-makkah',
  transfertAeroportMadinah: '/transfert-aeroport-madinah',
  chauffeurPriveMakkahMadinah: '/chauffeur-prive-makkah-madinah',
  visitesMadinah: '/visites-madinah',
  visitesMakkah: '/visites-makkah',
  services: '/services',
};

/** URL canonique locale-scoped. `home` en FR = "/", en AR = "/ar-sa/". */
export function localizedPath(page: PageKey, locale: Locale): string {
  const prefix = LOCALE_PREFIX[locale];
  const path = PATHS[page];
  if (page === 'home') {
    return prefix === '' ? '/' : `${prefix}/`;
  }
  return `${prefix}${path}`;
}

/** À partir d'un pathname, détecte la locale + la page correspondante.
 *  Retourne `null` pour la page si aucune route connue ne matche. */
export function detectRoute(pathname: string): {
  locale: Locale;
  page: PageKey | null;
} {
  // Normalise les doubles slashs éventuels et supprime le trailing slash
  // (sauf pour "/" et "/ar-sa/").
  const raw = pathname.replace(/\/+$/, '') || '/';
  const isArabic = raw === '/ar-sa' || raw.startsWith('/ar-sa/');
  const locale: Locale = isArabic ? 'ar-SA' : 'fr';
  const stripped = isArabic ? raw.replace(/^\/ar-sa/, '') || '/' : raw;

  const page = matchPage(stripped);
  return { locale, page };
}

function matchPage(path: string): PageKey | null {
  if (path === '/' || path === '') return 'home';
  if (path === '/a-propos') return 'about';
  if (path === '/mentions-legales') return 'legal';
  if (path === '/politique-de-confidentialite') return 'privacy';
  if (path === '/hotels-makkah') return 'hotelsMakkah';
  if (path === '/hotels-madinah') return 'hotelsMadinah';
  if (path === '/chambre-vue-kaaba') return 'chambreVueKaaba';
  if (path === '/transfert-aeroport-jeddah-makkah') return 'transfertJeddahMakkah';
  if (path === '/transfert-aeroport-madinah') return 'transfertAeroportMadinah';
  if (path === '/chauffeur-prive-makkah-madinah') return 'chauffeurPriveMakkahMadinah';
  if (path === '/visites-madinah') return 'visitesMadinah';
  if (path === '/visites-makkah') return 'visitesMakkah';
  if (path === '/services') return 'services';
  return null;
}

/** Locale "opposée" pour le sélecteur de langue. */
export function otherLocale(locale: Locale): Locale {
  return locale === 'fr' ? 'ar-SA' : 'fr';
}
