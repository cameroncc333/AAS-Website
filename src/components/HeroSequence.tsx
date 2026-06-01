'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useReducedMotion } from 'framer-motion'
import { getDailySequence } from '@/lib/sequences'

gsap.registerPlugin(useGSAP)

const sequence = getDailySequence()

export default function HeroSequence() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const videoRef      = useRef<HTMLVideoElement>(null)
  const contentRef    = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [videoEnded, setVideoEnded] = useState(false)

  useGSAP(
    () => {
      const content = contentRef.current
      if (!content) return

      if (prefersReducedMotion) {
        gsap.set(content, { opacity: 1, y: 0 })
        return
      }

      gsap.set(content, { opacity: 0, y: 12 })

      const video = videoRef.current
      if (!video) {
        gsap.to(content, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        return
      }

      const revealAt = sequence.duration * 0.8

      const timer = setTimeout(() => {
        gsap.to(content, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
        })
      }, revealAt * 1000)

      return () => clearTimeout(timer)
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] },
  )

  function handleVideoEnded() {
    setVideoEnded(true)
    const video = videoRef.current
    if (!video || prefersReducedMotion) return
    gsap.to(video, { scale: 1.05, duration: 20, ease: 'power1.out' })
  }

  return (
    <div ref={containerRef} className="relative h-[110vh] overflow-hidden">

      {/* Video / poster layer */}
      {prefersReducedMotion ? (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              160deg,
              oklch(18%  0.008 78) 0%,
              oklch(26%  0.015 90) 45%,
              oklch(20%  0.010 80) 100%
            )`,
          }}
        />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={sequence.videoSrc}
          poster={sequence.posterSrc}
          muted
          autoPlay
          playsInline
          onEnded={handleVideoEnded}
        />
      )}

      {/* Fallback: when video not yet loaded or ended, show poster bg */}
      {!prefersReducedMotion && !videoEnded && (
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(
              160deg,
              oklch(18%  0.008 78) 0%,
              oklch(26%  0.015 90) 45%,
              oklch(20%  0.010 80) 100%
            )`,
          }}
        />
      )}

      {/* Dark scrim */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, oklch(10% 0.004 75 / 0.4) 0%, transparent 40%, oklch(10% 0.004 75 / 0.45) 100%)',
        }}
      />

      {/* Nav scrim */}
      <div
        className="absolute inset-x-0 top-0 h-28 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, oklch(10% 0.004 75 / 0.35), transparent)',
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col justify-between px-6 md:px-10 lg:px-14 py-8 pt-24"
      >
        <span
          className="font-mono text-[9px] uppercase tracking-[0.18em]"
          style={{ color: 'oklch(95.5% 0.012 76 / 0.55)' }}
        >
          Est. 2025 — Metro Atlanta
        </span>

        <div className="flex flex-col gap-6 max-w-[88vw] lg:max-w-[72vw]">
          <h1
            className="font-display leading-[0.92] tracking-[-0.03em]"
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 9rem)',
              color: 'oklch(95.5% 0.012 76)',
            }}
          >
            <span className="block font-black">Home services,</span>
            <span className="block font-light italic">engineered.</span>
          </h1>

          <p
            className="font-mono text-[10px] uppercase tracking-wider"
            style={{ color: 'oklch(95.5% 0.012 76 / 0.70)' }}
          >
            44 JOBS · 15 CITIES · 6 CREW
          </p>

          <a
            href="#estimate"
            className="group self-start flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] border px-6 py-3.5"
            style={{
              color: 'oklch(95.5% 0.012 76)',
              borderColor: 'oklch(95.5% 0.012 76 / 0.35)',
            }}
          >
            Get an instant estimate
            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-[4px]">
              →
            </span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="w-px h-8 animate-pulse"
            style={{ backgroundColor: 'oklch(95.5% 0.012 76 / 0.35)' }}
          />
          <span
            className="font-mono text-[8px] uppercase tracking-[0.18em]"
            style={{ color: 'oklch(95.5% 0.012 76 / 0.4)' }}
          >
            Scroll
          </span>
        </div>
      </div>

    </div>
  )
}
