// Provider React pour l'i18n. Détecte la locale depuis le pathname au
// chargement, expose la locale, la direction, l'objet de traductions et
// des helpers de navigation via `useI18n()`. Volontairement léger : pas
// de dépendance externe, un seul Context, deux locales, résolution des
// clés par accès direct à l'objet typé.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Direction, Locale, PageKey, Translations } from './types';
import fr from './fr';
import ar from './ar-SA';
import {
  detectRoute,
  localizedPath,
  otherLocale as getOtherLocale,
} from './routes';

const DICTIONARIES: Record<Locale, Translations> = {
  fr,
  'ar-SA': ar,
};

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

type I18nContextValue = {
  locale: Locale;
  dir: Direction;
  t: Translations;
  /** URL locale-scoped pour une page (préfixe /ar-sa/ en arabe). */
  pathFor: (page: PageKey) => string;
  /** URL correspondante dans l'autre locale, pour le sélecteur de langue. */
  altPathFor: (page: PageKey) => string;
  /** Locale opposée (utile pour le label du bouton de bascule). */
  otherLocale: Locale;
};

const I18nContext = createContext<I18nContextValue | null>(null);

type ProviderProps = {
  children: ReactNode;
  /** Locale forcée (test/SSR) ; sinon détectée depuis le pathname. */
  locale?: Locale;
};

export function I18nProvider({ children, locale: forced }: ProviderProps) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (forced) return forced;
    if (typeof window === 'undefined') return 'fr';
    return detectRoute(window.location.pathname).locale;
  });

  // La détection de locale doit rester synchrone avec l'URL réelle :
  // navigation arrière/avant (popstate) et pushState émis par les
  // composants doivent tous deux la déclencher.
  useEffect(() => {
    if (forced) return;
    const sync = () => {
      const next = detectRoute(window.location.pathname).locale;
      setLocale((prev) => (prev === next ? prev : next));
    };
    window.addEventListener('popstate', sync);
    window.addEventListener('haramain:navigate', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('haramain:navigate', sync);
    };
  }, [forced]);

  const t = DICTIONARIES[locale];
  const dir = directionOf(locale);
  const other = getOtherLocale(locale);

  // Applique lang + dir sur <html> pour que le navigateur oriente
  // correctement le texte natif (formulaires, contenus, sélection).
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', htmlLangOf(locale));
    root.setAttribute('dir', dir);
  }, [locale, dir]);

  const pathFor = useCallback(
    (page: PageKey) => localizedPath(page, locale),
    [locale],
  );

  const altPathFor = useCallback(
    (page: PageKey) => localizedPath(page, other),
    [other],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      dir,
      t,
      pathFor,
      altPathFor,
      otherLocale: other,
    }),
    [locale, dir, t, pathFor, altPathFor, other],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** Consomme le contexte i18n. Erreur explicite si absent (dev-only). */
export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within <I18nProvider>');
  }
  return ctx;
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
  // Remonte en haut par cohérence avec la navigation par ancre native.
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}
