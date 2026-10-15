# Timeline deployment — October 13, 2026

Target: [aigenius.media/model-timeline/](https://aigenius.media/model-timeline/), Worker `model-release-timeline`, configuration `wrangler.jsonc`.

Verified Cloudflare identity: `tzyong990808@gmail.com`, Async Web Studio account `4885217f1786a45387def0b055cf8bb4`.

## Rollback reference recorded before publication

- Current version: **`8445a3ad-848d-4404-b5c5-5e8ce8c3adf9`**, serving 100% of traffic.
- Current deployment created: October 12, 2026, 18:55:12 UTC+8 (`2026-10-12T10:55:12.044Z`).
- Source: `wrangler deployments list --config wrangler.jsonc --name model-release-timeline` under the approved account.

## Publication

Published successfully as version **`b15231a9-da60-4a42-9ace-ac362b290b97`**. The release adds Logan Kilpatrick’s verified teaser links and lead-time notes to Gemini 3.1 Pro, Gemini 3.1 Flash-Lite, and Gemini 3.5 Flash, including the May teaser’s Gemini Omni context. It retains date-only release events and the existing 226-record scope.

The checked-in `npm run deploy` command verified the approved identity, passed all **61 tests**, built successfully, and deployed the configured timeline Worker and `aigenius.media/model-timeline*` route.

## Production verification

- `node scripts/verify-deployment.mjs` passed: HTTPS, slash redirect with query preservation, JS/CSS/font assets, missing-file and similar-prefix 404s, and existing site pages.
- The live JavaScript asset's SHA-256 matches the locally tested production build. It contains all three Logan teaser links and the May Omni-context link.
- Browser checks confirmed all three card notes (**14h 12m**, **16h 00m**, **17h 11m**) and UTC+8 timestamps in release details. Search updates the URL, a shared filtered URL survives reload, a release opens its details, and Clear all retains `/model-timeline/`.
- The homepage and Facebook, Threads, and YouTube downloader pages each retain their pre-deployment title and their own tool content, checked over HTTPS and in the browser.

## Routine rollback

From the repository root, verify the approved account again, restore the recorded pre-deployment version, then recheck production:

```sh
CLOUDFLARE_ACCOUNT_ID=4885217f1786a45387def0b055cf8bb4 node scripts/check-deploy-account.mjs
CLOUDFLARE_ACCOUNT_ID=4885217f1786a45387def0b055cf8bb4 npx --no-install wrangler rollback 8445a3ad-848d-4404-b5c5-5e8ce8c3adf9 --config wrangler.jsonc --name model-release-timeline --message "Restore pre-teaser timeline deployment"
node scripts/verify-deployment.mjs
```
