# Model Release Timeline

**Explore AI model releases, compare launch dates, and see the gaps between them.**

[**Explore the live timeline →**](https://aigenius.media/model-timeline/)

A searchable timeline of model announcements and documented availability across OpenAI, Anthropic, Google DeepMind, xAI, DeepSeek, Alibaba Qwen, Moonshot AI, MiniMax, and Z.ai. Built with React and TypeScript, with source-linked release data maintained in readable JSON files.

## What you can explore

- **One timeline across labs.** Browse releases in either direction, with descriptions, channels, and links to supporting sources.
- **Announcement vs. availability.** Switch between when a model was announced and its first documented access.
- **Search and share.** Filter by lab, date range, release type, or channel. Filters live in the URL, so you can share the exact view.
- **Release cadence.** See gaps between filtered releases, per-lab statistics, and an optional cadence chart.
- **Historical context.** A days-since-last-release counter and “On this day” view put releases in context.
- **Visible uncertainty.** Disputed dates, incomplete records, previews, and later access rollouts are labeled explicitly.

The October 12, 2026 refresh checks all nine labs for recent text, reasoning, and coding releases and brings the timeline to 226 records. See the [latest research and source notes](docs/release-data-refresh-2026-10-12.md) and the [September historical audit](docs/release-data-audit-2026-09-25.md) for evidence and remaining uncertainty. Data is maintained in the repository; it is not a live feed. Standalone image, video, speech, embedding, and moderation models are outside the current scope.

## Run locally

Use Node.js 22.12+ and npm.
The checked-in `.nvmrc` selects Node.js 24 for users of nvm; run `nvm install` and `nvm use` before installing dependencies.

```bash
git clone https://github.com/Darren-Ter/model-release-timeline.git
cd model-release-timeline
npm ci
npm run dev
```

Open [localhost:5173/model-timeline/](http://localhost:5173/model-timeline/).

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm test` | Run data, UI rendering, and Worker routing tests |
| `npm run typecheck` | Check TypeScript without building |
| `npm run build` | Build the app into `dist/model-timeline/` |
| `npm run preview` | Preview the production UI locally |
| `npm run deploy` | Verify the deployment account, test, build, and publish |
| `node scripts/verify-deployment.mjs` | Check the production URL, assets, redirects, and existing site |

## How the data works

Each lab has a file in `data/`. The app automatically loads every JSON file there except `labs.json`, which configures lab colors and links. Zod validates the records before they are normalized for the UI; invalid entries are skipped and reported in the development console.

```text
data/             Per-lab release records and visual configuration
src/components/   Timeline, filters, release details, and charts
src/data/         Validation, loading, and normalization
src/lib/          Date, filtering, and release-gap logic
worker/           Cloudflare subpath routing and tests
scripts/          Deployment account check and live verification
docs/             Release-data audit and research notes
```

### Add or correct a release

1. Update the appropriate lab file in `data/`, or create a new one for an additional lab. The file has the shape `{ "title", "researched_on", "timezone", "models": [...] }`.
2. Give each model a stable `id`, `company`, `name`, and at least one event with a `type` and `source_date` in `YYYY-MM-DD` format. Use `announcement` or `availability` for timeline events.
3. Link primary sources using `source_url`; add descriptions, channels, release notes, and documentation where available. Keep models sorted newest first.
4. Optionally assign the lab a color in `data/labs.json` using a palette `slot` (1–8) or a literal `color`.
5. Run `npm test` and `npm run build`. Check the entry locally and include the supporting sources when submitting a correction.

The schema is defined in [src/data/schema.ts](src/data/schema.ts). Existing lab files provide complete examples. Duplicate IDs are merged with later files taking precedence, so use unique IDs for distinct releases.

### Date conventions

Timestamped announcements are displayed in UTC+8; date-only sources retain their source date. Gap calculations use whole calendar days. “Today” follows the viewer’s local date.

If the selected event type is missing, the timeline uses the other recorded event and labels the fallback. Missing dates appear as **Not documented** in the details panel. Availability marked `is_first_availability: false` appears as **Recorded access**, not first access. Channels can include later rollouts.

When primary sources disagree, set `date_disputed: true` and explain the conflict in `notes`. These entries show **Date uncertain** and do not receive a **New** badge. A publication date, model snapshot suffix, or promised release is not automatically a launch date.

## Deployment

The live app runs on Cloudflare Workers at **[aigenius.media/model-timeline/](https://aigenius.media/model-timeline/)**. Vite builds assets under `/model-timeline/`, and a dedicated Worker serves that subpath while preserving the domain’s existing homepage and tools.

Maintainers should follow [AGENTS.md](AGENTS.md) for account checks, deployment commands, verification, and rollback. Production deployment is manual; pushing to GitHub does not deploy the site.

If you deploy your own copy, replace the Cloudflare account, zone, route, and existing-site service binding in `wrangler.jsonc`, and adapt the deployment identity check. The checked-in configuration targets the maintained production site.

## Stack

React 19 · TypeScript · Vite · Zod · Vitest · Cloudflare Workers

Fonts: Inter, Space Grotesk, and JetBrains Mono, bundled locally through Fontsource.
