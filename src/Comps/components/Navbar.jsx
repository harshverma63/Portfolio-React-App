import { useState, useEffect } from 'react'
import { Sun, Moon, MessageCircle, Menu, X } from 'lucide-react'

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

  const navClass = ['navbar', 'navbar-animate', scrolled ? 'scrolled' : '', menuOpen ? 'open' : ''].join(' ').trim()

  return (
    <nav className={navClass}>
      <a href="#home" className="navbar-logo">
        HV<span>.</span>
      </a>

      <ul className="navbar-links">
        {links.map(l => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
            >
              {l}
            </a>
          </li>
        ))}
      </ul>

      <div className="navbar-actions">
        {/* <a
          href="https://wa.me/919315993805?text=Hi%20Harsh%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
          title="Chat on WhatsApp"
        >
          <MessageCircle size={14} /> WhatsApp
        </a> */}

        <button className="btn-theme" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>

        <a href="mailto:harshverma6399@gmail.com" className="btn-hire">
          Hire Me
        </a>

        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} color="var(--text)" /> : <Menu size={22} color="var(--text)" />}
        </button>
      </div>
    </nav>
  )
}
