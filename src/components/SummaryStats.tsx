import type { GapStats } from '../lib/gaps';
import { formatDate, formatGap } from '../lib/dates';
import { releaseDate, type DateBasis } from '../data/normalize';

interface Props {
  stats: GapStats;
  basis: DateBasis;
  onSelect: (id: string) => void;
}

export function SummaryStats({ stats, basis, onSelect }: Props) {
  const { count, latest, daysSinceLatest, medianGap, longest } = stats;
  return (
    <section className="stats" aria-label="Summary for the current filters">
      <div className="stat">
        <span className="stat-label">Releases</span>
        <span className="stat-value">{count}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Since last release</span>
        <span className="stat-value">{daysSinceLatest === null ? '—' : daysSinceLatest === 0 ? 'Today' : formatGap(daysSinceLatest)}</span>
        {latest && (
          <button type="button" className="stat-sub link" onClick={() => onSelect(latest.id)}>
            {latest.name} · {formatDate(releaseDate(latest, basis))}
          </button>
        )}
      </div>
      <div className="stat">
        <span className="stat-label">Median gap</span>
        <span className="stat-value">{medianGap === null ? '—' : formatGap(Math.round(medianGap))}</span>
        <span className="stat-sub">between consecutive releases</span>
      </div>
      <div className="stat">
        <span className="stat-label">Longest gap</span>
        <span className="stat-value">{longest ? formatGap(longest.days) : '—'}</span>
        {longest && (
          <span className="stat-sub">
            <button type="button" className="link" onClick={() => onSelect(longest.from.id)}>
              {longest.from.name}
            </button>{' '}
            →{' '}
            <button type="button" className="link" onClick={() => onSelect(longest.to.id)}>
              {longest.to.name}
            </button>
          </span>
        )}
      </div>
    </section>
  );
}
