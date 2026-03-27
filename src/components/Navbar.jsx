import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { FLAVORS } from '../data/flavors';

export default function Navbar({ onFlavorSelect }) {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [flavorsOpen, setFlavorsOpen] = useState(false);
  const [megaOpen, setMegaOpen]       = useState(false);
  const closeTimer  = useRef(null);
  const navRef      = useRef(null);
  const overlayRef  = useRef(null);
  const mainRef     = useRef(null);
  const flavorsRef  = useRef(null);

  /* ── scroll + entrance ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── mobile overlay open/close ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (menuOpen && overlayRef.current) {
      setFlavorsOpen(false);
      gsap.fromTo(overlayRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.45, ease: 'power3.out' }
      );
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* ── flavors submenu slide ── */
  useEffect(() => {
    if (!menuOpen) return;
    if (flavorsOpen && flavorsRef.current) {
      gsap.fromTo(flavorsRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.35, ease: 'power3.out' }
      );
    }
    if (!flavorsOpen && mainRef.current) {
      gsap.fromTo(mainRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.35, ease: 'power3.out' }
      );
    }
  }, [flavorsOpen, menuOpen]);

  const closeMenu = () => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        x: '100%', duration: 0.35, ease: 'power3.in',
        onComplete: () => { setMenuOpen(false); setFlavorsOpen(false); }
      });
    } else {
      setMenuOpen(false);
      setFlavorsOpen(false);
    }
  };

  const handleLinkClick = () => closeMenu();

  /* ── desktop mega hover ── */
  const openMega  = () => { clearTimeout(closeTimer.current); setMegaOpen(true); };
  const closeMega = () => { closeTimer.current = setTimeout(() => setMegaOpen(false), 120); };

  return (
    <>
      {/* ── Navbar pill ── */}
      <nav
        ref={navRef}
        className={`fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-50 transition-all duration-500 ease-out border ${
          megaOpen
            ? 'theme-nav-panel rounded-full bg-[#07010f]/90 md:backdrop-blur-2xl border-vlennd-silver/10 py-4'
            : scrolled
              ? 'theme-nav-panel rounded-full bg-vlennd-carbon/90 md:backdrop-blur-md border-vlennd-silver/20 shadow-[0_0_20px_rgba(209,213,219,0.05)] py-4'
              : 'rounded-full bg-transparent border-transparent py-5'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10">
          <a href="#top" className="flex items-center gap-2 text-vlennd-ivory">
            <img src="/logo-vlennd.png" alt="VLENND logo" className="w-6 h-6 md:w-[30px] md:h-[30px] object-contain brightness-0 invert flex-shrink-0 self-start mt-[5px]" />
            <div className="flex flex-col leading-none gap-[3px]">
              <span className="font-heading text-2xl md:text-3xl font-bold tracking-[0.35em]">VLENND</span>
              <span className="font-sans text-[9px] md:text-[10px] tracking-[0.2em] text-vlennd-smoke uppercase text-center">Sabor · Arte · Diversión</span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-2 font-sans font-medium text-lg text-vlennd-ivory/80">
            <div onMouseEnter={openMega} onMouseLeave={closeMega}>
              <a href="#sabores" className={`px-4 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1 ${megaOpen ? 'bg-white/10 text-vlennd-silver' : 'hover:bg-white/10 hover:text-vlennd-silver'}`}>
                Sabores
                <svg className={`w-3 h-3 opacity-50 transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
            <a href="#faq" className="px-4 py-1.5 rounded-full transition-all duration-300 hover:bg-white/10 hover:text-vlennd-silver">FAQ</a>
          </div>

          <a href="#checkout" className="hidden md:block bg-silver-gradient text-vlennd-deep font-sans font-semibold text-base px-8 py-3 rounded-full hover:scale-[1.03] transition-transform duration-300 shadow-[0_4px_14px_rgba(209,213,219,0.25)]">
            Comprar ahora
          </a>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(true)} className="md:hidden w-10 h-10 flex items-center justify-center" aria-label="Abrir menú">
            <div className="flex flex-col items-center justify-center gap-[6px]">
              <span className="block w-6 h-[2px] bg-vlennd-ivory rounded-full" />
              <span className="block w-6 h-[2px] bg-vlennd-ivory rounded-full" />
              <span className="block w-6 h-[2px] bg-vlennd-ivory rounded-full" />
            </div>
          </button>
        </div>
      </nav>

      {/* ── Mobile full-screen overlay ── */}
      {menuOpen && (
        <div
          ref={overlayRef}
          className="theme-mobile-overlay fixed inset-0 z-[60] md:hidden bg-[#0d0618] flex flex-col"
          style={{ transform: 'translateX(100%)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
            <a href="#top" onClick={closeMenu} className="flex items-center gap-2 text-vlennd-ivory">
              <img src="/logo-vlennd.png" alt="VLENND logo" className="w-5 h-5 object-contain brightness-0 invert" />
              <div className="flex flex-col leading-none gap-[2px]">
                <span className="font-heading text-xl font-bold tracking-[0.3em]">VLENND</span>
                <span className="font-sans text-[8px] tracking-[0.2em] text-vlennd-smoke uppercase text-center">Sabor · Arte · Diversión</span>
              </div>
            </a>
            <button onClick={closeMenu} className="w-10 h-10 flex items-center justify-center text-vlennd-ivory/60 hover:text-vlennd-ivory transition-colors" aria-label="Cerrar menú">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto relative">
            {/* Main menu */}
            {!flavorsOpen && (
              <div ref={mainRef} className="px-6 pt-8 pb-6 flex flex-col">
                <p className="font-sans text-[10px] tracking-[0.3em] text-vlennd-smoke uppercase mb-6">Menú</p>

                <button
                  onClick={() => setFlavorsOpen(true)}
                  className="flex items-center justify-between py-4 border-b border-white/5 group"
                >
                  <span className="font-heading text-2xl font-bold text-vlennd-ivory/80 group-hover:text-vlennd-ivory transition-colors tracking-wide uppercase">Sabores</span>
                  <ChevronRight className="w-5 h-5 text-vlennd-smoke group-hover:text-vlennd-silver transition-colors" />
                </button>

                <a href="#faq" onClick={handleLinkClick} className="flex items-center justify-between py-4 border-b border-white/5 group">
                  <span className="font-heading text-2xl font-bold text-vlennd-ivory/80 group-hover:text-vlennd-ivory transition-colors tracking-wide uppercase">FAQ</span>
                </a>

                <div className="mt-auto pt-10">
                  <a href="#checkout" onClick={handleLinkClick} className="block w-full text-center bg-silver-gradient text-vlennd-deep font-sans font-bold text-base py-4 rounded-full shadow-[0_4px_14px_rgba(209,213,219,0.25)]">
                    Comprar ahora
                  </a>
                </div>
              </div>
            )}

            {/* Sabores submenu */}
            {flavorsOpen && (
              <div ref={flavorsRef} className="px-6 pt-8 pb-6 flex flex-col">
                <button
                  onClick={() => setFlavorsOpen(false)}
                  className="flex items-center gap-2 font-sans text-sm tracking-widest text-vlennd-smoke hover:text-vlennd-ivory uppercase transition-colors mb-6"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Atrás
                </button>

                <p className="font-heading text-2xl font-bold text-vlennd-ivory tracking-wide uppercase mb-6">Sabores</p>

                {FLAVORS.map((f) => (
                  <a
                    key={f.label}
                    href={f.href}
                    onClick={(event) => {
                      event.preventDefault();
                      onFlavorSelect?.(f);
                      handleLinkClick();
                    }}
                    className="flex items-center justify-between py-4 border-b border-white/5 group"
                  >
                    <span className="font-heading text-xl font-bold text-vlennd-ivory/70 group-hover:text-vlennd-ivory transition-colors tracking-widest uppercase">
                      {f.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-vlennd-smoke/50 group-hover:text-vlennd-silver transition-colors" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Desktop mega menu ── */}
      <div
        onMouseEnter={openMega}
        onMouseLeave={closeMega}
        className={`hidden md:block fixed left-0 w-screen z-40 transition-all duration-300 ease-out ${megaOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ top: 0 }}
      >
        <div className="theme-mega-overlay absolute inset-0 bg-[#07010f]/95 backdrop-blur-2xl border-b border-white/5" />
        <div className="relative max-w-5xl mx-auto px-10 flex gap-12" style={{ paddingTop: '108px', paddingBottom: '40px' }}>

          <div className="w-52 flex flex-col justify-between flex-shrink-0">
            <div>
              <p className="font-heading text-3xl font-bold text-vlennd-ivory leading-tight" style={{ opacity: megaOpen ? 1 : 0, transform: megaOpen ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 0.4s ease, transform 0.4s ease', transitionDelay: megaOpen ? '130ms' : '0ms' }}>Nuestros<br />Sabores</p>
              <p className="font-sans text-sm text-vlennd-smoke mt-3 leading-relaxed" style={{ opacity: megaOpen ? 1 : 0, transform: megaOpen ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 0.4s ease, transform 0.4s ease', transitionDelay: megaOpen ? '180ms' : '0ms' }}>Vodka con carácter en cada variedad.</p>
            </div>
            <a href="#sabores" className="font-sans text-xs tracking-widest uppercase text-vlennd-smoke hover:text-vlennd-silver transition-colors duration-200 flex items-center gap-1 group/ver mt-10" style={{ opacity: megaOpen ? 1 : 0, transform: megaOpen ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 0.4s ease, transform 0.4s ease', transitionDelay: megaOpen ? '220ms' : '0ms' }}>
              Ver todos
              <svg className="w-3 h-3 transition-transform duration-200 group-hover/ver:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </a>
          </div>

          <div className="w-px bg-white/8 self-stretch" style={{ opacity: megaOpen ? 1 : 0, transition: 'opacity 0.5s ease', transitionDelay: megaOpen ? '100ms' : '0ms' }} />

          <div className="flex-1 grid grid-cols-5 gap-3">
            {FLAVORS.map((f) => (
              <a
                key={f.label}
                href={f.href}
                onClick={(event) => {
                  event.preventDefault();
                  onFlavorSelect?.(f);
                  setMegaOpen(false);
                }}
                className="relative rounded-2xl border border-white/10 overflow-hidden p-4 flex flex-col justify-between min-h-[170px]"
                style={{
                  opacity: megaOpen ? 1 : 0,
                  background: `linear-gradient(160deg, ${f.color}66 0%, ${f.glow}AA 100%)`
                }}
              >
                <img
                  src="/bottle-menu.png"
                  alt={`Botella ${f.label}`}
                  className="relative z-10 h-20 w-auto mx-auto object-contain"
                />
                <span className="relative z-10 font-sans text-[11px] tracking-[0.2em] uppercase font-semibold text-vlennd-ivory text-center">
                  {f.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
