'use client'

import { useEffect, useState } from 'react'

const WEDDING = new Date('2027-06-19T11:00:00')

function getTimeLeft() {
  const diff = WEDDING.getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[60px]">
      <span className="text-4xl font-light text-pink-400 tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs text-stone-400 uppercase tracking-widest mt-1">{label}</span>
    </div>
  )
}

export default function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft>>(null)

  useEffect(() => {
    setTime(getTimeLeft())
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!time) return <p className="text-stone-400 text-sm">C&apos;est le grand jour !</p>
  if (time === null) return null

  return (
    <div className="flex gap-8">
      <Unit value={time.days} label="Jours" />
      <Unit value={time.hours} label="Heures" />
      <Unit value={time.minutes} label="Min." />
      <Unit value={time.seconds} label="Sec." />
    </div>
  )
}
