import Image from 'next/image'
import PublicHeader from '@/components/PublicHeader'
import Countdown from '@/components/Countdown'

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <main>
        <section className="min-h-[calc(100vh-65px)] flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-white px-4 text-center">
          <div className="w-56 h-56 rounded-full overflow-hidden mb-14 shadow-sm">
            <Image
              src="/optimizedyannjudith.png"
              alt="Yann & Judith"
              width={224}
              height={224}
              className="object-cover object-[center_40%] w-full h-full"
              priority
            />
          </div>

          <h1 className="text-5xl sm:text-6xl font-light tracking-wide text-gray-700 mb-3 font-serif">
            Yann &amp; Judith
          </h1>
          <p className="text-pink-400 text-lg mb-14 tracking-widest">
            Samedi 19 juin 2027
          </p>

          <div className="h-px w-16 bg-pink-200 mb-14" />

          <Countdown />
        </section>
      </main>
    </>
  )
}
