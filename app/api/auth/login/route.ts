import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  // Vérifie email
  if (email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 })
  }

  // Vérifie mot de passe
  const valid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH!)
  if (!valid) {
    return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 })
  }

  // Génère le JWT
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(SECRET)

  // Pose le cookie de session
  const response = NextResponse.json({ success: true })
  response.cookies.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 heures
  })

  return response
}