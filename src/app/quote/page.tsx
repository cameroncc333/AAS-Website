'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'

const CITIES = [
  'Suwanee', 'Buford', 'Gainesville', 'Marietta', 'Decatur',
  'Dacula', 'Grayson', 'Monroe', 'Auburn', 'Flowery Branch',
  'Jefferson', 'Lake Hartwell', 'Lawrenceville', 'Duluth', 'Cumming',
]

const SERVICES = [
  'Moving',
  'Pressure Washing',
  'Auto Detailing',
  'Boat Detailing',
  'Landscaping',
  'Labor / Specialty',
]

const WHY = [
  '44 completed jobs across Atlanta Metro',
  'Same-day or next-day availability most weeks',
  '4-person crew — small jobs or full-day projects',
  'Transparent pricing, no surprise charges',
  '$1,250+ donated to community pro-bono work',
  'Student-founded, professionally operated',
]

const CREAM   = '#F5F1E8'
const BG      = 'oklch(95.5% 0.012 76)'
const CHARCOAL = 'oklch(14% 0.005 75)'
const GREEN   = 'oklch(37% 0.07 142)'
const CLAY    = 'oklch(77% 0.04 72)'

type FormState = {
  firstName: string
  lastName: string
  phone: string
  zip: string
  service: string
  description: string
  date: string
}

export default function QuotePage() {
  const [form, setForm] = useState<FormState>({
    firstName: '', lastName: '', phone: '', zip: '',
    service: '', description: '', date: '',
  })
  const [sent, setSent] = useState(false)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(
      `Quote Request — ${form.service || 'Service'} · ${form.firstName} ${form.lastName}`,
    )
    const body = encodeURIComponent(
      `Name: ${form.firstName} ${form.lastName}\n` +
      `Phone: ${form.phone}\n` +
      `Zip Code: ${form.zip}\n` +
      `Service Needed: ${form.service}\n` +
      `Job Description: ${form.description}\n` +
      `Preferred Date: ${form.date}`,
    )
    window.location.href =
      `mailto:cameron.e.camarotti@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <>
      <Nav lightBg />
      <main style={{ backgroundColor: BG }}>

        {/* ── Page header ─────────────────────────────────────────────────────── */}
        <section
          className="px-6 md:px-14 pt-32 pb-16 border-b"
          style={{ borderColor: CLAY }}
        >
          <span
            className="block font-mono text-[9px] uppercase tracking-[0.2em] mb-5"
            style={{ color: `${CHARCOAL} / 0.4` }}
          >
            Locations &amp; Quote
          </span>
          <h1
            className="font-display leading-[0.88] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: CHARCOAL }}
          >
            <span className="font-light italic">Let's get</span>
            <span className="font-black"> to work.</span>
          </h1>
          <p
            className="mt-5 font-mono text-[10px] uppercase tracking-[0.12em]"
            style={{ color: 'oklch(14% 0.005 75 / 0.45)' }}
          >
            Atlanta Metro, GA · Response within one business day
          </p>
        </section>

        {/* ── Service areas ────────────────────────────────────────────────────── */}
        <section
          className="px-6 md:px-14 py-14 border-b"
          style={{ borderColor: CLAY }}
        >
          <span
            className="block font-mono text-[9px] uppercase tracking-[0.18em] mb-8"
            style={{ color: 'oklch(14% 0.005 75 / 0.4)' }}
          >
            Service Areas — 15+ Cities &amp; Growing
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
            {CITIES.map(city => (
              <div
                key={city}
                className="border px-4 py-3"
                style={{ borderColor: CLAY }}
              >
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.1em]"
                  style={{ color: 'oklch(14% 0.005 75 / 0.7)' }}
                >
                  {city}
                </span>
              </div>
            ))}
          </div>
          <p
            className="font-mono text-[9px]"
            style={{ color: 'oklch(14% 0.005 75 / 0.4)' }}
          >
            Based in the Suwanee / Buford area. Don&apos;t see your city? Call or text — we travel for the right job.
          </p>
        </section>

        {/* ── Quote form + contact ─────────────────────────────────────────────── */}
        <section className="px-6 md:px-14 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 max-w-5xl">

            {/* Form */}
            <div>
              <span
                className="block font-mono text-[9px] uppercase tracking-[0.18em] mb-8"
                style={{ color: 'oklch(14% 0.005 75 / 0.4)' }}
              >
                Request a Quote
              </span>

              {sent ? (
                <div
                  className="border px-8 py-12 flex flex-col items-start gap-4"
                  style={{ borderColor: CLAY }}
                >
                  <span
                    className="font-display font-black text-4xl tracking-[-0.03em]"
                    style={{ color: GREEN }}
                  >
                    ✓ Sent
                  </span>
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.1em]"
                    style={{ color: 'oklch(14% 0.005 75 / 0.55)' }}
                  >
                    Cameron will reach out within one business day to confirm details and give you a final price.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="font-mono text-[10px] uppercase tracking-[0.12em] underline mt-2"
                    style={{ color: GREEN }}
                  >
                    Submit another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="First Name *">
                      <input
                        required
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        className="border px-4 py-3 font-mono text-sm outline-none bg-transparent w-full"
                        style={{ borderColor: CLAY, color: CHARCOAL }}
                      />
                    </Field>
                    <Field label="Last Name *">
                      <input
                        required
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        className="border px-4 py-3 font-mono text-sm outline-none bg-transparent w-full"
                        style={{ borderColor: CLAY, color: CHARCOAL }}
                      />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Phone *">
                      <input
                        required
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        className="border px-4 py-3 font-mono text-sm outline-none bg-transparent w-full"
                        style={{ borderColor: CLAY, color: CHARCOAL }}
                      />
                    </Field>
                    <Field label="Zip Code">
                      <input
                        name="zip"
                        value={form.zip}
                        onChange={handleChange}
                        className="border px-4 py-3 font-mono text-sm outline-none bg-transparent w-full"
                        style={{ borderColor: CLAY, color: CHARCOAL }}
                      />
                    </Field>
                  </div>
                  <Field label="Service Needed *">
                    <select
                      required
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="border px-4 py-3 font-mono text-sm outline-none bg-transparent w-full"
                      style={{
                        borderColor: CLAY,
                        color: form.service ? CHARCOAL : 'oklch(14% 0.005 75 / 0.4)',
                        backgroundColor: BG,
                      }}
                    >
                      <option value="">— Select a service —</option>
                      {SERVICES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Describe the Job *">
                    <textarea
                      required
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={4}
                      className="border px-4 py-3 font-mono text-sm outline-none bg-transparent resize-none w-full"
                      style={{ borderColor: CLAY, color: CHARCOAL }}
                    />
                  </Field>
                  <Field label="Preferred Date / Timeframe">
                    <input
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      placeholder="e.g. Next Saturday, ASAP, end of June"
                      className="border px-4 py-3 font-mono text-sm outline-none bg-transparent w-full"
                      style={{ borderColor: CLAY, color: CHARCOAL }}
                    />
                  </Field>

                  <button
                    type="submit"
                    className="group self-start flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] px-8 py-4 mt-2 transition-opacity duration-300 hover:opacity-80"
                    style={{ backgroundColor: GREEN, color: CREAM }}
                  >
                    Send My Request
                    <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-[4px]">→</span>
                  </button>

                  <p
                    className="font-mono text-[8px] leading-relaxed"
                    style={{ color: 'oklch(14% 0.005 75 / 0.35)' }}
                  >
                    Your info is only used to respond to your quote request. We never sell or spam. Ever.
                  </p>
                </form>
              )}
            </div>

            {/* Contact + why AAS */}
            <div className="flex flex-col gap-10">

              {/* Contact */}
              <div>
                <span
                  className="block font-mono text-[9px] uppercase tracking-[0.18em] mb-6"
                  style={{ color: 'oklch(14% 0.005 75 / 0.4)' }}
                >
                  Contact Us Directly
                </span>
                <div className="flex flex-col gap-5">
                  <ContactRow label="Call / Text">
                    <a
                      href="tel:4702728228"
                      className="font-display font-black text-xl tracking-[-0.02em] hover:opacity-80 transition-opacity"
                      style={{ color: GREEN }}
                    >
                      (470) 272-8228
                    </a>
                  </ContactRow>
                  <ContactRow label="Email">
                    <a
                      href="mailto:cameron.e.camarotti@gmail.com"
                      className="font-mono text-sm hover:underline"
                      style={{ color: CHARCOAL }}
                    >
                      cameron.e.camarotti@gmail.com
                    </a>
                  </ContactRow>
                  <ContactRow label="Facebook">
                    <a
                      href="https://www.facebook.com/share/1CF1MoEuJE/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group font-mono text-sm hover:underline"
                      style={{ color: CHARCOAL }}
                    >
                      Follow All Around Services
                      <span className="inline-block ml-1 transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
                    </a>
                  </ContactRow>
                  <ContactRow label="Google">
                    <a
                      href="https://www.google.com/search?q=All+Around+Services+ATL+Braselton+GA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group font-mono text-sm hover:underline"
                      style={{ color: CHARCOAL }}
                    >
                      Leave us a review
                      <span className="inline-block ml-1 transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
                    </a>
                  </ContactRow>
                </div>
              </div>

              {/* Payment */}
              <div className="border-t pt-8" style={{ borderColor: CLAY }}>
                <span
                  className="block font-mono text-[9px] uppercase tracking-[0.18em] mb-5"
                  style={{ color: 'oklch(14% 0.005 75 / 0.4)' }}
                >
                  Accepted Payment
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {['Venmo', 'Cash', 'Zelle', 'Check'].map(m => (
                    <div
                      key={m}
                      className="border px-3 py-3 text-center"
                      style={{ borderColor: CLAY }}
                    >
                      <span
                        className="font-mono text-[8px] uppercase tracking-[0.1em]"
                        style={{ color: 'oklch(14% 0.005 75 / 0.65)' }}
                      >
                        {m}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why AAS */}
              <div className="border-t pt-8" style={{ borderColor: CLAY }}>
                <span
                  className="block font-mono text-[9px] uppercase tracking-[0.18em] mb-5"
                  style={{ color: 'oklch(14% 0.005 75 / 0.4)' }}
                >
                  Why All Around Services
                </span>
                <ul className="flex flex-col gap-2.5">
                  {WHY.map(point => (
                    <li key={point} className="flex items-start gap-3">
                      <span style={{ color: GREEN, flexShrink: 0 }}>✓</span>
                      <span
                        className="font-mono text-[9px] uppercase tracking-[0.08em] leading-relaxed"
                        style={{ color: 'oklch(14% 0.005 75 / 0.65)' }}
                      >
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apply Now — crew applications */}
              <div className="border-t pt-8" style={{ borderColor: CLAY }}>
                <span
                  className="block font-mono text-[9px] uppercase tracking-[0.18em] mb-3"
                  style={{ color: 'oklch(14% 0.005 75 / 0.4)' }}
                >
                  Join the Crew
                </span>
                <p
                  className="font-mono text-[9px] leading-relaxed mb-5"
                  style={{ color: 'oklch(14% 0.005 75 / 0.55)' }}
                >
                  We occasionally hire reliable crew members for local jobs across Atlanta Metro. Send us a message and we&apos;ll keep you in mind.
                </p>
                <a
                  href="mailto:cameron.e.camarotti@gmail.com?subject=Crew Application — All Around Services"
                  className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] border px-6 py-3.5 transition-colors duration-300"
                  style={{ borderColor: CHARCOAL, color: CHARCOAL }}
                >
                  Apply Now
                  <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-[4px]">→</span>
                </a>
              </div>

            </div>
          </div>
        </section>

      </main>
    </>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="font-mono text-[8px] uppercase tracking-[0.14em]"
        style={{ color: 'oklch(14% 0.005 75 / 0.5)' }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span
        className="font-mono text-[9px] uppercase tracking-[0.1em] w-20 shrink-0"
        style={{ color: 'oklch(14% 0.005 75 / 0.4)' }}
      >
        {label}
      </span>
      {children}
    </div>
  )
}
