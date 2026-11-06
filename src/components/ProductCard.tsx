import { Link } from 'react-router-dom';
import { SIZES, type Product } from '../data/products';
import { cx } from '../lib/cx';
import { formatPrice } from '../lib/format';
import { useShop } from '../store/ShopContext';
import { HeartIcon } from './Icons';
import { ProductImage } from './ProductImage';
import styles from './ProductCard.module.css';
import ui from './ui.module.css';

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const { addToCart, toggleFavourite, isFavourite } = useShop();
  const href = `/product/${product.id}`;
  const fav = isFavourite(product.id);
  const colour = product.colours[0];
  const hoverPhoto = product.photos.length > 1 ? product.photos[2] ?? product.photos[1] : undefined;

  return (
    <article className={cx(styles.card, hoverPhoto && 'has-hover-photo')}>
      <div className={styles.media}>
        <Link to={href} tabIndex={-1} aria-hidden="true">
          <ProductImage product={product} hoverPhoto={hoverPhoto} priority={priority} caption={false} />
        </Link>

        <span className={styles.swatches} role="img" aria-label={`Кольори: ${product.colours.map((c) => c.name).join(', ')}`}>
          {product.colours.map((c) => (
            <i key={c.id} style={{ background: c.hex }} />
          ))}
        </span>

        <button
          type="button"
          className={cx(styles.fav, fav && styles.favOn)}
          aria-pressed={fav}
          aria-label={fav ? `Прибрати «${product.name}» з обраного` : `Додати «${product.name}» в обране`}
          onClick={() => toggleFavourite(product.id)}
        >
          <HeartIcon size={18} filled={fav} />
        </button>

        {product.badge && (
          <span className={cx(ui.tag, product.badge === 'hit' && ui.tagHit, styles.badge)}>
            {product.badge === 'hit' ? 'Хіт' : 'Новинка'}
          </span>
        )}

        {/* Hover strip on pointer devices; on touch the card opens the product page. */}
        <div className={styles.quick}>
          <span className={styles.quickLabel}>Швидко додати, {colour.name.toLowerCase()}</span>
          <div className={styles.sizeRow}>
            {SIZES.map((size) => (
              <button
                key={size}
                type="button"
                aria-label={`Додати «${product.name}», розмір ${size}`}
                onClick={() =>
                  addToCart(
                    [{ productId: product.id, colourId: colour.id, size }],
                    `${product.name}, ${colour.name.toLowerCase()}, ${size}`,
                  )
                }
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Link to={href} className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <span className={cx(styles.price, 'num')}>{formatPrice(product.price)}</span>
        {product.photos.length === 0 && <span className={styles.pending}>Ескіз, фото готуємо</span>}
      </Link>
    </article>
  );
}
