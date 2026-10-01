import type { Direction, Locale } from './types';

export function directionOf(locale: Locale): Direction {
  return locale === 'ar-SA' ? 'rtl' : 'ltr';
}

export function htmlLangOf(locale: Locale): string {
  return locale === 'ar-SA' ? 'ar-SA' : 'fr-FR';
}

export function ogLocaleOf(locale: Locale): string {
  return locale === 'ar-SA' ? 'ar_SA' : 'fr_FR';
}

export function navigateTo(href: string): void {
  if (typeof window === 'undefined') return;
  window.history.pushState({}, '', href);
  window.dispatchEvent(new Event('haramain:navigate'));
  // Scrolling is handled by App after re-render via scrollToHash().
}

/**
 * Scrolls to the element whose id matches window.location.hash,
 * or scrolls to top if there is no hash. Called by App after each navigation.
 */
export function scrollToHash(): void {
  if (typeof window === 'undefined') return;
  const hash = window.location.hash.slice(1);
  if (hash) {
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}

/**
 * Click handler for SPA anchor links. Intercepts non-external, non-pure-anchor
 * hrefs and calls navigateTo(). External links and pure anchors (#id) are left
 * to the browser.
 */
export function handleSpaNav(
  e: { preventDefault(): void },
  href: string,
): void {
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('//')) return;
  if (href.startsWith('#')) return;
  e.preventDefault();
  navigateTo(href);
}
