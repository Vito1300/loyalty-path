import styles from './Marquee.module.css';

const FACTS = [
  'Пошив під замовлення за 2–4 робочі дні',
  'Доставка Новою поштою по всій Україні',
  'Безкоштовна доставка від 3 000 грн',
  'Обмін і повернення 14 днів',
  'Оплата повна або накладеним платежем',
];

/** Scrolling strip of service facts. Screen readers get the list once, without the motion. */
export function Marquee() {
  const group = (hidden: boolean) => (
    <ul className={styles.group} aria-hidden={hidden || undefined}>
      {FACTS.map((f) => (
        <li key={f}>{f}</li>
      ))}
    </ul>
  );

  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
