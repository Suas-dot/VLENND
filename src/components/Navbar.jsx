import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    if (menuOpen) {
      gsap.fromTo(menuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
      gsap.fromTo('.mobile-link',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.08, ease: 'power2.out', delay: 0.15 }
      );
    }
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-50 transition-all duration-500 ease-out border ${
          menuOpen
            ? 'rounded-3xl bg-vlennd-carbon/95 backdrop-blur-xl border-vlennd-silver/20 shadow-[0_0_30px_rgba(209,213,219,0.08)] py-4'
            : scrolled 
              ? 'rounded-full bg-vlennd-carbon/80 backdrop-blur-md border-vlennd-silver/20 shadow-[0_0_20px_rgba(209,213,219,0.05)] py-4' 
              : 'rounded-full bg-transparent border-transparent py-5'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10">
          <a href="#" className="flex items-center gap-2 font-heading text-2xl md:text-3xl font-bold tracking-wider text-vlennd-ivory">
            <img src="/logo-vlennd.png" alt="VLENND logo" className="w-6 h-6 md:w-8 md:h-8 object-contain brightness-0 invert flex-shrink-0" />
            VLENND
          </a>

          <div className="hidden md:flex items-center gap-10 font-sans font-medium text-base text-vlennd-ivory/80">
            <a href="#sabores" className="hover:text-vlennd-silver hover:-translate-y-[1px] transition-all duration-300">Sabores</a>
            <a href="#experiencia" className="hover:text-vlennd-silver hover:-translate-y-[1px] transition-all duration-300">Experiencia</a>
            <a href="#faq" className="hover:text-vlennd-silver hover:-translate-y-[1px] transition-all duration-300">FAQ</a>
          </div>

          <button className="hidden md:block bg-silver-gradient text-vlennd-deep font-sans font-semibold text-base px-8 py-3 rounded-full hover:scale-[1.03] transition-transform duration-300 shadow-[0_4px_14px_rgba(209,213,219,0.25)]">
            Comprar ahora
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            aria-label="Menú"
          >
            <div className="flex flex-col items-center justify-center gap-[6px]">
              <span className={`block w-6 h-[2px] bg-vlennd-ivory rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
              <span className={`block w-6 h-[2px] bg-vlennd-ivory rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : 'opacity-100'}`} />
              <span className={`block w-6 h-[2px] bg-vlennd-ivory rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div ref={menuRef} className="md:hidden px-6 pt-6 pb-8">
            <div className="flex flex-col gap-1">
              {[
                { href: '#sabores', label: 'Sabores' },
                { href: '#experiencia', label: 'Experiencia' },
                { href: '#faq', label: 'FAQ' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="mobile-link font-sans font-medium text-xl text-vlennd-ivory/80 hover:text-vlennd-silver py-3 px-4 rounded-xl hover:bg-white/5 transition-all duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-6 px-4">
              <a
                href="#"
                onClick={handleLinkClick}
                className="mobile-link block w-full text-center bg-silver-gradient text-vlennd-deep font-sans font-semibold text-base px-8 py-3.5 rounded-full shadow-[0_4px_14px_rgba(209,213,219,0.25)]"
              >
                Comprar ahora
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Backdrop overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}
    </>
  );
}
