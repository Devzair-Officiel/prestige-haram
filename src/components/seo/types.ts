export type FaqItem = { question: string; answer: string };

export type HeroConfig = {
  backHomeLabel: string;
  backHomeHref: string;
  eyebrow: string;
  title: string;
  intro: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  image: { src: string; alt: string; srcSet?: string; sizes?: string };
};

export type FinalCtaConfig = {
  eyebrow: string;
  title: string;
  paragraph: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
};

export type FaqConfig = {
  title: string;
  items: FaqItem[];
};

export type BreadcrumbItem = { name: string; url: string };
