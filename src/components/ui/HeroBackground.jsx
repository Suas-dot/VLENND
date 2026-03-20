import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { ShaderPlane } from "./background-paper-shaders"

export default function HeroBackground() {
  const [isMobile, setIsMobile] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    setReady(true)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!ready) return <div className="fixed inset-0 z-0 bg-[#0d0618]" />

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0d0618]">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ background: '#0d0618' }}
        dpr={isMobile ? [0.75, 1] : [1, 2]}
        gl={{ antialias: !isMobile, powerPreference: isMobile ? 'low-power' : 'high-performance' }}
      >
        <ShaderPlane
          position={[0, 0, 0]}
          color1="#1a0a2e"
          color2="#2d1654"
          detail={isMobile ? 24 : 64}
          speed={isMobile ? 0.7 : 1}
          intensityAmplitude={isMobile ? 0.18 : 0.3}
        />
      </Canvas>
      <div className="absolute inset-0 bg-[#0d0618]/20" />
    </div>
  )
}
