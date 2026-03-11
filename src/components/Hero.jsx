import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MousePointer2, Sparkles, Flame, PartyPopper } from 'lucide-react';
import HeroBackground from './ui/HeroBackground';

export default function Hero() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const mockupRef = useRef(null);
  const badgesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(headingRef.current, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.5 }
      )
      .fromTo('.subheadline', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8"
      )
      .fromTo(mockupRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.inOut' },
        "-=0.5"
      )
      .fromTo(badgesRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
        "-=0.5"
      )
      .fromTo('.cta-button',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8 },
        "-=0.3"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center pt-32 pb-16 overflow-hidden bg-vlennd-deep">
      <HeroBackground />
      
      {/* Background glow for the central display */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-vlennd-silver/5 blur-[120px] rounded-full pointer-events-none z-10" />

      <div className="relative z-20 flex flex-col items-center text-center px-4 mb-12">
        <h1 ref={headingRef} className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-vlennd-ivory max-w-4xl mx-auto leading-tight text-balance">
          El vodka que convierte la noche en<br /> <span className="text-vlennd-silver">experiencia.</span>
        </h1>
        <p className="subheadline mt-6 max-w-2xl text-lg md:text-xl text-vlennd-smoke font-sans font-medium text-balance leading-relaxed">
          Sabores intensos. Diseño premium.<br />
          El vodka listo para dominar la fiesta.
        </p>
      </div>

      <div 
        ref={mockupRef} 
        className="relative z-30 mx-auto mb-16 will-change-transform cursor-pointer"
        style={{ perspective: '1200px' }}
      >
        <div 
          className="relative w-64 md:w-[320px] h-[450px] md:h-[580px] rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.9)] border border-white/10 group"
          style={{ transform: 'rotateY(-8deg) rotateX(4deg)', transformStyle: 'preserve-3d' }}
        >
          {/* Integrated Video as the "Product" */}
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          >
            <source src="https://res.cloudinary.com/dgxip0hfu/video/upload/v1773263893/0311_bsmr13.mp4" type="video/mp4" />
          </video>
          
          {/* Elegant Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-vlennd-deep via-transparent to-vlennd-deep/20"></div>
          <div className="absolute inset-0 bg-vlennd-silver/5 mix-blend-overlay"></div>
          
          {/* Glossy Reflection Effect */}
          <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] transition-all duration-1000 group-hover:left-[100%]"></div>
        </div>
      </div>

      <div className="relative z-30 flex flex-wrap justify-center gap-4 md:gap-8 px-4 w-full">
        {[
          { icon: Sparkles, text: "Sabores únicos" },
          { icon: Flame, text: "Intensidad premium" },
          { icon: PartyPopper, text: "Listo para la fiesta" },
        ].map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div 
              key={idx}
              ref={el => badgesRef.current[idx] = el}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-vlennd-carbon/80 border border-white/5 backdrop-blur-sm"
            >
              <Icon className="w-5 h-5 text-vlennd-silver" />
              <span className="font-mono text-sm font-medium tracking-wide text-vlennd-ivory">{badge.text}</span>
            </div>
          );
        })}
      </div>

      <div className="cta-button relative z-30 mt-16">
        <button className="bg-silver-gradient text-vlennd-deep font-sans font-bold text-lg px-12 py-5 rounded-full hover:scale-[1.03] transition-transform duration-300 shadow-[0_8px_24px_rgba(209,213,219,0.3)] flex items-center gap-3">
          Comprar VLENND
        </button>
      </div>
    </section>
  );
}
