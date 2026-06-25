import Image from 'next/image'
import PublicHeader from '@/components/PublicHeader'
import Countdown from '@/components/Countdown'

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <main>
        <section className="min-h-[calc(100vh-65px)] flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-white px-4 text-center">
          <div className="w-36 h-36 rounded-full overflow-hidden mb-10 shadow-sm">
            <Image
              src="/optimizedyannjudith.png"
              alt="Yann & Judith"
              width={144}
              height={144}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          <h1 className="text-5xl font-light tracking-wide text-gray-700 mb-2">
            Yann &amp; Judith
          </h1>
          <p className="text-pink-400 text-lg mb-10 tracking-wide">
            Samedi 19 juin 2027
          </p>

          <div className="h-px w-12 bg-pink-200 mb-10" />

          <Countdown />
        </section>
      </main>
    </>
  )
}
