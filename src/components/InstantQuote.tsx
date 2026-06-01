'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SERVICE_PARAMS,
  estimateDistanceMiles,
  computeQuote,
} from '@/lib/pricingConfig'

const CREAM   = '#F5F1E8'
const CHARCOAL = '#1F1F1F'
const GREEN   = '#3D5A3D'
const TAN     = '#C9B89B'
const CORAL   = '#E8826E'

const SERVICES = Object.entries(SERVICE_PARAMS).map(([key, p]) => ({
  key,
  label: p.label,
}))

export default function InstantQuote() {
  const [service, setService]   = useState('')
  const [size,    setSize]      = useState<number | ''>('')
  const [zip,     setZip]       = useState('')
  const [result,  setResult]    = useState<{
    good: number; better: number; best: number; directCost: number; margin: number
  } | null>(null)
  const [error, setError]       = useState('')

  const params = service ? SERVICE_PARAMS[service] : null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!service) { setError('Select a service.'); return }
    if (size === '' || size < (params?.inputMin ?? 0)) {
      setError(`Enter a valid ${params?.inputLabel ?? 'size'}.`); return
    }
    if (!/^\d{5}$/.test(zip)) { setError('Enter a 5-digit zip code.'); return }

    try {
      const dist = estimateDistanceMiles(zip)
      const quote = computeQuote(service, Number(size), dist)
      setResult(quote)
    } catch {
      setError('Could not compute quote. Try again.')
    }
  }

  function handleLock() {
    if (!result || !params) return
    const qs = new URLSearchParams({
      service: params.label,
      size: `${size} ${params.inputUnit}`,
      zip,
      range: `$${result.good}–$${result.best}`,
    })
    window.location.href = `/quote?${qs.toString()}`
  }

  return (
    <section
      id="instant-quote"
      style={{ backgroundColor: CREAM, borderTop: `1px solid ${TAN}` }}
      className="px-6 md:px-14 py-20"
    >
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <p
          className="font-mono text-[9px] uppercase tracking-[0.22em] mb-3"
          style={{ color: GREEN }}
        >
          Instant Estimate
        </p>
        <h2
          className="font-display font-black leading-[0.92] tracking-[-0.04em] mb-2"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: CHARCOAL }}
        >
          What will it cost?
        </h2>
        <p
          className="font-sans text-sm leading-relaxed mb-10"
          style={{ color: 'rgba(31,31,31,0.55)' }}
        >
          Real pricing from our cost model — not a ballpark. Good / Better / Best
          tier range based on scope and distance.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Service selector */}
          <div className="flex flex-col gap-1.5">
            <label
              className="font-mono text-[9px] uppercase tracking-[0.14em]"
              style={{ color: 'rgba(31,31,31,0.45)' }}
            >
              Service
            </label>
            <select
              value={service}
              onChange={e => { setService(e.target.value); setResult(null) }}
              className="w-full font-mono text-sm px-4 py-3 outline-none border-0 border-b-2 bg-transparent"
              style={{ borderColor: service ? GREEN : TAN, color: CHARCOAL }}
            >
              <option value="">Select a service...</option>
              {SERVICES.map(s => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Size input */}
          {params && (
            <div className="flex flex-col gap-1.5">
              <label
                className="font-mono text-[9px] uppercase tracking-[0.14em]"
                style={{ color: 'rgba(31,31,31,0.45)' }}
              >
                {params.inputLabel} ({params.inputUnit})
              </label>
              <input
                type="number"
                min={params.inputMin}
                max={params.inputMax}
                step={params.inputStep}
                value={size}
                onChange={e => { setSize(e.target.value === '' ? '' : Number(e.target.value)); setResult(null) }}
                placeholder={`${params.inputDefault} ${params.inputUnit}`}
                className="w-full font-mono text-sm px-4 py-3 outline-none border-0 border-b-2 bg-transparent"
                style={{ borderColor: size !== '' ? GREEN : TAN, color: CHARCOAL }}
              />
            </div>
          )}

          {/* Zip code */}
          <div className="flex flex-col gap-1.5">
            <label
              className="font-mono text-[9px] uppercase tracking-[0.14em]"
              style={{ color: 'rgba(31,31,31,0.45)' }}
            >
              Zip code
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={5}
              value={zip}
              onChange={e => { setZip(e.target.value.replace(/\D/g, '')); setResult(null) }}
              placeholder="30517"
              className="w-full font-mono text-sm px-4 py-3 outline-none border-0 border-b-2 bg-transparent"
              style={{ borderColor: zip.length === 5 ? GREEN : TAN, color: CHARCOAL }}
            />
          </div>

          {error && (
            <p className="font-mono text-[9px]" style={{ color: CORAL }}>{error}</p>
          )}

          <button
            type="submit"
            className="font-mono text-[10px] uppercase tracking-[0.16em] py-4 transition-opacity hover:opacity-80 mt-2"
            style={{ backgroundColor: GREEN, color: CREAM }}
          >
            Get estimate
          </button>
        </form>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="mt-10 pt-10"
              style={{ borderTop: `1px solid ${TAN}` }}
            >
              <p
                className="font-mono text-[9px] uppercase tracking-[0.18em] mb-5"
                style={{ color: 'rgba(31,31,31,0.4)' }}
              >
                Estimated range — {params?.label}
              </p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { tier: 'Good',   val: result.good   },
                  { tier: 'Better', val: result.better },
                  { tier: 'Best',   val: result.best   },
                ].map(({ tier, val }) => (
                  <div
                    key={tier}
                    className="flex flex-col gap-1 px-4 py-5"
                    style={{
                      border: `1px solid ${tier === 'Better' ? GREEN : TAN}`,
                      backgroundColor: tier === 'Better' ? 'rgba(61,90,61,0.06)' : 'transparent',
                    }}
                  >
                    <span
                      className="font-mono text-[8px] uppercase tracking-[0.12em]"
                      style={{ color: tier === 'Better' ? GREEN : 'rgba(31,31,31,0.4)' }}
                    >
                      {tier}
                    </span>
                    <span
                      className="font-mono tabular-nums leading-none"
                      style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: CHARCOAL }}
                    >
                      ${val.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <p
                className="font-mono text-[8px] leading-relaxed mb-6"
                style={{ color: 'rgba(31,31,31,0.4)' }}
              >
                Better tier = our standard quote. Good = lighter scope or off-peak.
                Best = full-service, premium finish, peak demand. Final price confirmed
                on-site.
              </p>
              <button
                onClick={handleLock}
                className="font-mono text-[10px] uppercase tracking-[0.14em] w-full py-4 transition-opacity hover:opacity-80"
                style={{ border: `1px solid ${GREEN}`, color: GREEN, backgroundColor: 'transparent' }}
              >
                Lock this estimate →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
