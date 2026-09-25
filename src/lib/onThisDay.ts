import { releaseDate, type DateBasis, type Release } from '../data/normalize';

export interface OnThisDayItem {
  release: Release;
  date: string;
  yearsAgo: number;
}

export interface OnThisDayResult {
  exact: OnThisDayItem[];
}

/** Releases from earlier years on today's exact month and day. */
export function onThisDay(releases: Release[], basis: DateBasis, today: string): OnThisDayResult {
  const year = Number(today.slice(0, 4));
  const exact = releases.flatMap((release) => {
    const date = releaseDate(release, basis);
    const releaseYear = Number(date.slice(0, 4));
    return releaseYear < year && date.slice(5) === today.slice(5)
      ? [{ release, date, yearsAgo: year - releaseYear }]
      : [];
  });
  exact.sort((a, b) => a.yearsAgo - b.yearsAgo || a.release.name.localeCompare(b.release.name));
  return { exact };
}
