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

function isBoolOrNull(v: unknown): v is boolean | null {
  return v === null || typeof v === 'boolean'
}

function isCountOrNull(v: unknown): v is number | null {
  return v === null || (Number.isInteger(v) && (v as number) >= 0 && (v as number) <= 50)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const inviteId = parseInt(id, 10)
  const { nom, prenom, email, rsvp } = await req.json()

  if (!nom || !prenom) {
    return NextResponse.json({ error: 'Nom et prénom obligatoires' }, { status: 400 })
  }

  // Réponse RSVP optionnelle : saisie ou corrigée par les mariés depuis le dashboard
  let rsvpData = null
  if (rsvp) {
    const { eglise, vinHonneur, repas, retourNoce, enfants, nbEnfants, nbAdultes, allergies } = rsvp
    if (
      ![eglise, vinHonneur, repas, retourNoce, enfants].every(isBoolOrNull) ||
      !isCountOrNull(nbEnfants) || !isCountOrNull(nbAdultes) ||
      !(allergies === null || typeof allergies === 'string')
    ) {
      return NextResponse.json({ error: 'Réponse RSVP invalide' }, { status: 400 })
    }
    rsvpData = {
      eglise, vinHonneur, repas, retourNoce, enfants,
      nbEnfants: enfants ? nbEnfants : null,
      nbAdultes,
      allergies: allergies?.trim().slice(0, 1000) || null,
    }
  }

  const existing = await prisma.rsvp.findUnique({ where: { inviteId } })

  const invite = await prisma.$transaction(async (tx) => {
    const updated = await tx.invite.update({
      where: { id: inviteId },
      data: { nom, prenom, email: email || null },
    })
    if (rsvpData) {
      await tx.rsvp.upsert({
        where: { inviteId },
        create: { inviteId, ...rsvpData },
        update: rsvpData,
      })
    }
    return updated
  })

  await log('INVITE_UPDATED', `Invité modifié : ${prenom} ${nom}`, { meta: { inviteId } })
  if (rsvpData) {
    await log(
      existing ? 'RSVP_UPDATED' : 'RSVP_SUBMITTED',
      `${existing ? 'RSVP modifié' : 'RSVP saisi'} depuis le dashboard : ${prenom} ${nom}`,
      { meta: { inviteId } }
    )
  }

  return NextResponse.json(invite)
}
