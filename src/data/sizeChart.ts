import type { Size } from './products';

export interface SizeRow {
  size: Size;
  /** Upper height bound, cm. */
  maxHeight: number;
  /** Weight range, kg. */
  weight: [number, number];
  chest: number;
  length: number;
  sleeve: number;
}

export const SIZE_CHART: SizeRow[] = [
  { size: 'S', maxHeight: 170, weight: [50, 64], chest: 57, length: 68, sleeve: 78 },
  { size: 'M', maxHeight: 178, weight: [60, 76], chest: 59, length: 70, sleeve: 80 },
  { size: 'L', maxHeight: 184, weight: [74, 90], chest: 61, length: 72, sleeve: 82 },
  { size: 'XL', maxHeight: 192, weight: [88, 105], chest: 63, length: 74, sleeve: 84 },
  { size: '2XL', maxHeight: 198, weight: [100, 120], chest: 65, length: 76, sleeve: 86 },
];

export interface SizeAdvice {
  size: Size;
  note: string;
  /** True when height or weight falls outside the chart. */
  outside: boolean;
}

/** Picks the larger of the height-based and weight-based size. */
export function recommendSize(height: number, weight: number): SizeAdvice {
  const last = SIZE_CHART.length - 1;
  let hi = SIZE_CHART.findIndex((r) => height <= r.maxHeight);
  let wi = SIZE_CHART.findIndex((r) => weight <= r.weight[1]);
  const outside = hi < 0 || wi < 0;
  if (hi < 0) hi = last;
  if (wi < 0) wi = last;
  const size = SIZE_CHART[Math.max(hi, wi)].size;

  let note: string;
  if (outside) note = 'Ваші параметри за межами таблиці. Напишіть нам у Telegram, підкажемо.';
  else if (hi === wi) note = 'Збігається і за зростом, і за вагою.';
  else note = `За зростом підходить ${SIZE_CHART[hi].size}, за вагою ${SIZE_CHART[wi].size}. Радимо більший.`;

  return { size, note, outside };
}
