import PublicHeader from '@/components/PublicHeader'
import FadeIn from '@/components/FadeIn'

const hebergements = [
  {
    nom: "Nom de l'hôtel 1",
    distance: 'X km du lieu de réception',
    adresse: 'Adresse à compléter',
    telephone: '+33 X XX XX XX XX',
    site: '#',
  },
  {
    nom: "Nom de l'hôtel 2",
    distance: 'X km du lieu de réception',
    adresse: 'Adresse à compléter',
    telephone: '+33 X XX XX XX XX',
    site: '#',
  },
  {
    nom: "Nom de l'hôtel 3",
    distance: 'X km du lieu de réception',
    adresse: 'Adresse à compléter',
    telephone: '+33 X XX XX XX XX',
    site: '#',
  },
]

export default function FaqPage() {
  return (
    <>
      <PublicHeader />
      <main className="bg-[#faf9f7] min-h-screen">

        {/* Hero */}
        <section className="bg-stone-50 py-24 sm:py-32 px-4 text-center">
          <p className="text-pink-400 text-sm uppercase tracking-widest mb-3">Samedi 19 juin 2027</p>
          <h1 className="text-4xl font-light text-stone-700 font-serif">FAQ</h1>
        </section>

        <div className="max-w-2xl mx-auto px-4 py-24 flex flex-col gap-24">

          {/* Hébergements */}
          <FadeIn>
            <section>
              <h2 className="text-xl font-medium text-stone-700 mb-2 font-serif">Où dormir ?</h2>
              <p className="text-sm text-stone-400 mb-6">
                Nous avons sélectionné quelques hôtels à proximité. Pensez à réserver rapidement.
              </p>
              <div className="flex flex-col gap-4">
                {hebergements.map((h, i) => (
                  <div key={i} className="bg-stone-50 rounded-xl p-8">
                    <h3 className="text-base font-medium text-stone-700">{h.nom}</h3>
                    <p className="text-xs text-pink-400 mt-0.5">{h.distance}</p>
                    <p className="text-base text-stone-600 mt-2">{h.adresse}</p>
                    <p className="text-base text-stone-600">{h.telephone}</p>
                    <a
                      href={h.site}
                      className="inline-block mt-4 text-sm text-pink-400 hover:text-pink-500 transition font-medium"
                    >
                      Voir le site →
                    </a>
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>

          {/* Transport */}
          <FadeIn>
            <section>
              <h2 className="text-xl font-medium text-stone-700 mb-6 font-serif">Comment venir ?</h2>
              <div className="flex flex-col gap-4">
                <div className="bg-stone-50 rounded-xl p-8">
                  <h3 className="text-base font-medium text-stone-700">En voiture</h3>
                  <p className="text-base text-stone-600 mt-2 leading-loose">
                    Indications d&apos;accès à compléter. Parking disponible sur place.
                  </p>
                </div>
                <div className="bg-stone-50 rounded-xl p-8">
                  <h3 className="text-base font-medium text-stone-700">Navette</h3>
                  <p className="text-base text-stone-600 mt-2 leading-loose">
                    Informations sur les navettes éventuelles à compléter.
                  </p>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* Dress code */}
          <FadeIn>
            <section>
              <h2 className="text-xl font-medium text-stone-700 mb-6 font-serif">Quelle tenue porter ?</h2>
              <div className="bg-stone-50 rounded-xl p-8">
                <p className="text-base text-stone-600 leading-loose">
                  Tenue de soirée souhaitée. À compléter avec vos préférences (couleurs à éviter, style souhaité, etc.).
                </p>
              </div>
            </section>
          </FadeIn>

          {/* Contact */}
          <FadeIn>
            <section>
              <h2 className="text-xl font-medium text-stone-700 mb-6 font-serif">Qui contacter ?</h2>
              <div className="bg-stone-50 rounded-xl p-8">
                <p className="text-base text-stone-600 mb-4 leading-loose">
                  N&apos;hésitez pas à contacter les mariés ou les témoins pour toute question.
                </p>
                <div className="flex flex-col gap-2 text-sm text-stone-600">
                  <p><span className="font-medium text-stone-700">Yann</span> — email ou téléphone à compléter</p>
                  <p><span className="font-medium text-stone-700">Judith</span> — email ou téléphone à compléter</p>
                </div>
              </div>
            </section>
          </FadeIn>

        </div>
      </main>
    </>
  )
}
