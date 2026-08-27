// Vérifie que les helpers purs restent alignés avec les valeurs
// attendues côté SEO (hreflang, og:locale) et rendu (dir).

import { describe, expect, it } from 'vitest';
import { directionOf, htmlLangOf, ogLocaleOf } from './utils';

describe('directionOf', () => {
  it('renvoie ltr pour fr et rtl pour ar-SA', () => {
    expect(directionOf('fr')).toBe('ltr');
    expect(directionOf('ar-SA')).toBe('rtl');
  });
});

describe('htmlLangOf', () => {
  it('respecte le format BCP 47 attendu par Google', () => {
    expect(htmlLangOf('fr')).toBe('fr-FR');
    expect(htmlLangOf('ar-SA')).toBe('ar-SA');
  });
});

describe('ogLocaleOf', () => {
  it('respecte le format underscore attendu par Open Graph', () => {
    expect(ogLocaleOf('fr')).toBe('fr_FR');
    expect(ogLocaleOf('ar-SA')).toBe('ar_SA');
  });
});
