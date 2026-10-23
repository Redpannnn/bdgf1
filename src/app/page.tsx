'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import { birthdayConfig } from '@/lib/birthday-config'
import { heartBurst } from '@/lib/confetti'
import { HeartCanvas } from '@/components/birthday/HeartCanvas'
import { SparkleTrail } from '@/components/birthday/SparkleTrail'
import { IntroGate } from '@/components/birthday/IntroGate'
import { Hero } from '@/components/birthday/Hero'
import { CakeSection } from '@/components/birthday/CakeSection'
import { LoveLetter } from '@/components/birthday/LoveLetter'
import { Gallery } from '@/components/birthday/Gallery'
import { Finale } from '@/components/birthday/Finale'

function SectionDivider() {
  return (
    <div aria-hidden className="relative z-10 mx-auto flex w-full max-w-xs items-center gap-3 px-6">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-rose-400/40" />
      <Heart className="h-3.5 w-3.5 fill-rose-500/60 text-rose-500/60" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-rose-400/40" />
    </div>
  )
}

export default function Page() {
  const [opened, setOpened] = useState(false)

  // Kunci scroll selama layar amplop terbuka
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [opened])

  const handleOpen = useCallback(() => {
    setOpened(true)
    window.setTimeout(() => heartBurst({ x: 0.5, y: 0.4 }, 60), 250)
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      {/* Ambient: hujan hati + jejak kilau kursor */}
      <HeartCanvas />
      <SparkleTrail />

      <AnimatePresence>
        {!opened && <IntroGate key="gate" onComplete={handleOpen} />}
      </AnimatePresence>

      {opened && (
        <main className="relative z-10 flex-1">
          <Hero />
          <SectionDivider />
          <CakeSection />
          <SectionDivider />
          <LoveLetter />
          <SectionDivider />
          <Gallery />
          <Finale />
        </main>
      )}

      {opened && (
        <footer
          className="relative z-10 mt-auto border-t border-rose-400/10 bg-rose-950/40 py-6 text-center backdrop-blur"
          style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
        >
          <p className="flex items-center justify-center gap-1.5 px-4 text-xs tracking-wide text-rose-300/70">
            Dibuat dengan
            <Heart className="h-3.5 w-3.5 animate-heartbeat fill-rose-500 text-rose-500" aria-hidden />
            oleh {birthdayConfig.yourName} · khusus untuk {birthdayConfig.herName}
          </p>
        </footer>
      )}
    </div>
  )
}
