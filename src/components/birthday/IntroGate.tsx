'use client'

import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MailOpen } from 'lucide-react'
import { birthdayConfig } from '@/lib/birthday-config'
import { StarField } from './SparkleTrail'

type Stage = 'closed' | 'opening'

/**
 * Layar pembuka: amplop tersegel lilin hati.
 * Ketuk segelnya → amplop terbuka → surat naik → onComplete dipanggil.
 */
export function IntroGate({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<Stage>('closed')
  const [flapBack, setFlapBack] = useState(false)
  const [burstHearts] = useState(() =>
    Array.from({ length: 14 }, (_, i) => ({
      angle: (i / 14) * Math.PI * 2,
      dist: 90 + (i % 4) * 26,
      size: 10 + (i % 5) * 5,
      delay: 0.35 + (i % 7) * 0.06,
    }))
  )

  const open = useCallback(() => {
    if (stage !== 'closed') return
    setStage('opening')
    window.setTimeout(() => setFlapBack(true), 420)
    window.setTimeout(() => onComplete(), 2050)
  }, [stage, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,oklch(0.24_0.06_15)_0%,oklch(0.12_0.03_15)_70%)] px-6"
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(6px)' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <StarField />

      {/* Aura cahaya romantis */}
      <motion.div
        aria-hidden
        className="absolute h-[420px] w-[420px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.22) 0%, transparent 65%)' }}
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <p className="relative z-10 mb-10 text-center font-serif text-lg tracking-wide text-rose-200/90 sm:text-xl">
        {birthdayConfig.envelopeHint}
      </p>

      {/* ====== Amplop ====== */}
      <motion.button
        type="button"
        onClick={open}
        aria-label="Buka amplop kejutan"
        className="relative z-10 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-rose-400 rounded-2xl"
        style={{ perspective: 900 }}
        animate={stage === 'closed' ? { y: [0, -10, 0] } : { y: 0 }}
        transition={{ duration: 2.6, repeat: stage === 'closed' ? Infinity : 0, ease: 'easeInOut' }}
        whileHover={stage === 'closed' ? { scale: 1.04 } : undefined}
        whileTap={stage === 'closed' ? { scale: 0.97 } : undefined}
      >
        {/* Ledakan hati saat dibuka */}
        {stage === 'opening' &&
          burstHearts.map((h, i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute left-1/2 top-1/2 z-30 text-rose-400"
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{
                x: Math.cos(h.angle) * h.dist,
                y: Math.sin(h.angle) * h.dist - 30,
                scale: 1,
                opacity: 0,
              }}
              transition={{ duration: 1.15, delay: h.delay, ease: 'easeOut' }}
              style={{ fontSize: h.size }}
            >
              ❤
            </motion.span>
          ))}

        <div className="relative h-[210px] w-[300px] sm:h-[230px] sm:w-[330px]">
          {/* Panel belakang */}
          <div className="absolute inset-0 z-0 rounded-2xl bg-gradient-to-br from-rose-950 via-rose-900 to-rose-950 shadow-[0_25px_60px_-15px_rgba(244,63,94,0.45)]" />

          {/* Surat di dalam */}
          <motion.div
            className="absolute inset-x-4 top-3 z-10 flex h-[85%] flex-col items-center justify-center rounded-lg bg-gradient-to-br from-rose-50 to-rose-100 shadow-lg"
            animate={stage === 'opening' ? { y: -78, scale: 1.04 } : { y: 0 }}
            transition={{ delay: 0.75, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Heart className="mb-1 h-5 w-5 animate-heartbeat fill-rose-500 text-rose-500" />
            <p className="font-script text-3xl text-rose-700">Untukmu, {birthdayConfig.herName}</p>
            <p className="mt-1 font-serif text-[11px] italic tracking-widest text-rose-400 uppercase">
              dari {birthdayConfig.yourName}, dengan cinta
            </p>
          </motion.div>

          {/* Kantong depan (bentuk V) */}
          <div
            className="absolute inset-0 z-20 rounded-2xl bg-gradient-to-b from-rose-800 to-rose-900"
            style={{ clipPath: 'polygon(0 0, 50% 42%, 100% 0, 100% 100%, 0 100%)' }}
          />

          {/* Tutup amplop (flap) */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[58%]"
            style={{
              transformOrigin: 'top center',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              zIndex: flapBack ? 5 : 30,
              backfaceVisibility: 'hidden',
            }}
            animate={stage === 'opening' ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            <div className="h-full w-full bg-gradient-to-b from-rose-700 to-rose-600 shadow-md" />
          </motion.div>

          {/* Segel lilin hati */}
          <motion.div
            className="absolute left-1/2 top-[52%] z-40 -translate-x-1/2 -translate-y-1/2"
            animate={stage === 'opening' ? { scale: 0, opacity: 0, rotate: -30 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: 'easeIn' }}
          >
            <div className="animate-glow-pulse flex h-16 w-16 items-center justify-center rounded-full border-2 border-rose-300/40 bg-gradient-to-br from-rose-500 to-rose-700 shadow-xl sm:h-[72px] sm:w-[72px]">
              <Heart className="h-7 w-7 animate-heartbeat fill-rose-100 text-rose-100" />
            </div>
          </motion.div>
        </div>
      </motion.button>

      {/* Petunjuk */}
      <motion.div
        className="relative z-10 mt-10 flex items-center gap-2 text-rose-300/80"
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <MailOpen className="h-4 w-4" />
        <span className="text-sm tracking-wider">
          {stage === 'closed' ? 'Ketuk amplopnya untuk membuka' : 'Membuka kejutanmu...'}
        </span>
      </motion.div>
    </motion.div>
  )
}
