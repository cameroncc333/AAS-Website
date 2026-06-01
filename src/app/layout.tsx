import type { Metadata } from 'next'
import { Fraunces, Geist, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'
import VaultGateway from '@/components/VaultGateway'

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'All Around Services — Home services, engineered.',
  description:
    'A residential services company built on operational rigor. Real pricing math. Real crews. Real numbers, in public.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geist.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <LenisProvider>
          <VaultGateway />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
