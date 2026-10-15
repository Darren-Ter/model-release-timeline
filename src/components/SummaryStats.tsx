import type { GapStats } from '../lib/gaps';
import { DEFAULT_TIMEZONE, formatDate, formatGap, type DisplayTimezone } from '../lib/dates';
import { releaseDate, type DateBasis } from '../data/normalize';
import type { LabInfo } from '../lib/labColors';

interface Props {
  open: boolean;
  stats: GapStats;
  perLab: { lab: LabInfo; stats: GapStats }[];
  basis: DateBasis;
  timezone?: DisplayTimezone;
  onSelect: (id: string) => void;
}

const since = (d: number | null) => (d === null ? '—' : d === 0 ? 'Today' : `${formatGap(d)} ago`);
const gap = (d: number | null) => (d === null ? '—' : formatGap(Math.round(d)));

export function SummaryStats({ open, stats, perLab, basis, timezone = DEFAULT_TIMEZONE, onSelect }: Props) {
  const { count, latest, daysSinceLatest, medianGap, longest } = stats;
  const maxCount = Math.max(1, ...perLab.map((p) => p.stats.count));

  return (
    <section id="stats-panel" className="stats-panel collapse" data-open={open} hidden={!open} aria-label="Statistics for the current selection">
      <div className="stats">
        <div className="stat">
          <span className="stat-label">Releases</span>
          <span className="stat-value">{count}</span>
          <span className="stat-sub">in the current selection</span>
        </div>
        <div className="stat">
          <span className="stat-label">Latest</span>
          <span className="stat-value">{since(daysSinceLatest)}</span>
          {latest && (
            <button type="button" className="stat-sub link" onClick={() => onSelect(latest.id)}>
              {latest.name} · {formatDate(releaseDate(latest, basis, timezone))}
            </button>
          )}
        </div>
        <div className="stat">
          <span className="stat-label">Median gap</span>
          <span className="stat-value">{gap(medianGap)}</span>
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
      </div>

      {perLab.length > 0 && (
        <table className="lab-table">
          <caption className="visually-hidden">Per-lab release cadence</caption>
          <thead>
            <tr>
              <th scope="col">Lab</th>
              <th scope="col">Releases</th>
              <th scope="col">Median gap</th>
              <th scope="col">Latest</th>
            </tr>
          </thead>
          <tbody>
            {perLab.map(({ lab, stats: s }) => (
              <tr key={lab.name} style={{ ['--lab' as string]: lab.color }}>
                <th scope="row">
                  <span className="swatch" aria-hidden="true" />
                  {lab.name}
                </th>
                <td>
                  <span className="bar-cell">
                    <span className="bar" style={{ width: `${(s.count / maxCount) * 100}%` }} aria-hidden="true" />
                    <span className="num">{s.count}</span>
                  </span>
                </td>
                <td className="num">{gap(s.medianGap)}</td>
                <td>
                  {s.latest && (
                    <button type="button" className="link" onClick={() => onSelect(s.latest!.id)}>
                      {s.latest.name}
                    </button>
                  )}{' '}
                  <span className="muted">{since(s.daysSinceLatest)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
