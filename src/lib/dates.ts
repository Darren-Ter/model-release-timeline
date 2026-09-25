const DAY_MS = 86_400_000;

/** Calendar day (YYYY-MM-DD) → epoch day number. Timezone-free by construction. */
export function toDayNumber(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / DAY_MS);
}

export function fromDayNumber(n: number): string {
  return new Date(n * DAY_MS).toISOString().slice(0, 10);
}

/** Whole days from a to b (positive when b is later). */
export function daysBetween(a: string, b: string): number {
  return toDayNumber(b) - toDayNumber(a);
}

export function addDays(iso: string, n: number): string {
  return fromDayNumber(toDayNumber(iso) + n);
}

/** The viewer's local calendar date. */
export function localToday(now: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export function formatGap(days: number): string {
  const n = Math.abs(days);
  if (n === 0) return 'Same day';
  return `${n.toLocaleString()} ${n === 1 ? 'day' : 'days'}`;
}

const dateFmt = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
const monthFmt = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', timeZone: 'UTC' });
const weekdayFmt = new Intl.DateTimeFormat('en', { weekday: 'short', timeZone: 'UTC' });

const asUtc = (iso: string) => new Date(`${iso}T00:00:00Z`);

export const formatDate = (iso: string) => dateFmt.format(asUtc(iso));
export const formatMonth = (iso: string) => monthFmt.format(asUtc(iso));
export const formatWeekday = (iso: string) => weekdayFmt.format(asUtc(iso));

export function isLeapYear(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}
