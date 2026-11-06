import { briukyPhoto, dzhemperWhite, klasykaBack, klasykaFront, klasykaPark } from '../../data/products';
import { cx } from '../../lib/cx';
import { SOCIAL } from '../../lib/links';
import styles from './Social.module.css';

const POSTS = [
  { src: klasykaFront, pos: '50% 20%' },
  { src: klasykaPark, pos: '50% 20%' },
  { src: dzhemperWhite, pos: '50% 25%' },
  { src: briukyPhoto, pos: '50% 60%' },
  { src: klasykaBack, pos: '50% 25%' },
];

export function Social() {
  return (
    <section className={cx('wrap', styles.social)} aria-labelledby="social-title">
      <div className={styles.head}>
        <h2 id="social-title" className="section-title">
          Ми в соцмережах
        </h2>
        <p className={styles.handles}>
          <a href={SOCIAL.instagram} target="_blank" rel="noreferrer">
            Instagram {SOCIAL.instagramHandle}
          </a>
          <a href={SOCIAL.tiktok} target="_blank" rel="noreferrer">
            TikTok {SOCIAL.tiktokHandle}
          </a>
        </p>
      </div>
      <ul className={styles.grid}>
        {POSTS.map((p, i) => (
          <li key={i}>
            <a href={SOCIAL.instagram} target="_blank" rel="noreferrer" aria-label={`Допис ${i + 1} в Instagram`}>
              <img src={p.src} alt="" loading="lazy" decoding="async" style={{ objectPosition: p.pos }} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
