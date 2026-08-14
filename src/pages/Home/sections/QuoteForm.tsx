import { useEffect, useState } from 'react';
import { useReveal } from '../../../hooks/useReveal';

type Toast = { type: 'success' | 'error'; message: string } | null;

type ServiceKey = 'hotel' | 'transfer' | 'driver' | 'visit';

type ServiceOption = {
  key: ServiceKey;
  label: string;
  icon: React.ReactNode;
};

const services: ServiceOption[] = [
  {
    key: 'hotel',
    label: 'Hôtel',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 8v10M3 13h18v5M21 13v-2a3 3 0 0 0-3-3h-6v5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: 'transfer',
    label: 'Transfert aéroport',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M10.5 4a1.5 1.5 0 0 1 3 0v5.2l7 4.1v2.1l-7-2.2v3.8l2.2 1.6v1.6L12 24l-3.7-1.2v-1.6L10.5 20v-3.8l-7 2.2v-2.1l7-4.1V4z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: 'driver',
    label: 'Chauffeur / déplacements',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 11l1.4-4.2A2 2 0 0 1 8.3 5.4h7.4a2 2 0 0 1 1.9 1.4L19 11m-14 0h14m-14 0v6h2m12-6v6h-2m-8 0h8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="7.5" cy="14" r="1" fill="currentColor" />
        <circle cx="16.5" cy="14" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: 'visit',
    label: 'Visites & accompagnement',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M15.5 8.5l-2.2 5.2-5.2 2.2 2.2-5.2 5.2-2.2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const countryCodes = [
  '🇫🇷 +33',
  '🇧🇪 +32',
  '🇨🇭 +41',
  '🇩🇿 +213',
  '🇲🇦 +212',
  '🇹🇳 +216',
  '🇬🇧 +44',
  '🇸🇦 +966',
];

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '13px 14px',
  borderRadius: 10,
  border: '1px solid rgba(245,239,230,0.12)',
  background: '#14110E',
  color: '#F5EFE6',
  fontFamily: 'inherit',
  fontSize: 14,
};

const dateStyle: React.CSSProperties = {
  ...inputStyle,
  padding: 12,
  fontSize: 13,
  colorScheme: 'dark',
};

const labelStyle: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: '1.2px',
  fontWeight: 700,
  color: 'rgba(245,239,230,0.62)',
};

const stepBadgeStyle: React.CSSProperties = {
  width: 24,
  height: 24,
  borderRadius: '50%',
  border: '1px solid rgba(201,162,75,0.5)',
  color: '#E6C878',
  fontSize: 12,
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const stepTitleStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  color: '#F5EFE6',
  letterSpacing: '0.3px',
};

const counterButtonStyle: React.CSSProperties = {
  width: 30,
  height: 30,
  borderRadius: 8,
  border: '1px solid rgba(245,239,230,0.14)',
  background: 'rgba(245,239,230,0.04)',
  color: '#E6C878',
  fontSize: 18,
  lineHeight: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

function Select({
  children,
  onChange,
  value,
  ariaLabel,
  compact,
  name,
  required,
  defaultValue,
}: {
  children: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  ariaLabel?: string;
  compact?: boolean;
  name?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div style={{ position: 'relative' }}>
      <select
        name={name}
        required={required}
        defaultValue={defaultValue}
        aria-label={ariaLabel}
        value={value}
        onChange={onChange}
        style={{
          appearance: 'none',
          WebkitAppearance: 'none',
          width: '100%',
          padding: compact ? '13px 30px 13px 12px' : '13px 40px 13px 14px',
          borderRadius: 10,
          border: '1px solid rgba(245,239,230,0.12)',
          background: '#14110E',
          color: '#F5EFE6',
          fontFamily: 'inherit',
          fontSize: 14,
          colorScheme: 'dark',
        }}
      >
        {children}
      </select>
      <svg
        width={compact ? 12 : 14}
        height={compact ? 12 : 14}
        viewBox="0 0 16 16"
        style={{
          position: 'absolute',
          right: compact ? 10 : 14,
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          color: '#E6C878',
        }}
      >
        <path
          d="M4 6l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function Label({
  children,
  required,
  optional,
}: {
  children: React.ReactNode;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <span style={labelStyle}>
      {children}
      {required && (
        <span
          aria-hidden="true"
          style={{ color: '#E6C878', marginLeft: 4, fontWeight: 700 }}
        >
          *
        </span>
      )}
      {optional && (
        <span
          style={{
            marginLeft: 6,
            fontSize: 9.5,
            letterSpacing: '0.6px',
            fontWeight: 500,
            color: 'rgba(245,239,230,0.55)',
            textTransform: 'none',
          }}
        >
          (optionnel)
        </span>
      )}
    </span>
  );
}

function Counter({
  value,
  onDec,
  onInc,
  labels,
}: {
  value: number;
  onDec: () => void;
  onInc: () => void;
  labels: { dec: string; inc: string };
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#14110E',
        border: '1px solid rgba(245,239,230,0.12)',
        borderRadius: 10,
        padding: 6,
      }}
    >
      <button
        type="button"
        aria-label={labels.dec}
        onClick={onDec}
        style={counterButtonStyle}
      >
        −
      </button>
      <span style={{ fontWeight: 700, fontSize: 15, color: '#F5EFE6' }}>
        {value}
      </span>
      <button
        type="button"
        aria-label={labels.inc}
        onClick={onInc}
        style={counterButtonStyle}
      >
        +
      </button>
    </div>
  );
}

function QuoteForm() {
  const revealRef = useReveal<HTMLDivElement>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [city, setCity] = useState('');
  const [svc, setSvc] = useState<Record<ServiceKey, boolean>>({
    hotel: true,
    transfer: false,
    driver: false,
    visit: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<Toast>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 6000);
    return () => clearTimeout(t);
  }, [toast]);

  const clamp = (v: number, lo: number, hi: number) =>
    Math.max(lo, Math.min(hi, v));

  const showKaaba = (city === 'makkah' || city === 'both') && svc.hotel;

  const hasService = Object.values(svc).some(Boolean);

  return (
    <section
      id="devis"
      className="container-pad"
      style={{
        maxWidth: 1240,
        margin: '-48px auto 0',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div
        ref={revealRef}
        className="reveal form-card-pad"
        style={{
          borderRadius: 20,
          background: 'rgba(20,17,14,0.72)',
          backdropFilter: 'blur(18px) saturate(140%)',
          WebkitBackdropFilter: 'blur(18px) saturate(140%)',
          border: '1px solid rgba(201,162,75,0.22)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
        }}
      >
        <div style={{ maxWidth: 560, marginBottom: 26 }}>
          <span
            style={{
              fontSize: 11,
              letterSpacing: '2.6px',
              fontWeight: 700,
              color: '#E6C878',
            }}
          >
            DEVIS PERSONNALISÉ
          </span>
          <h2
            style={{
              margin: '9px 0 6px',
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 600,
              fontSize: 'clamp(24px, 3.6vw, 34px)',
              color: '#F5EFE6',
            }}
          >
            Recevez votre proposition personnalisée
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              color: 'rgba(245,239,230,0.6)',
            }}
          >
            Décrivez votre projet — nous revenons vers vous avec une proposition
            adaptée à vos dates, votre budget et vos besoins.
          </p>
          <p
            style={{
              margin: '10px 0 0',
              fontSize: 12,
              color: 'rgba(245,239,230,0.62)',
            }}
          >
            <span
              aria-hidden="true"
              style={{ color: '#E6C878', fontWeight: 700, marginRight: 4 }}
            >
              *
            </span>
            Champs obligatoires
          </p>
        </div>

        <form
          noValidate={!hasService}
          onSubmit={async (e) => {
            e.preventDefault();
            if (!hasService) {
              const el = document.getElementById('svc-empty-hint');
              el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              return;
            }
            const form = e.currentTarget;
            if (!form.checkValidity()) {
              form.reportValidity();
              return;
            }
            const raw = new FormData(form);
            if ((raw.get('website') as string)?.trim()) {
              return;
            }
            const get = (k: string) => ((raw.get(k) as string) || '').trim();

            const selectedKeys = (
              Object.entries(svc) as [ServiceKey, boolean][]
            )
              .filter(([, v]) => v)
              .map(([k]) => k);

            const payload = {
              name: get('Nom'),
              email: get('Email'),
              countryCode: get('Indicatif')
                .replace(/^[^\d+]+/, '')
                .trim(),
              phone: get('Téléphone WhatsApp'),
              city,
              arrival: get("Date d'arrivée"),
              departure: get('Date de départ'),
              adults,
              children,
              services: selectedKeys,
              rooms: get('Nombre de chambres'),
              category: get("Catégorie d'hôtel"),
              kaabaView: get('Vue Kaaba'),
              budget: get('Budget'),
              message: get('Message'),
            };

            setSubmitting(true);
            try {
              const res = await fetch('/api/send-quote.php', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
                body: JSON.stringify(payload),
              });
              const data = (await res.json().catch(() => ({}))) as {
                success?: boolean;
                error?: string;
              };
              if (res.ok && data.success) {
                setToast({
                  type: 'success',
                  message:
                    'Votre demande a bien été envoyée. Nous revenons vers vous rapidement.',
                });
                form.reset();
                setCity('');
                setAdults(2);
                setChildren(0);
                setSvc({
                  hotel: true,
                  transfer: false,
                  driver: false,
                  visit: false,
                });
              } else {
                setToast({
                  type: 'error',
                  message:
                    data.error ||
                    "L'envoi a échoué. Réessayez ou contactez-nous sur WhatsApp.",
                });
              }
            } catch {
              setToast({
                type: 'error',
                message:
                  'Erreur réseau. Vérifiez votre connexion et réessayez.',
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            style={{
              position: 'absolute',
              left: '-9999px',
              width: 1,
              height: 1,
              opacity: 0,
            }}
            aria-hidden="true"
          />

          <fieldset style={{ border: 'none', margin: '0 0 28px', padding: 0 }}>
            <legend
              style={{
                padding: 0,
                margin: '0 0 6px',
                fontSize: 15,
                fontWeight: 700,
                color: '#F5EFE6',
              }}
            >
              De quels services avez-vous besoin&nbsp;?
            </legend>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                flexWrap: 'wrap',
                margin: '0 0 14px',
                fontSize: 13,
                color: 'rgba(245,239,230,0.6)',
              }}
            >
              <span>
                Cliquez pour sélectionner — plusieurs choix possibles.
              </span>
              {(() => {
                const count = Object.values(svc).filter(Boolean).length;
                return count > 0 ? (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '3px 10px',
                      borderRadius: 999,
                      background: 'rgba(201,162,75,0.15)',
                      color: '#E6C878',
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: '0.3px',
                    }}
                  >
                    {count} sélectionné{count > 1 ? 's' : ''}
                  </span>
                ) : null;
              })()}
            </div>
            {Object.values(svc).every((v) => !v) && (
              <div
                id="svc-empty-hint"
                role="status"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  margin: '0 0 12px',
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: '1px solid rgba(201,162,75,0.28)',
                  background: 'rgba(201,162,75,0.06)',
                  color: '#E6C878',
                  fontSize: 12.5,
                  fontWeight: 600,
                  letterSpacing: '0.2px',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M12 8v5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="16.2" r="1" fill="currentColor" />
                </svg>
                Sélectionnez au moins un service pour continuer.
              </div>
            )}
            <div className="svc-grid">
              {services.map((service) => (
                <button
                  key={service.key}
                  type="button"
                  className="svc-card"
                  aria-pressed={svc[service.key]}
                  onClick={() =>
                    setSvc((s) => ({ ...s, [service.key]: !s[service.key] }))
                  }
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '15px 16px',
                    borderRadius: 12,
                    border: '1px solid rgba(245,239,230,0.12)',
                    background: '#14110E',
                    color: 'rgba(245,239,230,0.8)',
                    fontFamily: 'inherit',
                    fontSize: 14,
                    fontWeight: 600,
                    textAlign: 'left',
                  }}
                >
                  <span className="svc-check" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span
                    style={{ color: '#E6C878', flex: 'none', display: 'flex' }}
                  >
                    {service.icon}
                  </span>
                  <span style={{ flex: 1 }}>{service.label}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="form-steps">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={stepBadgeStyle}>1</span>
                <span style={stepTitleStyle}>Votre séjour</span>
              </div>
              <label
                style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
              >
                <Label required>VILLE</Label>
                <Select
                  name="Ville"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">Choisir une ville</option>
                  <option value="makkah">Makkah</option>
                  <option value="madinah">Madinah</option>
                  <option value="both">Makkah &amp; Madinah</option>
                </Select>
              </label>
              <div style={{ display: 'flex', gap: 12 }}>
                <label
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                  }}
                >
                  <Label required>DATE D'ARRIVÉE</Label>
                  <input
                    type="date"
                    name="Date d'arrivée"
                    required
                    style={dateStyle}
                  />
                </label>
                <label
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                  }}
                >
                  <Label required>DATE DE DÉPART</Label>
                  <input
                    type="date"
                    name="Date de départ"
                    required
                    style={dateStyle}
                  />
                </label>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                  }}
                >
                  <Label required>ADULTES</Label>
                  <Counter
                    value={adults}
                    onDec={() => setAdults((v) => clamp(v - 1, 1, 12))}
                    onInc={() => setAdults((v) => clamp(v + 1, 1, 12))}
                    labels={{
                      dec: 'Retirer un adulte',
                      inc: 'Ajouter un adulte',
                    }}
                  />
                </div>
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                  }}
                >
                  <Label optional>ENFANTS</Label>
                  <Counter
                    value={children}
                    onDec={() => setChildren((v) => clamp(v - 1, 0, 10))}
                    onInc={() => setChildren((v) => clamp(v + 1, 0, 10))}
                    labels={{
                      dec: 'Retirer un enfant',
                      inc: 'Ajouter un enfant',
                    }}
                  />
                </div>
              </div>
            </div>

            {svc.hotel ? (
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={stepBadgeStyle}>2</span>
                  <span style={stepTitleStyle}>Vos préférences hôtel</span>
                </div>
                <label
                  style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
                >
                  <Label required>NOMBRE DE CHAMBRES</Label>
                  <Select name="Nombre de chambres" required defaultValue="">
                    <option value="" disabled>
                      Choisir…
                    </option>
                    <option>1 chambre</option>
                    <option>2 chambres</option>
                    <option>3 chambres et +</option>
                  </Select>
                </label>
                <label
                  style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
                >
                  <Label optional>CATÉGORIE D'HÔTEL</Label>
                  <Select name="Catégorie d'hôtel" defaultValue="Indifférent">
                    <option>Indifférent</option>
                    <option>3 étoiles</option>
                    <option>4 étoiles</option>
                    <option>5 étoiles</option>
                  </Select>
                </label>
                <label
                  style={{
                    display: showKaaba ? 'flex' : 'none',
                    flexDirection: 'column',
                    gap: 6,
                  }}
                >
                  <Label optional>CHAMBRE AVEC VUE KAABA</Label>
                  <Select name="Vue Kaaba" defaultValue="Indifférent">
                    <option>Indifférent</option>
                    <option>Oui, si possible</option>
                    <option>Indispensable</option>
                  </Select>
                </label>
                <label
                  style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
                >
                  <Label optional>BUDGET PAR CHAMBRE / NUIT</Label>
                  <Select name="Budget" defaultValue="Indifférent">
                    <option>Indifférent</option>
                    <option>Économique</option>
                    <option>Confort</option>
                    <option>Premium</option>
                  </Select>
                </label>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  padding: '18px 18px',
                  borderRadius: 12,
                  border: '1px dashed rgba(201,162,75,0.25)',
                  background: 'rgba(201,162,75,0.04)',
                  alignSelf: 'flex-start',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={stepBadgeStyle}>2</span>
                  <span style={stepTitleStyle}>Vos préférences hôtel</span>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: 'rgba(245,239,230,0.7)',
                  }}
                >
                  Cette étape n'est demandée que si vous ajoutez
                  «&nbsp;Hôtel&nbsp;» à votre demande. Vous pouvez la laisser de
                  côté et passer aux coordonnées.
                </p>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={stepBadgeStyle}>3</span>
                <span style={stepTitleStyle}>Vos coordonnées</span>
              </div>
              <label
                style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
              >
                <Label required>NOM</Label>
                <input
                  type="text"
                  name="Nom"
                  required
                  autoComplete="name"
                  placeholder="Votre nom complet"
                  style={inputStyle}
                />
              </label>
              <label
                style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
              >
                <Label required>WHATSAPP</Label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'stretch',
                    gap: 8,
                  }}
                >
                  <div style={{ flex: 'none' }}>
                    <Select
                      name="Indicatif"
                      defaultValue="🇫🇷 +33"
                      ariaLabel="Indicatif pays"
                      compact
                    >
                      {countryCodes.map((code) => (
                        <option key={code}>{code}</option>
                      ))}
                    </Select>
                  </div>
                  <input
                    type="tel"
                    name="Téléphone WhatsApp"
                    required
                    autoComplete="tel"
                    placeholder="6 12 34 56 78"
                    style={{ ...inputStyle, flex: 1, minWidth: 0 }}
                  />
                </div>
              </label>
              <label
                style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
              >
                <Label optional>EMAIL</Label>
                <input
                  type="email"
                  name="Email"
                  autoComplete="email"
                  placeholder="exemple@email.com"
                  style={inputStyle}
                />
              </label>
              <label
                style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
              >
                <Label optional>DEMANDE PARTICULIÈRE</Label>
                <textarea
                  name="Message"
                  placeholder="Précisez votre demande..."
                  style={{
                    ...inputStyle,
                    minHeight: 52,
                    resize: 'none',
                    padding: '12px 14px',
                  }}
                />
              </label>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              marginTop: 30,
            }}
          >
            <button
              type="submit"
              className="btn-primary"
              disabled={!hasService || submitting}
              aria-disabled={!hasService || submitting}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 9,
                padding: '16px 40px',
                borderRadius: 12,
                border: 'none',
                background:
                  hasService && !submitting
                    ? 'linear-gradient(135deg,#EBCE82,#C09A44)'
                    : 'rgba(245,239,230,0.08)',
                color:
                  hasService && !submitting
                    ? '#14110E'
                    : 'rgba(245,239,230,0.35)',
                fontFamily: 'inherit',
                fontWeight: 700,
                fontSize: 15,
                cursor: !hasService || submitting ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
            >
              {submitting ? (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    style={{ animation: 'spin 0.9s linear infinite' }}
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      fill="none"
                      strokeDasharray="42"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>Envoi en cours…</span>
                </>
              ) : (
                <span>Recevoir ma proposition gratuitement</span>
              )}
            </button>
            <span style={{ fontSize: 12, color: 'rgba(245,239,230,0.62)' }}>
              Vos informations sont utilisées uniquement pour traiter votre
              demande.
            </span>
          </div>
        </form>
      </div>
      {toast && (
        <div
          className="toast"
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            top: 24,
            right: 24,
            zIndex: 200,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
            maxWidth: 360,
            padding: '14px 16px 14px 14px',
            borderRadius: 14,
            background: 'rgba(20,17,14,0.92)',
            backdropFilter: 'blur(14px) saturate(140%)',
            WebkitBackdropFilter: 'blur(14px) saturate(140%)',
            border: `1px solid ${
              toast.type === 'success'
                ? 'rgba(201,162,75,0.4)'
                : 'rgba(220,90,70,0.45)'
            }`,
            boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
            color: '#F5EFE6',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              flex: 'none',
              width: 30,
              height: 30,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background:
                toast.type === 'success'
                  ? 'rgba(201,162,75,0.18)'
                  : 'rgba(220,90,70,0.18)',
              color: toast.type === 'success' ? '#E6C878' : '#FF8878',
            }}
          >
            {toast.type === 'success' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 8v5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="16.2" r="1.1" fill="currentColor" />
              </svg>
            )}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 3,
                color: toast.type === 'success' ? '#E6C878' : '#FF8878',
                letterSpacing: '0.2px',
              }}
            >
              {toast.type === 'success'
                ? 'Demande envoyée'
                : 'Envoi impossible'}
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                lineHeight: 1.5,
                color: 'rgba(245,239,230,0.78)',
              }}
            >
              {toast.message}
            </p>
          </div>
          <button
            type="button"
            aria-label="Fermer la notification"
            onClick={() => setToast(null)}
            style={{
              flex: 'none',
              width: 26,
              height: 26,
              borderRadius: 8,
              border: 'none',
              background: 'transparent',
              color: 'rgba(245,239,230,0.5)',
              fontSize: 18,
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}

export default QuoteForm;
