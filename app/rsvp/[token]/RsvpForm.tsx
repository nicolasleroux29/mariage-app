'use client'

import { useEffect, useRef, useState } from 'react'
import PublicHeader from '@/components/PublicHeader'

type Rsvp = {
  eglise: boolean | null
  vinHonneur: boolean | null
  repas: boolean | null
  retourNoce: boolean | null
  enfants: boolean | null
  nbEnfants: number | null
  allergies: string | null
}

type Invite = {
  nom: string
  prenom: string
  email: string | null
  token: string
  rsvp: Rsvp | null
}

function ToggleField({
  label,
  description,
  value,
  onChange,
}: {
  label: string
  description: string
  value: boolean | null
  onChange: (v: boolean) => void
}) {
  return (
    <div className="bg-white rounded-xl border border-stone-100 p-6">
      <p className="font-medium text-stone-700 mb-1">{label}</p>
      <p className="text-sm text-stone-400 mb-4">{description}</p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`flex-1 py-2.5 rounded-md text-sm font-medium tracking-wide transition ${
            value === true
              ? 'bg-pink-400 text-white'
              : 'border border-pink-200 text-stone-500 hover:border-pink-400'
          }`}
        >
          Oui
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`flex-1 py-2.5 rounded-md text-sm font-medium tracking-wide transition ${
            value === false
              ? 'bg-stone-100 text-stone-600'
              : 'border border-stone-200 text-stone-400 hover:border-stone-400'
          }`}
        >
          Non
        </button>
      </div>
    </div>
  )
}

export default function RsvpForm({ invite }: { invite: Invite }) {
  const existing = invite.rsvp
  const hasExisting = existing !== null

  const [eglise, setEglise] = useState<boolean | null>(existing?.eglise ?? null)
  const [vinHonneur, setVinHonneur] = useState<boolean | null>(existing?.vinHonneur ?? null)
  const [repas, setRepas] = useState<boolean | null>(existing?.repas ?? null)
  const [retourNoce, setRetourNoce] = useState<boolean | null>(existing?.retourNoce ?? null)
  const [enfants, setEnfants] = useState<boolean | null>(existing?.enfants ?? null)
  const [nbEnfants, setNbEnfants] = useState<string>(existing?.nbEnfants?.toString() ?? '')
  const [allergies, setAllergies] = useState<string>(existing?.allergies ?? '')
  const [email, setEmail] = useState<string>(invite.email ?? '')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const confirmationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    localStorage.setItem('rsvp_token', invite.token)
  }, [invite.token])

  useEffect(() => {
    if (submitted) {
      confirmationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [submitted])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const res = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: invite.token,
        eglise,
        vinHonneur,
        repas,
        retourNoce,
        enfants,
        nbEnfants: enfants && nbEnfants ? parseInt(nbEnfants, 10) : null,
        allergies: allergies.trim() || null,
        email: email.trim() || null,
      }),
    })

    if (res.ok) {
      setSubmitted(true)
    } else {
      const data = await res.json()
      setError(data.error ?? 'Une erreur est survenue.')
    }
    setSubmitting(false)
  }

  return (
    <>
      <PublicHeader />
      <main className="min-h-screen bg-[#faf9f7] py-12 px-4">
        <div className="max-w-lg mx-auto">

          <div className="text-center mb-10">
            <p className="text-pink-400 text-xs uppercase tracking-widest mb-3">19 juin 2027</p>
            <h1 className="text-3xl font-light text-stone-700 font-serif">
              Yann &amp; Judith
            </h1>
            <p className="text-stone-400 text-sm mt-2">Faire-part de réponse</p>
          </div>

          <div className="bg-white rounded-xl border border-stone-100 p-6 mb-6">
            <p className="text-lg font-medium text-stone-700">
              Bonjour {invite.prenom} {invite.nom}&nbsp;!
            </p>
            <p className="text-sm text-stone-400 mt-1 leading-relaxed">
              Merci de remplir ce formulaire pour nous indiquer votre présence.
              {hasExisting && ' Vous pouvez modifier vos réponses à tout moment via ce lien.'}
            </p>
          </div>

          {submitted && (
            <div ref={confirmationRef} className="scroll-mt-24 bg-green-50 border border-green-100 rounded-xl p-6 mb-6 text-center">
              <p className="text-green-600 font-medium text-lg">Réponse enregistrée !</p>
              <p className="text-green-500 text-sm mt-1 leading-relaxed">
                Merci {invite.prenom}, nous avons bien reçu votre réponse.
                Vous pouvez la modifier à tout moment en revenant sur ce lien.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <ToggleField
              label="Cérémonie religieuse"
              description="Samedi 19 juin 2027 — 14h30"
              value={eglise}
              onChange={setEglise}
            />
            <ToggleField
              label="Vin d'honneur"
              description="Samedi 19 juin 2027 — 17h30"
              value={vinHonneur}
              onChange={setVinHonneur}
            />
            <ToggleField
              label="Dîner de gala"
              description="Samedi 19 juin 2027 — 19h00"
              value={repas}
              onChange={setRepas}
            />
            <ToggleField
              label="Retour de noce"
              description="Dimanche 20 juin 2027 — matin"
              value={retourNoce}
              onChange={setRetourNoce}
            />

            <div className="bg-white rounded-xl border border-stone-100 p-6">
              <p className="font-medium text-stone-700 mb-1">Enfants</p>
              <p className="text-sm text-stone-400 mb-4">Viendrez-vous accompagné(e) d&apos;enfants ?</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setEnfants(true)}
                  className={`flex-1 py-2.5 rounded-md text-sm font-medium tracking-wide transition ${
                    enfants === true
                      ? 'bg-pink-400 text-white'
                      : 'border border-pink-200 text-stone-500 hover:border-pink-400'
                  }`}
                >
                  Oui
                </button>
                <button
                  type="button"
                  onClick={() => { setEnfants(false); setNbEnfants('') }}
                  className={`flex-1 py-2.5 rounded-md text-sm font-medium tracking-wide transition ${
                    enfants === false
                      ? 'bg-stone-100 text-stone-600'
                      : 'border border-stone-200 text-stone-400 hover:border-stone-400'
                  }`}
                >
                  Non
                </button>
              </div>
              {enfants === true && (
                <div className="mt-4">
                  <label className="text-sm text-stone-500 mb-1 block">Nombre d&apos;enfants</label>
                  <input
                    type="number"
                    min="1"
                    value={nbEnfants}
                    onChange={e => setNbEnfants(e.target.value)}
                    className="border border-stone-200 rounded-lg px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-pink-300 transition"
                    placeholder="ex : 2"
                  />
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-stone-100 p-6">
              <p className="font-medium text-stone-700 mb-1">Votre adresse email</p>
              <p className="text-sm text-stone-400 mb-4">Pour recevoir la confirmation de votre réponse</p>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="prenom.nom@email.com"
                className="border border-stone-200 rounded-lg px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-pink-300 transition"
              />
            </div>

            <div className="bg-white rounded-xl border border-stone-100 p-6">
              <p className="font-medium text-stone-700 mb-1">Allergies ou régimes alimentaires</p>
              <p className="text-sm text-stone-400 mb-4">Optionnel — à renseigner si nécessaire</p>
              <textarea
                value={allergies}
                onChange={e => setAllergies(e.target.value)}
                rows={3}
                placeholder="Gluten, lactose, végétarien..."
                className="border border-stone-200 rounded-lg px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-pink-300 transition resize-none"
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="bg-pink-400 text-white rounded-lg py-4 font-medium tracking-wide hover:bg-pink-500 transition disabled:opacity-50 mt-2"
            >
              {submitting
                ? 'Enregistrement...'
                : hasExisting || submitted
                ? 'Modifier ma réponse'
                : 'Enregistrer ma réponse'}
            </button>
          </form>

          <p className="text-center text-xs text-stone-300 mt-8">
            Ce lien est personnel — merci de ne pas le partager.
          </p>
        </div>
      </main>
    </>
  )
}
