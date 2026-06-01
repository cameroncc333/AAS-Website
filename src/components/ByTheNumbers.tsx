'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const CREAM    = '#F5F1E8'
const CHARCOAL = '#1F1F1F'
const GREEN    = '#3D5A3D'
const TAN      = '#C9B89B'

// Real business health metrics — sourced from AAS Master Tracker v5
const METRICS = [
  {
    value: 54,
    suffix: '',
    label: 'Jobs completed',
    sub: 'Jan 2025 – May 2026',
    decimals: 0,
  },
  {
    value: 15,
    suffix: '+',
    label: 'Cities served',
    sub: 'Atlanta Metro',
    decimals: 0,
  },
  {
    value: 44.50,
    suffix: '',
    prefix: '$',
    label: 'Revenue per man-hour',
    sub: 'Across all services',
    decimals: 2,
  },
  {
    value: 89.8,
    suffix: '%',
    label: 'Q1 YoY revenue growth',
    sub: 'Q1 2025 → Q1 2026',
    decimals: 1,
  },
  {
    value: 25.6,
    suffix: '%',
    label: 'Recurring revenue',
    sub: 'Return or referral clients',
    decimals: 1,
  },
  {
    value: 3000,
    suffix: '',
    prefix: '$',
    label: 'Pro-bono donated',
    sub: 'AAS Cares program',
    decimals: 0,
  },
]

function CountUp({
  target,
  prefix = '',
  suffix = '',
  decimals = 0,
  started,
}: {
  target: number
  prefix?: string
  suffix?: string
  decimals?: number
  started: boolean
}) {
  const [current, setCurrent] = useState(0)
  const frame = useRef<ReturnType<typeof requestAnimationFrame> | null>(null)
  const startTime = useRef<number | null>(null)
  const duration = 1400

  useEffect(() => {
    if (!started) return
    startTime.current = null

    function step(ts: number) {
      if (!startTime.current) startTime.current = ts
      const progress = Math.min((ts - startTime.current) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(eased * target)
      if (progress < 1) frame.current = requestAnimationFrame(step)
    }

    frame.current = requestAnimationFrame(step)
    return () => { if (frame.current) cancelAnimationFrame(frame.current) }
  }, [started, target])

  const display = decimals > 0
    ? current.toFixed(decimals)
    : Math.floor(current).toLocaleString()

  return (
    <span>
      {prefix}{display}{suffix}
    </span>
  )
}

export default function ByTheNumbers() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="by-the-numbers"
      style={{ backgroundColor: CHARCOAL }}
      className="px-6 md:px-14 py-20"
    >
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <p
              className="font-mono text-[9px] uppercase tracking-[0.22em] mb-3"
              style={{ color: TAN }}
            >
              Business health
            </p>
            <h2
              className="font-display font-black leading-[0.92] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: CREAM }}
            >
              By the numbers
            </h2>
          </div>
          <p
            className="font-mono text-[9px] leading-relaxed max-w-xs"
            style={{ color: 'rgba(245,241,232,0.35)' }}
          >
            Sourced from the AAS Master Tracker. Every figure is verified against
            actual job logs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ backgroundColor: 'rgba(245,241,232,0.08)' }}>
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className="flex flex-col gap-2 px-6 py-8"
              style={{ backgroundColor: CHARCOAL }}
            >
              <span
                className="font-mono tabular-nums leading-none"
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  color: i === 3 ? '#6aaf6a' : CREAM,
                  letterSpacing: '-0.02em',
                }}
              >
                <CountUp
                  target={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals}
                  started={inView}
                />
              </span>
              <span
                className="font-mono text-[9px] uppercase tracking-[0.1em]"
                style={{ color: TAN }}
              >
                {m.label}
              </span>
              <span
                className="font-mono text-[8px] leading-snug"
                style={{ color: 'rgba(245,241,232,0.3)' }}
              >
                {m.sub}
              </span>
            </div>
          ))}
        </div>

        <p
          className="font-mono text-[8px] mt-6 leading-relaxed"
          style={{ color: 'rgba(245,241,232,0.2)' }}
        >
          No DCF, no projected multiples. These are operating metrics that reflect
          real business activity — jobs completed, revenue per hour worked, and how
          the business is growing year-over-year.
        </p>

      </div>
    </section>
  )
}
