'use client'

import { useEffect, useState } from 'react'

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
  id: number
  nom: string
  prenom: string
  email: string | null
  token: string
  createdAt: string
  rsvp: Rsvp | null
}

export default function InvitesPage() {
  const [invites, setInvites] = useState<Invite[]>([])
  const [loading, setLoading] = useState(true)
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [copiedToken, setCopiedToken] = useState<string | null>(null)
  const [editInvite, setEditInvite] = useState<Invite | null>(null)
  const [editNom, setEditNom] = useState('')
  const [editPrenom, setEditPrenom] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editSubmitting, setEditSubmitting] = useState(false)

  async function fetchInvites() {
    const res = await fetch('/api/invites')
    const data = await res.json()
    setInvites(data)
    setLoading(false)
  }

  useEffect(() => { fetchInvites() }, [])

  async function handleAjout() {
    if (!nom || !prenom) return
    setSubmitting(true)
    await fetch('/api/invites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, prenom, email })
    })
    setNom(''); setPrenom(''); setEmail('')
    setSubmitting(false)
    fetchInvites()
  }

  function openEdit(invite: Invite) {
    setEditInvite(invite)
    setEditNom(invite.nom)
    setEditPrenom(invite.prenom)
    setEditEmail(invite.email ?? '')
  }

  async function handleEdit() {
    if (!editInvite || !editNom || !editPrenom) return
    setEditSubmitting(true)
    await fetch(`/api/invites/${editInvite.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom: editNom, prenom: editPrenom, email: editEmail || null }),
    })
    setEditInvite(null)
    setEditSubmitting(false)
    fetchInvites()
  }

  async function handleDelete(invite: Invite) {
    if (!window.confirm(`Supprimer ${invite.prenom} ${invite.nom} ? Cette action est irréversible.`)) return
    await fetch(`/api/invites/${invite.id}`, { method: 'DELETE' })
    fetchInvites()
  }

  function getLien(token: string) {
    return `${window.location.origin}/invite/${token}`
  }

  async function copierLien(token: string) {
    await navigator.clipboard.writeText(getLien(token))
    setCopiedToken(token)
    setTimeout(() => setCopiedToken(null), 2000)
  }

  function statutRsvp(invite: Invite) {
    if (!invite.rsvp) return { label: 'En attente', color: 'text-gray-400' }
    return { label: 'Répondu', color: 'text-green-500' }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-pink-400">Invités</h1>
        <a
          href="/api/invites/export"
          className="bg-white border border-pink-300 text-pink-400 rounded-lg px-4 py-2 text-sm font-medium hover:bg-pink-50 transition"
        >
          Exporter CSV
        </a>
      </div>

      {/* Formulaire ajout */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-700 mb-4">Ajouter un invité</h2>
        <div className="flex flex-wrap gap-3">
          <input
            placeholder="Prénom"
            value={prenom}
            onChange={e => setPrenom(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <input
            placeholder="Nom"
            value={nom}
            onChange={e => setNom(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <input
            placeholder="Email (optionnel)"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <button
            onClick={handleAjout}
            disabled={submitting || !nom || !prenom}
            className="bg-pink-400 text-white rounded-lg px-6 py-2 font-medium hover:bg-pink-500 transition disabled:opacity-50"
          >
            {submitting ? 'Ajout...' : 'Ajouter'}
          </button>
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-400">Chargement...</p>
        ) : invites.length === 0 ? (
          <p className="p-6 text-gray-400">Aucun invité pour le moment.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-pink-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Nom</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Statut</th>
                <th className="px-4 py-3 text-left">Église</th>
                <th className="px-4 py-3 text-left">Vin</th>
                <th className="px-4 py-3 text-left">Repas</th>
                <th className="px-4 py-3 text-left">Retour</th>
                <th className="px-4 py-3 text-left">Enfants</th>
                <th className="px-4 py-3 text-left">Nb</th>
                <th className="px-4 py-3 text-left">Lien</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invites.map(invite => {
                const statut = statutRsvp(invite)
                return (
                  <tr key={invite.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{invite.prenom} {invite.nom}</td>
                    <td className="px-4 py-3 text-gray-500">{invite.email ?? '—'}</td>
                    <td className={`px-4 py-3 font-medium ${statut.color}`}>{statut.label}</td>
                    <td className="px-4 py-3">{invite.rsvp ? (invite.rsvp.eglise ? '✅' : '❌') : '—'}</td>
                    <td className="px-4 py-3">{invite.rsvp ? (invite.rsvp.vinHonneur ? '✅' : '❌') : '—'}</td>
                    <td className="px-4 py-3">{invite.rsvp ? (invite.rsvp.repas ? '✅' : '❌') : '—'}</td>
                    <td className="px-4 py-3">{invite.rsvp ? (invite.rsvp.retourNoce ? '✅' : '❌') : '—'}</td>
                    <td className="px-4 py-3">{invite.rsvp ? (invite.rsvp.enfants ? '✅' : '❌') : '—'}</td>
                    <td className="px-4 py-3">{invite.rsvp?.enfants ? (invite.rsvp.nbEnfants ?? '?') : '—'}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => copierLien(invite.token)}
                        className="text-pink-400 hover:text-pink-600 transition text-xs font-medium"
                      >
                        {copiedToken === invite.token ? '✓ Copié !' : 'Copier le lien'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <button
                          onClick={() => openEdit(invite)}
                          className="text-gray-400 hover:text-gray-600 transition text-xs font-medium"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDelete(invite)}
                          className="text-red-400 hover:text-red-600 transition text-xs font-medium"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Modale d'édition */}
      {editInvite && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4"
          onClick={e => { if (e.target === e.currentTarget) setEditInvite(null) }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-medium text-gray-700 mb-5">Modifier l&apos;invité</h2>
            <div className="flex flex-col gap-3">
              <input
                placeholder="Prénom"
                value={editPrenom}
                onChange={e => setEditPrenom(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <input
                placeholder="Nom"
                value={editNom}
                onChange={e => setEditNom(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <input
                placeholder="Email (optionnel)"
                value={editEmail}
                onChange={e => setEditEmail(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setEditInvite(null)}
                className="flex-1 border border-gray-200 text-gray-500 rounded-lg py-2 text-sm hover:bg-gray-50 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleEdit}
                disabled={editSubmitting || !editNom || !editPrenom}
                className="flex-1 bg-pink-400 text-white rounded-lg py-2 text-sm font-medium hover:bg-pink-500 transition disabled:opacity-50"
              >
                {editSubmitting ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
