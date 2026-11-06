import { useEffect, useRef, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import { CloseIcon } from './Icons';
import styles from './Sheet.module.css';
import ui from './ui.module.css';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  side?: 'left' | 'right';
  children: ReactNode;
  footer?: ReactNode;
}

/**
 * Side panel built on the native <dialog>: focus trapping, Esc to close and
 * inert page content come from the browser.
 */
export function Sheet({ open, onClose, title, side = 'right', children, footer }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={cx(styles.sheet, side === 'left' && styles.left)}
      aria-label={title}
      onClose={onClose}
      onClick={(e) => {
        // A click on the backdrop lands on the <dialog> element itself.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.panel}>
        <header className={styles.head}>
          <h2 className={styles.title}>{title}</h2>
          <button type="button" className={ui.iconBtn} onClick={onClose} aria-label="Закрити">
            <CloseIcon />
          </button>
        </header>
        <div className={styles.body}>{children}</div>
        {footer && <footer className={styles.foot}>{footer}</footer>}
      </div>
    </dialog>
  );
}
