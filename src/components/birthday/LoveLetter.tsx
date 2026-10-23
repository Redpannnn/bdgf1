'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Mail } from 'lucide-react'
import { birthdayConfig } from '@/lib/birthday-config'
import { gentleRain } from '@/lib/confetti'

function useTypewriter(paragraphs: string[], active: boolean, speed = 26) {
  const [output, setOutput] = useState<string[]>([])
  const [done, setDone] = useState(false)
  const skipRef = useRef(false)

  useEffect(() => {
    if (!active) return
    let cancelled = false
    let timer = 0
    let pi = 0
    let ci = 0
    const out: string[] = []

    const step = () => {
      if (cancelled) return
      if (skipRef.current) {
        setOutput([...paragraphs])
        setDone(true)
        return
      }
      const current = paragraphs[pi] ?? ''
      if (ci < current.length) {
        out[pi] = current.slice(0, ci + 1)
        setOutput([...out])
        ci++
        timer = window.setTimeout(step, speed + Math.random() * 34)
      } else {
        pi++
        if (pi >= paragraphs.length) {
          setDone(true)
          return
        }
        ci = 0
        out[pi] = ''
        timer = window.setTimeout(step, 420)
      }
    }
    timer = window.setTimeout(step, 600)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [active, paragraphs, speed])

  const skip = useCallback(() => {
    skipRef.current = true
  }, [])

  return { output, done, skip }
}

export function LoveLetter() {
  const [opened, setOpened] = useState(false)
  const paragraphs = birthdayConfig.letterParagraphs
  const { output, done, skip } = useTypewriter(paragraphs, opened)

  useEffect(() => {
    if (done) gentleRain()
  }, [done])

  return (
    <section id="letter" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="inline-block rounded-full border border-rose-400/30 bg-rose-950/50 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-rose-300"
        >
          Momen Kedua
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-script mt-4 text-5xl text-rose-100 sm:text-6xl"
        >
          Surat Untukmu
        </motion.h2>

        {/* ====== Kertas surat ====== */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-12"
        >
          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.button
                key="closed"
                type="button"
                onClick={() => setOpened(true)}
                aria-label="Buka surat cinta"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92, y: -14, rotate: 2 }}
                transition={{ duration: 0.45 }}
                whileHover={{ scale: 1.03, rotate: 0 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex h-64 w-full max-w-lg cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border border-rose-200/60 bg-gradient-to-br from-rose-50 to-rose-100 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
              >
                {/* pita waslap */}
                <span aria-hidden className="absolute left-1/2 top-0 h-3 w-24 -translate-x-1/2 rounded-b-md bg-rose-300/70" />
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-rose-700 shadow-lg transition-transform group-hover:scale-110">
                  <Mail className="h-7 w-7 text-rose-50" />
                </span>
                <p className="font-script text-4xl text-rose-700">Ada surat dariku...</p>
                <p className="text-xs uppercase tracking-[0.25em] text-rose-400">
                  ketuk untuk membuka
                </p>
              </motion.button>
            ) : (
              <motion.div
                key="opened"
                initial={{ opacity: 0, scale: 0.92, rotate: 1 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto max-w-lg rounded-xl border border-rose-200/70 px-6 py-10 text-left shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] sm:px-10"
                style={{
                  backgroundImage: [
                    'linear-gradient(to bottom, transparent 95%, rgba(244,63,94,0.08) 95%)',
                    'repeating-linear-gradient(to bottom, transparent 0 31px, rgba(244,63,94,0.12) 31px 32px)',
                    'linear-gradient(to bottom right, #fff1f2, #ffe4e6)',
                  ].join(', '),
                }}
              >
                {/* segel hati di pojok */}
                <span className="absolute -top-5 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-rose-700 shadow-lg">
                  <Heart className="h-5 w-5 animate-heartbeat fill-rose-100 text-rose-100" />
                </span>

                <p className="font-script text-3xl text-rose-700 sm:text-4xl">
                  Hi {birthdayConfig.herName},
                </p>

                <div className="mt-6 min-h-[220px] space-y-4" aria-live="polite">
                  {output.map((text, i) => (
                    <p key={i} className="font-serif text-[15px] leading-8 text-rose-900/85 sm:text-base">
                      {text}
                      {i === output.length - 1 && !done && (
                        <span className="ml-0.5 inline-block h-5 w-2.5 animate-pulse rounded-sm bg-rose-500 align-middle" aria-hidden />
                      )}
                    </p>
                  ))}
                </div>

                <AnimatePresence>
                  {done && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                      className="mt-8 text-right"
                    >
                      <p className="font-serif text-sm italic text-rose-500/80">dengan cinta,</p>
                      <p className="font-script text-4xl text-rose-700">{birthdayConfig.yourName}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!done && (
                  <button
                    type="button"
                    onClick={skip}
                    className="mt-6 text-xs uppercase tracking-widest text-rose-400/70 underline-offset-4 transition-colors hover:text-rose-600 hover:underline"
                  >
                    tampilkan semua
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
