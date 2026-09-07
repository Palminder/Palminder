import { site } from '@/lib/site';
import { cn } from '@/lib/utils/cn';

interface OfficeAddressProps {
  className?: string;
  tone?: 'light' | 'dark';
  withName?: boolean;
}

/** The fixed office address with the appointment wording. Never implies a staffed, walk-in office. */
export function OfficeAddress({ className, tone = 'light', withName = false }: OfficeAddressProps) {
  const a = site.address;
  return (
    <address className={cn('not-italic leading-relaxed', className)}>
      {withName ? <span className="block">{a.name}</span> : null}
      <span className="block">{a.line1}</span>
      <span className="block">{a.line2}</span>
      <span className="block">{a.locality}</span>
      <span className="block">
        {a.city} {a.postcode}
      </span>
      <span className="block">{a.country}</span>
      <strong className={cn('mt-3 block font-medium', tone === 'dark' ? 'text-paper' : 'text-ink')}>
        {a.appointmentNote}
      </strong>
    </address>
  );
}
