import PublicHeader from '@/components/PublicHeader'
import FadeIn from '@/components/FadeIn'
import Accordion from '@/components/Accordion'

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
              <p className="text-base text-[#D98287] leading-loose">
                Des lits sont disponibles au manoir, n&apos;hésitez pas à nous contacter si vous en
                avez besoin. Sinon nous pourrons vous fournir des adresses d&apos;hôtels alentours.
                Les tentes sont interdites sur le domaine.
              </p>
            </Accordion>
          </FadeIn>

          {/* Transport */}
          <FadeIn>
            <Accordion question="Comment venir sur place ?">
              <div className="flex flex-col gap-4">
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-base font-medium text-[#E6C771]">En voiture</h4>
                  <p className="text-base text-[#D98287] mt-2 leading-loose">
                    Le manoir dispose d&apos;un grand parking.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-base font-medium text-[#E6C771]">En train</h4>
                  <p className="text-base text-[#D98287] mt-2 leading-loose">
                    Vous arriverez à la gare de Brest. Dans ce cas, veuillez nous contacter le plus
                    tôt possible afin d&apos;organiser des navettes le plus efficacement possible.
                  </p>
                </div>
              </div>
            </Accordion>
          </FadeIn>

          {/* Dress code */}
          <FadeIn>
            <Accordion question="Un dress code ?">
              <p className="text-base text-[#D98287] leading-loose">
                Non, venez avec votre personnalité. Cependant, nous encourageons les militaires à
                venir en tenue pour la cérémonie s&apos;ils le souhaitent.
              </p>
            </Accordion>
          </FadeIn>

          {/* Contact */}
          <FadeIn>
            <Accordion question="Qui contacter ?">
              <p className="text-base text-[#D98287] mb-4 leading-loose">
                N&apos;hésitez pas à contacter les mariés pour toute question.
              </p>

              <p className="text-xs text-[#D98287] uppercase tracking-widest mb-2">Les mariés</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
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

              <p className="text-xs text-[#D98287] uppercase tracking-widest mb-2">Les demoiselles d&apos;honneur</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <a
                  href="tel:0610980940"
                  className="flex-1 text-center bg-white rounded-xl py-4 px-6 shadow-sm hover:shadow transition"
                >
                  <p className="text-xs text-[#D98287] uppercase tracking-widest mb-1">Camille</p>
                  <p className="text-base font-medium text-[#E6C771]">06.10.98.09.40</p>
                </a>
                <a
                  href="tel:0644700871"
                  className="flex-1 text-center bg-white rounded-xl py-4 px-6 shadow-sm hover:shadow transition"
                >
                  <p className="text-xs text-[#D98287] uppercase tracking-widest mb-1">Aude</p>
                  <p className="text-base font-medium text-[#E6C771]">06.44.70.08.71</p>
                </a>
              </div>

              <p className="text-xs text-[#D98287] uppercase tracking-widest mb-2">Les témoins</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:0622343966"
                  className="flex-1 text-center bg-white rounded-xl py-4 px-6 shadow-sm hover:shadow transition"
                >
                  <p className="text-xs text-[#D98287] uppercase tracking-widest mb-1">Mathieu</p>
                  <p className="text-base font-medium text-[#E6C771]">06.22.34.39.66</p>
                </a>
                <a
                  href="tel:0644799562"
                  className="flex-1 text-center bg-white rounded-xl py-4 px-6 shadow-sm hover:shadow transition"
                >
                  <p className="text-xs text-[#D98287] uppercase tracking-widest mb-1">Erwan</p>
                  <p className="text-base font-medium text-[#E6C771]">06.44.79.95.62</p>
                </a>
                <a
                  href="tel:0643626824"
                  className="flex-1 text-center bg-white rounded-xl py-4 px-6 shadow-sm hover:shadow transition"
                >
                  <p className="text-xs text-[#D98287] uppercase tracking-widest mb-1">Nicolas</p>
                  <p className="text-base font-medium text-[#E6C771]">06.43.62.68.24</p>
                </a>
              </div>
            </Accordion>
          </FadeIn>

        </div>
      </main>
    </>
  )
}
