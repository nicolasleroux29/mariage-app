import PublicHeader from '@/components/PublicHeader'

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
    titre: 'Vin d\'honneur',
    description: 'Manoir de Kerleguer — Lieu dit Kerleguer, 29200 Brest',
  },
  {
    heure: '19h00',
    titre: 'Dîner de gala',
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
      <main className="bg-white min-h-screen">

        {/* Hero */}
        <section className="bg-pink-50 py-24 sm:py-32 px-4 text-center">
          <p className="text-pink-400 text-sm uppercase tracking-widest mb-3">Samedi 19 juin 2027</p>
          <h1 className="text-4xl font-light text-gray-700 font-serif">Le Mariage</h1>
        </section>

        <div className="max-w-2xl mx-auto px-4 py-24 flex flex-col gap-24">

          {/* Programme */}
          <section>
            <h2 className="text-xl font-medium text-gray-700 mb-8 font-serif">Programme de la journée</h2>
            <ol className="relative border-l border-pink-100 flex flex-col gap-10 pl-6">
              {programme.map((item, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[25px] w-4 h-4 rounded-full bg-pink-200 border-2 border-white" />
                  <span className="text-xs font-medium text-pink-400 uppercase tracking-widest">{item.heure}</span>
                  <h3 className="text-base font-medium text-gray-700 mt-1">{item.titre}</h3>
                  <p className="text-base text-gray-500 mt-1 leading-relaxed">{item.description}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Lieux */}
          <section>
            <h2 className="text-xl font-medium text-gray-700 mb-6 font-serif">Les lieux</h2>
            <div className="flex flex-col gap-4">
              {lieux.map((lieu, i) => (
                <div key={i} className="bg-pink-50 rounded-2xl p-8">
                  <p className="text-xs text-pink-400 uppercase tracking-widest mb-1">{lieu.type}</p>
                  <h3 className="text-base font-medium text-gray-700">{lieu.nom}</h3>
                  <p className="text-base text-gray-500 mt-2">{lieu.adresse}<br />{lieu.ville}</p>
                  <a
                    href={lieu.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-sm text-pink-400 hover:text-pink-500 transition font-medium"
                  >
                    Ouvrir dans Google Maps →
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-medium text-gray-700 mb-6 font-serif">Pour toutes vos questions</h2>
            <div className="bg-pink-50 rounded-2xl p-8 flex flex-col sm:flex-row gap-4">
              <a
                href="tel:0610324060"
                className="flex-1 text-center bg-white rounded-xl py-4 px-6 shadow-sm hover:shadow transition"
              >
                <p className="text-xs text-pink-400 uppercase tracking-widest mb-1">Yann</p>
                <p className="text-base font-medium text-gray-700">06.10.32.40.60</p>
              </a>
              <a
                href="tel:0652808111"
                className="flex-1 text-center bg-white rounded-xl py-4 px-6 shadow-sm hover:shadow transition"
              >
                <p className="text-xs text-pink-400 uppercase tracking-widest mb-1">Judith</p>
                <p className="text-base font-medium text-gray-700">06.52.80.81.11</p>
              </a>
            </div>
          </section>

        </div>
      </main>
    </>
  )
}
