import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const metrics = [
  { value: 5,   prefix: '+', suffix: '', label: 'sabores únicos' },
  { value: 420, prefix: '+', suffix: '', label: 'botellas vendidas' },
  { value: 98,  prefix: '', suffix: '%', label: 'repetiría la experiencia' },
  { value: 19,  prefix: '+', suffix: '', label: 'fiestas patrocinadas' }
];

export default function SocialProof() {
  const containerRef = useRef(null);
  const numbersRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      numbersRef.current.forEach((el, index) => {
        const targetValue = metrics[index].value;
        const animatedObj = { val: 0 };
        
        gsap.to(animatedObj, {
          val: targetValue,
          duration: 2.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          onUpdate: function () {
            // Format number with commas if >= 1000
            const formatValue = Math.floor(animatedObj.val).toLocaleString('en-US');
            el.innerText = `${metrics[index].prefix}${formatValue}${metrics[index].suffix}`;
          }
        });

        // Fade up the whole card
        gsap.from(el.parentElement, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top 85%',
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-[#100820]/70 backdrop-blur-sm relative z-10 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center text-center">
              <div 
                ref={el => numbersRef.current[idx] = el}
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-vlennd-silver mb-3"
              >
                {metric.prefix}0{metric.suffix}
              </div>
              <div className="font-sans text-xs md:text-sm font-semibold tracking-[0.15em] uppercase text-vlennd-smoke">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
