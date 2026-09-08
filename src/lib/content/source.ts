import type {
  Insight,
  LegalDocument,
  Person,
  Project,
  Service,
  StudioNote,
  Testimonial,
} from './types';

/** A content source returns raw records; publication gating happens in the content API. */
export interface SiteSettingsRecord {
  instagramUrl?: string;
  linkedinUrl?: string;
}

export interface ContentSource {
  name: 'local' | 'sanity';
  siteSettings(): Promise<SiteSettingsRecord>;
  projects(): Promise<Project[]>;
  team(): Promise<Person[]>;
  services(): Promise<Service[]>;
  insights(): Promise<Insight[]>;
  studioNotes(): Promise<StudioNote[]>;
  testimonials(): Promise<Testimonial[]>;
  legalDocument(type: LegalDocument['type']): Promise<LegalDocument | null>;
}
