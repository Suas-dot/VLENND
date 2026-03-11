import { Canvas } from "@react-three/fiber"
import { ShaderPlane } from "./background-paper-shaders"

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ShaderPlane 
          position={[0, 0, 0]} 
          color1="#111113" 
          color2="#333333" 
        />
      </Canvas>
      {/* Overlay to dim it slightly and ensure text readability */}
      <div className="absolute inset-0 bg-vlennd-deep/40 backdrop-blur-[2px]"></div>
    </div>
  )
}
