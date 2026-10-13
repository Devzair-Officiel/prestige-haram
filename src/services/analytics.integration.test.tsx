// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Root } from 'react-dom/client';

let react: typeof import('react');
let root: Root;
let analytics: typeof import('./analytics');
let I18nProvider: typeof import('../i18n').I18nProvider;
let windowListeners: ReturnType<typeof vi.spyOn>;
let documentListeners: ReturnType<typeof vi.spyOn>;

function events(name: string): unknown[][] {
  return (window.dataLayer || [])
    .map((entry) => Array.from(entry as ArrayLike<unknown>))
    .filter((entry) => entry[0] === 'event' && entry[1] === name);
}

beforeEach(async () => {
  vi.resetModules();
  vi.useFakeTimers({ toFake: ['Date', 'setTimeout', 'clearTimeout'] });
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: true })),
  );
  vi.stubGlobal('scrollTo', vi.fn());
  Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
    configurable: true,
    value: vi.fn(),
  });
  localStorage.clear();
  sessionStorage.clear();
  history.replaceState({}, '', '/');
  document.head.innerHTML = '';
  vi.spyOn(document, 'referrer', 'get').mockReturnValue('');
  document.body.innerHTML = '<div id="root"></div>';
  window.dataLayer = [];
  window.gtag = undefined;
  windowListeners = vi.spyOn(window, 'addEventListener');
  documentListeners = vi.spyOn(document, 'addEventListener');
  react = await import('react');
  const { createRoot } = await import('react-dom/client');
  ({ I18nProvider } = await import('../i18n'));
  analytics = await import('./analytics');
  root = createRoot(document.getElementById('root')!);
});

afterEach(async () => {
  await react.act(async () => root.unmount());
  // Stop any pending load timer and restore module-installed listeners between tests.
  analytics.setAnalyticsConsent('denied');
  for (const [type, listener, options] of windowListeners.mock.calls)
    window.removeEventListener(type, listener, options);
  for (const [type, listener, options] of documentListeners.mock.calls)
    document.removeEventListener(type, listener, options);
  vi.restoreAllMocks();
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('React SPA integration', () => {
  it('keeps a landing UTM campaign through delayed consent and preserves SEO in FR/AR', async () => {
    const { default: App } = await import('../app/App');
    const { default: CookieConsent } =
      await import('../components/ui/CookieConsent');
    const { navigateTo } = await import('../i18n/utils');
    history.replaceState(
      {},
      '',
      '/?utm_source=instagram&utm_medium=social&utm_campaign=hotels_madinah&email=private@example.com',
    );
    vi.spyOn(document, 'referrer', 'get').mockReturnValue(
      'https://www.instagram.com/private?email=private@example.com',
    );
    analytics.initializeAnalytics();
    await react.act(async () =>
      root.render(
        <react.StrictMode>
          <I18nProvider>
            <App />
            <CookieConsent />
          </I18nProvider>
        </react.StrictMode>,
      ),
    );
    await react.act(async () => navigateTo('/hotels-madinah'));
    await react.act(async () => navigateTo('/ar-sa/hotels-madinah'));
    expect(events('page_view')).toHaveLength(0);
    expect(document.querySelector('#haramain-ga4')).toBeNull();
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
    await react.act(async () =>
      document
        .querySelector<HTMLButtonElement>('.cookie-consent button')!
        .click(),
    );
    document.querySelector('#haramain-ga4')!.dispatchEvent(new Event('load'));
    expect(events('page_view')).toHaveLength(1);
    expect(events('page_view')[0][2]).toMatchObject({
      page_location: window.location.origin + '/ar-sa/hotels-madinah',
      page_referrer: 'https://www.instagram.com/',
      campaign_source: 'instagram',
      campaign_medium: 'social',
      campaign_name: 'hotels_madinah',
      page_title: document.title,
      language: 'ar-SA',
    });
    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    ).toBe('https://haramainprestige.com/ar-sa/hotels-madinah');
    expect(document.querySelectorAll('link[hreflang]')).toHaveLength(3);
    expect(JSON.stringify(window.dataLayer)).not.toContain(
      'private@example.com',
    );
    await react.act(async () => navigateTo('/ar-sa/hotels-madinah#devis'));
    expect(events('page_view')).toHaveLength(1);
    await react.act(async () => navigateTo('/hotels-madinah'));
    expect(events('page_view')).toHaveLength(2);
    expect(events('page_view')[1][2]).toMatchObject({
      page_location: window.location.origin + '/hotels-madinah',
      page_referrer: window.location.origin + '/ar-sa/hotels-madinah',
    });
    expect(JSON.stringify(events('page_view')[1])).not.toMatch(
      /utm_|campaign_/,
    );
    expect(document.querySelectorAll('#haramain-ga4')).toHaveLength(1);
  });

  it.each(['fr', 'ar-SA'] as const)(
    'reopens the %s banner on expiry and renews with no second script',
    async (locale) => {
      const { default: CookieConsent } =
        await import('../components/ui/CookieConsent');
      const { default: Footer } = await import('../components/layout/Footer');
      history.replaceState({}, '', locale === 'fr' ? '/' : '/ar-sa/');
      vi.setSystemTime(new Date('2026-01-31T10:00:00.000Z'));
      analytics.initializeAnalytics();
      analytics.trackCurrentPage();
      analytics.setAnalyticsConsent('granted');
      document.querySelector('#haramain-ga4')!.dispatchEvent(new Event('load'));
      await react.act(async () =>
        root.render(
          <I18nProvider>
            <Footer />
            <CookieConsent />
          </I18nProvider>,
        ),
      );
      expect(document.querySelector('.cookie-consent')).toBeNull();
      const { expiresAt } = JSON.parse(
        localStorage.getItem(analytics.CONSENT_KEY)!,
      );
      await react.act(async () =>
        vi.advanceTimersByTime(expiresAt - Date.now()),
      );
      const panel = document.querySelector<HTMLElement>('.cookie-consent')!;
      expect(panel).not.toBeNull();
      expect(panel.dir).toBe(locale === 'fr' ? 'ltr' : 'rtl');
      expect(panel.textContent).toContain(
        locale === 'fr' ? 'Accepter' : 'قبول',
      );
      expect(analytics.getAnalyticsConsent()).toBeNull();
      analytics.trackCommercialEvent('generate_lead');
      expect(events('generate_lead')).toHaveLength(0);
      await react.act(async () => panel.querySelector('button')!.click());
      expect(document.querySelector('.cookie-consent')).toBeNull();
      expect(analytics.getAnalyticsConsent()).toBe('granted');
      expect(document.querySelectorAll('#haramain-ga4')).toHaveLength(1);
      expect(events('page_view')).toHaveLength(2);
      expect(
        JSON.parse(localStorage.getItem(analytics.CONSENT_KEY)!),
      ).toMatchObject({ decidedAt: expiresAt });
    },
  );

  it('tracks the committed titles once in StrictMode, including custom navigation, FR/AR and popstate', async () => {
    const { default: App } = await import('../app/App');
    const { navigateTo } = await import('../i18n/utils');
    analytics.initializeAnalytics();
    analytics.setAnalyticsConsent('granted');
    document.querySelector('#haramain-ga4')!.dispatchEvent(new Event('load'));
    await react.act(async () => {
      root.render(
        <react.StrictMode>
          <I18nProvider>
            <App />
          </I18nProvider>
        </react.StrictMode>,
      );
    });
    expect(events('page_view')).toHaveLength(1);
    expect(events('page_view')[0][2]).toMatchObject({
      page_title: document.title,
      language: 'fr',
    });
    await react.act(async () => navigateTo('/#devis'));
    expect(events('page_view')).toHaveLength(1);
    await react.act(async () => navigateTo('/ar-sa/'));
    expect(events('page_view')).toHaveLength(2);
    expect(document.documentElement.dir).toBe('rtl');
    expect(events('page_view')[1][2]).toMatchObject({
      page_title: document.title,
      language: 'ar-SA',
    });
    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    ).toBe('https://haramainprestige.com/ar-sa/');
    expect(document.querySelectorAll('link[hreflang]')).toHaveLength(3);
    await react.act(async () => navigateTo('/ar-sa/hotels-makkah'));
    expect(events('page_view')).toHaveLength(3);
    await react.act(async () => {
      history.replaceState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    expect(events('page_view')).toHaveLength(4);
    expect(document.documentElement.dir).toBe('ltr');
    expect(events('page_view')[3][2]).toMatchObject({
      page_referrer: window.location.origin + '/ar-sa/hotels-makkah',
      page_title: document.title,
    });
  });

  it('provides translated controls, keyboard management and withdrawal through the footer', async () => {
    const { default: CookieConsent } =
      await import('../components/ui/CookieConsent');
    const { default: Footer } = await import('../components/layout/Footer');
    analytics.initializeAnalytics();
    await react.act(async () =>
      root.render(
        <react.StrictMode>
          <I18nProvider>
            <Footer />
            <CookieConsent />
          </I18nProvider>
        </react.StrictMode>,
      ),
    );
    const region = () => document.querySelector<HTMLElement>('.cookie-consent');
    expect(region()?.getAttribute('aria-labelledby')).toBe(
      'cookie-consent-title',
    );
    expect(region()?.textContent).toContain('Accepter');
    await react.act(async () =>
      region()!.querySelectorAll('button')[1].click(),
    );
    expect(region()).toBeNull();
    expect(document.querySelector('#haramain-ga4')).toBeNull();
    const manage = document.querySelector<HTMLButtonElement>('.cookie-manage')!;
    manage.focus();
    await react.act(async () => manage.click());
    expect(document.activeElement?.id).toBe('cookie-consent-title');
    expect(region()?.textContent).toContain('désactivée');
    await react.act(async () =>
      region()!.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      ),
    );
    expect(region()).toBeNull();
    expect(document.activeElement).toBe(manage);
    await react.act(async () => manage.click());
    await react.act(async () => region()!.querySelector('button')!.click());
    expect(analytics.getAnalyticsConsent()).toBe('granted');
    expect(document.querySelectorAll('script')).toHaveLength(1);
    await react.act(async () => manage.click());
    await react.act(async () =>
      region()!.querySelectorAll('button')[1].click(),
    );
    expect(analytics.getAnalyticsConsent()).toBe('denied');
    expect(window['ga-disable-G-00WDFD2SY7']).toBe(true);
    await react.act(async () => {
      history.replaceState({}, '', '/ar-sa/');
      window.dispatchEvent(new Event('haramain:navigate'));
      window.dispatchEvent(new Event('haramain:manage-cookies'));
    });
    expect(region()?.dir).toBe('rtl');
    expect(region()?.textContent).toContain('قبول');
    expect(region()?.textContent).toContain('رفض');
    expect(document.querySelector('.cookie-manage')?.textContent).toBe(
      'إدارة ملفات تعريف الارتباط',
    );
  });
});

describe('quote form conversions', () => {
  it.each([
    { ok: true, success: true, consent: 'granted', expected: 1 },
    { ok: false, success: true, consent: 'granted', expected: 0 },
    { ok: true, success: false, consent: 'granted', expected: 0 },
    { ok: false, success: false, consent: 'granted', expected: 0 },
    { ok: true, success: true, consent: 'denied', expected: 0 },
    { ok: true, success: true, consent: null, expected: 0 },
    { ok: true, success: true, consent: 'withdrawn', expected: 0 },
  ] as const)(
    'emits $expected lead for ok=$ok, success=$success, consent=$consent',
    async (scenario) => {
      const { default: QuoteForm } =
        await import('../pages/Home/sections/QuoteForm');
      analytics.initializeAnalytics();
      if (scenario.consent === 'granted' || scenario.consent === 'withdrawn') {
        analytics.setAnalyticsConsent('granted');
        document
          .querySelector('#haramain-ga4')!
          .dispatchEvent(new Event('load'));
        if (scenario.consent === 'withdrawn')
          analytics.setAnalyticsConsent('denied');
      } else if (scenario.consent === 'denied')
        analytics.setAnalyticsConsent('denied');
      document.title = 'Devis';
      analytics.trackCurrentPage();
      const fetchMock = vi.fn().mockResolvedValue({
        ok: scenario.ok,
        json: async () => ({ success: scenario.success }),
      });
      vi.stubGlobal('fetch', fetchMock);
      await react.act(async () =>
        root.render(
          <I18nProvider>
            <QuoteForm />
          </I18nProvider>,
        ),
      );
      const form = document.querySelector('form')!;
      vi.spyOn(form, 'checkValidity').mockReturnValue(true);
      for (const [name, value] of Object.entries({
        Nom: 'Private Name',
        Email: 'private@example.com',
        'Téléphone WhatsApp': '0612345678',
        Message: 'Private message',
      })) {
        (form.elements.namedItem(name) as HTMLInputElement).value = value;
      }
      await react.act(async () => {
        form.dispatchEvent(
          new Event('submit', { bubbles: true, cancelable: true }),
        );
      });
      expect(fetchMock).toHaveBeenCalledOnce();
      expect(events('generate_lead')).toHaveLength(scenario.expected);
      const serialized = JSON.stringify(window.dataLayer);
      for (const value of [
        'Private Name',
        'private@example.com',
        '0612345678',
        'Private message',
      ])
        expect(serialized).not.toContain(value);
    },
  );

  it.each(['network', 'invalid-json', 'validation', 'honeypot'])(
    'does not count a lead after %s failure',
    async (failure) => {
      const { default: QuoteForm } =
        await import('../pages/Home/sections/QuoteForm');
      analytics.initializeAnalytics();
      analytics.setAnalyticsConsent('granted');
      document.querySelector('#haramain-ga4')!.dispatchEvent(new Event('load'));
      analytics.trackCurrentPage();
      const fetchMock =
        failure === 'network'
          ? vi.fn().mockRejectedValue(new Error('Offline'))
          : vi.fn().mockResolvedValue({
              ok: true,
              json: async () => {
                throw new Error('Invalid JSON');
              },
            });
      vi.stubGlobal('fetch', fetchMock);
      await react.act(async () =>
        root.render(
          <I18nProvider>
            <QuoteForm />
          </I18nProvider>,
        ),
      );
      const form = document.querySelector('form')!;
      vi.spyOn(form, 'checkValidity').mockReturnValue(failure !== 'validation');
      vi.spyOn(form, 'reportValidity').mockReturnValue(false);
      if (failure === 'honeypot')
        (form.elements.namedItem('website') as HTMLInputElement).value = 'spam';
      await react.act(async () => {
        form.dispatchEvent(
          new Event('submit', { bubbles: true, cancelable: true }),
        );
      });
      expect(events('generate_lead')).toHaveLength(0);
      if (failure === 'validation' || failure === 'honeypot')
        expect(fetchMock).not.toHaveBeenCalled();
    },
  );
});
