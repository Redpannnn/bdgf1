'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Heart, Sparkles } from 'lucide-react'
import { birthdayConfig } from '@/lib/birthday-config'
import { StarField } from './SparkleTrail'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
}
const wordAnim = {
  hidden: { opacity: 0, y: 34, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
}

function TimeCounter() {
  const [elapsed, setElapsed] = useState<{ d: number; h: number; m: number; s: number } | null>(null)

  useEffect(() => {
    const start = new Date(`${birthdayConfig.anniversaryDate}T00:00:00`).getTime()
    const update = () => {
      const diff = Math.max(0, Date.now() - start)
      setElapsed({
        d: Math.floor(diff / 86_400_000),
        h: Math.floor((diff % 86_400_000) / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1000),
      })
    }
    update()
    const id = window.setInterval(update, 1000)
    return () => window.clearInterval(id)
  }, [])

  const items = [
    { value: elapsed?.d, label: 'hari' },
    { value: elapsed?.h, label: 'jam' },
    { value: elapsed?.m, label: 'menit' },
    { value: elapsed?.s, label: 'detik' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.7, duration: 0.8 }}
      className="mx-auto mt-10 w-fit rounded-2xl border border-rose-400/20 bg-rose-950/40 px-5 py-4 backdrop-blur-md sm:px-8"
    >
      <p className="mb-2 text-center text-[11px] uppercase tracking-[0.25em] text-rose-300/70">
        Kita sudah bersama selama
      </p>
      <div className="flex items-end justify-center gap-3 sm:gap-6" aria-label="Penghitung waktu bersama">
        {items.map((it, i) => (
          <div key={it.label} className="flex items-end gap-3 sm:gap-6">
            <div className="text-center">
              <div className="min-w-[2.4rem] font-serif text-2xl font-bold text-rose-100 tabular-nums sm:min-w-[3.2rem] sm:text-4xl">
                {it.value ?? '–'}
              </div>
              <div className="mt-0.5 text-[10px] uppercase tracking-widest text-rose-400/80 sm:text-xs">
                {it.label}
              </div>
            </div>
            {i < items.length - 1 && <Heart className="mb-4 h-3 w-3 fill-rose-500/70 text-rose-500/70" />}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export function Hero() {
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 600], [0, 140])
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0])

  const titleWords = ['Selamat', 'Ulang', 'Tahun']
  const nameLetters = birthdayConfig.herName.split('')

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20"
    >
      <StarField />

      {/* Aura gradient romantis */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.18) 0%, rgba(190,24,93,0.08) 45%, transparent 70%)' }}
      />

      {/* Cincin hati berputar di belakang judul */}
      <div aria-hidden className="animate-slow-spin pointer-events-none absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 opacity-30">
        <div className="relative h-[340px] w-[340px] sm:h-[440px] sm:w-[440px]">
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <Heart
              key={deg}
              className="absolute left-1/2 top-1/2 h-5 w-5 fill-rose-400/60 text-rose-400/60"
              style={{
                transform: `rotate(${deg}deg) translateY(-190px) rotate(-${deg}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-rose-400/30 bg-rose-950/50 px-4 py-1.5 text-xs tracking-widest text-rose-300 uppercase backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Hari spesial untuk orang spesial
          <Sparkles className="h-3.5 w-3.5" />
        </motion.div>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-script text-glow text-6xl leading-tight text-rose-100 sm:text-8xl lg:text-9xl"
          aria-label="Selamat Ulang Tahun"
        >
          {titleWords.map((w) => (
            <motion.span key={w} variants={wordAnim} className="mr-[0.28em] inline-block">
              {w}
            </motion.span>
          ))}
        </motion.h1>

        {/* Nama — muncul per huruf */}
        <motion.p
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 1.1 } } }}
          className="text-gradient-romance mt-4 font-serif text-3xl font-bold sm:text-5xl"
          aria-label={birthdayConfig.herName}
        >
          {nameLetters.map((ch, i) => (
            <motion.span
              key={`${ch}-${i}`}
              variants={{
                hidden: { opacity: 0, scale: 0.3, y: 20 },
                show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 16 } },
              }}
              className="inline-block"
            >
              {ch === ' ' ? '\u00A0' : ch}
            </motion.span>
          ))}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mx-auto mt-6 max-w-md font-serif text-base italic text-rose-200/80 sm:text-lg"
        >
          &ldquo;Di hari istimewamu, izinkan aku merayakan hal yang paling kusyukuri:
          keberadaanmu di hidupku.&rdquo;
        </motion.p>

        <TimeCounter />
      </motion.div>

      {/* Indikator scroll */}
      <motion.a
        href="#cake"
        aria-label="Gulir ke bawah"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-1 text-rose-300/70 transition-colors hover:text-rose-200"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">gulir</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="h-6 w-6" />
        </motion.span>
      </motion.a>
    </section>
  )
}
