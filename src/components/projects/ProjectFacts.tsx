import { SECTOR_LABELS, type Project } from '@/lib/content/types';
import { projectStatusLabel } from '@/lib/content/format';
import { realityLabel } from '@/lib/content/publication';

/** Definition list of the facts that actually help: location, sector, status, building type, services. */
export function ProjectFacts({ project }: { project: Project }) {
  const reality = realityLabel(project.realityType);
  const rows: Array<[string, string]> = [
    ['Location', project.locationDisplay],
    ['Sector', project.sectorLabel ?? SECTOR_LABELS[project.sector]],
    ['Status', reality ? `${projectStatusLabel(project)} · ${reality}` : projectStatusLabel(project)],
    ['Building', project.buildingType],
    ['Bracken & Roe services', project.services.join('; ')],
  ];
  return (
    <dl className="grid grid-cols-1 gap-x-8 gap-y-4 border-t border-ink/20 pt-6 md:grid-cols-2">
      {rows.map(([term, detail]) => (
        <div key={term} className={term === 'Bracken & Roe services' ? 'md:col-span-2' : ''}>
          <dt className="type-label text-ink/60">{term}</dt>
          <dd className="type-body mt-1 text-ink/90">{detail}</dd>
        </div>
      ))}
    </dl>
  );
}
