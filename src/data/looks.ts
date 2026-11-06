import { dzhemperWhite, klasykaPark } from './products';

export interface LookSpot {
  productId: string;
  colourId: string;
  /** Position on the photo, in percent. */
  x: number;
  y: number;
}

export interface Look {
  id: string;
  title: string;
  photo: string;
  alt: string;
  focus?: string;
  spots: LookSpot[];
}

export const LOOKS: Look[] = [
  {
    id: 'park',
    title: 'Полузамок і брюки',
    photo: klasykaPark,
    alt: 'Чоловік у чорному полузамку «Класика» і чорних брюках у парку',
    spots: [
      { productId: 'klasyka', colourId: 'black', x: 64, y: 52 },
      { productId: 'briuky', colourId: 'black', x: 47, y: 90 },
    ],
  },
  {
    id: 'white',
    title: 'Білий джемпер і поло',
    photo: dzhemperWhite,
    alt: 'Чоловік у білому джемпері на повному замку поверх білого поло',
    spots: [
      { productId: 'dzhemper', colourId: 'white', x: 79, y: 45 },
      { productId: 'polo', colourId: 'white', x: 60, y: 62 },
    ],
  },
];
