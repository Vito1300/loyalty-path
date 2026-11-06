import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard';
import ui from '../../components/ui.module.css';
import { CATEGORIES, PRODUCTS } from '../../data/products';
import { cx } from '../../lib/cx';
import { useShop } from '../../store/ShopContext';
import styles from './Collection.module.css';

const FILTERS = [...CATEGORIES, { id: 'fav' as const, label: 'Обране' }];
type FilterId = (typeof FILTERS)[number]['id'];

const isFilter = (v: string | null): v is FilterId => FILTERS.some((f) => f.id === v);

function itemsLabel(n: number) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return `${n} товар`;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return `${n} товари`;
  return `${n} товарів`;
}

function GridIcon({ cols }: { cols: 3 | 4 }) {
  return (
    <svg width={cols === 3 ? 22 : 29} height="10" viewBox={`0 0 ${cols === 3 ? 22 : 29} 10`} aria-hidden="true">
      {Array.from({ length: cols }, (_, i) => (
        <rect key={i} x={i * 7 + 0.5} y="0.5" width="6" height="9" fill="none" stroke="currentColor" />
      ))}
    </svg>
  );
}

export function Collection() {
  const [params, setParams] = useSearchParams();
  const { favourites } = useShop();
  const [cols, setCols] = useState<3 | 4>(4);
  const raw = params.get('cat');
  const active: FilterId = isFilter(raw) ? raw : 'all';

  const countFor = (id: FilterId) => {
    if (id === 'all') return PRODUCTS.length;
    if (id === 'fav') return favourites.length;
    return PRODUCTS.filter((p) => p.category === id).length;
  };

  const shown = PRODUCTS.filter((p) => {
    if (active === 'all') return true;
    if (active === 'fav') return favourites.includes(p.id);
    return p.category === active;
  });

  const pick = (id: FilterId) => {
    setParams(id === 'all' ? {} : { cat: id }, { replace: true, preventScrollReset: true });
  };

  const title = active === 'all' ? 'Уся колекція' : FILTERS.find((f) => f.id === active)?.label;

  return (
    <section id="collection" className={styles.section} aria-labelledby="collection-title">
      <h2 id="collection-title" className={styles.title}>
        {title}
      </h2>

      <div className={styles.toolbar}>
        <div className={styles.filters} role="group" aria-label="Категорія">
          {FILTERS.map((f) => {
            if (f.id === 'fav' && countFor('fav') === 0 && active !== 'fav') return null;
            return (
              <button
                key={f.id}
                type="button"
                className={cx(styles.filter, f.id === active && styles.filterOn)}
                aria-pressed={f.id === active}
                onClick={() => pick(f.id)}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <p className={styles.count} aria-live="polite">
          {itemsLabel(shown.length)}
        </p>
        <div className={styles.view} role="group" aria-label="Кількість колонок">
          {([3, 4] as const).map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={cols === n}
              aria-label={`${n} колонки`}
              className={cx(styles.viewBtn, cols === n && styles.viewOn)}
              onClick={() => setCols(n)}
            >
              <GridIcon cols={n} />
            </button>
          ))}
        </div>
      </div>

      <div className="wrap">
        {shown.length === 0 ? (
          <div className={styles.empty}>
            <p>Тут з’являться речі, які ви позначите сердечком.</p>
            <button type="button" className={cx(ui.btn, ui.outline)} onClick={() => pick('all')}>
              Показати всю колекцію
            </button>
          </div>
        ) : (
          <div className={cx(styles.grid, cols === 3 && styles.grid3)}>
            {shown.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 4} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
