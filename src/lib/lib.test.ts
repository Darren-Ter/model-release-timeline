import { describe, expect, it } from 'vitest';
import rootFile from '../../model-releases.json';
import { normalizeFiles, type Release } from '../data/normalize';
import { applyFilters, DEFAULT_FILTERS, facet } from './filter';
import { adjacentGaps, gapStats } from './gaps';
import { onThisDay } from './onThisDay';
import { buildLabs } from './labColors';
import { daysBetween, formatGap } from './dates';

const ev = (type: string, date: string, extra: Record<string, unknown> = {}) => ({
  type,
  source_date: date,
  display_date: date,
  precision: 'date_only',
  ...extra,
});

const model = (id: string, company: string, ann: string, avail = ann, extra: Record<string, unknown> = {}) => ({
  id,
  company,
  name: id,
  release_kind: 'Model release',
  channels: ['API'],
  events: [ev('announcement', ann), ev('availability', avail, { is_first_availability: true })],
  ...extra,
});

const load = (...models: unknown[]) => normalizeFiles({ 'fixture.json': { models } }).releases;
const byId = (rs: Release[], id: string) => rs.find((r) => r.id === id)!;

describe('real dataset', () => {
  const { releases, issues } = normalizeFiles({ 'model-releases.json': rootFile });

  it('loads every entry without issues', () => {
    expect(issues).toEqual([]);
    expect(releases.length).toBe((rootFile as { models: unknown[] }).models.length);
  });

  it('extracts announcement and first-availability dates', () => {
    const haiku = byId(releases, 'claude-3-haiku');
    expect(haiku.announcementDate).toBe('2024-03-04');
    expect(haiku.availabilityDate).toBe('2024-03-13');
    const o3 = byId(releases, 'o3');
    expect(o3.announcementDate).toBe('2024-12-20');
    expect(o3.availabilityDate).toBe('2025-04-16');
  });

  it('finds Claude 4 on May 22 in later years', () => {
    const r = onThisDay(releases, 'announcement', '2026-05-22');
    expect(r.exact.map((i) => i.release.name)).toEqual(expect.arrayContaining(['Claude Opus 4', 'Claude Sonnet 4']));
    expect(r.exact.every((i) => i.yearsAgo === 1)).toBe(true);
  });
});

describe('normalize', () => {
  it('skips invalid entries and reports them', () => {
    const { releases, issues } = normalizeFiles({
      'x.json': { models: [model('ok', 'Lab', '2025-01-01'), { id: 'broken', company: 'Lab' }] },
    });
    expect(releases.map((r) => r.id)).toEqual(['ok']);
    expect(issues[0].message).toContain('broken');
  });

  it('falls back when an event type is missing', () => {
    const [r] = load({ id: 'a', company: 'L', name: 'A', events: [ev('availability', '2025-02-02')] });
    expect(r.announcementDate).toBe('2025-02-02');
    expect(r.availabilityDate).toBe('2025-02-02');
  });

  it('merges files and later files win on duplicate ids', () => {
    const { releases } = normalizeFiles({
      'a.json': { models: [model('x', 'L', '2025-01-01')] },
      'b.json': { models: [model('x', 'L', '2025-06-01')] },
    });
    expect(releases).toHaveLength(1);
    expect(releases[0].announcementDate).toBe('2025-06-01');
  });
});

describe('third lab with no code changes', () => {
  const releases = load(
    model('gpt-x', 'OpenAI', '2025-01-10'),
    model('claude-x', 'Anthropic', '2025-01-15'),
    model('gemini-x', 'Google DeepMind', '2025-01-20'),
  );

  it('appears as a lab facet and gets its own colour', () => {
    expect(facet(releases, (r) => [r.lab]).map((f) => f.value)).toContain('Google DeepMind');
    const labs = buildLabs(new Map(releases.map((r) => [r.lab, 1])), {
      OpenAI: { slot: 1 },
      Anthropic: { slot: 2 },
    });
    const colors = Object.fromEntries(labs.map((l) => [l.name, l.color]));
    expect(colors).toEqual({
      Anthropic: 'var(--series-2)',
      'Google DeepMind': 'var(--series-3)',
      OpenAI: 'var(--series-1)',
    });
  });

  it('keeps colours stable when another lab is added', () => {
    const before = buildLabs(new Map([['A', 1], ['C', 1]]), {});
    const after = buildLabs(new Map([['A', 1], ['B', 1], ['C', 1]]), { A: { slot: 1 }, C: { slot: 2 } });
    expect(before.map((l) => l.color)).toEqual(after.filter((l) => l.name !== 'B').map((l) => l.color));
  });

  it('falls back to a neutral colour past eight labs', () => {
    const labs = buildLabs(new Map(Array.from({ length: 9 }, (_, i) => [`Lab ${i}`, 1])), {});
    expect(labs[8].color).toBe('var(--series-overflow)');
  });
});

describe('filters', () => {
  const releases = load(
    model('a', 'OpenAI', '2025-01-01'),
    model('b', 'Anthropic', '2025-01-06', '2025-02-01', { release_kind: 'Dated update' }),
    model('c', 'OpenAI', '2025-03-01', '2025-03-01', { channels: ['ChatGPT'], description: 'Reasoning model' }),
  );

  it('filters by lab, kind, channel, date range and query', () => {
    const ids = (f: Partial<typeof DEFAULT_FILTERS>) => applyFilters(releases, { ...DEFAULT_FILTERS, ...f }).map((r) => r.id);
    expect(ids({ labs: ['OpenAI'] })).toEqual(['c', 'a']);
    expect(ids({ kinds: ['Dated update'] })).toEqual(['b']);
    expect(ids({ channels: ['ChatGPT'] })).toEqual(['c']);
    expect(ids({ from: '2025-01-02', to: '2025-02-28' })).toEqual(['b']);
    expect(ids({ from: '2025-01-02', to: '2025-02-28', basis: 'availability' })).toEqual(['b']);
    expect(ids({ query: 'REASONING openai' })).toEqual(['c']);
    expect(ids({ sort: 'asc' })).toEqual(['a', 'b', 'c']);
  });
});

describe('gaps', () => {
  const releases = load(
    model('a', 'OpenAI', '2025-01-01'),
    model('b', 'Anthropic', '2025-01-06'),
    model('c', 'OpenAI', '2025-01-06'),
    model('d', 'OpenAI', '2025-03-01'),
  );

  it('computes gaps between neighbours across labs, in either sort order', () => {
    const desc = applyFilters(releases, DEFAULT_FILTERS);
    expect(adjacentGaps(desc, 'announcement')).toEqual([54, 0, 5]);
    const asc = applyFilters(releases, { ...DEFAULT_FILTERS, sort: 'asc' });
    expect(adjacentGaps(asc, 'announcement')).toEqual([5, 0, 54]);
  });

  it('recomputes gaps on a filtered set', () => {
    const openai = applyFilters(releases, { ...DEFAULT_FILTERS, labs: ['OpenAI'] });
    expect(adjacentGaps(openai, 'announcement')).toEqual([54, 5]);
  });

  it('summarises the set', () => {
    const s = gapStats(releases, 'announcement', '2025-03-11');
    expect(s.daysSinceLatest).toBe(10);
    expect(s.latest?.id).toBe('d');
    expect(s.medianGap).toBe(5);
    expect(s.longest).toMatchObject({ days: 54 });
    expect(gapStats([], 'announcement', '2025-01-01').daysSinceLatest).toBeNull();
  });

  it('formats gaps', () => {
    expect(formatGap(0)).toBe('Same day');
    expect(formatGap(1)).toBe('1 day');
    expect(formatGap(1200)).toBe('1,200 days');
    expect(daysBetween('2024-02-28', '2024-03-01')).toBe(2);
  });
});

describe('onThisDay', () => {
  const releases = load(
    model('last-year', 'L', '2025-09-25'),
    model('two-years', 'L', '2024-09-25'),
    model('this-year', 'L', '2026-09-25'),
    model('near', 'L', '2025-09-27'),
    model('leap', 'L', '2024-02-29'),
  );

  it('returns exact matches from earlier years only', () => {
    const r = onThisDay(releases, 'announcement', '2026-09-25');
    expect(r.exact.map((i) => [i.release.id, i.yearsAgo])).toEqual([
      ['last-year', 1],
      ['two-years', 2],
    ]);
    expect(r.nearby).toEqual([]);
  });

  it('falls back to a ±3 day window', () => {
    const r = onThisDay(releases, 'announcement', '2026-09-24');
    expect(r.exact).toEqual([]);
    expect(r.nearby.map((i) => [i.release.id, i.offsetDays])).toEqual([
      ['last-year', 1],
      ['near', 3],
      ['two-years', 1],
    ]);
  });

  it('shows Feb 29 releases on Feb 28 in non-leap years', () => {
    expect(onThisDay(releases, 'announcement', '2027-02-28').exact.map((i) => i.release.id)).toEqual(['leap']);
    expect(onThisDay(releases, 'announcement', '2028-02-29').exact.map((i) => i.release.id)).toEqual(['leap']);
  });
});
