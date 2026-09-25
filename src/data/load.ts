import labsFile from '../../data/labs.json';
import { labsFileSchema, type LabsFile } from './schema';
import { normalizeFiles } from './normalize';

// Pick up each lab's model file in data/; labs.json is UI configuration.
const files = import.meta.glob<unknown>(['../../data/*.json', '!../../data/labs.json'], {
  eager: true,
  import: 'default',
});

const { releases, issues } = normalizeFiles(
  Object.fromEntries(Object.entries(files).map(([path, content]) => [path.replace('../../', ''), content])),
);

const labsParsed = labsFileSchema.safeParse(labsFile);
if (!labsParsed.success) issues.push({ source: 'data/labs.json', message: labsParsed.error.message });

if (issues.length && import.meta.env.DEV) {
  console.warn('[model-release-timeline] data issues:', issues);
}

type FileMeta = { researched_on?: string; timezone?: string };
const metas = Object.values(files) as FileMeta[];
const timezones = [...new Set(metas.map((m) => m.timezone).filter(Boolean))];

export const labOverrides: LabsFile['labs'] = labsParsed.success ? labsParsed.data.labs : {};
export const datasetMeta = {
  /** Most recent research date across files. */
  researchedOn: metas.map((m) => m.researched_on ?? '').sort().at(-1) || null,
  /** Shared display timezone, or null when files disagree. */
  timezone: timezones.length === 1 ? timezones[0]! : null,
};
export { releases, issues };
