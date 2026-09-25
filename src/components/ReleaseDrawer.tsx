import { useEffect, useRef } from 'react';
import type { Release } from '../data/normalize';
import { formatDate, formatWeekday } from '../lib/dates';

interface Props {
  release: Release | null;
  labColor: (lab: string) => string;
  onClose: () => void;
}

const timeFmt = (datetime: string) => {
  const m = datetime.match(/T(\d{2}:\d{2})(?::\d{2})?([+-]\d{2}:\d{2}|Z)$/);
  return m ? `${m[1]} UTC${m[2] === 'Z' ? '' : m[2]}` : null;
};

const host = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

export function ReleaseDrawer({ release, labColor, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

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

          <dl className="facts">
            <dt>Announced</dt>
            <dd>{formatDate(release.announcementDate)}</dd>
            <dt>First available</dt>
            <dd>{formatDate(release.availabilityDate)}</dd>
            {release.channels.length > 0 && (
              <>
                <dt>Channels</dt>
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

          <h3>Events</h3>
          <ol className="events">
            {release.events.map((e) => (
              <li key={e.id}>
                <div className="event-head">
                  <span className={`event-type event-${e.type}`}>{e.type}</span>
                  <span>
                    {formatWeekday(e.date)}, {formatDate(e.date)}
                    {e.datetime && timeFmt(e.datetime) && <span className="muted"> · {timeFmt(e.datetime)}</span>}
                    {e.approximate && <span className="approx">date only</span>}
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

          {(release.releaseNoteUrl || release.documentationUrl) && (
            <p className="drawer-links">
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
