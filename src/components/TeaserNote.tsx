import type { Release } from '../data/normalize';
import { DEFAULT_TIMEZONE, formatTimestamp, type DisplayTimezone } from '../lib/dates';

interface Props {
  release: Release;
  timezone?: DisplayTimezone;
  details?: boolean;
  className?: string;
}

export function TeaserNote({ release, timezone = DEFAULT_TIMEZONE, details = false, className = '' }: Props) {
  const teaser = release.teaser;
  if (!teaser) return null;

  // Whole elapsed minutes, using instants rather than the timeline's source calendar dates.
  const minutes = Math.floor((Date.parse(teaser.announcementDatetime) - Date.parse(teaser.datetime)) / 60_000);
  const lead = `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, '0')}m`;
  const announcementTime = <time dateTime={teaser.announcementDatetime}>{formatTimestamp(teaser.announcementDatetime, timezone, { weekday: true })}</time>;

  return (
    <aside className={`teaser-note ${className}`} aria-label={`Launch teaser for ${release.name}`}>
      <p className="teaser-summary">
        <a href={teaser.url} target="_blank" rel="noopener noreferrer"
          aria-label={`View ${teaser.author}'s ${teaser.text} teaser for ${release.name} on X (opens in a new tab)`}>
          {teaser.author}’s “{teaser.text}” teaser ↗
        </a>
        <span><strong>{lead}</strong> before the official launch announcement</span>
      </p>
      {teaser.context && (
        <p className="teaser-context">
          <a href={teaser.context.url} target="_blank" rel="noopener noreferrer">{teaser.context.text} ↗</a>
        </p>
      )}
      {details && (
        <>
          <dl className="facts teaser-facts">
            <dt>Teaser posted</dt>
            <dd><time dateTime={teaser.datetime}>{formatTimestamp(teaser.datetime, timezone, { weekday: true })}</time></dd>
            <dt>Official launch post</dt>
            <dd>{release.announcementXUrl ? (
              <a href={release.announcementXUrl} target="_blank" rel="noopener noreferrer">{announcementTime} ↗</a>
            ) : announcementTime}</dd>
          </dl>
          <p className="teaser-basis">Compared with the official announcement on X; the exact time access began is not documented.</p>
        </>
      )}
    </aside>
  );
}
