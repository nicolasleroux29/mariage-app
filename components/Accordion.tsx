'use client'

import { useState } from 'react'

export default function Accordion({
  question,
  children,
}: {
  question: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 text-left p-8"
      >
        <h3 className="text-base font-medium text-[#E6C771]">{question}</h3>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={`flex-shrink-0 text-[#D98287] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div className="px-8 pb-8 -mt-2">{children}</div>}
    </div>
  )
}
