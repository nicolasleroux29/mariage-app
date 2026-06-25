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
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setRsvpToken(localStorage.getItem('rsvp_token'))
  }, [])

  // Ferme le menu à chaque changement de page
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-pink-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-pink-400 font-semibold text-lg tracking-widest">
            Y &amp; J
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex gap-6 text-sm items-center">
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

          {/* Mobile — Mon RSVP toujours visible + burger */}
          <div className="flex md:hidden items-center gap-3">
            {rsvpToken && (
              <Link
                href={`/rsvp/${rsvpToken}`}
                className={`border rounded-full px-3 py-1 text-xs transition ${
                  pathname.startsWith('/rsvp')
                    ? 'border-pink-400 text-pink-400 font-medium'
                    : 'border-pink-200 text-pink-400 hover:border-pink-400'
                }`}
              >
                Mon RSVP
              </Link>
            )}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="text-gray-400 hover:text-pink-400 transition p-1"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Overlay plein écran mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-10 md:hidden">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-2xl font-light tracking-wide transition ${
                pathname === link.href ? 'text-pink-400' : 'text-gray-500 hover:text-pink-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
