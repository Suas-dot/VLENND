import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const packs = [
  {
    name: "Pack Fiesta",
    bottles: 3,
    desc: "Sabores mixtos",
    btnText: "Comprar pack",
    isPrimary: false
  },
  {
    name: "Pack Premium",
    bottles: 6,
    desc: "Sabores variados • Edición especial",
    btnText: "Comprar ahora",
    isPrimary: true
  },
  {
    name: "Pack Evento",
    bottles: 12,
    desc: "Ideal para fiestas grandes",
    btnText: "Comprar lote",
    isPrimary: false
  }
];

export default function CTA() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".pricing-card", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-[#0B0B0C] relative z-10 border-t border-vlennd-silver/5">
      <div className="absolute inset-0 bg-silver-gradient opacity-[0.02] mix-blend-overlay pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center mb-20">
         <h2 className="font-heading text-5xl md:text-6xl font-bold text-vlennd-ivory leading-tight">
           La noche te <br className="hidden md:block"/> está esperando.
         </h2>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-6">
          {packs.map((pack, idx) => (
            <div 
              key={idx} 
              className={`pricing-card w-full lg:w-1/3 flex flex-col p-10 rounded-[2.5rem] border transition-transform duration-500 will-change-transform ${
                pack.isPrimary 
                  ? 'bg-vlennd-carbon border-vlennd-silver/50 shadow-[0_0_50px_rgba(209,213,219,0.15)] lg:scale-110 lg:-translate-y-4 lg:hover:-translate-y-6 z-20' 
                  : 'bg-[#111113] border-white/5 hover:-translate-y-2 z-10'
              }`}
            >
              {pack.isPrimary && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-vlennd-silver text-vlennd-deep text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                  Más Popular
                </div>
              )}
              
              <h3 className={`font-heading text-3xl font-bold mb-2 ${pack.isPrimary ? 'text-vlennd-silver' : 'text-vlennd-ivory'}`}>
                {pack.name}
              </h3>
              <div className="flex items-baseline gap-2 mb-6">
                 <span className="font-heading text-5xl font-bold text-vlennd-ivory">{pack.bottles}</span>
                 <span className="font-sans text-vlennd-smoke font-medium">botellas</span>
              </div>
              <p className="font-sans text-sm text-vlennd-smoke mb-10 h-8">
                {pack.desc}
              </p>
              
              <button 
                className={`mt-auto w-full py-4 rounded-full font-sans font-bold text-sm tracking-wide transition-all duration-300 ${
                  pack.isPrimary 
                    ? 'bg-silver-gradient text-vlennd-deep hover:shadow-[0_0_20px_rgba(209,213,219,0.4)] hover:scale-105'
                    : 'bg-transparent border border-white/20 text-vlennd-ivory hover:border-vlennd-silver hover:text-vlennd-silver'
                }`}
              >
                {pack.btnText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
