'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Sparkle = { id: number; x: number; y: number; size: number; hue: number }

/**
 * Kilau kecil yang muncul & memudar mengikuti kursor (hanya perangkat pointer halus).
 */
export function SparkleTrail() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const lastSpawn = useRef(0)
  const idRef = useRef(0)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const onMove = (e: PointerEvent) => {
      const now = performance.now()
      if (now - lastSpawn.current < 55) return
      lastSpawn.current = now
      const id = ++idRef.current
      const sparkle: Sparkle = {
        id,
        x: e.clientX + (Math.random() - 0.5) * 14,
        y: e.clientY + (Math.random() - 0.5) * 14,
        size: 4 + Math.random() * 7,
        hue: Math.random() < 0.5 ? 350 : 340,
      }
      setSparkles((s) => [...s.slice(-22), sparkle])
      window.setTimeout(() => {
        setSparkles((s) => s.filter((p) => p.id !== id))
      }, 750)
    }

    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]">
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.span
            key={s.id}
            initial={{ opacity: 0.9, scale: 0.4 }}
            animate={{ opacity: 0, scale: 1.25, y: -18 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.72, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              left: s.x - s.size / 2,
              top: s.y - s.size / 2,
              width: s.size,
              height: s.size,
              borderRadius: '50%',
              background: `radial-gradient(circle, hsl(${s.hue} 95% 78%) 0%, hsl(${s.hue} 90% 65% / 0.6) 55%, transparent 72%)`,
              boxShadow: `0 0 ${s.size * 2.2}px hsl(${s.hue} 95% 70% / 0.8)`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

/**
 * Bintang-bintang kecil berkelip untuk latar malam yang romantis.
 * Memakai seeded PRNG agar posisi identik di server & client (aman dari hydration mismatch).
 */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const STARS = (() => {
  const rand = mulberry32(20240214)
  return Array.from({ length: 70 }, (_, i) => ({
    id: i,
    top: `${(rand() * 100).toFixed(2)}%`,
    left: `${(rand() * 100).toFixed(2)}%`,
    size: 1 + rand() * 2.4,
    delay: rand() * 4,
    duration: 2.2 + rand() * 3,
  }))
})()

export function StarField() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {STARS.map((s) => (
        <span
          key={s.id}
          className="animate-twinkle absolute rounded-full bg-rose-200"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: '0 0 6px rgba(253,164,175,0.9)',
          }}
        />
      ))}
    </div>
  )
}
