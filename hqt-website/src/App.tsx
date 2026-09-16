import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Markets } from './components/Markets'
import { Process } from './components/Process'
import { Products } from './components/Products'
import { Services } from './components/Services'
import { WhyUs } from './components/WhyUs'
import { useT } from './i18n'

export default function App() {
  const t = useT()
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy-950"
      >
        {t.common.skipToContent}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Products />
        <Markets />
        <WhyUs />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
