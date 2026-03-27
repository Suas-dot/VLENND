import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import Process from './components/Process';
import HeroBackground from './components/ui/HeroBackground';
import { useState } from 'react';

import CTA from './components/CTA';
import Checkout from './components/Checkout';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { PACKS } from './data/packs';

const defaultBackgroundTheme = {
  base: '#0d0618',
  color1: '#1a0a2e',
  color2: '#2d1654'
};

function App() {
  const [selectedPack, setSelectedPack] = useState(
    PACKS.find((pack) => pack.id === 'premium') ?? PACKS[0]
  );
  const [backgroundTheme, setBackgroundTheme] = useState(defaultBackgroundTheme);

  const handleBuyNow = (pack) => {
    setSelectedPack(pack);

    window.requestAnimationFrame(() => {
      const checkout = document.getElementById('checkout');
      checkout?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleFlavorSelect = (flavor) => {
    if (!flavor) {
      return;
    }

    setBackgroundTheme({
      base: flavor.color,
      color1: flavor.color,
      color2: flavor.glow
    });
  };

  return (
    <>
      <HeroBackground theme={backgroundTheme} />
      <div className="noise-overlay"></div>
      
      <main id="top" className="relative z-10 w-full min-h-screen selection:bg-vlennd-silver selection:text-vlennd-deep">
        <Navbar onFlavorSelect={handleFlavorSelect} />
        <Hero onBuyNow={handleBuyNow} />
        <SocialProof />
        <Features />
        <Process />

        <CTA onBuyNow={handleBuyNow} />
        <Checkout
          selectedPack={selectedPack}
          availablePacks={PACKS}
          onSelectPack={setSelectedPack}
        />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}

export default App;
