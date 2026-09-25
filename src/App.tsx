import { useCallback, useEffect, useMemo, useState } from 'react';
import { datasetMeta, labOverrides, releases } from './data/load';
import { releaseDate } from './data/normalize';
import { applyFilters, facet, hasActiveFilters } from './lib/filter';
import { gapStats } from './lib/gaps';
import { onThisDay } from './lib/onThisDay';
import { buildLabs } from './lib/labColors';
import { formatDate, localToday } from './lib/dates';
import { useFilters } from './state/useFilters';
import { FilterBar } from './components/FilterBar';
import { SummaryStats } from './components/SummaryStats';
import { Swimlane } from './components/Swimlane';
import { TimelineList } from './components/TimelineList';
import { OnThisDay } from './components/OnThisDay';
import { ReleaseDrawer } from './components/ReleaseDrawer';

/** Re-reads the local date every minute so "today" rolls over at midnight. */
function useToday() {
  const [today, setToday] = useState(localToday);
  useEffect(() => {
    const t = setInterval(() => setToday(localToday()), 60_000);
    return () => clearInterval(t);
  }, []);
  return today;
}

const labs = buildLabs(
  facet(releases, (r) => [r.lab]).reduce((m, f) => m.set(f.value, f.count), new Map<string, number>()),
  labOverrides,
);
const labColorMap = new Map(labs.map((l) => [l.name, l.color]));
const labColor = (lab: string) => labColorMap.get(lab) ?? 'var(--series-overflow)';
const kinds = facet(releases, (r) => [r.kind]);
const channels = facet(releases, (r) => r.channels);
const byId = new Map(releases.map((r) => [r.id, r]));

export default function App() {
  const today = useToday();
  const { filters, update, reset } = useFilters();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => applyFilters(releases, filters), [filters]);
  const stats = useMemo(() => gapStats(filtered, filters.basis, today), [filtered, filters.basis, today]);
  const otd = useMemo(() => onThisDay(releases, filters.basis, today), [filters.basis, today]);
  const years = useMemo(
    () => [...new Set(releases.map((r) => +releaseDate(r, filters.basis).slice(0, 4)))].sort((a, b) => b - a),
    [filters.basis],
  );
  const active = hasActiveFilters(filters);
  const select = useCallback((id: string) => setSelectedId(id), []);

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1>Model release timeline</h1>
          <p className="muted">
            {releases.length} releases from {labs.length} {labs.length === 1 ? 'lab' : 'labs'}
            {datasetMeta.researchedOn && <> · data checked {formatDate(datasetMeta.researchedOn)}</>}
          </p>
        </div>
        <p className="muted today">Today · {formatDate(today)}</p>
      </header>

      <OnThisDay result={otd} today={today} labColor={labColor} onSelect={select} />

      <FilterBar
        filters={filters}
        update={update}
        reset={reset}
        active={active}
        labs={labs}
        kinds={kinds}
        channels={channels}
        years={years}
        today={today}
      />

      <p className="result-line muted" aria-live="polite">
        {active
          ? `${filtered.length} of ${releases.length} releases match. Gaps below are between matching releases.`
          : `Showing all ${releases.length} releases. Gaps below are between consecutive releases.`}
      </p>

      <SummaryStats stats={stats} basis={filters.basis} onSelect={select} />

      <Swimlane
        releases={filtered}
        labs={labs}
        basis={filters.basis}
        from={filters.from}
        to={filters.to}
        today={today}
        onSelect={select}
      />

      <TimelineList
        releases={filtered}
        basis={filters.basis}
        sort={filters.sort}
        daysSinceLatest={stats.daysSinceLatest}
        labColor={labColor}
        onSelect={select}
      />

      <ReleaseDrawer
        release={selectedId ? byId.get(selectedId) ?? null : null}
        labColor={labColor}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
