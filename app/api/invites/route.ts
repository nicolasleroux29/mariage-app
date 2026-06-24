import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const invites = await prisma.invite.findMany({
    orderBy: { createdAt: 'desc' },
    include: { rsvp: true }
  })
  return NextResponse.json(invites)
}

export async function POST(req: NextRequest) {
  const { nom, prenom, email } = await req.json()

  if (!nom || !prenom) {
    return NextResponse.json({ error: 'Nom et prénom obligatoires' }, { status: 400 })
  }

  const invite = await prisma.invite.create({
    data: { nom, prenom, email }
  })

  return NextResponse.json(invite, { status: 201 })
}