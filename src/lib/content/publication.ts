import type {
  ImageAsset,
  Insight,
  Person,
  Project,
  RealityType,
  StudioNote,
  Testimonial,
} from './types';

/**
 * Publication stage. "production" enforces every verification gate as a hard rule.
 * "staging" renders seed and unverified records with a conspicuous label so the
 * layouts can be built and reviewed without fiction ever reaching the public site.
 */
export type ContentStage = 'staging' | 'production';

export function contentStage(): ContentStage {
  const explicit = process.env.CONTENT_STAGE?.trim().toLowerCase();
  if (explicit === 'production' || explicit === 'staging') return explicit;
  return process.env.VERCEL_ENV === 'production' ? 'production' : 'staging';
}

export interface GateResult {
  publishable: boolean;
  /** Human-readable reasons a record is held back (surfaced in staging labels and CMS validation). */
  reasons: string[];
}

const ok: GateResult = { publishable: true, reasons: [] };

export function roleUsesProtectedTitle(rolePublic: string): boolean {
  return /\barchitect\b/i.test(rolePublic) && !/\barchitectural\b/i.test(rolePublic.replace(/\barchitect\b/gi, ''));
}

export function roleClaimsQualification(rolePublic: string): boolean {
  return /\bpart\s*(i{1,3}|[123])\b/i.test(rolePublic) || /\b(RIBA|RIAS|ARB|MSc|MArch|BArch)\b/.test(rolePublic);
}

export function evaluatePerson(person: Person): GateResult {
  const reasons: string[] = [];
  if (person.verificationStatus !== 'verified') reasons.push('Team member record is not verified.');
  if (roleUsesProtectedTitle(person.rolePublic) && !person.protectedTitleVerified) {
    reasons.push('Role uses the protected title "architect" and entitlement has not been verified.');
  }
  if (roleClaimsQualification(person.rolePublic) && !person.qualificationVerified) {
    reasons.push('Stated qualification has not been verified.');
  }
  if (person.portrait?.placeholder) reasons.push('Portrait is a staging placeholder.');
  return reasons.length ? { publishable: false, reasons } : ok;
}

export function evaluateImage(image: ImageAsset): GateResult {
  const reasons: string[] = [];
  if (image.placeholder) reasons.push('Image is a staging placeholder.');
  if (!image.alt?.trim()) reasons.push('Image has no alt text.');
  if (image.rights?.synthetic && image.mediaType === 'completed-view') {
    reasons.push('Synthetic imagery cannot be labelled "Completed view".');
  }
  if (image.rights?.sourceType === 'licensed' && !image.rights.sourceIdentifier) {
    reasons.push('Licensed image lacks rights metadata.');
  }
  return reasons.length ? { publishable: false, reasons } : ok;
}

export function evaluateProject(project: Project): GateResult {
  const reasons: string[] = [];
  const isReal = project.realityType === 'real-project';
  if (isReal && project.verificationStatus !== 'verified') {
    reasons.push('Real project described as completed, on site or commissioned is not verified.');
  }
  if (!isReal && project.status !== 'study') {
    reasons.push('A design or representative study cannot carry a completed/on-site status.');
  }
  if (project.verificationStatus === 'draft') reasons.push('Project record is a draft.');
  const heroGate = evaluateImage(project.hero);
  if (!heroGate.publishable) reasons.push(`Hero: ${heroGate.reasons.join(' ')}`);
  return reasons.length ? { publishable: false, reasons } : ok;
}

export function evaluateInsight(insight: Insight): GateResult {
  const reasons: string[] = [];
  if (insight.verificationStatus !== 'verified') reasons.push('Insight is not verified.');
  if (insight.touchesRegulation && !insight.reviewedAt) {
    reasons.push('Guidance touching regulation has no review date.');
  }
  if (!insight.publishedAt) reasons.push('Insight has no publication date.');
  return reasons.length ? { publishable: false, reasons } : ok;
}

export function evaluateStudioNote(note: StudioNote): GateResult {
  const reasons: string[] = [];
  if (!note.published) reasons.push('Studio note is unpublished.');
  const img = evaluateImage(note.media);
  if (!img.publishable) reasons.push(...img.reasons);
  return reasons.length ? { publishable: false, reasons } : ok;
}

export function evaluateTestimonial(t: Testimonial): GateResult {
  const reasons: string[] = [];
  if (!t.verified) reasons.push('Testimonial quote and attribution are not verified.');
  if (!t.consentConfirmed) reasons.push('Permission to publish has not been confirmed.');
  return reasons.length ? { publishable: false, reasons } : ok;
}

/** Whether a record may render for the current stage. In staging, held records render with a label. */
export function mayRender(gate: GateResult, stage: ContentStage): boolean {
  return stage === 'staging' ? true : gate.publishable;
}

export function realityLabel(realityType: RealityType): string | null {
  switch (realityType) {
    case 'design-study':
      return 'Design study';
    case 'representative-study':
      return 'Representative study';
    default:
      return null;
  }
}
