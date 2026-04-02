import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const steps = [
  {
    title: "Elegir tu sabor",
    desc: "Grape Rave, chicle, Lulo Sense, manzana verde y más."
  },
  {
    title: "Preparar la noche",
    desc: "Sirve frío o en shots."
  },
  {
    title: "Compartir la experiencia",
    desc: "El sabor se vuelve protagonista."
  },
  {
    title: "La fiesta empieza",
    desc: "VLENND transforma el momento."
  }
];

export default function Process() {
  const lineRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animate line width
      gsap.fromTo(lineRef.current, 
        { scaleX: 0 },
        { 
          scaleX: 1, 
          duration: 1.5, 
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );

      // Fade up steps
      gsap.from(".process-step", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="theme-section-surface py-32 bg-[#0b0515]/70 backdrop-blur-sm relative z-10 border-y border-vlennd-silver/5">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-24 text-vlennd-ivory">
          El trayecto de la <span className="text-vlennd-silver">noche perfecta</span>
        </h2>

        <div className="relative">
          {/* Horizontal line background */}
          <div className="hidden md:block absolute top-[1.15rem] left-0 w-full h-[1px] bg-white/10" />
          
          {/* Animated line foreground */}
          <div 
            ref={lineRef} 
            className="hidden md:block absolute top-[1.15rem] left-0 w-full h-[2px] bg-silver-gradient origin-left" 
            style={{ transform: 'scaleX(0)' }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="process-step relative flex flex-col items-center md:items-start text-center md:text-left">
                {/* Number Indicator */}
                <div className="theme-process-step-badge w-10 h-10 rounded-full bg-vlennd-carbon border border-vlennd-silver text-vlennd-silver flex items-center justify-center font-mono font-bold text-lg mb-6 z-10 shadow-[0_0_15px_rgba(209,213,219,0.2)]">
                  {idx + 1}
                </div>
                
                <h3 className="font-heading text-xl font-bold text-vlennd-ivory mb-3">
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-vlennd-smoke leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
