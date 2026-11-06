import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductImage } from '../../components/ProductImage';
import { ShippingMeter } from '../../components/ShippingMeter';
import ui from '../../components/ui.module.css';
import { LOOKS } from '../../data/looks';
import { requireProduct, SIZES, type Size } from '../../data/products';
import { cx } from '../../lib/cx';
import { formatPrice } from '../../lib/format';
import { useShop } from '../../store/ShopContext';
import styles from './Looks.module.css';

export function Looks() {
  const { addToCart } = useShop();
  const [lookId, setLookId] = useState(LOOKS[0].id);
  const [active, setActive] = useState(0);
  const [size, setSize] = useState<Size>('M');

  const look = LOOKS.find((l) => l.id === lookId) ?? LOOKS[0];
  const items = look.spots.map((s) => {
    const product = requireProduct(s.productId);
    const colour = product.colours.find((c) => c.id === s.colourId) ?? product.colours[0];
    return { spot: s, product, colour };
  });
  const total = items.reduce((sum, i) => sum + i.product.price, 0);

  return (
    <section id="looks" className={styles.section} aria-labelledby="looks-title">
      <div className={cx('wrap', styles.grid)}>
        <div className={styles.photo}>
          <img src={look.photo} alt={look.alt} loading="lazy" decoding="async" />
          {items.map(({ spot, product }, i) => (
            <button
              key={spot.productId}
              type="button"
              className={cx(styles.marker, i === active && styles.markerOn)}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              aria-label={`${i + 1}: ${product.name}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className={styles.panel}>
          <div>
            <h2 id="looks-title" className="section-title">
              Готові образи
            </h2>
            <p className="section-sub">Речі з фото можна додати в кошик разом, в одному розмірі.</p>
          </div>

          <div className={styles.switch} role="group" aria-label="Образ">
            {LOOKS.map((l) => (
              <button
                key={l.id}
                type="button"
                aria-pressed={l.id === look.id}
                className={cx(styles.switchBtn, l.id === look.id && styles.switchOn)}
                onClick={() => {
                  setLookId(l.id);
                  setActive(0);
                }}
              >
                {l.title}
              </button>
            ))}
          </div>

          <ol className={styles.items}>
            {items.map(({ spot, product, colour }, i) => (
              <li
                key={spot.productId}
                className={cx(styles.item, i === active && styles.itemOn)}
                onMouseEnter={() => setActive(i)}
              >
                <span className={styles.itemNum} aria-hidden="true">
                  {i + 1}
                </span>
                <ProductImage
                  product={product}
                  photo={product.photos.find((p) => p.src === look.photo) ?? product.photos[0]}
                  className={styles.thumb}
                  caption={false}
                />
                <div className={styles.itemText}>
                  <Link to={`/product/${product.id}`} onFocus={() => setActive(i)}>
                    {product.name}
                  </Link>
                  <span>{colour.name}</span>
                </div>
                <span className={cx(styles.itemPrice, 'num')}>{formatPrice(product.price)}</span>
              </li>
            ))}
          </ol>

          <fieldset className={styles.sizes}>
            <legend>Розмір для обох речей</legend>
            <div className={styles.sizeRow}>
              {SIZES.map((s) => (
                <label key={s} className={styles.size}>
                  <input type="radio" name="look-size" value={s} checked={s === size} onChange={() => setSize(s)} />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <ShippingMeter total={total} />

          <button
            type="button"
            className={cx(ui.btn, ui.solid, ui.block)}
            onClick={() =>
              addToCart(
                items.map((i) => ({ productId: i.product.id, colourId: i.colour.id, size })),
                `${look.title.toLowerCase()}, ${size}`,
              )
            }
          >
            Додати образ у кошик, <span className="num">{formatPrice(total)}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
