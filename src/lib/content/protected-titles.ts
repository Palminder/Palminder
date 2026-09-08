/**
 * Shared vocabulary for the protected-title and qualification gates. Kept dependency-free so
 * both the runtime publication gate and the Sanity schema validation use the same rules.
 */

/** "Architect" is protected under the Architects Act 1997; "architectural" is not. */
export function roleUsesProtectedTitle(rolePublic: string): boolean {
  return /\barchitect\b/i.test(rolePublic);
}

/** Stated qualifications, memberships and chartered status that need verification before publication. */
const QUALIFICATION = new RegExp(
  [
    '\\bpart\\s*(i{1,3}|[123])\\b',
    '\\b(F?RIBA|F?RIAS|ARB|[AFM]?CIAT|IHBC|AABC|RICS|MRTPI|CIOB)\\b',
    '\\b(MSc|MA|MArch|BArch|BSc|BA|PhD|PgDip|Dip\\.?\\s?Arch)\\b',
    '\\b(chartered|accredited|registered|conservation-accredited)\\b',
  ].join('|'),
  'i',
);

export function roleClaimsQualification(rolePublic: string): boolean {
  return QUALIFICATION.test(rolePublic);
}
