'use client'

import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'

// ── Design tokens ────────────────────────────────────────────────────────────
const BG      = 'oklch(95.5% 0.012 76)'
const CHARCOAL = 'oklch(14% 0.005 75)'
const GREEN   = 'oklch(37% 0.07 142)'
const CLAY    = 'oklch(77% 0.04 72)'
const CREAM   = '#F5F1E8'

// ── Pricing constants (calibrated from 54-job dataset) ───────────────────────
const FUEL_COEF  = 0.42   // empirical distance-fuel multiplier
const LABOR_RATE = 18     // $/hr regional market rate
const EQUIP_DEPR = 0.18   // $/hr equipment depreciation
const EFFICIENCY = 2.3    // min-quote multiplier from job history

// ── Service starting prices ──────────────────────────────────────────────────
const SERVICE_PRICES = [
  { name: 'Moving',           icon: '🚛', start: 299,  note: 'Per job · crew of 3 · includes loading & unloading'      },
  { name: 'Pressure Washing', icon: '💧', start: 185,  note: 'Driveways, patios, house exteriors, roofs, decks'        },
  { name: 'Auto Detailing',   icon: '🚗', start: 149,  note: 'Full interior & exterior · any make or model'            },
  { name: 'Boat Detailing',   icon: '⛵', start: 749,  note: 'Full marine detail · any vessel size'                    },
  { name: 'Landscaping',      icon: '🌿', start: 225,  note: 'Mulch, pinestraw, sod, yard cleanup'                     },
  { name: 'Labor / Specialty',icon: '⚒️', start: 165,  note: 'Excavation, French drain, storm cleanup, gutter cleaning'},
]

// ── FAQ data ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'What areas do you serve?',
    a: 'All of Atlanta Metro — including Suwanee, Buford, Gainesville, Marietta, Decatur, Dacula, Monroe, Auburn, Flowery Branch, and 10+ other cities. We\'ve completed jobs in 15+ cities since January 2025. Based in the Suwanee / Buford area.',
  },
  {
    q: 'How do you calculate your pricing?',
    a: 'Every quote comes from an 8-variable cost function built from our 54-job dataset. It accounts for fuel price, route distance, labor hours, crew fatigue (based on AP Physics work-energy principles), material costs, disposal fees, equipment depreciation, and seasonal demand. Every quote is different — the calculator below shows the exact math.',
  },
  {
    q: 'How quickly will you respond to my request?',
    a: 'We typically reply within a few hours and guarantee a response within one business day. For urgent jobs, call or text (470) 272-8228 directly — we pick up.',
  },
  {
    q: 'How many people will be on my job?',
    a: 'Core crew is 2–3 people for standard jobs. For large moving contracts or multi-day pressure washing, we deploy up to 4. Every job is scoped and crewed based on complexity, not a flat headcount.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Venmo, Cash, Zelle, and Check. No processing fees. Payment is collected after the job is complete and you\'re satisfied.',
  },
  {
    q: 'Can you do same-day or weekend work?',
    a: 'Yes, often. We have same-day or next-day availability most weeks. Weekend slots fill fast in spring — request early or call directly.',
  },
  {
    q: 'What\'s included in a full auto or boat detail?',
    a: 'Interior: full vacuum, steam cleaning, leather conditioning, glass treatment. Exterior: hand wash, clay bar, polish, wax. Engine bay cleaning on request. Any vehicle — Porsches, Lexus SUVs, Yukon XLs, 30-ft Yamahas. We\'ve done them all.',
  },
  {
    q: 'Do you haul away junk as part of a move?',
    a: 'Yes. Junk haul and disposal are included in our moving service. Gwinnett County disposal runs about $65/ton for debris — this is built into your quote line by line. No surprises.',
  },
  {
    q: 'Can you handle commercial jobs?',
    a: 'Yes. We\'ve done apartment building roof washing (3 days, Decatur), a full school classroom relocation (Gainesville), and commercial pressure washing jobs. No job is too large — scope it with us.',
  },
  {
    q: 'Will I get a firm price before you start?',
    a: 'Yes. We provide your exact quote before any work begins. The calculator gives you a ballpark — the final number comes from a site assessment. We never start without your approval.',
  },
  {
    q: 'What is AAS Cares?',
    a: 'Our pro-bono program. We\'ve donated $3,000+ in professional labor to community members and nursing home residents — completely free. If you or someone you know needs help but can\'t afford it, reach out. No application, no means test. Just tell us.',
  },
  {
    q: 'Who founded All Around Services?',
    a: 'Cameron Camarotti and Ashton Patterson, both high school students from Suwanee, GA. Founded January 2025. What started as a single moving job for a neighbor grew into a 5-service, 4-person operation across Atlanta Metro — 54 jobs, 15+ cities, and $3,000+ donated.',
  },
]

// ── Calculator state type ─────────────────────────────────────────────────────
type CalcState = {
  fuel: number
  distance: number
  labor: number
  fatigue: number
  materials: number
  disposal: number
  equipment: number
  demand: number
}

const DEFAULT_CALC: CalcState = {
  fuel: 3.45,
  distance: 3.45,
  labor: 4,
  fatigue: 1.0,
  materials: 0,
  disposal: 0,
  equipment: 0,
  demand: 1.15,
}

function calcCost(s: CalcState) {
  const fuelCost  = FUEL_COEF * s.distance * s.fuel
  const laborCost = LABOR_RATE * (s.labor / s.fatigue)
  const equipCost = EQUIP_DEPR * s.equipment
  const totalCost = fuelCost + laborCost + equipCost + s.materials + s.disposal
  const minQuote  = totalCost * EFFICIENCY
  return { fuelCost, laborCost, equipCost, totalCost, minQuote }
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const [calc, setCalc] = useState<CalcState>(DEFAULT_CALC)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const { fuelCost, laborCost, totalCost, minQuote } = calcCost(calc)

  function setVal(key: keyof CalcState, value: number) {
    setCalc(prev => ({ ...prev, [key]: value }))
  }

  return (
    <>
      <Nav lightBg />
      <main style={{ backgroundColor: BG }}>

        {/* ── Page header ───────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-14 pt-32 pb-16 border-b" style={{ borderColor: CLAY }}>
          <span
            className="block font-mono text-[9px] uppercase tracking-[0.2em] mb-5"
            style={{ color: 'oklch(14% 0.005 75 / 0.4)' }}
          >
            Pricing &amp; FAQ
          </span>
          <h1
            className="font-display leading-[0.88] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: CHARCOAL }}
          >
            <span className="font-light italic">Transparent</span>
            <span className="font-black"> pricing.</span>
          </h1>
          <p
            className="mt-5 font-mono text-[10px] uppercase tracking-[0.12em] max-w-xl"
            style={{ color: 'oklch(14% 0.005 75 / 0.45)' }}
          >
            Every quote is generated from a mathematically rigorous 8-variable cost function — not guesswork.
            Based on 54 completed jobs across Atlanta Metro.
          </p>
        </section>

        {/* ── Starting prices grid ──────────────────────────────────────────────── */}
        <section className="px-6 md:px-14 py-16 border-b" style={{ borderColor: CLAY }}>
          <span
            className="block font-mono text-[9px] uppercase tracking-[0.18em] mb-8"
            style={{ color: 'oklch(14% 0.005 75 / 0.4)' }}
          >
            Starting Prices — All Individually Quoted
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SERVICE_PRICES.map(({ name, icon, start, note }) => (
              <div
                key={name}
                className="border px-6 py-6 flex flex-col gap-3"
                style={{ borderColor: CLAY }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{icon}</span>
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.14em]"
                    style={{ color: 'oklch(14% 0.005 75 / 0.55)' }}
                  >
                    {name}
                  </span>
                </div>
                <span
                  className="font-display font-black leading-none tracking-[-0.02em]"
                  style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: CHARCOAL }}
                >
                  ${start.toLocaleString()}
                  <span
                    className="font-mono font-normal text-sm tracking-normal ml-1"
                    style={{ color: 'oklch(14% 0.005 75 / 0.4)', fontSize: '0.7rem' }}
                  >
                    starting
                  </span>
                </span>
                <p
                  className="font-mono text-[8px] uppercase tracking-[0.08em] leading-relaxed"
                  style={{ color: 'oklch(14% 0.005 75 / 0.5)' }}
                >
                  {note}
                </p>
              </div>
            ))}
          </div>
          <p
            className="mt-5 font-mono text-[8px]"
            style={{ color: 'oklch(14% 0.005 75 / 0.35)' }}
          >
            Starting prices reflect minimum scope. Final quote depends on property size, crew hours, materials, and travel distance.{' '}
            <Link href="/quote" className="underline" style={{ color: GREEN }}>Request your exact quote →</Link>
          </p>
        </section>

        {/* ── Calculus pricing calculator ───────────────────────────────────────── */}
        <section className="px-6 md:px-14 py-16 border-b" style={{ borderColor: CLAY }}>
          <span
            className="block font-mono text-[9px] uppercase tracking-[0.18em] mb-3"
            style={{ color: 'oklch(14% 0.005 75 / 0.4)' }}
          >
            Job Cost Simulator — Multivariable Calculus Model
          </span>
          <p
            className="font-mono text-[9px] leading-relaxed mb-10 max-w-2xl"
            style={{ color: 'oklch(14% 0.005 75 / 0.5)' }}
          >
            Eight real inputs. One output. The same model used to generate every AAS quote, built from AP Calculus BC concepts and calibrated from 54 completed jobs.
            C = α·d·f + β·(l/φ) + γ·m + δ·w + ε·e
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl">

            {/* Sliders */}
            <div className="flex flex-col gap-6">
              <CalcSlider
                label="Fuel Price ($/gal)"
                sublabel="LIVE — Gwinnett County avg"
                value={calc.fuel}
                min={2.5} max={5.5} step={0.05}
                display={`$${calc.fuel.toFixed(2)}/gal`}
                onChange={v => setVal('fuel', v)}
              />
              <CalcSlider
                label="Route Distance (miles)"
                sublabel="One-way to job site"
                value={calc.distance}
                min={0.5} max={40} step={0.5}
                display={`${calc.distance.toFixed(1)} mi`}
                onChange={v => setVal('distance', v)}
              />
              <CalcSlider
                label="Labor Hours on Site"
                sublabel="Active job time"
                value={calc.labor}
                min={0.5} max={12} step={0.25}
                display={`${calc.labor.toFixed(2)} hrs`}
                onChange={v => setVal('labor', v)}
              />
              <CalcSlider
                label="Crew Fatigue φ (0.7–1.0)"
                sublabel="PHYSICS — 1.0 = fresh · 0.85 = hour 8"
                value={calc.fatigue}
                min={0.7} max={1.0} step={0.01}
                display={calc.fatigue.toFixed(2)}
                onChange={v => setVal('fatigue', v)}
              />
              <CalcSlider
                label="Materials Cost ($)"
                sublabel="Mulch, chemicals, pinestraw, supplies"
                value={calc.materials}
                min={0} max={500} step={5}
                display={`$${calc.materials}`}
                onChange={v => setVal('materials', v)}
              />
              <CalcSlider
                label="Disposal Fees ($)"
                sublabel="Gwinnett avg $65/ton · applies to haul jobs"
                value={calc.disposal}
                min={0} max={200} step={5}
                display={`$${calc.disposal}`}
                onChange={v => setVal('disposal', v)}
              />
              <CalcSlider
                label="Equipment Hours"
                sublabel="Pressure washer, tools · $0.18/hr depreciation"
                value={calc.equipment}
                min={0} max={12} step={0.25}
                display={`${calc.equipment.toFixed(2)} hrs`}
                onChange={v => setVal('equipment', v)}
              />
              <CalcSlider
                label="Demand Multiplier κ"
                sublabel="SEASONAL — 1.15 = spring peak · 1.0 = off-season"
                value={calc.demand}
                min={0.9} max={1.3} step={0.01}
                display={`${calc.demand.toFixed(2)}×`}
                onChange={v => setVal('demand', v)}
              />
            </div>

            {/* Output */}
            <div className="flex flex-col gap-4">
              <div
                className="border px-7 py-6 flex flex-col gap-1"
                style={{ borderColor: CLAY }}
              >
                <span
                  className="font-mono text-[8px] uppercase tracking-[0.14em]"
                  style={{ color: 'oklch(14% 0.005 75 / 0.45)' }}
                >
                  Fuel &amp; travel overhead
                </span>
                <span
                  className="font-display font-black text-2xl tracking-[-0.02em]"
                  style={{ color: CHARCOAL }}
                >
                  ${fuelCost.toFixed(2)}
                </span>
                <span
                  className="font-mono text-[8px]"
                  style={{ color: 'oklch(14% 0.005 75 / 0.4)' }}
                >
                  α·d·f at current fuel price
                </span>
              </div>

              <div
                className="border px-7 py-6 flex flex-col gap-1"
                style={{ borderColor: CLAY }}
              >
                <span
                  className="font-mono text-[8px] uppercase tracking-[0.14em]"
                  style={{ color: 'oklch(14% 0.005 75 / 0.45)' }}
                >
                  Effective labor cost
                </span>
                <span
                  className="font-display font-black text-2xl tracking-[-0.02em]"
                  style={{ color: CHARCOAL }}
                >
                  ${laborCost.toFixed(2)}
                </span>
                <span
                  className="font-mono text-[8px]"
                  style={{ color: 'oklch(14% 0.005 75 / 0.4)' }}
                >
                  β·(l/φ) — fatigue rises as φ drops
                </span>
              </div>

              <div
                className="border px-7 py-6 flex flex-col gap-1"
                style={{ borderColor: CLAY }}
              >
                <span
                  className="font-mono text-[8px] uppercase tracking-[0.14em]"
                  style={{ color: 'oklch(14% 0.005 75 / 0.45)' }}
                >
                  Total overhead — all eight variables
                </span>
                <span
                  className="font-display font-black text-2xl tracking-[-0.02em]"
                  style={{ color: CHARCOAL }}
                >
                  ${totalCost.toFixed(2)}
                </span>
                <span
                  className="font-mono text-[8px]"
                  style={{ color: 'oklch(14% 0.005 75 / 0.4)' }}
                >
                  C = α·d·f + β·(l/φ) + γ·m + δ·w + ε·e
                </span>
              </div>

              <div
                className="border px-7 py-7 flex flex-col gap-1"
                style={{ backgroundColor: GREEN, borderColor: GREEN }}
              >
                <span
                  className="font-mono text-[8px] uppercase tracking-[0.14em]"
                  style={{ color: 'rgba(245,241,232,0.65)' }}
                >
                  Minimum viable quote · 2.3× efficiency ratio
                </span>
                <span
                  className="font-display font-black leading-none tracking-[-0.02em]"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: CREAM }}
                >
                  ${minQuote.toFixed(0)}+
                </span>
                <span
                  className="font-mono text-[8px]"
                  style={{ color: 'rgba(245,241,232,0.55)' }}
                >
                  Total overhead × 2.3 efficiency multiplier. Seasonal demand κ={calc.demand.toFixed(2)} applied to recommended quote.
                </span>
              </div>

              <div
                className="border px-6 py-5"
                style={{ borderColor: CLAY }}
              >
                <p
                  className="font-mono text-[8px] leading-relaxed"
                  style={{ color: 'oklch(14% 0.005 75 / 0.45)' }}
                >
                  Ballpark only. Final quote based on site assessment, exact scope, and materials. The minimum quote equals total overhead × 2.3 — our efficiency ratio derived from the 54-job dataset. When fatigue drops below 1.0, effective labor cost rises, pushing the floor up. This ensures no job is ever underpriced.
                </p>
              </div>

              <Link
                href="/quote"
                className="group self-start flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] border px-8 py-4 mt-2 transition-opacity duration-300 hover:opacity-80"
                style={{ backgroundColor: CHARCOAL, color: CREAM, borderColor: CHARCOAL }}
              >
                Get your exact quote
                <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-[4px]">→</span>
              </Link>
            </div>

          </div>

          {/* Variable explainer */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { sym: 'd',  label: 'Route Distance',      detail: 'Miles to job site. Every mile adds fuel cost and crew fatigue before work starts.' },
              { sym: 'f',  label: 'Fuel Price',           detail: 'Tracked weekly vs. Gwinnett County pump prices. $0.50 rise adds ~$4 on a 12-mi job.' },
              { sym: 'l',  label: 'Labor Hours',          detail: 'Total crew-hours including setup and breakdown — not just time the client sees.' },
              { sym: 'φ',  label: 'Crew Fatigue Factor',  detail: 'From AP Physics Work-Energy Theorem. Starts at 1.0, drops to 0.85 by hour 8.' },
              { sym: 'm',  label: 'Material Costs',       detail: 'Passed through at exact cost. Mulch, chemicals, pinestraw — zero markup.' },
              { sym: 'w',  label: 'Disposal & Dump Fees', detail: 'Gwinnett avg $65/ton. Active on haul jobs only, tracked separately.' },
              { sym: 'e',  label: 'Equipment Depr.',      detail: '$0.18/hr across all units. Ensures we\'re always building toward replacement.' },
              { sym: 'κ',  label: 'Demand Coefficient',   detail: 'Spring peak = 1.15. Winter = 1.0. Market supports a justified seasonal premium.' },
            ].map(({ sym, label, detail }) => (
              <div
                key={sym}
                className="border px-5 py-5 flex flex-col gap-2"
                style={{ borderColor: CLAY }}
              >
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-display font-black text-xl italic"
                    style={{ color: GREEN }}
                  >
                    {sym}
                  </span>
                  <span
                    className="font-mono text-[8px] uppercase tracking-[0.12em]"
                    style={{ color: 'oklch(14% 0.005 75 / 0.55)' }}
                  >
                    {label}
                  </span>
                </div>
                <p
                  className="font-mono text-[8px] leading-relaxed"
                  style={{ color: 'oklch(14% 0.005 75 / 0.45)' }}
                >
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-14 py-16">
          <span
            className="block font-mono text-[9px] uppercase tracking-[0.18em] mb-10"
            style={{ color: 'oklch(14% 0.005 75 / 0.4)' }}
          >
            Frequently Asked Questions
          </span>
          <div className="max-w-3xl flex flex-col">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="border-t"
                style={{ borderColor: CLAY }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-start justify-between gap-6 py-5 text-left"
                >
                  <span
                    className="font-display font-black text-base leading-snug tracking-[-0.01em]"
                    style={{ color: CHARCOAL }}
                  >
                    {faq.q}
                  </span>
                  <span
                    className="font-mono text-xl shrink-0 transition-transform duration-200"
                    style={{
                      color: GREEN,
                      transform: openFaq === i ? 'rotate(45deg)' : 'none',
                    }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="pb-6">
                    <p
                      className="font-mono text-[10px] leading-loose"
                      style={{ color: 'oklch(14% 0.005 75 / 0.65)' }}
                    >
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
            <div className="border-t" style={{ borderColor: CLAY }} />
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              href="/quote"
              className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] border px-8 py-4 transition-opacity duration-300 hover:opacity-80"
              style={{ backgroundColor: GREEN, color: CREAM, borderColor: GREEN }}
            >
              Request a Quote
              <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-[4px]">→</span>
            </Link>
            <a
              href="tel:4702728228"
              className="font-display font-black text-xl tracking-[-0.02em] hover:opacity-70 transition-opacity"
              style={{ color: CHARCOAL }}
            >
              (470) 272-8228
            </a>
          </div>
        </section>

      </main>
    </>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

type SliderProps = {
  label: string
  sublabel: string
  value: number
  min: number
  max: number
  step: number
  display: string
  onChange: (v: number) => void
}

function CalcSlider({ label, sublabel, value, min, max, step, display, onChange }: SliderProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <div className="flex flex-col gap-0.5">
          <span
            className="font-mono text-[9px] uppercase tracking-[0.12em]"
            style={{ color: CHARCOAL }}
          >
            {label}
          </span>
          <span
            className="font-mono text-[8px]"
            style={{ color: 'oklch(14% 0.005 75 / 0.4)' }}
          >
            {sublabel}
          </span>
        </div>
        <span
          className="font-display font-black text-lg tracking-[-0.02em] tabular-nums"
          style={{ color: GREEN }}
        >
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full"
        style={{ accentColor: GREEN }}
      />
    </div>
  )
}
