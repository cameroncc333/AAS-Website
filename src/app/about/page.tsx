import Nav from '@/components/Nav'
import Link from 'next/link'

export const metadata = { title: 'About — All Around Services' }

const BG      = 'oklch(95.5% 0.012 76)'
const CHARCOAL = 'oklch(14% 0.005 75)'
const GREEN   = 'oklch(37% 0.07 142)'
const CLAY    = 'oklch(77% 0.04 72)'
const CREAM   = '#F5F1E8'

const CREW = [
  { name: 'Cameron',       role: 'Founder · Lead Operator'      },
  { name: 'Ashton',        role: 'Co-Founder & Senior Crew'     },
  { name: 'Wynn',          role: 'Crew Member'                   },
  { name: 'Landon',        role: 'Field Crew'                    },
  { name: 'Trent',         role: 'Field Crew'                    },
  { name: 'Jacob / Brady', role: 'Field Crew'                    },
]

const STATS = [
  { value: '44',      label: 'Jobs Done'      },
  { value: '15+',     label: 'Cities Served'  },
  { value: "Jan '25", label: 'Founded'        },
  { value: '$1,250+', label: 'Donated'        },
]

export default function AboutPage() {
  return (
    <>
      <Nav lightBg />
      <main style={{ backgroundColor: BG }}>

        {/* ── Header ──────────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-14 pt-32 pb-16 border-b" style={{ borderColor: CLAY }}>
          <span
            className="block font-mono text-[9px] uppercase tracking-[0.2em] mb-5"
            style={{ color: 'oklch(14% 0.005 75 / 0.4)' }}
          >
            Student-Founded · Atlanta Metro · Since 2025
          </span>
          <h1
            className="font-display leading-[0.88] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: CHARCOAL }}
          >
            <span className="font-black">Built from</span>
            <br />
            <span className="font-light italic">the ground up.</span>
          </h1>
        </section>

        {/* ── Story ────────────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-14 py-16 border-b" style={{ borderColor: CLAY }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl">
            <div className="flex flex-col gap-5">
              <p className="font-sans text-base leading-[1.7]" style={{ color: 'oklch(14% 0.005 75 / 0.75)' }}>
                All Around Services was founded in January 2025 by Cameron Camarotti and Ashton Patterson — two high school students from Suwanee who decided to stop waiting and build a real company.
              </p>
              <p className="font-sans text-base leading-[1.7]" style={{ color: 'oklch(14% 0.005 75 / 0.75)' }}>
                What started as a single moving job for a neighbor grew into a five-vertical operation across the entire Atlanta Metro. From a Porsche Cayenne detail to a 30-ft Yamaha boat, from a French drain excavation to a full nursing home relocation donated free — the standard never changes.
              </p>
              <p className="font-sans text-base leading-[1.7]" style={{ color: 'oklch(14% 0.005 75 / 0.75)' }}>
                Every job is tracked, every dollar documented, and every crew member shows up ready to work no matter the job size.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="border px-6 py-7 flex flex-col gap-2"
                  style={{ borderColor: CLAY }}
                >
                  <span
                    className="font-display font-black leading-none tracking-[-0.03em]"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: CHARCOAL }}
                  >
                    {value}
                  </span>
                  <span
                    className="font-mono text-[8px] uppercase tracking-[0.14em]"
                    style={{ color: 'oklch(14% 0.005 75 / 0.45)' }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Crew ─────────────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-14 py-16 border-b" style={{ borderColor: CLAY }}>
          <span
            className="block font-mono text-[9px] uppercase tracking-[0.18em] mb-10"
            style={{ color: 'oklch(14% 0.005 75 / 0.4)' }}
          >
            The Crew
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {CREW.map(({ name, role }) => (
              <div
                key={name}
                className="border px-4 py-5 flex flex-col gap-1.5"
                style={{ borderColor: CLAY }}
              >
                <span
                  className="font-display font-black text-base tracking-[-0.01em]"
                  style={{ color: CHARCOAL }}
                >
                  {name}
                </span>
                <span
                  className="font-mono text-[8px] uppercase tracking-[0.08em] leading-relaxed"
                  style={{ color: 'oklch(14% 0.005 75 / 0.45)' }}
                >
                  {role}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── AAS Cares ────────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-14 py-16 border-b" style={{ borderColor: CLAY }}>
          <span
            className="block font-mono text-[9px] uppercase tracking-[0.18em] mb-5"
            style={{ color: 'oklch(14% 0.005 75 / 0.4)' }}
          >
            AAS Cares — Pro-Bono Program
          </span>
          <p
            className="font-sans text-base leading-[1.7] max-w-2xl mb-6"
            style={{ color: 'oklch(14% 0.005 75 / 0.75)' }}
          >
            Not every job has an invoice. We've donated over $1,250 in professional labor to community members and nursing home residents — completely free. Our goal is $10,000 donated by 2027.
          </p>
          <div className="flex flex-col gap-2">
            {[
              'Community members in need',
              'Nursing home residents & elderly neighbors',
              'Zero charge, full effort',
              '$1,250 donated so far — goal: $10,000 by 2027',
            ].map(point => (
              <div key={point} className="flex items-start gap-3">
                <span style={{ color: GREEN, flexShrink: 0 }}>✓</span>
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.08em]"
                  style={{ color: 'oklch(14% 0.005 75 / 0.65)' }}
                >
                  {point}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Social + Contact ─────────────────────────────────────────────────── */}
        <section className="px-6 md:px-14 py-16 border-b" style={{ borderColor: CLAY }}>
          <span
            className="block font-mono text-[9px] uppercase tracking-[0.18em] mb-8"
            style={{ color: 'oklch(14% 0.005 75 / 0.4)' }}
          >
            Follow &amp; Connect
          </span>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.facebook.com/share/1CF1MoEuJE/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] border px-8 py-4 transition-opacity duration-300 hover:opacity-80"
              style={{ borderColor: CHARCOAL, color: CHARCOAL }}
            >
              Follow Us on Facebook
              <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-[4px]">→</span>
            </a>
            <a
              href="https://www.google.com/search?q=All+Around+Services+ATL+Braselton+GA"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] border px-8 py-4 transition-opacity duration-300 hover:opacity-80"
              style={{ borderColor: CLAY, color: CHARCOAL }}
            >
              Leave a Google Review
              <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-[4px]">→</span>
            </a>
          </div>
        </section>

        {/* ── Apply Now — Join the Crew ─────────────────────────────────────────── */}
        <section className="px-6 md:px-14 py-16">
          <span
            className="block font-mono text-[9px] uppercase tracking-[0.18em] mb-5"
            style={{ color: 'oklch(14% 0.005 75 / 0.4)' }}
          >
            Join the Crew
          </span>
          <p
            className="font-sans text-base leading-[1.7] max-w-xl mb-8"
            style={{ color: 'oklch(14% 0.005 75 / 0.7)' }}
          >
            We occasionally bring on reliable, hard-working crew members for jobs across Atlanta Metro. If you want in, send us a message. We pay per job and schedule around your availability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:cameron.e.camarotti@gmail.com?subject=Crew Application — All Around Services"
              className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] px-8 py-4 transition-opacity duration-300 hover:opacity-80"
              style={{ backgroundColor: GREEN, color: CREAM }}
            >
              Apply Now
              <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-[4px]">→</span>
            </a>
            <Link
              href="/quote"
              className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] border px-8 py-4 transition-opacity duration-300 hover:opacity-80"
              style={{ borderColor: CLAY, color: CHARCOAL }}
            >
              Get a Quote
              <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-[4px]">→</span>
            </Link>
          </div>
        </section>

      </main>
    </>
  )
}
