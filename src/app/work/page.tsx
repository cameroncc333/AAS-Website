import Nav from '@/components/Nav'

export const metadata = { title: 'Work — All Around Services' }

export default function WorkPage() {
  return (
    <>
      <Nav lightBg />
      <main
        className="min-h-screen pt-24 px-6 md:px-14"
        style={{ backgroundColor: 'oklch(95.5% 0.012 76)' }}
      >
        <span
          className="font-mono text-[9px] uppercase tracking-[0.16em]"
          style={{ color: 'oklch(14% 0.005 75 / 0.4)' }}
        >
          Coming soon
        </span>
      </main>
    </>
  )
}
