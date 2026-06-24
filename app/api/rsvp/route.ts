import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { token, eglise, vinHonneur, repas, retourNoce, enfants, nbEnfants, allergies } = await req.json()

  if (!token) {
    return NextResponse.json({ error: 'Token manquant' }, { status: 400 })
  }

  const invite = await prisma.invite.findUnique({ where: { token } })

  if (!invite) {
    return NextResponse.json({ error: 'Lien invalide' }, { status: 404 })
  }

  const rsvp = await prisma.rsvp.upsert({
    where: { inviteId: invite.id },
    create: { inviteId: invite.id, eglise, vinHonneur, repas, retourNoce, enfants, nbEnfants, allergies },
    update: { eglise, vinHonneur, repas, retourNoce, enfants, nbEnfants, allergies },
  })

  return NextResponse.json(rsvp)
}
