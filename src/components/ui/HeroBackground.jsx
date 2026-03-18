import { Canvas } from "@react-three/fiber"
import { ShaderPlane } from "./background-paper-shaders"

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

function CSSBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#0d0618] overflow-hidden">
      <div className="shader-blob shader-blob-1" />
      <div className="shader-blob shader-blob-2" />
      <div className="shader-blob shader-blob-3" />
    </div>
  )
}

export default function HeroBackground() {
  if (isMobile) return <CSSBackground />

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0d0618]">
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
      <div className="absolute inset-0 bg-[#0d0618]/20" />
    </div>
  )
}
