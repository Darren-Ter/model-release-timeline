import type { OnThisDayItem, OnThisDayResult } from '../lib/onThisDay';
import { useEffect, useState } from 'react';
import { LabMark } from './LabMark';

interface Props {
  result: OnThisDayResult;
  today: string;
  labColor: (lab: string) => string;
  onSelect: (id: string) => void;
}

const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function Item({ item, labColor, onSelect }: { item: OnThisDayItem; labColor: Props['labColor']; onSelect: Props['onSelect'] }) {
  const { release, yearsAgo } = item;
  return (
    <li>
      <button
        type="button"
        className="otd-item"
        style={{ ['--lab' as string]: labColor(release.lab) }}
        onClick={() => onSelect(release.id)}
      >
        <LabMark lab={release.lab} />
        <span className="otd-text">
          <span className="otd-name">{release.name}</span>
          <span className="otd-meta">
            {yearsAgo} {yearsAgo === 1 ? 'year' : 'years'} ago
          </span>
        </span>
      </button>
    </li>
  );
}

export function OnThisDay({ result, today, labColor, onSelect }: Props) {
  const [open, setOpen] = useState(() => typeof window === 'undefined' || !window.matchMedia('(max-width: 560px)').matches);
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 560px)');
    const update = () => setOpen(!mobile.matches);
    mobile.addEventListener('change', update);
    return () => mobile.removeEventListener('change', update);
  }, []);

  return (
    <details className="otd" open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
      <summary className="otd-summary">
        <span className="otd-cal" aria-hidden="true">
          <span className="otd-cal-month">{MON[+today.slice(5, 7) - 1]}</span>
          <span className="otd-cal-day">{+today.slice(8)}</span>
        </span>
        <h2>On this day</h2>
        <span className="otd-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div className="otd-body">
        {result.exact.length === 0 ? (
          <p className="otd-note">No recorded releases on this date in earlier years.</p>
        ) : (
          <ul className="otd-list">
            {result.exact.map((i) => (
              <Item key={i.release.id} item={i} labColor={labColor} onSelect={onSelect} />
            ))}
          </ul>
        )}
      </div>
    </details>
  );
}
