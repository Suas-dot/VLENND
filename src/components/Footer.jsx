export default function Footer() {
  return (
    <footer className="bg-[#050505] pt-24 pb-12 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          <div className="col-span-1">
            <h3 className="font-heading text-3xl font-bold text-vlennd-ivory tracking-wider mb-6">
              VLENND
            </h3>
            <p className="font-sans text-vlennd-smoke text-sm leading-relaxed max-w-xs">
              Vodka premium para noches inolvidables. La intensidad que domina la fiesta.
            </p>
          </div>

          <div className="col-span-1">
             <ul className="space-y-4 font-sans text-sm text-vlennd-ivory/80">
                <li><a href="#sabores" className="hover:text-vlennd-silver transition-colors">Sabores</a></li>
               <li><a href="#experiencia" className="hover:text-vlennd-silver transition-colors">Experiencia</a></li>
               <li><a href="#comprar" className="hover:text-vlennd-silver transition-colors">Comprar</a></li>
             </ul>
          </div>

          <div className="col-span-1">
             <ul className="space-y-4 font-sans text-sm text-vlennd-ivory/80">
               <li><a href="#" className="hover:text-vlennd-silver transition-colors">Instagram</a></li>
               <li><a href="#" className="hover:text-vlennd-silver transition-colors">Eventos</a></li>
               <li><a href="#" className="hover:text-vlennd-silver transition-colors">Distribuidores</a></li>
             </ul>
          </div>

          <div className="col-span-1">
             <ul className="space-y-4 font-sans text-sm text-vlennd-ivory/80">
               <li><a href="#" className="hover:text-vlennd-silver transition-colors">Términos</a></li>
               <li><a href="#" className="hover:text-vlennd-silver transition-colors">Privacidad</a></li>
             </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <p className="font-mono text-xs text-vlennd-smoke mb-4 md:mb-0">
            © {new Date().getFullYear()} VLENND
          </p>
          
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-vlennd-smoke uppercase tracking-widest">
              Sistema activo • v1.0
            </span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
