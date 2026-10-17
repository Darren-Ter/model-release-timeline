# Timeline deployment — October 17, 2026

- Site: https://aigenius.media/model-timeline/
- Worker: `model-release-timeline`.
- Approved Cloudflare identity verified: `tzyong990808@gmail.com`, Async Web Studio, account `4885217f1786a45387def0b055cf8bb4`.
- Source commit: `57cfc22279882c63464fa720dbeb5b30f3bf44be`.
- Pre-deployment version, recorded from `wrangler deployments list`: **`cc220678-72a7-4897-b988-d1c0cbbbefa6`** (100% of traffic).
- Deployed version: **`fc0e2564-a956-45a9-a949-18ed589f7e8d`**, confirmed at 100% of traffic by `wrangler deployments list`.
- Deployment recorded: **October 17, 2026, 21:50:42 UTC+8** (13:50:42 UTC).
- Deployment status: published and verified.

This release publishes 273 records, including the Qwen catalog reconciliation and the October 17 additions of DeepSeek-V4.1-Flash-1017 and Gemini 4 Argon. Worker configuration and routing are unchanged.

## Validation

- `npm ci`: successful, zero reported vulnerabilities.
- `npm run deploy`: approved-account check, all **106 tests**, TypeScript, production build, and publication succeeded. Wrangler remained pinned at 4.149.0. Vite's large-chunk advisory is non-blocking.
- `node scripts/verify-deployment.mjs`: live HTTPS, redirect query preservation, JavaScript/CSS assets, bundled fonts, missing-file 404s, similar-prefix routing, homepage, and all three downloader-page checks passed.
- Production's JavaScript asset path matches the local build: `/model-timeline/assets/index-C8kL4EhG.js`.
- Production browser checks: 273 records and October 17 research date; search updates `?q=DeepSeek+1017`; the filtered URL survives reload; the DeepSeek details open with the verified 16:35 UTC+8 announcement time; adding a lab filter then selecting **Clear all** retains `/model-timeline/` and restores all records.
- Gemini 4 Argon's live details show September 30 limited availability separately from October 13 public availability.
- Browser checks confirm the existing homepage and Facebook, Threads, and YouTube downloader pages retain their own content.
- No Git push was performed; publication used the repository's manual Cloudflare deployment command.

## Routine rollback

Restore the recorded pre-deployment version if needed:

```sh
node scripts/check-deploy-account.mjs
npx --no-install wrangler rollback cc220678-72a7-4897-b988-d1c0cbbbefa6 --message "Restore pre-October-17 timeline deployment"
node scripts/verify-deployment.mjs
```
