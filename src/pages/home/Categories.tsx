import { useRef } from 'react';
import { Link, type To } from 'react-router-dom';
import { briukyPhoto, dzhemperWhite, HERO_PHOTO, klasykaPark } from '../../data/products';
import { cx } from '../../lib/cx';
import { collectionLink } from '../../lib/links';
import styles from './Categories.module.css';

const TILES: { label: string; to: To; src: string; pos?: string }[] = [
  { label: 'Кофти', to: collectionLink('kofty'), src: HERO_PHOTO.src, pos: '50% 20%' },
  { label: 'Низ', to: collectionLink('bottoms'), src: briukyPhoto, pos: '50% 55%' },
  { label: 'Готові образи', to: { hash: '#looks' }, src: klasykaPark, pos: '50% 25%' },
  { label: 'Уся колекція', to: collectionLink('all'), src: dzhemperWhite, pos: '50% 20%' },
];

export function Categories() {
  const rail = useRef<HTMLUListElement>(null);
  const scroll = (dir: number) => {
    const el = rail.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.66, behavior: 'smooth' });
  };

  return (
    <section className={cx('wrap', styles.section)} aria-labelledby="cats-title">
      <h2 id="cats-title" className="section-title">
        Чоловікам
      </h2>
      <ul ref={rail} className={styles.rail}>
        {TILES.map((t) => (
          <li key={t.label}>
            <Link to={t.to} className={styles.tile}>
              <img src={t.src} alt="" loading="lazy" decoding="async" style={{ objectPosition: t.pos }} />
              <span>{t.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.nav}>
        <button type="button" onClick={() => scroll(-1)} aria-label="Прокрутити назад">
          <svg width="36" height="12" viewBox="0 0 36 12" fill="none" stroke="currentColor" aria-hidden="true">
            <path d="M36 6H1M6 1L1 6l5 5" />
          </svg>
        </button>
        <button type="button" onClick={() => scroll(1)} aria-label="Прокрутити далі">
          <svg width="36" height="12" viewBox="0 0 36 12" fill="none" stroke="currentColor" aria-hidden="true">
            <path d="M0 6h35M30 1l5 5-5 5" />
          </svg>
        </button>
      </div>
    </section>
  );
}
