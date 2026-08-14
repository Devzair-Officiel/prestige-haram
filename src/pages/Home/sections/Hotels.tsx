import { useEffect, useRef, useState } from 'react';
import { useReveal } from '../../../hooks/useReveal';
import sheratonImage from '../../../assets/sheraton_jabal_al_kaaba.webp';
import tilalImage from '../../../assets/tilal_jabal_al_kaaba.webp';
import marriottImage from '../../../assets/marriott_jabal_omar.webp';
import hiltonImage from '../../../assets/hilton_suites_jabal_omar.webp';
import vocoImage from '../../../assets/voco.webp';
import kiswahImage from '../../../assets/kiswah_towers.webp';
import asSaafaImage from '../../../assets/as_saafa.webp';
import crowneImage from '../../../assets/crowne_plaza.webp';
import zamzamMadinahImage from '../../../assets/zamzam_pullman_madinah.webp';
import myskImage from '../../../assets/mysk_al_balad.webp';
import valyImage from '../../../assets/valy_hotel.webp';
import fairmontImage from '../../../assets/fairmont_clock_royal.webp';
import swissotelImage from '../../../assets/swissotel_makkah.webp';
import zamzamMakkahImage from '../../../assets/zamzam_pullman_makkah.webp';

type Hotel = {
  name: string;
  description: string;
  image?: string;
};

type Category = {
  key: string;
  eyebrow: string;
  title: string;
  hotels: Hotel[];
};

const categories: Category[] = [
  {
    key: 'makkah',
    eyebrow: 'MAKKAH',
    title: 'Hôtels à Makkah',
    hotels: [
      {
        name: 'Sheraton Jabal Al Kaaba',
        description:
          'Confort élégant à Jabal Al Kaaba, avec un accès pratique au Masjid Al-Haram.',
        image: sheratonImage,
      },
      {
        name: 'Tilal Jabal Al Kaaba',
        description:
          'Élégance, sérénité et vue sur le Haram au cœur de Makkah.',
        image: tilalImage,
      },
      {
        name: 'Marriott Jabal Omar',
        description:
          'Confort 5 étoiles à quelques minutes du Haram, avec des vues privilégiées sur la Mosquée sacrée.',
        image: marriottImage,
      },
      {
        name: 'Hilton Suites Jabal Omar',
        description:
          'À deux pas du Haram, confort premium et vues privilégiées au cœur de Makkah.',
        image: hiltonImage,
      },
      {
        name: 'Voco',
        description:
          'Confort moderne et navette pratique vers le Masjid Al-Haram.',
        image: vocoImage,
      },
      {
        name: 'Kiswah Towers',
        description:
          'Confort familial à proximité du Haram, avec navette gratuite 24h/24.',
        image: kiswahImage,
      },
    ],
  },
  {
    key: 'madinah',
    eyebrow: 'MADINAH',
    title: 'Hôtels à Madinah',
    hotels: [
      {
        name: 'As Saafa Hôtel',
        description:
          'Confort et hospitalité à seulement 500 m de Masjid an-Nabawi.',
        image: asSaafaImage,
      },
      {
        name: 'Crowne Plaza',
        description:
          'Confort 5 étoiles à quelques pas de Masjid an-Nabawi et Bab Al Salam.',
        image: crowneImage,
      },
      {
        name: 'Zamzam Pullman Madinah',
        description:
          'Élégance et sérénité à quelques pas de Masjid an-Nabawi.',
        image: zamzamMadinahImage,
      },
      {
        name: 'Mysk Al Balad',
        description:
          'Confort contemporain et accès privilégié à Masjid an-Nabawi.',
        image: myskImage,
      },
      {
        name: 'Valy Hôtel',
        description:
          'Confort moderne et emplacement privilégié à moins d’1 km de Masjid an-Nabawi.',
        image: valyImage,
      },
    ],
  },
  {
    key: 'kaaba',
    eyebrow: 'VUE KAABA',
    title: 'Chambres avec vue sur la Kaaba',
    hotels: [
      {
        name: 'Fairmont Clock Royal',
        description:
          'Luxe emblématique et vues exceptionnelles sur la Kaaba, au cœur de Makkah.',
        image: fairmontImage,
      },
      {
        name: 'Swissôtel Makkah',
        description:
          'Confort 5 étoiles et vues privilégiées sur la Kaaba, au cœur des Clock Towers.',
        image: swissotelImage,
      },
      {
        name: 'Zamzam Pullman Makkah',
        description:
          'Confort haut de gamme et vues privilégiées sur la Kaaba, à quelques pas du Haram.',
        image: zamzamMakkahImage,
      },
    ],
  },
];

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16">
      <path
        d="M3 8h9M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HotelPlaceholder() {
  return (
    <div
      className="hotel-card-placeholder"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: -2,
        background:
          'radial-gradient(circle at 25% 20%, rgba(230,200,120,0.14) 0%, transparent 45%),' +
          'radial-gradient(circle at 75% 80%, rgba(201,162,75,0.1) 0%, transparent 50%),' +
          'linear-gradient(135deg, #1E1913 0%, #14110E 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 14,
          right: 16,
          fontSize: 9.5,
          letterSpacing: 2.5,
          fontWeight: 700,
          color: 'rgba(230,200,120,0.45)',
        }}
      >
        HARAMAIN
      </div>
    </div>
  );
}

function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <a
      href="#devis"
      className="hotel-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        minHeight: 300,
        borderRadius: 18,
        border: '1px solid rgba(245,239,230,0.08)',
        color: 'inherit',
        textDecoration: 'none',
        isolation: 'isolate',
      }}
    >
      {hotel.image ? (
        <>
          <img
            src={hotel.image}
            alt={hotel.name}
            className="hotel-card-img"
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            draggable={false}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -2,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg,rgba(20,17,14,0.15) 0%,rgba(20,17,14,0.6) 55%,rgba(20,17,14,0.95) 100%)',
              zIndex: -1,
            }}
          />
        </>
      ) : (
        <HotelPlaceholder />
      )}
      <div
        style={{
          padding: '18px 20px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 22,
            fontWeight: 600,
            color: '#F5EFE6',
            lineHeight: 1.2,
          }}
        >
          {hotel.name}
        </div>
        <div
          style={{
            fontSize: 13,
            color: 'rgba(245,239,230,0.68)',
            lineHeight: 1.5,
            minHeight: 39,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {hotel.description}
        </div>
        <span
          className="hotel-card-pill"
          style={{
            marginTop: 10,
            alignSelf: 'flex-start',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            padding: '7px 13px',
            borderRadius: 999,
            border: '1px solid rgba(230,200,120,0.45)',
            color: '#E6C878',
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: '0.4px',
          }}
        >
          Voir les tarifs
          <ArrowIcon />
        </span>
      </div>
    </a>
  );
}

const MOBILE_INITIAL_COUNT = 3;

function HotelScroller({
  hotels,
  showAll,
}: {
  hotels: Hotel[];
  showAll: boolean;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollByRef = useRef<(delta: number) => void>(() => {});
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const isDesktop = () => window.innerWidth > 720;

    const updateState = () => {
      const overflow = el.scrollWidth > el.clientWidth + 2;
      setHasOverflow(overflow);
      setAtStart(el.scrollLeft <= 2);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
    };

    updateState();

    let targetScroll = el.scrollLeft;
    let rafId = 0;
    let lastTime = 0;
    const EASE = 0.14;

    const animate = (now: number) => {
      const dt = lastTime ? (now - lastTime) / 16.6667 : 1;
      lastTime = now;
      const diff = targetScroll - el.scrollLeft;
      if (Math.abs(diff) < 0.4) {
        el.scrollLeft = targetScroll;
        rafId = 0;
        lastTime = 0;
        return;
      }
      const step = 1 - Math.pow(1 - EASE, dt);
      el.scrollLeft += diff * step;
      rafId = requestAnimationFrame(animate);
    };

    const scheduleAnimate = () => {
      if (!rafId) {
        lastTime = 0;
        rafId = requestAnimationFrame(animate);
      }
    };

    const clampTarget = () => {
      const max = el.scrollWidth - el.clientWidth;
      targetScroll = Math.max(0, Math.min(max, targetScroll));
    };

    scrollByRef.current = (delta: number) => {
      targetScroll += delta;
      clampTarget();
      scheduleAnimate();
    };

    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let dragged = false;

    const onPointerDown = (e: PointerEvent) => {
      if (!isDesktop()) return;
      if (e.pointerType !== 'mouse') return;
      isDown = true;
      dragged = false;
      startX = e.clientX;
      scrollStart = el.scrollLeft;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      targetScroll = el.scrollLeft;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return;
      const walk = e.clientX - startX;
      if (Math.abs(walk) > 6) {
        if (!dragged) {
          dragged = true;
          el.classList.add('is-dragging');
        }
        el.scrollLeft = scrollStart - walk;
        targetScroll = el.scrollLeft;
      }
    };

    const stopDrag = () => {
      if (!isDown) return;
      isDown = false;
      if (dragged) {
        el.classList.remove('is-dragging');
        setTimeout(() => {
          dragged = false;
        }, 50);
      }
    };

    const onClickCapture = (e: MouseEvent) => {
      if (dragged) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onDragStart = (e: DragEvent) => e.preventDefault();

    el.addEventListener('scroll', updateState, { passive: true });
    el.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', stopDrag);
    window.addEventListener('pointercancel', stopDrag);
    el.addEventListener('click', onClickCapture, true);
    el.addEventListener('dragstart', onDragStart);
    window.addEventListener('resize', updateState);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.removeEventListener('scroll', updateState);
      el.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', stopDrag);
      window.removeEventListener('pointercancel', stopDrag);
      el.removeEventListener('click', onClickCapture, true);
      el.removeEventListener('dragstart', onDragStart);
      window.removeEventListener('resize', updateState);
    };
  }, [hotels.length, showAll]);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    scrollByRef.current(dir * Math.min(el.clientWidth * 0.85, 680));
  };

  const wrapClass = [
    'hotel-scroll-wrap',
    atStart ? 'at-start' : '',
    atEnd || !hasOverflow ? 'at-end' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapClass}>
      <button
        type="button"
        className="hotel-nav hotel-nav-prev"
        onClick={() => scrollByAmount(-1)}
        disabled={atStart || !hasOverflow}
        aria-label="Voir les hôtels précédents"
      >
        <svg width="18" height="18" viewBox="0 0 16 16">
          <path
            d="M10 3L5 8l5 5"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div ref={scrollerRef} className="hotel-scroller">
        {hotels.map((hotel, index) => {
          const hiddenClass =
            !showAll && index >= MOBILE_INITIAL_COUNT
              ? ' hotel-mobile-hidden'
              : '';
          return (
            <div key={hotel.name} className={`hotel-slide${hiddenClass}`}>
              <HotelCard hotel={hotel} />
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className="hotel-nav hotel-nav-next"
        onClick={() => scrollByAmount(1)}
        disabled={atEnd || !hasOverflow}
        aria-label="Voir les hôtels suivants"
      >
        <svg width="18" height="18" viewBox="0 0 16 16">
          <path
            d="M6 3l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

function CategoryBlock({ category }: { category: Category }) {
  const revealRef = useReveal<HTMLDivElement>();
  const [showAll, setShowAll] = useState(false);
  const hiddenOnMobile = Math.max(
    0,
    category.hotels.length - MOBILE_INITIAL_COUNT,
  );
  const showMoreButton = hiddenOnMobile > 0 && !showAll;

  return (
    <div ref={revealRef} className="reveal" style={{ marginTop: 56 }}>
      <div
        className="hotel-category-head"
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 14,
          marginBottom: 22,
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 14,
            flexWrap: 'wrap',
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
            {category.eyebrow}
          </span>
          <h3
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 26,
              fontWeight: 600,
              lineHeight: 1.15,
              color: '#F5EFE6',
            }}
          >
            {category.title}
          </h3>
        </div>
        <a
          href="/#devis"
          className="link-arrow"
          aria-label={`Demander un devis pour un séjour — ${category.title}`}
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#E6C878',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            whiteSpace: 'nowrap',
          }}
        >
          Demander un devis
          <span className="btn-arrow">
            <ArrowIcon />
          </span>
        </a>
      </div>
      <HotelScroller hotels={category.hotels} showAll={showAll} />
      {showMoreButton && (
        <button
          type="button"
          className="hotel-show-more"
          onClick={() => setShowAll(true)}
        >
          Voir {hiddenOnMobile} hôtel{hiddenOnMobile > 1 ? 's' : ''} de plus
          <svg width="12" height="12" viewBox="0 0 16 16">
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

function Hotels() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="hotels"
      className="container-pad section-pad-y"
      style={{
        maxWidth: 1240,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <div
        ref={revealRef}
        className="reveal hotels-header"
        style={{ marginBottom: 18 }}
      >
        <span
          style={{
            fontSize: 12,
            letterSpacing: '3.6px',
            fontWeight: 700,
            color: '#E6C878',
          }}
        >
          NOS ADRESSES SÉLECTIONNÉES
        </span>
        <h2
          className="section-title"
          style={{
            margin: '12px 0 0',
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 600,
            lineHeight: 1.1,
            color: '#F5EFE6',
          }}
        >
          Hôtels à Makkah &amp; Madinah
        </h2>
      </div>

      <p
        style={{
          margin: '0 0 8px',
          fontSize: 14.5,
          lineHeight: 1.6,
          color: 'rgba(245,239,230,0.68)',
          maxWidth: 720,
        }}
      >
        Un aperçu de nos adresses partenaires.{' '}
        <span style={{ color: '#E6C878', fontWeight: 600 }}>
          Plus de 100 hôtels
        </span>{' '}
        disponibles à Makkah &amp; Madinah, à tous les budgets et à toutes les
        distances du Haram — demandez la liste complète.
      </p>

      {categories.map((category) => (
        <CategoryBlock key={category.key} category={category} />
      ))}
    </section>
  );
}

export default Hotels;
