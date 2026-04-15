import { useState } from 'react'
import './styles.css'
import ParticleBackground from './components/ParticleBackground'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { About, Skills, Projects, Experience } from './components/Sections'
import Contact from './components/Contact'

export const PortfolioApp = () => {
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <>
      <ParticleBackground />
      <Cursor />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer className="footer">
        <p className="footer-text">
          © 2026 <a href="#home">Harsh Verma</a> — Frontend Engineer &amp; AI Builder
        </p>
        <p className="footer-text">
          Built with React · Framer Motion · ♥
        </p>
      </footer>
    </>
  )
}
