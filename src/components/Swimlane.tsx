import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { releaseDate, releaseEvent, type DateBasis, type Release } from '../data/normalize';
import { DEFAULT_TIMEZONE, formatDate, fromDayNumber, toDayNumber, type DisplayTimezone } from '../lib/dates';
import type { LabInfo } from '../lib/labColors';

interface Props {
  releases: Release[];
  labs: LabInfo[];
  basis: DateBasis;
  timezone?: DisplayTimezone;
  from: string | null;
  to: string | null;
  today: string;
  onSelect: (id: string) => void;
}

interface Group {
  key: string;
  lab: string;
  date: string;
  releases: Release[];
}

const LANE_H = 40;
const AXIS_H = 28;
const PAD_TOP = 8;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Tracks an element's width; a callback ref so it re-attaches if the element remounts. */
function useWidth<T extends HTMLElement>() {
  const [width, setWidth] = useState(800);
  const observer = useRef<ResizeObserver | null>(null);
  const ref = useCallback((el: T | null) => {
    observer.current?.disconnect();
    if (!el) return;
    setWidth(el.getBoundingClientRect().width);
    observer.current = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.current.observe(el);
  }, []);
  useEffect(() => () => observer.current?.disconnect(), []);
  return [ref, width] as const;
}

/** Month-aligned ticks with a step chosen so labels don't collide. */
function makeTicks(start: number, end: number, width: number) {
  const maxTicks = Math.max(2, Math.floor(width / 72));
  const spanDays = end - start;
  if (spanDays <= 45) {
    const step = spanDays <= 14 ? 2 : 7;
    const ticks: { day: number; label: string; major: boolean }[] = [];
    for (let d = start; d <= end; d += step) {
      const iso = fromDayNumber(d);
      ticks.push({ day: d, label: `${MONTHS[+iso.slice(5, 7) - 1]} ${+iso.slice(8)}`, major: false });
    }
    return ticks;
  }
  const s = fromDayNumber(start);
  let y = +s.slice(0, 4);
  let m = +s.slice(5, 7) - 1;
  const monthsSpan = spanDays / 30.4;
  const step = [1, 2, 3, 6, 12].find((n) => monthsSpan / n <= maxTicks) ?? 12;
  const ticks: { day: number; label: string; major: boolean }[] = [];
  m += 1; // first month boundary after start
  while (true) {
    if (m > 11) {
      y += Math.floor(m / 12);
      m %= 12;
    }
    const day = toDayNumber(`${y}-${String(m + 1).padStart(2, '0')}-01`);
    if (day > end) break;
    if (m % step === 0) ticks.push({ day, label: m === 0 ? String(y) : MONTHS[m], major: m === 0 });
    m += 1;
  }
  return ticks;
}

export function Swimlane({ releases, labs, basis, timezone = DEFAULT_TIMEZONE, from, to, today, onSelect }: Props) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<Group | null>(null);
  const labelW = width < 560 ? 84 : 128;
  const plotW = Math.max(120, width - labelW - 16);

  const lanes = useMemo(() => {
    const present = new Set(releases.map((r) => r.lab));
    return labs.filter((l) => present.has(l.name));
  }, [releases, labs]);

  const groups = useMemo(() => {
    const map = new Map<string, Group>();
    for (const r of releases) {
      const date = releaseDate(r, basis, timezone);
      const key = `${r.lab}|${date}`;
      const g = map.get(key) ?? { key, lab: r.lab, date, releases: [] };
      g.releases.push(r);
      map.set(key, g);
    }
    return [...map.values()];
  }, [releases, basis, timezone]);

  const days = groups.map((g) => toDayNumber(g.date));
  const todayN = toDayNumber(today);
  let start = from ? toDayNumber(from) : Math.min(...days);
  let end = to ? toDayNumber(to) : Math.max(...days, todayN);
  if (!isFinite(start) || !isFinite(end)) return null;
  if (end - start < 7) {
    start -= 3;
    end += 4;
  }
  const pad = (end - start) * 0.02;
  const x0 = start - pad;
  const x1 = end + pad;
  const x = (d: number) => labelW + ((d - x0) / (x1 - x0)) * plotW;
  const ticks = makeTicks(start, end, plotW);
  const height = PAD_TOP + lanes.length * LANE_H + AXIS_H;
  const laneY = (lab: string) => PAD_TOP + lanes.findIndex((l) => l.name === lab) * LANE_H + LANE_H / 2;
  const colorOf = (lab: string) => lanes.find((l) => l.name === lab)?.color ?? 'var(--series-overflow)';

  if (!lanes.length) return null;

  return (
    <section className="card chart" aria-labelledby="chart-heading">
      <div className="chart-head">
        <h2 id="chart-heading">Cadence by lab</h2>
        <p className="muted small">
          Each dot is {basis === 'announcement' ? 'an announcement' : 'a recorded availability'} date; larger dots mark several
          releases on the same day.
          {releases.some((r) => !releaseEvent(r, basis)) && ' When that date is unknown, the other recorded event is shown.'}
        </p>
      </div>
      <div className="chart-body" ref={ref}>
        <svg width={width} height={height} role="img" aria-label={`Timeline of ${releases.length} releases across ${lanes.length} labs`}>
          {/* lanes */}
          {lanes.map((l, i) => (
            <g key={l.name}>
              <line
                x1={labelW}
                x2={labelW + plotW}
                y1={PAD_TOP + i * LANE_H + LANE_H / 2}
                y2={PAD_TOP + i * LANE_H + LANE_H / 2}
                className="lane-line"
              />
              <text x={labelW - 12} y={PAD_TOP + i * LANE_H + LANE_H / 2} className="lane-label" dominantBaseline="middle" textAnchor="end">
                {l.name.length > 16 && width < 560 ? `${l.name.slice(0, 11)}…` : l.name}
              </text>
            </g>
          ))}
          {/* grid + axis */}
          {ticks.map((t) => (
            <g key={t.day}>
              <line x1={x(t.day)} x2={x(t.day)} y1={PAD_TOP} y2={height - AXIS_H} className={t.major ? 'grid major' : 'grid'} />
              <text x={x(t.day)} y={height - AXIS_H + 18} className={t.major ? 'tick major' : 'tick'} textAnchor="middle">
                {t.label}
              </text>
            </g>
          ))}
          <line x1={labelW} x2={labelW + plotW} y1={height - AXIS_H} y2={height - AXIS_H} className="axis" />
          {todayN >= x0 && todayN <= x1 && (
            <g>
              <line x1={x(todayN)} x2={x(todayN)} y1={PAD_TOP - 4} y2={height - AXIS_H} className="today-line" />
              <text x={x(todayN) - 4} y={PAD_TOP + 6} className="today-label" textAnchor="end">
                Today
              </text>
            </g>
          )}
          {/* dots */}
          {groups.map((g) => {
            const cx = x(toDayNumber(g.date));
            const cy = laneY(g.lab);
            const r = g.releases.length > 1 ? 7 : 5;
            const names = g.releases.map((rel) => rel.name).join(', ');
            return (
              <g
                key={g.key}
                className={`dot${hover?.key === g.key ? ' is-hover' : ''}`}
                tabIndex={0}
                role="button"
                aria-label={`${formatDate(g.date)}: ${names} (${g.lab})`}
                onPointerEnter={() => setHover(g)}
                onPointerLeave={() => setHover((h) => (h?.key === g.key ? null : h))}
                onFocus={() => setHover(g)}
                onBlur={() => setHover((h) => (h?.key === g.key ? null : h))}
                onClick={() => onSelect(g.releases[0].id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(g.releases[0].id);
                  }
                }}
              >
                <circle cx={cx} cy={cy} r={12} className="hit" />
                <circle cx={cx} cy={cy} r={r} style={{ fill: colorOf(g.lab) }} className="mark" />
              </g>
            );
          })}
        </svg>
        {hover && (
          <div
            className="tooltip"
            role="status"
            style={{
              left: Math.min(Math.max(x(toDayNumber(hover.date)), 110), width - 110),
              top: laneY(hover.lab) - 14,
            }}
          >
            <div className="tooltip-date">{formatDate(hover.date)}</div>
            {hover.releases.map((r) => (
              <div key={r.id} className="tooltip-row">
                <span className="tooltip-key" style={{ background: colorOf(r.lab) }} aria-hidden="true" />
                <strong>{r.name}</strong>
              </div>
            ))}
            <div className="tooltip-lab">{hover.lab}</div>
          </div>
        )}
      </div>
    </section>
  );
}
