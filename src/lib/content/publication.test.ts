import { describe, expect, it } from 'vitest';
import {
  evaluateImage,
  evaluatePerson,
  evaluateProject,
  evaluateInsight,
  evaluateTestimonial,
  mayRender,
  roleUsesProtectedTitle,
  roleClaimsQualification,
} from './publication';
import { team } from '@/content/seed/team';
import { projects } from '@/content/seed/projects';
import type { Person, Project } from './types';

const verifiedPerson = (over: Partial<Person> = {}): Person => ({
  ...team[0]!,
  verificationStatus: 'verified',
  protectedTitleVerified: true,
  qualificationVerified: true,
  portrait: { ...team[0]!.portrait!, placeholder: false, src: '/x.jpg' },
  ...over,
});

describe('protected title detection', () => {
  it('flags roles that use "architect" as a title', () => {
    expect(roleUsesProtectedTitle('Senior Architect')).toBe(true);
    expect(roleUsesProtectedTitle('Architect')).toBe(true);
    expect(roleUsesProtectedTitle('Chartered architect')).toBe(true);
  });
  it('does not flag "architectural" roles', () => {
    expect(roleUsesProtectedTitle('Architectural Technologist')).toBe(false);
    expect(roleUsesProtectedTitle('Part II Architectural Assistant')).toBe(false);
    expect(roleUsesProtectedTitle('Director')).toBe(false);
  });
  it('flags stated qualifications', () => {
    expect(roleClaimsQualification('Part II Architectural Assistant')).toBe(true);
    expect(roleClaimsQualification('Practice Administrator')).toBe(false);
  });
});

describe('team publication gate', () => {
  it('holds every seed team member back', () => {
    for (const p of team) expect(evaluatePerson(p).publishable).toBe(false);
  });
  it('requires protected-title verification for architect roles', () => {
    const p = verifiedPerson({ rolePublic: 'Senior Architect', protectedTitleVerified: false });
    const gate = evaluatePerson(p);
    expect(gate.publishable).toBe(false);
    expect(gate.reasons.join(' ')).toMatch(/protected title/);
  });
  it('requires qualification verification for Part II', () => {
    const p = verifiedPerson({
      rolePublic: 'Part II Architectural Assistant',
      qualificationVerified: false,
    });
    expect(evaluatePerson(p).publishable).toBe(false);
  });
  it('publishes a fully verified person', () => {
    expect(evaluatePerson(verifiedPerson({ rolePublic: 'Senior Architect' })).publishable).toBe(
      true,
    );
  });
});

describe('project publication gate', () => {
  it('holds every seed project back (all are unverified real projects)', () => {
    for (const p of projects) expect(evaluateProject(p).publishable).toBe(false);
  });
  it('publishes a verified real project with a real hero', () => {
    const p: Project = {
      ...projects[0]!,
      verificationStatus: 'verified',
      hero: { ...projects[0]!.hero, placeholder: false, src: '/x.jpg' },
    };
    expect(evaluateProject(p).publishable).toBe(true);
  });
  it('rejects a design study that claims completion', () => {
    const p: Project = {
      ...projects[0]!,
      realityType: 'design-study',
      status: 'completed',
      verificationStatus: 'verified',
      hero: { ...projects[0]!.hero, placeholder: false, src: '/x.jpg' },
    };
    expect(evaluateProject(p).publishable).toBe(false);
  });
  it('allows a labelled design study with study status', () => {
    const p: Project = {
      ...projects[0]!,
      realityType: 'design-study',
      status: 'study',
      verificationStatus: 'pending',
      hero: { ...projects[0]!.hero, placeholder: false, src: '/x.jpg' },
    };
    expect(evaluateProject(p).publishable).toBe(true);
  });
});

describe('image gate', () => {
  it('rejects synthetic imagery labelled as a completed view', () => {
    const gate = evaluateImage({
      src: '/a.jpg',
      width: 10,
      height: 10,
      alt: 'x',
      mediaType: 'completed-view',
      rights: { sourceType: 'synthetic', synthetic: true },
    });
    expect(gate.publishable).toBe(false);
  });
  it('rejects licensed images without rights metadata', () => {
    const gate = evaluateImage({
      src: '/a.jpg',
      width: 10,
      height: 10,
      alt: 'x',
      mediaType: 'context',
      rights: { sourceType: 'licensed' },
    });
    expect(gate.publishable).toBe(false);
  });
});

describe('insight and testimonial gates', () => {
  it('requires a review date for regulation-sensitive guidance', () => {
    const gate = evaluateInsight({
      id: 'i',
      slug: 's',
      title: 't',
      dek: 'd',
      category: 'Consents',
      body: [],
      author: { type: 'studio' },
      publishedAt: '2026-01-01',
      hero: { src: '/a.jpg', width: 1, height: 1, alt: 'a', mediaType: 'context' },
      officialSources: [],
      relatedServiceSlugs: [],
      relatedProjectSlugs: [],
      touchesRegulation: true,
      verificationStatus: 'verified',
    });
    expect(gate.publishable).toBe(false);
  });
  it('requires both verification and consent for testimonials', () => {
    expect(
      evaluateTestimonial({
        id: 't',
        quote: 'q',
        attribution: 'a',
        consentConfirmed: true,
        verified: false,
      }).publishable,
    ).toBe(false);
    expect(
      evaluateTestimonial({
        id: 't',
        quote: 'q',
        attribution: 'a',
        consentConfirmed: true,
        verified: true,
      }).publishable,
    ).toBe(true);
  });
});

describe('stage behaviour', () => {
  it('renders held records only in staging', () => {
    const held = { publishable: false, reasons: ['x'] };
    expect(mayRender(held, 'staging')).toBe(true);
    expect(mayRender(held, 'production')).toBe(false);
  });
});
