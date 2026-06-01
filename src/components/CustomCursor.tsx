'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setMounted(true)
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true)
      return
    }

    const cursor = cursorRef.current
    if (!cursor) return

    let rafId: number
    let mouseX = -100
    let mouseY = -100
    let curX = -100
    let curY = -100

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onEnter = () => cursor.setAttribute('data-hover', 'true')
    const onLeave = () => cursor.removeAttribute('data-hover')

    const attachInteractives = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    const tick = () => {
      curX += (mouseX - curX) * 0.15
      curY += (mouseY - curY) * 0.15
      cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMouseMove)
    rafId = requestAnimationFrame(tick)
    attachInteractives()

    const observer = new MutationObserver(attachInteractives)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  if (!mounted || isTouch) return null

  return (
    <div
      ref={cursorRef}
      className="
        fixed top-0 left-0 z-[9999] pointer-events-none
        rounded-full mix-blend-difference
        transition-[width,height] duration-200 ease-out
        [&[data-hover]]:w-12 [&[data-hover]]:h-12
      "
      style={{
        width: 12,
        height: 12,
        backgroundColor: 'oklch(14% 0.005 75)',
        willChange: 'transform',
      }}
    />
  )
}
