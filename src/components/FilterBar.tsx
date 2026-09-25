import { useMemo } from 'react';
import type { Filters } from '../lib/filter';
import { addDays } from '../lib/dates';
import type { LabInfo } from '../lib/labColors';

interface Option {
  value: string;
  count: number;
}

interface Props {
  filters: Filters;
  update: (patch: Partial<Filters>) => void;
  reset: () => void;
  active: boolean;
  labs: LabInfo[];
  kinds: Option[];
  channels: Option[];
  years: number[];
  today: string;
}

const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

export function FilterBar({ filters, update, reset, active, labs, kinds, channels, years, today }: Props) {
  const presets = useMemo(
    () => [
      { label: 'All time', from: null, to: null },
      { label: 'Last 30 days', from: addDays(today, -29), to: today },
      { label: 'Last 90 days', from: addDays(today, -89), to: today },
      { label: 'Last 12 months', from: addDays(today, -364), to: today },
      ...years.map((y) => ({ label: String(y), from: `${y}-01-01`, to: `${y}-12-31` })),
    ],
    [today, years],
  );
  const activePreset = presets.find((p) => p.from === filters.from && p.to === filters.to);

  return (
    <section className="filters" aria-label="Search and filters">
      <div className="filter-row">
        <label className="search">
          <span className="visually-hidden">Search models</span>
          <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16">
            <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            placeholder="Search name, model ID, description…"
            value={filters.query}
            onChange={(e) => update({ query: e.target.value })}
          />
        </label>

        <div className="segmented" role="group" aria-label="Date basis">
          {(['announcement', 'availability'] as const).map((b) => (
            <button key={b} type="button" aria-pressed={filters.basis === b} onClick={() => update({ basis: b })}>
              {b === 'announcement' ? 'Announced' : 'First available'}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="ghost"
          onClick={() => update({ sort: filters.sort === 'desc' ? 'asc' : 'desc' })}
          aria-label={`Sort ${filters.sort === 'desc' ? 'oldest' : 'newest'} first`}
        >
          {filters.sort === 'desc' ? 'Newest first ↓' : 'Oldest first ↑'}
        </button>
      </div>

      <div className="filter-row">
        <span className="filter-label">Date</span>
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
          <span aria-hidden="true">–</span>
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

      <div className="filter-row">
        <span className="filter-label">Lab</span>
        <div className="chips" role="group" aria-label="AI labs">
          {labs.map((l) => (
            <button
              key={l.name}
              type="button"
              className="chip"
              aria-pressed={filters.labs.includes(l.name)}
              onClick={() => update({ labs: toggle(filters.labs, l.name) })}
            >
              <span className="swatch" style={{ background: l.color }} aria-hidden="true" />
              {l.name}
              <span className="chip-count">{l.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="filter-row">
        <span className="filter-label">Type</span>
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

      <div className="filter-row">
        <span className="filter-label">Channel</span>
        <details className="dropdown">
          <summary>
            {filters.channels.length ? `${filters.channels.length} selected` : 'Any channel'}
          </summary>
          <div className="dropdown-panel" role="group" aria-label="Channels">
            {channels.map((c) => (
              <label key={c.value} className="check">
                <input
                  type="checkbox"
                  checked={filters.channels.includes(c.value)}
                  onChange={() => update({ channels: toggle(filters.channels, c.value) })}
                />
                <span>{c.value}</span>
                <span className="chip-count">{c.count}</span>
              </label>
            ))}
          </div>
        </details>
        {filters.channels.map((c) => (
          <button
            key={c}
            type="button"
            className="chip removable"
            aria-pressed="true"
            aria-label={`Remove channel ${c}`}
            onClick={() => update({ channels: toggle(filters.channels, c) })}
          >
            {c} ×
          </button>
        ))}
        {active && (
          <button type="button" className="ghost clear" onClick={reset}>
            Clear filters
          </button>
        )}
      </div>
    </section>
  );
}
