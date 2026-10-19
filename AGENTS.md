# Deployment instructions

## Account safety

- Never use any BlazingFast-related identity, account, organization, credential, sender, recipient, or service login, including any address at blazingfast.ai. This applies to examples, configuration, commits, and integrations too.
- Before using an authenticated CLI in a session, inspect its active identity. Repeat after any account/profile change. Stop if any active identity or linked service is prohibited.
- Approved Cloudflare login: `tzyong990808@gmail.com`; account: **Async Web Studio**, ID `4885217f1786a45387def0b055cf8bb4`.
- If this approved login is unavailable, ask the user to log in with it. Do not invent an alternative identity or store tokens in this repository.
- `npm run deploy` checks the approved Cloudflare identity before tests, build, and publication. Do not bypass that check.

## Release research and X announcement posts

- Use the installed **Grok CLI** to find exact official X announcement posts when adding or auditing releases. A failed browser fetch or web search does not establish that a post is missing.
- Check Grok's active identity, profile/configuration, and linked services before authenticated use; never print authentication files or tokens. Follow the account restrictions above.
- Keep research read-only, with only web tools enabled and subagent spawning disabled: `grok --no-subagents --tools web_search,web_fetch --max-turns 8 -p '<research query>'`.
- Independently verify each candidate's exact status ID, official author, launch-identifying content, and creation timestamp directly on X or through X's first-party public syndication response. Grok output and search snippets alone are discovery evidence.
- Save verified permalinks in the corresponding model's `announcement_x_url` in `data/`; recording them only in a research document does not enable the timeline's X links. Record the evidence and any unresolved searches in `docs/`.
- Prefer the original announcement for the exact model or dated update. Do not substitute a profile, teaser, later promotion, or unrelated thread reply. Keep announcement posting time separate from first availability and preserve independently sourced event dates.

## Production configuration

- URL: https://aigenius.media/model-timeline/ (the path without the final slash redirects here, preserving query parameters).
- Worker: `model-release-timeline`; configuration: `wrangler.jsonc`.
- Zone: `aigenius.media`, ID `56e8463c0ee01fe8bd74b17b87d861a2`.
- Worker route: `aigenius.media/model-timeline*`; initial route ID `99fb5f6b61cf4f5c999b7bf8384050ee`.
- Vite base must remain `/model-timeline/`; output is `dist/model-timeline/`. Wrangler uploads `dist/`. The build removes stale output first.
- The Worker handles the redirect and serves only `/model-timeline/` descendants from its asset binding. Missing files return 404; do not enable a blanket SPA fallback.
- Similar prefixes such as `/model-timeline-other` must go to `aigenius-video-downloader` through the `EXISTING_SITE` service binding. Ordinary `fetch(request)` bypasses the existing route Worker and is not equivalent.
- Preserve the existing `aigenius.media/*` route, homepage, downloader tools, DNS, email records, and other subdomains. Do not attach the whole domain as a custom domain to this Worker.
- Manual deployment only; no Git integration or automatic deployment is configured. Do not modify the separate `ai-timeline` Worker.

## Install, verify identity, and deploy

Run from this repository root. Use Node.js 22.12+ and npm. Wrangler is pinned in devDependencies and package-lock.json.

```sh
npm whoami
```

An `ENEEDAUTH` response is acceptable for installing public npm packages. If npm is authenticated, verify its identity is permitted before proceeding.

```sh
npm ci
npx --no-install wrangler whoami --json
node scripts/check-deploy-account.mjs
npx --no-install wrangler deployments list
npm run deploy
```

Before each redeployment, record the current timeline version from `deployments list` for rollback. The deployment command runs all tests and the production build before `wrangler deploy`; it stops on failure. Record the resulting version ID after success.

For checks without publication:

```sh
npm test
npm run build
npx --no-install wrangler deploy --dry-run
```

Local UI: `npm run dev`, then open http://localhost:5173/model-timeline/. `npm run preview` previews the built UI; it does not emulate Worker routing.

## Verify production

```sh
node scripts/verify-deployment.mjs
```

Also open the production URL in a browser. Confirm search changes the query string, a shared filtered URL survives reload, a release opens its details, and clearing filters retains `/model-timeline/`. Check the homepage and downloader pages still show their own content.

## Rollback

Initial successful timeline version (2026-09-26): `d20058d5-e4a6-4ec4-8e87-6f24f290f533`.

To restore that known-good version after a later bad release:

```sh
node scripts/check-deploy-account.mjs
npx --no-install wrangler rollback d20058d5-e4a6-4ec4-8e87-6f24f290f533 --message "Restore verified timeline deployment"
node scripts/verify-deployment.mjs
```

Prefer the recorded pre-deployment version for a routine rollback. Version rollback does not restore route configuration; restore any changed routes separately.

To undo the initial rollout entirely, remove only the `aigenius.media/model-timeline*` route in the Cloudflare dashboard under this Worker's Settings → Domains & Routes. Verify the route ID and pattern before removal. Do not delete the Worker or its versions. The existing catch-all then resumes handling these paths (previously 404). A subsequent `npm run deploy` restores the timeline route.

Pre-rollout routing baseline:

- `aigenius.media/*` → `aigenius-video-downloader`, route ID `4e51883fc19d4a22aa6cc808785ed3b3`.
- Existing site version: `9c675291-c595-43e1-a92e-e371e91934ae`; deployment ID `6087ba6d-031a-487c-a380-b52e5c7ebf1a`. This deployment did not modify that Worker.
- No timeline route or `model-release-timeline` Worker existed before this rollout. No DNS changes were made.
