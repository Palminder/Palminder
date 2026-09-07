/**
 * Cross-site request check for state-changing requests. Accepts same-origin requests
 * (by Sec-Fetch-Site or by Origin/Referer matching the expected origin) and rejects the rest.
 */
export function isTrustedOrigin(headers: Headers, expectedOrigin: string): boolean {
  const fetchSite = headers.get('sec-fetch-site');
  if (fetchSite === 'same-origin' || fetchSite === 'none') return true;
  if (fetchSite === 'cross-site') return false;
  const origin = headers.get('origin');
  if (origin) return origin === expectedOrigin;
  const referer = headers.get('referer');
  if (referer) {
    try {
      return new URL(referer).origin === expectedOrigin;
    } catch {
      return false;
    }
  }
  // No signal at all (e.g. very old clients): allow only when not cross-site by Sec-Fetch-Site.
  return fetchSite === 'same-site' ? false : true;
}
