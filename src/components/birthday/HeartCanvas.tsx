'use client'

import { useEffect, useRef } from 'react'

/**
 * Kanvas ambient: hujan hati & kelopak bunga melayang lembut.
 * Dirender full-screen, fixed, di belakang konten.
 */
export function HeartCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = window.innerWidth
    let height = window.innerHeight
    let raf = 0

    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * DPR
      canvas.height = height * DPR
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const COLORS = [
      [244, 63, 94],   // rose-500
      [251, 113, 133], // rose-400
      [253, 164, 175], // rose-300
      [249, 168, 212], // pink-300
    ]

    type Particle = {
      x: number; y: number
      size: number
      speedY: number
      swayAmp: number
      swaySpeed: number
      phase: number
      rot: number
      rotSpeed: number
      color: [number, number, number]
      alpha: number
      kind: 'heart' | 'petal'
    }

    const rand = (min: number, max: number) => min + Math.random() * (max - min)

    const makeParticle = (startAnywhere = false): Particle => ({
      x: rand(0, width),
      y: startAnywhere ? rand(-height, height) : rand(-80, -20),
      size: rand(6, 16),
      speedY: rand(0.35, 1.1),
      swayAmp: rand(14, 46),
      swaySpeed: rand(0.002, 0.006),
      phase: rand(0, Math.PI * 2),
      rot: rand(0, Math.PI * 2),
      rotSpeed: rand(-0.01, 0.01),
      color: COLORS[Math.floor(Math.random() * COLORS.length)] as [number, number, number],
      alpha: rand(0.25, 0.7),
      kind: Math.random() < 0.62 ? 'heart' : 'petal',
    })

    const COUNT = 30
    const particles: Particle[] = Array.from({ length: COUNT }, () => makeParticle(true))

    const drawHeart = (x: number, y: number, s: number) => {
      ctx.beginPath()
      ctx.moveTo(0, s * 0.32)
      ctx.bezierCurveTo(0, 0, -s * 0.5, 0, -s * 0.5, s * 0.32)
      ctx.bezierCurveTo(-s * 0.5, s * 0.62, -s * 0.12, s * 0.85, 0, s)
      ctx.bezierCurveTo(s * 0.12, s * 0.85, s * 0.5, s * 0.62, s * 0.5, s * 0.32)
      ctx.bezierCurveTo(s * 0.5, 0, 0, 0, 0, s * 0.32)
      ctx.closePath()
      ctx.fill()
    }

    const drawPetal = (x: number, y: number, s: number) => {
      ctx.beginPath()
      ctx.ellipse(0, 0, s * 0.38, s * 0.62, 0, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fill()
    }

    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50)
      last = now
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.y += p.speedY * dt * 0.06 * (reduced ? 0.25 : 1)
        p.phase += p.swaySpeed * dt
        p.rot += p.rotSpeed * dt
        const x = p.x + Math.sin(p.phase) * p.swayAmp

        if (p.y > height + 40) {
          Object.assign(p, makeParticle())
          p.y = rand(-80, -20)
        }

        const [r, g, b] = p.color
        ctx.save()
        ctx.translate(x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`
        if (p.kind === 'heart') drawHeart(0, 0, p.size)
        else drawPetal(0, 0, p.size)
        ctx.restore()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1]"
    />
  )
}
