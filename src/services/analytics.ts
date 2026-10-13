import { detectRoute, localizedPath } from '../i18n/routes';

export const MEASUREMENT_ID = 'G-00WDFD2SY7';
export const CONSENT_KEY = 'haramain:analytics-consent:v2';
const LEGACY_CONSENT_KEY = 'haramain:analytics-consent:v1';
export type AnalyticsConsent = 'granted' | 'denied' | null;
type ConsentRecord = {
  decision: Exclude<AnalyticsConsent, null>;
  decidedAt: number;
  expiresAt: number;
};
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
let consentRecord: ConsentRecord | null = null;
let expiryTimer: ReturnType<typeof setTimeout> | undefined;
let configured = false;
let script: HTMLScriptElement | null = null;
let loadTimer: ReturnType<typeof setTimeout> | undefined;
let currentPage: Page | null = null;
let lastPageLocation: string | null = null;
let initialReferrer = '';
let pendingEvents: { name: CommercialEvent; page: Page }[] = [];
const CAMPAIGN_FIELDS = {
  utm_source: 'campaign_source',
  utm_medium: 'campaign_medium',
  utm_campaign: 'campaign_name',
  utm_id: 'campaign_id',
  utm_content: 'campaign_content',
  utm_term: 'campaign_term',
} as const;
let campaign: URLSearchParams | null = null;

/** Calendar months in UTC, clamped to the last day of the target month. */
function sixMonthsAfter(timestamp: number): number {
  const date = new Date(timestamp);
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + 6);
  const lastDay = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0),
  ).getUTCDate();
  date.setUTCDate(Math.min(day, lastDay));
  return date.getTime();
}

function parseConsent(raw: string | null): ConsentRecord | null {
  try {
    const record = JSON.parse(raw || 'null') as ConsentRecord | null;
    if (
      !record ||
      !['granted', 'denied'].includes(record.decision) ||
      !Number.isSafeInteger(record.decidedAt) ||
      record.decidedAt < 0 ||
      record.decidedAt > Date.now() ||
      !Number.isSafeInteger(record.expiresAt) ||
      record.expiresAt !== sixMonthsAfter(record.decidedAt) ||
      Date.now() >= record.expiresAt
    )
      return null;
    return {
      decision: record.decision,
      decidedAt: record.decidedAt,
      expiresAt: record.expiresAt,
    };
  } catch {
    return null;
  }
}

function readConsent(): ConsentRecord | null {
  let latest: ConsentRecord | null = null;
  for (const storage of ['localStorage', 'sessionStorage'] as const) {
    try {
      const record = parseConsent(window[storage].getItem(CONSENT_KEY));
      if (
        record &&
        (!latest ||
          record.decidedAt > latest.decidedAt ||
          (record.decidedAt === latest.decidedAt &&
            record.decision === 'denied'))
      )
        latest = record;
    } catch {
      /* Try the other storage when one is unavailable. */
    }
  }
  return latest;
}

function scheduleConsentExpiry(): void {
  clearTimeout(expiryTimer);
  if (!consentRecord) return;
  // Browser timers overflow above ~24.8 days. Re-arm until the real deadline.
  expiryTimer = setTimeout(
    () => {
      ensureConsentValid();
      scheduleConsentExpiry();
    },
    Math.min(consentRecord.expiresAt - Date.now(), 2147483647),
  );
}

function ensureConsentValid(): void {
  if (!consentRecord) return;
  if (
    Date.now() < consentRecord.expiresAt &&
    Date.now() >= consentRecord.decidedAt
  )
    return;
  const renewed = readConsent();
  if (renewed) {
    applyConsent(renewed);
    return;
  }
  applyConsent(null);
}

/** Marketing labels only: no free text, addresses, encodings or phone-like digits. */
function validatedCampaign(url: URL): URLSearchParams {
  const valid = new URLSearchParams();
  if (!detectRoute(url.pathname).page || url.search.length > 4096) return valid;
  for (const key of Object.keys(CAMPAIGN_FIELDS)) {
    const values = url.searchParams.getAll(key);
    const value = values[0];
    if (
      values.length !== 1 ||
      !value ||
      value.length > 64 ||
      !/^[a-z0-9]+(?:[_-][a-z0-9]+)*$/i.test(value) ||
      value.replace(/\D/g, '').length >= 7 ||
      /(?:^|[_-])(?:phone|telephone|tel|mobile|name|nom|prenom|address|adresse|customer|client|user)(?:$|[_-])/i.test(
        value,
      )
    )
      continue;
    valid.set(key, value);
  }
  return valid;
}

/** Retain only the first valid campaign until the first consented measurement. */
function rememberCampaign(): void {
  if (campaign || lastPageLocation || consent === 'denied') return;
  const valid = validatedCampaign(new URL(window.location.href));
  if (valid.size) campaign = valid;
}

function command(...args: unknown[]): void {
  window.gtag?.(...args);
}

function setDisabled(disabled: boolean): void {
  window['ga-disable-G-00WDFD2SY7'] = disabled;
}

/** Known public routes, with only validated UTM actually present in this URL. */
function safeLocation(href: string, referrer = false): string {
  try {
    const url = new URL(href);
    if (!['http:', 'https:'].includes(url.protocol)) return '';
    if (referrer && url.origin !== window.location.origin)
      return url.origin + '/';
    const { page, locale } = detectRoute(url.pathname);
    const location =
      url.origin +
      (page ? localizedPath(page, locale) : localizedPath('notFound', locale));
    const tags = !referrer && page ? validatedCampaign(url) : null;
    return tags?.size ? `${location}?${tags}` : location;
  } catch {
    return '';
  }
}

function sendPageView(): void {
  ensureConsentValid();
  if (consent !== 'granted' || !configured || !currentPage) return;
  const route = currentPage.page_location.split('?')[0];
  if (lastPageLocation === route) return;
  currentPage.page_referrer = lastPageLocation || initialReferrer;
  // Event scope only: config/set would persist these overrides on later hits.
  // Real UTM on the measured URL take precedence; never merge two campaigns.
  const deferredCampaign =
    !lastPageLocation && !new URL(currentPage.page_location).search
      ? campaign
      : null;
  const campaignParameters: Record<string, string> = {};
  if (deferredCampaign)
    for (const [key, field] of Object.entries(CAMPAIGN_FIELDS)) {
      const value = deferredCampaign.get(key);
      if (value) campaignParameters[field] = value;
    }
  command('set', { ...currentPage });
  command('event', 'page_view', {
    ...currentPage,
    ...campaignParameters,
    send_to: MEASUREMENT_ID,
  });
  lastPageLocation = route;
  campaign = null;
  initialReferrer = '';
}

function activate(): void {
  ensureConsentValid();
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
    ensureConsentValid();
    if (script !== tag || consent !== 'granted') return;
    clearTimeout(loadTimer);
    configured = true;
    command('js', new Date());
    if (currentPage) command('set', { ...currentPage });
    command('config', MEASUREMENT_ID, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      // Do not forward raw document.location/referrer even before the first render.
      page_location: safeLocation(window.location.href),
      page_referrer: lastPageLocation || initialReferrer,
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

function applyConsent(record: ConsentRecord | null): void {
  consentRecord = record;
  const next = record?.decision || null;
  consent = next;
  scheduleConsentExpiry();
  if (next === 'granted') {
    rememberCampaign();
    if (currentPage)
      currentPage.page_location = safeLocation(window.location.href);
    activate();
  } else {
    // Consent Mode alone permits cookieless pings; disable the property first.
    setDisabled(true);
    command('consent', 'update', denied);
    pendingEvents = [];
    lastPageLocation = null;
    campaign = null;
    initialReferrer = '';
    if (currentPage) {
      currentPage.page_location = safeLocation(window.location.href);
      currentPage.page_referrer = '';
    }
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
  // Undated v1 decisions cannot establish a valid consent period.
  for (const storage of ['localStorage', 'sessionStorage'] as const) {
    try {
      window[storage].removeItem(LEGACY_CONSENT_KEY);
    } catch {
      /* Storage unavailable. */
    }
  }
  applyConsent(readConsent());
  if (consent !== 'denied')
    initialReferrer = safeLocation(document.referrer, true);
  rememberCampaign();
  window.addEventListener('focus', ensureConsentValid);
  window.addEventListener('pageshow', ensureConsentValid);
  document.addEventListener('visibilitychange', ensureConsentValid);
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
    if (event.storageArea && event.storageArea !== window.localStorage) return;
    if (event.key === CONSENT_KEY || event.key === null) {
      // Use the external decision directly, including withdrawal in another tab.
      const next = parseConsent(event.newValue);
      if (next && consentRecord && next.decidedAt < consentRecord.decidedAt)
        return;
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
  const decidedAt = Date.now();
  const record: ConsentRecord = {
    decision: next,
    decidedAt,
    expiresAt: sixMonthsAfter(decidedAt),
  };
  const serialized = JSON.stringify(record);
  let saved = false;
  try {
    localStorage.setItem(CONSENT_KEY, serialized);
    saved = true;
  } catch {
    /* Private browsing or storage policy. */
  }
  try {
    sessionStorage.setItem(CONSENT_KEY, serialized);
  } catch {
    /* Storage unavailable. */
  }
  applyConsent(record);
  return saved;
}

/** Called after React commits the page's title and metadata, including FR/AR changes. */
export function trackCurrentPage(): void {
  ensureConsentValid();
  rememberCampaign();
  const location = safeLocation(window.location.href);
  const route = location.split('?')[0];
  currentPage = {
    page_location: location,
    page_title: document.title,
    page_referrer:
      lastPageLocation === route
        ? currentPage?.page_referrer || ''
        : lastPageLocation || initialReferrer,
    language: detectRoute(window.location.pathname).locale,
  };
  sendPageView();
}

function sendCommercialEvent(name: CommercialEvent, page: Page): void {
  ensureConsentValid();
  if (consent !== 'granted' || !configured) return;
  command('event', name, { ...page, send_to: MEASUREMENT_ID });
}

/** No arbitrary parameters, link targets or form values can enter analytics. */
export function trackCommercialEvent(name: CommercialEvent): void {
  ensureConsentValid();
  if (consent !== 'granted' || !currentPage) return;
  if (configured) sendCommercialEvent(name, currentPage);
  else if (script) pendingEvents.push({ name, page: { ...currentPage } });
}
