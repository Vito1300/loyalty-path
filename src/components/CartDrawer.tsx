import { Link } from 'react-router-dom';
import { getProduct } from '../data/products';
import { cx } from '../lib/cx';
import { formatPrice } from '../lib/format';
import { lineKey, MAX_QTY } from '../store/shop';
import { useShop } from '../store/ShopContext';
import { ProductImage } from './ProductImage';
import { Sheet } from './Sheet';
import { ShippingMeter } from './ShippingMeter';
import styles from './CartDrawer.module.css';
import ui from './ui.module.css';

export function CartDrawer() {
  const { cart, subtotal, count, cartOpen, setCartOpen, setQty, removeLine, notify } = useShop();
  const close = () => setCartOpen(false);

  const footer =
    cart.length > 0 ? (
      <>
        <ShippingMeter total={subtotal} />
        <div className={styles.total}>
          <span>Разом</span>
          <strong className="num">{formatPrice(subtotal)}</strong>
        </div>
        <button
          type="button"
          className={cx(ui.btn, ui.solid, ui.block)}
          onClick={() => notify('Це демо: оформлення замовлення ще не підключене')}
        >
          Оформити замовлення
        </button>
      </>
    ) : undefined;

  return (
    <Sheet open={cartOpen} onClose={close} title={count ? `Кошик (${count})` : 'Кошик'} footer={footer}>
      {cart.length === 0 ? (
        <div className={styles.empty}>
          <p>У кошику поки нічого немає.</p>
          <Link to={{ pathname: '/', hash: '#collection' }} className={cx(ui.btn, ui.outline)} onClick={close}>
            Перейти до колекції
          </Link>
        </div>
      ) : (
        <ul className={styles.list}>
          {cart.map((line) => {
            const product = getProduct(line.productId);
            if (!product) return null;
            const key = lineKey(line);
            const colour = product.colours.find((c) => c.id === line.colourId) ?? product.colours[0];
            return (
              <li key={key} className={styles.line}>
                <Link to={`/product/${product.id}`} onClick={close} className={styles.thumb} tabIndex={-1} aria-hidden="true">
                  <ProductImage product={product} caption={false} />
                </Link>
                <div className={styles.details}>
                  <Link to={`/product/${product.id}`} onClick={close} className={styles.name}>
                    {product.name}
                  </Link>
                  <span className={styles.variant}>
                    {colour.name}, {line.size}
                  </span>
                  <div className={styles.controls}>
                    <div className={styles.stepper} role="group" aria-label={`Кількість: ${product.name}`}>
                      <button type="button" onClick={() => setQty(key, line.qty - 1)} aria-label="Менше">
                        −
                      </button>
                      <span className="num" aria-live="polite">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(key, line.qty + 1)}
                        disabled={line.qty >= MAX_QTY}
                        aria-label="Більше"
                      >
                        +
                      </button>
                    </div>
                    <button type="button" className={cx(ui.link, styles.remove)} onClick={() => removeLine(key)}>
                      Видалити
                    </button>
                  </div>
                </div>
                <span className={cx(styles.price, 'num')}>{formatPrice(product.price * line.qty)}</span>
              </li>
            );
          })}
        </ul>
      )}
    </Sheet>
  );
}
