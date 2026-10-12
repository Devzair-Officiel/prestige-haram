import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useI18n } from '../../i18n';
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  subscribeAnalyticsConsent,
} from '../../services/analytics';

export default function CookieConsent() {
  const { t, dir, pathFor } = useI18n();
  const consent = useSyncExternalStore(
    subscribeAnalyticsConsent,
    getAnalyticsConsent,
  );
  const [editing, setEditing] = useState(false);
  const [storageFailed, setStorageFailed] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const visible = consent === null || editing || storageFailed;

  useEffect(() => {
    const open = () => {
      opener.current = document.activeElement as HTMLElement | null;
      setEditing(true);
    };
    window.addEventListener('haramain:manage-cookies', open);
    return () => window.removeEventListener('haramain:manage-cookies', open);
  }, []);

  useEffect(() => {
    if (editing) heading.current?.focus();
  }, [editing]);

  const close = () => {
    setEditing(false);
    setStorageFailed(false);
    opener.current?.focus();
  };

  const choose = (value: 'granted' | 'denied') => {
    const saved = setAnalyticsConsent(value);
    setStorageFailed(!saved);
    setEditing(false);
    if (saved) opener.current?.focus();
  };

  if (!visible) return null;
  return (
    <section
      className="cookie-consent"
      role="region"
      aria-labelledby="cookie-consent-title"
      dir={dir}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && consent !== null) close();
      }}
    >
      <h2 id="cookie-consent-title" ref={heading} tabIndex={-1}>
        {t.cookies.title}
      </h2>
      <p>{t.cookies.description}</p>
      <a href={pathFor('privacy')}>{t.cookies.privacyLink}</a>
      {editing && consent !== null && (
        <p>{consent === 'granted' ? t.cookies.accepted : t.cookies.refused}</p>
      )}
      {storageFailed && <p role="status">{t.cookies.storageNotice}</p>}
      <div className="cookie-consent-actions">
        <button type="button" onClick={() => choose('granted')}>
          {t.cookies.accept}
        </button>
        <button type="button" onClick={() => choose('denied')}>
          {t.cookies.refuse}
        </button>
        {consent !== null && (
          <button
            type="button"
            className="cookie-consent-close"
            onClick={close}
          >
            {t.cookies.close}
          </button>
        )}
      </div>
    </section>
  );
}
