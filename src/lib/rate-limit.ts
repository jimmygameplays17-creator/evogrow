const WINDOW_MS = 10_000;
const MAX_REQUESTS = 5;

type Bucket = { count: number; resetAt: number };

const store = new Map<string, Bucket>();

export function rateLimit(key: string): boolean {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || existing.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (existing.count >= MAX_REQUESTS) {
    return false;
  }

  existing.count += 1;
  return true;
}
