import type { Project, ProjectStatus } from './types';

export function projectStatusLabel(project: Pick<Project, 'status' | 'year'>): string {
  const year = project.year ? ` ${project.year}` : '';
  const labels: Record<ProjectStatus, string> = {
    completed: 'Completed',
    'on-site': 'On site',
    'in-design': 'In design',
    study: 'Study',
  };
  return `${labels[project.status]}${year}`;
}

export function formatDate(iso: string, options: Intl.DateTimeFormatOptions = {}): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  }).format(d);
}

export function formatMonthYear(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(new Date(iso));
}
