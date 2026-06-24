import Link from 'next/link'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-pink-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex gap-6 items-center">
        <span className="font-semibold text-pink-400 mr-4">Yann & Judith</span>
        <Link href="/dashboard" className="text-gray-600 hover:text-pink-400 transition">
          Synthèse
        </Link>
        <Link href="/dashboard/invites" className="text-gray-600 hover:text-pink-400 transition">
          Invités
        </Link>
        <Link href="/dashboard/allergies" className="text-gray-600 hover:text-pink-400 transition">
          Allergies
        </Link>
      </nav>
      <main className="p-6">
        {children}
      </main>
    </div>
  )
}