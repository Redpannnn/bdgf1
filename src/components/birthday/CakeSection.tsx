'use client'

import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Flame, RotateCcw, Wind } from 'lucide-react'
import { heartBurst, grandCelebration } from '@/lib/confetti'

const TOTAL_CANDLES = 3

function Candle({
  lit,
  justBlown,
  onBlow,
  label,
}: {
  lit: boolean
  justBlown: boolean
  onBlow: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onBlow}
      disabled={!lit}
      aria-label={lit ? `Tiup ${label}` : `${label} sudah padam`}
      className="group relative flex flex-col items-center outline-none focus-visible:ring-2 focus-visible:ring-rose-400 rounded-full"
    >
      {/* Api lilin */}
      <span className="relative flex h-9 w-5 items-end justify-center sm:h-12 sm:w-6">
        <AnimatePresence>
          {lit && (
            <motion.span
              key="flame"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-1"
            >
              <span className="animate-flame block h-4 w-2.5 rounded-[50%_50%_50%_50%/62%_62%_38%_38%] bg-gradient-to-b from-amber-200 via-amber-400 to-orange-500 shadow-[0_0_14px_5px_rgba(251,191,36,0.55)] sm:h-5 sm:w-3 sm:shadow-[0_0_16px_6px_rgba(251,191,36,0.55)]" />
            </motion.span>
          )}
          {justBlown && (
            <motion.span
              key="smoke"
              initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
              animate={{ opacity: 0, y: -40, scale: 1.5 }}
              transition={{ duration: 1.3, ease: 'easeOut' }}
              className="absolute bottom-2 h-3 w-3 rounded-full bg-rose-200/60 blur-[3px]"
            />
          )}
        </AnimatePresence>
      </span>

      {/* sumbu */}
      <span className="h-1.5 w-px bg-stone-500" />

      {/* batang lilin bergaris */}
      <span
        className="block h-10 w-3 rounded-full border border-rose-200/60 shadow-inner sm:h-16 sm:w-4"
        style={{ background: 'repeating-linear-gradient(135deg, #fecdd3 0 5px, #fb7185 5px 10px)' }}
      />
    </button>
  )
}

function FrostingDrips({ className }: { className?: string }) {
  return (
    <div className={`absolute -bottom-2 left-0 right-0 flex justify-between px-2 ${className ?? ''}`} aria-hidden>
      {Array.from({ length: 9 }).map((_, i) => (
        <span
          key={i}
          className={`block w-2.5 rounded-b-full bg-rose-50 sm:w-3.5 ${
            i % 2 === 0 ? 'h-3 sm:h-[18px]' : 'h-2 sm:h-[11px]'
          }`}
        />
      ))}
    </div>
  )
}

export function CakeSection() {
  const [lit, setLit] = useState<boolean[]>(Array(TOTAL_CANDLES).fill(true))
  const [justBlown, setJustBlown] = useState<boolean[]>(Array(TOTAL_CANDLES).fill(false))
  const [celebrated, setCelebrated] = useState(false)

  const remaining = lit.filter(Boolean).length

  const blow = useCallback(
    (index: number) => {
      if (!lit[index]) return
      setLit((prev) => prev.map((v, i) => (i === index ? false : v)))
      setJustBlown((prev) => prev.map((v, i) => (i === index ? true : v)))
      window.setTimeout(() => {
        setJustBlown((prev) => prev.map((v, i) => (i === index ? false : v)))
      }, 1400)

      if (lit.filter(Boolean).length === 1) {
        // lilin terakhir
        window.setTimeout(() => {
          grandCelebration()
          setCelebrated(true)
        }, 450)
      } else {
        heartBurst({ x: 0.5, y: 0.55 }, 24)
      }
    },
    [lit]
  )

  const relight = useCallback(() => {
    setLit(Array(TOTAL_CANDLES).fill(true))
    setJustBlown(Array(TOTAL_CANDLES).fill(false))
    setCelebrated(false)
  }, [])

  return (
    <section id="cake" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="inline-block rounded-full border border-rose-400/30 bg-rose-950/50 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-rose-300"
        >
          Momen Pertama
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-script mt-4 text-5xl text-rose-100 sm:text-6xl"
        >
          Tiup Lilinnya, Sayang
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-3 font-serif italic text-rose-200/80"
        >
          Ketuk setiap lilin untuk meniupnya — lalu make a wish ✨
        </motion.p>

        {/* ====== Kue ====== */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-16 w-fit"
        >
          {/* Cahaya lilin */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-10 left-1/2 h-32 w-56 -translate-x-1/2 rounded-full transition-opacity duration-700 sm:h-40 sm:w-72"
            style={{
              background: 'radial-gradient(ellipse, rgba(251,191,36,0.22) 0%, transparent 70%)',
              opacity: remaining > 0 ? 1 : 0,
            }}
          />

          {/* Lilin */}
          <div className="relative z-10 mx-auto flex items-end justify-center gap-5 sm:gap-10">
            {lit.map((isLit, i) => (
              <Candle
                key={i}
                lit={isLit}
                justBlown={justBlown[i]}
                onBlow={() => blow(i)}
                label={`lilin ${i + 1}`}
              />
            ))}
          </div>

          {/* Tingkat atas */}
          <div className="relative z-[5] mx-auto mt-[-4px] h-12 w-36 rounded-t-2xl bg-gradient-to-b from-rose-300 to-rose-400 shadow-lg sm:h-20 sm:w-56">
            <div className="absolute -top-1 left-0 right-0 h-5 rounded-t-2xl bg-rose-50 sm:h-6" />
            <FrostingDrips />
          </div>

          {/* Tingkat tengah */}
          <div className="relative z-[4] mx-auto mt-2 h-16 w-52 rounded-t-2xl bg-gradient-to-b from-rose-400 to-rose-500 shadow-xl sm:h-24 sm:w-80">
            <div className="absolute -top-1 left-0 right-0 h-5 rounded-t-2xl bg-rose-50 sm:h-6" />
            <FrostingDrips />
            {/* taburan sprinkle */}
            <div className="absolute inset-x-6 bottom-4 flex justify-between opacity-70" aria-hidden>
              {['#fda4af', '#fecdd3', '#f9a8d4', '#f43f5e', '#fda4af', '#fecdd3'].map((c, i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
              ))}
            </div>
          </div>

          {/* Tingkat bawah */}
          <div className="relative z-[3] mx-auto mt-2 h-20 w-72 max-w-full rounded-t-2xl bg-gradient-to-b from-rose-500 to-rose-600 shadow-2xl sm:h-28 sm:w-96">
            <div className="absolute -top-1 left-0 right-0 h-5 rounded-t-2xl bg-rose-50 sm:h-6" />
            <FrostingDrips />
          </div>

          {/* Piring */}
          <div className="mx-auto h-3 w-80 max-w-full rounded-[50%] bg-gradient-to-b from-rose-100/90 to-rose-300/90 shadow-[0_18px_40px_-10px_rgba(244,63,94,0.4)] sm:h-4 sm:w-[420px]" />
          <div className="mx-auto mt-1 h-2 w-64 rounded-[50%] bg-rose-950/60 blur-md" aria-hidden />
        </motion.div>

        {/* Status & pesan */}
        <div className="mt-10 flex min-h-[120px] flex-col items-center justify-center gap-4">
          {!celebrated ? (
            <motion.div
              key={`hint-${remaining}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-rose-300"
            >
              <Wind className="h-5 w-5" />
              <span className="font-serif italic sm:text-lg">
                {remaining === TOTAL_CANDLES
                  ? 'Masih ada 3 lilin menyala...'
                  : `${remaining} lilin lagi! Semangat tiupnya 💨`}
              </span>
              <Flame className="h-5 w-5 text-amber-400" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="flex flex-col items-center gap-3"
            >
              <p className="text-gradient-romance font-script text-4xl sm:text-5xl">
                Semoga semua wish-mu terkabul!
              </p>
              <p className="max-w-md font-serif italic text-rose-200/85">
                Tahun ini, tahun depan, dan selamanya — doaku selalu untukmu. ❤
              </p>
              <button
                type="button"
                onClick={relight}
                className="mt-2 inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-950/60 px-5 py-2.5 text-sm text-rose-200 transition-all hover:bg-rose-900/70 hover:shadow-lg active:scale-95"
              >
                <RotateCcw className="h-4 w-4" />
                Nyalakan ulang lilinnya
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
