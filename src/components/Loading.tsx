'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loading() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const DURATION = 1500
    const start = performance.now()

    const tick = (now: number) => {
      const p = Math.min(100, Math.floor(((now - start) / DURATION) * 100))
      setProgress(p)
      if (p < 100) {
        requestAnimationFrame(tick)
      } else {
        setTimeout(() => setVisible(false), 250)
      }
    }

    requestAnimationFrame(tick)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center"
          style={{ backgroundColor: 'oklch(37% 0.07 142)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-1"
          >
            <span
              className="font-display font-black text-6xl tracking-[-0.04em] leading-none"
              style={{ color: 'oklch(95.5% 0.012 76)' }}
            >
              AAS
            </span>
            <span
              className="font-mono text-[9px] uppercase tracking-[0.15em]"
              style={{ color: 'oklch(95.5% 0.012 76 / 0.5)' }}
            >
              All Around Services
            </span>
          </motion.div>

          <div
            className="absolute bottom-10 right-10 font-mono text-sm tabular-nums"
            style={{ color: 'oklch(95.5% 0.012 76 / 0.7)' }}
          >
            {String(progress).padStart(3, '0')}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
