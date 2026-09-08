import { describe, expect, it } from 'vitest';
import { MemoryRateLimiter, clientIp } from './rate-limit';

describe('memory rate limiter', () => {
  it('allows up to the window max then blocks with a retry hint', async () => {
    let now = 1_000_000;
    const rl = new MemoryRateLimiter(
      { windowSeconds: 900, windowMax: 2, daySeconds: 86400, dayMax: 5 },
      () => now,
    );
    expect((await rl.check('a')).allowed).toBe(true);
    expect((await rl.check('a')).allowed).toBe(true);
    const blocked = await rl.check('a');
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
    now += 901 * 1000;
    expect((await rl.check('a')).allowed).toBe(true);
  });
  it('enforces the daily cap independently', async () => {
    let now = 0;
    const rl = new MemoryRateLimiter(
      { windowSeconds: 1, windowMax: 10, daySeconds: 86400, dayMax: 3 },
      () => now,
    );
    for (let i = 0; i < 3; i++) {
      expect((await rl.check('b')).allowed).toBe(true);
      now += 2000;
    }
    expect((await rl.check('b')).allowed).toBe(false);
  });
  it('does not block other keys', async () => {
    const rl = new MemoryRateLimiter({
      windowSeconds: 900,
      windowMax: 1,
      daySeconds: 86400,
      dayMax: 5,
    });
    expect((await rl.check('x')).allowed).toBe(true);
    expect((await rl.check('y')).allowed).toBe(true);
  });
});

describe('client ip', () => {
  it('prefers x-real-ip then the first forwarded hop', () => {
    expect(
      clientIp(new Headers({ 'x-real-ip': '1.1.1.1', 'x-forwarded-for': '2.2.2.2, 3.3.3.3' })),
    ).toBe('1.1.1.1');
    expect(clientIp(new Headers({ 'x-forwarded-for': '2.2.2.2, 3.3.3.3' }))).toBe('2.2.2.2');
    expect(clientIp(new Headers())).toBe('unknown');
  });
});
