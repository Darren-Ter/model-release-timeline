import { useMemo, useState } from 'react';
import type { Filters } from '../lib/filter';
import { addDays, formatDate, TIMEZONES, isDisplayTimezone } from '../lib/dates';
import type { LabInfo } from '../lib/labColors';

interface Option {
  value: string;
  count: number;
}

interface Props {
  filters: Filters;
  update: (patch: Partial<Filters>) => void;
  reset: () => void;
  activeCount: number;
  labs: LabInfo[];
  kinds: Option[];
  channels: Option[];
  years: number[];
  today: string;
  statsOpen: boolean;
  onToggleStats: () => void;
}

const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

function usePresets(today: string, years: number[]) {
  return useMemo(
    () => [
      { label: 'All time', from: null, to: null },
      { label: '30 days', from: addDays(today, -29), to: today },
      { label: '90 days', from: addDays(today, -89), to: today },
      { label: '12 months', from: addDays(today, -364), to: today },
      ...years.map((y) => ({ label: String(y), from: `${y}-01-01`, to: `${y}-12-31` })),
    ],
    [today, years],
  );
}

/** Sticky toolbar: search, date basis and sort stay visible; filters and stats expand on demand. */
export function FilterBar(props: Props) {
  const { filters, update, reset, activeCount, labs, kinds, channels, years, today, statsOpen, onToggleStats } = props;
  const [open, setOpen] = useState(false);
  const [allChannels, setAllChannels] = useState(false);
  const CHANNEL_LIMIT = 8;
  const shownChannels =
    allChannels || channels.length <= CHANNEL_LIMIT
      ? channels
      : channels.filter((c, i) => i < CHANNEL_LIMIT || filters.channels.includes(c.value));
  const presets = usePresets(today, years);
  const activePreset = presets.find((p) => p.from === filters.from && p.to === filters.to);

  const pills: { key: string; label: string; clear: () => void }[] = [
    ...(filters.from || filters.to
      ? [
          {
            key: 'date',
            label:
              activePreset?.label ??
              `${filters.from ? formatDate(filters.from) : '…'} – ${filters.to ? formatDate(filters.to) : '…'}`,
            clear: () => update({ from: null, to: null }),
          },
        ]
      : []),
    ...filters.labs.map((l) => ({ key: `lab-${l}`, label: l, clear: () => update({ labs: toggle(filters.labs, l) }) })),
    ...filters.kinds.map((k) => ({ key: `kind-${k}`, label: k, clear: () => update({ kinds: toggle(filters.kinds, k) }) })),
    ...filters.channels.map((c) => ({
      key: `ch-${c}`,
      label: c,
      clear: () => update({ channels: toggle(filters.channels, c) }),
    })),
  ];

  return (
    <section className="toolbar" aria-label="Search and filters">
      <div className="toolbar-row">
        <label className="search">
          <span className="visually-hidden">Search models</span>
          <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16">
            <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            placeholder="Search models, IDs, descriptions…"
            value={filters.query}
            onChange={(e) => update({ query: e.target.value })}
          />
        </label>

        <div className="toolbar-actions">
          <button
            type="button"
            className="tool-btn"
            aria-expanded={open}
            aria-controls="filter-panel"
            onClick={() => setOpen((o) => !o)}
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" width="15" height="15">
              <path d="M3 5h14M6 10h8M9 15h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="tool-label">Filters</span>
            {activeCount > 0 && <span className="count-dot">{activeCount}</span>}
          </button>
          <button type="button" className="tool-btn" aria-expanded={statsOpen} aria-controls="stats-panel" onClick={onToggleStats}>
            <svg aria-hidden="true" viewBox="0 0 20 20" width="15" height="15">
              <path d="M4 16V9M10 16V4M16 16v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="tool-label">Stats</span>
          </button>
          <div className="segmented" role="group" aria-label="Date basis">
            {(['announcement', 'availability'] as const).map((b) => (
              <button key={b} type="button" aria-pressed={filters.basis === b} onClick={() => update({ basis: b })}>
                {b === 'announcement' ? 'Announced' : 'Available'}
              </button>
            ))}
          </div>
          <label className="timezone-select">
            <span>Timezone</span>
            <select value={filters.timezone} onChange={(e) => {
              if (isDisplayTimezone(e.target.value)) update({ timezone: e.target.value });
            }}>
              {Object.entries(TIMEZONES).map(([value, { option }]) => <option key={value} value={value}>{option}</option>)}
            </select>
          </label>
          <button
            type="button"
            className="tool-btn icon"
            onClick={() => update({ sort: filters.sort === 'desc' ? 'asc' : 'desc' })}
            aria-label={filters.sort === 'desc' ? 'Newest first. Switch to oldest first' : 'Oldest first. Switch to newest first'}
            title={filters.sort === 'desc' ? 'Newest first' : 'Oldest first'}
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" className={filters.sort === 'asc' ? 'flip' : ''}>
              <path d="M10 3v14M5 12l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {pills.length > 0 && (
        <div className="pills" aria-label="Active filters">
          {pills.map((p) => (
            <button key={p.key} type="button" className="pill" onClick={p.clear} aria-label={`Remove filter ${p.label}`}>
              {p.label}
              <span aria-hidden="true">×</span>
            </button>
          ))}
          <button type="button" className="pill-clear" onClick={reset}>
            Clear all
          </button>
        </div>
      )}

      <div id="filter-panel" className="collapse" data-open={open} hidden={!open}>
        <div className="filter-grid">
          <div className="filter-group">
            <span className="filter-label">Date range</span>
            <div className="chips" role="group" aria-label="Date range presets">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className="chip"
                  aria-pressed={activePreset?.label === p.label}
                  onClick={() => update({ from: p.from, to: p.to })}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div className="date-inputs">
              <label>
                <span className="visually-hidden">From</span>
                <input
                  type="date"
                  value={filters.from ?? ''}
                  max={filters.to ?? undefined}
                  onChange={(e) => update({ from: e.target.value || null })}
                />
              </label>
              <span aria-hidden="true">→</span>
              <label>
                <span className="visually-hidden">To</span>
                <input
                  type="date"
                  value={filters.to ?? ''}
                  min={filters.from ?? undefined}
                  onChange={(e) => update({ to: e.target.value || null })}
                />
              </label>
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">AI lab</span>
            <div className="chips" role="group" aria-label="AI labs">
              {labs.map((l) => (
                <button
                  key={l.name}
                  type="button"
                  className="chip lab-chip"
                  style={{ ['--lab' as string]: l.color }}
                  aria-pressed={filters.labs.includes(l.name)}
                  onClick={() => update({ labs: toggle(filters.labs, l.name) })}
                >
                  <span className="swatch" aria-hidden="true" />
                  {l.name}
                  <span className="chip-count">{l.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Release type</span>
            <div className="chips" role="group" aria-label="Release type">
              {kinds.map((k) => (
                <button
                  key={k.value}
                  type="button"
                  className="chip"
                  aria-pressed={filters.kinds.includes(k.value)}
                  onClick={() => update({ kinds: toggle(filters.kinds, k.value) })}
                >
                  {k.value}
                  <span className="chip-count">{k.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Channel</span>
            <div className="chips" role="group" aria-label="Channels">
              {shownChannels.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  className="chip"
                  aria-pressed={filters.channels.includes(c.value)}
                  onClick={() => update({ channels: toggle(filters.channels, c.value) })}
                >
                  {c.value}
                  <span className="chip-count">{c.count}</span>
                </button>
              ))}
              {(allChannels ? channels.length > CHANNEL_LIMIT : channels.length > shownChannels.length) && (
                <button type="button" className="chip more" onClick={() => setAllChannels((v) => !v)}>
                  {allChannels ? 'Show fewer' : `+${channels.length - shownChannels.length} more`}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
