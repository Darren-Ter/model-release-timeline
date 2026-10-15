const DAY_MS = 86_400_000;

/** Calendar day (YYYY-MM-DD) → epoch day number. Timezone-free by construction. */
export function toDayNumber(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / DAY_MS);
}

export function fromDayNumber(n: number): string {
  return new Date(n * DAY_MS).toISOString().slice(0, 10);
}

/** Whole days from a to b (positive when b is later). */
export function daysBetween(a: string, b: string): number {
  return toDayNumber(b) - toDayNumber(a);
}

export function addDays(iso: string, n: number): string {
  return fromDayNumber(toDayNumber(iso) + n);
}

export const TIMEZONES = {
  utc8: { zone: 'Asia/Kuala_Lumpur', label: 'UTC+8', option: 'UTC+8 · Malaysia' },
  pt: { zone: 'America/Los_Angeles', label: 'Pacific Time', option: 'PT · Pacific (PDT/PST)' },
  et: { zone: 'America/New_York', label: 'Eastern Time', option: 'ET · Eastern (EDT/EST)' },
} as const;
export type DisplayTimezone = keyof typeof TIMEZONES;
export const DEFAULT_TIMEZONE: DisplayTimezone = 'utc8';
export const isDisplayTimezone = (value: string | null): value is DisplayTimezone =>
  value !== null && Object.hasOwn(TIMEZONES, value);

// IANA zones handle US daylight saving for each instant, including historical dates.
const zoneFormats = Object.fromEntries(Object.entries(TIMEZONES).map(([key, { zone }]) => [key, {
  date: new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: zone }),
  time: new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: zone }),
  timestamp: new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: zone,
  }),
  label: new Intl.DateTimeFormat('en-US', { timeZone: zone, timeZoneName: 'short' }),
}])) as Record<DisplayTimezone, {
  date: Intl.DateTimeFormat; time: Intl.DateTimeFormat; timestamp: Intl.DateTimeFormat; label: Intl.DateTimeFormat;
}>;

/** Date-only records use midnight at fixed PDT (UTC−7), as the display assumption. */
export const assumePdtMidnight = (iso: string): string => `${iso}T00:00:00-07:00`;

/** Convert a verified or explicitly assumed instant to the selected calendar day. */
export function dateInTimezone(datetime: string | Date, timezone: DisplayTimezone = DEFAULT_TIMEZONE): string {
  const parts = zoneFormats[timezone].date.formatToParts(new Date(datetime));
  const part = (type: string) => parts.find((p) => p.type === type)!.value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

export function todayInTimezone(timezone: DisplayTimezone = DEFAULT_TIMEZONE, now = new Date()): string {
  return dateInTimezone(now, timezone);
}

export function timezoneLabel(datetime: string, timezone: DisplayTimezone = DEFAULT_TIMEZONE): string {
  return timezone === 'utc8' ? 'UTC+8' : zoneFormats[timezone].label.formatToParts(new Date(datetime))
    .find((p) => p.type === 'timeZoneName')!.value;
}

export function formatTime(datetime: string, timezone: DisplayTimezone = DEFAULT_TIMEZONE, options: { timezone?: boolean } = {}): string {
  const label = options.timezone === false ? '' : ` ${timezoneLabel(datetime, timezone)}`;
  return `${zoneFormats[timezone].time.format(new Date(datetime))}${label}`;
}

export function formatTimestamp(datetime: string, timezone: DisplayTimezone = DEFAULT_TIMEZONE, options: { weekday?: boolean; timezone?: boolean } = {}): string {
  const weekday = options.weekday ? `${formatWeekday(dateInTimezone(datetime, timezone))}, ` : '';
  const label = options.timezone === false ? '' : ` ${timezoneLabel(datetime, timezone)}`;
  return `${weekday}${zoneFormats[timezone].timestamp.format(new Date(datetime))}${label}`;
}

export function formatGap(days: number): string {
  const n = Math.abs(days);
  if (n === 0) return 'Same day';
  return `${n.toLocaleString()} ${n === 1 ? 'day' : 'days'}`;
}

const dateFmt = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
const monthFmt = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', timeZone: 'UTC' });
const weekdayFmt = new Intl.DateTimeFormat('en', { weekday: 'short', timeZone: 'UTC' });

const asUtc = (iso: string) => new Date(`${iso}T00:00:00Z`);

export const formatDate = (iso: string) => dateFmt.format(asUtc(iso));
export const formatMonth = (iso: string) => monthFmt.format(asUtc(iso));
export const formatWeekday = (iso: string) => weekdayFmt.format(asUtc(iso));

export function isLeapYear(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}
