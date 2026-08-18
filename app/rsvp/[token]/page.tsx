import { prisma } from '@/lib/prisma'
import RsvpForm from './RsvpForm'

export default async function RsvpPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params

  const invite = await prisma.invite.findUnique({
    where: { token },
    include: { rsvp: true },
  })

  if (!invite) {
    return (
      <main className="min-h-screen bg-[#FDF5EA] flex items-center justify-center px-4">
        <div className="bg-white rounded-xl border border-[#D98287]/15 p-8 max-w-sm w-full text-center">
          <h1 className="text-2xl font-light text-[#E6C771] font-serif mb-3">Lien invalide</h1>
          <p className="text-[#D98287]/80 text-sm">
            Ce lien de réponse est invalide ou a expiré.
            Si vous pensez qu&apos;il s&apos;agit d&apos;une erreur, contactez les mariés.
          </p>
        </div>
      </main>
    )
  }

  return <RsvpForm invite={invite} />
}
