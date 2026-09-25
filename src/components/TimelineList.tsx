import { Fragment } from 'react';
import { releaseDate, type DateBasis, type Release } from '../data/normalize';
import { adjacentGaps } from '../lib/gaps';
import { formatDate, formatGap, formatMonth, formatWeekday } from '../lib/dates';
import type { SortOrder } from '../lib/filter';

interface Props {
  releases: Release[];
  basis: DateBasis;
  sort: SortOrder;
  daysSinceLatest: number | null;
  labColor: (lab: string) => string;
  onSelect: (id: string) => void;
}

function GapBadge({ label, tone = 'default' }: { label: string; tone?: 'default' | 'accent' }) {
  return (
    <li className={`gap gap-${tone}`} aria-label={label}>
      <span className="gap-pill">{label}</span>
    </li>
  );
}

function sinceLabel(days: number) {
  return days === 0 ? 'Released today' : `${formatGap(days)} since last release`;
}

export function TimelineList({ releases, basis, sort, daysSinceLatest, labColor, onSelect }: Props) {
  if (!releases.length) {
    return (
      <section className="card empty">
        <p>No releases match these filters.</p>
      </section>
    );
  }

  const gaps = adjacentGaps(releases, basis);
  const since = daysSinceLatest !== null && daysSinceLatest >= 0 ? sinceLabel(daysSinceLatest) : null;

  return (
    <section aria-labelledby="list-heading">
      <h2 id="list-heading" className="visually-hidden">
        Releases
      </h2>
      <ol className="timeline">
        {sort === 'desc' && since && <GapBadge label={since} tone="accent" />}
        {releases.map((r, i) => {
          const date = releaseDate(r, basis);
          const month = date.slice(0, 7);
          const prevMonth = i > 0 ? releaseDate(releases[i - 1], basis).slice(0, 7) : null;
          const dt = r.events.find((e) => e.date === date && e.datetime)?.datetime;
          const time = dt ? `${dt.slice(11, 16)} UTC${dt.slice(19).replace(/^Z$/, '')}` : null;
          return (
            <Fragment key={r.id}>
              {i > 0 && <GapBadge label={formatGap(gaps[i - 1])} />}
              {month !== prevMonth && (
                <li className="month" aria-hidden="true">
                  {formatMonth(date)}
                </li>
              )}
              <li className="entry" style={{ ['--lab' as string]: labColor(r.lab) }}>
                <button type="button" className="entry-card" id={`release-${r.id}`} onClick={() => onSelect(r.id)}>
                  <span className="entry-date">
                    <time dateTime={date}>{formatDate(date)}</time>
                    <span className="weekday">{formatWeekday(date)}</span>
                    {time && (
                      <span className="entry-time" title="Publication time of the official announcement post">
                        {time}
                      </span>
                    )}
                  </span>
                  <span className="entry-main">
                    <span className="entry-title">
                      <span className="swatch" style={{ background: labColor(r.lab) }} aria-hidden="true" />
                      <span className="entry-name">{r.name}</span>
                      <span className="entry-lab">{r.lab}</span>
                    </span>
                    {r.description && <span className="entry-desc">{r.description}</span>}
                    <span className="tags">
                      {r.kind !== 'Model release' && <span className="tag tag-kind">{r.kind}</span>}
                      {r.channels.map((c) => (
                        <span key={c} className="tag">
                          {c}
                        </span>
                      ))}
                    </span>
                  </span>
                </button>
              </li>
            </Fragment>
          );
        })}
        {sort === 'asc' && since && <GapBadge label={since} tone="accent" />}
      </ol>
    </section>
  );
}
