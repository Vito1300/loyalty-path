import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../data/products';
import { cx } from '../lib/cx';
import { collectionLink } from '../lib/links';
import { useShop } from '../store/ShopContext';
import { BagIcon, HeartIcon, MenuIcon } from './Icons';
import { Sheet } from './Sheet';
import styles from './Header.module.css';
import ui from './ui.module.css';

const NAV = CATEGORIES.filter((c) => c.id !== 'all');

/** True once the page has scrolled past `offset` pixels. */
function useScrolledPast(offset: number) {
  const [past, setPast] = useState(() => typeof window !== 'undefined' && window.scrollY > offset);
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);
  return past;
}

export function Header() {
  const { count, favourites, setCartOpen } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const scrolled = useScrolledPast(40);
  const [hovered, setHovered] = useState(false);
  // On the home page the header sits transparent over the hero until you scroll or hover it.
  const overlay = isHome && !scrolled && !hovered && !menuOpen;
  const activeCat = isHome ? new URLSearchParams(location.search).get('cat') : null;

  return (
    <>
      <p className={styles.announce}>
        Безкоштовна доставка від 3&nbsp;000&nbsp;грн<span className={styles.announceMore}>&nbsp;при повній передоплаті</span>
      </p>

      <header
        className={cx(styles.header, overlay && styles.overlay)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHovered(false);
        }}
      >
        <div className={styles.row}>
          <div className={styles.left}>
            <button
              type="button"
              className={cx(ui.iconBtn, styles.menuBtn)}
              aria-label="Меню"
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon />
            </button>
            <nav className={styles.nav} aria-label="Каталог">
              {NAV.map((c) => (
                <Link key={c.id} to={collectionLink(c.id)} aria-current={activeCat === c.id ? 'page' : undefined}>
                  {c.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link to="/" className={styles.mark} aria-label="Loyalty Path, на головну">
            Loyalty Path
          </Link>

          <div className={styles.actions}>
            <Link to={collectionLink('fav')} className={styles.action} aria-label={`Обране, ${favourites.length}`}>
              <HeartIcon size={19} />
              {favourites.length > 0 && <span className={cx(ui.badge, styles.count)}>{favourites.length}</span>}
            </Link>
            <button
              type="button"
              className={styles.action}
              onClick={() => setCartOpen(true)}
              aria-label={`Кошик, ${count} ${count === 1 ? 'річ' : 'речей'}`}
            >
              <BagIcon size={19} />
              {count > 0 && <span className={cx(ui.badge, styles.count)}>{count}</span>}
            </button>
          </div>
        </div>
      </header>

      <Sheet open={menuOpen} onClose={() => setMenuOpen(false)} title="Меню" side="left">
        <nav
          className={styles.mobileNav}
          aria-label="Каталог"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest('a')) setMenuOpen(false);
          }}
        >
          <Link to={collectionLink('all')}>Уся колекція</Link>
          {NAV.map((c) => (
            <Link key={c.id} to={collectionLink(c.id)}>
              {c.label}
            </Link>
          ))}
          <Link to={{ pathname: '/', hash: '#looks' }}>Образи</Link>
          <Link to={{ pathname: '/', hash: '#made-to-order' }}>Оплата і доставка</Link>
          <Link to={{ pathname: '/', hash: '#about' }}>Про бренд</Link>
        </nav>
      </Sheet>
    </>
  );
}
