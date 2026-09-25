# Model release timeline

Interactive timeline of AI model releases, built from `model-releases.json`.

- Search by name, model ID, snapshot ID or description
- Filter by lab, date range (presets or custom), release type and channel; filters are kept in the URL so views can be shared
- Toggle between **announcement** and **first availability** dates
- Gap badges between consecutive releases ("5 days", "Same day") and "X days since last release", recomputed for whatever is filtered
- "On this day" panel showing releases from the same date in earlier years (falls back to ±3 days)
- Swimlane chart with one lane per lab

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # unit tests
npm run build    # typecheck + production build into dist/
```

## Adding releases from another lab

Nothing in the UI is hard-coded to a lab. Labs, release types and channels are all read from the data.

1. Add entries with the same shape as `model-releases.json` → `models[]`. You can either:
   - append them to `model-releases.json`, or
   - create a new file such as `data/releases/google-deepmind.json` containing `{ "models": [ ... ] }`. Every `*.json` file in `data/releases/` is merged in automatically, and later files win when two entries share an `id`.
2. The minimum per entry is `id`, `company` (the lab name), `name` and `events[]`. Each event needs a `type` (`announcement` or `availability`) and a `source_date` (`YYYY-MM-DD`). All other fields are optional. `display_date`, `is_first_availability`, `channels`, `release_kind`, `snapshot_ids` and the URLs make the UI richer.
3. Optionally pin the lab's colour in `data/labs.json` (`slot` 1–8 from the categorical palette, or a literal `color`). Labs that aren't listed get the next free slot automatically, in alphabetical order. Pin a slot if a lab's colour must never change as more labs are added.

Entries that fail validation are skipped and listed in the browser console during `npm run dev`. They don't break the page.

## Date conventions

The dates come from the dataset's `display_date`. Timestamped announcements are shown in UTC+8. Date-only sources are shown with their source date. Gap and "since last release" values are whole calendar days between those dates. "Today" is the viewer's local date.
