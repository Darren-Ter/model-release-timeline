import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { releases } from '../data/load';
import { normalizeFiles, releaseEvent, timelineEvent } from '../data/normalize';
import { ReleaseDrawer } from '../components/ReleaseDrawer';
import { TimelineList } from '../components/TimelineList';
import { applyFilters, DEFAULT_FILTERS } from './filter';

const find = (id: string) => releases.find((r) => r.id === id)!;
const labColor = () => '#777';
const noop = () => {};
const card = (id: string, basis: 'announcement' | 'availability' = 'announcement') => renderToStaticMarkup(
  <TimelineList releases={[find(id)]} basis={basis} sort="desc" showGaps={false}
    daysSinceLatest={null} today="2026-09-25" labColor={labColor} onSelect={noop} />,
);

describe('September 2026 source audit regressions', () => {
  it.each([
    ['glm-5-3-flash', '2026-08-26'],
    ['glm-4', '2024-01-16'],
    ['glm-4-9b', '2024-06-05'],
    ['qwen3-max-thinking', '2026-01-26'],
    ['qwen3-coder-next', '2026-02-03'],
    ['qwen3-5-397b-a17b', '2026-02-16'],
    ['qwen3-5-plus', '2026-02-16'],
    ['qwen3-6-27b', '2026-04-22'],
    ['qwen3-8-max', '2026-08-03'],
    ['grok-build-0-1', '2026-05-19'],
  ])('%s uses the original event date', (id, date) => {
    expect(releaseEvent(find(id), 'announcement')?.date).toBe(date);
  });

  it('does not show GLM-5.3-Flash as a new September release', () => {
    expect(card('glm-5-3-flash')).toContain('dateTime="2026-08-26"');
    expect(card('glm-5-3-flash')).not.toContain('badge-new');
    const september = applyFilters(releases, { ...DEFAULT_FILTERS, from: '2026-09-01', to: '2026-09-25' });
    expect(september.map((r) => r.id)).not.toContain('glm-5-3-flash');
  });

  it.each([
    ['qwen3-8-max', '2026-08-03', '2026-08-12'],
    ['minimax-m3', '2026-06-01', '2026-06-12'],
  ])('%s separates hosted access from later weight publication', (id, hosted, weights) => {
    const release = find(id);
    const first = releaseEvent(release, 'availability')!;
    expect(first.date).toBe(hosted);
    expect(first.channels).not.toContain('Open weights');
    expect(release.events.find((e) => e.type === 'availability' && e.channels.includes('Open weights'))?.date).toBe(weights);
  });

  it('keeps documented consumer access separate from Grok 3 API access', () => {
    const release = find('grok-3');
    expect(releaseEvent(release, 'availability')?.date).toBe('2025-02-19');
    expect(release.events.find((e) => e.type === 'availability' && e.channels.includes('API'))?.date).toBe('2025-04-03');
  });

  it('shows disputed dates with a visible caveat', () => {
    for (const id of ['glm-4-plus', 'qwen3-6-35b-a3b']) {
      expect(card(id)).toContain('Date uncertain');
      expect(card(id)).not.toContain('badge-new');
    }
  });
});

describe('date evidence in the UI', () => {
  it('labels a fallback without inventing an availability event', () => {
    const release = find('grok-1-5');
    expect(releaseEvent(release, 'availability')).toBeNull();
    expect(timelineEvent(release, 'availability').type).toBe('announcement');
    expect(card(release.id, 'availability')).toContain('availability not documented');
    const drawer = renderToStaticMarkup(<ReleaseDrawer release={release} labColor={labColor} onClose={noop} />);
    expect(drawer).toContain('<dt>Recorded access</dt><dd>Not documented</dd>');
  });

  it('does not call later platform access first access', () => {
    const release = releases.find((r) => r.name.includes('Grok 4.3'))!;
    const drawer = renderToStaticMarkup(<ReleaseDrawer release={release} labColor={labColor} onClose={noop} />);
    expect(drawer).toContain('<dt>Announced</dt><dd>Not documented</dd>');
    expect(drawer).toContain('<dt>Recorded access</dt>');
    expect(drawer).not.toContain('First documented access');
  });

  it('does not borrow an announcement time for a date-only availability on the same day', () => {
    const { releases: [release] } = normalizeFiles({ fixture: { models: [{
      id: 'timed', name: 'Timed', company: 'Lab', events: [
        { type: 'announcement', source_date: '2026-09-01', datetime_utc8: '2026-09-01T18:00:00+08:00', precision: 'timestamp' },
        { type: 'availability', source_date: '2026-09-01', is_first_availability: true },
      ],
    }] } });
    expect(timelineEvent(release, 'announcement').datetime).toBe('2026-09-01T18:00:00+08:00');
    expect(timelineEvent(release, 'availability').datetime).toBeNull();
  });
});
