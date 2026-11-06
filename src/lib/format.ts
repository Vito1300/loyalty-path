const thousands = /\B(?=(\d{3})+(?!\d))/g;

/** 1350 → "1 350 грн" (narrow no-break space between groups and before the currency). */
export function formatPrice(value: number): string {
  return `${String(value).replace(thousands, ' ')} грн`;
}

/** Ukrainian plural for "річ": 1 річ, 2 речі, 5 речей. */
export function pluralThings(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} річ`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} речі`;
  return `${n} речей`;
}

const MONTHS = [
  'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
  'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня',
];

export function formatDay(date: Date): string {
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

/** Adds working days (Mon–Fri) to a date. */
export function addWorkingDays(from: Date, days: number): Date {
  const d = new Date(from);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    const wd = d.getDay();
    if (wd !== 0 && wd !== 6) added += 1;
  }
  return d;
}

/** "7–11 листопада" or "28 листопада – 2 грудня". */
export function formatRange(a: Date, b: Date): string {
  if (a.getMonth() === b.getMonth()) return `${a.getDate()}–${b.getDate()} ${MONTHS[b.getMonth()]}`;
  return `${formatDay(a)} – ${formatDay(b)}`;
}

/** Dispatch window for made-to-order items: 2–4 working days from today. */
export function sewingWindow(today = new Date()) {
  return { from: addWorkingDays(today, 2), to: addWorkingDays(today, 4) };
}
