'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'framer-motion'
import Image from 'next/image'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  // Guards onUpdate — only scrub once loadedmetadata has fired.
  const metaReady  = useRef(false)

  const prefersReducedMotion = useReducedMotion()

  useGSAP(
    () => {
      // Both checks run inside useGSAP (client-only), so window access is safe.
      if (prefersReducedMotion) return
      if (window.innerWidth < 768) return

      console.log('[Hero] useGSAP — creating ScrollTrigger')

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const video = videoRef.current
          if (!video) return
          if (!metaReady.current) {
            console.log('[Hero] onUpdate fired — metaReady still false')
            return
          }
          // Log the first few scrub ticks for diagnostics.
          if (self.progress > 0 && self.progress < 0.03) {
            console.log(
              '[Hero] scrubbing — progress:', self.progress.toFixed(4),
              '| currentTime:', video.currentTime.toFixed(4),
              '| duration:', video.duration.toFixed(4),
            )
          }
          video.currentTime = self.progress * video.duration
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <div ref={sectionRef} className="relative h-[200vh]">
      {/*
       * sticky top-0 pins the viewport-sized container while the outer 200vh
       * section provides the scroll range. ScrollTrigger maps 100vh of dwell
       * time (200vh − 100vh viewport) to video progress 0→1.
       */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Mobile poster (md:hidden) ────────────────────────────────────── */}
        {/* Shown only when the video is CSS-hidden on narrow viewports. */}
        <div className="absolute inset-0 md:hidden">
          <Image
            fill
            src="/videos/hero-poster-end.jpg"
            alt=""
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 75%' }}
          />
        </div>

        {/* ── Scroll-scrubbed video ────────────────────────────────────────── */}
        {/*
         * ALWAYS in the DOM on first render — no isClient / showVideo gate.
         * hidden md:block: CSS-only mobile suppression, zero JS involved.
         * muted + playsInline declared directly on the element (not via ref).
         */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full hidden md:block"
          style={{ objectFit: 'cover', objectPosition: 'center 75%' }}
          muted
          playsInline
          preload="auto"
          poster="/videos/hero-poster-start.jpg"
          onLoadedMetadata={() => {
            metaReady.current = true
            console.log('[Hero] loadedmetadata — duration:', videoRef.current?.duration)
          }}
        >
          {/* webm listed first: Chrome and Firefox pick it up (1 MB vs 1.9 MB) */}
          <source src="/videos/hero-explode.webm" type="video/webm" />
          <source src="/videos/hero-explode.mp4"  type="video/mp4"  />
        </video>

        {/* ── Reduced-motion overlay ───────────────────────────────────────── */}
        {/* If the user prefers reduced motion, show the end-frame poster on top
            of the video (which is in the DOM but not being scrubbed). */}
        {prefersReducedMotion && (
          <div className="absolute inset-0 hidden md:block">
            <Image
              fill
              src="/videos/hero-poster-end.jpg"
              alt=""
              priority
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center 75%' }}
            />
          </div>
        )}

        {/* ── Radial gradient — headline contrast ───────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 0% 100%, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0) 100%)',
          }}
        />

        {/* ── Nav scrim ─────────────────────────────────────────────────────── */}
        <div
          className="absolute inset-x-0 top-0 h-28 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, oklch(10% 0.004 75 / 0.45), transparent)',
          }}
        />

        {/* ── Content overlay ───────────────────────────────────────────────── */}
        <div className="absolute inset-0 flex flex-col justify-between px-6 md:px-10 lg:px-14 py-8 pt-24 pointer-events-none">

          <span
            className="font-mono text-[9px] uppercase tracking-[0.18em]"
            style={{ color: 'oklch(95.5% 0.012 76 / 0.55)' }}
          >
            Est. 2025 — Metro Atlanta
          </span>

          <div className="flex flex-col gap-5 max-w-[88vw] lg:max-w-[72vw] pointer-events-auto">
            <h1
              className="font-display leading-[0.92] tracking-[-0.03em]"
              style={{
                fontSize: 'clamp(3.5rem, 10vw, 9rem)',
                color: '#F5F1E8',
                textShadow: '0 2px 32px rgba(0,0,0,0.4)',
              }}
            >
              <span className="block font-black">Home services,</span>
              <span className="block font-light italic">engineered.</span>
            </h1>

            <p
              className="font-mono text-[10px] uppercase tracking-wider"
              style={{ color: 'rgba(245,241,232,0.70)' }}
            >
              54 JOBS · 15 CITIES · 6 CREW
            </p>

            <a
              href="/quote"
              className="group self-start flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] border px-6 py-3.5 transition-colors duration-300"
              style={{
                color: '#F5F1E8',
                borderColor: 'rgba(245,241,232,0.35)',
              }}
            >
              Get a Quote — Within One Business Day
              <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-[4px]">
                →
              </span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="w-px h-8 animate-pulse"
              style={{ backgroundColor: 'rgba(245,241,232,0.35)' }}
            />
            <span
              className="font-mono text-[8px] uppercase tracking-[0.18em]"
              style={{ color: 'rgba(245,241,232,0.4)' }}
            >
              Scroll
            </span>
          </div>

        </div>

      </div>
    </div>
  )
}
