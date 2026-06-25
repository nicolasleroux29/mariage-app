import PublicHeader from '@/components/PublicHeader'

const temoins = [
  {
    prenom: 'Prénom',
    nom: 'Nom',
    role: 'Témoin de Yann',
    bio: 'Quelques mots sur ce témoin — comment il connaît le marié, un souvenir, une anecdote à compléter.',
  },
  {
    prenom: 'Prénom',
    nom: 'Nom',
    role: 'Témoin de Yann',
    bio: 'Quelques mots sur ce témoin — comment il connaît le marié, un souvenir, une anecdote à compléter.',
  },
  {
    prenom: 'Prénom',
    nom: 'Nom',
    role: 'Témoin de Judith',
    bio: 'Quelques mots sur ce témoin — comment elle connaît la mariée, un souvenir, une anecdote à compléter.',
  },
  {
    prenom: 'Prénom',
    nom: 'Nom',
    role: 'Témoin de Judith',
    bio: 'Quelques mots sur ce témoin — comment elle connaît la mariée, un souvenir, une anecdote à compléter.',
  },
]

export default function PresentationPage() {
  return (
    <>
      <PublicHeader />
      <main className="bg-white min-h-screen">

        {/* Hero */}
        <section className="bg-pink-50 py-16 px-4 text-center">
          <p className="text-pink-400 text-sm uppercase tracking-widest mb-3">19 juin 2027</p>
          <h1 className="text-4xl font-light text-gray-700">Présentation</h1>
        </section>

        <div className="max-w-2xl mx-auto px-4 py-16 flex flex-col gap-16">

          {/* Les mariés */}
          <section>
            <h2 className="text-xl font-medium text-gray-700 mb-8">Yann &amp; Judith</h2>
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              {/* Photo placeholder */}
              <div className="w-full sm:w-48 h-48 rounded-2xl bg-pink-100 flex-shrink-0 flex items-center justify-center">
                <span className="text-pink-300 text-2xl font-light tracking-widest">Y &amp; J</span>
              </div>
              <div className="flex flex-col gap-4 text-sm text-gray-500 leading-relaxed">
                <p>
                  Texte de présentation des mariés à compléter — comment ils se sont rencontrés,
                  leur histoire, ce qui les unit.
                </p>
                <p>
                  Deuxième paragraphe à compléter — anecdote, projet de vie, ce qu'ils partagent
                  avec leurs invités.
                </p>
              </div>
            </div>
          </section>

          {/* Les témoins */}
          <section>
            <h2 className="text-xl font-medium text-gray-700 mb-8">Les témoins</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {temoins.map((temoin, i) => (
                <div key={i} className="bg-pink-50 rounded-2xl p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    {/* Photo placeholder */}
                    <div className="w-14 h-14 rounded-full bg-pink-200 flex-shrink-0 flex items-center justify-center">
                      <span className="text-pink-400 text-lg font-light">
                        {temoin.prenom[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">{temoin.prenom} {temoin.nom}</p>
                      <p className="text-xs text-pink-400 mt-0.5">{temoin.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{temoin.bio}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </>
  )
}
