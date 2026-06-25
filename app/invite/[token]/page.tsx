import { prisma } from '@/lib/prisma'
import InviteRedirect from './InviteRedirect'

export default async function InvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params

  const invite = await prisma.invite.findUnique({ where: { token } })

  if (!invite) {
    return (
      <main className="min-h-screen bg-pink-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8 max-w-sm w-full text-center">
          <h1 className="text-2xl font-semibold text-pink-400 mb-3">Lien invalide</h1>
          <p className="text-gray-500 text-sm">
            Ce lien d&apos;invitation est invalide ou a expiré.
            Si vous pensez qu&apos;il s&apos;agit d&apos;une erreur, contactez les mariés.
          </p>
        </div>
      </main>
    )
  }

  return <InviteRedirect token={token} />
}
