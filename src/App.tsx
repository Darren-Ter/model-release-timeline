import { useCallback, useEffect, useMemo, useState } from 'react';
import { datasetMeta, labOverrides, releases } from './data/load';
import { releaseDate } from './data/normalize';
import { applyFilters, facet, hasActiveFilters } from './lib/filter';
import { gapStats } from './lib/gaps';
import { onThisDay } from './lib/onThisDay';
import { buildLabs } from './lib/labColors';
import { daysBetween, todayInTimezone, TIMEZONES, type DisplayTimezone } from './lib/dates';
import { useFilters } from './state/useFilters';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { SummaryStats } from './components/SummaryStats';
import { Swimlane } from './components/Swimlane';
import { TimelineList } from './components/TimelineList';
import { OnThisDay } from './components/OnThisDay';
import { ReleaseDrawer } from './components/ReleaseDrawer';

/** Re-read the instant every minute; timezone changes update the date immediately. */
function useToday(timezone: DisplayTimezone) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);
  return todayInTimezone(timezone, now);
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
  const { filters, update, reset } = useFilters();
  const { basis, timezone } = filters;
  const today = useToday(timezone);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statsOpen, setStatsOpen] = useState(false);

  const filtered = useMemo(() => applyFilters(releases, filters), [filters]);
  const stats = useMemo(() => gapStats(filtered, basis, today, timezone), [filtered, basis, today, timezone]);
  const perLab = useMemo(
    () =>
      labs
        .map((lab) => ({ lab, stats: gapStats(filtered.filter((r) => r.lab === lab.name), basis, today, timezone) }))
        .filter((p) => p.stats.count > 0),
    [filtered, basis, today, timezone],
  );
  const otd = useMemo(() => onThisDay(releases, basis, today, timezone), [basis, today, timezone]);
  const years = useMemo(
    () => [...new Set(releases.map((r) => +releaseDate(r, basis, timezone).slice(0, 4)))].sort((a, b) => b - a),
    [basis, timezone],
  );

  // Hero: most recent release date overall (not filtered), and everything on that day.
  const hero = useMemo(() => {
    const past = releases.filter((r) => releaseDate(r, basis, timezone) <= today);
    const latestDate = past.reduce<string | null>((m, r) => (!m || releaseDate(r, basis, timezone) > m ? releaseDate(r, basis, timezone) : m), null);
    const earliest = releases.reduce<string | null>((m, r) => (!m || releaseDate(r, basis, timezone) < m ? releaseDate(r, basis, timezone) : m), null);
    return {
      latestDate,
      latest: latestDate ? past.filter((r) => releaseDate(r, basis, timezone) === latestDate) : [],
      daysSince: latestDate ? daysBetween(latestDate, today) : null,
      firstYear: earliest?.slice(0, 4) ?? null,
    };
  }, [basis, today, timezone]);

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

        <SummaryStats open={statsOpen} stats={stats} perLab={perLab} basis={basis} timezone={timezone} onSelect={select} />

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
            timezone={timezone}
            from={filters.from}
            to={filters.to}
            today={today}
            onSelect={select}
          />
        </details>

        <TimelineList
          releases={filtered}
          basis={basis}
          timezone={timezone}
          sort={filters.sort}
          showGaps={showGaps}
          daysSinceLatest={stats.daysSinceLatest}
          today={today}
          labColor={labColor}
          onSelect={select}
        />
      </main>

      <footer className="foot muted">
        Times and calendar days use {TIMEZONES[timezone].label}. Pacific and Eastern times follow daylight saving.
        {' '}Date-only records assume 00:00 PDT (UTC−7) before conversion; ~ marks assumed times.
      </footer>

      <ReleaseDrawer
        release={selectedId ? byId.get(selectedId) ?? null : null}
        timezone={timezone}
        labColor={labColor}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
