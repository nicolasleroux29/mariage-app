import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const inviteId = parseInt(id, 10)

  await prisma.rsvp.deleteMany({ where: { inviteId } })
  await prisma.invite.delete({ where: { id: inviteId } })

  return NextResponse.json({ success: true })
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { nom, prenom, email } = await req.json()

  if (!nom || !prenom) {
    return NextResponse.json({ error: 'Nom et prénom obligatoires' }, { status: 400 })
  }

  const invite = await prisma.invite.update({
    where: { id: parseInt(id, 10) },
    data: { nom, prenom, email: email || null },
  })

  return NextResponse.json(invite)
}
