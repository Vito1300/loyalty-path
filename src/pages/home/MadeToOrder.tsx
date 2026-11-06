import { useState } from 'react';
import { addWorkingDays, formatDay, formatRange, sewingWindow } from '../../lib/format';
import styles from './MadeToOrder.module.css';

/** The order timeline, with real dates counted from today. */
export function MadeToOrder() {
  // Dates are fixed for the lifetime of the page; no need to recompute per render.
  const [steps] = useState(() => {
    const today = new Date();
    const { from, to } = sewingWindow(today);
    const deliveredBy = addWorkingDays(to, 2);
    return [
      {
        when: `Сьогодні, ${formatDay(today)}`,
        title: 'Замовлення',
        text: 'Обираєте модель, колір і розмір. Оплачуєте повністю або накладеним платежем із завдатком 200 грн.',
      },
      {
        when: `До ${formatRange(from, to)}`,
        title: 'Пошив',
        text: 'Шиємо після підтвердження та оплати. Якщо модель є в наявності, відправляємо того ж дня.',
      },
      {
        when: `Орієнтовно до ${formatDay(deliveredBy)}`,
        title: 'Доставка',
        text: 'Новою поштою у відділення, поштомат або кур’єром. Від 3 000 грн при повній передоплаті безкоштовно.',
      },
      {
        when: '14 днів після отримання',
        title: 'Примірка',
        text: 'Якщо не підійшло, обміняємо або повернемо гроші. Річ без слідів носіння, бирки на місці.',
      },
    ];
  });

  return (
    <section id="made-to-order" className={styles.band} aria-labelledby="mto-title">
      <div className="wrap">
        <div className={styles.head}>
          <h2 id="mto-title" className="section-title">
            Шиємо під вас
          </h2>
          <p>
            Ми не тримаємо склад. Річ кроять і шиють після вашого замовлення, тому вона нова, а не з полиці.
          </p>
        </div>

        <ol className={styles.steps}>
          {steps.map((s, i) => (
            <li key={s.title} className={styles.step}>
              <span className={styles.n} aria-hidden="true">
                Крок {i + 1}
              </span>
              <h3>{s.title}</h3>
              <p className={styles.when}>{s.when}</p>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
