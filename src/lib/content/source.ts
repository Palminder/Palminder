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
export interface ContentSource {
  name: 'local' | 'sanity';
  projects(): Promise<Project[]>;
  team(): Promise<Person[]>;
  services(): Promise<Service[]>;
  insights(): Promise<Insight[]>;
  studioNotes(): Promise<StudioNote[]>;
  testimonials(): Promise<Testimonial[]>;
  legalDocument(type: LegalDocument['type']): Promise<LegalDocument | null>;
}
