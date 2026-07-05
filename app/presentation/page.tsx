import Image from 'next/image'
import PublicHeader from '@/components/PublicHeader'

const temoins = [
  {
    prenom: 'Prénom',
    nom: 'Nom',
    role: 'Témoin de Yann',
    bio: 'Quelques mots sur ce témoin à compléter.',
  },
  {
    prenom: 'Prénom',
    nom: 'Nom',
    role: 'Témoin de Yann',
    bio: 'Quelques mots sur ce témoin à compléter.',
  },
  {
    prenom: 'Prénom',
    nom: 'Nom',
    role: 'Témoin de Judith',
    bio: 'Quelques mots sur ce témoin à compléter.',
  },
  {
    prenom: 'Prénom',
    nom: 'Nom',
    role: 'Témoin de Judith',
    bio: 'Quelques mots sur ce témoin à compléter.',
  },
]

export default function PresentationPage() {
  return (
    <>
      <PublicHeader />
      <main className="bg-white min-h-screen">

        {/* Hero */}
        <section className="bg-pink-50 py-16 px-6 text-center">
          <p className="text-pink-400 text-sm uppercase tracking-widest mb-6">Yann &amp; Judith</p>
          <h1 className="text-3xl sm:text-4xl font-light text-gray-700">
            Déjà 7 ans que notre histoire a commencé&nbsp;!
          </h1>
        </section>

        <div className="max-w-2xl mx-auto px-4 py-16 flex flex-col gap-16">

          {/* Les mariés */}
          <section>
            <h2 className="text-xl font-medium text-gray-700 mb-8">Yann &amp; Judith</h2>
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="w-full sm:w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                <Image
                  src="/optimizedyannjudith.png"
                  alt="Yann & Judith"
                  width={192}
                  height={192}
                  className="object-cover object-[center_40%] w-full h-full"
                />
              </div>
              <div className="flex flex-col gap-4 text-sm text-gray-500 leading-relaxed">
                <p>
                  Aujourd&apos;hui, nous sommes heureux de franchir cette nouvelle étape et de
                  célébrer notre union avec vous.
                </p>
                <p>
                  Texte de présentation à compléter — votre histoire, ce qui vous unit, ce que
                  vous souhaitez partager avec vos invités.
                </p>
              </div>
            </div>
          </section>

          {/* Nos témoins */}
          <section>
            <h2 className="text-xl font-medium text-gray-700 mb-8">Nos témoins</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {temoins.map((temoin, i) => (
                <div key={i} className="bg-pink-50 rounded-2xl p-6 flex flex-col items-center text-center gap-4">
                  <p className="font-medium text-gray-700">{temoin.prenom} {temoin.nom}</p>
                  {/* Photo placeholder — remplacer par <Image src="..." /> */}
                  <div className="w-24 h-24 rounded-full bg-pink-200 flex items-center justify-center">
                    <span className="text-pink-400 text-2xl font-light">
                      {temoin.prenom[0]}
                    </span>
                  </div>
                  <p className="text-xs text-pink-400">{temoin.role}</p>
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
