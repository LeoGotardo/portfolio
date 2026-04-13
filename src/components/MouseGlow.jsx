import { useEffect, useRef } from 'react'

export default function MouseGlow() {
  const glowRef = useRef(null)
  const pos = useRef({ x: -500, y: -500 })
  const smooth = useRef({ x: -500, y: -500 })
  const rafRef = useRef(null)

  useEffect(() => {
    const onMove = e => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      // lerp toward real mouse position for smooth trailing
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.08
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.08

      if (glowRef.current) {
        glowRef.current.style.transform =
          `translate(${smooth.current.x - 300}px, ${smooth.current.y - 300}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 600,
        height: 600,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(0,212,255,0.07) 0%, rgba(255,107,53,0.04) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
        willChange: 'transform',
        mixBlendMode: 'screen',
      }}
    />
  )
}
