import { useId, useState, type FormEvent } from 'react';
import { cx } from '../lib/cx';
import styles from './CallbackForm.module.css';
import ui from './ui.module.css';

type Errors = Partial<Record<'name' | 'phone', string>>;

/** Accepts +380XXXXXXXXX, 380…, or 0XXXXXXXXX with any spacing. */
function isUkrainianPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return (digits.length === 12 && digits.startsWith('380')) || (digits.length === 10 && digits.startsWith('0'));
}

export function CallbackForm() {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [sentTo, setSentTo] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();

    const next: Errors = {};
    if (!name) next.name = 'Вкажіть ім’я, щоб ми знали, як до вас звертатися.';
    if (!isUkrainianPhone(phone)) next.phone = 'Номер має бути у форматі +380 XX XXX XX XX.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSentTo(name);
    e.currentTarget.reset();
  }

  if (sentTo) {
    return (
      <div className={styles.done} role="status">
        <p>Дякуємо, {sentTo}. Зателефонуємо протягом робочого дня, з 10:00 до 19:00.</p>
        <button type="button" className={ui.link} onClick={() => setSentTo(null)}>
          Залишити ще одну заявку
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor={`${id}-name`}>Ім’я</label>
        <input
          id={`${id}-name`}
          name="name"
          type="text"
          autoComplete="given-name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${id}-name-err` : undefined}
        />
        {errors.name && (
          <span id={`${id}-name-err`} className={styles.error}>
            {errors.name}
          </span>
        )}
      </div>
      <div className={styles.field}>
        <label htmlFor={`${id}-phone`}>Телефон</label>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+380"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? `${id}-phone-err` : undefined}
        />
        {errors.phone && (
          <span id={`${id}-phone-err`} className={styles.error}>
            {errors.phone}
          </span>
        )}
      </div>
      <button type="submit" className={cx(ui.btn, ui.solid, styles.submit)}>
        Замовити дзвінок
      </button>
    </form>
  );
}
