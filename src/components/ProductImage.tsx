import type { Photo, Product } from '../data/products';
import { cx } from '../lib/cx';
import { GarmentSketch } from './GarmentSketch';
import styles from './ProductImage.module.css';

interface Props {
  product: Product;
  photo?: Photo;
  /** Second photo revealed on hover (desktop pointers only). */
  hoverPhoto?: Photo;
  className?: string;
  priority?: boolean;
  /** Show "photo coming" caption on the sketch. */
  caption?: boolean;
}

export function ProductImage({ product, photo, hoverPhoto, className, priority, caption = true }: Props) {
  const main = photo ?? product.photos[0];

  if (!main) {
    return (
      <div className={cx(styles.frame, styles.sketch, className)} role="img" aria-label={`${product.name}, ескіз`}>
        <GarmentSketch kind={product.silhouette} className={styles.drawing} />
        {caption && <span className={styles.note}>Фото з’явиться після зйомки</span>}
      </div>
    );
  }

  return (
    <div className={cx(styles.frame, className)}>
      <img
        src={main.src}
        alt={main.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={main.focus ? { objectPosition: main.focus } : undefined}
      />
      {hoverPhoto && (
        <img
          className={styles.alt}
          src={hoverPhoto.src}
          alt=""
          loading="lazy"
          decoding="async"
          style={hoverPhoto.focus ? { objectPosition: hoverPhoto.focus } : undefined}
        />
      )}
    </div>
  );
}
