import { releaseDate, type DateBasis, type Release } from '../data/normalize';
import { daysBetween, isLeapYear } from './dates';

export interface OnThisDayItem {
  release: Release;
  date: string;
  yearsAgo: number;
  /** Days from the same calendar day in that year (0 for exact matches). */
  offsetDays: number;
}

export interface OnThisDayResult {
  exact: OnThisDayItem[];
  /** Filled only when there are no exact matches. */
  nearby: OnThisDayItem[];
  windowDays: number;
}

/**
 * Releases from earlier years on today's month-day. Feb 29 releases count on
 * Feb 28 when the current year is not a leap year. When nothing matches exactly, returns releases
 * within ±windowDays of today's month-day in earlier years instead.
 */
export function onThisDay(
  releases: Release[],
  basis: DateBasis,
  today: string,
  windowDays = 3,
): OnThisDayResult {
  const [ty, tm, td] = today.split('-').map(Number);
  const exact: OnThisDayItem[] = [];
  const nearby: OnThisDayItem[] = [];

  for (const release of releases) {
    const date = releaseDate(release, basis);
    const [y, m, d] = date.split('-').map(Number);
    if (y >= ty) continue;

    // Anchor: today's month-day in the release's year. A Feb 29 anchor in a
    // non-leap year rolls over to Mar 1, which keeps offsets sensible.
    const anchor = `${y}-${String(tm).padStart(2, '0')}-${String(td).padStart(2, '0')}`;
    let offset = daysBetween(anchor, date);

    const leapDayOnFeb28 = m === 2 && d === 29 && tm === 2 && td === 28 && !isLeapYear(ty);
    if (leapDayOnFeb28) offset = 0;

    const item = { release, date, yearsAgo: ty - y, offsetDays: offset };
    if (offset === 0) exact.push(item);
    else if (Math.abs(offset) <= windowDays) nearby.push(item);
  }

  const order = (a: OnThisDayItem, b: OnThisDayItem) =>
    a.yearsAgo - b.yearsAgo || Math.abs(a.offsetDays) - Math.abs(b.offsetDays) || a.release.name.localeCompare(b.release.name);

  return { exact: exact.sort(order), nearby: exact.length ? [] : nearby.sort(order), windowDays };
}
