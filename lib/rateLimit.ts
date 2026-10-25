interface RateLimitOptions {
  intervalMs: number;
  maxRequests: number;
}

interface ClientRecord {
  count: number;
  resetTime: number;
}

const ipStore = new Map<string, ClientRecord>();

if (typeof setInterval !== "undefined") {
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipStore.entries()) {
      if (now > record.resetTime) {
        ipStore.delete(ip);
      }
    }
  }, 5 * 60 * 1000);

  if (cleanupTimer && typeof cleanupTimer.unref === "function") {
    cleanupTimer.unref();
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetInSeconds: number;
}

export function checkRateLimit(
  ip: string,
  options: RateLimitOptions = { intervalMs: 10 * 60 * 1000, maxRequests: 10 }
): RateLimitResult {
  const now = Date.now();
  const record = ipStore.get(ip);

  if (!record || now > record.resetTime) {
    ipStore.set(ip, {
      count: 1,
      resetTime: now + options.intervalMs,
    });
    return {
      allowed: true,
      remaining: options.maxRequests - 1,
      resetInSeconds: Math.ceil(options.intervalMs / 1000),
    };
  }

  if (record.count >= options.maxRequests) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds: Math.max(1, retryAfter),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: Math.max(0, options.maxRequests - record.count),
    resetInSeconds: Math.ceil((record.resetTime - now) / 1000),
  };
}

export function getClientIp(req: Request): string {
  const headers = req.headers;
  
  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0].trim();
    if (firstIp) return firstIp;
  }

  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "127.0.0.1";
}
