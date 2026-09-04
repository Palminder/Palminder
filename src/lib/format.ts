const dayMonthYear = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});
const monthYear = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' });
const longMonthYear = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });

export function formatDate(date: Date): string {
  return dayMonthYear.format(date);
}

export function formatMonthYear(date: Date): string {
  return monthYear.format(date);
}

export function formatLongMonthYear(date: Date): string {
  return longMonthYear.format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function yearOf(date: Date): number {
  return date.getUTCFullYear();
}

/** Joins a list in en-GB style: "A, B and C". */
export function joinList(items: readonly string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

export function pluralise(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
