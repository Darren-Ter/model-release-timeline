import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { normalizeFiles, releaseDate, releaseEvent, eventDatetime, displayEventDatetime } from '../data/normalize';
import { releases } from '../data/load';
import { TimelineList } from '../components/TimelineList';
import { ReleaseDrawer } from '../components/ReleaseDrawer';
import { FilterBar } from '../components/FilterBar';
import { dateInTimezone, formatTimestamp, todayInTimezone, type DisplayTimezone } from './dates';
import { applyFilters, DEFAULT_FILTERS, hasActiveFilters } from './filter';
import { adjacentGaps, gapStats } from './gaps';
import { onThisDay } from './onThisDay';
import { fromUrl, toUrl } from '../state/useFilters';

const noop = () => {};
const haiku = releases.find((r) => r.id === 'claude-haiku-5-5')!;

describe('display timezones', () => {
  it.each([
    ['utc8', '2026-10-08', '08 Oct 2026, 02:01', 'UTC+8', 'Thu'],
    ['pt', '2026-10-07', '07 Oct 2026, 11:01', 'PDT', 'Wed'],
    ['et', '2026-10-07', '07 Oct 2026, 14:01', 'EDT', 'Wed'],
  ] as const)('keeps the %s card, weekday, post and details consistent across midnight', (timezone, date, timestamp, label, weekday) => {
    expect(releaseDate(haiku, 'announcement', timezone)).toBe(date);
    const card = renderToStaticMarkup(<TimelineList releases={[haiku]} basis="announcement" timezone={timezone}
      sort="desc" showGaps={false} daysSinceLatest={null} today="2026-10-15" labColor={() => '#777'} onSelect={noop} />);
    expect(card).toContain(`<time dateTime="${date}">`);
    expect(card).toContain(`<span class="rcard-when">${weekday} · `);
    expect(card).toContain(`<time dateTime="${haiku.announcementXDatetime}">${timestamp}</time>`);
    expect(card).not.toContain(label);
    const drawer = renderToStaticMarkup(<ReleaseDrawer release={haiku} timezone={timezone} labColor={() => '#777'} onClose={noop} />);
    expect(drawer).toContain(`${weekday}, ${timestamp} ${label}`);
    expect(haiku.announcementDate).toBe('2026-10-07');
    expect(releaseEvent(haiku, 'announcement')?.datetime).toBeNull();
  });

  it.each([
    ['utc8', '15:00'],
    ['pt', '00:00'],
    ['et', '03:00'],
  ] as const)('uses the PDT assumption for availability in %s without borrowing the announcement time', (timezone, time) => {
    const availability = releaseEvent(haiku, 'availability')!;
    expect(eventDatetime(haiku, availability)).toBeNull();
    expect(displayEventDatetime(haiku, availability)).toBe('2026-10-07T00:00:00-07:00');
    expect(releaseDate(haiku, 'availability', timezone)).toBe('2026-10-07');
    const card = renderToStaticMarkup(<TimelineList releases={[haiku]} basis="availability" timezone={timezone}
      sort="desc" showGaps={false} daysSinceLatest={null} today="2026-10-15" labColor={() => '#777'} onSelect={noop} />);
    expect(card).toContain(`Wed · ~${time}</span>`);
    expect(card).not.toContain('Source date');
    const drawer = renderToStaticMarkup(<ReleaseDrawer release={haiku} timezone={timezone} labColor={() => '#777'} onClose={noop} />);
    expect(drawer).toContain('Assumed 00:00 PDT (UTC−7)');
    expect(availability.datetime).toBeNull();
  });

  it.each([
    ['pt', '2026-03-08T09:59:00Z', '08 Mar 2026, 01:59 PST'],
    ['pt', '2026-03-08T10:00:00Z', '08 Mar 2026, 03:00 PDT'],
    ['et', '2026-03-08T06:59:00Z', '08 Mar 2026, 01:59 EST'],
    ['et', '2026-03-08T07:00:00Z', '08 Mar 2026, 03:00 EDT'],
    ['pt', '2026-11-01T08:59:00Z', '01 Nov 2026, 01:59 PDT'],
    ['pt', '2026-11-01T09:00:00Z', '01 Nov 2026, 01:00 PST'],
    ['et', '2026-11-01T05:59:00Z', '01 Nov 2026, 01:59 EDT'],
    ['et', '2026-11-01T06:00:00Z', '01 Nov 2026, 01:00 EST'],
  ] as const)('handles %s daylight saving at %s', (timezone, datetime, expected) => {
    expect(formatTimestamp(datetime, timezone)).toBe(expected);
  });

  it('uses the selected day for today at a year boundary, independent of the browser timezone', () => {
    const instant = new Date('2025-12-31T18:00:00Z');
    expect(todayInTimezone('utc8', instant)).toBe('2026-01-01');
    expect(todayInTimezone('pt', instant)).toBe('2025-12-31');
    expect(todayInTimezone('et', instant)).toBe('2025-12-31');
    expect(dateInTimezone(instant)).toBe('2026-01-01');
  });

  it('converts event timestamps consistently for filtering, sorting, gaps, stats and anniversaries', () => {
    const { releases: fixture } = normalizeFiles({ fixture: { models: [
      { id: 'timed', name: 'Timed', company: 'Lab', events: [
        { type: 'announcement', source_date: '2025-12-31', datetime_utc8: '2026-01-01T02:00:00+08:00', precision: 'timestamp' },
        { type: 'availability', source_date: '2025-12-31', is_first_availability: true },
      ] },
      { id: 'source-only', name: 'Source only', company: 'Lab', events: [
        { type: 'announcement', source_date: '2026-01-01' },
      ] },
    ] } });
    const [timed] = fixture;
    expect(releaseDate(timed, 'announcement')).toBe('2026-01-01');
    expect(releaseDate(timed, 'announcement', 'pt')).toBe('2025-12-31');
    expect(releaseDate(timed, 'availability', 'pt')).toBe('2025-12-30');
    expect(applyFilters(fixture, { ...DEFAULT_FILTERS, from: '2026-01-01', to: '2026-01-01' })).toHaveLength(2);
    const pacific = applyFilters(fixture, { ...DEFAULT_FILTERS, timezone: 'pt' });
    expect(pacific.map((r) => r.id)).toEqual(['source-only', 'timed']);
    expect(applyFilters(fixture, { ...DEFAULT_FILTERS, timezone: 'pt', from: '2026-01-01' })).toEqual([]);
    expect(adjacentGaps(fixture, 'announcement')).toEqual([0]);
    expect(adjacentGaps(pacific, 'announcement', 'pt')).toEqual([0]);
    expect(gapStats([timed], 'announcement', '2026-01-02').daysSinceLatest).toBe(1);
    expect(gapStats([timed], 'announcement', '2026-01-02', 'pt').daysSinceLatest).toBe(2);
    expect(onThisDay([timed], 'announcement', '2027-01-01').exact[0].yearsAgo).toBe(1);
    expect(onThisDay([timed], 'announcement', '2026-12-31', 'pt').exact[0].yearsAgo).toBe(1);
  });

  it.each(['pt', 'et'] as const)('converts teaser and launch timestamps together in %s without changing elapsed lead time', (timezone) => {
    const gemini = releases.find((r) => r.id === 'gemini-3-1-pro')!;
    const drawer = renderToStaticMarkup(<ReleaseDrawer release={gemini} timezone={timezone} labColor={() => '#777'} onClose={noop} />);
    expect(drawer).toContain(formatTimestamp(gemini.teaser!.datetime, timezone, { weekday: true }));
    expect(drawer).toContain(formatTimestamp(gemini.teaser!.announcementDatetime, timezone, { weekday: true }));
    expect(drawer).toContain('<strong>14h 12m</strong>');
    expect(drawer).not.toContain('UTC+8');
  });
});

describe('date-only PDT display assumption', () => {
  const { releases: [release] } = normalizeFiles({ fixture: { models: [
    { id: 'date-only', name: 'Date only', company: 'Lab', events: [
      { type: 'announcement', source_date: '2026-01-01', display_date: '2026-01-02' },
    ] },
  ] } });

  it.each([
    ['utc8', '2026-01-01', 'Thu', '15:00'],
    ['pt', '2025-12-31', 'Wed', '23:00'],
    ['et', '2026-01-01', 'Thu', '02:00'],
  ] as const)('converts the original source date in %s using fixed PDT, including winter', (timezone, date, weekday, time) => {
    expect(releaseDate(release, 'announcement', timezone)).toBe(date);
    expect(release.events[0].sourceDate).toBe('2026-01-01');
    expect(release.events[0].date).toBe('2026-01-02');
    expect(release.events[0].datetime).toBeNull();
    expect(release.events[0].approximate).toBe(true);
    const card = renderToStaticMarkup(<TimelineList releases={[release]} basis="announcement" timezone={timezone}
      sort="desc" showGaps={false} daysSinceLatest={null} today="2026-10-15" labColor={() => '#777'} onSelect={noop} />);
    expect(card).toContain(`<time dateTime="${date}">`);
    expect(card).toContain(`${weekday} · ~${time}</span>`);
    expect(card).toContain(timezone === 'pt' ? '<span>2025</span>' : '<span>2026</span>');
    expect(card).toContain(timezone === 'pt' ? '<span>December</span>' : '<span>January</span>');
    const drawer = renderToStaticMarkup(<ReleaseDrawer release={release} timezone={timezone} labColor={() => '#777'} onClose={noop} />);
    expect(drawer).toContain(time);
    expect(drawer).toContain('Assumed 00:00 PDT (UTC−7)');
  });

  it('uses the converted assumed date for year filters and anniversaries', () => {
    expect(applyFilters([release], { ...DEFAULT_FILTERS, from: '2026-01-01', to: '2026-01-01' })).toEqual([release]);
    expect(applyFilters([release], { ...DEFAULT_FILTERS, timezone: 'pt', from: '2026-01-01' })).toEqual([]);
    expect(onThisDay([release], 'announcement', '2026-12-31', 'pt').exact[0].yearsAgo).toBe(1);
    expect(onThisDay([release], 'announcement', '2027-01-01').exact[0].yearsAgo).toBe(1);
  });
});

describe('timezone control and shared URLs', () => {
  it('defaults to UTC+8 and safely rejects unsupported timezone parameters', () => {
    for (const search of ['', '?tz=unknown', '?tz=toString', '?tz=__proto__']) {
      expect(fromUrl(search).timezone).toBe('utc8');
    }
    expect(hasActiveFilters({ ...DEFAULT_FILTERS, timezone: 'pt' })).toBe(false);
  });

  it.each(['pt', 'et'] as DisplayTimezone[])('round-trips %s and other filters without losing the deployment path', (timezone) => {
    const filters = { ...DEFAULT_FILTERS, timezone, query: 'Claude Haiku', from: '2026-10-01', basis: 'availability' as const };
    const url = toUrl(filters, '/model-timeline/');
    expect(url).toContain('/model-timeline/?');
    expect(fromUrl(new URL(url, 'https://example.com').search)).toEqual(filters);
    expect(toUrl({ ...DEFAULT_FILTERS, timezone }, '/model-timeline/')).toBe(`/model-timeline/?tz=${timezone}`);
    expect(toUrl(DEFAULT_FILTERS, '/model-timeline/')).toBe('/model-timeline/');
  });

  it('renders an accessible timezone selector with the three choices', () => {
    const markup = renderToStaticMarkup(<FilterBar filters={DEFAULT_FILTERS} update={noop} reset={noop} activeCount={0}
      labs={[]} kinds={[]} channels={[]} years={[]} today="2026-10-15" statsOpen={false} onToggleStats={noop} />);
    expect(markup).toContain('<span>Timezone</span><select>');
    expect(markup).toContain('<option value="utc8" selected="">UTC+8 · Malaysia</option>');
    expect(markup).toContain('PT · Pacific (PDT/PST)');
    expect(markup).toContain('ET · Eastern (EDT/EST)');
  });
});
