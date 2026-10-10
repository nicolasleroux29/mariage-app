import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'
import { isRateLimited, recordFailedAttempt, clearAttempts } from '@/lib/rateLimit'
import { log, truncate } from '@/lib/log'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

// Comptes autorisés sur le dashboard : les mariés + l'admin technique, chacun son mot de passe
const ACCOUNTS = [
  { email: process.env.ADMIN_EMAIL, hash: process.env.ADMIN_PASSWORD_HASH },
  { email: process.env.TECH_ADMIN_EMAIL, hash: process.env.TECH_ADMIN_PASSWORD_HASH },
].filter((a): a is { email: string; hash: string } => !!a.email && !!a.hash)

// Hash factice comparé quand l'email est inconnu, pour que le temps de réponse
// ne révèle pas si un email correspond à un compte
const DUMMY_HASH = bcrypt.hashSync('dummy-password', 10)

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)

  const { limited, retryAfterSeconds } = isRateLimited(ip)
  if (limited) {
    await log('RATE_LIMITED', `Connexion bloquée (trop de tentatives) — IP ${ip}`, { success: false, ip })
    return NextResponse.json(
      { error: 'Trop de tentatives, réessayez plus tard' },
      { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
    )
  }

  const { email, password } = await req.json()

  const account = ACCOUNTS.find((a) => a.email.toLowerCase() === String(email).trim().toLowerCase())

  // bcrypt.compare tourne toujours, même si l'email est inconnu (temps constant)
  const valid = await bcrypt.compare(String(password), account?.hash ?? DUMMY_HASH)

  if (!account) {
    recordFailedAttempt(ip)
    await log('LOGIN', `Échec de connexion (email inconnu) : ${truncate(email)}`, { success: false, ip })
    return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 })
  }

  if (!valid) {
    recordFailedAttempt(ip)
    await log('LOGIN', `Échec de connexion (mot de passe invalide) : ${truncate(email)}`, { success: false, ip })
    return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 })
  }

  clearAttempts(ip)
  await log('LOGIN', `Connexion réussie : ${truncate(email)}`, { success: true, ip })

  // Génère le JWT
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(SECRET)

  // Pose le cookie de session
  const response = NextResponse.json({ success: true })
  response.cookies.set('session', token, {
    httpOnly: true,
    secure: process.env.HTTPS === 'true',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 heures
  })

  return response
}