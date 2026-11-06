import { Link } from 'react-router-dom';
import ui from '../../components/ui.module.css';
import { klasykaEmbroidery } from '../../data/products';
import { cx } from '../../lib/cx';
import { collectionLink } from '../../lib/links';
import styles from './About.module.css';

export function About() {
  return (
    <section id="about" className={cx('wrap', styles.about)} aria-labelledby="about-title">
      <div className={styles.text}>
        <h2 id="about-title" className="section-title">
          Сила у стриманості
        </h2>
        <p>
          У кожного свій шлях, але те, як ви його проходите, має значення. Loyalty Path шиє одяг для чоловіків, чию
          присутність відчувають ще до того, як вони почнуть говорити.
        </p>
        <p>
          Впевненість завжди невимушена, тому в центрі уваги комфорт. Ми конструюємо речі так, щоб вони не обмежували
          рухів, а знак LP вишиваємо чорним по чорному: його видно лише зблизька.
        </p>
        <Link to={collectionLink('all')} className={cx(ui.btn, ui.solid, styles.cta)}>
          Перейти до колекції
        </Link>
      </div>
      <img
        className={styles.img}
        src={klasykaEmbroidery}
        alt="Вишитий знак LP тон у тон на чорній тканині"
        loading="lazy"
        decoding="async"
        width={600}
        height={750}
      />
    </section>
  );
}
