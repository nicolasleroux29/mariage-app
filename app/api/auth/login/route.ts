import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'
import { isRateLimited, recordFailedAttempt, clearAttempts } from '@/lib/rateLimit'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)

  const { limited, retryAfterSeconds } = isRateLimited(ip)
  if (limited) {
    return NextResponse.json(
      { error: 'Trop de tentatives, réessayez plus tard' },
      { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
    )
  }

  const { email, password } = await req.json()

  // Vérifie email
  if (email !== process.env.ADMIN_EMAIL) {
    recordFailedAttempt(ip)
    return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 })
  }

  // Vérifie mot de passe
  const valid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH!)
  if (!valid) {
    recordFailedAttempt(ip)
    return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 })
  }

  clearAttempts(ip)

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