import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

// Seules routes API accessibles sans session admin : le login lui-même,
// et le RSVP public (authentifié par son propre token UUID, pas par ce cookie).
const PUBLIC_API_PATHS = ['/api/auth/login', '/api/rsvp']

function unauthorized(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  return NextResponse.redirect(new URL('/login', req.url))
}

export async function proxy(req: NextRequest) {
  if (PUBLIC_API_PATHS.includes(req.nextUrl.pathname)) {
    return NextResponse.next()
  }

  const session = req.cookies.get('session')?.value

  if (!session) {
    return unauthorized(req)
  }

  try {
    await jwtVerify(session, SECRET)
    return NextResponse.next()
  } catch {
    return unauthorized(req)
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
}
