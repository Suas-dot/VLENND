import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
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
  color2: '#2d1654',
  accent: '#D1D5DB',
  accentStrong: '#E5E7EB',
  accentSoft: 'rgba(209, 213, 219, 0.18)',
  accentBorder: 'rgba(209, 213, 219, 0.45)',
  accentGradientStart: '#E5E7EB',
  accentGradientEnd: '#9CA3AF',
  surfaceMain: 'rgba(19, 10, 34, 0.78)',
  surfaceAlt: 'rgba(16, 8, 32, 0.78)',
  surfaceSoft: 'rgba(11, 5, 21, 0.72)',
  surfaceBorder: 'rgba(209, 213, 219, 0.22)',
  surfaceShadow: 'rgba(209, 213, 219, 0.12)'
};

const hexToRgb = (hex) => {
  const cleaned = hex.replace('#', '');
  const normalized = cleaned.length === 3
    ? cleaned.split('').map((char) => char + char).join('')
    : cleaned;

  const int = Number.parseInt(normalized, 16);
  if (Number.isNaN(int)) {
    return { r: 209, g: 213, b: 219 };
  }

  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255
  };
};

const rgbToHex = ({ r, g, b }) =>
  `#${[r, g, b].map((value) => value.toString(16).padStart(2, '0')).join('')}`;

const mixColors = (hexA, hexB, weightB = 0.5) => {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const clamp = Math.max(0, Math.min(1, weightB));
  return rgbToHex({
    r: Math.round(a.r * (1 - clamp) + b.r * clamp),
    g: Math.round(a.g * (1 - clamp) + b.g * clamp),
    b: Math.round(a.b * (1 - clamp) + b.b * clamp)
  });
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

    const accent = mixColors(flavor.color, '#ffffff', 0.45);
    const accentStrong = mixColors(flavor.glow, '#ffffff', 0.55);
    const accentRgb = hexToRgb(accent);
    const surfaceMainHex = mixColors(flavor.color, '#0b0b0c', 0.58);
    const surfaceAltHex = mixColors(flavor.glow, '#0b0b0c', 0.62);
    const surfaceSoftHex = mixColors(flavor.color, '#0b0b0c', 0.7);
    const shadowRgb = hexToRgb(mixColors(flavor.glow, '#ffffff', 0.2));

    setBackgroundTheme({
      base: flavor.color,
      color1: flavor.color,
      color2: flavor.glow,
      accent,
      accentStrong,
      accentSoft: `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.18)`,
      accentBorder: `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.45)`,
      accentGradientStart: mixColors(accentStrong, '#ffffff', 0.2),
      accentGradientEnd: mixColors(flavor.glow, '#0b0b0c', 0.35),
      surfaceMain: `${surfaceMainHex}C7`,
      surfaceAlt: `${surfaceAltHex}C4`,
      surfaceSoft: `${surfaceSoftHex}B8`,
      surfaceBorder: `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.24)`,
      surfaceShadow: `rgba(${shadowRgb.r}, ${shadowRgb.g}, ${shadowRgb.b}, 0.2)`
    });
  };

  return (
    <>
      <HeroBackground theme={backgroundTheme} />
      <div className="noise-overlay"></div>
      
      <main
        id="top"
        className="theme-dynamic relative z-10 w-full min-h-screen selection:bg-vlennd-silver selection:text-vlennd-deep"
        style={{
          '--flavor-accent': backgroundTheme.accent,
          '--flavor-accent-strong': backgroundTheme.accentStrong,
          '--flavor-accent-soft': backgroundTheme.accentSoft,
          '--flavor-accent-border': backgroundTheme.accentBorder,
          '--flavor-accent-gradient-start': backgroundTheme.accentGradientStart,
          '--flavor-accent-gradient-end': backgroundTheme.accentGradientEnd,
          '--flavor-surface-main': backgroundTheme.surfaceMain,
          '--flavor-surface-alt': backgroundTheme.surfaceAlt,
          '--flavor-surface-soft': backgroundTheme.surfaceSoft,
          '--flavor-surface-border': backgroundTheme.surfaceBorder,
          '--flavor-surface-shadow': backgroundTheme.surfaceShadow
        }}
      >
        <Navbar onFlavorSelect={handleFlavorSelect} />
        <Hero onBuyNow={handleBuyNow} />
        <SocialProof />
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
