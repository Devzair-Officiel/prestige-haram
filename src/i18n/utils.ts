// Helpers i18n purs (non-composants).
// Ils vivent dans un fichier séparé pour que `index.tsx` ne contienne que
// des exports React : Fast Refresh (Vite HMR) exige qu'un fichier
// exportant des composants n'exporte pas d'autres symboles.

import type { Direction, Locale } from './types';

/** Direction textuelle induite par la locale. */
export function directionOf(locale: Locale): Direction {
  return locale === 'ar-SA' ? 'rtl' : 'ltr';
}

/** Balise `lang` HTML pour la locale (attendue par les moteurs et Google). */
export function htmlLangOf(locale: Locale): string {
  return locale === 'ar-SA' ? 'ar-SA' : 'fr-FR';
}

/** Valeur `og:locale` par locale (format Facebook Open Graph). */
export function ogLocaleOf(locale: Locale): string {
  return locale === 'ar-SA' ? 'ar_SA' : 'fr_FR';
}

/**
 * Navigation SPA locale-aware. Émet un événement synthétique pour que
 * le Provider et le router puissent recalculer la locale et la page
 * courante sans dépendre de popstate (qui ne se déclenche pas sur
 * pushState).
 */
export function navigateTo(href: string): void {
  if (typeof window === 'undefined') return;
  window.history.pushState({}, '', href);
  window.dispatchEvent(new Event('haramain:navigate'));
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}
