'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/presentation', label: 'Présentation' },
  { href: '/mariage', label: 'Le Mariage' },
  { href: '/faq', label: 'FAQ' },
]

export default function PublicHeader() {
  const pathname = usePathname()
  const [rsvpToken, setRsvpToken] = useState<string | null>(null)

  useEffect(() => {
    setRsvpToken(localStorage.getItem('rsvp_token'))
  }, [])

  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-pink-100">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-pink-400 font-semibold text-lg tracking-widest">
          Y &amp; J
        </Link>
        <nav className="flex gap-6 text-sm items-center">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition ${
                pathname === link.href
                  ? 'text-pink-400 font-medium'
                  : 'text-gray-400 hover:text-pink-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {rsvpToken && (
            <Link
              href={`/rsvp/${rsvpToken}`}
              className={`transition border rounded-full px-3 py-1 text-xs ${
                pathname.startsWith('/rsvp')
                  ? 'border-pink-400 text-pink-400 font-medium'
                  : 'border-pink-200 text-pink-400 hover:border-pink-400'
              }`}
            >
              Mon RSVP
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
