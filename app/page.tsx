import Image from 'next/image'
import PublicHeader from '@/components/PublicHeader'
import Countdown from '@/components/Countdown'
import RsvpButton from '@/components/RsvpButton'

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <main>
        <section className="relative overflow-hidden min-h-[calc(100vh-65px)] flex flex-col items-center justify-center px-4 text-center">
          <Image
            src="/optimizedyannjudith.png"
            alt="Yann & Judith"
            fill
            sizes="100vw"
            className="object-cover object-[32%_40%]"
            priority
          />
          <div className="absolute inset-0 bg-[#FDF5EA]/75" />

          <div className="relative z-10 flex flex-col items-center">
            <h1
              className="text-5xl sm:text-6xl font-light tracking-wide text-[#B8912B] mb-3 font-serif"
              style={{
                animation: 'fadeInUp 0.8s 0.15s ease-out both',
                textShadow: '0 2px 24px rgba(253,245,234,0.95), 0 1px 8px rgba(253,245,234,0.95)',
              }}
            >
              Yann &amp; Judith
            </h1>
            <p
              className="text-[#D98287] text-lg mb-14 tracking-widest"
              style={{
                animation: 'fadeInUp 0.8s 0.3s ease-out both',
                textShadow: '0 1px 12px rgba(253,245,234,0.9)',
              }}
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
          </div>
        </section>
      </main>
    </>
  )
}
