import { useEffect } from 'react';
import type { Locale, PageKey } from '../i18n/types';
import { htmlLangOf, ogLocaleOf } from '../i18n/utils';
import { localizedPath } from '../i18n/routes';

const SITE_ORIGIN = 'https://haramainprestige.com';

type PageMetadata = {
  title: string;
  description: string;
  /**
   * Clé de page (ex. 'home', 'about'). Utilisée pour générer la
   * canonique + les alternates hreflang de la locale opposée. Passer
   * `null` pour les pages hors mapping (ex. 404) qui n'ont pas
   * d'équivalent dans l'autre locale.
   */
  page: PageKey | null;
  /** Locale active (rend les og:locale + hreflang cohérents). */
  locale: Locale;
  /**
   * Passer `true` pour les pages qui ne doivent pas être indexées
   * (ex. 404). La balise canonical est alors omise et les alternates
   * hreflang également.
   */
  noindex?: boolean;
};

function setMeta(
  selector: string,
  create: () => HTMLMetaElement | HTMLLinkElement,
  apply: (el: HTMLMetaElement | HTMLLinkElement) => void,
): void {
  let el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(
    selector,
  );
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  apply(el);
}

function setMetaName(name: string, content: string): void {
  setMeta(
    `meta[name="${name}"]`,
    () => {
      const m = document.createElement('meta');
      m.setAttribute('name', name);
      return m;
    },
    (el) => el.setAttribute('content', content),
  );
}

function setMetaProperty(property: string, content: string): void {
  setMeta(
    `meta[property="${property}"]`,
    () => {
      const m = document.createElement('meta');
      m.setAttribute('property', property);
      return m;
    },
    (el) => el.setAttribute('content', content),
  );
}

function setCanonical(href: string | null): void {
  const existing = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (href === null) {
    if (existing) existing.remove();
    return;
  }
  if (existing) {
    existing.setAttribute('href', href);
    return;
  }
  const link = document.createElement('link');
  link.setAttribute('rel', 'canonical');
  link.setAttribute('href', href);
  document.head.appendChild(link);
}

/** Marque `data-i18n-alt` sur les <link rel="alternate"> gérés par le hook
 *  pour pouvoir les nettoyer proprement entre deux navigations. */
function clearHreflangAlternates(): void {
  document.head
    .querySelectorAll<HTMLLinkElement>('link[rel="alternate"][data-i18n-alt]')
    .forEach((el) => el.remove());
}

function addHreflangAlternate(hreflang: string, href: string): void {
  const link = document.createElement('link');
  link.setAttribute('rel', 'alternate');
  link.setAttribute('hreflang', hreflang);
  link.setAttribute('href', href);
  link.setAttribute('data-i18n-alt', '');
  document.head.appendChild(link);
}

/**
 * Met à jour title, description, canonical, Open Graph, Twitter Card
 * et alternates hreflang pour la page courante. Chaque page appelle
 * ce hook avec ses propres valeurs + la locale active afin que Google
 * indexe correctement chaque version.
 */
export function usePageMetadata({
  title,
  description,
  page,
  locale,
  noindex = false,
}: PageMetadata): void {
  useEffect(() => {
    const url =
      page === null
        ? SITE_ORIGIN + window.location.pathname
        : SITE_ORIGIN + localizedPath(page, locale);

    document.title = title;
    setMetaName('description', description);
    setMetaName('robots', noindex ? 'noindex, follow' : 'index, follow');
    setCanonical(noindex ? null : url);

    setMetaProperty('og:title', title);
    setMetaProperty('og:description', description);
    setMetaProperty('og:url', url);
    setMetaProperty('og:locale', ogLocaleOf(locale));

    setMetaName('twitter:title', title);
    setMetaName('twitter:description', description);

    // hreflang : on émet la locale courante, la locale opposée, et
    // x-default (pointe vers la version française, langue historique).
    clearHreflangAlternates();
    if (!noindex && page !== null) {
      const frUrl = SITE_ORIGIN + localizedPath(page, 'fr');
      const arUrl = SITE_ORIGIN + localizedPath(page, 'ar-SA');
      addHreflangAlternate('fr-FR', frUrl);
      addHreflangAlternate('ar-SA', arUrl);
      addHreflangAlternate('x-default', frUrl);
      setMetaProperty(
        'og:locale:alternate',
        locale === 'fr' ? 'ar_SA' : 'fr_FR',
      );
    }

    // Applique la balise lang sur <html>. Le Provider le fait déjà au
    // niveau global, mais on garantit ici la cohérence même si la page
    // est rendue hors Provider (tests, SSR partiel).
    document.documentElement.setAttribute('lang', htmlLangOf(locale));
  }, [title, description, page, locale, noindex]);
}
