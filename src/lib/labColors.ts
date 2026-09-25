import type { LabsFile } from '../data/schema';

export const SLOT_COUNT = 8;

export interface LabInfo {
  name: string;
  /** CSS colour expression, e.g. `var(--series-1)` or a literal from labs.json. */
  color: string;
  url: string | null;
  count: number;
}

/**
 * Colour follows the lab, never its rank: labs pinned in labs.json keep their
 * slot, the rest take the remaining slots in alphabetical order. Once the
 * eight categorical slots are used up, extra labs fall back to a neutral ink —
 * lanes and labels still identify them.
 */
export function buildLabs(labCounts: Map<string, number>, overrides: LabsFile['labs']): LabInfo[] {
  const names = [...labCounts.keys()].sort((a, b) => a.localeCompare(b));
  const taken = new Set<number>();
  for (const name of names) {
    const slot = overrides[name]?.slot;
    if (slot) taken.add(slot);
  }
  const free = Array.from({ length: SLOT_COUNT }, (_, i) => i + 1).filter((s) => !taken.has(s));

  return names.map((name) => {
    const o = overrides[name] ?? {};
    let color: string;
    if (o.color) color = o.color;
    else if (o.slot) color = `var(--series-${o.slot})`;
    else {
      const slot = free.shift();
      color = slot ? `var(--series-${slot})` : 'var(--series-overflow)';
    }
    return { name, color, url: o.url ?? null, count: labCounts.get(name) ?? 0 };
  });
}
