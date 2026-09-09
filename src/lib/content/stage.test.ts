import { afterEach, describe, expect, it, vi } from 'vitest';

/** The content API is imported fresh for each stage so `CONTENT_STAGE` is read at module load. */
async function loadApi(stage?: 'staging' | 'production') {
  vi.resetModules();
  if (stage) process.env.CONTENT_STAGE = stage;
  else delete process.env.CONTENT_STAGE;
  delete process.env.SANITY_PROJECT_ID;
  return import('./index');
}

afterEach(() => {
  delete process.env.CONTENT_STAGE;
});

describe('content API under the production stage', () => {
  it('defaults to production and serves every record', async () => {
    const api = await loadApi();
    expect(api.stage()).toBe('production');
    expect((await api.getTeam()).map((p) => p.slug)).toEqual([
      'mairi-bracken',
      'thomas-roe',
      'ailsa-mclaren',
      'jamie-kerr',
      'niamh-odonnell',
      'fiona-campbell',
    ]);
    expect(await api.getProjects()).toHaveLength(8);
    expect(await api.getFeaturedProjects(4)).toHaveLength(4);
    expect(await api.getInsights()).toHaveLength(6);
    expect(await api.getStudioNotes()).toHaveLength(9);
    expect((await api.getStudioNotes(4)).length).toBe(4);
  });

  it('serves nothing that is unverified or unconsented', async () => {
    const api = await loadApi('production');
    expect(await api.getTestimonials()).toEqual([]);
    for (const p of await api.getProjects()) expect(p.gate.publishable).toBe(true);
    for (const i of await api.getInsights()) expect(i.gate.publishable).toBe(true);
  });

  it('serves services and legal documents', async () => {
    const api = await loadApi('production');
    expect((await api.getServices()).map((s) => s.slug)).toEqual([
      'residential',
      'conservation-listed-buildings',
      'housing-retrofit',
      'commercial-community',
    ]);
    expect(await api.getLegalDocument('privacy')).not.toBeNull();
  });

  it('points every image at a committed asset', async () => {
    const api = await loadApi('production');
    const { existsSync } = await import('node:fs');
    const { resolve } = await import('node:path');
    const images = [
      ...(await api.getProjects()).flatMap((p) => [p.hero, ...p.gallery, ...p.drawings]),
      ...(await api.getInsights()).map((i) => i.hero),
      ...(await api.getStudioNotes()).map((n) => n.media),
      ...(await api.getServices()).map((s) => s.image),
      ...(await api.getTeam()).flatMap((p) => (p.portrait ? [p.portrait] : [])),
    ];
    expect(images.length).toBeGreaterThan(40);
    for (const image of images) {
      expect(image.alt.trim().length, image.src).toBeGreaterThan(10);
      expect(existsSync(resolve('public', `.${image.src}`)), image.src).toBe(true);
    }
  });
});

describe('content API under the staging review stage', () => {
  it('is enabled only by CONTENT_STAGE=staging', async () => {
    const api = await loadApi('staging');
    expect(api.stage()).toBe('staging');
    expect(await api.getProjects()).toHaveLength(8);
  });
});
