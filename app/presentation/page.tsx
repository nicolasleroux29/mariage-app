import Image from 'next/image'
import PublicHeader from '@/components/PublicHeader'
import FadeIn from '@/components/FadeIn'

const temoins = [
  {
    prenom: 'Mathieu',
    role: 'Frère et témoin de Judith',
    bio: 'Quelques mots sur ce témoin à compléter.',
  },
  {
    prenom: 'Erwan',
    role: 'Frère et témoin de Yann',
    bio: 'Quelques mots sur ce témoin à compléter.',
  },
  {
    prenom: 'Nicolas',
    role: 'Ami et témoin de Yann',
    bio: 'Quelques mots sur ce témoin à compléter.',
  },
  {
    prenom: 'Aude',
    role: 'Amie et demoiselle d\'honneur de Judith',
    bio: 'Quelques mots sur cette demoiselle d\'honneur à compléter.',
  },
  {
    prenom: 'Camille',
    role: 'Amie et demoiselle d\'honneur de Judith',
    bio: 'Quelques mots sur cette demoiselle d\'honneur à compléter.',
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
                    Après sept années à partager nos vies et quatre ans d&apos;aventure bordelaise,
                    nous voici à la prochaine étape de notre vie commune : le mariage. Depuis notre
                    rencontre à Brest en février 2020, de nombreux voyages, moments de joie, de
                    partage et d&apos;aventure sont venus nous combler de bonheur.
                  </p>
                  <p>
                    Nous voici prêts à franchir cette nouvelle étape et à sceller notre union. Nous
                    serons heureux et fiers de partager ce moment de bonheur à vos côtés.
                  </p>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* Nos témoins */}
          <FadeIn>
            <section>
              <h2 className="text-xl font-medium text-[#E6C771] mb-8 font-serif">Présentation des témoins et DH :</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {temoins.map((temoin, i) => (
                  <div key={i} className="bg-white rounded-xl p-8 flex flex-col items-center text-center gap-5">
                    <p className="font-medium text-[#E6C771]">{temoin.prenom}</p>
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
