import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const totalInvites = await prisma.invite.count()
  const totalReponses = await prisma.rsvp.count()
  const sansReponse = totalInvites - totalReponses

  const rsvps = await prisma.rsvp.findMany({
    select: { eglise: true, vinHonneur: true, repas: true, retourNoce: true, enfants: true, nbAdultes: true, nbEnfants: true }
  })

  // Chaque RSVP représente un foyer : quand il répond "oui" à un événement,
  // on compte tout le foyer (adultes + enfants) présent à cet événement.
  function headcount(rsvp: (typeof rsvps)[number]) {
    return (rsvp.nbAdultes ?? 1) + (rsvp.enfants && rsvp.nbEnfants ? rsvp.nbEnfants : 0)
  }

  const sumWhere = (pred: (r: (typeof rsvps)[number]) => boolean) =>
    rsvps.filter(pred).reduce((total, r) => total + headcount(r), 0)

  const countEglise = sumWhere(r => r.eglise === true)
  const countVin = sumWhere(r => r.vinHonneur === true)
  const countRepas = sumWhere(r => r.repas === true)
  const countRetour = sumWhere(r => r.retourNoce === true)
  const totalAdultes = rsvps.reduce((total, r) => total + (r.nbAdultes ?? 0), 0)
  const totalEnfants = rsvps.reduce((total, r) => total + (r.enfants && r.nbEnfants ? r.nbEnfants : 0), 0)

  const cards = [
    { label: 'Invités total', value: totalInvites },
    { label: 'Réponses reçues', value: totalReponses },
    { label: 'Sans réponse', value: sansReponse },
    { label: 'Présents — Église', value: countEglise },
    { label: 'Présents — Vin d\'honneur', value: countVin },
    { label: 'Présents — Repas', value: countRepas },
    { label: 'Présents — Retour de noce', value: countRetour },
    { label: 'Adultes', value: totalAdultes },
    { label: 'Enfants', value: totalEnfants },
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