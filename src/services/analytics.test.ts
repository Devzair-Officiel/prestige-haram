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
function savedChoice(
  decision: 'granted' | 'denied',
  decidedAt = Date.now(),
  expiresAt?: number,
): string {
  // Existing restore tests use a date away from month-end; boundary cases below
  // use explicit dates and assert the persisted deadline independently.
  const expiry = new Date(decidedAt);
  expiry.setUTCMonth(expiry.getUTCMonth() + 6);
  return JSON.stringify({
    decision,
    decidedAt,
    expiresAt: expiresAt ?? expiry.getTime(),
  });
}

beforeEach(async () => {
  vi.resetModules();
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-01-15T12:00:00.000Z'));
  localStorage.clear();
  sessionStorage.clear();
  document.head.innerHTML = '';
  document.body.innerHTML = '';
  vi.spyOn(document, 'referrer', 'get').mockReturnValue('');
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
      localStorage.setItem(analytics.CONSENT_KEY, savedChoice(value));
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
    expect(
      JSON.parse(localStorage.getItem(analytics.CONSENT_KEY)!),
    ).toMatchObject({ decision: 'denied' });
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
        newValue: savedChoice('denied'),
      }),
    );
    view('/contact');
    expect(analytics.getAnalyticsConsent()).toBe('denied');
    expect(events()).toHaveLength(1);
  });

  it('uses a session refusal if persistent storage stops accepting writes', () => {
    localStorage.setItem(analytics.CONSENT_KEY, savedChoice('granted'));
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
    expect(
      JSON.parse(sessionStorage.getItem(analytics.CONSENT_KEY)!),
    ).toMatchObject({ decision: 'denied' });
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

describe('validated marketing campaigns', () => {
  it.each(['instagram', 'facebook', 'whatsapp', 'newsletter'])(
    'attributes a %s arrival using only the six allowed parameters',
    (source) => {
      vi.spyOn(document, 'referrer', 'get').mockReturnValue(
        `https://www.${source}.com/private@example.com?phone=0612345678#private`,
      );
      const medium = source === 'newsletter' ? 'email' : 'social';
      history.replaceState(
        {},
        '',
        `/hotels-madinah?utm_source=${source}&utm_medium=${medium}&utm_campaign=hotels_madinah&utm_id=hp2026&utm_content=story-1&utm_term=hotel_madinah&email=private@example.com&gclid=private#devis`,
      );
      analytics.initializeAnalytics();
      analytics.trackCurrentPage();
      expect(localStorage.length).toBe(0);
      expect(sessionStorage.length).toBe(0);
      expect(document.querySelector('script')).toBeNull();
      expect(events()).toHaveLength(0);
      analytics.setAnalyticsConsent('granted');
      loadTag();
      const expected =
        window.location.origin +
        `/hotels-madinah?utm_source=${source}&utm_medium=${medium}&utm_campaign=hotels_madinah&utm_id=hp2026&utm_content=story-1&utm_term=hotel_madinah`;
      expect(events('page_view')[0][2]).toMatchObject({
        page_location: expected,
        page_referrer: `https://www.${source}.com/`,
      });
      expect(commands().find(([name]) => name === 'config')?.[2]).toMatchObject(
        { page_location: expected, send_page_view: false },
      );
      analytics.trackCommercialEvent('generate_lead');
      expect(events('generate_lead')[0][2]).toMatchObject({
        page_location: expected,
      });
      expect(JSON.stringify(commands())).not.toMatch(/private|gclid|#devis/);
      expect(localStorage.getItem(analytics.CONSENT_KEY)).not.toContain('utm_');
      view('/contact');
      expect(events('page_view')[1][2]).toMatchObject({
        page_location: window.location.origin + '/contact',
        page_referrer: window.location.origin + '/hotels-madinah',
      });
      expect(JSON.stringify(events('page_view')[1])).not.toMatch(
        /utm_|campaign_/,
      );
    },
  );

  it('preserves the landing campaign across FR/AR navigation before acceptance', () => {
    vi.spyOn(document, 'referrer', 'get').mockReturnValue(
      'https://www.instagram.com/private?email=private@example.com#private',
    );
    history.replaceState(
      {},
      '',
      '/?utm_source=instagram&utm_medium=social&utm_campaign=omra_2026&utm_id=hp2026&utm_content=story-1&utm_term=hotel_madinah',
    );
    analytics.initializeAnalytics();
    analytics.trackCurrentPage();
    view('/hotels-madinah');
    view('/ar-sa/hotels-madinah', 'فنادق المدينة');
    expect(events()).toHaveLength(0);
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
    analytics.setAnalyticsConsent('granted');
    loadTag();
    expect(events('page_view')).toHaveLength(1);
    expect(events('page_view')[0][2]).toMatchObject({
      page_location: window.location.origin + '/ar-sa/hotels-madinah',
      page_referrer: 'https://www.instagram.com/',
      campaign_source: 'instagram',
      campaign_medium: 'social',
      campaign_name: 'omra_2026',
      campaign_id: 'hp2026',
      campaign_content: 'story-1',
      campaign_term: 'hotel_madinah',
      language: 'ar-SA',
    });
    expect(commands().find(([name]) => name === 'config')?.[2]).toMatchObject({
      page_location: window.location.origin + '/ar-sa/hotels-madinah',
      page_referrer: 'https://www.instagram.com/',
    });
    analytics.trackCommercialEvent('generate_lead');
    expect(events('generate_lead')).toHaveLength(1);
    expect(JSON.stringify(events('generate_lead'))).not.toMatch(
      /utm_|campaign_/,
    );
    view('/ar-sa/hotels-madinah#devis');
    view('/ar-sa/hotels-madinah?utm_source=facebook');
    expect(events('page_view')).toHaveLength(1);
    view('/');
    expect(events('page_view')).toHaveLength(2);
    expect(events('page_view')[1][2]).toMatchObject({
      page_location: window.location.origin + '/',
      page_referrer: window.location.origin + '/ar-sa/hotels-madinah',
    });
    expect(JSON.stringify(events('page_view')[1])).not.toMatch(
      /utm_|campaign_/,
    );
    for (const entry of commands().filter(([name]) => name !== 'event'))
      expect(JSON.stringify(entry)).not.toMatch(/campaign_/);
    expect(JSON.stringify(commands())).not.toContain('private');
  });

  it.each([
    [
      'https://www.google.com/search?q=private@example.com#private',
      'https://www.google.com/',
    ],
    [
      'https://www.instagram.com/private?phone=0612345678',
      'https://www.instagram.com/',
    ],
    ['', ''],
    ['not-a-url', ''],
    ['javascript:private', ''],
  ])(
    'preserves the cleaned initial referrer %j through delayed consent without UTM',
    (referrer, expected) => {
      vi.spyOn(document, 'referrer', 'get').mockReturnValue(referrer);
      analytics.initializeAnalytics();
      view('/');
      view('/hotels-makkah');
      view('/ar-sa/contact');
      expect(document.querySelector('script')).toBeNull();
      expect(events()).toEqual([]);
      analytics.setAnalyticsConsent('granted');
      loadTag();
      expect(events('page_view')).toHaveLength(1);
      expect(events('page_view')[0][2]).toMatchObject({
        page_location: window.location.origin + '/ar-sa/contact',
        page_referrer: expected,
      });
      expect(commands().find(([name]) => name === 'config')?.[2]).toMatchObject(
        {
          page_referrer: expected,
        },
      );
      view('/contact');
      expect(events('page_view')[1][2]).toMatchObject({
        page_location: window.location.origin + '/contact',
        page_referrer: window.location.origin + '/ar-sa/contact',
      });
      expect(JSON.stringify(commands())).not.toMatch(
        /private|0612345678|campaign_|utm_/,
      );
    },
  );

  it('uses the initial source when navigation continues while the tag is loading', () => {
    vi.spyOn(document, 'referrer', 'get').mockReturnValue(
      'https://www.instagram.com/private',
    );
    history.replaceState({}, '', '/?utm_source=instagram&utm_medium=social');
    analytics.initializeAnalytics();
    analytics.trackCurrentPage();
    analytics.setAnalyticsConsent('granted');
    view('/hotels-madinah');
    analytics.trackCommercialEvent('generate_lead');
    view('/ar-sa/contact');
    loadTag();
    expect(events('page_view')).toHaveLength(1);
    expect(events('page_view')[0][2]).toMatchObject({
      page_location: window.location.origin + '/ar-sa/contact',
      page_referrer: 'https://www.instagram.com/',
      campaign_source: 'instagram',
      campaign_medium: 'social',
    });
    expect(events('generate_lead')).toHaveLength(1);
    expect(events('generate_lead')[0][2]).toMatchObject({
      page_location: window.location.origin + '/hotels-madinah',
    });
    expect(JSON.stringify(events('generate_lead'))).not.toMatch(
      /utm_|campaign_/,
    );
  });

  it('does not override or merge a different valid campaign actually on the measured page', () => {
    history.replaceState(
      {},
      '',
      '/?utm_source=instagram&utm_medium=social&utm_campaign=original',
    );
    analytics.initializeAnalytics();
    analytics.trackCurrentPage();
    view('/contact?utm_source=newsletter&utm_medium=email');
    analytics.setAnalyticsConsent('granted');
    loadTag();
    expect(events('page_view')[0][2]).toMatchObject({
      page_location:
        window.location.origin +
        '/contact?utm_source=newsletter&utm_medium=email',
    });
    expect(JSON.stringify(commands())).not.toMatch(
      /instagram|original|campaign_/,
    );
    view('/hotels-makkah?utm_source=facebook&utm_campaign=current');
    expect(events('page_view')[1][2]).toMatchObject({
      page_location:
        window.location.origin +
        '/hotels-makkah?utm_source=facebook&utm_campaign=current',
      page_referrer: window.location.origin + '/contact',
    });
    view('/');
    expect(events('page_view')[2][2]).toMatchObject({
      page_location: window.location.origin + '/',
    });
    expect(JSON.stringify(events('page_view')[2])).not.toMatch(
      /utm_|campaign_/,
    );
  });

  it('consumes deferred campaign overrides once without changing conversions or URL history', () => {
    history.replaceState(
      {},
      '',
      '/?utm_source=instagram&utm_medium=social&utm_campaign=omra',
    );
    analytics.initializeAnalytics();
    analytics.trackCurrentPage();
    view('/contact?email=private@example.com#devis');
    const actualLocation = window.location.href;
    analytics.setAnalyticsConsent('granted');
    loadTag();
    expect(window.location.href).toBe(actualLocation);
    analytics.setAnalyticsConsent('granted');
    view('/contact#devis');
    view('/contact?utm_source=facebook');
    view('/contact');
    expect(events('page_view')).toHaveLength(1);
    for (const name of [
      'click_whatsapp',
      'click_phone',
      'click_email',
      'generate_lead',
    ] as const) {
      analytics.trackCommercialEvent(name);
      expect(events(name)).toHaveLength(1);
      expect(events(name)[0][2]).toMatchObject({
        page_location: window.location.origin + '/contact',
      });
      expect(JSON.stringify(events(name))).not.toMatch(/utm_|campaign_/);
    }
    view('/ar-sa/');
    // Returning to a genuinely tagged URL keeps its tags, without a cached override.
    view('/?utm_source=instagram&utm_medium=social&utm_campaign=omra');
    view('/#devis');
    expect(events('page_view')).toHaveLength(3);
    expect(events('page_view')[2][2]).toMatchObject({
      page_location:
        window.location.origin +
        '/?utm_source=instagram&utm_medium=social&utm_campaign=omra',
      page_referrer: window.location.origin + '/ar-sa/',
    });
    expect(
      events('page_view').filter(
        (entry) => 'campaign_source' in (entry[2] as object),
      ),
    ).toHaveLength(1);
    for (const entry of commands().filter(([name]) => name !== 'event'))
      expect(JSON.stringify(entry)).not.toMatch(/campaign_/);
    expect(JSON.stringify(commands())).not.toContain('private@example.com');
  });

  it('keeps the source through a failed load but discards it on withdrawal', () => {
    vi.spyOn(document, 'referrer', 'get').mockReturnValue(
      'https://www.instagram.com/private',
    );
    history.replaceState({}, '', '/?utm_source=instagram');
    analytics.initializeAnalytics();
    analytics.trackCurrentPage();
    analytics.setAnalyticsConsent('granted');
    document.querySelector('script')!.dispatchEvent(new Event('error'));
    view('/contact');
    analytics.setAnalyticsConsent('granted');
    loadTag();
    expect(events('page_view')[0][2]).toMatchObject({
      page_location: window.location.origin + '/contact',
      page_referrer: 'https://www.instagram.com/',
      campaign_source: 'instagram',
    });
    analytics.setAnalyticsConsent('denied');
    view('/ar-sa/');
    analytics.trackCommercialEvent('generate_lead');
    expect(events()).toHaveLength(1);
    analytics.setAnalyticsConsent('granted');
    expect(events('page_view')[1][2]).toMatchObject({
      page_location: window.location.origin + '/ar-sa/',
      page_referrer: '',
    });
    expect(JSON.stringify(events('page_view')[1])).not.toMatch(
      /instagram|campaign_|utm_/,
    );
  });

  it.each(['denied', 'expired'] as const)(
    'discards unmeasured acquisition after consent is %s during tag loading',
    (decision) => {
      vi.spyOn(document, 'referrer', 'get').mockReturnValue(
        'https://www.google.com/search?q=private',
      );
      history.replaceState({}, '', '/?utm_source=instagram');
      analytics.initializeAnalytics();
      analytics.trackCurrentPage();
      analytics.setAnalyticsConsent('granted');
      const oldTag = document.querySelector('script')!;
      analytics.trackCommercialEvent('generate_lead');
      view('/contact');
      if (decision === 'denied') analytics.setAnalyticsConsent('denied');
      else {
        const { expiresAt } = JSON.parse(
          localStorage.getItem(analytics.CONSENT_KEY)!,
        );
        vi.setSystemTime(expiresAt);
      }
      // No further navigation: even the current page snapshot must forget the source.
      analytics.trackCommercialEvent('click_email');
      oldTag.dispatchEvent(new Event('load'));
      expect(events()).toHaveLength(0);
      analytics.setAnalyticsConsent('granted');
      loadTag();
      expect(events('page_view')[0][2]).toMatchObject({
        page_location: window.location.origin + '/contact',
        page_referrer: '',
      });
      expect(JSON.stringify(commands())).not.toMatch(
        /google.com|instagram|campaign_|utm_|private/,
      );
      expect(events('generate_lead')).toHaveLength(0);
    },
  );

  it('filters all six deferred campaign fields with the same privacy rules as page URLs', () => {
    history.replaceState(
      {},
      '',
      '/?utm_source=instagram&utm_medium=social&utm_campaign=private%40example.com&utm_id=0612345678&utm_content=user_jean&utm_term=story--1',
    );
    analytics.initializeAnalytics();
    analytics.trackCurrentPage();
    view('/contact?token=private');
    analytics.setAnalyticsConsent('granted');
    loadTag();
    expect(events('page_view')[0][2]).toMatchObject({
      page_location: window.location.origin + '/contact',
      campaign_source: 'instagram',
      campaign_medium: 'social',
    });
    expect(JSON.stringify(commands())).not.toMatch(
      /private|0612345678|user_jean|story--1|campaign_name|campaign_id|campaign_content|campaign_term/,
    );
  });

  it.each([
    '',
    'private@example.com',
    '0612345678',
    '+33 6 12 34 56 78',
    'phone_06_12_34_56_78',
    'abc1234567',
    'Jean Dupont',
    'user_jean',
    'https://example.com',
    'instagram.com',
    'حملة',
    'abc\nxyz',
    'abc%40example',
    '<script>',
    'story--1',
    'a'.repeat(65),
  ])('rejects unsafe or malformed UTM value %j', (value) => {
    history.replaceState({}, '', '/?utm_source=' + encodeURIComponent(value));
    analytics.initializeAnalytics();
    analytics.trackCurrentPage();
    analytics.setAnalyticsConsent('granted');
    loadTag();
    expect(events('page_view')[0][2]).toMatchObject({
      page_location: window.location.origin + '/',
    });
    expect(JSON.stringify(commands())).not.toContain('utm_source');
  });

  it.each([
    '?utm_source=instagram&utm_source=facebook',
    '?utm_source=%E0%A4%A',
    '?UTM_SOURCE=instagram&other=private',
    '?unknown=private@example.com',
    '?utm_source=instagram&unknown=' + 'x'.repeat(4096),
  ])(
    'discards duplicated, malformed, unknown or oversized query data: %s',
    (query) => {
      history.replaceState({}, '', '/' + query);
      analytics.initializeAnalytics();
      analytics.trackCurrentPage();
      analytics.setAnalyticsConsent('granted');
      loadTag();
      expect(events('page_view')[0][2]).toMatchObject({
        page_location: window.location.origin + '/',
      });
    },
  );

  it('accepts the length limit and excludes campaign tags from unknown routes and referrers', () => {
    vi.spyOn(document, 'referrer', 'get').mockReturnValue(
      window.location.origin + '/contact?utm_source=private@example.com',
    );
    history.replaceState({}, '', '/?utm_source=' + 'a'.repeat(64));
    analytics.initializeAnalytics();
    analytics.trackCurrentPage();
    analytics.setAnalyticsConsent('granted');
    loadTag();
    expect(events('page_view')[0][2]).toMatchObject({
      page_location: window.location.origin + '/?utm_source=' + 'a'.repeat(64),
      page_referrer: window.location.origin + '/contact',
    });
    view('/private@example.com?utm_source=facebook');
    expect(events('page_view')[1][2]).toMatchObject({
      page_location: window.location.origin + '/404',
    });
    expect(JSON.stringify(commands())).not.toContain('private@example.com');
  });

  it('never sends a refused campaign and discards it before a later internal acceptance', () => {
    history.replaceState({}, '', '/?utm_source=instagram&utm_campaign=omra');
    analytics.initializeAnalytics();
    analytics.trackCurrentPage();
    analytics.setAnalyticsConsent('denied');
    view('/ar-sa/');
    analytics.trackCommercialEvent('generate_lead');
    expect(document.querySelector('script')).toBeNull();
    expect(events()).toHaveLength(0);
    expect(JSON.stringify(commands())).not.toContain('instagram');
    analytics.setAnalyticsConsent('granted');
    loadTag();
    expect(events('page_view')[0][2]).toMatchObject({
      page_location: window.location.origin + '/ar-sa/',
    });
  });
});

describe('six calendar months of consent', () => {
  it.each([
    ['2026-08-31T12:34:56.789Z', '2027-02-28T12:34:56.789Z'],
    ['2027-08-31T12:34:56.789Z', '2028-02-29T12:34:56.789Z'],
    ['2026-03-31T12:34:56.789Z', '2026-09-30T12:34:56.789Z'],
    ['2026-10-31T12:34:56.789Z', '2027-04-30T12:34:56.789Z'],
  ])('clamps %s to %s for both decisions', (start, end) => {
    vi.setSystemTime(new Date(start));
    analytics.initializeAnalytics();
    for (const decision of ['granted', 'denied'] as const) {
      analytics.setAnalyticsConsent(decision);
      expect(JSON.parse(localStorage.getItem(analytics.CONSENT_KEY)!)).toEqual({
        decision,
        decidedAt: Date.parse(start),
        expiresAt: Date.parse(end),
      });
    }
  });

  it.each(['granted', 'denied'] as const)(
    'expires %s at the exact deadline while a tab is open',
    (decision) => {
      analytics.initializeAnalytics();
      view('/');
      analytics.setAnalyticsConsent(decision);
      if (decision === 'granted') loadTag();
      const record = JSON.parse(localStorage.getItem(analytics.CONSENT_KEY)!);
      const notify = vi.fn();
      const unsubscribe = analytics.subscribeAnalyticsConsent(notify);
      vi.advanceTimersByTime(record.expiresAt - Date.now() - 1);
      expect(analytics.getAnalyticsConsent()).toBe(decision);
      const count = events().length;
      document.cookie = '_ga=test; Path=/';
      vi.advanceTimersByTime(1);
      expect(analytics.getAnalyticsConsent()).toBeNull();
      expect(window['ga-disable-G-00WDFD2SY7']).toBe(true);
      expect(document.cookie).not.toContain('_ga');
      expect(notify).toHaveBeenCalledOnce();
      view('/contact');
      analytics.trackCommercialEvent('generate_lead');
      expect(events()).toHaveLength(count);
      unsubscribe();
    },
  );

  it('renews an expired choice without duplicating the loaded script or renewing on navigation', () => {
    analytics.initializeAnalytics();
    view('/');
    analytics.setAnalyticsConsent('granted');
    loadTag();
    const initial = localStorage.getItem(analytics.CONSENT_KEY)!;
    view('/contact');
    expect(localStorage.getItem(analytics.CONSENT_KEY)).toBe(initial);
    vi.advanceTimersByTime(JSON.parse(initial).expiresAt - Date.now());
    expect(analytics.getAnalyticsConsent()).toBeNull();
    analytics.setAnalyticsConsent('granted');
    expect(document.querySelectorAll('script')).toHaveLength(1);
    expect(events('page_view')).toHaveLength(3);
    expect(JSON.parse(localStorage.getItem(analytics.CONSENT_KEY)!)).toEqual({
      decision: 'granted',
      decidedAt: Date.parse('2026-07-15T12:00:00.000Z'),
      expiresAt: Date.parse('2027-01-15T12:00:00.000Z'),
    });
  });

  it.each(['granted', 'denied'] as const)(
    'asks again for an expired %s on reload',
    (decision) => {
      localStorage.setItem(
        analytics.CONSENT_KEY,
        savedChoice(decision, Date.parse('2025-07-15T12:00:00.000Z')),
      );
      analytics.initializeAnalytics();
      expect(analytics.getAnalyticsConsent()).toBeNull();
      expect(document.querySelector('script')).toBeNull();
    },
  );

  it.each(['granted', 'denied'] as const)(
    'does not invent a date for legacy %s',
    (decision) => {
      localStorage.setItem('haramain:analytics-consent:v1', decision);
      sessionStorage.setItem('haramain:analytics-consent:v1', decision);
      analytics.initializeAnalytics();
      expect(analytics.getAnalyticsConsent()).toBeNull();
      expect(document.querySelector('script')).toBeNull();
      expect(localStorage.getItem(analytics.CONSENT_KEY)).toBeNull();
      expect(localStorage.getItem('haramain:analytics-consent:v1')).toBeNull();
    },
  );

  it.each([
    'broken',
    'null',
    '"granted"',
    '{}',
    JSON.stringify({ decision: 'other', decidedAt: 1, expiresAt: 2 }),
    JSON.stringify({ decision: 'granted', decidedAt: -1, expiresAt: 2 }),
    JSON.stringify({
      decision: 'granted',
      decidedAt: '2026-01-15',
      expiresAt: '2026-07-15',
    }),
    savedChoice('granted', Date.parse('2026-02-15T12:00:00.000Z')),
    savedChoice(
      'granted',
      Date.parse('2026-01-15T12:00:00.000Z'),
      Date.parse('2027-01-15T12:00:00.000Z'),
    ),
  ])('fails closed for corrupt, future or invalid date data: %s', (raw) => {
    localStorage.setItem(analytics.CONSENT_KEY, raw);
    analytics.initializeAnalytics();
    expect(analytics.getAnalyticsConsent()).toBeNull();
    expect(document.querySelector('script')).toBeNull();
  });

  it('checks expiry before an event even if the timer was throttled', () => {
    analytics.initializeAnalytics();
    view('/');
    analytics.setAnalyticsConsent('granted');
    loadTag();
    const { expiresAt } = JSON.parse(
      localStorage.getItem(analytics.CONSENT_KEY)!,
    );
    vi.setSystemTime(expiresAt);
    analytics.trackCommercialEvent('generate_lead');
    expect(events('generate_lead')).toHaveLength(0);
    expect(analytics.getAnalyticsConsent()).toBeNull();
    expect(window['ga-disable-G-00WDFD2SY7']).toBe(true);
  });

  it('does not configure or replay buffered events when expiry occurs while loading', () => {
    const start = Date.parse('2025-07-15T12:00:01.000Z');
    localStorage.setItem(analytics.CONSENT_KEY, savedChoice('granted', start));
    analytics.initializeAnalytics();
    view('/');
    const tag = document.querySelector('script')!;
    analytics.trackCommercialEvent('generate_lead');
    vi.setSystemTime(Date.now() + 1000);
    tag.dispatchEvent(new Event('load'));
    expect(events()).toHaveLength(0);
    expect(commands().find(([name]) => name === 'config')).toBeUndefined();
    expect(analytics.getAnalyticsConsent()).toBeNull();
  });

  it('synchronizes a dated renewal and rejects expired cross-tab grants', () => {
    analytics.initializeAnalytics();
    view('/');
    analytics.setAnalyticsConsent('granted');
    loadTag();
    vi.setSystemTime(new Date('2026-02-15T12:00:00.000Z'));
    const renewed = savedChoice('granted');
    localStorage.setItem(analytics.CONSENT_KEY, renewed);
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: analytics.CONSENT_KEY,
        newValue: renewed,
        storageArea: localStorage,
      }),
    );
    vi.advanceTimersByTime(Date.parse('2026-07-15T12:00:00.000Z') - Date.now());
    expect(analytics.getAnalyticsConsent()).toBe('granted');
    vi.advanceTimersByTime(Date.parse('2026-08-15T12:00:00.000Z') - Date.now());
    expect(analytics.getAnalyticsConsent()).toBeNull();
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: analytics.CONSENT_KEY,
        newValue: renewed,
        storageArea: localStorage,
      }),
    );
    expect(analytics.getAnalyticsConsent()).toBeNull();
    expect(document.querySelectorAll('script')).toHaveLength(1);
    analytics.trackCommercialEvent('generate_lead');
    expect(events('generate_lead')).toHaveLength(0);
  });

  it.each(['focus', 'pageshow', 'visibilitychange'])(
    'expires a suspended session on %s',
    (type) => {
      analytics.initializeAnalytics();
      analytics.setAnalyticsConsent('granted');
      loadTag();
      vi.setSystemTime(
        JSON.parse(localStorage.getItem(analytics.CONSENT_KEY)!).expiresAt,
      );
      (type === 'visibilitychange' ? document : window).dispatchEvent(
        new Event(type),
      );
      expect(analytics.getAnalyticsConsent()).toBeNull();
      expect(window['ga-disable-G-00WDFD2SY7']).toBe(true);
    },
  );

  it('restores a dated session choice when localStorage is unavailable', async () => {
    const getItem = Storage.prototype.getItem;
    const setItem = Storage.prototype.setItem;
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(function (
      this: Storage,
      key,
    ) {
      if (this === localStorage) throw new Error('Unavailable');
      return getItem.call(this, key);
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(function (
      this: Storage,
      key,
      value,
    ) {
      if (this === localStorage) throw new Error('Unavailable');
      setItem.call(this, key, value);
    });
    analytics.initializeAnalytics();
    expect(analytics.setAnalyticsConsent('granted')).toBe(false);
    analytics.setAnalyticsConsent('denied');
    vi.resetModules();
    const reloaded = await import('./analytics');
    reloaded.initializeAnalytics();
    expect(reloaded.getAnalyticsConsent()).toBe('denied');
    expect(document.querySelector('script')).toBeNull();
  });

  it('ignores an older cross-tab grant after a newer withdrawal', () => {
    analytics.initializeAnalytics();
    analytics.setAnalyticsConsent('granted');
    loadTag();
    const olderGrant = localStorage.getItem(analytics.CONSENT_KEY)!;
    vi.advanceTimersByTime(1000);
    analytics.setAnalyticsConsent('denied');
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: analytics.CONSENT_KEY,
        newValue: olderGrant,
      }),
    );
    expect(analytics.getAnalyticsConsent()).toBe('denied');
    expect(window['ga-disable-G-00WDFD2SY7']).toBe(true);
  });

  it('expires an explicit in-memory choice when both storages are unavailable', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Unavailable');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Unavailable');
    });
    analytics.initializeAnalytics();
    view('/');
    expect(analytics.setAnalyticsConsent('granted')).toBe(false);
    loadTag();
    expect(events('page_view')).toHaveLength(1);
    vi.advanceTimersByTime(Date.parse('2026-07-15T12:00:00.000Z') - Date.now());
    expect(analytics.getAnalyticsConsent()).toBeNull();
    analytics.trackCommercialEvent('generate_lead');
    expect(events('generate_lead')).toHaveLength(0);
  });

  it('clears the session fallback when another tab clears persistent consent', () => {
    analytics.initializeAnalytics();
    analytics.setAnalyticsConsent('granted');
    loadTag();
    localStorage.clear();
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: null,
        newValue: null,
        storageArea: localStorage,
      }),
    );
    expect(analytics.getAnalyticsConsent()).toBeNull();
    expect(sessionStorage.getItem(analytics.CONSENT_KEY)).toBeNull();
    expect(window['ga-disable-G-00WDFD2SY7']).toBe(true);
  });

  it('captures only the current valid campaign when acceptance arrives from another tab', () => {
    analytics.initializeAnalytics();
    analytics.setAnalyticsConsent('denied');
    view(
      '/hotels-madinah?utm_source=facebook&utm_campaign=omra&email=private@example.com',
    );
    const grant = savedChoice('granted');
    localStorage.setItem(analytics.CONSENT_KEY, grant);
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: analytics.CONSENT_KEY,
        newValue: grant,
        storageArea: localStorage,
      }),
    );
    loadTag();
    expect(events('page_view')[0][2]).toMatchObject({
      page_location:
        window.location.origin +
        '/hotels-madinah?utm_source=facebook&utm_campaign=omra',
    });
    expect(JSON.stringify(commands())).not.toContain('private@example.com');
  });
});
