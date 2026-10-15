# X announcement times and card click fix — October 13, 2026

Target: [aigenius.media/model-timeline/](https://aigenius.media/model-timeline/), Worker `model-release-timeline`, configuration `wrangler.jsonc`.

Verified Cloudflare identity: `tzyong990808@gmail.com`, Async Web Studio account `4885217f1786a45387def0b055cf8bb4`.

## Rollback reference recorded before publication

- Current version: **`b15231a9-da60-4a42-9ace-ac362b290b97`**, serving 100% of traffic.
- Current deployment created: October 13, 2026, 01:49:55 UTC+8 (`2026-10-12T17:49:55.798Z`).
- Source: `wrangler deployments list --config wrangler.jsonc --name model-release-timeline` under the approved account.

## Changes and verification

- All 68 records with a verified official X announcement link display the post's full UTC+8 date and time in cards and release details, independently of the selected timeline date basis.
- Timestamps are decoded with BigInt from the linked post's Snowflake ID. This follows [X's ID documentation](https://docs.x.com/fundamentals/x-ids) and [Twitter's original implementation](https://github.com/twitter-archive/snowflake/blob/snowflake-2010/src/main/scala/com/twitter/service/snowflake/IdWorker.scala). Legacy sequential IDs and oversized IDs receive no inferred time. The legacy cutoff is documented in [ODU's original TweetedAt research](https://ws-dl.blogspot.com/2019/08/2019-08-03-tweetedat-finding-tweet.html).
- Existing release dates, event precision, sorting, availability evidence, 226-record scope, and launch teaser notes are retained. The new timestamps agree to the second with all three audited Gemini teaser launch timestamps.
- Browser inspection reproduced the X hit-area bug: the next interleaved row's empty grid column intercepted clicks over the previous card. Empty rows now ignore pointer input, while card contents retain it. Cards stay stationary on hover and the X action has a 44 × 44 px target.
- All 74 tests and the production build passed. Desktop browser hit tests reached the card directly above the icon and the X link at its top, center, and bottom. A click immediately above the icon opened release details; the lower edge of the icon opened the exact official X post. A 390 px viewport showed the timestamp and teaser without horizontal overflow, including in the availability view.

## Publication

Published successfully as version **`244d721a-578d-4007-9946-a294debe85fb`** through `npm run deploy`. The command verified the approved Cloudflare identity, passed all 74 tests, built successfully, and published the configured `aigenius.media/model-timeline*` route.

Production verification passed:

- `node scripts/verify-deployment.mjs` confirmed HTTPS, the slash redirect with query preservation, JS/CSS/font assets, missing-file and similar-prefix 404s, and existing site responses.
- The live browser showed the new UTC+8 timestamps and retained Gemini teaser notes. Search updated the query string, a shared filtered URL survived reload, and Clear all retained `/model-timeline/`.
- Live hit tests confirmed the details button immediately above the X icon and the official X link throughout its 44 px target, including the lower portion previously covered by the adjacent row.
- The homepage and Facebook, Threads, and YouTube downloader pages each showed their own expected headings and tools in the browser.

## Routine rollback

```sh
CLOUDFLARE_ACCOUNT_ID=4885217f1786a45387def0b055cf8bb4 node scripts/check-deploy-account.mjs
CLOUDFLARE_ACCOUNT_ID=4885217f1786a45387def0b055cf8bb4 npx --no-install wrangler rollback b15231a9-da60-4a42-9ace-ac362b290b97 --config wrangler.jsonc --name model-release-timeline --message "Restore pre-X-timestamp timeline deployment"
node scripts/verify-deployment.mjs
```
