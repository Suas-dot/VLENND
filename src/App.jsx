import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import Process from './components/Process';

import CTA from './components/CTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div className="noise-overlay"></div>
      
      <main className="w-full min-h-screen selection:bg-vlennd-silver selection:text-vlennd-deep">
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
