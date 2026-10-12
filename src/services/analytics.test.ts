// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { localizedPath } from '../i18n/routes';
import type { PageKey } from '../i18n/types';

let analytics: typeof import('./analytics');
let windowListeners: ReturnType<typeof vi.spyOn>;
let documentListeners: ReturnType<typeof vi.spyOn>;

function commands(): unknown[][] {
  return (window.dataLayer || []).map((entry) =>
    Array.from(entry as ArrayLike<unknown>),
  );
}
function events(name?: string): unknown[][] {
  return commands().filter(
    (entry) => entry[0] === 'event' && (!name || entry[1] === name),
  );
}
function loadTag() {
  document.querySelector('#haramain-ga4')!.dispatchEvent(new Event('load'));
}
function view(path: string, title = 'Haramain Prestige') {
  history.replaceState({}, '', path);
  document.title = title;
  analytics.trackCurrentPage();
}

beforeEach(async () => {
  vi.resetModules();
  vi.useFakeTimers();
  localStorage.clear();
  sessionStorage.clear();
  document.head.innerHTML = '';
  document.body.innerHTML = '';
  history.replaceState({}, '', '/');
  window.dataLayer = [];
  window.gtag = undefined;
  document.cookie = '_ga=; Max-Age=0; Path=/';
  document.cookie = '_ga_00WDFD2SY7=; Max-Age=0; Path=/';
  windowListeners = vi.spyOn(window, 'addEventListener');
  documentListeners = vi.spyOn(document, 'addEventListener');
  analytics = await import('./analytics');
});

afterEach(() => {
  for (const [type, listener] of windowListeners.mock.calls)
    window.removeEventListener(type, listener);
  for (const [type, listener] of documentListeners.mock.calls)
    document.removeEventListener(type, listener);
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('GA4 basic consent', () => {
  it('makes no script request or measurement command before consent or after refusal', () => {
    analytics.initializeAnalytics();
    view('/');
    analytics.trackCommercialEvent('generate_lead');
    expect(document.querySelector('script')).toBeNull();
    expect(
      commands().some(([name]) =>
        ['config', 'js', 'event'].includes(String(name)),
      ),
    ).toBe(false);
    expect(commands()[0]).toEqual([
      'consent',
      'default',
      {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      },
    ]);
    analytics.setAnalyticsConsent('denied');
    analytics.trackCommercialEvent('click_whatsapp');
    expect(document.querySelector('script')).toBeNull();
    expect(events()).toEqual([]);
    expect(window['ga-disable-G-00WDFD2SY7']).toBe(true);
  });

  it('loads once on acceptance and never emits automatic page views', () => {
    analytics.initializeAnalytics();
    view('/');
    analytics.setAnalyticsConsent('granted');
    analytics.initializeAnalytics();
    analytics.setAnalyticsConsent('granted');
    expect(document.querySelectorAll('script')).toHaveLength(1);
    expect(document.querySelector('script')!.src).toBe(
      'https://www.googletagmanager.com/gtag/js?id=G-00WDFD2SY7',
    );
    expect(events()).toHaveLength(0);
    loadTag();
    analytics.trackCurrentPage();
    expect(events('page_view')).toHaveLength(1);
    expect(commands().find(([name]) => name === 'config')?.[2]).toMatchObject({
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  });

  it.each(['granted', 'denied'] as const)(
    'restores saved %s on reload',
    (value) => {
      localStorage.setItem(analytics.CONSENT_KEY, value);
      analytics.initializeAnalytics();
      expect(analytics.getAnalyticsConsent()).toBe(value);
      expect(document.querySelectorAll('script')).toHaveLength(
        value === 'granted' ? 1 : 0,
      );
      view('/ar-sa/', 'الرئيسية');
      if (value === 'granted') loadTag();
      expect(events('page_view')).toHaveLength(value === 'granted' ? 1 : 0);
    },
  );

  it('withdraws consent, disables collection before the update and clears only analytics cookies', () => {
    analytics.initializeAnalytics();
    view('/');
    analytics.setAnalyticsConsent('granted');
    loadTag();
    document.cookie = '_ga=visitor; Path=/';
    document.cookie = '_ga_00WDFD2SY7=session; Path=/';
    document.cookie = 'essential=keep; Path=/';
    const gtag = window.gtag!;
    const disabledStates: boolean[] = [];
    window.gtag = (...args) => {
      disabledStates.push(window['ga-disable-G-00WDFD2SY7']!);
      gtag(...args);
    };
    analytics.setAnalyticsConsent('denied');
    expect(disabledStates).toEqual([true]);
    expect(commands().at(-1)).toEqual([
      'consent',
      'update',
      {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      },
    ]);
    view('/contact');
    analytics.trackCommercialEvent('generate_lead');
    expect(events()).toHaveLength(1);
    expect(document.cookie).not.toContain('_ga');
    expect(document.cookie).toContain('essential=keep');
    expect(localStorage.getItem(analytics.CONSENT_KEY)).toBe('denied');
    analytics.setAnalyticsConsent('granted');
    expect(document.querySelectorAll('script')).toHaveLength(1);
    expect(events('page_view')).toHaveLength(2);
  });

  it('does not configure GA if consent is withdrawn during script loading', () => {
    analytics.initializeAnalytics();
    view('/');
    analytics.setAnalyticsConsent('granted');
    const tag = document.querySelector('script')!;
    analytics.trackCommercialEvent('generate_lead');
    analytics.setAnalyticsConsent('denied');
    tag.dispatchEvent(new Event('load'));
    expect(events()).toHaveLength(0);
    expect(commands().find(([name]) => name === 'config')).toBeUndefined();
    expect(document.querySelector('script')).toBeNull();
  });

  it.each(['error', 'timeout'])(
    'handles script %s without a failure in navigation',
    (failure) => {
      analytics.initializeAnalytics();
      view('/');
      analytics.setAnalyticsConsent('granted');
      if (failure === 'error')
        document.querySelector('script')!.dispatchEvent(new Event('error'));
      else vi.advanceTimersByTime(15000);
      view('/contact');
      expect(document.querySelector('script')).toBeNull();
      expect(events()).toHaveLength(0);
      analytics.setAnalyticsConsent('granted');
      loadTag();
      expect(events('page_view')).toHaveLength(1);
    },
  );

  it('drops pending events on refusal and only measures the current page when loading finishes', () => {
    analytics.initializeAnalytics();
    view('/');
    analytics.setAnalyticsConsent('granted');
    view('/ar-sa/contact', 'اتصل بنا');
    loadTag();
    expect(events('page_view')).toHaveLength(1);
    expect(events('page_view')[0][2]).toMatchObject({
      page_title: 'اتصل بنا',
      language: 'ar-SA',
    });
  });

  it('responds to withdrawal in another tab', () => {
    analytics.initializeAnalytics();
    view('/');
    analytics.setAnalyticsConsent('granted');
    loadTag();
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: analytics.CONSENT_KEY,
        newValue: 'denied',
      }),
    );
    view('/contact');
    expect(analytics.getAnalyticsConsent()).toBe('denied');
    expect(events()).toHaveLength(1);
  });

  it('uses a session refusal if persistent storage stops accepting writes', () => {
    localStorage.setItem(analytics.CONSENT_KEY, 'granted');
    analytics.initializeAnalytics();
    const setItem = Storage.prototype.setItem;
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(function (
      this: Storage,
      key,
      value,
    ) {
      if (this === localStorage) throw new Error('Storage blocked');
      setItem.call(this, key, value);
    });
    expect(analytics.setAnalyticsConsent('denied')).toBe(false);
    expect(sessionStorage.getItem(analytics.CONSENT_KEY)).toBe('denied');
    expect(window['ga-disable-G-00WDFD2SY7']).toBe(true);
    vi.resetModules();
    return import('./analytics').then((reloaded) => {
      reloaded.initializeAnalytics();
      expect(reloaded.getAnalyticsConsent()).toBe('denied');
      expect(document.querySelector('script')).toBeNull();
    });
  });

  it('buffers a consented lead while the script loads and flushes it once', () => {
    analytics.initializeAnalytics();
    view('/');
    analytics.setAnalyticsConsent('granted');
    analytics.trackCommercialEvent('generate_lead');
    expect(events('generate_lead')).toHaveLength(0);
    loadTag();
    expect(events('generate_lead')).toHaveLength(1);
  });

  it('keeps analytics off when storage cannot be read', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage blocked');
    });
    expect(() => analytics.initializeAnalytics()).not.toThrow();
    expect(analytics.getAnalyticsConsent()).toBeNull();
    expect(document.querySelector('script')).toBeNull();
  });
});

describe('manual page views and commercial events', () => {
  it('uses the previous page as referrer and ignores anchors and query parameters', () => {
    analytics.initializeAnalytics();
    view('/');
    analytics.setAnalyticsConsent('granted');
    loadTag();
    view('/#devis');
    view('/?email=private@example.com#devis');
    expect(events('page_view')).toHaveLength(1);
    view('/ar-sa/', 'العربية');
    expect(events('page_view').at(-1)?.[2]).toMatchObject({
      page_location: window.location.origin + '/ar-sa/',
      page_referrer: window.location.origin + '/',
      page_title: 'العربية',
      language: 'ar-SA',
    });
    view('/');
    expect(events('page_view')).toHaveLength(3);
  });

  it('measures every public SEO route in both languages', () => {
    analytics.initializeAnalytics();
    analytics.setAnalyticsConsent('granted');
    loadTag();
    const pages: PageKey[] = [
      'home',
      'about',
      'legal',
      'privacy',
      'hotelsMakkah',
      'hotelsMadinah',
      'chambreVueKaaba',
      'transfertJeddahMakkah',
      'transfertAeroportMadinah',
      'chauffeurPriveMakkahMadinah',
      'visitesMadinah',
      'visitesMakkah',
      'services',
      'hotels',
      'testimonials',
      'contact',
    ];
    for (const locale of ['fr', 'ar-SA'] as const) {
      for (const page of pages) {
        const path = localizedPath(page, locale);
        view(path, `${page} ${locale}`);
        expect(events('page_view').at(-1)?.[2]).toMatchObject({
          page_location: window.location.origin + path,
          page_title: `${page} ${locale}`,
          language: locale,
        });
      }
    }
    expect(events('page_view')).toHaveLength(pages.length * 2);
  });

  it('counts all contact links via delegation without collecting link text or targets', () => {
    analytics.initializeAnalytics();
    view('/contact?email=private@example.com');
    analytics.setAnalyticsConsent('granted');
    loadTag();
    for (const href of [
      'https://wa.me/33123456789?text=private',
      'tel:+33123456789',
      'mailto:private@example.com',
    ]) {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = 'Private name';
      const child = document.createElement('span');
      link.appendChild(child);
      document.body.appendChild(link);
      // Avoid jsdom's default external navigation after delegation has run.
      document.addEventListener('click', (event) => event.preventDefault(), {
        once: true,
      });
      child.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true }),
      );
    }
    expect(events().map((entry) => entry[1])).toEqual([
      'page_view',
      'click_whatsapp',
      'click_phone',
      'click_email',
    ]);
    const serialized = JSON.stringify(commands());
    for (const privateValue of ['private', '33123456789', 'Private name'])
      expect(serialized).not.toContain(privateValue);
    analytics.setAnalyticsConsent('denied');
    analytics.trackCommercialEvent('click_email');
    expect(events()).toHaveLength(4);
  });

  it('redacts unknown paths and external referrer paths', () => {
    vi.spyOn(document, 'referrer', 'get').mockReturnValue(
      'https://example.org/private@example.com?phone=123#name',
    );
    analytics.initializeAnalytics();
    view('/private@example.com?phone=123#name', 'Page introuvable');
    analytics.setAnalyticsConsent('granted');
    loadTag();
    expect(events('page_view')[0][2]).toMatchObject({
      page_location: window.location.origin + '/404',
      page_referrer: 'https://example.org/',
    });
    expect(JSON.stringify(commands())).not.toContain('private@example.com');
  });
});
