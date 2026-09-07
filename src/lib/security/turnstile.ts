const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export type TurnstileResult = { ok: true } | { ok: false; reason: 'missing-token' | 'rejected' | 'unavailable' | 'not-configured' };

/**
 * Server-side Turnstile validation. Tokens are short-lived and single-use, so the visual
 * widget completing on the client is never sufficient on its own.
 */
export async function verifyTurnstile(token: string | null, remoteIp: string | undefined): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return { ok: false, reason: 'not-configured' };
  if (!token) return { ok: false, reason: 'missing-token' };
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp && remoteIp !== 'unknown') body.set('remoteip', remoteIp);
    const res = await fetch(VERIFY_URL, { method: 'POST', body, cache: 'no-store' });
    if (!res.ok) return { ok: false, reason: 'unavailable' };
    const data = (await res.json()) as { success?: boolean };
    return data.success ? { ok: true } : { ok: false, reason: 'rejected' };
  } catch {
    return { ok: false, reason: 'unavailable' };
  }
}

export function turnstileRequired(): boolean {
  return process.env.NODE_ENV === 'production' || Boolean(process.env.TURNSTILE_SECRET_KEY?.trim());
}
