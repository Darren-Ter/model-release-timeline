import { describe, expect, it, vi } from 'vitest';
import worker from './index';

describe('timeline route isolation', () => {
  const env = () => ({
    ASSETS: { fetch: vi.fn(async () => new Response('asset')) },
    EXISTING_SITE: { fetch: vi.fn(async () => new Response('existing site')) },
  });

  it('redirects the bare path and preserves shared filters', async () => {
    const bindings = env();
    const response = await worker.fetch(new Request('https://aigenius.media/model-timeline?q=GPT'), bindings);
    expect(response.status).toBe(308);
    expect(response.headers.get('location')).toBe('https://aigenius.media/model-timeline/?q=GPT');
    expect(bindings.EXISTING_SITE.fetch).not.toHaveBeenCalled();
  });

  it.each(['/model-timeline/', '/model-timeline/assets/app.js'])('serves %s from assets', async (path) => {
    const bindings = env();
    const request = new Request(`https://aigenius.media${path}`);
    expect(await (await worker.fetch(request, bindings)).text()).toBe('asset');
    expect(bindings.ASSETS.fetch).toHaveBeenCalledWith(request);
    expect(bindings.EXISTING_SITE.fetch).not.toHaveBeenCalled();
  });

  it('preserves missing asset responses', async () => {
    const bindings = env();
    bindings.ASSETS.fetch.mockResolvedValue(new Response(null, { status: 404 }));
    expect((await worker.fetch(new Request('https://aigenius.media/model-timeline/missing.js'), bindings)).status).toBe(404);
  });

  it.each(['/', '/model-timeline-other', '/model-timelines'])('passes %s to the existing Worker unchanged', async (path) => {
    const bindings = env();
    const request = new Request(`https://aigenius.media${path}?q=test`);
    expect(await (await worker.fetch(request, bindings)).text()).toBe('existing site');
    expect(bindings.EXISTING_SITE.fetch).toHaveBeenCalledWith(request);
    expect(bindings.ASSETS.fetch).not.toHaveBeenCalled();
  });
});
