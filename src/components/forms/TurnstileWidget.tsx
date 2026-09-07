'use client';

import { Turnstile } from '@marsidev/react-turnstile';

/**
 * Cloudflare Turnstile. Renders nothing when no site key is configured (development).
 * The widget adds a hidden `cf-turnstile-response` field to the enclosing form.
 */
export function TurnstileWidget({ onStatus }: { onStatus?: (ready: boolean) => void }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) return null;
  return (
    <div className="min-h-[65px]">
      <Turnstile
        siteKey={siteKey}
        options={{ theme: 'light', size: 'flexible', appearance: 'always' }}
        onSuccess={() => onStatus?.(true)}
        onExpire={() => onStatus?.(false)}
        onError={() => onStatus?.(false)}
      />
    </div>
  );
}
