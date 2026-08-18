import Image from 'next/image'
import PublicHeader from '@/components/PublicHeader'
import Countdown from '@/components/Countdown'
import RsvpButton from '@/components/RsvpButton'

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <main>
        <section className="min-h-[calc(100vh-65px)] flex flex-col items-center justify-center bg-gradient-to-b from-[#FDF5EA] to-[#FDF5EA] px-4 text-center">
          <div
            className="w-56 h-56 rounded-full overflow-hidden mb-14 shadow-sm"
            style={{ animation: 'fadeInUp 0.8s ease-out both' }}
          >
            <Image
              src="/optimizedyannjudith.png"
              alt="Yann & Judith"
              width={224}
              height={224}
              className="object-cover object-[center_40%] w-full h-full"
              priority
            />
          </div>

          <h1
            className="text-5xl sm:text-6xl font-light tracking-wide text-[#E6C771] mb-3 font-serif"
            style={{ animation: 'fadeInUp 0.8s 0.15s ease-out both' }}
          >
            Yann &amp; Judith
          </h1>
          <p
            className="text-[#D98287] text-lg mb-14 tracking-widest"
            style={{ animation: 'fadeInUp 0.8s 0.3s ease-out both' }}
          >
            Samedi 19 juin 2027
          </p>

          <div
            className="h-px w-16 bg-[#D98287]/30 mb-14"
            style={{ animation: 'fadeInUp 0.8s 0.45s ease-out both' }}
          />

          <div style={{ animation: 'fadeInUp 0.8s 0.6s ease-out both' }}>
            <Countdown />
          </div>

          <div className="mt-14">
            <RsvpButton />
          </div>
        </section>
      </main>
    </>
  )
}
