'use client'

import { type ReactNode } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ScrollTriggerSync() {
  useLenis(ScrollTrigger.update)
  return null
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1 }}>
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  )
}
