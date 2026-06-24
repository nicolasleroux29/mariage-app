import { prisma } from '@/lib/prisma'

export default async function DashboardPage() {
  const totalInvites = await prisma.invite.count()
  const totalReponses = await prisma.rsvp.count()
  const sansReponse = totalInvites - totalReponses

  const stats = await prisma.rsvp.aggregate({
    _sum: { nbEnfants: true },
    where: { enfants: true }
  })


  const countEglise = await prisma.rsvp.count({ where: { eglise: true } })
  const countVin = await prisma.rsvp.count({ where: { vinHonneur: true } })
  const countRepas = await prisma.rsvp.count({ where: { repas: true } })
  const countRetour = await prisma.rsvp.count({ where: { retourNoce: true } })

  const cards = [
    { label: 'Invités total', value: totalInvites },
    { label: 'Réponses reçues', value: totalReponses },
    { label: 'Sans réponse', value: sansReponse },
    { label: 'Présents — Église', value: countEglise },
    { label: 'Présents — Vin d\'honneur', value: countVin },
    { label: 'Présents — Repas', value: countRepas },
    { label: 'Présents — Retour de noce', value: countRetour },
    { label: 'Enfants', value: stats._sum.nbEnfants ?? 0 },
  ]

  return (
    <div>
      <h1 className="text-2xl font-semibold text-pink-400 mb-6">Synthèse</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map(card => (
          <div key={card.label} className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <p className="text-4xl font-bold text-pink-400">{card.value}</p>
            <p className="text-gray-500 text-sm mt-2">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}