import PublicHeader from '@/components/PublicHeader'
import FadeIn from '@/components/FadeIn'
import Accordion from '@/components/Accordion'

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
      <main className="bg-[#FDF5EA] min-h-screen">

        {/* Hero */}
        <section className="bg-[#FDF5EA] py-24 sm:py-32 px-4 text-center">
          <p className="text-[#D98287] text-sm uppercase tracking-widest mb-3">Samedi 19 juin 2027</p>
          <h1 className="text-4xl font-light text-[#E6C771] font-serif">FAQ</h1>
        </section>

        <div className="max-w-2xl mx-auto px-4 py-24 flex flex-col gap-6">

          {/* Hébergements */}
          <FadeIn>
            <Accordion question="Où dormir ?">
              <p className="text-sm text-[#D98287]/60 mb-6">
                Nous avons sélectionné quelques hôtels à proximité. Pensez à réserver rapidement.
              </p>
              <div className="flex flex-col gap-4">
                {hebergements.map((h, i) => (
                  <div key={i} className="bg-white rounded-xl p-6">
                    <h4 className="text-base font-medium text-[#E6C771]">{h.nom}</h4>
                    <p className="text-xs text-[#D98287] mt-0.5">{h.distance}</p>
                    <p className="text-base text-[#D98287] mt-2">{h.adresse}</p>
                    <p className="text-base text-[#D98287]">{h.telephone}</p>
                    <a
                      href={h.site}
                      className="inline-block mt-4 text-sm text-[#D98287] hover:text-[#D98287] transition font-medium"
                    >
                      Voir le site →
                    </a>
                  </div>
                ))}
              </div>
            </Accordion>
          </FadeIn>

          {/* Transport */}
          <FadeIn>
            <Accordion question="Comment venir ?">
              <div className="flex flex-col gap-4">
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-base font-medium text-[#E6C771]">En voiture</h4>
                  <p className="text-base text-[#D98287] mt-2 leading-loose">
                    Indications d&apos;accès à compléter. Parking disponible sur place.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-base font-medium text-[#E6C771]">Navette</h4>
                  <p className="text-base text-[#D98287] mt-2 leading-loose">
                    Informations sur les navettes éventuelles à compléter.
                  </p>
                </div>
              </div>
            </Accordion>
          </FadeIn>

          {/* Dress code */}
          <FadeIn>
            <Accordion question="Quelle tenue porter ?">
              <p className="text-base text-[#D98287] leading-loose">
                Tenue de soirée souhaitée. À compléter avec vos préférences (couleurs à éviter, style souhaité, etc.).
              </p>
            </Accordion>
          </FadeIn>

          {/* Contact */}
          <FadeIn>
            <Accordion question="Qui contacter ?">
              <p className="text-base text-[#D98287] mb-4 leading-loose">
                N&apos;hésitez pas à contacter les mariés pour toute question.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:0610324060"
                  className="flex-1 text-center bg-white rounded-xl py-4 px-6 shadow-sm hover:shadow transition"
                >
                  <p className="text-xs text-[#D98287] uppercase tracking-widest mb-1">Yann</p>
                  <p className="text-base font-medium text-[#E6C771]">06.10.32.40.60</p>
                </a>
                <a
                  href="tel:0652808111"
                  className="flex-1 text-center bg-white rounded-xl py-4 px-6 shadow-sm hover:shadow transition"
                >
                  <p className="text-xs text-[#D98287] uppercase tracking-widest mb-1">Judith</p>
                  <p className="text-base font-medium text-[#E6C771]">06.52.80.81.11</p>
                </a>
              </div>
            </Accordion>
          </FadeIn>

        </div>
      </main>
    </>
  )
}
