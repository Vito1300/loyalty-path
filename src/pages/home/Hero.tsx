import { useCallback, useEffect, useState } from 'react';
import { Link, type To } from 'react-router-dom';
import ui from '../../components/ui.module.css';
import { briukyPhoto, dzhemperWhite, HERO_PHOTO, klasykaBack, klasykaFront, klasykaPark } from '../../data/products';
import { cx } from '../../lib/cx';
import styles from './Hero.module.css';

interface Slide {
  id: string;
  title: string;
  sub: string;
  cta: string;
  to: To;
  /** Three portrait shots side by side; phones show the middle one. */
  panels: { src: string; alt: string; pos?: string }[];
}

const SLIDES: Slide[] = [
  {
    id: 'klasyka',
    title: 'Класика',
    sub: 'Полузамок, який шиємо під вас за 2–4 дні',
    cta: 'Переглянути',
    to: '/product/klasyka',
    panels: [
      { src: klasykaFront, alt: 'Полузамок «Класика», вигляд спереду', pos: '50% 20%' },
      { src: HERO_PHOTO.src, alt: HERO_PHOTO.alt, pos: '50% 15%' },
      { src: klasykaBack, alt: 'Полузамок «Класика», вигляд ззаду', pos: '50% 20%' },
    ],
  },
  {
    id: 'daily',
    title: 'На кожен день',
    sub: 'Поло, брюки й джемпер, що поєднуються між собою',
    cta: 'До колекції',
    to: { hash: '#collection' },
    panels: [
      { src: klasykaPark, alt: 'Полузамок і брюки, вулична зйомка', pos: '50% 25%' },
      { src: dzhemperWhite, alt: 'Білий джемпер на повному замку поверх поло', pos: '50% 20%' },
      { src: briukyPhoto, alt: 'Чорні casual брюки з білими кедами', pos: '50% 60%' },
    ],
  },
];

const AUTOPLAY_MS = 6500;

function Arrow({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg width="40" height="14" viewBox="0 0 40 14" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      {dir === 'next' ? <path d="M0 7h39M33 1l6 6-6 6" /> : <path d="M40 7H1M7 1L1 7l6 6" />}
    </svg>
  );
}

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((delta: number) => {
    setIndex((i) => (i + delta + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, go]);

  return (
    <section
      className={styles.hero}
      aria-roledescription="карусель"
      aria-label="Головні колекції"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <h1 className="visually-hidden">Loyalty Path — чоловічий одяг, пошитий під замовлення</h1>

      {SLIDES.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.id}
            className={cx(styles.slide, active && styles.active)}
            role="group"
            aria-roledescription="слайд"
            aria-label={`${i + 1} з ${SLIDES.length}: ${slide.title}`}
            aria-hidden={!active}
            inert={!active}
          >
            <div className={styles.panels}>
              {slide.panels.map((p, k) => (
                <img
                  key={p.src}
                  src={p.src}
                  alt={k === 1 ? p.alt : ''}
                  style={p.pos ? { objectPosition: p.pos } : undefined}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  fetchPriority={i === 0 && k === 1 ? 'high' : undefined}
                />
              ))}
            </div>
            <div className={styles.copy}>
              <h2 className={styles.title}>{slide.title}</h2>
              <p className={styles.sub}>{slide.sub}</p>
              <Link to={slide.to} className={cx(ui.btn, ui.light, styles.cta)}>
                {slide.cta}
              </Link>
            </div>
          </div>
        );
      })}

      <button type="button" className={cx(styles.arrow, styles.prev)} onClick={() => go(-1)} aria-label="Попередній слайд">
        <Arrow dir="prev" />
      </button>
      <button type="button" className={cx(styles.arrow, styles.next)} onClick={() => go(1)} aria-label="Наступний слайд">
        <Arrow dir="next" />
      </button>

      <div className={styles.dots}>
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={cx(styles.dot, i === index && styles.dotOn)}
            aria-label={`Слайд ${i + 1}: ${s.title}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
