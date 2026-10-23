'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { birthdayConfig } from '@/lib/birthday-config'

const ROTATIONS = [-3, 2, -2, 3]

export function Gallery() {
  return (
    <section id="memories" className="relative overflow-hidden px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="inline-block rounded-full border border-rose-400/30 bg-rose-950/50 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-rose-300"
          >
            Momen Ketiga
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-script mt-4 text-5xl text-rose-100 sm:text-6xl"
          >
            Kenangan Kita
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-3 font-serif italic text-rose-200/80"
          >
            Setiap detik bersamamu layak digantung di dinding hatiku.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {birthdayConfig.memories.map((mem, i) => (
            <motion.figure
              key={mem.image}
              initial={{ opacity: 0, y: 60, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: ROTATIONS[i % ROTATIONS.length] }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.16, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ rotate: 0, scale: 1.06, zIndex: 10 }}
              className={`group relative mx-auto w-full max-w-[300px] ${
                i === 2 ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              {/* animasi melayang lembut */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.4 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* selotip */}
                <span
                  aria-hidden
                  className="absolute -top-3 left-1/2 z-10 h-7 w-24 -translate-x-1/2 rotate-[-4deg] rounded-sm bg-rose-300/50 shadow-sm backdrop-blur-sm"
                />
                <div className="rounded-md bg-rose-50 p-3 pb-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)] transition-shadow duration-300 group-hover:shadow-[0_30px_70px_-15px_rgba(244,63,94,0.45)]">
                  <div className="relative aspect-square overflow-hidden rounded-sm">
                    <Image
                      src={mem.image}
                      alt={mem.caption}
                      fill
                      sizes="(max-width: 640px) 90vw, 300px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <figcaption className="mt-3 text-center">
                    <p className="font-script text-lg leading-snug text-rose-800 sm:text-xl">{mem.caption}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-rose-400">
                      {mem.date}
                    </p>
                  </figcaption>
                </div>
              </motion.div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
