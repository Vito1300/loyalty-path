import { formatPrice } from '../lib/format';
import { FREE_SHIPPING_FROM } from '../store/shop';
import styles from './ShippingMeter.module.css';

export function ShippingMeter({ total, emptyText }: { total: number; emptyText?: string }) {
  const left = FREE_SHIPPING_FROM - total;
  const pct = Math.min(100, Math.round((total / FREE_SHIPPING_FROM) * 100));

  let text: string;
  if (total === 0 && emptyText) text = emptyText;
  else if (left > 0) text = `До безкоштовної доставки ще ${formatPrice(left)}`;
  else text = 'Доставка безкоштовна при повній передоплаті';

  return (
    <div className={styles.meter}>
      <p className={styles.text}>{text}</p>
      <div
        className={styles.bar}
        role="progressbar"
        aria-label="Сума до безкоштовної доставки"
        aria-valuemin={0}
        aria-valuemax={FREE_SHIPPING_FROM}
        aria-valuenow={Math.min(total, FREE_SHIPPING_FROM)}
      >
        <i style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
