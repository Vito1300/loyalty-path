import { useShop } from '../store/ShopContext';
import styles from './Toast.module.css';

export function Toast() {
  const { toast, dismissToast, setCartOpen } = useShop();

  return (
    <div className={styles.region} role="status" aria-live="polite">
      {toast && (
        <div key={toast.id} className={styles.toast}>
          <span>
            {toast.kind === 'cart' ? <>Додано в кошик: {toast.message}</> : toast.message}
          </span>
          {toast.kind === 'cart' && (
            <button
              type="button"
              onClick={() => {
                dismissToast();
                setCartOpen(true);
              }}
            >
              Відкрити кошик
            </button>
          )}
        </div>
      )}
    </div>
  );
}
