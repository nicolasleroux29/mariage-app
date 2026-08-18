import PublicHeader from '@/components/PublicHeader'
import FadeIn from '@/components/FadeIn'

const programme = [
  {
    heure: '14h15',
    titre: 'Accueil des invités',
    description: 'Église St Tugdual — Rue du Bourg, 29830 St-Pabu',
  },
  {
    heure: '14h30',
    titre: 'Cérémonie religieuse',
    description: 'Église St Tugdual — Rue du Bourg, 29830 St-Pabu',
  },
  {
    heure: '17h30',
    titre: "Vin d'honneur",
    description: 'Manoir de Kerleguer — Lieu dit Kerleguer, 29200 Brest',
  },
  {
    heure: '19h00',
    titre: 'Dîner',
    description: 'Ouverture du bal et soirée — Manoir de Kerleguer',
  },
  {
    heure: '12h00',
    titre: 'Retour de noce',
    description: 'Dimanche 20 juin — Manoir de Kerleguer, Lieu dit Kerleguer, 29200 Brest',
  },
]

const lieux = [
  {
    nom: 'Église St Tugdual',
    type: 'Cérémonie religieuse — 14h30',
    adresse: 'Rue du Bourg',
    ville: '29830 St-Pabu',
    mapsUrl: 'https://maps.app.goo.gl/3fsxNMAj4qx3ysLQ7',
  },
  {
    nom: 'Manoir de Kerleguer',
    type: "Vin d'honneur & Dîner — 17h30",
    adresse: 'Lieu dit Kerleguer',
    ville: '29200 Brest',
    mapsUrl: 'https://maps.app.goo.gl/yRxfToDrkJFdvZy77',
  },
]

export default function MariagePage() {
  return (
    <>
      <PublicHeader />
      <main className="bg-[#FDF5EA] min-h-screen">

        {/* Hero */}
        <section className="bg-[#FDF5EA] py-24 sm:py-32 px-4 text-center">
          <p className="text-[#D98287] text-sm uppercase tracking-widest mb-3">Samedi 19 juin 2027</p>
          <h1 className="text-4xl font-light text-[#E6C771] font-serif">Le Mariage</h1>
        </section>

        <div className="max-w-2xl mx-auto px-4 py-24 flex flex-col gap-24">

          {/* Programme */}
          <FadeIn>
            <section>
              <h2 className="text-xl font-medium text-[#E6C771] mb-8 font-serif">Programme de la journée</h2>
              <ol className="relative border-l border-[#D98287]/20 flex flex-col gap-10 pl-6">
                {programme.map((item, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[25px] w-4 h-4 rounded-full bg-[#D98287]/20 border-2 border-[#FDF5EA]" />
                    <span className="text-xs font-medium text-[#D98287] uppercase tracking-widest">{item.heure}</span>
                    <h3 className="text-base font-medium text-[#E6C771] mt-1">{item.titre}</h3>
                    <p className="text-base text-[#D98287] mt-1 leading-relaxed">{item.description}</p>
                  </li>
                ))}
              </ol>
            </section>
          </FadeIn>

          {/* Lieux */}
          <FadeIn>
            <section>
              <h2 className="text-xl font-medium text-[#E6C771] mb-6 font-serif">Les lieux</h2>
              <div className="flex flex-col gap-4">
                {lieux.map((lieu, i) => (
                  <div key={i} className="bg-white rounded-xl p-8">
                    <div className="w-full h-40 rounded-lg bg-[#D98287]/10 border border-dashed border-[#D98287]/40 flex items-center justify-center mb-5">
                      <span className="text-xs text-[#D98287]/60 uppercase tracking-widest">Photo à venir</span>
                    </div>
                    <p className="text-xs text-[#D98287] uppercase tracking-widest mb-1">{lieu.type}</p>
                    <h3 className="text-base font-medium text-[#E6C771]">{lieu.nom}</h3>
                    <p className="text-base text-[#D98287] mt-2">{lieu.adresse}<br />{lieu.ville}</p>
                    <a
                      href={lieu.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-sm text-[#D98287] hover:text-[#D98287] transition font-medium"
                    >
                      Ouvrir dans Google Maps →
                    </a>
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
