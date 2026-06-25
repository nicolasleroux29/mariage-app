import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function AllergiesPage() {
  const rsvps = await prisma.rsvp.findMany({
    where: {
      allergies: { not: null },
    },
    include: { invite: true }
  })

  return (
    <div>
      <h1 className="text-2xl font-semibold text-pink-400 mb-6">Allergies & régimes</h1>

      {rsvps.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-400">
          Aucune allergie ou régime alimentaire signalé pour le moment.
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-pink-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Invité</th>
                <th className="px-4 py-3 text-left">Allergies / régime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rsvps.map(rsvp => (
                <tr key={rsvp.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">
                    {rsvp.invite.prenom} {rsvp.invite.nom}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{rsvp.allergies}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}