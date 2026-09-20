import { prisma } from '@/lib/prisma'
import type { LogType } from '@prisma/client'

export const dynamic = 'force-dynamic'

const TYPE_LABELS: Record<LogType, string> = {
  LOGIN: 'Connexion',
  RATE_LIMITED: 'Blocage anti-brute-force',
  INVITE_CREATED: 'Invité ajouté',
  INVITE_UPDATED: 'Invité modifié',
  INVITE_DELETED: 'Invité supprimé',
  RSVP_SUBMITTED: 'RSVP soumis',
  RSVP_UPDATED: 'RSVP modifié',
}

const TYPE_COLORS: Record<LogType, string> = {
  LOGIN: 'bg-blue-100 text-blue-700',
  RATE_LIMITED: 'bg-orange-100 text-orange-700',
  INVITE_CREATED: 'bg-emerald-100 text-emerald-700',
  INVITE_UPDATED: 'bg-amber-100 text-amber-700',
  INVITE_DELETED: 'bg-red-100 text-red-700',
  RSVP_SUBMITTED: 'bg-pink-100 text-pink-700',
  RSVP_UPDATED: 'bg-purple-100 text-purple-700',
}

export default async function LogsPage() {
  const logs = await prisma.logEntry.findMany({
    orderBy: { createdAt: 'desc' },
    take: 200,
  })

  return (
    <div>
      <h1 className="text-2xl font-semibold text-pink-400 mb-6">Journal d&apos;activité</h1>

      {logs.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-400">
          Aucun événement enregistré pour le moment.
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-pink-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Détails</th>
                <th className="px-4 py-3 text-left">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.map(entry => (
                <tr key={entry.id} className={entry.success ? '' : 'bg-red-50/40'}>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                    {entry.createdAt.toLocaleString('fr-FR', {
                      dateStyle: 'short',
                      timeStyle: 'medium',
                    })}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${TYPE_COLORS[entry.type]}`}>
                      {TYPE_LABELS[entry.type]}
                    </span>
                    {!entry.success && (
                      <span className="ml-2 text-xs font-medium text-red-600">échec</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{entry.message}</td>
                  <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{entry.ip ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
