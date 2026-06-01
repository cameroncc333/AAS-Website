export type TransitionType = 'fade' | 'wipe'

export interface Sequence {
  id: string
  name: string
  videoSrc: string
  posterSrc: string
  duration: number
  transitionType: TransitionType
}

export const SEQUENCES: Sequence[] = [
  {
    id: 'pressure-wash-wipe',
    name: 'Pressure Wash',
    videoSrc: '/sequences/pressure-wash-wipe.mp4',
    posterSrc: '/sequences/pressure-wash-wipe.svg',
    duration: 8,
    transitionType: 'wipe',
  },
  {
    id: 'detail-pass',
    name: 'Detail Pass',
    videoSrc: '/sequences/detail-pass.mp4',
    posterSrc: '/sequences/detail-pass.svg',
    duration: 7,
    transitionType: 'fade',
  },
  {
    id: 'moving-truck-open',
    name: 'Moving Truck',
    videoSrc: '/sequences/moving-truck-open.mp4',
    posterSrc: '/sequences/moving-truck-open.svg',
    duration: 9,
    transitionType: 'fade',
  },
  {
    id: 'gutter-clear',
    name: 'Gutter Clear',
    videoSrc: '/sequences/gutter-clear.mp4',
    posterSrc: '/sequences/gutter-clear.svg',
    duration: 7,
    transitionType: 'wipe',
  },
  {
    id: 'house-approach',
    name: 'House Approach',
    videoSrc: '/sequences/house-approach.mp4',
    posterSrc: '/sequences/house-approach.svg',
    duration: 10,
    transitionType: 'fade',
  },
]

function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

export function getDailySequence(): Sequence {
  const seed = new Date().toDateString()
  return SEQUENCES[hashString(seed) % SEQUENCES.length]
}
