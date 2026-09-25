import type { OnThisDayItem, OnThisDayResult } from '../lib/onThisDay';
import { formatDate } from '../lib/dates';

interface Props {
  result: OnThisDayResult;
  today: string;
  labColor: (lab: string) => string;
  onSelect: (id: string) => void;
}

const todayFmt = new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', timeZone: 'UTC' });

function Item({ item, labColor, onSelect }: { item: OnThisDayItem; labColor: Props['labColor']; onSelect: Props['onSelect'] }) {
  const { release, yearsAgo, offsetDays, date } = item;
  return (
    <li>
      <button type="button" className="otd-item" onClick={() => onSelect(release.id)}>
        <span className="otd-years">
          {yearsAgo} {yearsAgo === 1 ? 'year' : 'years'} ago
          {offsetDays !== 0 && (
            <span className="otd-offset">
              {' '}
              ({Math.abs(offsetDays)} {Math.abs(offsetDays) === 1 ? 'day' : 'days'} {offsetDays < 0 ? 'earlier' : 'later'})
            </span>
          )}
        </span>
        <span className="otd-name">
          <span className="swatch" style={{ background: labColor(release.lab) }} aria-hidden="true" />
          {release.name}
        </span>
        <span className="otd-meta">
          {release.lab} · {formatDate(date)}
        </span>
      </button>
    </li>
  );
}

export function OnThisDay({ result, today, labColor, onSelect }: Props) {
  const heading = `On this day · ${todayFmt.format(new Date(`${today}T00:00:00Z`))}`;
  const { exact, nearby, windowDays } = result;
  return (
    <section className="card otd" aria-labelledby="otd-heading">
      <h2 id="otd-heading">{heading}</h2>
      {exact.length > 0 ? (
        <ul className="otd-list">
          {exact.map((i) => (
            <Item key={i.release.id} item={i} labColor={labColor} onSelect={onSelect} />
          ))}
        </ul>
      ) : nearby.length > 0 ? (
        <>
          <p className="muted">No releases on this exact date in earlier years. Closest within ±{windowDays} days:</p>
          <ul className="otd-list">
            {nearby.map((i) => (
              <Item key={i.release.id} item={i} labColor={labColor} onSelect={onSelect} />
            ))}
          </ul>
        </>
      ) : (
        <p className="muted">No releases on this date, or within ±{windowDays} days, in earlier years.</p>
      )}
    </section>
  );
}
