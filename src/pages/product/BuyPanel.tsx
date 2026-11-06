import { useId, useMemo, useRef, useState } from 'react';
import { HeartIcon, NeedleIcon } from '../../components/Icons';
import ui from '../../components/ui.module.css';
import { SIZES, type Product, type Size } from '../../data/products';
import { recommendSize, SIZE_CHART } from '../../data/sizeChart';
import { cx } from '../../lib/cx';
import { formatPrice, formatRange, sewingWindow } from '../../lib/format';
import { useShop } from '../../store/ShopContext';
import styles from './BuyPanel.module.css';

interface Props {
  product: Product;
  size: Size | null;
  onSizeChange: (size: Size) => void;
}

export function BuyPanel({ product, size, onSizeChange }: Props) {
  const { addToCart, toggleFavourite, isFavourite } = useShop();
  const id = useId();
  const sizesRef = useRef<HTMLFieldSetElement>(null);

  const [colourId, setColourId] = useState(product.colours[0].id);
  const [finderOpen, setFinderOpen] = useState(false);
  const [height, setHeight] = useState(180);
  const [weight, setWeight] = useState(78);
  const [sizeError, setSizeError] = useState(false);

  const colour = product.colours.find((c) => c.id === colourId) ?? product.colours[0];
  const advice = recommendSize(height, weight);
  const fav = isFavourite(product.id);
  const ship = useMemo(() => {
    const { from, to } = sewingWindow();
    return formatRange(from, to);
  }, []);
  const photographedColour = product.photos.length > 0 ? product.colours[0] : null;

  function pickSize(s: Size) {
    onSizeChange(s);
    setSizeError(false);
  }

  function handleAdd() {
    if (!size) {
      setSizeError(true);
      sizesRef.current?.querySelector('input')?.focus();
      return;
    }
    addToCart(
      [{ productId: product.id, colourId: colour.id, size }],
      `${product.name}, ${colour.name.toLowerCase()}, ${size}`,
    );
  }

  return (
    <aside className={styles.panel} aria-label="Купівля">
      <div className={styles.head}>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.price}>
          <strong className="num">{formatPrice(product.price)}</strong>
          <span>Арт. {product.sku}</span>
        </p>
      </div>

      <fieldset className={styles.opt}>
        <legend className={styles.legend}>
          Колір: <b>{colour.name}</b>
        </legend>
        <div className={styles.swatches}>
          {product.colours.map((c) => (
            <label key={c.id} className={styles.swatch} title={c.name}>
              <input
                type="radio"
                name={`${id}-colour`}
                value={c.id}
                checked={c.id === colour.id}
                onChange={() => setColourId(c.id)}
                aria-label={c.name}
              />
              <span style={{ background: c.hex }} />
            </label>
          ))}
        </div>
        {photographedColour && colour.id !== photographedColour.id && (
          <p className={styles.hint}>На фото {photographedColour.name.toLowerCase()} колір.</p>
        )}
      </fieldset>

      <fieldset
        ref={sizesRef}
        className={styles.opt}
        aria-invalid={sizeError}
        aria-describedby={sizeError ? `${id}-size-err` : undefined}
      >
        <legend className={styles.legend}>
          Розмір{size ? ': ' : ''}
          {size && <b>{size}</b>}
        </legend>
        <div className={styles.sizes}>
          {SIZES.map((s) => {
            const isRec = finderOpen && s === advice.size;
            return (
              <label key={s} className={cx(styles.size, isRec && styles.sizeRec)}>
                <input
                  type="radio"
                  name={`${id}-size`}
                  value={s}
                  checked={s === size}
                  onChange={() => pickSize(s)}
                  aria-label={isRec ? `${s}, радимо за вашими параметрами` : s}
                />
                <span>{s}</span>
              </label>
            );
          })}
        </div>
        {sizeError && (
          <p id={`${id}-size-err`} className={styles.error}>
            Оберіть розмір, щоб додати річ у кошик.
          </p>
        )}
        <button
          type="button"
          className={cx(ui.link, styles.finderToggle)}
          aria-expanded={finderOpen}
          aria-controls={`${id}-finder`}
          onClick={() => setFinderOpen((v) => !v)}
        >
          {finderOpen ? 'Сховати підбір' : 'Підібрати розмір'}
        </button>

        <div id={`${id}-finder`} className={styles.finder} hidden={!finderOpen}>
          <div className={styles.range}>
            <label htmlFor={`${id}-h`}>
              Зріст <b className="num">{height} см</b>
            </label>
            <input
              id={`${id}-h`}
              type="range"
              min={155}
              max={200}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </div>
          <div className={styles.range}>
            <label htmlFor={`${id}-w`}>
              Вага <b className="num">{weight} кг</b>
            </label>
            <input
              id={`${id}-w`}
              type="range"
              min={45}
              max={125}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
          </div>
          <div className={styles.result} aria-live="polite">
            <div>
              <span className={styles.resultSize}>{advice.size}</span>
              <p>{advice.note}</p>
            </div>
            <button
              type="button"
              className={cx(ui.btn, ui.outline, ui.small)}
              onClick={() => pickSize(advice.size)}
              disabled={size === advice.size}
            >
              {size === advice.size ? 'Обрано' : `Обрати ${advice.size}`}
            </button>
          </div>
        </div>
      </fieldset>

      <div className={styles.actions}>
        <button type="button" className={cx(ui.btn, ui.solid)} onClick={handleAdd}>
          Додати до кошика
        </button>
        <button
          type="button"
          className={cx(styles.favBtn, fav && styles.favOn)}
          aria-pressed={fav}
          aria-label={fav ? 'Прибрати з обраного' : 'Додати в обране'}
          onClick={() => toggleFavourite(product.id)}
        >
          <HeartIcon filled={fav} />
        </button>
      </div>

      <div className={styles.ship}>
        <NeedleIcon />
        <p>
          <b>Замовте сьогодні, відправимо {ship}.</b> Шиємо 2–4 робочі дні після підтвердження. Оплата повна або
          накладеним платежем із завдатком 200&nbsp;грн.
        </p>
      </div>

      <div className={styles.details}>
        <details open>
          <summary>Опис</summary>
          <div className={styles.body}>
            <p>{product.summary}</p>
            <p>
              Поєднуйте з кежуал і класичними брюками, джинсами, футболками та поло. Під кеди, кросівки чи лофери.
            </p>
          </div>
        </details>
        <details>
          <summary>Тканина й посадка</summary>
          <div className={styles.body}>
            <dl className={styles.specs}>
              <dt>Тканина</dt>
              <dd>{product.fabric}</dd>
              <dt>Посадка</dt>
              <dd>{product.fit}</dd>
              <dt>Розміри</dt>
              <dd>{SIZES.join(', ')}</dd>
              <dt>Догляд</dt>
              <dd>Прання при 30°, навиворіт. Не відбілювати.</dd>
            </dl>
          </div>
        </details>
        <details>
          <summary>Розмірна сітка</summary>
          <div className={styles.body}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Розмір</th>
                    <th scope="col">Зріст, см</th>
                    <th scope="col">Вага, кг</th>
                    <th scope="col">Груди, см</th>
                    <th scope="col">Довжина, см</th>
                    <th scope="col">Рукав, см</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_CHART.map((r) => (
                    <tr key={r.size} className={r.size === size ? styles.rowOn : undefined}>
                      <th scope="row">{r.size}</th>
                      <td>до {r.maxHeight}</td>
                      <td>
                        {r.weight[0]}–{r.weight[1]}
                      </td>
                      <td>{r.chest}</td>
                      <td>{r.length}</td>
                      <td>{r.sleeve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={styles.hint}>Груди виміряно як напівобхват готового виробу.</p>
          </div>
        </details>
        <details>
          <summary>Доставка, обмін і повернення</summary>
          <div className={styles.body}>
            <p>
              Новою поштою у відділення, поштомат або кур’єром. Від 3&nbsp;000&nbsp;грн при повній передоплаті
              доставка безкоштовна.
            </p>
            <p>
              14 днів на обмін або повернення, якщо річ не носили, а бирки на місці. Виробничий дефект усунемо
              безкоштовно.
            </p>
          </div>
        </details>
      </div>
    </aside>
  );
}
