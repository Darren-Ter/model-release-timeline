# Model release timeline

Interactive timeline of AI model releases, built from the per-lab files in `data/`.

- Hero with a days-since-last-release counter and an "On this day" card showing releases from the same date in earlier years; collapsed by default on mobile
- Search is always visible. Filters (lab, date range presets or custom, release type, channel) and stats (totals, gaps, per-lab breakdown) are collapsed by default. Active filters appear as removable pills, and filters are kept in the URL so views can be shared
- Toggle between **announcement** and **documented availability** dates
- Optional cadence chart with one lane per lab, collapsed by default
- Centre-spine timeline with alternating cards. Once any filter is applied ("All time" doesn't count), gap badges appear between consecutive matches ("5 days", "Same day") along with "X days since last release", and spine spacing grows with the gap

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # unit tests
npm run build    # typecheck + production build into dist/
```

## Adding releases from another lab

Nothing in the UI is hard-coded to a lab. Labs, release types and channels are all read from the data.

1. Each lab has its own file in `data/` (`openai.json`, `anthropic.json`, `google-deepmind.json`, `xai.json`, …) shaped as `{ "title", "researched_on", "timezone", "models": [ ... ] }`. To add a lab, create a new file there. Every `*.json` file in the folder except `labs.json` (UI configuration) is merged in automatically, and later files win when two entries share an `id`. Keep `models` sorted newest first by release date.
2. The minimum per entry is `id`, `company` (the lab name), `name` and `events[]`. Each event needs a `type` (`announcement` or `availability`) and a `source_date` (`YYYY-MM-DD`). All other fields are optional. `display_date`, `is_first_availability`, `channels`, `release_kind`, `snapshot_ids` and the URLs make the UI richer.
3. Optionally pin the lab's colour in `data/labs.json` (`slot` 1–8 from the categorical palette, or a literal `color`). Labs that aren't listed get the next free slot automatically, in alphabetical order. Pin a slot if a lab's colour must never change as more labs are added.

Entries that fail validation are skipped and listed in the browser console during `npm run dev`. They don't break the page.

## Date conventions

The dates come from the dataset's `display_date`. Timestamped announcements are shown in UTC+8. Date-only sources are shown with their source date. Gap and "since last release" values are whole calendar days between those dates. "Today" is the viewer's local date.

When one event type is missing, the timeline uses the other recorded event and labels that fallback on the card. The details panel shows missing dates as **Not documented**. An availability event marked `is_first_availability: false` is labeled **Recorded access**, not first access. Channels list documented access across the event history, which can include later rollouts.

Set `date_disputed: true` when primary sources disagree on a release date, and explain the conflict in `notes`. Those cards show **Date uncertain** and do not receive a **New** badge.

The [September 25, 2026 audit](docs/release-data-audit-2026-09-25.md) covers all 220 existing records, with corrections, source links, and remaining uncertainty. A later article, report publication, model snapshot suffix, or promised release is not automatically a model launch date.
