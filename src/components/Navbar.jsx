import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Initial fade down
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      ref={navRef}
      className={`fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50 rounded-full transition-all duration-500 ease-out border ${
        scrolled 
          ? 'bg-vlennd-carbon/80 backdrop-blur-md border-vlennd-silver/20 shadow-[0_0_20px_rgba(209,213,219,0.05)] py-3' 
          : 'bg-transparent border-transparent py-4'
      }`}
    >
      <div className="flex items-center justify-between px-8">
        <a href="#" className="font-heading text-2xl font-bold tracking-wider text-vlennd-ivory">
          VLENND
        </a>

        <div className="hidden md:flex items-center gap-8 font-sans font-medium text-sm text-vlennd-ivory/80">
          <a href="#sabores" className="hover:text-vlennd-silver hover:-translate-y-[1px] transition-all duration-300">Sabores</a>
          <a href="#experiencia" className="hover:text-vlennd-silver hover:-translate-y-[1px] transition-all duration-300">Experiencia</a>
          <a href="#faq" className="hover:text-vlennd-silver hover:-translate-y-[1px] transition-all duration-300">FAQ</a>
        </div>

        <button className="bg-silver-gradient text-vlennd-deep font-sans font-semibold text-sm px-6 py-2.5 rounded-full hover:scale-[1.03] transition-transform duration-300 shadow-[0_4px_14px_rgba(209,213,219,0.25)]">
          Comprar ahora
        </button>
      </div>
    </nav>
  );
}
