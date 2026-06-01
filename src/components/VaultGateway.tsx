'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function VaultGateway() {
  const router = useRouter()

  useEffect(() => {
    if (window.location.hash === '#founder') {
      router.push('/vault')
      return
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'F') {
        router.push('/vault')
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [router])

  return null
}
