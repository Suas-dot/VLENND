import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import Process from './components/Process';
import HeroBackground from './components/ui/HeroBackground';

import CTA from './components/CTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <HeroBackground />
      <div className="noise-overlay"></div>
      
      <main className="relative z-10 w-full min-h-screen selection:bg-vlennd-silver selection:text-vlennd-deep">
        <Navbar />
        <Hero />
        <SocialProof />
        <Features />
        <Process />

        <CTA />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}

export default App;
