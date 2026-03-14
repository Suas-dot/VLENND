import { Canvas } from "@react-three/fiber"
import { ShaderPlane } from "./background-paper-shaders"

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0d0618]">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ background: '#0d0618' }}
      >
        <ShaderPlane 
          position={[0, 0, 0]} 
          color1="#1a0a2e" 
          color2="#2d1654" 
        />
      </Canvas>
      <div className="absolute inset-0 bg-[#0d0618]/20"></div>
    </div>
  )
}
