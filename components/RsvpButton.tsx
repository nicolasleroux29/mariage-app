'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function RsvpButton() {
  const [rsvpToken, setRsvpToken] = useState<string | null>(null)

  useEffect(() => {
    setRsvpToken(localStorage.getItem('rsvp_token'))
  }, [])

  if (!rsvpToken) return null

  return (
    <Link
      href={`/rsvp/${rsvpToken}`}
      className="inline-block bg-[#D98287] text-white rounded-full px-8 py-3 text-sm font-medium tracking-widest uppercase hover:opacity-90 transition"
      style={{ animation: 'fadeInUp 0.8s 0.75s ease-out both' }}
    >
      Répondre au RSVP
    </Link>
  )
}
