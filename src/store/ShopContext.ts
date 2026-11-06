import { createContext, useContext } from 'react';
import type { CartLine } from './shop';

export interface ShopContextValue {
  cart: CartLine[];
  favourites: string[];
  count: number;
  subtotal: number;
  addToCart: (lines: Omit<CartLine, 'qty'>[], message: string) => void;
  setQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  toggleFavourite: (productId: string) => void;
  isFavourite: (productId: string) => boolean;
  toast: { id: number; message: string; kind: 'cart' | 'info' } | null;
  notify: (message: string, kind?: 'cart' | 'info') => void;
  dismissToast: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

export const ShopContext = createContext<ShopContextValue | null>(null);

export function useShop(): ShopContextValue {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used inside <ShopProvider>');
  return ctx;
}
