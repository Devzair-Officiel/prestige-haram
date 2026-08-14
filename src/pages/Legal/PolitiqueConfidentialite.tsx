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
  bullets?: string[];
};

const blocks: Block[] = [
  {
    eyebrow: 'RESPONSABLE',
    title: 'Qui traite vos données ?',
    paragraphs: [
      'Haramain Prestige est responsable du traitement des données personnelles collectées via le site haramainprestige.com. Nous nous engageons à protéger votre vie privée et à traiter vos informations avec transparence, conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.',
      'Pour toute question relative à vos données personnelles, vous pouvez nous écrire à contact@haramainprestige.com.',
    ],
  },
  {
    eyebrow: 'DONNÉES COLLECTÉES',
    title: 'Quelles informations recueillons-nous ?',
    paragraphs: [
      'Nous collectons uniquement les données que vous nous transmettez volontairement via nos formulaires (demande de devis, prise de contact, WhatsApp).',
    ],
    bullets: [
      'Nom et prénom',
      'Adresse e-mail',
      'Numéro de téléphone',
      'Dates de séjour envisagées',
      "Ville de départ, nombre de voyageurs, préférences d'hôtel",
      'Tout message ou précision que vous nous communiquez',
    ],
  },
  {
    eyebrow: 'FINALITÉS',
    title: 'Pourquoi nous utilisons vos données',
    bullets: [
      'Répondre à vos demandes de devis et de renseignements',
      'Organiser et suivre votre séjour à Makkah & Madinah',
      'Vous contacter avant, pendant et après votre séjour',
      'Améliorer la qualité de nos services',
    ],
  },
  {
    eyebrow: 'BASE LÉGALE',
    title: 'Sur quelle base légale ?',
    paragraphs: [
      "Le traitement de vos données repose sur votre consentement (envoi volontaire d'un formulaire) et sur l'exécution de mesures précontractuelles ou contractuelles prises à votre demande (préparation d'un devis, organisation d'un séjour).",
    ],
  },
  {
    eyebrow: 'DURÉE',
    title: 'Combien de temps sont-elles conservées ?',
    rows: [
      {
        label: 'Demandes sans suite',
        value: '3 ans à compter du dernier contact',
      },
      {
        label: 'Clients (après séjour)',
        value: 'Durée légale requise (facturation, comptabilité)',
      },
    ],
  },
  {
    eyebrow: 'DESTINATAIRES',
    title: 'Qui a accès à vos données ?',
    paragraphs: [
      "Vos données sont accessibles uniquement à l'équipe de Haramain Prestige, dans la stricte limite de leurs missions. Aucune donnée n'est revendue ni transmise à des tiers à des fins commerciales.",
      'Certaines données peuvent être transmises à nos partenaires hôteliers ou prestataires de transfert uniquement dans le cadre strict de la réservation de votre séjour (nom, dates, préférences), et avec votre accord.',
    ],
  },
  {
    eyebrow: 'COOKIES',
    title: 'Cookies & traceurs',
    paragraphs: [
      "Le site ne dépose aucun cookie de sa propre initiative. Aucun cookie publicitaire, de mesure d'audience tierce ou de traçage n'est utilisé.",
      "Les polices d'écriture sont chargées depuis Google Fonts (fonts.googleapis.com et fonts.gstatic.com). Ce chargement transmet votre adresse IP et votre User-Agent aux serveurs de Google (Alphabet Inc., États-Unis) ; aucun cookie n'est déposé par ces requêtes.",
      'Vous pouvez à tout moment configurer votre navigateur pour bloquer ou supprimer les cookies déjà installés.',
    ],
  },
  {
    eyebrow: 'VOS DROITS',
    title: 'Vos droits sur vos données',
    paragraphs: [
      'Conformément au RGPD, vous disposez à tout moment des droits suivants sur vos données personnelles :',
    ],
    bullets: [
      "Droit d'accès : obtenir une copie des données que nous détenons sur vous",
      'Droit de rectification : corriger des informations inexactes',
      "Droit d'effacement : demander la suppression de vos données",
      'Droit à la limitation du traitement',
      "Droit d'opposition au traitement",
      'Droit à la portabilité de vos données',
    ],
  },
  {
    eyebrow: 'EXERCER VOS DROITS',
    title: 'Comment nous contacter ?',
    paragraphs: [
      "Pour exercer un ou plusieurs de ces droits, écrivez-nous à contact@haramainprestige.com en précisant votre demande. Nous vous répondrons dans un délai maximum d'un mois.",
      "Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (Commission Nationale de l'Informatique et des Libertés) : www.cnil.fr.",
    ],
  },
  {
    eyebrow: 'SÉCURITÉ',
    title: 'Comment vos données sont-elles protégées ?',
    paragraphs: [
      'Nous mettons en œuvre les mesures techniques et organisationnelles nécessaires pour protéger vos données contre tout accès non autorisé, altération, divulgation ou destruction : hébergement sécurisé en France, communications chiffrées (HTTPS), accès restreint aux personnes habilitées.',
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

      {block.paragraphs?.map((p, i) => (
        <p
          key={i}
          style={{
            margin: '0 0 14px',
            fontSize: 15,
            lineHeight: 1.7,
            color: 'rgba(245,239,230,0.72)',
            maxWidth: 780,
          }}
        >
          {p}
        </p>
      ))}

      {block.bullets && (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '10px 0 0',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            maxWidth: 780,
          }}
        >
          {block.bullets.map((b) => (
            <li
              key={b}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                fontSize: 15,
                lineHeight: 1.55,
                color: 'rgba(245,239,230,0.82)',
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#E6C878',
                  marginTop: 9,
                }}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {block.rows && (
        <dl
          style={{
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'minmax(180px, 260px) 1fr',
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
              <dd style={{ margin: 0, color: '#F5EFE6' }}>{row.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

function PolitiqueConfidentialite() {
  const heroRef = useReveal<HTMLDivElement>();

  usePageMetadata({
    title: 'Politique de confidentialité — Haramain Prestige',
    description:
      'Politique de confidentialité de Haramain Prestige : données collectées, finalités, durée de conservation et droits RGPD.',
    path: '/politique-de-confidentialite',
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
              CONFIANCE & TRANSPARENCE
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
              Politique de confidentialité
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
              Chez Haramain Prestige, la protection de vos données personnelles
              est essentielle. Cette page explique quelles informations nous
              collectons, pourquoi, combien de temps nous les conservons, et
              quels sont vos droits.
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

export default PolitiqueConfidentialite;
