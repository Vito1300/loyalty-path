import briuky from '../assets/photos/briuky.jpg';
import dzhemperWhite from '../assets/photos/dzhemper-white.jpg';
import klasykaBack from '../assets/photos/klasyka-back.jpg';
import klasykaCollar from '../assets/photos/klasyka-collar.jpg';
import klasykaEmbroidery from '../assets/photos/klasyka-embroidery.jpg';
import klasykaFront from '../assets/photos/klasyka-front.jpg';
import klasykaPark from '../assets/photos/klasyka-park.jpg';
import klasykaPortrait from '../assets/photos/klasyka-portrait.jpg';
import klasykaStudio from '../assets/photos/klasyka-studio.jpg';

export type Category = 'kofty' | 'tees' | 'bottoms' | 'sets';

/** Outline used for the drawn placeholder when a product has no photo yet. */
export type Silhouette = 'zip' | 'fullzip' | 'sweat' | 'hoodie' | 'polo' | 'tee' | 'pants' | 'set';

export const SIZES = ['S', 'M', 'L', 'XL', '2XL'] as const;
export type Size = (typeof SIZES)[number];

export interface Colour {
  id: string;
  name: string;
  hex: string;
}

export interface Photo {
  src: string;
  alt: string;
  /** Wide (5:4) shots span both gallery columns. */
  wide?: boolean;
  /** CSS object-position, for crops that should keep the face or garment in frame. */
  focus?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  sku: string;
  category: Category;
  badge?: 'hit' | 'new';
  colours: Colour[];
  silhouette: Silhouette;
  photos: Photo[];
  summary: string;
  fabric: string;
  fit: string;
  /** Ids of products that complete the look on the product page. */
  pairsWith: string[];
}

const C = {
  black: { id: 'black', name: 'Чорний', hex: '#151515' },
  white: { id: 'white', name: 'Білий', hex: '#f7f6f2' },
  denim: { id: 'denim', name: 'Джинс', hex: '#34548a' },
  bordo: { id: 'bordo', name: 'Бордо', hex: '#5c1f2b' },
  graphite: { id: 'graphite', name: 'Графіт', hex: '#3b3c3e' },
} satisfies Record<string, Colour>;

const LOOP = 'Тринитка петля: 95% бавовна, 5% еластан';

export const PRODUCTS: Product[] = [
  {
    id: 'klasyka',
    name: 'Полузамок «Класика»',
    price: 1350,
    sku: 'MID-001',
    category: 'kofty',
    badge: 'hit',
    colours: [C.black, C.white, C.denim, C.bordo],
    silhouette: 'zip',
    photos: [
      { src: klasykaPortrait, alt: 'Модель у чорному полузамку «Класика» на тлі студійної стіни', wide: true },
      { src: klasykaFront, alt: 'Полузамок «Класика» на моделі, вигляд спереду' },
      { src: klasykaBack, alt: 'Полузамок «Класика» на моделі, вигляд ззаду' },
      { src: klasykaCollar, alt: 'Комір-стійка і металева блискавка полузамка' },
      { src: klasykaEmbroidery, alt: 'Вишитий знак LP тон у тон на грудях' },
      { src: klasykaPark, alt: 'Полузамок «Класика» з брюками, вулична зйомка', focus: '50% 30%', wide: true },
    ],
    summary:
      'Одна з найпопулярніших моделей Loyalty Path для прохолодної погоди. Комір із напівзамком змінює вигляд речі: застібніть вище для стриманішого образу або трохи розстібніть для вільнішого.',
    fabric: LOOP,
    fit: 'Класична, regular fit',
    pairsWith: ['briuky', 'polo'],
  },
  {
    id: 'polo',
    name: 'Поло на ґудзиках',
    price: 1100,
    sku: 'TOP-01',
    category: 'tees',
    badge: 'hit',
    colours: [C.black, C.white],
    silhouette: 'polo',
    photos: [],
    summary: 'Поло з короткою планкою на три ґудзики. Носіть окремо або під полузамок чи джемпер.',
    fabric: 'Піке: 100% бавовна',
    fit: 'Класична, regular fit',
    pairsWith: ['briuky', 'klasyka'],
  },
  {
    id: 'briuky',
    name: 'Casual брюки',
    price: 1500,
    sku: 'BTT-01',
    category: 'bottoms',
    badge: 'hit',
    colours: [C.black, C.graphite],
    silhouette: 'pants',
    photos: [{ src: briuky, alt: 'Чорні casual брюки на моделі з білими кедами' }],
    summary: 'Брюки з посадкою на поясі та защипами спереду. Тримають форму і не мнуться за день.',
    fabric: 'Костюмна тканина: 68% поліестер, 30% віскоза, 2% еластан',
    fit: 'Прямий крій, звужений до низу',
    pairsWith: ['klasyka', 'polo'],
  },
  {
    id: 'stiika',
    name: 'Полузамок «Стійка»',
    price: 1350,
    sku: 'MID-005',
    category: 'kofty',
    badge: 'new',
    colours: [C.black, C.graphite],
    silhouette: 'zip',
    photos: [],
    summary: 'Полузамок з вищим коміром-стійкою, що закриває шию у вітряну погоду.',
    fabric: LOOP,
    fit: 'Класична, regular fit',
    pairsWith: ['briuky', 'futbolka'],
  },
  {
    id: 'flow',
    name: 'Костюм FLOW',
    price: 3100,
    sku: 'SET-01',
    category: 'sets',
    colours: [C.black],
    silhouette: 'set',
    photos: [],
    summary: 'Худі й штани з однієї тканини, в одному тоні. Готовий образ, який не треба збирати.',
    fabric: LOOP,
    fit: 'Вільна посадка',
    pairsWith: ['futbolka'],
  },
  {
    id: 'dzhemper',
    name: 'Джемпер на повному замку',
    price: 1450,
    sku: 'MID-002',
    category: 'kofty',
    colours: [C.white, C.black],
    silhouette: 'fullzip',
    photos: [{ src: dzhemperWhite, alt: 'Білий джемпер на повному замку поверх білого поло', focus: '50% 30%' }],
    summary: 'Джемпер з коміром-стійкою і блискавкою на всю довжину. Розстебнутий працює як легка куртка.',
    fabric: LOOP,
    fit: 'Класична, regular fit',
    pairsWith: ['polo', 'dzhohery'],
  },
  {
    id: 'svitshot',
    name: 'Світшот з вишивкою',
    price: 1250,
    sku: 'MID-003',
    category: 'kofty',
    colours: [C.black, C.white],
    silhouette: 'sweat',
    photos: [],
    summary: 'Світшот прямого крою з вишитим знаком LP на грудях.',
    fabric: LOOP,
    fit: 'Класична, regular fit',
    pairsWith: ['briuky', 'dzhohery'],
  },
  {
    id: 'hudi',
    name: 'Худі з вишивкою',
    price: 1350,
    sku: 'MID-004',
    category: 'kofty',
    colours: [C.black],
    silhouette: 'hoodie',
    photos: [],
    summary: 'Худі з двошаровим капюшоном і кишенею-кенгуру.',
    fabric: LOOP,
    fit: 'Вільна посадка',
    pairsWith: ['dzhohery'],
  },
  {
    id: 'polozip',
    name: 'Поло на блискавці',
    price: 1100,
    sku: 'TOP-02',
    category: 'tees',
    colours: [C.black, C.white],
    silhouette: 'polo',
    photos: [],
    summary: 'Поло з короткою блискавкою замість ґудзиків.',
    fabric: 'Піке: 100% бавовна',
    fit: 'Класична, regular fit',
    pairsWith: ['briuky'],
  },
  {
    id: 'futbolka',
    name: 'Класична футболка',
    price: 500,
    sku: 'TOP-03',
    category: 'tees',
    colours: [C.white, C.black],
    silhouette: 'tee',
    photos: [],
    summary: 'Щільна футболка, яка не просвічує. База під полузамок і джемпер.',
    fabric: 'Кулір: 100% бавовна',
    fit: 'Класична, regular fit',
    pairsWith: ['klasyka', 'briuky'],
  },
  {
    id: 'dzhohery',
    name: 'Джогери',
    price: 1300,
    sku: 'BTT-02',
    category: 'bottoms',
    colours: [C.black],
    silhouette: 'pants',
    photos: [],
    summary: 'Джогери з манжетами внизу і шнурком на поясі.',
    fabric: LOOP,
    fit: 'Звужені до низу',
    pairsWith: ['hudi', 'svitshot'],
  },
];

export const CATEGORIES: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'Усі' },
  { id: 'kofty', label: 'Кофти' },
  { id: 'tees', label: 'Футболки й поло' },
  { id: 'bottoms', label: 'Низ' },
  { id: 'sets', label: 'Костюми' },
];

const byId = new Map(PRODUCTS.map((p) => [p.id, p]));

export function getProduct(id: string): Product | undefined {
  return byId.get(id);
}

export function requireProduct(id: string): Product {
  const p = byId.get(id);
  if (!p) throw new Error(`Unknown product: ${id}`);
  return p;
}

export const HERO_PHOTO = {
  src: klasykaStudio,
  alt: 'Модель у чорному полузамку «Класика» з вишитим знаком LP, за ним тінь емблеми на стіні',
};
export { klasykaEmbroidery, klasykaFront, klasykaBack, klasykaPark, dzhemperWhite, briuky as briukyPhoto };
