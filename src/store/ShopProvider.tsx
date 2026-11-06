import { useCallback, useEffect, useMemo, useReducer, useRef, useState, type ReactNode } from 'react';
import { getProduct } from '../data/products';
import { ShopContext, type ShopContextValue } from './ShopContext';
import { loadShop, saveShop, shopReducer, type CartLine } from './shop';

const TOAST_MS = 3200;

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(shopReducer, undefined, loadShop);
  const [toast, setToast] = useState<ShopContextValue['toast']>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => saveShop(state), [state]);
  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const notify = useCallback((message: string, kind: 'cart' | 'info' = 'info') => {
    window.clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message, kind });
    toastTimer.current = window.setTimeout(() => setToast(null), TOAST_MS);
  }, []);

  const addToCart = useCallback(
    (lines: Omit<CartLine, 'qty'>[], message: string) => {
      if (lines.length === 0) return;
      dispatch({ type: 'add', lines });
      notify(message, 'cart');
    },
    [notify],
  );

  const value = useMemo<ShopContextValue>(() => {
    const count = state.cart.reduce((n, l) => n + l.qty, 0);
    const subtotal = state.cart.reduce((sum, l) => sum + (getProduct(l.productId)?.price ?? 0) * l.qty, 0);
    return {
      cart: state.cart,
      favourites: state.favourites,
      count,
      subtotal,
      addToCart,
      setQty: (key, qty) => dispatch({ type: 'setQty', key, qty }),
      removeLine: (key) => dispatch({ type: 'remove', key }),
      toggleFavourite: (productId) => dispatch({ type: 'toggleFavourite', productId }),
      isFavourite: (productId) => state.favourites.includes(productId),
      toast,
      notify,
      dismissToast: () => setToast(null),
      cartOpen,
      setCartOpen,
    };
  }, [state, toast, cartOpen, addToCart, notify]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
