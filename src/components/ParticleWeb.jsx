import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 80
const MAX_DIST = 140
const MOUSE_REPEL_DIST = 120
const MOUSE_REPEL_FORCE = 0.35
const SPEED = 0.4

function rand(min, max) { return Math.random() * (max - min) + min }

export default function ParticleWeb() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W = window.innerWidth
    let H = document.documentElement.scrollHeight

    const resize = () => {
      W = window.innerWidth
      H = document.documentElement.scrollHeight
      canvas.width = W
      canvas.height = H
    }
    resize()

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: rand(0, W),
      y: rand(0, H),
      vx: rand(-SPEED, SPEED),
      vy: rand(-SPEED, SPEED),
      r: rand(1.5, 3),
    }))

    const onMouseMove = e => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY + window.scrollY
    }
    const onMouseLeave = () => { mouse.current.x = -9999; mouse.current.y = -9999 }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // update positions + mouse repel
      for (const p of particles) {
        const dx = p.x - mouse.current.x
        const dy = p.y - mouse.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < MOUSE_REPEL_DIST && dist > 0) {
          const force = (MOUSE_REPEL_DIST - dist) / MOUSE_REPEL_DIST * MOUSE_REPEL_FORCE
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        // dampen velocity
        p.vx *= 0.99
        p.vy *= 0.99

        // clamp speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > SPEED * 3) {
          p.vx = (p.vx / speed) * SPEED * 3
          p.vy = (p.vy / speed) * SPEED * 3
        }

        p.x += p.vx
        p.y += p.vy

        // wrap edges
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
      }

      // draw connections
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > MAX_DIST) continue

          const alpha = (1 - dist / MAX_DIST) * 0.35

          // check if mouse is near this line midpoint → cyan glow
          const mx = (a.x + b.x) / 2 - mouse.current.x
          const my = (a.y + b.y) / 2 - mouse.current.y
          const mouseDist = Math.sqrt(mx * mx + my * my)
          const nearMouse = mouseDist < 180

          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)

          if (nearMouse) {
            const boost = (1 - mouseDist / 180) * 0.5
            ctx.strokeStyle = `rgba(0,212,255,${alpha + boost})`
            ctx.lineWidth = 1.2
          } else {
            ctx.strokeStyle = `rgba(0,212,255,${alpha})`
            ctx.lineWidth = 0.8
          }
          ctx.stroke()
        }
      }

      // draw particles
      for (const p of particles) {
        const dx = p.x - mouse.current.x
        const dy = p.y - mouse.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const nearMouse = dist < MOUSE_REPEL_DIST

        ctx.beginPath()
        ctx.arc(p.x, p.y, nearMouse ? p.r * 1.8 : p.r, 0, Math.PI * 2)

        if (nearMouse) {
          const boost = (1 - dist / MOUSE_REPEL_DIST)
          ctx.fillStyle = `rgba(255,107,53,${0.5 + boost * 0.5})`
          ctx.shadowBlur = 8
          ctx.shadowColor = '#ff6b35'
        } else {
          ctx.fillStyle = 'rgba(0,212,255,0.5)'
          ctx.shadowBlur = 0
        }
        ctx.fill()
        ctx.shadowBlur = 0
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
