import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendRsvpConfirmation, sendRsvpNotification } from '@/lib/emails'

export async function POST(req: NextRequest) {
  const { token, eglise, vinHonneur, repas, retourNoce, enfants, nbEnfants, allergies } = await req.json()

  if (!token) {
    return NextResponse.json({ error: 'Token manquant' }, { status: 400 })
  }

  const invite = await prisma.invite.findUnique({
    where: { token },
    include: { rsvp: true },
  })

  if (!invite) {
    return NextResponse.json({ error: 'Lien invalide' }, { status: 404 })
  }

  const isUpdate = invite.rsvp !== null
  const rsvpData = { eglise, vinHonneur, repas, retourNoce, enfants, nbEnfants, allergies }

  const rsvp = await prisma.rsvp.upsert({
    where: { inviteId: invite.id },
    create: { inviteId: invite.id, ...rsvpData },
    update: rsvpData,
  })

  // Envoi des emails en arrière-plan — ne bloque pas la réponse
  const emailPromises = [
    sendRsvpNotification(invite, rsvpData, isUpdate),
  ]
  if (invite.email) {
    emailPromises.push(sendRsvpConfirmation(
      { prenom: invite.prenom, nom: invite.nom, email: invite.email, token: invite.token },
      rsvpData
    ))
  }
  Promise.allSettled(emailPromises).catch(() => {})

  return NextResponse.json(rsvp)
}
