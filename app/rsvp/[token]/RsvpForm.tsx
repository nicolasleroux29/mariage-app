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
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <p className="font-medium text-gray-700 mb-1">{label}</p>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`flex-1 py-2 rounded-lg font-medium transition ${
            value === true
              ? 'bg-pink-400 text-white'
              : 'bg-white border border-pink-200 text-gray-500 hover:border-pink-400'
          }`}
        >
          Oui
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`flex-1 py-2 rounded-lg font-medium transition ${
            value === false
              ? 'bg-gray-200 text-gray-600'
              : 'bg-white border border-gray-200 text-gray-400 hover:border-gray-400'
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
    <main className="min-h-screen bg-pink-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-pink-400 mb-2">
            Yann &amp; Judith
          </h1>
          <p className="text-gray-500">19 juin 2027 — Faire-part de réponse</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <p className="text-lg font-medium text-gray-700">
            Bonjour {invite.prenom} {invite.nom} !
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Merci de remplir ce formulaire pour nous indiquer votre présence.
            {hasExisting && ' Vous pouvez modifier vos réponses à tout moment via ce lien.'}
          </p>
        </div>

        {submitted && (
          <div ref={confirmationRef} className="scroll-mt-24 bg-green-50 border border-green-200 rounded-2xl p-6 mb-6 text-center">
            <p className="text-green-600 font-medium text-lg">Réponse enregistrée !</p>
            <p className="text-green-500 text-sm mt-1">
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

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="font-medium text-gray-700 mb-1">Enfants</p>
            <p className="text-sm text-gray-400 mb-4">Viendrez-vous accompagné(e) d&apos;enfants ?</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setEnfants(true)}
                className={`flex-1 py-2 rounded-lg font-medium transition ${
                  enfants === true
                    ? 'bg-pink-400 text-white'
                    : 'bg-white border border-pink-200 text-gray-500 hover:border-pink-400'
                }`}
              >
                Oui
              </button>
              <button
                type="button"
                onClick={() => { setEnfants(false); setNbEnfants('') }}
                className={`flex-1 py-2 rounded-lg font-medium transition ${
                  enfants === false
                    ? 'bg-gray-200 text-gray-600'
                    : 'bg-white border border-gray-200 text-gray-400 hover:border-gray-400'
                }`}
              >
                Non
              </button>
            </div>
            {enfants === true && (
              <div className="mt-4">
                <label className="text-sm text-gray-500 mb-1 block">Nombre d&apos;enfants</label>
                <input
                  type="number"
                  min="1"
                  value={nbEnfants}
                  onChange={e => setNbEnfants(e.target.value)}
                  className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="ex : 2"
                />
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="font-medium text-gray-700 mb-1">Votre adresse email</p>
            <p className="text-sm text-gray-400 mb-4">Pour recevoir la confirmation de votre réponse</p>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="prenom.nom@email.com"
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="font-medium text-gray-700 mb-1">Allergies ou régimes alimentaires</p>
            <p className="text-sm text-gray-400 mb-4">Optionnel — à renseigner si nécessaire</p>
            <textarea
              value={allergies}
              onChange={e => setAllergies(e.target.value)}
              rows={3}
              placeholder="Gluten, lactose, végétarien..."
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="bg-pink-400 text-white rounded-xl py-3 font-medium hover:bg-pink-500 transition disabled:opacity-50"
          >
            {submitting
              ? 'Enregistrement...'
              : hasExisting || submitted
              ? 'Modifier ma réponse'
              : 'Enregistrer ma réponse'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-300 mt-8">
          Ce lien est personnel — merci de ne pas le partager.
        </p>
      </div>
    </main>
    </>
  )
}
