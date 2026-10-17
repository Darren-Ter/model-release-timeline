import { describe, expect, it } from 'vitest';
import qwen from '../../data/qwen.json';
import audit from '../../docs/qwen-openrouter-audit-2026-10-15.json';
import { normalizeFiles, releaseDate, releaseEvent } from '../data/normalize';
import { matchesQuery } from './filter';
import { xPostDatetime } from './xPosts';

const { releases, issues } = normalizeFiles({ qwen });
const find = (id: string) => releases.find(r => r.id === id)!;

describe('Qwen catalog reconciliation', () => {
  it('accounts for every audited catalog entry and makes covered names searchable', () => {
    expect(issues).toEqual([]);
    expect(audit.entries).toHaveLength(90);
    expect(new Set(audit.entries.map(e => e.openrouter_id)).size).toBe(90);
    const included = audit.entries.filter(e => 'release_id' in e);
    expect(included).toHaveLength(77);
    expect(audit.entries.filter(e => e.disposition === 'outside_scope')).toHaveLength(13);
    for (const entry of included) {
      const release = find(entry.release_id!);
      expect(release, entry.openrouter_id).toBeDefined();
      expect(matchesQuery(release, entry.openrouter_id), entry.openrouter_id).toBe(true);
    }
  });

  it('resolves Prime as a searchable serving variant without an extra model launch', () => {
    const prime = audit.entries.find(e => e.openrouter_id === 'qwen/qwen3.8-max-prime')!;
    expect(prime.disposition).toBe('service_variant');
    expect(prime.release_id).toBe('qwen3-8-max-0902');
    expect(releases.some(r => /prime/i.test(r.name))).toBe(false);
    expect(matchesQuery(find(prime.release_id!), 'Qwen3.8 Max Prime')).toBe(true);
    expect(matchesQuery(find('qwen3-8-flash'), 'Qwen3.8-Flash-Next')).toBe(true);
  });

  it('requires a checked official post for every Qwen announcement link', () => {
    for (const release of releases.filter(r => r.announcementXUrl)) {
      const evidence = audit.verified_x_posts.find(p => p.url === release.announcementXUrl);
      expect(evidence, release.id).toBeDefined();
      expect(evidence!.author).toBe('Alibaba_Qwen');
      expect(evidence!.release_ids).toContain(release.id);
      const decoded = Date.parse(xPostDatetime(evidence!.url)!);
      expect(Math.floor(decoded / 1000)).toBe(Math.floor(Date.parse(evidence!.created_at) / 1000));
    }
    // A launch-thread reply is not the original VL announcement.
    expect(find('qwen3-vl-235b-a22b-instruct').announcementXUrl).toContain('1970594923503391182');
    expect(find('qwen3-vl-235b-a22b-thinking').announcementXUrl).not.toContain('1970597014225465658');
  });
});

describe('Qwen launch evidence', () => {
  it('separates exact X announcements from earlier date-only rollout evidence', () => {
    expect(releaseDate(find('qwen3-7-plus'), 'announcement')).toBe('2026-06-02');
    expect(releaseEvent(find('qwen3-7-plus'), 'availability')?.date).toBe('2026-06-01');
    expect(releaseDate(find('qwen3-5-27b'), 'announcement')).toBe('2026-02-25');
    expect(releaseEvent(find('qwen3-5-27b'), 'availability')?.date).toBe('2026-02-24');
    expect(releaseEvent(find('qwen3-5-9b'), 'availability')?.date).toBe('2026-03-02');
    expect(releaseEvent(find('qwen3-8-flash'), 'availability')?.channels).toEqual(['Open weights']);
    expect(find('qwen3-8-flash').events.find(e => e.channels.includes('OpenRouter'))?.date).toBe('2026-08-27');
  });

  it('does not manufacture launches from snapshot labels or provider preview listings', () => {
    for (const [id, access] of [
      ['qwen3-7-flash', '2026-07-21'],
      ['qwen3-6-flash', '2026-04-16'],
      ['qwen3-5-plus-2026-04-20', '2026-04-23'],
      ['qwen3-6-plus-preview', '2026-03-30'],
    ]) {
      expect(releaseEvent(find(id), 'announcement')).toBeNull();
      expect(find(id).announcementXUrl).toBeNull();
      expect(releaseEvent(find(id), 'availability')?.date).toBe(access);
    }
    expect(releaseEvent(find('qwen3-6-plus-preview'), 'availability')?.isFirstAvailability).toBe(false);
    expect(find('qwen3-8-max-0902').kind).toBe('Model update');
  });

  it('keeps later sizes and previews separate from the original families', () => {
    expect(releaseEvent(find('qwen1-5-4b-chat'), 'announcement')?.date).toBe('2024-02-04');
    expect(find('qwen1-5-4b-chat').dateDisputed).toBe(true);
    expect(releaseEvent(find('qwen1-5-32b-chat'), 'announcement')?.date).toBe('2024-04-05');
    expect(releaseEvent(find('qwen1-5-110b-chat'), 'announcement')?.date).toBe('2024-04-25');
    expect(releaseEvent(find('qwen2-5-vl-72b-instruct'), 'availability')?.date).toBe('2025-01-28');
    expect(releaseEvent(find('qwen2-5-vl-32b-instruct'), 'availability')?.date).toBe('2025-03-25');
    expect(releaseEvent(find('qwen2-5-coder-7b-instruct'), 'availability')?.date).toBe('2024-09-19');
    expect(releaseEvent(find('qwq-32b-preview'), 'availability')?.date).toBe('2024-11-28');
  });
});
