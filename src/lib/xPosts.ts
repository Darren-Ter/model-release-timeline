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

/** Creation instant encoded in a modern X post's Snowflake ID. */
export function xPostDatetime(value: string | null | undefined): string | null {
  const url = xPostUrl(value);
  if (!url) return null;
  const postId = url.slice(url.lastIndexOf('/') + 1);
  if (postId.length > 20) return null;
  const id = BigInt(postId);
  // Legacy sequential IDs do not encode time; exclude them and oversized IDs.
  if (id <= 29_700_859_247n || id > (1n << 64n) - 1n) return null;
  // Twitter's original Snowflake epoch; the lower 22 bits identify the worker/sequence.
  // https://github.com/twitter-archive/snowflake/blob/snowflake-2010/src/main/scala/com/twitter/service/snowflake/IdWorker.scala
  const milliseconds = Number((id >> 22n) + 1_288_834_974_657n);
  return new Date(milliseconds).toISOString();
}
