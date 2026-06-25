'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function InviteRedirect({ token }: { token: string }) {
  const router = useRouter()

  useEffect(() => {
    localStorage.setItem('rsvp_token', token)
    router.replace('/')
  }, [token, router])

  return null
}
