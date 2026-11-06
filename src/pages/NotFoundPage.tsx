import { Link } from 'react-router-dom';
import { cx } from '../lib/cx';
import ui from '../components/ui.module.css';

export function NotFoundPage() {
  return (
    <section className="wrap" style={{ paddingBlock: 'clamp(64px, 12vw, 160px)', display: 'grid', gap: 24, justifyItems: 'start' }}>
      <title>Сторінку не знайдено · Loyalty Path</title>
      <h1 style={{ fontSize: 'var(--fs-xl)' }}>Такої сторінки немає</h1>
      <p style={{ color: 'var(--ink-soft)', maxWidth: '48ch' }}>
        Можливо, посилання застаріло або модель зняли з продажу. Уся актуальна колекція на головній.
      </p>
      <Link to="/" className={cx(ui.btn, ui.solid)}>
        На головну
      </Link>
    </section>
  );
}
