/**
 * Abuse rate limiting keyed by client IP. Two windows: a short window (default 5 per
 * 15 minutes) and a daily cap (default 20). An Upstash Redis REST endpoint is used when
 * configured; otherwise an in-memory limiter applies per server instance.
 */
export interface RateLimitDecision {
  allowed: boolean;
  retryAfterSeconds?: number;
}

export interface RateLimiter {
  check(key: string): Promise<RateLimitDecision>;
}

export interface RateLimitConfig {
  windowSeconds: number;
  windowMax: number;
  daySeconds: number;
  dayMax: number;
}

export function rateLimitConfig(): RateLimitConfig {
  const n = (v: string | undefined, d: number) => {
    const x = Number(v);
    return Number.isFinite(x) && x > 0 ? x : d;
  };
  return {
    windowSeconds: 15 * 60,
    windowMax: n(process.env.RATE_LIMIT_WINDOW_MAX, 5),
    daySeconds: 24 * 60 * 60,
    dayMax: n(process.env.RATE_LIMIT_DAY_MAX, 20),
  };
}

export class MemoryRateLimiter implements RateLimiter {
  private hits = new Map<string, number[]>();
  constructor(
    private readonly config: RateLimitConfig,
    private readonly now: () => number = () => Date.now(),
  ) {}

  async check(key: string): Promise<RateLimitDecision> {
    const now = this.now();
    const dayAgo = now - this.config.daySeconds * 1000;
    const windowAgo = now - this.config.windowSeconds * 1000;
    const list = (this.hits.get(key) ?? []).filter((t) => t > dayAgo);
    const inWindow = list.filter((t) => t > windowAgo);
    if (list.length >= this.config.dayMax) {
      const oldest = list[0] ?? now;
      this.hits.set(key, list);
      return {
        allowed: false,
        retryAfterSeconds: Math.max(
          1,
          Math.ceil((oldest + this.config.daySeconds * 1000 - now) / 1000),
        ),
      };
    }
    if (inWindow.length >= this.config.windowMax) {
      const oldest = inWindow[0] ?? now;
      this.hits.set(key, list);
      return {
        allowed: false,
        retryAfterSeconds: Math.max(
          1,
          Math.ceil((oldest + this.config.windowSeconds * 1000 - now) / 1000),
        ),
      };
    }
    list.push(now);
    this.hits.set(key, list);
    // Opportunistic pruning so the map cannot grow without bound.
    if (this.hits.size > 10_000) {
      for (const [k, v] of this.hits) if (!v.some((t) => t > dayAgo)) this.hits.delete(k);
    }
    return { allowed: true };
  }
}

/** Upstash Redis REST limiter using INCR + EXPIRE in one pipeline call. */
export class UpstashRateLimiter implements RateLimiter {
  constructor(
    private readonly url: string,
    private readonly token: string,
    private readonly config: RateLimitConfig,
  ) {}

  private async incr(key: string, ttl: number): Promise<number> {
    const res = await fetch(`${this.url.replace(/\/$/, '')}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([
        ['INCR', key],
        ['EXPIRE', key, ttl, 'NX'],
      ]),
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Rate limiter unavailable (${res.status})`);
    const data = (await res.json()) as Array<{ result?: number }>;
    return Number(data[0]?.result ?? 0);
  }

  async check(key: string): Promise<RateLimitDecision> {
    const [win, day] = await Promise.all([
      this.incr(`rl:w:${key}`, this.config.windowSeconds),
      this.incr(`rl:d:${key}`, this.config.daySeconds),
    ]);
    if (day > this.config.dayMax)
      return { allowed: false, retryAfterSeconds: this.config.daySeconds };
    if (win > this.config.windowMax)
      return { allowed: false, retryAfterSeconds: this.config.windowSeconds };
    return { allowed: true };
  }
}

let memory: MemoryRateLimiter | null = null;

export function getRateLimiter(): RateLimiter {
  const url = process.env.RATE_LIMIT_UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.RATE_LIMIT_UPSTASH_REDIS_REST_TOKEN?.trim();
  const config = rateLimitConfig();
  if (url && token) return new UpstashRateLimiter(url, token, config);
  memory ??= new MemoryRateLimiter(config);
  return memory;
}

/** Client IP from the platform header chain; never trusts a bare X-Forwarded-For tail. */
export function clientIp(headers: Headers): string {
  const real = headers.get('x-real-ip')?.trim();
  if (real) return real;
  const fwd = headers.get('x-forwarded-for');
  if (fwd) {
    const first = fwd.split(',')[0]?.trim();
    if (first) return first;
  }
  return 'unknown';
}
