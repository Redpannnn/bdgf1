import confetti from 'canvas-confetti'

let heartShape: confetti.Shape | null = null

function getHeartShape(): confetti.Shape {
  if (!heartShape) {
    heartShape = confetti.shapeFromText({ text: '❤', scalar: 2 })
  }
  return heartShape
}

const ROMANCE_COLORS = ['#fb7185', '#f43f5e', '#fda4af', '#f9a8d4', '#fecdd3']

/** Ledakan hati dari satu titik. */
export function heartBurst(origin = { x: 0.5, y: 0.6 }, particleCount = 70) {
  const shape = getHeartShape()
  confetti({
    particles: particleCount,
    shapes: [shape],
    scalar: 1.6,
    spread: 100,
    startVelocity: 38,
    origin,
    ticks: 220,
    gravity: 0.9,
    decay: 0.92,
    zIndex: 90,
    disableForReducedMotion: true,
  })
}

/** Perayaan besar: meriam dari dua sisi + hujan hati di tengah. */
export function grandCelebration() {
  const shape = getHeartShape()
  const end = Date.now() + 1600

  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.7 },
      shapes: [shape],
      scalar: 1.5,
      colors: ROMANCE_COLORS,
      zIndex: 90,
      disableForReducedMotion: true,
    })
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.7 },
      shapes: [shape],
      scalar: 1.5,
      colors: ROMANCE_COLORS,
      zIndex: 90,
      disableForReducedMotion: true,
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()

  heartBurst({ x: 0.5, y: 0.45 }, 90)
  window.setTimeout(() => heartBurst({ x: 0.3, y: 0.5 }, 45), 350)
  window.setTimeout(() => heartBurst({ x: 0.7, y: 0.5 }, 45), 600)
}

/** Hujan hati lembut untuk momen kecil. */
export function gentleRain() {
  const shape = getHeartShape()
  confetti({
    particleCount: 36,
    spread: 130,
    startVelocity: 26,
    origin: { x: 0.5, y: 0.35 },
    shapes: [shape],
    scalar: 1.3,
    ticks: 260,
    gravity: 0.55,
    zIndex: 90,
    disableForReducedMotion: true,
  })
}
