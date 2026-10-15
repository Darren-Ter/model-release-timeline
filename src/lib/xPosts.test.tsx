import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { normalizeFiles } from '../data/normalize';
import { releases } from '../data/load';
import { TimelineList } from '../components/TimelineList';
import { ReleaseDrawer } from '../components/ReleaseDrawer';
import { xPostDatetime, xPostUrl } from './xPosts';
import { formatTimestamp } from './dates';

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

describe('official X post times', () => {
  const geminiPost = 'https://x.com/GoogleDeepMind/status/2024516464892334129';

  it('decodes the post ID without losing integer precision and converts across midnight', () => {
    const timestamp = xPostDatetime(geminiPost)!;
    expect(timestamp).toBe('2026-02-19T16:08:33.584Z');
    expect(formatTimestamp(timestamp)).toBe('20 Feb 2026, 00:08 UTC+8');
    expect(xPostDatetime('https://twitter.com/GoogleDeepMind/status/2024516464892334129?s=20')).toBe(timestamp);
  });

  it.each([null, 'https://x.com/GoogleDeepMind', 'https://example.com/Lab/status/2024516464892334129',
    'https://x.com/jack/status/20', 'https://x.com/Lab/status/29700859247',
    'https://x.com/Lab/status/18446744073709551616', 'https://x.com/Lab/status/999999999999999999999'])
    ('does not invent a timestamp for an unsupported post: %s', (url) => {
      expect(xPostDatetime(url)).toBeNull();
    });

  it('ties the time to the chosen announcement link, independently of event timestamps', () => {
    const events = [{ type: 'announcement', source_date: '2026-02-19', source_url: officialPost,
      datetime_utc8: '2026-02-19T22:00:00+08:00', precision: 'timestamp' }];
    const release = load({ events, announcement_x_url: geminiPost }).releases[0];
    expect(release.announcementXDatetime).toBe(xPostDatetime(geminiPost));
    expect(release.announcementDate).toBe('2026-02-19');
    expect(release.events[0].datetime).toBe('2026-02-19T22:00:00+08:00');
    expect(load({ events }).releases[0].announcementXDatetime).toBe(xPostDatetime(officialPost));
    expect(load().releases[0].announcementXDatetime).toBeNull();
  });

  it.each(['announcement', 'availability'] as const)('shows a labeled post time in the %s card while preserving source evidence', (basis) => {
    const release = releases.find((r) => r.id === 'gemini-3-1-pro')!;
    const markup = renderToStaticMarkup(<TimelineList releases={[release]} basis={basis} sort="desc"
      showGaps={false} daysSinceLatest={null} today="2026-10-13" labColor={() => '#777'} onSelect={() => {}} />);
    expect(markup).toContain('X announcement');
    expect(markup).toContain('20 Feb 2026, 00:08</time>');
    expect(markup).toContain(`dateTime="${release.announcementXDatetime}"`);
    expect(markup).toContain(`dateTime="${basis === 'announcement' ? '2026-02-20' : '2026-02-19'}"`);
    expect(release.events.every((e) => e.datetime === null && e.approximate)).toBe(true);
  });

  it('shows the post time and its source together in release details', () => {
    const release = releases.find((r) => r.id === 'gemini-3-1-pro')!;
    const markup = renderToStaticMarkup(<ReleaseDrawer release={release} labColor={() => '#777'} onClose={() => {}} />);
    expect(markup).toContain(`<dt>X announcement</dt><dd><a href="${geminiPost}"`);
    expect(markup).toContain('20 Feb 2026, 00:08 UTC+8');
  });

  it('covers every currently verified announcement link and agrees with audited teaser launch times', () => {
    const linked = releases.filter((r) => r.announcementXUrl);
    expect(linked.length).toBeGreaterThan(0);
    for (const release of linked) {
      expect(release.announcementXDatetime).not.toBeNull();
      if (release.teaser) {
        expect(Math.floor(Date.parse(release.announcementXDatetime!) / 1000))
          .toBe(Date.parse(release.teaser.announcementDatetime) / 1000);
      }
    }
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
    expect(markup).not.toContain('rcard-x-time');
  });
});

describe('verified Logan launch teasers', () => {
  it.each([
    ['gemini-3-1-pro', '2024302012091752768', '14h 12m', '2026-02-19'],
    ['gemini-3-1-flash-lite', '2028630697141842112', '16h 00m', '2026-03-03'],
    ['gemini-3-5-flash', '2056528490011476100', '17h 11m', '2026-05-19'],
  ])('%s links the teaser and measures across midnight independently of date-only events', (id, postId, lead, sourceDate) => {
    const release = releases.find((r) => r.id === id)!;
    const teaserUrl = `https://x.com/OfficialLoganK/status/${postId}`;
    expect(release.teaser?.url).toBe(teaserUrl);
    expect(release.announcementDate).toBe(sourceDate);
    expect(release.availabilityDate).toBe(sourceDate);
    expect(release.events.every((e) => e.datetime === null)).toBe(true);

    for (const basis of ['announcement', 'availability'] as const) {
      const markup = renderToStaticMarkup(<TimelineList releases={[release]} basis={basis} sort="desc"
        showGaps={false} daysSinceLatest={null} today="2026-10-13" labColor={() => '#777'} onSelect={() => {}} />);
      expect(markup).toContain(`href="${teaserUrl}" target="_blank" rel="noopener noreferrer"`);
      expect(markup).toContain(`<strong>${lead}</strong> before the official launch announcement`);
      expect(markup).toContain(`href="${release.announcementXUrl}"`);
      const detailsButton = markup.match(/<button\b[^>]*id="release-[^"]+"[^>]*>[\s\S]*?<\/button>/)?.[0];
      expect(detailsButton).toBeDefined();
      expect(detailsButton).not.toContain('<a ');
    }

    const drawer = renderToStaticMarkup(<ReleaseDrawer release={release} labColor={() => '#777'} onClose={() => {}} />);
    expect(drawer).toContain(`href="${teaserUrl}"`);
    expect(drawer).toContain(`<strong>${lead}</strong>`);
    expect(drawer).toContain(`dateTime="${release.teaser!.datetime}"`);
    expect(drawer).toContain(`dateTime="${release.teaser!.announcementDatetime}"`);
    expect(drawer).toContain('UTC+8');
  });

  it('explains the May video’s Omni context without adding a standalone media release', () => {
    const release = releases.find((r) => r.id === 'gemini-3-5-flash')!;
    const markup = renderToStaticMarkup(<ReleaseDrawer release={release} labColor={() => '#777'} onClose={() => {}} />);
    expect(markup).toContain('The teaser video was created with Gemini Omni, announced at the same I/O event.');
    expect(markup).toContain('href="https://x.com/OfficialLoganK/status/2056786790468776037"');
    expect(releases.some((r) => r.name === 'Gemini Omni')).toBe(false);
  });

  it('rejects teaser timestamps that cannot establish an earlier post', () => {
    const teaser = {
      author: 'Logan Kilpatrick', text: 'Gemini', x_url: officialPost,
      datetime_utc8: '2026-10-02T08:00:00+08:00',
      announcement_datetime_utc8: '2026-10-01T08:00:00+08:00',
    };
    expect(load({ teaser }).issues[0].message).toContain('teaser must precede');
    expect(load({ teaser: { ...teaser, datetime_utc8: '2026-10-01' } }).issues).toHaveLength(1);
  });
});
