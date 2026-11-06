import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard';
import { CATEGORIES, getProduct, PRODUCTS, type Product, type Size } from '../../data/products';
import { cx } from '../../lib/cx';
import { collectionLink } from '../../lib/links';
import { NotFoundPage } from '../NotFoundPage';
import { Bundle } from './Bundle';
import { BuyPanel } from './BuyPanel';
import { Gallery } from './Gallery';
import styles from './ProductPage.module.css';

export function ProductPage() {
  const { id = '' } = useParams();
  const product = getProduct(id);
  if (!product) return <NotFoundPage />;
  // Keyed so that switching product resets colour, size and bundle choices.
  return <ProductView key={product.id} product={product} />;
}

function ProductView({ product }: { product: Product }) {
  const [size, setSize] = useState<Size | null>(null);
  const category = CATEGORIES.find((c) => c.id === product.category);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const more = related.length < 4 ? PRODUCTS.filter((p) => p.category !== product.category).slice(0, 4 - related.length) : [];

  return (
    <>
      <title>{`${product.name} · Loyalty Path`}</title>
      <meta name="description" content={product.summary} />

      <div className="wrap">
        <nav className={styles.crumbs} aria-label="Ви тут">
          <ol>
            <li>
              <Link to="/">Головна</Link>
            </li>
            {category && (
              <li>
                <Link to={collectionLink(category.id)}>{category.label}</Link>
              </li>
            )}
            <li aria-current="page">{product.name}</li>
          </ol>
        </nav>

      </div>

      <div className={styles.pdp}>
        <Gallery product={product} />
        <BuyPanel product={product} size={size} onSizeChange={setSize} />
      </div>

      {product.pairsWith.length > 0 && <Bundle product={product} size={size} />}

      <section className={cx('wrap', styles.related)} aria-labelledby="related-title">
        <div className={styles.relatedHead}>
          <h2 id="related-title" className="section-title">
            Що ще подивитися
          </h2>
          <Link to={collectionLink('all')} className={styles.allLink}>
            Уся колекція
          </Link>
        </div>
        <div className={styles.relatedGrid}>
          {[...related, ...more].map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
