'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'framer-motion'
import Nav from '@/components/Nav'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const SERVICES = [
  {
    index:       '01',
    id:          'pressure-washing',
    name:        'Pressure Washing',
    description: 'Concrete, brick, and siding. Every surface deep-cleaned to bare material.',
    specs:       'AVG TURNAROUND 1 DAY · CREW 2 · STARTING $185',
    href:        '/services/pressure-washing',
    // Circle expands from left-center — reads like a spray arc sweeping right
    clipStart:   'circle(0% at 0% 50%)',
    clipEnd:     'circle(150% at 0% 50%)',
  },
  {
    index:       '02',
    id:          'detailing',
    name:        'Detailing',
    description: 'Interior and exterior detail. Showroom finish at your driveway.',
    specs:       'AVG TURNAROUND 4 HRS · CREW 1 · STARTING $149',
    href:        '/services/detailing',
    // Circle expands as center moves from top-left to bottom-right — wiping motion
    clipStart:   'circle(0% at 25% 25%)',
    clipEnd:     'circle(150% at 75% 75%)',
  },
  {
    index:       '03',
    id:          'moving',
    name:        'Moving & Junk Removal',
    description: 'Local moves and full-haul cleanouts. Insured crew. No hidden fees.',
    specs:       'AVG TURNAROUND 1 DAY · CREW 3 · STARTING $299',
    href:        '/services/moving',
    // Polygon wipes upward from bottom — roll-up truck door
    clipStart:   'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
    clipEnd:     'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  },
  {
    index:       '04',
    id:          'landscape',
    name:        'Landscape & Mulch',
    description: 'Beds, borders, and seasonal mulch. Curb appeal, measured by the foot.',
    specs:       'AVG TURNAROUND 1 DAY · CREW 2 · STARTING $225',
    href:        '/services/landscape',
    // Circle expands radially from bottom-left — mulch spreading outward
    clipStart:   'circle(0% at 0% 100%)',
    clipEnd:     'circle(150% at 0% 100%)',
  },
  {
    index:       '05',
    id:          'gutter-window',
    name:        'Gutter & Window',
    description: 'Full gutter clear and window wash. One visit, both done.',
    specs:       'AVG TURNAROUND 3 HRS · CREW 2 · STARTING $165',
    href:        '/services/gutter-window',
    // Polygon wipes downward from top — water sheeting down glass
    clipStart:   'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    clipEnd:     'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  },
]

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const tileRefs     = useRef<(HTMLDivElement | null)[]>([])
  const afterRefs    = useRef<(HTMLDivElement | null)[]>([])
  const prefersReducedMotion = useReducedMotion()

  useGSAP(
    () => {
      afterRefs.current.forEach((afterEl, i) => {
        const tile = tileRefs.current[i]
        if (!afterEl || !tile) return

        if (prefersReducedMotion) {
          // Show the after state fully — no animation
          gsap.set(afterEl, { clipPath: 'none' })
          return
        }

        gsap.fromTo(
          afterEl,
          { clipPath: SERVICES[i].clipStart },
          {
            clipPath: SERVICES[i].clipEnd,
            ease: 'none',
            scrollTrigger: {
              trigger: tile,
              // Start when the tile is 15% into the viewport, complete when
              // the tile's top reaches 15% from the viewport top.
              start: 'top 85%',
              end:   'top 15%',
              scrub: 0.8,
            },
          },
        )
      })
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] },
  )

  return (
    <>
      <Nav lightBg />

      <div
        ref={containerRef}
        style={{ backgroundColor: 'oklch(95.5% 0.012 76)' }}
      >
        {/* ── Page header ─────────────────────────────────────────────────────── */}
        <div className="px-6 md:px-10 lg:px-14 pt-32 pb-20">
          <span
            className="block font-mono text-[9px] uppercase tracking-[0.2em] mb-5"
            style={{ color: 'oklch(14% 0.005 75 / 0.4)' }}
          >
            The Work / Five Services
          </span>
          <h1
            className="font-display leading-[0.88] tracking-[-0.03em]"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              color: 'oklch(14% 0.005 75)',
            }}
          >
            <span className="font-light italic">Engineered</span>
            <span className="font-black"> for residential.</span>
          </h1>
        </div>

        {/* ── Service tiles ────────────────────────────────────────────────────── */}
        <div>
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => { tileRefs.current[i] = el }}
              className="relative h-[80vh] overflow-hidden border-t"
              style={{ borderColor: 'oklch(77% 0.04 72)' }}
            >
              {/* Before image — cream placeholder, image loads on top */}
              <div className="absolute inset-0" style={{ backgroundColor: '#F5F1E8' }}>
                <Image
                  fill
                  alt=""
                  src={`/images/services/service-${service.id}-before.jpg`}
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>

              {/* After image — forest green placeholder, clip-path controls reveal */}
              <div
                ref={(el) => { afterRefs.current[i] = el }}
                className="absolute inset-0"
                style={{
                  backgroundColor: '#3D5A3D',
                  clipPath: prefersReducedMotion ? undefined : SERVICES[i].clipStart,
                }}
              >
                <Image
                  fill
                  alt=""
                  src={`/images/services/service-${service.id}-after.jpg`}
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>

              {/* Bottom scrim — legibility behind the content block */}
              <div
                className="absolute inset-x-0 bottom-0 h-72 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 60%, transparent 100%)',
                }}
              />

              {/* Tile content */}
              <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-10 lg:px-14 py-10 pointer-events-none">
                <div className="flex flex-col gap-3 max-w-lg pointer-events-auto">
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.18em]"
                    style={{ color: 'rgba(245,241,232,0.45)' }}
                  >
                    {service.index}
                  </span>

                  <h2
                    className="font-display font-black leading-[0.92] tracking-[-0.02em]"
                    style={{
                      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                      color: '#F5F1E8',
                    }}
                  >
                    {service.name}
                  </h2>

                  <p
                    className="font-sans text-sm leading-[1.6]"
                    style={{ color: 'rgba(245,241,232,0.72)' }}
                  >
                    {service.description}
                  </p>

                  <span
                    className="font-mono text-[8px] uppercase tracking-[0.15em]"
                    style={{ color: 'rgba(245,241,232,0.45)' }}
                  >
                    {service.specs}
                  </span>

                  <Link
                    href={service.href}
                    className="group self-start flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] mt-1"
                    style={{ color: '#F5F1E8' }}
                  >
                    View Service
                    <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-[4px]">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}
