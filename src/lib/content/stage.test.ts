import { afterEach, describe, expect, it, vi } from 'vitest';

/** The content API is imported fresh for each stage so `CONTENT_STAGE` is read at module load. */
async function loadApi(stage: 'staging' | 'production') {
  vi.resetModules();
  process.env.CONTENT_STAGE = stage;
  delete process.env.SANITY_PROJECT_ID;
  return import('./index');
}

afterEach(() => {
  delete process.env.CONTENT_STAGE;
});

describe('content API under the production stage', () => {
  it('returns no unverified people, projects, insights or notes', async () => {
    const api = await loadApi('production');
    expect(api.stage()).toBe('production');
    expect(await api.getTeam()).toEqual([]);
    expect(await api.getProjects()).toEqual([]);
    expect(await api.getFeaturedProjects()).toEqual([]);
    expect(await api.getInsights()).toEqual([]);
    expect(await api.getStudioNotes()).toEqual([]);
    expect(await api.getTestimonials()).toEqual([]);
  });

  it('still serves services and legal documents, which carry no verification state', async () => {
    const api = await loadApi('production');
    expect((await api.getServices()).map((s) => s.slug)).toEqual([
      'residential',
      'conservation-listed-buildings',
      'housing-retrofit',
      'commercial-community',
    ]);
    expect(await api.getLegalDocument('privacy')).not.toBeNull();
  });

  it('drops page-level placeholders but keeps real images', async () => {
    const api = await loadApi('production');
    const placeholder = {
      src: '/staging/placeholders/16x10-stone.svg',
      width: 1600,
      height: 1000,
      alt: 'x',
      mediaType: 'placeholder' as const,
      placeholder: true,
    };
    const real = { ...placeholder, src: '/real.jpg', placeholder: false };
    expect(api.stagingImage(placeholder)).toBeNull();
    expect(api.stagingImage(real)).toEqual(real);
  });
});

describe('content API under the staging stage', () => {
  it('renders every seed record with its gate attached', async () => {
    const api = await loadApi('staging');
    const projects = await api.getProjects();
    expect(projects).toHaveLength(8);
    expect(projects.every((p) => p.gate.publishable === false)).toBe(true);
    expect(await api.getTeam()).toHaveLength(6);
    expect(await api.getInsights()).toHaveLength(6);
    expect((await api.getStudioNotes(4)).length).toBe(4);
    const placeholder = {
      src: '/staging/placeholders/16x10-stone.svg',
      width: 1600,
      height: 1000,
      alt: 'x',
      mediaType: 'placeholder' as const,
      placeholder: true,
    };
    expect(api.stagingImage(placeholder)).toEqual(placeholder);
  });
});
