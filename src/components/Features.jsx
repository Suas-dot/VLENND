import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MousePointer2, Star } from 'lucide-react';

function FeatureToggle() {
  const [active, setActive] = useState(false);
  const glowRef = useRef(null);
  const thumbRef = useRef(null);

  const handleToggle = () => {
    const next = !active;
    setActive(next);
    onToggle(next);

    if (glowRef.current) {
      gsap.fromTo(glowRef.current,
        { scale: 0.8, opacity: 0.6 },
        { scale: 1.4, opacity: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
    if (thumbRef.current) {
      gsap.fromTo(thumbRef.current,
        { scale: 1.2 },
        { scale: 1, duration: 0.3, ease: 'back.out(2)' }
      );
    }
  };

  return (
    <div className={`relative p-8 rounded-[2rem] border overflow-hidden transition-colors duration-500 min-h-[400px] flex flex-col items-center justify-between ${active ? 'bg-vlennd-carbon border-vlennd-silver/40 shadow-[0_0_40px_rgba(209,213,219,0.1)]' : 'bg-[#0b0515] border-white/5'}`}>

      {/* Dynamic background glow */}
      <div className={`absolute top-0 right-0 w-64 h-64 bg-vlennd-silver/10 blur-[80px] transition-opacity duration-700 pointer-events-none ${active ? 'opacity-100' : 'opacity-0'}`} />

      <div className="w-full text-center relative z-10">
        <h3 className={`font-heading text-2xl font-bold transition-colors duration-300 ${active ? 'text-vlennd-silver' : 'text-vlennd-ivory'}`}>
          {active ? 'Noche con VLENND' : 'Noche normal'}
        </h3>
        <ul className="mt-8 space-y-4 font-sans text-vlennd-smoke transition-all duration-300">
          {!active ? (
            <>
              <li>Bebidas aburridas</li>
              <li>Sabores comunes</li>
              <li>Sin experiencia</li>
            </>
          ) : (
            <>
              <li className="text-vlennd-ivory">Sabores explosivos</li>
              <li className="text-vlennd-ivory">Experiencia premium</li>
              <li className="text-vlennd-ivory">Momentos memorables</li>
            </>
          )}
        </ul>
      </div>

      <div className="relative z-10 mt-8 w-max">
        <div
          onClick={() => setActive(!active)}
          className="w-16 h-8 bg-vlennd-deep rounded-full border border-white/10 flex items-center p-1 cursor-pointer"
        >
          <div className={`w-6 h-6 rounded-full bg-vlennd-silver transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${active ? 'translate-x-8' : 'translate-x-0'}`} />
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  { text: "El sabor a uva de VLENND es otro nivel.", author: "Andrés M.", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&w=100&q=80" },
  { text: "Nunca había probado vodka con tanto carácter.", author: "Daniela R.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=100&q=80" },
  { text: "VLENND se volvió obligatorio en nuestras fiestas.", author: "Mateo L.", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&w=100&q=80" }
];

function FeatureTestimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        onComplete: () => {
          setCurrentIndex((prev) => (prev + 1) % testimonials.length);
          gsap.fromTo(contentRef.current,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.3 }
          );
        }
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={cardRef} className="relative p-8 rounded-[2rem] border border-white/5 bg-[#100820] overflow-hidden min-h-[400px] flex flex-col items-center justify-center text-center">
      <div className="mb-6 flex space-x-1 justify-center">
        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-vlennd-silver fill-vlennd-silver" />)}
      </div>
      <div ref={contentRef} className="w-full">
        <p className="font-heading text-xl md:text-2xl text-vlennd-ivory italic leading-snug mb-8">
          "{testimonials[currentIndex].text}"
        </p>
        <div className="flex flex-col items-center">
          <img
            src={testimonials[currentIndex].avatar}
            alt="Avatar"
            className="w-12 h-12 rounded-full border border-vlennd-silver/30 object-cover mb-3"
          />
          <span className="font-sans text-sm font-semibold text-vlennd-smoke">
            — {testimonials[currentIndex].author}
          </span>
        </div>
      </div>
    </div>
  );
}

function FeatureCalendar() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const btnRef = useRef(null);
  const fridayRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      // Starting pos
      tl.set(cursorRef.current, { x: -80, y: 120 })
        .set(btnRef.current, { scale: 1, backgroundColor: 'transparent', color: '#9A9A9A' })

      // Move to Friday
      tl.to(cursorRef.current, { x: 30, y: -20, duration: 1, ease: 'power2.inOut' })
      // Simulate hover
      tl.to(fridayRef.current, { backgroundColor: '#D1D5DB', color: '#0B0B0C', duration: 0.2 })
      // Move to Button
      tl.to(cursorRef.current, { x: 0, y: 60, duration: 1, ease: 'power2.inOut', delay: 0.5 })
      // Simulate button click
      tl.to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
      tl.to(btnRef.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 }, "<")
      tl.to(btnRef.current, { backgroundImage: 'linear-gradient(135deg, #E5E7EB 0%, #9CA3AF 100%)', color: '#0B0B0C', duration: 0.2 }, "<")

      // Wait a bit
      tl.to({}, { duration: 1.5 })

      // Reset Friday visually
      tl.to(fridayRef.current, { backgroundColor: 'transparent', color: '#F5F5F3', duration: 0.2 }, "-=1")
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative p-8 rounded-[2rem] border border-white/5 bg-[#100820] overflow-hidden min-h-[400px] flex flex-col items-center justify-between">
      <div className="w-full">
        <h3 className="font-sans text-sm font-semibold text-vlennd-smoke mb-6 text-center uppercase tracking-widest">Planifica</h3>
        <div className="flex justify-between max-w-[200px] mx-auto text-sm font-mono text-vlennd-ivory/60">
          <span>J</span>
          <span ref={fridayRef} className="w-8 h-8 flex items-center justify-center rounded-full transition-colors">V</span>
          <span>S</span>
          <span>D</span>
        </div>
      </div>

      <div className="relative z-10">
        <button ref={btnRef} className="border border-vlennd-silver/50 text-vlennd-smoke px-6 py-2 rounded-full font-sans text-sm font-semibold transition-all">
          Comprar para la fiesta
        </button>
      </div>

      <p className="text-xs text-vlennd-smoke font-sans mt-8 text-center">
        Las mejores noches se planean con VLENND.
      </p>

      {/* The animated cursor */}
      <div ref={cursorRef} className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
        <MousePointer2 className="w-6 h-6 text-white drop-shadow-md fill-white/20" />
      </div>
    </div>
  );
}

export default function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative z-10 w-full px-6 bg-vlennd-deep/70 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center feature-card">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-vlennd-ivory">
            Explora la experiencia <span className="text-vlennd-silver">VLENND</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="feature-card"><FeatureToggle /></div>
          <div className="feature-card"><FeatureTestimonial /></div>
          <div className="feature-card"><FeatureCalendar /></div>
        </div>
      </div>
    </section>
  );
}
