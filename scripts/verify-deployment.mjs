import assert from 'node:assert/strict';

const base = 'https://aigenius.media';
const redirect = await fetch(`${base}/model-timeline?q=GPT`, { redirect: 'manual' });
assert.equal(redirect.status, 308);
assert.equal(redirect.headers.get('location'), `${base}/model-timeline/?q=GPT`);
const page = await fetch(`${base}/model-timeline/`);
assert.equal(page.status, 200);
const html = await page.text();
assert.match(html, /Model Release Timeline/);
const assets = [...html.matchAll(/(?:src|href)="(\/model-timeline\/[^"]+)"/g)].map((match) => match[1]);
assert.ok(assets.some((path) => path.endsWith('.js')));
assert.ok(assets.some((path) => path.endsWith('.css')));
for (const path of assets) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  if (path.endsWith('.css')) {
    const css = await response.text();
    const fonts = new Set([...css.matchAll(/url\(([^)]+\.woff2)\)/g)].map((match) => match[1].replaceAll('"', '')));
    assert.ok(fonts.size > 0);
    for (const font of fonts) assert.equal((await fetch(new URL(font, base + path))).status, 200, font);
  }
}
for (const path of ['/model-timeline/missing.js', '/model-timeline/missing', '/model-timeline-other', '/model-timelines']) {
  assert.equal((await fetch(base + path)).status, 404, path);
}
for (const path of ['/', '/tools/video-downloader', '/tools/threads-video-downloader', '/tools/youtube-video-downloader']) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  assert.ok(!(await response.text()).includes('<title>Model Release Timeline</title>'), path);
}
console.log('Live HTTPS, redirect, assets, fonts, 404s, and existing site checks passed.');
