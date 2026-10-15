import { useEffect, useRef } from 'react';
import { displayEventDatetime, eventDatetime, releaseEvent, type Release, type ReleaseEvent } from '../data/normalize';
import { DEFAULT_TIMEZONE, formatTimestamp, type DisplayTimezone } from '../lib/dates';
import { XPostLink } from './XPostLink';
import { TeaserNote } from './TeaserNote';

interface Props {
  release: Release | null;
  timezone?: DisplayTimezone;
  labColor: (lab: string) => string;
  onClose: () => void;
}

const host = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

export function ReleaseDrawer({ release, timezone = DEFAULT_TIMEZONE, labColor, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const announcement = release ? releaseEvent(release, 'announcement') : null;
  const availability = release ? releaseEvent(release, 'availability') : null;
  const eventTime = (event: ReleaseEvent) => {
    const datetime = displayEventDatetime(release!, event);
    return <>
      <time dateTime={datetime}>{formatTimestamp(datetime, timezone, { weekday: true })}</time>
      {!eventDatetime(release!, event) && <span className="approx">Assumed 00:00 PDT (UTC−7)</span>}
    </>;
  };

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (release && !d.open) d.showModal();
    if (!release && d.open) d.close();
  }, [release]);

  return (
    <dialog
      ref={ref}
      className="drawer"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="drawer-title"
    >
      {release && (
        <div className="drawer-inner">
          <header className="drawer-head">
            <div>
              <p className="drawer-lab">
                <span className="swatch" style={{ background: labColor(release.lab) }} aria-hidden="true" />
                {release.lab} · {release.kind}
              </p>
              <h2 id="drawer-title">{release.name}</h2>
            </div>
            <button type="button" className="icon-btn" onClick={onClose} aria-label="Close details">
              ×
            </button>
          </header>

          {release.description && <p className="drawer-desc">{release.description}</p>}
          {release.dateDisputed && <p className="date-caveat">Date uncertain — official sources differ. See notes below.</p>}

          <dl className="facts">
            <dt>Announced</dt>
            <dd>{announcement ? eventTime(announcement) : 'Not documented'}</dd>
            {release.announcementXUrl && release.announcementXDatetime && (
              <>
                <dt>X announcement</dt>
                <dd><a href={release.announcementXUrl} target="_blank" rel="noopener noreferrer">
                  <time dateTime={release.announcementXDatetime}>{formatTimestamp(release.announcementXDatetime, timezone)}</time> ↗
                </a></dd>
              </>
            )}
            <dt>{availability?.isFirstAvailability ? 'First documented access' : 'Recorded access'}</dt>
            <dd>{availability ? eventTime(availability) : 'Not documented'}</dd>
            {release.channels.length > 0 && (
              <>
                <dt>Recorded channels</dt>
                <dd>{release.channels.join(', ')}</dd>
              </>
            )}
            {release.slug && (
              <>
                <dt>Model slug</dt>
                <dd>
                  <code>{release.slug}</code>
                </dd>
              </>
            )}
            {release.snapshotIds.length > 0 && (
              <>
                <dt>Snapshot IDs</dt>
                <dd>
                  {release.snapshotIds.map((s) => (
                    <code key={s}>{s}</code>
                  ))}
                </dd>
              </>
            )}
          </dl>

          {release.teaser && (
            <>
              <h3>Launch teaser</h3>
              <TeaserNote release={release} timezone={timezone} details className="drawer-teaser" />
            </>
          )}

          <h3>Events</h3>
          <ol className="events">
            {release.events.map((e) => (
              <li key={e.id}>
                <div className="event-head">
                  <span className={`event-type event-${e.type}`}>{e.type}</span>
                  <span>
                    {eventTime(e)}
                    {!e.datetime && eventDatetime(release, e) && <span className="approx">X post time</span>}
                  </span>
                </div>
                {e.channels.length > 0 && <div className="muted small">{e.channels.join(', ')}</div>}
                {e.sourceUrl && (
                  <a href={e.sourceUrl} target="_blank" rel="noreferrer" className="small">
                    Source: {host(e.sourceUrl)} ↗
                  </a>
                )}
              </li>
            ))}
          </ol>

          {release.notes && (
            <>
              <h3>Notes</h3>
              <p className="small">{release.notes}</p>
            </>
          )}

          {(release.releaseNoteUrl || release.documentationUrl || release.announcementXUrl) && (
            <p className="drawer-links">
              {release.announcementXUrl && <XPostLink name={release.name} url={release.announcementXUrl} />}
              {release.releaseNoteUrl && (
                <a href={release.releaseNoteUrl} target="_blank" rel="noreferrer">
                  Release note ↗
                </a>
              )}
              {release.documentationUrl && (
                <a href={release.documentationUrl} target="_blank" rel="noreferrer">
                  Documentation ↗
                </a>
              )}
            </p>
          )}
        </div>
      )}
    </dialog>
  );
}
