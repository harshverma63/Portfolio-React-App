import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light'

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.3
        this.speedX = (Math.random() - 0.5) * 0.4
        this.speedY = (Math.random() - 0.5) * 0.4
        this.opacity = Math.random() * 0.5 + 0.1
        this.color = Math.random() > 0.6 ? '#6c63ff' : Math.random() > 0.5 ? '#00d4ff' : '#ffffff'
        this.pulse = Math.random() * Math.PI * 2
        this.pulseSpeed = Math.random() * 0.02 + 0.005
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.pulse += this.pulseSpeed
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset()
      }
      draw() {
        const alpha = this.opacity * (0.7 + 0.3 * Math.sin(this.pulse))
        ctx.save()
        ctx.globalAlpha = isDark() ? alpha : alpha * 0.4
        ctx.fillStyle = this.color
        ctx.shadowColor = this.color
        ctx.shadowBlur = 6
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    for (let i = 0; i < 120; i++) particles.push(new Particle())

    // Draw connecting lines
    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.save()
            ctx.globalAlpha = isDark()
              ? (1 - dist / 120) * 0.06
              : (1 - dist / 120) * 0.03
            ctx.strokeStyle = '#6c63ff'
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }
    }

    // Floating orbs
    const orbs = [
      { x: 0.8, y: 0.1, r: 300, color: '#6c63ff', speed: 0.0003 },
      { x: 0.1, y: 0.7, r: 200, color: '#00d4ff', speed: 0.0005 },
      { x: 0.5, y: 0.5, r: 150, color: '#ff6b6b', speed: 0.0004 },
    ]
    let t = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.01

      // Draw orbs
      orbs.forEach((orb, i) => {
        const cx = canvas.width * orb.x + Math.sin(t * orb.speed * 1000 + i) * 80
        const cy = canvas.height * orb.y + Math.cos(t * orb.speed * 1000 + i * 1.3) * 60
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb.r)
        grad.addColorStop(0, isDark()
          ? orb.color + '22'
          : orb.color + '10')
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(cx, cy, orb.r, 0, Math.PI * 2)
        ctx.fill()
      })

      particles.forEach(p => { p.update(); p.draw() })
      drawLines()
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none'
      }}
    />
  )
}
