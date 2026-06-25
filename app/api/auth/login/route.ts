import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  console.log('[login] email reçu:', email)
  console.log('[login] ADMIN_EMAIL env:', process.env.ADMIN_EMAIL)
  console.log('[login] hash env (20 premiers chars):', process.env.ADMIN_PASSWORD_HASH?.slice(0, 20))
  console.log('[login] hash env longueur:', process.env.ADMIN_PASSWORD_HASH?.length)

  // Vérifie email
  if (email !== process.env.ADMIN_EMAIL) {
    console.log('[login] email KO')
    return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 })
  }

  // Vérifie mot de passe
  const valid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH!)
  console.log('[login] bcrypt.compare résultat:', valid)
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
    secure: process.env.HTTPS === 'true',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 heures
  })

  return response
}