import { Fragment, useEffect, useRef } from 'react';
import { displayEventDatetime, eventDatetime, releaseDate, releaseEvent, timelineEvent, type DateBasis, type Release } from '../data/normalize';
import { adjacentGaps } from '../lib/gaps';
import { daysBetween, DEFAULT_TIMEZONE, formatGap, formatTime, formatTimestamp, formatWeekday, type DisplayTimezone } from '../lib/dates';
import type { SortOrder } from '../lib/filter';
import { LabMark } from './LabMark';
import { XPostLink } from './XPostLink';
import { TeaserNote } from './TeaserNote';

interface Props {
  releases: Release[];
  basis: DateBasis;
  timezone?: DisplayTimezone;
  sort: SortOrder;
  showGaps: boolean;
  daysSinceLatest: number | null;
  today: string;
  labColor: (lab: string) => string;
  onSelect: (id: string) => void;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const NEW_WITHIN_DAYS = 14;

/** Spine length grows with the gap (square-root scale) so long silences read as long. */
const gapHeight = (days: number) => Math.round(Math.min(120, Math.max(22, 10 + Math.sqrt(days) * 9)));

function Gap({ days, label, accent }: { days: number; label: string; accent?: boolean }) {
  return (
    <li className={`tl-gap${accent ? ' is-accent' : ''}`} style={{ ['--gap-h' as string]: `${gapHeight(days)}px` }}>
      <span className="tl-gap-pill">{label}</span>
    </li>
  );
}

/** Fades cards in as they scroll into view (skipped when reduced motion is preferred). */
function useReveal(dep: unknown) {
  const ref = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = root.querySelectorAll<HTMLElement>('.tl-item:not([data-shown])');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((el) => el.setAttribute('data-shown', ''));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute('data-shown', '');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -40px 0px' },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
  return ref;
}

export function TimelineList({ releases, basis, timezone = DEFAULT_TIMEZONE, sort, showGaps, daysSinceLatest, today, labColor, onSelect }: Props) {
  const ref = useReveal(releases);

  if (!releases.length) {
    return (
      <section className="empty">
        <p className="empty-title">Nothing matches.</p>
        <p className="muted">Try widening the date range or clearing a filter.</p>
      </section>
    );
  }

  const gaps = adjacentGaps(releases, basis, timezone);
  const since =
    showGaps && daysSinceLatest !== null && daysSinceLatest >= 0 ? (
      <Gap
        days={daysSinceLatest}
        accent
        label={daysSinceLatest === 0 ? 'Released today' : `${formatGap(daysSinceLatest)} since last release`}
      />
    ) : null;

  return (
    <section aria-labelledby="list-heading" className="tl-wrap">
      <h2 id="list-heading" className="visually-hidden">
        Releases
      </h2>
      <ol className={`tl${showGaps ? ' with-gaps' : ''}`} ref={ref}>
        {sort === 'desc' && since}
        {releases.map((r, i) => {
          const date = releaseDate(r, basis, timezone);
          const prev = i > 0 ? releaseDate(releases[i - 1], basis, timezone) : null;
          const year = date.slice(0, 4);
          const month = date.slice(0, 7);
          const event = timelineEvent(r, basis);
          const isFallback = !releaseEvent(r, basis);
          const dt = displayEventDatetime(r, event);
          const time = formatTime(dt, timezone, { timezone: false });
          const isAssumed = !eventDatetime(r, event);
          const age = daysBetween(date, today);
          const isNew = age >= 0 && age <= NEW_WITHIN_DAYS;
          const side = i % 2 === 0 ? 'left' : 'right';

          return (
            <Fragment key={r.id}>
              {i > 0 && showGaps && <Gap days={gaps[i - 1]} label={formatGap(gaps[i - 1])} />}
              {year !== prev?.slice(0, 4) && (
                <li className="tl-year" aria-hidden="true">
                  <span>{year}</span>
                </li>
              )}
              {month !== prev?.slice(0, 7) && (
                <li className="tl-month" aria-hidden="true">
                  <span>{MONTHS[+date.slice(5, 7) - 1]}</span>
                </li>
              )}
              <li className={`tl-item side-${side}`} style={{ ['--lab' as string]: labColor(r.lab) }}>
                <span className="tl-node" aria-hidden="true" />
                <div className={`rcard-wrap${r.teaser ? ' has-teaser' : ''}`}>
                  <div className="rcard-main">
                    <button type="button" className="rcard" id={`release-${r.id}`} onClick={() => onSelect(r.id)}>
                      <span className="rcard-top">
                        <LabMark lab={r.lab} />
                        <span className="rcard-lab">{r.lab}</span>
                        {r.kind !== 'Model release' && <span className="badge">{r.kind}</span>}
                        {isNew && !r.dateDisputed && <span className="badge badge-new">New</span>}
                        <span className="rcard-date">
                          <time dateTime={date}>
                            {MONTHS[+date.slice(5, 7) - 1].slice(0, 3)} {+date.slice(8)}
                          </time>
                          <span className="rcard-when" title={isAssumed ? 'Assumed 00:00 PDT (UTC−7); exact event time unknown' : undefined}>
                            {formatWeekday(date)}
                            {` · ${isAssumed ? '~' : ''}${time}`}
                          </span>
                        </span>
                      </span>
                      <span className="rcard-name">{r.name}</span>
                      {r.description && <span className="rcard-desc">{r.description}</span>}
                      {r.announcementXDatetime && (
                        <span className="rcard-x-time">
                          <span className="rcard-x-time-label">X announcement</span>
                          <time dateTime={r.announcementXDatetime}>{formatTimestamp(r.announcementXDatetime, timezone, { timezone: false })}</time>
                        </span>
                      )}
                      {(isFallback || r.dateDisputed) && (
                        <span className="rcard-date-note">
                          {r.dateDisputed && 'Date uncertain. '}
                          {isFallback && `${event.type === 'announcement' ? 'Announcement' : event.type === 'availability' ? 'Availability' : 'Recorded event'} date · ${basis === 'announcement' ? 'announcement' : 'availability'} not documented`}
                        </span>
                      )}
                      <span className="rcard-footer">
                        <span className="tags">
                          {r.channels.map((c) => (
                            <span key={c} className="tag">
                              {c}
                            </span>
                          ))}
                        </span>
                      </span>
                    </button>
                    <XPostLink name={r.name} url={r.announcementXUrl} className="rcard-x" />
                  </div>
                  <TeaserNote release={r} timezone={timezone} className="rcard-teaser" />
                </div>
              </li>
            </Fragment>
          );
        })}
        {sort === 'asc' && since}
      </ol>
    </section>
  );
}
