import { useRef } from 'react';
import { ProductImage } from '../../components/ProductImage';
import ui from '../../components/ui.module.css';
import type { Product } from '../../data/products';
import { cx } from '../../lib/cx';
import styles from './Gallery.module.css';

/** Edge-to-edge horizontal photo strip with arrow controls. */
export function Gallery({ product }: { product: Product }) {
  const strip = useRef<HTMLDivElement>(null);
  const single = product.photos.length <= 1;

  const scroll = (dir: number) => {
    const el = strip.current;
    if (!el) return;
    const item = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * (item?.offsetWidth ?? el.clientWidth), behavior: 'smooth' });
  };

  const badge = product.badge && (
    <span className={cx(ui.tag, product.badge === 'hit' && ui.tagHit, styles.badge)}>
      {product.badge === 'hit' ? 'Хіт' : 'Новинка'}
    </span>
  );

  if (single) {
    return (
      <div className={styles.single}>
        <ProductImage product={product} priority />
        {badge}
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div ref={strip} className={styles.strip} role="region" aria-label={`Фото: ${product.name}`} tabIndex={0}>
        {product.photos.map((photo, i) => (
          <figure key={photo.src} className={styles.item}>
            <img
              src={photo.src}
              alt={photo.alt}
              loading={i < 2 ? 'eager' : 'lazy'}
              decoding="async"
              style={photo.focus ? { objectPosition: photo.focus } : undefined}
            />
            {i === 0 && badge}
          </figure>
        ))}
      </div>
      <button type="button" className={cx(styles.arrow, styles.prev)} onClick={() => scroll(-1)} aria-label="Попереднє фото">
        <svg width="36" height="12" viewBox="0 0 36 12" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M36 6H1M6 1L1 6l5 5" />
        </svg>
      </button>
      <button type="button" className={cx(styles.arrow, styles.next)} onClick={() => scroll(1)} aria-label="Наступне фото">
        <svg width="36" height="12" viewBox="0 0 36 12" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M0 6h35M30 1l5 5-5 5" />
        </svg>
      </button>
    </div>
  );
}
