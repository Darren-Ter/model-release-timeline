/** Lab monogram: initials of each word ("Google DeepMind" → "GD"), or the first letter for one word. */
export function labInitials(lab: string): string {
  const words = lab.split(/[\s\-_]+/).filter(Boolean);
  return (words.length > 1 ? words.slice(0, 2).map((w) => w[0]) : [lab[0] ?? '?']).join('').toUpperCase();
}

export function LabMark({ lab, size = 'sm' }: { lab: string; size?: 'sm' | 'lg' }) {
  return (
    <span className={`labmark labmark-${size}`} aria-hidden="true">
      {labInitials(lab)}
    </span>
  );
}
