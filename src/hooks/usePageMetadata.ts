import { useEffect } from 'react';

const SITE_ORIGIN = 'https://haramainprestige.com';

type PageMetadata = {
  title: string;
  description: string;
  /**
   * Chemin canonique (ex. "/", "/mentions-legales"). Le hook préfixe
   * automatiquement SITE_ORIGIN pour construire l'URL absolue.
   */
  path: string;
  /**
   * Passer `true` pour les pages qui ne doivent pas être indexées
   * (ex. 404). La balise canonical est alors omise pour éviter de
   * canonicaliser une URL inexistante.
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

/**
 * Met à jour title, description, canonical, Open Graph et Twitter Card
 * pour la page courante. Chaque page appelle ce hook avec ses propres
 * valeurs afin d'éviter que les pages secondaires héritent des méta
 * de la homepage.
 */
export function usePageMetadata({
  title,
  description,
  path,
  noindex = false,
}: PageMetadata): void {
  useEffect(() => {
    const url = SITE_ORIGIN + path;

    document.title = title;
    setMetaName('description', description);
    setMetaName('robots', noindex ? 'noindex, follow' : 'index, follow');
    setCanonical(noindex ? null : url);

    setMetaProperty('og:title', title);
    setMetaProperty('og:description', description);
    setMetaProperty('og:url', url);

    setMetaName('twitter:title', title);
    setMetaName('twitter:description', description);
  }, [title, description, path, noindex]);
}
