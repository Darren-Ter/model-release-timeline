import { modelSchema, releaseFileSchema, type RawModel } from './schema';
import { xPostDatetime, xPostUrl } from '../lib/xPosts';
import { assumePdtMidnight, dateInTimezone, DEFAULT_TIMEZONE, type DisplayTimezone } from '../lib/dates';

export type DateBasis = 'announcement' | 'availability';

export interface ReleaseEvent {
  id: string;
  type: string;
  date: string; // YYYY-MM-DD calendar day as displayed by the dataset
  sourceDate: string; // Original calendar date before any dataset display conversion.
  /** Full timestamp in the dataset's display timezone, when one was established. */
  datetime: string | null;
  approximate: boolean;
  sourceUrl: string | null;
  channels: string[];
  isFirstAvailability: boolean;
}

export interface ReleaseTeaser {
  author: string;
  text: string;
  url: string;
  datetime: string;
  /** Timestamp of the official X announcement, independent of date-only release events. */
  announcementDatetime: string;
  context: { text: string; url: string } | null;
}

export interface Release {
  id: string;
  lab: string;
  name: string;
  slug: string | null;
  kind: string;
  description: string;
  notes: string;
  dateDisputed: boolean;
  channels: string[];
  snapshotIds: string[];
  releaseNoteUrl: string | null;
  documentationUrl: string | null;
  announcementXUrl: string | null;
  /** Creation time of the linked official X post, independent of release event dates. */
  announcementXDatetime: string | null;
  teaser: ReleaseTeaser | null;
  events: ReleaseEvent[];
  announcementDate: string;
  availabilityDate: string;
  /** Pre-lowercased haystack for search. */
  searchText: string;
}

export interface LoadIssue {
  source: string;
  message: string;
}

function toEvent(raw: RawModel['events'][number], index: number, modelId: string): ReleaseEvent {
  return {
    id: raw.id ?? `${modelId}-${raw.type}-${index + 1}`,
    type: raw.type,
    date: raw.display_date ?? raw.source_date,
    sourceDate: raw.source_date,
    datetime: raw.datetime_utc8 ?? null,
    approximate: (raw.precision ?? 'date_only') === 'date_only',
    sourceUrl: raw.source_url ?? null,
    channels: raw.channels ?? [],
    isFirstAvailability: raw.is_first_availability === true,
  };
}

const byDate = (a: ReleaseEvent, b: ReleaseEvent) => a.date.localeCompare(b.date);

export function normalizeModel(raw: RawModel): Release {
  const events = raw.events.map((e, i) => toEvent(e, i, raw.id));
  const sorted = [...events].sort(byDate);
  const announcement = sorted.find((e) => e.type === 'announcement');
  const availabilities = sorted.filter((e) => e.type === 'availability');
  const firstAvailability = availabilities.find((e) => e.isFirstAvailability) ?? availabilities[0];

  // Each basis falls back to the other (then to the earliest event) so every
  // release always has a position on the timeline.
  const earliest = sorted[0].date;
  const announcementDate = announcement?.date ?? firstAvailability?.date ?? earliest;
  const availabilityDate = firstAvailability?.date ?? announcementDate;

  const snapshotIds = raw.snapshot_ids ?? [];
  const slug = raw.slug && raw.slug !== 'not published' ? raw.slug : null;
  const announcementXUrl = xPostUrl(raw.announcement_x_url) ??
    sorted.filter((e) => e.type === 'announcement').map((e) => xPostUrl(e.sourceUrl)).find(Boolean) ?? null;

  return {
    id: raw.id,
    lab: raw.company,
    name: raw.name,
    slug,
    kind: raw.release_kind ?? 'Model release',
    description: raw.description ?? '',
    notes: raw.notes ?? '',
    dateDisputed: raw.date_disputed === true,
    channels: raw.channels ?? [...new Set(events.flatMap((e) => e.channels))],
    snapshotIds,
    releaseNoteUrl: raw.release_note_url ?? null,
    documentationUrl: raw.documentation_url ?? null,
    announcementXUrl,
    announcementXDatetime: xPostDatetime(announcementXUrl),
    teaser: raw.teaser ? {
      author: raw.teaser.author,
      text: raw.teaser.text,
      url: xPostUrl(raw.teaser.x_url)!,
      datetime: raw.teaser.datetime_utc8,
      announcementDatetime: raw.teaser.announcement_datetime_utc8,
      context: raw.teaser.context ? {
        text: raw.teaser.context.text,
        url: xPostUrl(raw.teaser.context.x_url)!,
      } : null,
    } : null,
    events: sorted,
    announcementDate,
    availabilityDate,
    searchText: [raw.name, raw.id, slug, raw.company, raw.description, ...(raw.aliases ?? []), ...snapshotIds]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
  };
}

/**
 * Parses any number of release files (data/*.json) and
 * merges them. Later files win on duplicate ids. Invalid entries are skipped
 * and reported instead of failing the whole load.
 */
export function normalizeFiles(files: Record<string, unknown>): {
  releases: Release[];
  issues: LoadIssue[];
} {
  const byId = new Map<string, Release>();
  const issues: LoadIssue[] = [];

  for (const [source, content] of Object.entries(files)) {
    const file = releaseFileSchema.safeParse(content);
    if (!file.success) {
      issues.push({ source, message: 'File does not contain a `models` array.' });
      continue;
    }
    file.data.models.forEach((entry, i) => {
      const model = modelSchema.safeParse(entry);
      if (!model.success) {
        const id = (entry as { id?: unknown })?.id;
        issues.push({
          source,
          message: `Skipped models[${i}]${typeof id === 'string' ? ` (${id})` : ''}: ${model.error.issues
            .map((iss) => `${iss.path.join('.')}: ${iss.message}`)
            .join('; ')}`,
        });
        return;
      }
      if (byId.has(model.data.id)) {
        issues.push({ source, message: `Duplicate id "${model.data.id}" replaced an earlier entry.` });
      }
      byId.set(model.data.id, normalizeModel(model.data));
    });
  }

  return { releases: [...byId.values()], issues };
}

/** Presentation dates follow verified instants or the explicit PDT display assumption. */
export function releaseDate(r: Release, basis: DateBasis, timezone: DisplayTimezone = DEFAULT_TIMEZONE): string {
  return displayEventDate(r, timelineEvent(r, basis), timezone);
}

/** An official announcement post establishes announcement time, never availability time. */
export function eventDatetime(r: Release, event: ReleaseEvent): string | null {
  return event.datetime ?? (event.type === 'announcement' && event.id === releaseEvent(r, 'announcement')?.id
    ? r.announcementXDatetime : null);
}

/** Use a display-only assumption when no verified event or announcement-post time exists. */
export function displayEventDatetime(r: Release, event: ReleaseEvent): string {
  return eventDatetime(r, event) ?? assumePdtMidnight(event.sourceDate);
}

export function displayEventDate(r: Release, event: ReleaseEvent, timezone: DisplayTimezone = DEFAULT_TIMEZONE): string {
  return dateInTimezone(displayEventDatetime(r, event), timezone);
}

/** The sourced event for this basis, without inventing a missing event. */
export function releaseEvent(r: Release, basis: DateBasis): ReleaseEvent | null {
  const events = r.events.filter((e) => e.type === basis);
  return (basis === 'availability' ? events.find((e) => e.isFirstAvailability) ?? events[0] : events[0]) ?? null;
}

/** A fallback keeps sparse records on the timeline; callers must label it. */
export function timelineEvent(r: Release, basis: DateBasis): ReleaseEvent {
  return releaseEvent(r, basis) ?? releaseEvent(r, basis === 'announcement' ? 'availability' : 'announcement') ?? r.events[0];
}
