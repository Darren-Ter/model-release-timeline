import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_FILTERS, type Filters } from '../lib/filter';
import { DEFAULT_TIMEZONE, isDisplayTimezone } from '../lib/dates';

const isDate = (v: string | null) => (v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null);
const list = (v: string | null) => (v ? v.split(',').filter(Boolean) : []);

export function fromUrl(search: string): Filters {
  const p = new URLSearchParams(search);
  const timezone = p.get('tz');
  return {
    query: p.get('q') ?? '',
    labs: list(p.get('lab')),
    kinds: list(p.get('kind')),
    channels: list(p.get('channel')),
    from: isDate(p.get('from')),
    to: isDate(p.get('to')),
    basis: p.get('basis') === 'availability' ? 'availability' : 'announcement',
    sort: p.get('sort') === 'asc' ? 'asc' : 'desc',
    timezone: isDisplayTimezone(timezone) ? timezone : DEFAULT_TIMEZONE,
  };
}

export function toUrl(f: Filters, pathname: string): string {
  const p = new URLSearchParams();
  if (f.query) p.set('q', f.query);
  if (f.labs.length) p.set('lab', f.labs.join(','));
  if (f.kinds.length) p.set('kind', f.kinds.join(','));
  if (f.channels.length) p.set('channel', f.channels.join(','));
  if (f.from) p.set('from', f.from);
  if (f.to) p.set('to', f.to);
  if (f.basis !== DEFAULT_FILTERS.basis) p.set('basis', f.basis);
  if (f.sort !== DEFAULT_FILTERS.sort) p.set('sort', f.sort);
  if (f.timezone !== DEFAULT_FILTERS.timezone) p.set('tz', f.timezone);
  const s = p.toString();
  return `${pathname}${s ? `?${s}` : ''}`;
}

/** Filter state mirrored into the query string so any view can be shared by URL. */
export function useFilters() {
  const [filters, setFilters] = useState<Filters>(() => fromUrl(window.location.search));

  useEffect(() => {
    const next = toUrl(filters, window.location.pathname);
    if (next !== `${window.location.pathname}${window.location.search}`) window.history.replaceState(null, '', next + window.location.hash);
  }, [filters]);

  useEffect(() => {
    const onPop = () => setFilters(fromUrl(window.location.search));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const update = useCallback((patch: Partial<Filters>) => setFilters((f) => ({ ...f, ...patch })), []);
  const reset = useCallback(
    () => setFilters((f) => ({ ...DEFAULT_FILTERS, basis: f.basis, sort: f.sort, timezone: f.timezone })),
    [],
  );

  return { filters, update, reset };
}
