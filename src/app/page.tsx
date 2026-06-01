import Loading from '@/components/Loading'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ByTheNumbers from '@/components/ByTheNumbers'
import InstantQuote from '@/components/InstantQuote'

export default function Home() {
  return (
    <>
      {/* Preload the mp4 for browsers that resolve it first (Safari, Chrome fallback) */}
      <link rel="preload" as="video" href="/videos/hero-explode.mp4" type="video/mp4" />
      <Loading />
      <Nav />
      <main>
        <Hero />
        <ByTheNumbers />
        <InstantQuote />
      </main>
    </>
  )
}
