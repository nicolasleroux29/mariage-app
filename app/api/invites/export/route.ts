import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const invites = await prisma.invite.findMany({
    orderBy: { nom: 'asc' },
    include: { rsvp: true }
  })

  const header = [
    'Prénom', 'Nom', 'Email', 'Statut',
    'Église', 'Vin d\'honneur', 'Repas', 'Retour de noce',
    'Enfants', 'Nb enfants', 'Allergies'
  ].join(';')

  const rows = invites.map((invite: (typeof invites)[number]) => [
    invite.prenom,
    invite.nom,
    invite.email ?? '',
    invite.rsvp ? 'Répondu' : 'En attente',
    invite.rsvp?.eglise ? 'Oui' : invite.rsvp ? 'Non' : '',
    invite.rsvp?.vinHonneur ? 'Oui' : invite.rsvp ? 'Non' : '',
    invite.rsvp?.repas ? 'Oui' : invite.rsvp ? 'Non' : '',
    invite.rsvp?.retourNoce ? 'Oui' : invite.rsvp ? 'Non' : '',
    invite.rsvp?.enfants ? 'Oui' : invite.rsvp ? 'Non' : '',
    invite.rsvp?.nbEnfants ?? '',
    invite.rsvp?.allergies ?? '',
  ].join(';'))

  const csv = [header, ...rows].join('\n')

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="invites.csv"'
    }
  })
}