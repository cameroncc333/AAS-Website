'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'

const NAV_LINKS = [
  { label: 'Services',          href: '/services' },
  { label: 'Work',              href: '/work'     },
  { label: 'About',             href: '/about'    },
  { label: 'Locations / Quote', href: '/quote'    },
  { label: 'Pricing / FAQ',     href: '/pricing'  },
]

type NavProps = {
  // On light-background pages (anything except the dark hero), force the nav
  // into its "scrolled" state from mount: cream bg visible, charcoal text.
  lightBg?: boolean
}

export default function Nav({ lightBg = false }: NavProps) {
  const { scrollY } = useScroll()

  // Light-bg pages: background is always fully opaque.
  const bgOpacity = useTransform(
    scrollY,
    lightBg ? [0, 0] : [0, 100],
    lightBg ? [1, 1] : [0, 1],
  )

  const [scrolled, setScrolled] = useState(lightBg)

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(lightBg || v > 60)
  })

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16">
      <motion.div
        className="absolute inset-0 border-b"
        style={{
          opacity: bgOpacity,
          backgroundColor: 'oklch(95.5% 0.012 76)',
          borderColor: 'oklch(77% 0.04 72)',
        }}
      />

      <div className="relative h-full flex items-center px-6 lg:px-10">
        {/* Wordmark */}
        <Link href="/" className="flex items-baseline gap-2.5 shrink-0">
          <span
            className="font-display font-black text-xl leading-none tracking-[-0.03em]"
            style={{ color: 'oklch(37% 0.07 142)' }}
          >
            AAS
          </span>
          <span
            className="font-mono text-[9px] uppercase tracking-[0.1em] hidden sm:block transition-colors duration-300"
            style={{
              color: scrolled
                ? 'oklch(14% 0.005 75 / 0.6)'
                : 'oklch(95.5% 0.012 76 / 0.7)',
            }}
          >
            All Around Services
          </span>
        </Link>

        {/* Center links */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-300"
              style={{
                color: scrolled
                  ? 'oklch(14% 0.005 75 / 0.6)'
                  : 'oklch(95.5% 0.012 76 / 0.7)',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/quote"
          className="group ml-auto flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.12em]"
          style={{ color: 'oklch(37% 0.07 142)' }}
        >
          Get a Quote
          <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-[4px]">
            →
          </span>
        </Link>
      </div>
    </header>
  )
}
