import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import WhatsAppFloat from '../../components/ui/WhatsAppFloat';
import { useReveal } from '../../hooks/useReveal';
import { usePageMetadata } from '../../hooks/usePageMetadata';

type Block = {
  eyebrow: string;
  title: string;
  rows?: { label: string; value: string }[];
  paragraphs?: string[];
};

const blocks: Block[] = [
  {
    eyebrow: 'HÉBERGEMENT',
    title: 'Hébergeur du site',
    rows: [
      { label: 'Société', value: 'OVH SAS' },
      {
        label: 'Adresse',
        value: '2 rue Kellermann, 59100 Roubaix, France',
      },
      { label: 'Téléphone', value: '1007 (depuis la France)' },
      { label: 'Site web', value: 'www.ovh.com' },
      { label: 'RCS', value: 'Lille Métropole 424 761 419' },
    ],
  },
  {
    eyebrow: 'PROPRIÉTÉ INTELLECTUELLE',
    title: 'Contenus & droits',
    paragraphs: [
      "L'ensemble des éléments présents sur ce site (textes, photographies, logos, illustrations, éléments graphiques, mise en page) est la propriété exclusive de Haramain Prestige ou de ses partenaires, et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.",
      "Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle, de l'un quelconque de ces éléments, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable.",
      'Les photographies des hôtels partenaires sont utilisées à titre illustratif et restent la propriété de leurs ayants droit respectifs.',
    ],
  },
  {
    eyebrow: 'DONNÉES PERSONNELLES',
    title: 'Vos données & vos droits',
    paragraphs: [
      "Les informations que vous communiquez via nos formulaires (nom, prénom, e-mail, téléphone, dates de séjour) sont utilisées uniquement pour traiter votre demande de devis et vous accompagner dans l'organisation de votre séjour à Makkah & Madinah.",
      "Aucune donnée n'est revendue ni transmise à des tiers à des fins commerciales. Vos informations sont conservées le temps nécessaire au traitement de votre demande, puis pendant la durée légale requise.",
      "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de portabilité de vos données. Pour exercer ces droits, écrivez-nous à contact@haramainprestige.com.",
    ],
  },
  {
    eyebrow: 'COOKIES',
    title: 'Utilisation des cookies',
    paragraphs: [
      "Ce site ne dépose aucun cookie de sa propre initiative. Aucun cookie publicitaire, de mesure d'audience ou de suivi tiers n'est utilisé.",
      "Les polices d'écriture sont chargées depuis Google Fonts (fonts.googleapis.com et fonts.gstatic.com), ce qui entraîne la transmission de votre adresse IP et de votre User-Agent aux serveurs de Google (Alphabet Inc., États-Unis). Aucun cookie n'est déposé par ces requêtes.",
      'Vous pouvez à tout moment configurer votre navigateur pour bloquer ou supprimer les cookies déjà installés.',
    ],
  },
  {
    eyebrow: 'RESPONSABILITÉ',
    title: 'Limitation de responsabilité',
    paragraphs: [
      "Haramain Prestige met tout en œuvre pour offrir des informations exactes et à jour. Les tarifs, disponibilités et prestations des hôtels partenaires peuvent toutefois évoluer et ne sont confirmés qu'après validation écrite de votre devis personnalisé.",
      "Haramain Prestige ne pourra être tenue responsable des dommages directs ou indirects résultant de l'utilisation du site ou de l'indisponibilité temporaire de celui-ci.",
    ],
  },
  {
    eyebrow: 'DROIT APPLICABLE',
    title: 'Litiges',
    paragraphs: [
      'Les présentes mentions légales sont régies par le droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.',
    ],
  },
];

function BlockSection({ block }: { block: Block }) {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <div
      ref={revealRef}
      className="reveal"
      style={{
        borderTop: '1px solid rgba(245,239,230,0.08)',
        padding: '38px 0',
      }}
    >
      <span
        style={{
          fontSize: 11.5,
          letterSpacing: '3.6px',
          fontWeight: 700,
          color: '#E6C878',
        }}
      >
        {block.eyebrow}
      </span>
      <h2
        style={{
          margin: '10px 0 22px',
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 32,
          fontWeight: 600,
          lineHeight: 1.15,
          color: '#F5EFE6',
        }}
      >
        {block.title}
      </h2>

      {block.rows && (
        <dl
          style={{
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'minmax(180px, 220px) 1fr',
            rowGap: 14,
            columnGap: 24,
            fontSize: 14.5,
            lineHeight: 1.6,
          }}
        >
          {block.rows.map((row) => (
            <div key={row.label} style={{ display: 'contents' }}>
              <dt
                style={{
                  color: 'rgba(245,239,230,0.55)',
                  fontWeight: 600,
                }}
              >
                {row.label}
              </dt>
              <dd
                style={{
                  margin: 0,
                  color: '#F5EFE6',
                }}
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {block.paragraphs?.map((p, i) => (
        <p
          key={i}
          style={{
            margin: i === 0 ? '0 0 14px' : '0 0 14px',
            fontSize: 15,
            lineHeight: 1.7,
            color: 'rgba(245,239,230,0.72)',
            maxWidth: 780,
          }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}

function MentionsLegales() {
  const heroRef = useReveal<HTMLDivElement>();

  usePageMetadata({
    title: 'Mentions légales — Haramain Prestige',
    description:
      'Mentions légales du site Haramain Prestige : éditeur, hébergeur, propriété intellectuelle et contact.',
    path: '/mentions-legales',
  });

  return (
    <>
      <Header />
      <main>
        <section
          className="container-pad section-pad-y"
          style={{
            maxWidth: 960,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <div ref={heroRef} className="reveal" style={{ marginBottom: 12 }}>
            <a
              href="/"
              className="nav-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                color: 'rgba(245,239,230,0.6)',
                marginBottom: 26,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16">
                <path
                  d="M10 3L5 8l5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Retour à l'accueil
            </a>
            <span
              style={{
                display: 'block',
                fontSize: 12,
                letterSpacing: '3.6px',
                fontWeight: 700,
                color: '#E6C878',
              }}
            >
              INFORMATIONS LÉGALES
            </span>
            <h1
              className="section-title"
              style={{
                margin: '14px 0 18px',
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 600,
                lineHeight: 1.05,
                color: '#F5EFE6',
              }}
            >
              Mentions légales
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 15.5,
                lineHeight: 1.7,
                color: 'rgba(245,239,230,0.7)',
                maxWidth: 720,
              }}
            >
              Conformément à la loi n° 2004-575 du 21 juin 2004 pour la
              confiance dans l'économie numérique, il est précisé aux
              utilisateurs du site Haramain Prestige l'identité des différents
              intervenants dans le cadre de sa réalisation et de son suivi.
            </p>
          </div>

          <div style={{ marginTop: 22 }}>
            {blocks.map((block) => (
              <BlockSection key={block.title} block={block} />
            ))}
          </div>

          <p
            style={{
              marginTop: 40,
              paddingTop: 24,
              borderTop: '1px solid rgba(245,239,230,0.08)',
              fontSize: 12.5,
              color: 'rgba(245,239,230,0.42)',
              textAlign: 'center',
            }}
          >
            Dernière mise à jour : août 2026
          </p>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default MentionsLegales;
