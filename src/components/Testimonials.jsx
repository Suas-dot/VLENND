import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const reviews = [
  {
    quote: "VLENND tiene sabores que no existen en otros vodkas.",
    author: "Camila V.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&w=150&q=80"
  },
  {
    quote: "El de manzana verde es brutal. 100% recomendado.",
    author: "Diego T.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&w=150&q=80"
  },
  {
    quote: "La botella ya dice lujo. El sabor lo confirma.",
    author: "Sofía R.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&w=150&q=80"
  }
];

export default function Testimonials() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        y: 60,
        opacity: 0,
        rotateY: 15,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%"
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-[#111113] relative z-10 overflow-hidden" style={{ perspective: '1000px' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-vlennd-ivory">
            Lo que dicen de la <span className="text-vlennd-silver italic">experiencia</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div 
              key={idx} 
              className="testimonial-card bg-[#0B0B0C] rounded-[2rem] p-10 border border-white/5 shadow-xl flex flex-col items-start justify-between min-h-[300px] transition-transform duration-500 hover:-translate-y-2 hover:border-vlennd-silver/20"
            >
              <div className="text-vlennd-silver mb-6 relative">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" opacity="0.2" className="absolute -top-4 -left-2"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                 <p className="font-heading text-2xl text-vlennd-ivory font-medium relative z-10">"{rev.quote}"</p>
              </div>
              
              <div className="flex items-center gap-4 mt-8">
                <img src={rev.avatar} alt={rev.author} className="w-14 h-14 rounded-full object-cover border border-vlennd-silver/30" />
                <span className="font-sans text-vlennd-smoke font-semibold">{rev.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
