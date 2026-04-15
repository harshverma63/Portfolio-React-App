import { useEffect, useRef, useState } from 'react'
import { Sun, Moon, MessageCircle, Menu, X } from 'lucide-react'

const metrics = [
  { num: '7+', label: 'Years Experience', icon: '🏆' },
  { num: '350+', label: 'Enterprise Projects', icon: '🚀' },
  { num: '27', label: 'Designers Led', icon: '👥' },
  { num: '60%', label: 'Faster UI with AI', icon: '⚡' },
  { num: '37%', label: 'Quality Improvement', icon: '📈' },
  { num: '39%', label: 'Output Increase', icon: '🎯' },
]

const roles = [
  'Frontend Engineer',
  'AI Builder',
  'React Developer',
  'UI Architect',
  'Team Leader',
]

export default function Hero() {
  const heroRef = useRef(null)
  const [roleIdx, setRoleIdx] = useState(0)
  const [roleVisible, setRoleVisible] = useState(true)
  const [panelStyle, setPanelStyle] = useState({})
  const [panelStyleMOB, setPanelStyleMOB] = useState({})
  const [contentStyle, setContentStyle] = useState({})

  // Role cycling with fade transition
  useEffect(() => {
    const id = setInterval(() => {
      setRoleVisible(false)
      setTimeout(() => {
        setRoleIdx(i => (i + 1) % roles.length)
        setRoleVisible(true)
      }, 300)
    }, 2200)
    return () => clearInterval(id)
  }, [])

  // Scroll parallax 
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const panelY = Math.min(y * 0.2, 120)
      const panelOpacity = Math.max(1 - y / 500, 0)
      const panelScale = Math.max(1 - y / 400 * 0.08, 0.92)
      const contentY = Math.min(y * 0.133, 80)

      // const panelYMOB       = Math.min(y * 0.9, 120)
      // const panelOpacityMOB = Math.max(1 - y / 100, 1, 1000, 0.1)
      // const panelScaleMOB   = Math.max(1 - y / 400 * 0.09, 0.9)
      // const contentYMOB     = Math.min(y * 0.133, 80)

      const panelYMOB = Math.min(y * 0.25, 100)
      const panelOpacityMOB = Math.max(1 - y / 1000, 1)
      const panelScaleMOB = Math.max(1 - (y / 500) * 0.06, 0.95)
      const contentYMOB = Math.min(y * 0.12, 60)

      setPanelStyle({
        transform: `translateY(calc(-50% + ${panelY}px)) scale(${panelScale})`,
        opacity: panelOpacity,
      })

      setPanelStyleMOB({
        transform: `translateY(calc(0% + ${panelYMOB}px)) scale(${panelScaleMOB})`,
        opacity: panelOpacityMOB,
      })

      setContentStyle({
        transform: `translateY(${contentY}px)`,
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="home" ref={heroRef} className="hero">
      <div className="hero-grid-overlay" />

      {/* LEFT CONTENT */}
      <div className="hero-left hero-left-animate" style={contentStyle}>

        <div className="hero-badge hero-item-animate" style={{ animationDelay: '0s' }}>
          <span className="hero-badge-dot" />
          Available · Delhi NCR &amp; Remote
        </div>

        <h1 className="hero-heading hero-item-animate" style={{ animationDelay: '0.1s' }}>
          Harsh<br />
          <span className="hero-heading-gradient">Verma</span>
        </h1>

        <div className="hero-role-row hero-item-animate" style={{ animationDelay: '0.2s' }}>
          <span className="hero-role-dash">—</span>
          <span
            className="hero-role-text"
            style={{
              opacity: roleVisible ? 1 : 0,
              transform: roleVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
          >
            {roles[roleIdx]}
          </span>
        </div>

        <p className="hero-tagline hero-item-animate" style={{ animationDelay: '0.3s' }}>
          7+ years turning design into engineering. I don&apos;t just{' '}
          <em>use</em> AI —{' '}
          <strong style={{ color: 'var(--text)', fontWeight: 500 }}>I build it.</strong>
        </p>

        <div className="hero-cta-row hero-item-animate" style={{ animationDelay: '0.4s' }}>
          <a href="#projects" className="btn-primary">
            View My Work →
          </a>
          <a
            href="https://www.linkedin.com/in/harsh-verma-b746ba210/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      {/* RIGHT FLOATING PANEL */}
      {/* <div
        className="hero-panel hero-panel-animate"
        style={panelStyle}
      > */}
      <div
        className="hero-panel hero-panel-animate"
        style={window.matchMedia("(max-width: 768px)") ? panelStyleMOB : panelStyle}
      >
        <div className="hero-panel-card">
          <div className="hero-panel-top-bar" />

          <div className="hero-panel-label">Career at a Glance</div>

          <div className="hero-metrics-grid">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className="hero-metric-item hero-metric-animate"
                style={{ animationDelay: `${0.6 + i * 0.08}s` }}
              >
                <div className="hero-metric-icon">{m.icon}</div>
                <div className="hero-metric-num">{m.num}</div>
                <div className="hero-metric-label">{m.label}</div>
              </div>
            ))}
          </div>

          <a
            href="https://wa.me/919315993805?text=Hi%20Harsh%2C%20I%20saw%20your%20portfolio!"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa-panel"
          >
            <MessageCircle size={14} /> Chat on WhatsApp
          </a>
        </div>

        <div className="hero-scroll-hint">
          <span className="hero-scroll-label">SCROLL</span>
          <div className="hero-scroll-line" />
        </div>
      </div>
    </section>
  )
}
