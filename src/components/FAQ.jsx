import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: "¿Qué grado de alcohol tiene VLENND?", a: "VLENND es un vodka premium con 25% de volumen de alcohol, destilado 5 veces para garantizar la máxima pureza." },
  { q: "¿Se puede comprar en línea?", a: "Sí, enviamos directamente a tu puerta. Asegura tus botellas desde nuestra tienda en línea oficial." },
  { q: "¿Los sabores son naturales?", a: "Absolutamente. Utilizamos esencias naturales extraídas bajo procesos de alta gama para nuestro chicle, manzana verde, uva y naranjilla." },
  { q: "¿Envían a todo el país?", a: "Contamos con envíos nacionales a las principales ciudades. Revisa la cobertura durante el checkout." },
  { q: "¿Se vende en bares o discotecas?", a: "Sí, encuéntranos en los clubes y bares más exclusivos de la ciudad. Si tu local favorito no lo tiene, ¡pídelo!" }
];

function FAQItem({ faq, isOpen, onClick }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(contentRef.current, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' });
    } else {
      gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-white/10 overflow-hidden">
      <button 
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
        onClick={onClick}
      >
        <span className={`font-heading text-xl transition-colors duration-300 ${isOpen ? 'text-vlennd-silver' : 'text-vlennd-ivory group-hover:text-vlennd-silver'}`}>
          {faq.q}
        </span>
        <ChevronDown 
          className={`w-6 h-6 text-vlennd-smoke transition-transform duration-400 ${isOpen ? 'rotate-180 text-vlennd-silver' : ''}`} 
        />
      </button>
      <div 
        ref={contentRef} 
        className="h-0 opacity-0 overflow-hidden"
      >
        <p className="pb-6 font-sans text-vlennd-smoke leading-relaxed pr-8">
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".faq-item", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%"
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-vlennd-deep/70 backdrop-blur-sm relative z-10" id="faq">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-16 text-vlennd-ivory">
          Preguntas <span className="text-vlennd-silver text-opacity-80">Frecuentes</span>
        </h2>
        
        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-item">
              <FAQItem 
                faq={faq} 
                isOpen={openIndex === idx} 
                onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
