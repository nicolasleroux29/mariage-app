const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 5

type Entry = { count: number; resetAt: number }

const attempts = new Map<string, Entry>()

export function isRateLimited(key: string): { limited: boolean; retryAfterSeconds: number } {
  const entry = attempts.get(key)
  if (!entry || Date.now() > entry.resetAt) return { limited: false, retryAfterSeconds: 0 }

  if (entry.count >= MAX_ATTEMPTS) {
    return { limited: true, retryAfterSeconds: Math.ceil((entry.resetAt - Date.now()) / 1000) }
  }
  return { limited: false, retryAfterSeconds: 0 }
}

export function recordFailedAttempt(key: string) {
  const now = Date.now()
  const entry = attempts.get(key)
  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
  } else {
    entry.count++
  }
}

export function clearAttempts(key: string) {
  attempts.delete(key)
}
