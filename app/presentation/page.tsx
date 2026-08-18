import Image from 'next/image'
import PublicHeader from '@/components/PublicHeader'
import FadeIn from '@/components/FadeIn'

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
  {
    prenom: 'Prénom',
    nom: 'Nom',
    role: 'Témoin',
    bio: 'Quelques mots sur ce témoin à compléter.',
  },
]

export default function PresentationPage() {
  return (
    <>
      <PublicHeader />
      <main className="bg-[#FDF5EA] min-h-screen">

        {/* Hero */}
        <section className="bg-[#FDF5EA] py-24 sm:py-32 px-6 text-center">
          <p className="text-[#D98287] text-sm uppercase tracking-widest">Yann &amp; Judith</p>
        </section>

        <div className="max-w-2xl mx-auto px-4 py-24 flex flex-col gap-24">

          {/* Les mariés */}
          <FadeIn>
            <section>
              <h2 className="text-xl font-medium text-[#E6C771] mb-8 font-serif">Yann &amp; Judith</h2>
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="w-full sm:w-48 h-48 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                  <Image
                    src="/optimizedyannjudith.png"
                    alt="Yann & Judith"
                    width={192}
                    height={192}
                    className="object-cover object-[center_40%] w-full h-full"
                  />
                </div>
                <div className="flex flex-col gap-5 text-base text-[#D98287] leading-loose">
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
          </FadeIn>

          {/* Nos témoins */}
          <FadeIn>
            <section>
              <h2 className="text-xl font-medium text-[#E6C771] mb-8 font-serif">Nos témoins</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {temoins.map((temoin, i) => (
                  <div key={i} className="bg-white rounded-xl p-8 flex flex-col items-center text-center gap-5">
                    <p className="font-medium text-[#E6C771]">{temoin.prenom} {temoin.nom}</p>
                    <div className="w-24 h-24 rounded-full bg-[#D98287]/20 flex items-center justify-center">
                      <span className="text-[#D98287] text-2xl font-light">
                        {temoin.prenom[0]}
                      </span>
                    </div>
                    <p className="text-xs text-[#D98287]">{temoin.role}</p>
                    <p className="text-base text-[#D98287] leading-loose">{temoin.bio}</p>
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>

        </div>
      </main>
    </>
  )
}
