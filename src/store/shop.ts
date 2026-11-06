import type { Size } from '../data/products';

export interface CartLine {
  productId: string;
  colourId: string;
  size: Size;
  qty: number;
}

export interface ShopState {
  cart: CartLine[];
  favourites: string[];
}

export type ShopAction =
  | { type: 'add'; lines: Omit<CartLine, 'qty'>[] }
  | { type: 'setQty'; key: string; qty: number }
  | { type: 'remove'; key: string }
  | { type: 'toggleFavourite'; productId: string };

export const lineKey = (l: Pick<CartLine, 'productId' | 'colourId' | 'size'>) =>
  `${l.productId}:${l.colourId}:${l.size}`;

export const MAX_QTY = 9;

export function shopReducer(state: ShopState, action: ShopAction): ShopState {
  switch (action.type) {
    case 'add': {
      const cart = [...state.cart];
      for (const incoming of action.lines) {
        const key = lineKey(incoming);
        const i = cart.findIndex((l) => lineKey(l) === key);
        if (i >= 0) cart[i] = { ...cart[i], qty: Math.min(MAX_QTY, cart[i].qty + 1) };
        else cart.push({ ...incoming, qty: 1 });
      }
      return { ...state, cart };
    }
    case 'setQty': {
      if (action.qty <= 0) return shopReducer(state, { type: 'remove', key: action.key });
      const qty = Math.min(MAX_QTY, action.qty);
      return { ...state, cart: state.cart.map((l) => (lineKey(l) === action.key ? { ...l, qty } : l)) };
    }
    case 'remove':
      return { ...state, cart: state.cart.filter((l) => lineKey(l) !== action.key) };
    case 'toggleFavourite': {
      const has = state.favourites.includes(action.productId);
      return {
        ...state,
        favourites: has
          ? state.favourites.filter((id) => id !== action.productId)
          : [...state.favourites, action.productId],
      };
    }
  }
}

const STORAGE_KEY = 'lp-shop-v1';
export const EMPTY: ShopState = { cart: [], favourites: [] };

export function loadShop(): ShopState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<ShopState>;
    return {
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
      favourites: Array.isArray(parsed.favourites) ? parsed.favourites : [],
    };
  } catch {
    return EMPTY;
  }
}

export function saveShop(state: ShopState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage can be unavailable (private mode); the cart still works for this visit */
  }
}

export const FREE_SHIPPING_FROM = 3000;
