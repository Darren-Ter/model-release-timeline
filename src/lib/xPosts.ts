/** Only a specific public post can be used as an announcement link. */
export function xPostUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    const post = url.pathname.match(/^\/([a-zA-Z0-9_]+)\/status\/(\d+)\/?$/);
    if (url.protocol !== 'https:' || url.username || url.password || url.port ||
        !['x.com', 'www.x.com', 'twitter.com', 'www.twitter.com'].includes(url.hostname) || !post) return null;
    return `https://x.com/${post[1]}/status/${post[2]}`;
  } catch {
    return null;
  }
}
