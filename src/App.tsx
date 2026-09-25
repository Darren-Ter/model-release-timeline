import { useCallback, useEffect, useMemo, useState } from 'react';
import { datasetMeta, labOverrides, releases } from './data/load';
import { releaseDate } from './data/normalize';
import { applyFilters, facet, hasActiveFilters } from './lib/filter';
import { gapStats } from './lib/gaps';
import { onThisDay } from './lib/onThisDay';
import { buildLabs } from './lib/labColors';
import { daysBetween, localToday } from './lib/dates';
import { useFilters } from './state/useFilters';
import { Hero } from './components/Hero';
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
  const [statsOpen, setStatsOpen] = useState(false);
  const { basis } = filters;

  const filtered = useMemo(() => applyFilters(releases, filters), [filters]);
  const stats = useMemo(() => gapStats(filtered, basis, today), [filtered, basis, today]);
  const perLab = useMemo(
    () =>
      labs
        .map((lab) => ({ lab, stats: gapStats(filtered.filter((r) => r.lab === lab.name), basis, today) }))
        .filter((p) => p.stats.count > 0),
    [filtered, basis, today],
  );
  const otd = useMemo(() => onThisDay(releases, basis, today), [basis, today]);
  const years = useMemo(
    () => [...new Set(releases.map((r) => +releaseDate(r, basis).slice(0, 4)))].sort((a, b) => b - a),
    [basis],
  );

  // Hero: most recent release date overall (not filtered), and everything on that day.
  const hero = useMemo(() => {
    const past = releases.filter((r) => releaseDate(r, basis) <= today);
    const latestDate = past.reduce<string | null>((m, r) => (!m || releaseDate(r, basis) > m ? releaseDate(r, basis) : m), null);
    const earliest = releases.reduce<string | null>((m, r) => (!m || releaseDate(r, basis) < m ? releaseDate(r, basis) : m), null);
    return {
      latestDate,
      latest: latestDate ? past.filter((r) => releaseDate(r, basis) === latestDate) : [],
      daysSince: latestDate ? daysBetween(latestDate, today) : null,
      firstYear: earliest?.slice(0, 4) ?? null,
    };
  }, [basis, today]);

  const activeCount =
    (filters.query.trim() ? 1 : 0) +
    (filters.from || filters.to ? 1 : 0) +
    filters.labs.length +
    filters.kinds.length +
    filters.channels.length;
  // "All time" leaves from/to empty, so it never counts as a filter.
  const showGaps = hasActiveFilters(filters);
  const select = useCallback((id: string) => setSelectedId(id), []);

  return (
    <div className="page">
      <Hero
        labs={labs}
        total={releases.length}
        firstYear={hero.firstYear}
        researchedOn={datasetMeta.researchedOn}
        latest={hero.latest}
        latestDate={hero.latestDate}
        daysSince={hero.daysSince}
        onSelect={select}
        aside={<OnThisDay result={otd} today={today} labColor={labColor} onSelect={select} />}
      />

      <main className="main">
        <FilterBar
          filters={filters}
          update={update}
          reset={reset}
          activeCount={activeCount}
          labs={labs}
          kinds={kinds}
          channels={channels}
          years={years}
          today={today}
          statsOpen={statsOpen}
          onToggleStats={() => setStatsOpen((o) => !o)}
        />

        <SummaryStats open={statsOpen} stats={stats} perLab={perLab} basis={basis} onSelect={select} />

        <p className="result-line" aria-live="polite">
          {showGaps ? (
            <>
              <strong>{filtered.length}</strong> of {releases.length} releases match · gaps shown between matches
            </>
          ) : (
            <>
              <strong>{releases.length}</strong> releases · filter to see the gaps between them
            </>
          )}
        </p>

        <details className="cadence-toggle">
          <summary>Cadence by lab</summary>
          <Swimlane
            releases={filtered}
            labs={labs}
            basis={basis}
            from={filters.from}
            to={filters.to}
            today={today}
            onSelect={select}
          />
        </details>

        <TimelineList
          releases={filtered}
          basis={basis}
          sort={filters.sort}
          showGaps={showGaps}
          daysSinceLatest={stats.daysSinceLatest}
          today={today}
          labColor={labColor}
          onSelect={select}
        />
      </main>

      <footer className="foot muted">
        Dates follow the dataset: timestamped announcements in {datasetMeta.timezone ?? 'the dataset timezone'}, otherwise the
        official source date.
      </footer>

      <ReleaseDrawer
        release={selectedId ? byId.get(selectedId) ?? null : null}
        labColor={labColor}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
