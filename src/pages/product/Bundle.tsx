import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductImage } from '../../components/ProductImage';
import { ShippingMeter } from '../../components/ShippingMeter';
import ui from '../../components/ui.module.css';
import { requireProduct, type Product, type Size } from '../../data/products';
import { cx } from '../../lib/cx';
import { formatPrice, pluralThings } from '../../lib/format';
import { useShop } from '../../store/ShopContext';
import styles from './Bundle.module.css';

export function Bundle({ product, size }: { product: Product; size: Size | null }) {
  const { addToCart } = useShop();
  const items = [product, ...product.pairsWith.slice(0, 2).map(requireProduct)];
  const [picked, setPicked] = useState<Set<string>>(() => new Set(items.map((p) => p.id)));
  const [needSize, setNeedSize] = useState(false);

  const chosen = items.filter((p) => picked.has(p.id));
  const total = chosen.reduce((sum, p) => sum + p.price, 0);

  function toggle(id: string) {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleAdd() {
    if (!size) {
      setNeedSize(true);
      return;
    }
    setNeedSize(false);
    addToCart(
      chosen.map((p) => ({ productId: p.id, colourId: p.colours[0].id, size })),
      `комплект, ${pluralThings(chosen.length)}, ${size}`,
    );
  }

  return (
    <section className={cx('wrap', styles.section)} aria-labelledby="bundle-title">
      <h2 id="bundle-title" className="section-title">
        Зберіть комплект
      </h2>
      <p className="section-sub">
        Ці речі носять разом найчастіше. Зніміть позначку з того, що вже маєте.
      </p>

      <div className={styles.layout}>
        <ul className={styles.items}>
          {items.map((p) => {
            const on = picked.has(p.id);
            return (
              <li key={p.id} className={cx(styles.item, !on && styles.off)}>
                <label className={styles.check}>
                  <input type="checkbox" checked={on} onChange={() => toggle(p.id)} />
                  <span className="visually-hidden">Додати до комплекту: {p.name}</span>
                </label>
                <ProductImage product={p} caption={false} />
                <div className={styles.row}>
                  {p.id === product.id ? (
                    <span className={styles.name}>{p.name}</span>
                  ) : (
                    <Link to={`/product/${p.id}`} className={styles.name}>
                      {p.name}
                    </Link>
                  )}
                  <span className={cx(styles.price, 'num')}>{formatPrice(p.price)}</span>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.summary}>
          <p className={styles.count}>Разом {pluralThings(chosen.length)}</p>
          <p className={cx(styles.total, 'num')}>{formatPrice(total)}</p>
          <ShippingMeter total={total} emptyText="Позначте речі, які хочете додати" />
          <button type="button" className={cx(ui.btn, ui.solid, ui.block)} disabled={chosen.length === 0} onClick={handleAdd}>
            {size ? `Додати комплект, розмір ${size}` : 'Додати комплект'}
          </button>
          {needSize && (
            <p className={styles.need} role="alert">
              Спершу оберіть розмір у блоці вище. Він застосується до всіх речей комплекту.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
