'use client'

import { useState } from 'react'
import Link from 'next/link'

const PASSWORD = 'aas2025'

// ── Design tokens ──────────────────────────────────────────────────────────────
const BG     = '#2A4A2A'
const BG_DIM = '#243E24'
const CARD   = '#F5F1E8'
const TEXT   = '#1A1A14'
const MUTED  = 'rgba(26,26,20,0.45)'
const ACCENT = '#3D5A3D'
const LIGHT  = 'rgba(245,241,232,0.65)'
const FAINT  = 'rgba(245,241,232,0.35)'
const BORDER = 'rgba(245,241,232,0.1)'

// ── KPI data ───────────────────────────────────────────────────────────────────
const KPI_CARDS = [
  { value: '$17,400', label: 'GROSS REVENUE',    sub: '54 jobs · Jan 2025 – May 2026' },
  { value: '82.1%',   label: 'NET MARGIN',       sub: 'After all overhead · Jan 2025–May 2026' },
  { value: '$3,000',  label: 'AAS CARES',        sub: 'Pro-bono value donated · $10K goal' },
]

const SECONDARY_CARDS = [
  { label: 'Net Operating Profit', value: '~$14,280' },
  { label: 'Revenue / Man-Hour',   value: '$44.50'   },
  { label: 'Avg Revenue / Job',    value: '$348'     },
  { label: 'Top ZIP — 30517',      value: '$4,785'   },
  { label: 'Cities Served',        value: '15+'      },
  { label: 'AAS Cares Donated',    value: '$3,000'   },
  { label: 'Q1 2026 YoY Growth',   value: '+89.8%'   },
  { label: 'Total Man-Hours',      value: '400+ hrs' },
]

// ── Service mix ────────────────────────────────────────────────────────────────
const SERVICE_MIX = [
  { label: 'Pressure Washing', jobs: 11, revenue: 5710, avgJob: 519, revPerHr: 35.00 },
  { label: 'Moving',           jobs: 15, revenue: 4595, avgJob: 306, revPerHr: 31.58 },
  { label: 'Auto & Boat',      jobs: 11, revenue: 2950, avgJob: 268, revPerHr: 95.29 },
  { label: 'Landscaping',      jobs: 11, revenue: 2670, avgJob: 243, revPerHr: 27.50 },
  { label: 'Labor / Specialty',jobs: 5,  revenue: 1475, avgJob: 295, revPerHr: 39.86 },
]
const TOTAL_REV = SERVICE_MIX.reduce((s, r) => s + r.revenue, 0)

// ── Lead sources ───────────────────────────────────────────────────────────────
const LEAD_SOURCES = [
  { source: 'Facebook',         revenue: 6875, pct: '39.5%' },
  { source: 'Previous Job',     revenue: 4460, pct: '25.6%' },
  { source: 'Word of Mouth',    revenue: 2780, pct: '16.0%' },
  { source: 'Door to Door',     revenue: 2555, pct: '14.7%' },
  { source: 'Nextdoor',         revenue: 455,  pct: '2.6%'  },
  { source: 'Family / Employee',revenue: 275,  pct: '1.6%'  },
]

// ── Geographic revenue ─────────────────────────────────────────────────────────
const GEO_REVENUE = [
  { city: 'Suwanee (30517)',   jobs: 19, revenue: 4785 },
  { city: 'Dacula / Grayson',  jobs: 7,  revenue: 1395 },
  { city: 'Decatur',           jobs: 1,  revenue: 1300 },
  { city: 'Lake Hartwell',     jobs: 2,  revenue: 1300 },
  { city: 'Buford (30518)',    jobs: 2,  revenue: 1250 },
  { city: 'Monroe',            jobs: 1,  revenue: 1200 },
  { city: '+ 9 other cities',  jobs: 13, revenue: 3365 },
]

// ── P&L data ───────────────────────────────────────────────────────────────────
const PL_ROWS = [
  { label: 'Gross Revenue (41 paid jobs)',  value: '$14,595', bold: true,  indent: false },
  { label: 'Per-job variable expenses',     value: '(923)',   bold: false, indent: true  },
  { label: 'Chemicals & misc. supplies',    value: '(150)',   bold: false, indent: true  },
  { label: 'Gas / mileage estimate',        value: '(285)',   bold: false, indent: true  },
  { label: 'Total Variable COGS',           value: '(1,358)', bold: true,  indent: false },
  { label: 'Gross Profit',                  value: '$13,237', bold: true,  indent: false },
  { label: 'Marketing (cards, hangers, FB ads)', value: '(307)',bold: false,indent: true },
  { label: 'Equipment (pressure washers)',  value: '(928)',   bold: false, indent: true  },
  { label: 'Supply replacements',           value: '(131)',   bold: false, indent: true  },
  { label: 'Total Fixed OpEx',              value: '(1,366)', bold: true,  indent: false },
  { label: 'Net Operating Profit (EBIT)',   value: '$11,871', bold: true,  indent: false },
  { label: 'Net Operating Margin',          value: '81.3%',   bold: false, indent: false },
  { label: 'Job-Level Profit Margin',       value: '93.7%',   bold: false, indent: false },
  { label: 'Self-Employment Tax (15.3%)',   value: '(1,816)', bold: false, indent: true  },
  { label: 'Deductible Half of SE Tax',     value: '+908',    bold: false, indent: true  },
  { label: 'Adjusted Taxable Income',       value: '$10,963', bold: false, indent: false },
  { label: 'Federal Income Tax (10%)',      value: '(1,096)', bold: false, indent: true  },
  { label: 'Total Tax Obligation',          value: '(2,913)', bold: true,  indent: false },
  { label: 'Take-Home Net Profit',          value: '$8,958',  bold: true,  indent: false },
]

// ── Monthly revenue ────────────────────────────────────────────────────────────
const MONTHLY = [
  { month: "Jan '25", rev: 330,   pct: 9.9  },
  { month: "Feb '25", rev: 410,   pct: 12.3 },
  { month: "Mar '25", rev: 555,   pct: 16.7 },
  { month: "Apr '25", rev: 1540,  pct: 46.2 },
  { month: "May '25", rev: 2792,  pct: 83.8 },
  { month: "Jun '25", rev: 3330,  pct: 100  },
  { month: "Jul '25", rev: 440,   pct: 13.2 },
  { month: "Aug '25", rev: 1035,  pct: 31.1 },
  { month: "Sep '25", rev: 680,   pct: 20.4 },
  { month: "Oct '25", rev: 120,   pct: 3.6  },
  { month: "Nov '25", rev: 105,   pct: 3.2  },
  { month: "Dec '25", rev: 175,   pct: 5.3  },
  { month: "Jan '26", rev: 40,    pct: 1.2  },
  { month: "Feb '26", rev: 780,   pct: 23.4 },
  { month: "Mar '26", rev: 1638,  pct: 49.2 },
  { month: "Apr '26", rev: 1915,  pct: 57.5 },
  { month: "May '26", rev: 1120,  pct: 33.6 },
]

// ── AAS Cares ──────────────────────────────────────────────────────────────────
const CARES_JOBS = [
  {
    date:      'Dec 21, 2025',
    recipient: 'Tony Ranieri · Suwanee',
    work:      'Water fountain install, decorative rocks, full excavation',
    hours:     '4.5 hrs',
    value:     '$700',
  },
  {
    date:      'Mar 14, 2026',
    recipient: 'Nursing Home Resident · Marietta → Suwanee',
    work:      'Full move, all belongings packed & set up. $95 supplies out of pocket.',
    hours:     '8 hrs',
    value:     '$550',
  },
  {
    date:      'May 2026',
    recipient: 'Mary Ranieri · Suwanee',
    work:      'Full interior painting — 3-day job. Post-surgery, had been planning this for over 5 years. Her words: "Thank you so much, I have been wanting to get this done for over five years now!"',
    hours:     '24 hrs',
    value:     '$1,750',
  },
]

// ── Complete job history ───────────────────────────────────────────────────────
const JOBS = [
  { n:1,  date:"Jan 24 '25", svc:"Moving",           desc:"Loaded & unloaded truck — whole 3BR house",                         crew:"Cam, Ashton, Wynn",     hrs:4.75, city:"Jefferson",      rev:"$310"     },
  { n:2,  date:"Feb 1 '25",  svc:"Moving",           desc:"Move & dispose of air hockey table, TV mount, dresser",             crew:"Cam, Ashton, Wynn",     hrs:0.75, city:"Suwanee",        rev:"$120"     },
  { n:3,  date:"Feb 17 '25", svc:"Moving",           desc:"Dresser upstairs to downstairs + mirror and bedframe",              crew:"Cam, Ashton, Wynn",     hrs:1.25, city:"Suwanee",        rev:"$170"     },
  { n:4,  date:"Feb 19 '25", svc:"Moving",           desc:"Moved boxes and tubs upstairs to U-Haul",                          crew:"Cam, Ashton, Wynn",     hrs:1.25, city:"Flowery Branch", rev:"$120"     },
  { n:5,  date:"Mar 2 '25",  svc:"Landscaping",      desc:"Mulch front and side of house",                                    crew:"Cam",                   hrs:2,    city:"Buford",         rev:"$200"     },
  { n:6,  date:"Mar 3 '25",  svc:"Moving",           desc:"Two full bedroom move",                                            crew:"Cam, Wynn",             hrs:3.25, city:"Dacula",         rev:"$355"     },
  { n:7,  date:"Apr 3 '25",  svc:"Landscaping",      desc:"Backyard and side yard mulch job",                                 crew:"Ashton, Landon, Wynn",  hrs:5.5,  city:"Suwanee",        rev:"$345"     },
  { n:8,  date:"Apr 21 '25", svc:"Moving",           desc:"Move 2 rugs, 2 mattresses, bedframe, counters, mirror",           crew:"Cam, Ashton, Wynn",     hrs:1.75, city:"Dacula",         rev:"$210"     },
  { n:9,  date:"Apr 25 '25", svc:"Moving",           desc:"Move 2 bedrooms from neighboring house to upstairs",              crew:"Cam, Ashton, Wynn",     hrs:2.5,  city:"Suwanee",        rev:"$310"     },
  { n:10, date:"Apr 26 '25", svc:"Labor",            desc:"Excavated back soil, moved 200+ lb rocks, built French drain",    crew:"Cam, Ashton",           hrs:5,    city:"Suwanee",        rev:"$675"     },
  { n:11, date:"May 17 '25", svc:"Moving",           desc:"Storage unit to full apartment move-in",                          crew:"Cam, Wynn",             hrs:9.25, city:"Monroe",         rev:"$1,160"   },
  { n:12, date:"May 24 '25", svc:"Pressure Washing", desc:"Apartment building roof + inside/outside (3 days)",               crew:"Cam, Ashton, Brady, Wynn",hrs:12, city:"Decatur",        rev:"$1,300"   },
  { n:13, date:"May 28 '25", svc:"Landscaping",      desc:"Pinestraw job in apartment townhouse",                            crew:"Cam, Ashton",           hrs:1,    city:"Suwanee",        rev:"$122"     },
  { n:14, date:"May 29 '25", svc:"Landscaping",      desc:"Mulch for whole backyard and side of house",                      crew:"Cam, Wynn",             hrs:4.5,  city:"Suwanee",        rev:"$210"     },
  { n:15, date:"Jun 1 '25",  svc:"Pressure Washing", desc:"Lake house — 2 roofs, 4 stairsets, 2 patios, dock, gutters (2-day)",crew:"Cam, Ashton",        hrs:19,   city:"Lake Hartwell",  rev:"$1,210"   },
  { n:16, date:"Jun 3 '25",  svc:"Pressure Washing", desc:"PW driveway, sidewalk, house surround, brick, front & back patio",crew:"Cam, Ashton",          hrs:8,    city:"Suwanee",        rev:"$590"     },
  { n:17, date:"Jun 7 '25",  svc:"Labor",            desc:"Split tree & branches — storm cleanup Hamilton Mill",             crew:"Cam, Jacob, Brady",     hrs:5.5,  city:"Auburn",         rev:"$310"     },
  { n:18, date:"Jun 8 '25",  svc:"Labor",            desc:"Storm cleanup at lake — broken branches cut & hauled",           crew:"Cam, Jacob, Trent",     hrs:2.75, city:"Flowery Branch", rev:"$350"     },
  { n:19, date:"Jun 15 '25", svc:"Auto Detailing",   desc:"Interior & exterior Lexus SUV full detail",                      crew:"Ashton",                hrs:1.5,  city:"Suwanee",        rev:"$222"     },
  { n:20, date:"Jun 24 '25", svc:"Auto Detailing",   desc:"Full inside & outside detail — Porsche Cayenne SUV",             crew:"Cam, Ashton",           hrs:2,    city:"Suwanee",        rev:"$255"     },
  { n:21, date:"Jun 25 '25", svc:"Auto Detailing",   desc:"Inside & outside full detail — Yukon XL",                       crew:"Cam, Ashton",           hrs:2.5,  city:"Suwanee",        rev:"$210"     },
  { n:22, date:"Jul 18 '25", svc:"Pressure Washing", desc:"Backyard tile patio, retaining wall, around pool & side of house",crew:"Cam",                  hrs:7,    city:"Suwanee",        rev:"$440"     },
  { n:23, date:"Aug 13 '25", svc:"Moving",           desc:"Moved flooded music classroom to trailer across school",         crew:"Cam, Ashton, Wynn",     hrs:7,    city:"Gainesville",    rev:"$1,035"   },
  { n:24, date:"Sep 6 '25",  svc:"Landscaping",      desc:"Laid sod — entire front, side & back yard (2-day)",             crew:"Landon, Trent, Cam",    hrs:11.5, city:"Dacula",         rev:"$400"     },
  { n:25, date:"Sep 15 '25", svc:"Moving",           desc:"Moved tubs & boxes — pre-move",                                 crew:"Cam, Wynn",             hrs:1.25, city:"Suwanee",        rev:"$105"     },
  { n:26, date:"Sep 18 '25", svc:"Moving",           desc:"Moved trampoline + junk haul",                                  crew:"Cam",                   hrs:1,    city:"Dacula",         rev:"$175"     },
  { n:27, date:"Oct 17 '25", svc:"Labor",            desc:"Cleaned gutters entire surrounding house",                      crew:"Cam",                   hrs:1.25, city:"Suwanee",        rev:"$120"     },
  { n:28, date:"Nov 9 '25",  svc:"Pressure Washing", desc:"Pressure wash retaining wall",                                  crew:"Ashton",                hrs:1,    city:"Suwanee",        rev:"$105"     },
  { n:29, date:"Dec 21 '25", svc:"Pro Bono",         desc:"Installed water fountain & decorative rocks — full day donated",crew:"Cam",                   hrs:4.5,  city:"Suwanee",        rev:"Donated"  },
  { n:30, date:"Dec 27 '25", svc:"Auto Detailing",   desc:"Full inside & outside car detail — Lexus",                     crew:"Ashton",                hrs:2,    city:"Dacula",         rev:"$175"     },
  { n:31, date:"Jan 11 '26", svc:"Auto Detailing",   desc:"Interior car detail — employee discount",                      crew:"Wynn",                  hrs:1,    city:"Dacula",         rev:"$40"      },
  { n:32, date:"Feb 8 '26",  svc:"Moving",           desc:"Moving 1 room of furniture",                                   crew:"Ashton",                hrs:1,    city:"Suwanee",        rev:"$100"     },
  { n:33, date:"Feb 17 '26", svc:"Moving",           desc:"Moving 3 electrical reclining chairs",                         crew:"Cam, Ashton",           hrs:1.5,  city:"Suwanee",        rev:"$150"     },
  { n:34, date:"Feb 19 '26", svc:"Moving",           desc:"Mattress move + frame and 2 dressers",                         crew:"Cam",                   hrs:1.5,  city:"Suwanee",        rev:"$130"     },
  { n:35, date:"Feb 22 '26", svc:"Pressure Washing", desc:"Pressure wash wood back deck",                                 crew:"Cam, Ashton",           hrs:3,    city:"Marietta",       rev:"$220"     },
  { n:36, date:"Feb 25 '26", svc:"Auto Detailing",   desc:"Complete car detail with steam clean",                        crew:"Cam, Ashton",           hrs:2,    city:"Gainesville",    rev:"$180"     },
  { n:37, date:"Mar 2 '26",  svc:"Boat Detailing",   desc:"Yamaha 30-ft boat full detail (2-day) — sold for client",      crew:"Cam, Ashton",           hrs:4,    city:"Buford",         rev:"$1,160"   },
  { n:38, date:"Mar 4 '26",  svc:"Landscaping",      desc:"Pinestraw front and sides of house",                          crew:"Cam, Ashton",           hrs:1.5,  city:"Suwanee",        rev:"$158"     },
  { n:39, date:"Mar 7 '26",  svc:"Landscaping",      desc:"Backyard pinestraw",                                          crew:"Cam",                   hrs:1.5,  city:"Marietta",       rev:"$120"     },
  { n:40, date:"Mar 7 '26",  svc:"Landscaping",      desc:"Mulch front and side of house",                               crew:"Cam",                   hrs:2,    city:"Buford",         rev:"$200"     },
  { n:41, date:"Mar 14 '26", svc:"Pro Bono",         desc:"Full nursing home move — Marietta to Suwanee",                crew:"Cam",                   hrs:8,    city:"Marietta",       rev:"Donated"  },
  { n:42, date:"Mar 23 '26", svc:"Pressure Washing", desc:"PW driveway, sidewalk, backyard & outdoor furniture — Château Élan referral (CE-004)", crew:"Cam", hrs:4, city:"Suwanee", rev:"$250" },
  { n:43, date:"Apr 8 '26",  svc:"Pressure Washing", desc:"Fence & retaining wall pressure wash — previous client",       crew:"Ashton",                hrs:4,    city:"Suwanee",        rev:"$700"     },
  { n:44, date:"Apr 12 '26", svc:"Pressure Washing", desc:"Driveway pressure wash — repeat client",                       crew:"Ashton, Brady",         hrs:2,    city:"Suwanee",        rev:"$450"     },
  { n:45, date:"Apr 15 '26", svc:"Landscaping",      desc:"Referral cut — connected client to Bo Bennett for landscaping", crew:"—",                    hrs:0,    city:"Suwanee",        rev:"$35"      },
  { n:46, date:"Apr 20 '26", svc:"Pressure Washing", desc:"Driveway pressure wash — word of mouth",                       crew:"Cam",                   hrs:1.5,  city:"Suwanee",        rev:"$250"     },
  { n:47, date:"Apr 10 '26", svc:"Auto Detailing",   desc:"Full car detail — repeat client",                              crew:"Ashton",                hrs:1.5,  city:"Suwanee",        rev:"$100"     },
  { n:48, date:"Apr 26 '26", svc:"Landscaping",      desc:"Mulch job — repeat client; Bo Bennett on crew",                crew:"Ashton, Bo",            hrs:4,    city:"Suwanee",        rev:"$600"     },
  { n:49, date:"May 3 '26",  svc:"Boat Detailing",   desc:"Boat detail — door hanger referral (Ashton sourced, Cam executed)", crew:"Cam",             hrs:3,    city:"Suwanee",        rev:"$320"     },
  { n:50, date:"May 10 '26", svc:"Auto Detailing",   desc:"Full car detail — recurring client (~every 3 weeks)",          crew:"Ashton",                hrs:1.5,  city:"Suwanee",        rev:"$100"     },
  { n:51, date:"May 15 '26", svc:"Pro Bono",         desc:"Full interior painting — 3-day job for Mary Ranieri (post-surgery, planned 5+ yrs)", crew:"Cam", hrs:24, city:"Suwanee", rev:"Donated" },
]

// ── Crew roster ────────────────────────────────────────────────────────────────
const CREW = [
  { name:'Cameron Camarotti', title:'Founder & Operations Lead',      services:'All services · Pricing · Scheduling · Sales · Customer Relations', since:'Jan 2025', jobs:'38+' },
  { name:'Ashton Patterson',  title:'Co-Founder & Lead Technician',   services:'Auto & Boat Detailing · Pressure Washing · Moving · Landscaping',   since:'Jan 2025', jobs:'30+' },
  { name:'Wynn',              title:'Senior Crew Member',              services:'Moving · Labor · Pressure Washing',                                 since:'Jan 2025', jobs:'15+' },
  { name:'Landon',            title:'Crew Member',                     services:'Landscaping · Labor · Moving',                                      since:'Mar 2025', jobs:'5+'  },
  { name:'Trent',             title:'Crew Member',                     services:'Landscaping · Storm Cleanup · Labor',                               since:'Jun 2025', jobs:'3+'  },
  { name:'Jacob / Brady',     title:'Flex Crew',                       services:'Storm Cleanup · Labor · Moving',                                    since:'Jun 2025', jobs:'2–3' },
]

// ── Quarterly taxes ────────────────────────────────────────────────────────────
const QUARTERS = [
  { q:'Q1 Jan–Mar', amount:'$728', due:'Apr 15, 2026' },
  { q:'Q2 Apr–Jun', amount:'$728', due:'Jun 16, 2026' },
  { q:'Q3 Jul–Sep', amount:'$728', due:'Sep 15, 2026' },
  { q:'Q4 Oct–Dec', amount:'$728', due:'Jan 15, 2027' },
]

// ═══════════════════════════════════════════════════════════════════════════════
export default function VaultPage() {
  const [input,    setInput]    = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error,    setError]    = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (input === PASSWORD) {
      setUnlocked(true)
      setError(false)
    } else {
      setError(true)
      setInput('')
    }
  }

  if (!unlocked) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ backgroundColor: BG }}
      >
        <div className="flex flex-col items-center gap-8 w-full max-w-xs px-6">
          <div className="flex flex-col items-center gap-1">
            <span
              className="font-display font-black text-5xl tracking-[-0.04em] leading-none"
              style={{ color: CARD }}
            >
              AAS
            </span>
            <span
              className="font-mono text-[9px] uppercase tracking-[0.16em]"
              style={{ color: 'rgba(245,241,232,0.45)' }}
            >
              Founder Vault
            </span>
          </div>
          <p
            className="font-mono text-[9px] text-center leading-relaxed"
            style={{ color: 'rgba(245,241,232,0.4)' }}
          >
            This section contains the full financial model, P&amp;L, job analytics, and operating metrics. Shared privately for recruiter and college application review.
          </p>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            <input
              type="password"
              value={input}
              onChange={e => { setInput(e.target.value); setError(false) }}
              placeholder="Access code"
              autoFocus
              className="w-full font-mono text-sm px-4 py-3 outline-none border"
              style={{
                backgroundColor: BG_DIM,
                borderColor: error ? '#C0624A' : 'rgba(245,241,232,0.18)',
                color: CARD,
                caretColor: CARD,
              }}
            />
            {error && (
              <span
                className="font-mono text-[9px] uppercase tracking-[0.14em]"
                style={{ color: '#C0624A' }}
              >
                Incorrect. Try again.
              </span>
            )}
            <button
              type="submit"
              className="font-mono text-[10px] uppercase tracking-[0.14em] py-3 transition-opacity hover:opacity-80"
              style={{ backgroundColor: CARD, color: ACCENT }}
            >
              Unlock Dashboard
            </button>
          </form>
          <p
            className="font-mono text-[8px] text-center"
            style={{ color: 'rgba(245,241,232,0.25)' }}
          >
            Tip: Navigate directly to yoursite.com/#founder
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: BG }}>

      {/* ── Header ────────────────────────────────────────────────────────────── */}
      <div className="border-b px-8 md:px-14 py-5 flex items-center justify-between" style={{ borderColor: BORDER }}>
        <div className="flex flex-col gap-0.5">
          <span className="font-display font-black text-2xl tracking-[-0.03em] leading-none" style={{ color: CARD }}>
            The Founder Vault
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em]" style={{ color: 'rgba(245,241,232,0.4)' }}>
            Cameron Camarotti · AAS Master Tracker v5 · Jan 2025 – May 2026
          </span>
        </div>
        <Link href="/" className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: 'rgba(245,241,232,0.35)' }}>
          ← Site
        </Link>
      </div>

      <div className="px-8 md:px-14 py-12 flex flex-col gap-14 max-w-6xl mx-auto">

        {/* ── KPI hero row ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {KPI_CARDS.map(({ value, label, sub }) => (
            <div key={label} className="flex flex-col gap-2 px-7 py-7 border" style={{ backgroundColor: CARD, borderColor: 'rgba(26,26,20,0.12)' }}>
              <span className="font-mono text-[8px] uppercase tracking-[0.16em]" style={{ color: MUTED }}>{label}</span>
              <span className="font-display font-black leading-none tracking-[-0.03em]" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: TEXT }}>{value}</span>
              <span className="font-mono text-[9px] leading-snug" style={{ color: MUTED }}>{sub}</span>
            </div>
          ))}
        </div>

        {/* ── Secondary KPI grid ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SECONDARY_CARDS.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-2 px-5 py-5 border" style={{ backgroundColor: BG_DIM, borderColor: BORDER }}>
              <span className="font-mono text-[8px] uppercase tracking-[0.13em] leading-snug" style={{ color: FAINT }}>{label}</span>
              <span className="font-mono text-xl leading-none tabular-nums" style={{ color: CARD }}>{value}</span>
            </div>
          ))}
        </div>

        {/* ── Founder's Statement ─────────────────────────────────────────────── */}
        <Section title="Founder's Statement">
          <div className="border px-8 py-8" style={{ borderColor: BORDER }}>
            <p className="font-mono text-[10px] leading-loose mb-6" style={{ color: LIGHT }}>
              AAS started in January 2025 with a $330 moving job and three people who had never run a business. By May 2026 we had completed 54 jobs across 15+ cities, generated $17,400 in gross revenue at an 82.1% net margin after all overhead, donated $3,000 in pro-bono labor to community members in need, and built a pricing model from AP Calculus concepts that generates every quote mathematically.
            </p>
            <p className="font-mono text-[10px] leading-loose mb-6" style={{ color: LIGHT }}>
              I also spent one summer leading a 4-person sales team to approximately $80,000 in residential tree service revenue — which taught me more about high-ticket sales, territory management, and persuasion under pressure than any classroom could. I work at Château Élan Winery &amp; Resort in Braselton, where I observe premium service operations and the expectations of high-net-worth clients firsthand. I play varsity football at Mill Creek High School in the toughest classification in Georgia, where my teammates elected me to the Leadership Council. And I was specifically asked — not just assigned — to coach a special needs youth team at i9 Sports, which taught me more about communication and human judgment than anything I've done in business.
            </p>
            <p className="font-mono text-[10px] leading-loose mb-6" style={{ color: LIGHT }}>
              Everything in this vault is real. Every number is sourced from the AAS Master Tracker spreadsheet. Every job has a date, a customer, a crew log, and a revenue figure. I built this not to impress anyone — I built it because this is how I actually think about my business, and I wanted that thinking to be visible.
            </p>
            <div className="border-t pt-5" style={{ borderColor: BORDER }}>
              <span className="font-mono text-[9px]" style={{ color: FAINT }}>
                Cameron Camarotti · Founder, All Around Services · Mill Creek High School &apos;27 · (470) 272-8228 · cameron.e.camarotti@gmail.com
              </span>
            </div>
          </div>
        </Section>

        {/* ── P&L ─────────────────────────────────────────────────────────────── */}
        <Section title="P&L — IRS Schedule C · 2025 Tax Year">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px]">
              <tbody>
                {PL_ROWS.map((row, i) => (
                  <tr key={i} className="border-b" style={{ borderColor: BORDER }}>
                    <td
                      className="py-3 font-mono text-[9px] uppercase tracking-[0.08em]"
                      style={{
                        color: row.bold ? CARD : LIGHT,
                        paddingLeft: row.indent ? '1.5rem' : '0',
                        fontWeight: row.bold ? 700 : 400,
                      }}
                    >
                      {row.label}
                    </td>
                    <td
                      className="py-3 font-mono text-[9px] tabular-nums text-right"
                      style={{
                        color: row.bold ? CARD : LIGHT,
                        fontWeight: row.bold ? 700 : 400,
                      }}
                    >
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border px-5 py-4 mt-4" style={{ borderColor: 'rgba(192,98,74,0.4)', backgroundColor: 'rgba(192,98,74,0.08)' }}>
            <p className="font-mono text-[9px]" style={{ color: 'rgba(192,98,74,0.9)' }}>
              ⚠ $1,816 set aside for SE tax. File Form 1040 + Schedule C + Schedule SE.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {QUARTERS.map(({ q, amount, due }) => (
              <div key={q} className="border px-4 py-4 flex flex-col gap-1" style={{ borderColor: BORDER, backgroundColor: BG_DIM }}>
                <span className="font-mono text-[8px] uppercase tracking-[0.1em]" style={{ color: FAINT }}>{q}</span>
                <span className="font-mono text-lg tabular-nums" style={{ color: CARD }}>{amount}</span>
                <span className="font-mono text-[8px]" style={{ color: FAINT }}>Due {due}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Monthly Revenue Trend ────────────────────────────────────────────── */}
        <Section title="Revenue by Month — Jan 2025 – May 2026">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Peak Month',       value: '$3,330',  sub: 'Jun 2025' },
              { label: 'Q1 2025 Revenue',  value: '$1,295',  sub: 'Jan–Mar 2025' },
              { label: 'Q1 2026 Revenue',  value: '$2,458',  sub: 'Jan–Mar 2026' },
              { label: 'Q1 YoY Growth',    value: '+89.8%',  sub: 'Year-over-year' },
            ].map(({ label, value, sub }) => (
              <div key={label} className="flex flex-col gap-1 px-5 py-5 border" style={{ backgroundColor: BG_DIM, borderColor: BORDER }}>
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] leading-snug" style={{ color: FAINT }}>{label}</span>
                <span className="font-mono text-xl leading-none tabular-nums" style={{ color: CARD }}>{value}</span>
                <span className="font-mono text-[8px]" style={{ color: FAINT }}>{sub}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {MONTHLY.map(({ month, rev, pct }) => (
              <div key={month} className="flex items-center gap-3">
                <span className="font-mono text-[8px] uppercase tracking-[0.06em] w-12 flex-shrink-0" style={{ color: FAINT }}>{month}</span>
                <div className="flex-1 h-4 overflow-hidden" style={{ backgroundColor: 'rgba(245,241,232,0.06)' }}>
                  <div
                    className="h-full"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: pct === 100 ? '#6aaf6a' : CARD,
                      opacity: pct === 100 ? 1 : 0.55,
                    }}
                  />
                </div>
                <span className="font-mono text-[9px] tabular-nums w-14 text-right flex-shrink-0" style={{ color: LIGHT }}>${rev.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Service Revenue Breakdown ────────────────────────────────────────── */}
        <Section title="Service Revenue Breakdown — All 50 Paid Jobs">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b" style={{ borderColor: BORDER }}>
                  {['Service', 'Jobs', 'Revenue', 'Avg/Job', 'Rev/Man-Hr'].map(h => (
                    <th key={h} className="pb-3 font-mono text-[8px] uppercase tracking-[0.1em] text-left" style={{ color: FAINT }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SERVICE_MIX.map(({ label, jobs, revenue, avgJob, revPerHr }) => {
                  const pct = (revenue / TOTAL_REV) * 100
                  return (
                    <tr key={label} className="border-b" style={{ borderColor: BORDER }}>
                      <td className="py-3 font-mono text-[9px]" style={{ color: CARD }}>
                        <div className="flex flex-col gap-1">
                          {label}
                          <div className="h-px" style={{ width: `${pct}%`, backgroundColor: CARD, opacity: 0.4 }} />
                        </div>
                      </td>
                      <td className="py-3 font-mono text-[9px] tabular-nums" style={{ color: LIGHT }}>{jobs}</td>
                      <td className="py-3 font-mono text-[9px] tabular-nums" style={{ color: CARD }}>${revenue.toLocaleString()}</td>
                      <td className="py-3 font-mono text-[9px] tabular-nums" style={{ color: LIGHT }}>${avgJob}</td>
                      <td className="py-3 font-mono text-[9px] tabular-nums" style={{ color: LIGHT }}>${revPerHr}</td>
                    </tr>
                  )
                })}
                <tr>
                  <td className="pt-4 font-mono text-[9px]" style={{ color: CARD, fontWeight: 700 }}>Total</td>
                  <td className="pt-4 font-mono text-[9px] tabular-nums" style={{ color: CARD, fontWeight: 700 }}>54</td>
                  <td className="pt-4 font-mono text-[9px] tabular-nums" style={{ color: CARD, fontWeight: 700 }}>$17,400</td>
                  <td className="pt-4 font-mono text-[9px] tabular-nums" style={{ color: CARD, fontWeight: 700 }}>$348</td>
                  <td className="pt-4 font-mono text-[9px] tabular-nums" style={{ color: CARD, fontWeight: 700 }}>$44.50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── Lead Source + Geographic ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Section title="Lead Source → Revenue">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: BORDER }}>
                  {['Source', 'Revenue', '%'].map(h => (
                    <th key={h} className="pb-3 font-mono text-[8px] uppercase tracking-[0.1em] text-left" style={{ color: FAINT }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LEAD_SOURCES.map(({ source, revenue, pct }) => (
                  <tr key={source} className="border-b" style={{ borderColor: BORDER }}>
                    <td className="py-2.5 font-mono text-[9px]" style={{ color: LIGHT }}>{source}</td>
                    <td className="py-2.5 font-mono text-[9px] tabular-nums" style={{ color: CARD }}>${revenue.toLocaleString()}</td>
                    <td className="py-2.5 font-mono text-[9px] tabular-nums" style={{ color: FAINT }}>{pct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section title="Geographic Revenue — Top Markets">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: BORDER }}>
                  {['City / Area', 'Jobs', 'Revenue'].map(h => (
                    <th key={h} className="pb-3 font-mono text-[8px] uppercase tracking-[0.1em] text-left" style={{ color: FAINT }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {GEO_REVENUE.map(({ city, jobs, revenue }) => (
                  <tr key={city} className="border-b" style={{ borderColor: BORDER }}>
                    <td className="py-2.5 font-mono text-[9px]" style={{ color: LIGHT }}>{city}</td>
                    <td className="py-2.5 font-mono text-[9px] tabular-nums" style={{ color: LIGHT }}>{jobs}</td>
                    <td className="py-2.5 font-mono text-[9px] tabular-nums" style={{ color: CARD }}>${revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        </div>

        {/* ── AAS Cares ────────────────────────────────────────────────────────── */}
        <Section title="AAS Cares — Community Pro-Bono Program">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Total Donated',   value: '$3,000'   },
              { label: 'Hours Given',     value: '36.5 hrs' },
              { label: 'Goal by 2027',    value: '$10,000'  },
            ].map(({ label, value }) => (
              <div key={label} className="border px-5 py-5" style={{ borderColor: BORDER, backgroundColor: BG_DIM }}>
                <span className="block font-mono text-[8px] uppercase tracking-[0.12em] mb-1" style={{ color: FAINT }}>{label}</span>
                <span className="font-mono text-xl" style={{ color: CARD }}>{value}</span>
              </div>
            ))}
          </div>
          <div className="border-b mb-4" style={{ borderColor: BORDER }}>
            <div className="h-2 mb-2" style={{ backgroundColor: 'rgba(245,241,232,0.1)' }}>
              <div className="h-2" style={{ width: '30%', backgroundColor: '#E57373' }} />
            </div>
            <p className="font-mono text-[8px] mb-4" style={{ color: FAINT }}>$3,000 / $10,000 · 30% complete</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b" style={{ borderColor: BORDER }}>
                  {['Date', 'Recipient', 'Work Done', 'Hours', 'Value'].map(h => (
                    <th key={h} className="pb-3 font-mono text-[8px] uppercase tracking-[0.1em] text-left" style={{ color: FAINT }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CARES_JOBS.map((job, i) => (
                  <tr key={i} className="border-b" style={{ borderColor: BORDER }}>
                    <td className="py-3 font-mono text-[9px]" style={{ color: LIGHT }}>{job.date}</td>
                    <td className="py-3 font-mono text-[9px]" style={{ color: CARD }}>{job.recipient}</td>
                    <td className="py-3 font-mono text-[9px]" style={{ color: LIGHT }}>{job.work}</td>
                    <td className="py-3 font-mono text-[9px] tabular-nums" style={{ color: LIGHT }}>{job.hours}</td>
                    <td className="py-3 font-mono text-[9px] tabular-nums" style={{ color: '#E57373' }}>{job.value}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={4} className="pt-3 font-mono text-[9px]" style={{ color: CARD, fontWeight: 700 }}>Total Donated</td>
                  <td className="pt-3 font-mono text-[9px] tabular-nums" style={{ color: '#E57373', fontWeight: 700 }}>$3,000 / 36.5 hrs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── Crew Roster ──────────────────────────────────────────────────────── */}
        <Section title="Crew Roster — All Around Services · Core Team">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b" style={{ borderColor: BORDER }}>
                  {['Name', 'Title', 'Primary Services', 'Since', 'Jobs'].map(h => (
                    <th key={h} className="pb-3 font-mono text-[8px] uppercase tracking-[0.1em] text-left" style={{ color: FAINT }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CREW.map(({ name, title, services, since, jobs }) => (
                  <tr key={name} className="border-b" style={{ borderColor: BORDER }}>
                    <td className="py-3 font-mono text-[9px]" style={{ color: CARD, fontWeight: 700 }}>{name}</td>
                    <td className="py-3 font-mono text-[9px]" style={{ color: LIGHT }}>{title}</td>
                    <td className="py-3 font-mono text-[9px]" style={{ color: FAINT }}>{services}</td>
                    <td className="py-3 font-mono text-[9px] tabular-nums" style={{ color: LIGHT }}>{since}</td>
                    <td className="py-3 font-mono text-[9px] tabular-nums" style={{ color: CARD }}>{jobs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-mono text-[8px] mt-4 leading-relaxed" style={{ color: FAINT }}>
            Core crew of 2–3 on standard jobs; full 4-person deployment on large moving or multi-day pressure washing contracts. Scheduling managed by Cameron based on job complexity, travel distance, and fatigue factor. All crew compensated per job. Flex crew called up for storm cleanup and overflow demand.
          </p>
        </Section>

        {/* ── Complete Job History ─────────────────────────────────────────────── */}
        <Section title="Complete Job History — All 54 Jobs · Jan 2025 – May 2026">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b" style={{ borderColor: BORDER }}>
                  {['#', 'Date', 'Service', 'Description', 'Crew', 'Hrs', 'City', 'Revenue'].map(h => (
                    <th key={h} className="pb-3 pr-4 font-mono text-[8px] uppercase tracking-[0.1em] text-left" style={{ color: FAINT }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {JOBS.map(job => (
                  <tr key={job.n} className="border-b" style={{ borderColor: BORDER }}>
                    <td className="py-2.5 pr-4 font-mono text-[8px] tabular-nums" style={{ color: FAINT }}>{job.n}</td>
                    <td className="py-2.5 pr-4 font-mono text-[8px] tabular-nums whitespace-nowrap" style={{ color: LIGHT }}>{job.date}</td>
                    <td className="py-2.5 pr-4 font-mono text-[8px] whitespace-nowrap" style={{ color: job.svc === 'Pro Bono' ? '#E57373' : CARD }}>{job.svc}</td>
                    <td className="py-2.5 pr-4 font-mono text-[8px]" style={{ color: LIGHT, maxWidth: '220px' }}>{job.desc}</td>
                    <td className="py-2.5 pr-4 font-mono text-[8px]" style={{ color: FAINT, whiteSpace: 'nowrap' }}>{job.crew}</td>
                    <td className="py-2.5 pr-4 font-mono text-[8px] tabular-nums" style={{ color: LIGHT }}>{job.hrs}</td>
                    <td className="py-2.5 pr-4 font-mono text-[8px] whitespace-nowrap" style={{ color: LIGHT }}>{job.city}</td>
                    <td className="py-2.5 font-mono text-[8px] tabular-nums" style={{ color: job.rev === 'Donated' ? '#E57373' : CARD, fontWeight: job.rev !== 'Donated' ? 700 : 400 }}>{job.rev}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={6} className="pt-4 font-mono text-[9px]" style={{ color: CARD, fontWeight: 700 }}>Total · 50 paid + 3 pro-bono · ~400 hrs · 15+ cities</td>
                  <td colSpan={2} className="pt-4 font-mono text-[9px] tabular-nums text-right" style={{ color: CARD, fontWeight: 700 }}>$17,400</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── Operations Manual Overview ───────────────────────────────────────── */}
        <Section title="Operations Manual — How AAS Runs Without Me">
          <div className="border px-6 py-5 mb-4" style={{ borderColor: BORDER }}>
            <p className="font-mono text-[10px] leading-loose" style={{ color: LIGHT }}>
              15-page internal document. I authored this so that All Around Services can run at full quality whether or not I am on site. This covers every repeatable process in the business. The existence of this manual means AAS is not dependent on any single person. That&apos;s intentional — I&apos;m going to college. The business needs to keep running.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { sec: 'Section 1 — Quoting & Pricing',   detail: 'How to use the 8-variable cost function. What inputs to collect on-site. When to apply the demand coefficient. How to handle discount requests. Minimum margin thresholds per service category.' },
              { sec: 'Section 2 — Customer Acquisition', detail: 'Facebook ad setup and targeting. Door hanger placement strategy by ZIP code. How to respond to a Nextdoor or Messenger inquiry. Conversion script for first contact. Follow-up timing and close rate tracking.' },
              { sec: 'Section 3 — Service Standards',    detail: 'Job-by-job procedure for each service category. What equipment to load. Setup and teardown checklist. Quality inspection before leaving site. Photo documentation requirement.' },
              { sec: 'Section 4 — Crew Management',      detail: 'How to assign crew per job type and size. Scheduling framework. Crew communication protocol. How to handle a no-show. Fatigue factor monitoring on multi-hour jobs.' },
              { sec: 'Section 5 — Financial Tracking',   detail: 'How to log a job in the Master Tracker. Revenue, expense, and margin fields explained. How to calculate the tax set-aside per job. Quarterly payment schedule. Equipment depreciation tracking.' },
              { sec: 'Section 6 — AAS Cares Protocol',   detail: 'How to identify and vet pro-bono requests. Documentation requirements for donated jobs. How to calculate and record market value of donated labor. Community relationship management.' },
            ].map(({ sec, detail }) => (
              <div key={sec} className="border px-5 py-5" style={{ borderColor: BORDER, backgroundColor: BG_DIM }}>
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] mb-2" style={{ color: CARD, fontWeight: 700 }}>{sec}</p>
                <p className="font-mono text-[8px] leading-relaxed" style={{ color: FAINT }}>{detail}</p>
              </div>
            ))}
          </div>
          <div className="border px-5 py-4 mt-4" style={{ borderColor: BORDER }}>
            <p className="font-mono text-[8px]" style={{ color: FAINT }}>
              Full 15-page manual available to co-founder and crew leads. Not publicly distributed — contains pricing logic, supplier contacts, and customer acquisition strategy.
            </p>
          </div>
        </Section>

        {/* ── Contact ───────────────────────────────────────────────────────────── */}
        <div className="border px-8 py-8" style={{ borderColor: BORDER }}>
          <p className="font-mono text-[10px] italic leading-loose mb-6" style={{ color: LIGHT }}>
            &ldquo;All Around Services is more than a labor provider — it is a live laboratory for operational optimization. I built the pricing model from AP Calculus concepts, the route planner from operations research, and the financial tracker from scratch. This is what it looks like when you treat a home-services business as an engineering problem.&rdquo;
          </p>
          <p className="font-mono text-[9px]" style={{ color: FAINT }}>
            — Cameron Camarotti, Founder · Ashton Patterson, Co-Founder · All Around Services · Atlanta Metro, GA
          </p>
          <div className="flex flex-wrap gap-6 mt-5">
            <a href="tel:4702728228" className="font-mono text-[9px] hover:underline" style={{ color: LIGHT }}>(470) 272-8228</a>
            <a href="mailto:cameron.e.camarotti@gmail.com" className="font-mono text-[9px] hover:underline" style={{ color: LIGHT }}>cameron.e.camarotti@gmail.com</a>
            <a href="https://www.facebook.com/share/1CF1MoEuJE/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="font-mono text-[9px] hover:underline" style={{ color: LIGHT }}>Facebook</a>
          </div>
        </div>

      </div>

      {/* ── Footer ────────────────────────────────────────────────────────────── */}
      <div className="border-t px-8 md:px-14 py-6" style={{ borderColor: BORDER }}>
        <p className="font-mono text-[8px] uppercase tracking-[0.12em]" style={{ color: 'rgba(245,241,232,0.3)' }}>
          Compiled from AAS Master Tracker v4. Cameron Camarotti, Founder. Ashton Patterson, Co-Founder. Confidential.
        </p>
      </div>

    </div>
  )
}

// ── Helper ────────────────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="border-b pb-3" style={{ borderColor: 'rgba(245,241,232,0.15)' }}>
        <span className="font-mono text-[9px] uppercase tracking-[0.16em]" style={{ color: 'rgba(245,241,232,0.4)' }}>
          {title}
        </span>
      </div>
      {children}
    </div>
  )
}
