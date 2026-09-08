/**
 * Content model shared by the local seed source and the Sanity source.
 * Every record carries the verification fields that the publication gates read.
 */

export type VerificationStatus = 'draft' | 'pending' | 'verified';
export type RealityType = 'real-project' | 'design-study' | 'representative-study';

export type Sector = 'residential' | 'conservation' | 'housing-retrofit' | 'commercial-community';

export const SECTOR_LABELS: Record<Sector, string> = {
  residential: 'Residential',
  conservation: 'Conservation',
  'housing-retrofit': 'Housing & Retrofit',
  'commercial-community': 'Commercial & Community',
};

export const SECTOR_SERVICE_SLUG: Record<Sector, ServiceSlug> = {
  residential: 'residential',
  conservation: 'conservation-listed-buildings',
  'housing-retrofit': 'housing-retrofit',
  'commercial-community': 'commercial-community',
};

export type ServiceSlug =
  'residential' | 'conservation-listed-buildings' | 'housing-retrofit' | 'commercial-community';

/** Caption label vocabulary. `completed-view` is reserved for real, verified photography. */
export type MediaType =
  | 'completed-view'
  | 'existing-condition'
  | 'construction-progress'
  | 'visualisation'
  | 'proposed-plan'
  | 'existing-plan'
  | 'section'
  | 'elevation'
  | 'axonometric'
  | 'detail-drawing'
  | 'diagram'
  | 'survey-drawing'
  | 'material-study'
  | 'context'
  | 'portrait';

export const MEDIA_TYPE_LABELS: Record<MediaType, string> = {
  'completed-view': 'Completed view',
  'existing-condition': 'Existing condition',
  'construction-progress': 'Construction progress',
  visualisation: 'Visualisation',
  'proposed-plan': 'Proposed plan',
  'existing-plan': 'Existing plan',
  section: 'Section',
  elevation: 'Elevation',
  axonometric: 'Axonometric',
  'detail-drawing': 'Detail',
  diagram: 'Diagram',
  'survey-drawing': 'Survey drawing',
  'material-study': 'Material study',
  context: 'Context',
  portrait: 'Portrait',
};

export const DRAWING_MEDIA_TYPES: ReadonlySet<MediaType> = new Set<MediaType>([
  'proposed-plan',
  'existing-plan',
  'section',
  'elevation',
  'axonometric',
  'detail-drawing',
  'diagram',
  'survey-drawing',
]);

export interface ImageRights {
  sourceType: 'practice' | 'commissioned' | 'licensed' | 'synthetic';
  creator?: string;
  sourcePlatform?: string;
  sourceIdentifier?: string;
  license?: string;
  rightsCheckedAt?: string;
  /** Licensed context imagery that must never be presented as practice work. */
  contextOnly?: boolean;
  /** Generated imagery; must be labelled Visualisation where it could be mistaken for a completed view. */
  synthetic?: boolean;
}

export interface DrawingMeta {
  /** e.g. "Drawing 03" */
  number?: string;
  /** e.g. "Proposed ground-floor plan" */
  title: string;
  /** Legend or note, e.g. what the hatch represents. */
  note?: string;
}

export interface ImageAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
  mediaType: MediaType;
  caption?: string;
  credit?: string;
  drawing?: DrawingMeta;
  rights?: ImageRights;
}

export type RoleType = 'director' | 'designer' | 'technologist' | 'assistant' | 'administrator';

export interface Person {
  id: string;
  slug: string;
  name: string;
  /** Public role wording. "Architect" is a protected title and is gated separately. */
  rolePublic: string;
  roleType: RoleType;
  expertise: string[];
  bio: string;
  portrait?: ImageAsset;
  order: number;
  verificationStatus: VerificationStatus;
  /** Practice has verified entitlement to use the protected title "architect". */
  protectedTitleVerified: boolean;
  /** Practice has verified the stated qualification (e.g. Part II). */
  qualificationVerified: boolean;
}

export type ProjectStatus = 'completed' | 'on-site' | 'in-design' | 'study';

export interface Project {
  id: string;
  slug: string;
  title: string;
  /** Public location, e.g. "Kelvinside, Glasgow". Never a full private address. */
  locationDisplay: string;
  area: string;
  sector: Sector;
  /** Optional refinement, e.g. "Conservation & adaptive reuse". */
  sectorLabel?: string;
  status: ProjectStatus;
  year?: number;
  realityType: RealityType;
  verificationStatus: VerificationStatus;
  buildingType: string;
  summary: string;
  brief: string[];
  existing: string[];
  response: string[];
  services: string[];
  materials: string[];
  technical: string[];
  outcome: string[];
  hero: ImageAsset;
  /** Story imagery in narrative order. */
  gallery: ImageAsset[];
  /** Plans, sections, elevations at natural sheet ratio. */
  drawings: ImageAsset[];
  featured: boolean;
  order: number;
  relatedService: ServiceSlug;
  seo?: { title?: string; description?: string };
  /** Internal notes; never rendered. */
  verificationNotes?: string;
}

export interface ServiceSection {
  title: string;
  body: string[];
}

export interface Service {
  slug: ServiceSlug;
  number: string;
  title: string;
  /** Short title for navigation and lists. */
  navLabel: string;
  /** Homepage/service-overview summary. */
  summary: string;
  heroHeadline: string;
  intro: string[];
  scope: string[];
  sections: ServiceSection[];
  supportingCopy?: string[];
  image: ImageAsset;
  relatedProjectSlugs: string[];
  relatedInsightSlugs: string[];
  seo: { title: string; description: string };
}

export type InsightCategory =
  'Tenements' | 'Consents' | 'Listed buildings' | 'Masonry repair' | 'Retrofit' | 'Ventilation';

export type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string; id?: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'callout'; title?: string; text: string }
  | { type: 'figure'; image: ImageAsset }
  | { type: 'table'; caption?: string; header: string[]; rows: string[][] };

export interface OfficialSource {
  label: string;
  href: string;
  publisher: string;
  note?: string;
}

export interface Insight {
  id: string;
  slug: string;
  title: string;
  dek: string;
  category: InsightCategory;
  body: Block[];
  author: { type: 'studio' } | { type: 'person'; personSlug: string };
  publishedAt: string;
  reviewedAt?: string;
  hero: ImageAsset;
  officialSources: OfficialSource[];
  relatedServiceSlugs: ServiceSlug[];
  relatedProjectSlugs: string[];
  /** Guidance touching regulation must carry a review date and be re-reviewed periodically. */
  touchesRegulation: boolean;
  verificationStatus: VerificationStatus;
  seo?: { title?: string; description?: string };
}

export type StudioNoteCategory = 'Site' | 'Drawing' | 'Detail' | 'Material' | 'Glasgow';

export interface StudioNote {
  id: string;
  date: string;
  category: StudioNoteCategory;
  text: string;
  media: ImageAsset;
  relatedProjectSlug?: string;
  socialUrl?: string;
  published: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  attribution: string;
  descriptor?: string;
  consentConfirmed: boolean;
  verified: boolean;
  relatedProjectSlug?: string;
}

export interface LegalDocument {
  type: 'privacy' | 'cookies' | 'accessibility';
  title: string;
  effectiveDate: string;
  reviewedAt: string;
  intro: string;
  body: Block[];
}

export interface ProcessStage {
  title: string;
  copy: string;
}
