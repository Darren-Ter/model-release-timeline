import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { normalizeFiles } from '../data/normalize';
import { TimelineList } from '../components/TimelineList';
import { xPostUrl } from './xPosts';

const officialPost = 'https://x.com/OfficialLab/status/1234567890123456789';
const load = (extra: Record<string, unknown> = {}) => normalizeFiles({ fixture: { models: [{
  id: 'release', company: 'Lab', name: 'Model', events: [
    { type: 'announcement', source_date: '2026-10-01', source_url: 'https://example.com/launch' },
    { type: 'availability', source_date: '2026-10-02', source_url: officialPost },
  ], ...extra,
}] } });

describe('announcement post evidence', () => {
  it('canonicalizes a specific Twitter post and drops tracking parameters', () => {
    expect(xPostUrl('https://www.twitter.com/OfficialLab/status/1234567890123456789/?s=20')).toBe(officialPost);
  });

  it.each([
    'https://x.com/OfficialLab',
    'https://x.com/search?q=Model',
    'https://x.com.evil.example/OfficialLab/status/123',
    'https://example.com/OfficialLab/status/123',
    'http://x.com/OfficialLab/status/123',
    'https://someone@x.com/OfficialLab/status/123',
    'javascript:alert(1)',
  ])('rejects a profile, search, or unsafe destination: %s', (url) => {
    expect(xPostUrl(url)).toBeNull();
    expect(load({ announcement_x_url: url }).issues).toHaveLength(1);
  });

  it('does not mistake an availability post for an announcement', () => {
    expect(load().releases[0].announcementXUrl).toBeNull();
  });

  it('uses an existing announcement event, and lets an explicit verified post take precedence', () => {
    const events = [{ type: 'announcement', source_date: '2026-10-01', source_url: officialPost }];
    expect(load({ events }).releases[0].announcementXUrl).toBe(officialPost);
    expect(load({ events, announcement_x_url: 'https://x.com/OfficialLab/status/987654321' }).releases[0].announcementXUrl)
      .toBe('https://x.com/OfficialLab/status/987654321');
  });
});

describe('timeline X action', () => {
  const render = (linked: boolean, basis: 'announcement' | 'availability') => renderToStaticMarkup(
    <TimelineList releases={load(linked ? { announcement_x_url: officialPost } : {}).releases}
      basis={basis} sort="desc" showGaps={false} daysSinceLatest={null} today="2026-10-12"
      labColor={() => '#777'} onSelect={() => {}} />,
  );

  it.each(['announcement', 'availability'] as const)('keeps the X link outside the details button in the %s view', (basis) => {
    const markup = render(true, basis);
    expect(markup).toContain(`href="${officialPost}" target="_blank" rel="noopener noreferrer"`);
    expect(markup).toContain('View Model announcement on X (opens in a new tab)');
    const detailsButton = markup.match(/<button\b[^>]*id="release-release"[^>]*>[\s\S]*?<\/button>/)?.[0];
    expect(detailsButton).toBeDefined();
    expect(detailsButton).not.toContain('<a ');
    expect(markup).toMatch(/<\/button><a class="x-post-link rcard-x"/);
  });

  it('shows an unavailable icon without fabricating a destination', () => {
    const markup = render(false, 'announcement');
    expect(markup).toContain('disabled="" aria-label="No verified X announcement for Model"');
    expect(markup).not.toContain('href=');
  });
});
