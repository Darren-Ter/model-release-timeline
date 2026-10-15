# Selectable timezone deployment — October 15, 2026

Target: [aigenius.media/model-timeline/](https://aigenius.media/model-timeline/), Worker `model-release-timeline`, configuration `wrangler.jsonc`.

Verified Cloudflare identity: `tzyong990808@gmail.com`, Async Web Studio account `4885217f1786a45387def0b055cf8bb4`.

## Rollback reference recorded before publication

- Current version: **`244d721a-578d-4007-9946-a294debe85fb`**, serving 100% of traffic.
- Current deployment created: October 13, 2026, 12:45:04 UTC+8 (`2026-10-13T04:45:04.538Z`).
- Source: `wrangler deployments list --config wrangler.jsonc --name model-release-timeline` under the approved account.

## Changes

- UTC+8 remains the default; Pacific Time (PDT/PST) and Eastern Time (EDT/EST) are selectable and saved in shared URLs.
- Cards, X announcements, details, teasers, filters, ordering, calendar groups, day gaps, statistics, charts, and anniversaries use the selected timezone.
- Date-only events assume 00:00 PDT (fixed UTC−7) on the original source date. Cards mark assumed times with `~`; details explain the assumption. Verified timestamps take precedence.
- Card headers and X announcement timestamps omit repeated timezone suffixes; the toolbar identifies the selected timezone.
- The deployment includes the existing announcement/teaser presentation and GLM-Legal data follow-up, bringing the timeline to 227 records.

## Publication

Published successfully as version **`cc220678-72a7-4897-b988-d1c0cbbbefa6`** through `npm run deploy` from application commit **`50132e8`**. The command verified the approved Cloudflare identity, passed all **100 tests**, completed the TypeScript/production build, and published the configured `aigenius.media/model-timeline*` route.

## Production verification

- `node scripts/verify-deployment.mjs` passed: HTTPS, slash redirect with query preservation, JavaScript/CSS/font assets, missing-file and similar-prefix 404s, and existing site responses.
- SHA-256 checks confirmed the deployed JavaScript (`index-B50Vc8rX.js`) and CSS (`index-D2hIfoOi.css`) exactly match the locally tested production build.
- The live timeline defaults to UTC+8 and shows 227 records. Haiku 5.5 displays October 8 at 02:01 in UTC+8, October 7 at 11:01 Pacific, and October 7 at 14:01 Eastern. Cards omit repeated timezone suffixes, while release details display the appropriate explicit timezone.
- Browser checks confirmed search updates the URL, a filtered Pacific URL survives reload, a release opens its details, and Clear all retains `/model-timeline/` and the selected Eastern timezone.
- The homepage and Facebook, Threads, and YouTube downloader pages each retained their own expected headings and tools, checked in the browser as well as over HTTPS.
- Production screenshot: `/Users/darren/.codex/visualizations/2026/10/15/01a13e9e-9c45-7fc2-9518-8cfadc1a2aca/production-timezones.jpg`.

## Routine rollback

```sh
CLOUDFLARE_ACCOUNT_ID=4885217f1786a45387def0b055cf8bb4 node scripts/check-deploy-account.mjs
CLOUDFLARE_ACCOUNT_ID=4885217f1786a45387def0b055cf8bb4 npx --no-install wrangler rollback 244d721a-578d-4007-9946-a294debe85fb --config wrangler.jsonc --name model-release-timeline --message "Restore pre-timezone timeline deployment"
node scripts/verify-deployment.mjs
```
