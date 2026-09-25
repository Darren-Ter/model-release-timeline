import { z } from 'zod';

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD');

// Mirrors the structure of model-releases.json. Only the fields the UI reads are
// required; everything else is optional so other labs' files can be sparser.
// Unknown keys are kept (loose) so new metadata never breaks loading.
export const eventSchema = z.looseObject({
  id: z.string().optional(),
  type: z.string(), // "announcement" | "availability" today; other types are tolerated
  source_date: isoDate,
  display_date: isoDate.optional(),
  source_timezone: z.string().nullish(),
  datetime_utc: z.string().nullish(),
  datetime_utc8: z.string().nullish(),
  weekday_utc8: z.string().nullish(),
  precision: z.string().nullish(),
  timestamp_basis: z.string().nullish(),
  date_basis: z.string().nullish(),
  source_url: z.string().nullish(),
  channels: z.array(z.string()).nullish(),
  is_first_availability: z.boolean().nullish(),
});

export const modelSchema = z.looseObject({
  id: z.string(),
  company: z.string(),
  name: z.string(),
  slug: z.string().nullish(),
  snapshot_ids: z.array(z.string()).nullish(),
  description: z.string().nullish(),
  release_kind: z.string().nullish(),
  release_note_url: z.string().nullish(),
  documentation_url: z.string().nullish(),
  channels: z.array(z.string()).nullish(),
  notes: z.string().nullish(),
  events: z.array(eventSchema).min(1),
});

export const releaseFileSchema = z.looseObject({
  title: z.string().optional(),
  researched_on: z.string().optional(),
  timezone: z.string().optional(),
  models: z.array(z.unknown()),
});

export const labsFileSchema = z.object({
  labs: z.record(
    z.string(),
    z.object({
      slot: z.number().int().min(1).max(8).optional(),
      color: z.string().optional(),
      url: z.string().optional(),
    }),
  ),
});

export type RawEvent = z.infer<typeof eventSchema>;
export type RawModel = z.infer<typeof modelSchema>;
export type LabsFile = z.infer<typeof labsFileSchema>;
