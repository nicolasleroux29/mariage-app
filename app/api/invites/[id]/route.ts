import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { log } from '@/lib/log'

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const inviteId = parseInt(id, 10)

  const invite = await prisma.invite.findUnique({ where: { id: inviteId } })

  await prisma.rsvp.deleteMany({ where: { inviteId } })
  await prisma.invite.delete({ where: { id: inviteId } })

  if (invite) {
    await log('INVITE_DELETED', `Invité supprimé : ${invite.prenom} ${invite.nom}`, { meta: { inviteId } })
  }

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

  await log('INVITE_UPDATED', `Invité modifié : ${prenom} ${nom}`, { meta: { inviteId: invite.id } })

  return NextResponse.json(invite)
}
