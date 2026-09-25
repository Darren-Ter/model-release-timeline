import { releaseDate, type DateBasis, type Release } from '../data/normalize';

export type SortOrder = 'desc' | 'asc';

export interface Filters {
  query: string;
  labs: string[]; // empty = all
  kinds: string[]; // empty = all
  channels: string[]; // empty = all
  from: string | null; // inclusive YYYY-MM-DD
  to: string | null; // inclusive YYYY-MM-DD
  basis: DateBasis;
  sort: SortOrder;
}

export const DEFAULT_FILTERS: Filters = {
  query: '',
  labs: [],
  kinds: [],
  channels: [],
  from: null,
  to: null,
  basis: 'announcement',
  sort: 'desc',
};

/** True when anything narrows the set (basis and sort don't count). */
export function hasActiveFilters(f: Filters): boolean {
  return Boolean(f.query.trim() || f.labs.length || f.kinds.length || f.channels.length || f.from || f.to);
}

export function matchesQuery(r: Release, query: string): boolean {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  return tokens.every((t) => r.searchText.includes(t));
}

export function applyFilters(releases: Release[], f: Filters): Release[] {
  const out = releases.filter((r) => {
    if (f.labs.length && !f.labs.includes(r.lab)) return false;
    if (f.kinds.length && !f.kinds.includes(r.kind)) return false;
    if (f.channels.length && !r.channels.some((c) => f.channels.includes(c))) return false;
    const d = releaseDate(r, f.basis);
    if (f.from && d < f.from) return false;
    if (f.to && d > f.to) return false;
    return matchesQuery(r, f.query);
  });
  return sortReleases(out, f.basis, f.sort);
}

export function sortReleases(releases: Release[], basis: DateBasis, sort: SortOrder): Release[] {
  const dir = sort === 'asc' ? 1 : -1;
  return [...releases].sort((a, b) => {
    const c = releaseDate(a, basis).localeCompare(releaseDate(b, basis));
    if (c !== 0) return c * dir;
    return a.lab.localeCompare(b.lab) || a.name.localeCompare(b.name);
  });
}

/** Distinct values with counts, most common first — used to build filter options from data. */
export function facet(releases: Release[], pick: (r: Release) => string[]): { value: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const r of releases) for (const v of new Set(pick(r))) counts.set(v, (counts.get(v) ?? 0) + 1);
  return [...counts]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
}
