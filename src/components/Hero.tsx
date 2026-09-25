import type { ReactNode } from 'react';
import type { Release } from '../data/normalize';
import type { LabInfo } from '../lib/labColors';
import { formatDate } from '../lib/dates';

interface Props {
  labs: LabInfo[];
  total: number;
  firstYear: string | null;
  researchedOn: string | null;
  latest: Release[];
  latestDate: string | null;
  daysSince: number | null;
  onSelect: (id: string) => void;
  aside: ReactNode;
}

export function Hero({ labs, total, firstYear, researchedOn, latest, latestDate, daysSince, onSelect, aside }: Props) {
  return (
    <header className="hero">
      <div className="hero-glow" aria-hidden="true">
        {labs.slice(0, 3).map((l, i) => (
          <span key={l.name} className={`glow glow-${i + 1}`} style={{ background: l.color }} />
        ))}
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="kicker">
            {labs.map((l, i) => (
              <span key={l.name}>
                {i > 0 && <span className="kicker-sep">/</span>}
                <span className="swatch" style={{ background: l.color }} aria-hidden="true" />
                {l.name}
              </span>
            ))}
          </p>
          <h1>
            Model release <em>timeline</em>
          </h1>
          <p className="hero-sub">
            {total} releases{firstYear && ` since ${firstYear}`}, every announcement and launch on one line.
            {researchedOn && <> Data checked {formatDate(researchedOn)}.</>}
          </p>

          {latestDate && daysSince !== null && (
            <div className="counter">
              <div className="counter-num">
                {daysSince === 0 ? (
                  <>
                    <span className="counter-value">Today</span>
                    <span className="counter-unit">
                      {latest.length === 1 ? 'a new release' : `${latest.length} new releases`}
                      <br />
                      shipped today
                    </span>
                  </>
                ) : (
                  <>
                    <span className="counter-value">{daysSince}</span>
                    <span className="counter-unit">
                      {daysSince === 1 ? 'day' : 'days'}
                      <br />
                      since the last release
                    </span>
                  </>
                )}
              </div>
              <div className="counter-latest">
                <span className={`live-dot${daysSince <= 7 ? ' is-live' : ''}`} aria-hidden="true" />
                <span className="muted">{formatDate(latestDate)}</span>
                {latest.map((r) => (
                  <button key={r.id} type="button" className="latest-chip" onClick={() => onSelect(r.id)}>
                    {r.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        {aside}
      </div>
    </header>
  );
}
