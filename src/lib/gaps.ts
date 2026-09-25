import { releaseDate, type DateBasis, type Release } from '../data/normalize';
import { daysBetween } from './dates';

export interface GapStats {
  count: number;
  latest: Release | null;
  daysSinceLatest: number | null;
  medianGap: number | null;
  longest: { days: number; from: Release; to: Release } | null;
}

/**
 * Day gaps between neighbours of an already-sorted list: result[i] is the gap
 * between list[i] and list[i + 1], always non-negative.
 */
export function adjacentGaps(list: Release[], basis: DateBasis): number[] {
  return list.slice(1).map((r, i) => Math.abs(daysBetween(releaseDate(list[i], basis), releaseDate(r, basis))));
}

export function gapStats(releases: Release[], basis: DateBasis, today: string): GapStats {
  if (!releases.length) return { count: 0, latest: null, daysSinceLatest: null, medianGap: null, longest: null };

  const chrono = [...releases].sort((a, b) => releaseDate(a, basis).localeCompare(releaseDate(b, basis)));
  const latest = chrono[chrono.length - 1];
  const gaps: number[] = [];
  let longest: GapStats['longest'] = null;

  for (let i = 1; i < chrono.length; i++) {
    const days = daysBetween(releaseDate(chrono[i - 1], basis), releaseDate(chrono[i], basis));
    gaps.push(days);
    if (!longest || days > longest.days) longest = { days, from: chrono[i - 1], to: chrono[i] };
  }

  let medianGap: number | null = null;
  if (gaps.length) {
    const s = [...gaps].sort((a, b) => a - b);
    const mid = Math.floor(s.length / 2);
    medianGap = s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
  }

  return {
    count: releases.length,
    latest,
    daysSinceLatest: daysBetween(releaseDate(latest, basis), today),
    medianGap,
    longest,
  };
}
