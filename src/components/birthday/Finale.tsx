'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { birthdayConfig } from '@/lib/birthday-config'
import { heartBurst } from '@/lib/confetti'
import { StarField } from './SparkleTrail'

type FloatingHeart = { id: number; x: number; drift: number; size: number; tone: string }

const TONES = ['#fb7185', '#f43f5e', '#f9a8d4', '#fda4af', '#e11d48']

export function Finale() {
  const [floaters, setFloaters] = useState<FloatingHeart[]>([])
  const [count, setCount] = useState(0)
  const idRef = useRef(0)

  const sendLove = () => {
    setCount((c) => c + 1)
    const batch: FloatingHeart[] = Array.from({ length: 5 }, () => {
      const id = ++idRef.current
      return {
        id,
        x: (Math.random() - 0.5) * 60,
        drift: (Math.random() - 0.5) * 120,
        size: 16 + Math.random() * 20,
        tone: TONES[Math.floor(Math.random() * TONES.length)],
      }
    })
    setFloaters((f) => [...f, ...batch])
    batch.forEach((b) => {
      window.setTimeout(() => {
        setFloaters((f) => f.filter((x) => x.id !== b.id))
      }, 1900)
    })
    heartBurst({ x: 0.5, y: 0.68 }, 18 + count * 2)
  }

  return (
    <section
      id="finale"
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      <StarField />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.16) 0%, transparent 65%)' }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ type: 'spring', stiffness: 160, damping: 14 }}
        className="relative z-10"
      >
        <Heart className="mx-auto h-14 w-14 animate-heartbeat fill-rose-500 text-rose-500 drop-shadow-[0_0_20px_rgba(244,63,94,0.8)]" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-script text-glow relative z-10 mt-6 text-5xl leading-tight text-rose-100 sm:text-7xl"
      >
        Selamat Ulang Tahun,
        <br />
        {birthdayConfig.herName} ❤
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 mx-auto mt-6 max-w-md font-serif italic text-rose-200/85"
      >
        Terima kasih sudah lahir ke dunia dan menemukan aku.
        Semoga tahun ini seindah dirimu.
      </motion.p>

      {/* Tombol kirim cinta + hati melayang */}
      <div className="relative z-10 mt-12 flex flex-col items-center">
        {/* wadah hati melayang */}
        <div aria-hidden className="pointer-events-none absolute bottom-full left-1/2 h-64 w-72 -translate-x-1/2">
          {floaters.map((f) => (
            <motion.span
              key={f.id}
              initial={{ x: f.x, y: 0, opacity: 1, scale: 0.4 }}
              animate={{ x: f.x + f.drift, y: -230, opacity: 0, scale: 1.25, rotate: f.drift > 0 ? 18 : -18 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              className="absolute bottom-0 left-1/2"
              style={{ fontSize: f.size, color: f.tone }}
            >
              ❤
            </motion.span>
          ))}
        </div>

        <motion.button
          type="button"
          onClick={sendLove}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.9 }}
          className="animate-glow-pulse inline-flex min-h-[56px] items-center gap-3 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 px-10 py-4 text-lg font-semibold text-rose-50 shadow-xl transition-shadow"
          aria-label="Kirim cinta"
        >
          <Heart className="h-6 w-6 fill-rose-100" />
          Kirim Cinta
        </motion.button>

        {count > 0 && (
          <motion.p
            key={count}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-4 text-sm tabular-nums text-rose-300/90"
          >
            {count} hati terkirim ke bulan dan kembali ✨
          </motion.p>
        )}
      </div>
    </section>
  )
}
