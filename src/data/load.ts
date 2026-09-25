import rootFile from '../../model-releases.json';
import labsFile from '../../data/labs.json';
import { labsFileSchema, type LabsFile } from './schema';
import { normalizeFiles } from './normalize';

// Any extra release file dropped into data/releases/ is picked up at build time.
const extraFiles = import.meta.glob<unknown>('../../data/releases/*.json', {
  eager: true,
  import: 'default',
});

const { releases, issues } = normalizeFiles({
  'model-releases.json': rootFile,
  ...Object.fromEntries(
    Object.entries(extraFiles).map(([path, content]) => [path.replace('../../', ''), content]),
  ),
});

const labsParsed = labsFileSchema.safeParse(labsFile);
if (!labsParsed.success) issues.push({ source: 'data/labs.json', message: labsParsed.error.message });

if (issues.length && import.meta.env.DEV) {
  console.warn('[model-release-timeline] data issues:', issues);
}

export const labOverrides: LabsFile['labs'] = labsParsed.success ? labsParsed.data.labs : {};
export const datasetMeta = {
  title: (rootFile as { title?: string }).title ?? 'Model release timeline',
  researchedOn: (rootFile as { researched_on?: string }).researched_on ?? null,
};
export { releases, issues };
