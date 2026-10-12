import { detectRoute, localizedPath } from '../i18n/routes';

export const MEASUREMENT_ID = 'G-00WDFD2SY7';
export const CONSENT_KEY = 'haramain:analytics-consent:v1';
export type AnalyticsConsent = 'granted' | 'denied' | null;
type CommercialEvent =
  'click_whatsapp' | 'click_phone' | 'click_email' | 'generate_lead';
type Page = {
  page_location: string;
  page_title: string;
  page_referrer: string;
  language: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    'ga-disable-G-00WDFD2SY7'?: boolean;
  }
}

const denied = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
};
const subscribers = new Set<() => void>();
let initialized = false;
let consent: AnalyticsConsent = null;
let configured = false;
let script: HTMLScriptElement | null = null;
let loadTimer: ReturnType<typeof setTimeout> | undefined;
let currentPage: Page | null = null;
let lastPageLocation: string | null = null;
let pendingEvents: { name: CommercialEvent; page: Page }[] = [];

function readConsent(): AnalyticsConsent {
  try {
    // A session refusal takes priority if persistent storage became read-only.
    if (sessionStorage.getItem(CONSENT_KEY) === 'denied') return 'denied';
    const saved = localStorage.getItem(CONSENT_KEY);
    return saved === 'granted' || saved === 'denied' ? saved : null;
  } catch {
    return null;
  }
}

function command(...args: unknown[]): void {
  window.gtag?.(...args);
}

function setDisabled(disabled: boolean): void {
  window['ga-disable-G-00WDFD2SY7'] = disabled;
}

/** Known, public route only. Queries, fragments and unknown paths are omitted. */
function safeLocation(href: string, referrer = false): string {
  try {
    const url = new URL(href);
    if (!['http:', 'https:'].includes(url.protocol)) return '';
    if (referrer && url.origin !== window.location.origin)
      return url.origin + '/';
    const { page, locale } = detectRoute(url.pathname);
    return (
      url.origin +
      (page ? localizedPath(page, locale) : localizedPath('notFound', locale))
    );
  } catch {
    return '';
  }
}

function sendPageView(): void {
  if (consent !== 'granted' || !configured || !currentPage) return;
  if (lastPageLocation === currentPage.page_location) return;
  command('set', currentPage);
  command('event', 'page_view', { ...currentPage, send_to: MEASUREMENT_ID });
  lastPageLocation = currentPage.page_location;
}

function activate(): void {
  if (consent !== 'granted') return;
  setDisabled(false);
  command('consent', 'update', { ...denied, analytics_storage: 'granted' });
  if (configured) {
    sendPageView();
    return;
  }
  if (script) return;

  const tag = document.createElement('script');
  script = tag;
  tag.id = 'haramain-ga4';
  tag.async = true;
  tag.referrerPolicy = 'origin';
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  const fail = () => {
    if (script !== tag) return;
    clearTimeout(loadTimer);
    tag.remove();
    script = null;
    pendingEvents = [];
    setDisabled(true);
  };
  tag.onerror = fail;
  tag.onload = () => {
    if (script !== tag || consent !== 'granted') return;
    clearTimeout(loadTimer);
    configured = true;
    command('js', new Date());
    if (currentPage) command('set', currentPage);
    command('config', MEASUREMENT_ID, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      // Do not forward raw document.location/referrer even before the first render.
      page_location: safeLocation(window.location.href),
      page_referrer: safeLocation(document.referrer, true),
    });
    sendPageView();
    for (const event of pendingEvents)
      sendCommercialEvent(event.name, event.page);
    pendingEvents = [];
  };
  loadTimer = setTimeout(fail, 15000);
  document.head.appendChild(tag);
}

function clearAnalyticsCookies(): void {
  const names = document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=')[0]);
  const hostParts = window.location.hostname.split('.');
  const domains = [
    '',
    ...hostParts.map((_, i) => hostParts.slice(i).join('.')),
  ];
  const parts = window.location.pathname.split('/').filter(Boolean);
  const paths = new Set(['/']);
  for (let i = 1; i <= parts.length; i++) {
    const path = '/' + parts.slice(0, i).join('/');
    paths.add(path);
    paths.add(path + '/');
  }
  for (const name of names) {
    if (name !== '_ga' && !name.startsWith('_ga_')) continue;
    for (const domain of domains) {
      for (const path of paths) {
        document.cookie = `${name}=; Max-Age=0; Path=${path}${domain ? `; Domain=${domain}` : ''}`;
      }
    }
  }
}

function applyConsent(next: AnalyticsConsent): void {
  consent = next;
  if (next === 'granted') {
    activate();
  } else {
    // Consent Mode alone permits cookieless pings; disable the property first.
    setDisabled(true);
    command('consent', 'update', denied);
    pendingEvents = [];
    lastPageLocation = null;
    if (!configured && script) {
      clearTimeout(loadTimer);
      script.remove();
      script = null;
    }
    clearAnalyticsCookies();
  }
  subscribers.forEach((notify) => notify());
}

/** Called once outside React; StrictMode cannot install duplicate listeners. */
export function initializeAnalytics(): void {
  if (initialized) return;
  initialized = true;
  setDisabled(true);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    // gtag.js expects the standard arguments object in the dataLayer.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  command('consent', 'default', denied);
  applyConsent(readConsent());
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || !(event.target instanceof Element)) return;
    const anchor = event.target.closest('a[href]');
    if (!(anchor instanceof HTMLAnchorElement)) return;
    const url = new URL(anchor.href, window.location.href);
    if (url.protocol === 'tel:') trackCommercialEvent('click_phone');
    else if (url.protocol === 'mailto:') trackCommercialEvent('click_email');
    else if (
      url.protocol === 'https:' &&
      ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(url.hostname)
    )
      trackCommercialEvent('click_whatsapp');
  });
  window.addEventListener('storage', (event) => {
    if (event.key === CONSENT_KEY || event.key === null) {
      // Use the external decision directly, including withdrawal in another tab.
      const next =
        event.newValue === 'granted'
          ? 'granted'
          : event.newValue === 'denied'
            ? 'denied'
            : null;
      try {
        sessionStorage.removeItem(CONSENT_KEY);
      } catch {
        /* Storage unavailable. */
      }
      applyConsent(next);
    }
  });
}

export function getAnalyticsConsent(): AnalyticsConsent {
  return consent;
}

export function subscribeAnalyticsConsent(notify: () => void): () => void {
  subscribers.add(notify);
  return () => {
    subscribers.delete(notify);
  };
}

/** Returns whether the decision was saved persistently. Storage failures never block the site. */
export function setAnalyticsConsent(
  next: Exclude<AnalyticsConsent, null>,
): boolean {
  let saved = false;
  try {
    localStorage.setItem(CONSENT_KEY, next);
    saved = true;
  } catch {
    /* Private browsing or storage policy. */
  }
  try {
    sessionStorage.setItem(CONSENT_KEY, next);
  } catch {
    /* Storage unavailable. */
  }
  applyConsent(next);
  return saved;
}

/** Called after React commits the page's title and metadata, including FR/AR changes. */
export function trackCurrentPage(): void {
  const location = safeLocation(window.location.href);
  const changed = currentPage?.page_location !== location;
  currentPage = {
    page_location: location,
    page_title: document.title,
    page_referrer: changed
      ? currentPage?.page_location || safeLocation(document.referrer, true)
      : currentPage?.page_referrer || '',
    language: detectRoute(window.location.pathname).locale,
  };
  sendPageView();
}

function sendCommercialEvent(name: CommercialEvent, page: Page): void {
  if (consent !== 'granted' || !configured) return;
  command('event', name, { ...page, send_to: MEASUREMENT_ID });
}

/** No arbitrary parameters, link targets or form values can enter analytics. */
export function trackCommercialEvent(name: CommercialEvent): void {
  if (consent !== 'granted' || !currentPage) return;
  if (configured) sendCommercialEvent(name, currentPage);
  else if (script) pendingEvents.push({ name, page: { ...currentPage } });
}
