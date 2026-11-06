import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/products';
import { CallbackForm } from './CallbackForm';
import { collectionLink, SOCIAL } from '../lib/links';
import styles from './Footer.module.css';

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.top}>
          <section className={styles.callback} aria-labelledby="callback-title">
            <h2 id="callback-title">Підкажемо з розміром</h2>
            <p>Залиште номер, і ми передзвонимо: допоможемо з розміром, кольором чи термінами пошиву.</p>
            <CallbackForm />
          </section>

          <nav className={styles.cols} aria-label="Інформація">
            <div>
              <h3>Каталог</h3>
              <ul>
                {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                  <li key={c.id}>
                    <Link to={collectionLink(c.id)}>{c.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Покупцям</h3>
              <ul>
                <li>
                  <Link to={{ pathname: '/', hash: '#made-to-order' }}>Оплата і доставка</Link>
                </li>
                <li>
                  <Link to={{ pathname: '/', hash: '#made-to-order' }}>Обмін і повернення</Link>
                </li>
                <li>
                  <Link to={{ pathname: '/', hash: '#about' }}>Про бренд</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3>Зв’язок</h3>
              <ul>
                <li>
                  <a href="https://t.me/" rel="noreferrer" target="_blank">
                    Telegram
                  </a>
                </li>
                <li>
                  <a href={SOCIAL.instagram} rel="noreferrer" target="_blank">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href={SOCIAL.tiktok} rel="noreferrer" target="_blank">
                    TikTok
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className={styles.bottom}>
          <span className={styles.mark}>Loyalty Path</span>
          <span>Доставка Новою поштою по Україні. Оплата повна або накладеним платежем.</span>
          <span>© {YEAR}</span>
        </div>
      </div>
    </footer>
  );
}
