import type { To } from 'react-router-dom';

/** Link to the home collection grid, filtered by category ("all", "fav" or a category id). */
export const collectionLink = (cat: string): To => ({ pathname: '/', search: `?cat=${cat}`, hash: '#collection' });

export const SOCIAL = {
  instagram: 'https://www.instagram.com/loyalty.path',
  tiktok: 'https://www.tiktok.com/@loyaltypath',
  instagramHandle: '@loyalty.path',
  tiktokHandle: '@loyaltypath',
};
