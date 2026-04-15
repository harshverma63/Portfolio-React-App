import { useRef, useEffect } from 'react'
import { GitMerge } from 'lucide-react'

import { GiTechnoHeart, GiPencilBrush, GiTeamIdea } from 'react-icons/gi'
import { SiGooglegemini, SiChatbot, SiReact } from 'react-icons/si'
import { RiCodeAiFill } from 'react-icons/ri'
import { TbSubtask, TbBrowserMaximize } from 'react-icons/tb'
import { FaPeopleGroup } from 'react-icons/fa6'
import { GoTasklist } from 'react-icons/go'

// ── Custom hook — replaces useInView from framer-motion ──────────────────
function useReveal(ref, options = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '-80px', ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
}

// ── Helper — reveals children with stagger ───────────────────────────────
function useRevealChildren(containerRef, selector = '.reveal-child') {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const children = container.querySelectorAll(selector)
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || '0', 10)
            setTimeout(() => {
              entry.target.classList.add('in-view')
            }, delay)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '-80px' }
    )
    children.forEach(child => observer.observe(child))
    return () => observer.disconnect()
  }, [containerRef, selector])
}

function Section({ id, children, dark }) {
  return (
    <section id={id} className={`section${dark ? ' dark' : ''}`}>
      <div className="section-inner">{children}</div>
    </section>
  )
}

function SectionHeader({ label, title, dim }) {
  const ref = useRef(null)
  useReveal(ref)
  return (
    <div ref={ref} className="section-header reveal-block">
      <span className="section-label reveal-child" data-delay="0">{label}</span>
      <h2 className="section-title reveal-child" data-delay="100">
        {title}<br />
        <span className="section-title-dim">{dim}</span>
      </h2>
    </div>
  )
}

// ── ABOUT ────────────────────────────────────────────────────────────────
export function About() {
  const ref = useRef(null)
  useRevealChildren(ref)

  return (
    <Section id="about" dark>
      <SectionHeader label="Who I Am" title="Built different." dim="By design." />

      <div ref={ref} className="about-grid">
        <div className="about-grid2 reveal-child" data-delay="0">
          {[
            <>I started as a web designer — giving me a <strong style={{ color: 'var(--text)' }}>visual instinct</strong> most engineers simply don't have. Over 7 years I moved deeper into engineering, self-taught React JS, and shipped products that live in production.</>,
            <>At Cvent I led a team of 11, delivered 50+ enterprise websites and HTML email systems, and <strong style={{ color: 'var(--text)' }}>independently built an AI-powered QA system</strong> that improved output quality by 37% and production by 14% — nobody asked me to. I identified the problem and solved it.</>,
            <>At Adaan I led 16 designers across two delivery streams. I understand both the <strong style={{ color: 'var(--text)' }}>craft side and the scale side</strong> of frontend work.</>,
            <>Most recently I built my own <strong style={{ color: 'var(--text)' }}>custom AI Expert on Google Gemini</strong> that generates production-ready React UI from a single text prompt. That's the difference between using AI and building with it.</>,
          ].map((p, i) => (
            <p key={i} className="about-para">{p}</p>
          ))}
        </div>

        <div className="about-card reveal-child" data-delay="100">
          <div className="about-card-bar" />
          <div className="about-card-title"><GiTechnoHeart /> What I build with AI</div>

          {[
            { icon: <SiGooglegemini />, title: 'Glassmorphism Pro — Gemini AI Expert', desc: 'Single prompt → full production React UI with dark mode, animations, WCAG compliance' },
            { icon: <SiChatbot />,      title: 'AI QA Chatbot — Cvent',               desc: '37% quality improvement + 14% output increase in 2 months. Measured via Salesforce & Sigma' },
            { icon: <RiCodeAiFill />,   title: 'Daily AI-Augmented Development',       desc: 'Gemini, Claude, ChatGPT as force multipliers — not shortcuts' },
          ].map(item => (
            <div key={item.title} className="about-card-item">
              <span className="about-card-item-icon">{item.icon}</span>
              <div>
                <div className="about-card-item-title">{item.title}</div>
                <div className="about-card-item-desc">{item.desc}</div>
              </div>
            </div>
          ))}

          <div className="about-card-footer">
            <span className="about-card-footer-label">CURRENTLY</span>
            Building AI-powered web products · Learning Full Stack (Node.js, Express, MongoDB)
          </div>
        </div>
      </div>
    </Section>
  )
}

// ── SKILLS ───────────────────────────────────────────────────────────────
const skillGroups = [
  { icon: <GiTechnoHeart />,  title: 'AI & Prompt Engineering',  tags: [{ t: 'Google Gemini', hot: true }, { t: 'Prompt Engineering', hot: true }, { t: 'AI Instruction Architecture', hot: true }, { t: 'ChatGPT' }, { t: 'Claude' }, { t: 'Perplexity' }] },
  { icon: <SiReact />,        title: 'Frontend Development',     tags: [{ t: 'React JS', hot: true }, { t: 'JavaScript ES6+', hot: true }, { t: 'HTML5', hot: true }, { t: 'CSS3', hot: true }, { t: 'React Hooks' }, { t: 'REST API' }, { t: 'Bootstrap' }, { t: 'jQuery' }, { t: 'Vite' }, { t: 'Vercel' }, { t: 'Netlify' }, { t: 'Git' }] },
  { icon: <GiPencilBrush />,  title: 'Design Tools',             tags: [{ t: 'Figma', hot: true }, { t: 'Adobe Photoshop' }, { t: 'Illustrator' }, { t: 'InDesign' }, { t: 'Premiere Pro' }] },
  { icon: <GiTeamIdea />,     title: 'Collaboration & QA',       tags: [{ t: 'Team Leadership', hot: true }, { t: 'WCAG Accessibility', hot: true }, { t: 'A/B Testing' }, { t: 'SEO' }, { t: 'Salesforce' }, { t: 'Jira' }, { t: 'Wrike' }, { t: 'Agile' }, { t: 'HTML Email QA' }] },
]

export function Skills() {
  const ref = useRef(null)
  useRevealChildren(ref)

  return (
    <Section id="skills">
      <SectionHeader label="Expertise" title="Skills &" dim="Tech Stack" />
      <div ref={ref} className="skills-grid">
        {skillGroups.map((g, i) => (
          <div key={g.title} className="skill-card reveal-child" data-delay={i * 80}>
            <div className="skill-card-head">
              <span className="skill-card-icon">{g.icon}</span>
              <span className="skill-card-title">{g.title}</span>
            </div>
            <div className="skill-tags">
              {g.tags.map(tag => (
                <span key={tag.t} className={`skill-tag ${tag.hot ? 'hot' : 'normal'}`}>
                  {tag.t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

// ── PROJECTS ──────────────────────────────────────────────────────────────
const projects = [
  {
    emoji: <GiTechnoHeart />, badge: '⭐ Featured · AI Project', featured: true,
    name: 'Glassmorphism Pro — Gemini AI Expert',
    desc: 'Built a custom AI instruction system on Google Gemini that converts a single text prompt into a complete production-ready React UI — covering dark/light mode, 3D tilt interactions, CSS mesh gradients, scroll animations, and backdrop-filter physics. WCAG accessibility guardrails built in.',
    metrics: ['60% faster prototyping', 'WCAG compliant', 'Live in production', 'React v19 compatible'],
    stack: ['Google Gemini', 'Prompt Engineering', 'AI Architecture', 'React JS', 'WCAG'],
    live: 'https://gemini.google.com/gem/14wKItMkF0gdr3wa-S_L45JW2OmO79Aar', gh: null,
  },
  {
    emoji: <TbSubtask />, badge: 'React JS · Dashboard',
    name: 'Nexora — Project Management Dashboard',
    desc: 'Role-based React v19 SPA with separate Project Manager and Employee login flows, credential validation against a live GitHub JSON API, and multi-filter task system — real-time search, status, priority, and My Tasks toggle all operating simultaneously across 10+ modular components.',
    metrics: ['100+ simulated users', '10+ components', 'Live on Vercel'],
    stack: ['React JS v19', 'JavaScript ES6+', 'localStorage', 'GitHub JSON API', 'Vite', 'Vercel'],
    live: 'https://project-management-dashboard-liard.vercel.app/', gh: 'https://github.com/harshverma63/Project-Management-Dashboard',
  },
  {
    emoji: <FaPeopleGroup />, badge: 'React JS · Dual Portal',
    name: 'EMP & HR Dashboard',
    desc: 'Dual-portal React SPA with Employee and HR login flows, role-based session management, live REST API integration with async data fetching, and real-time employee search. Fixed React re-render timing bugs and stale closure crashes across 4+ levels of prop drilling.',
    metrics: ['Dark/Light mode', 'REST API live', 'Mobile responsive'],
    stack: ['React JS v19', 'REST API', 'localStorage', 'JavaScript ES6+', 'Vercel'],
    live: 'https://emp-hr-dashboard-react.vercel.app/', gh: 'https://github.com/harshverma63/emp-hr-dashboard-react',
  },
  {
    emoji: <GoTasklist />, badge: 'React JS · App',
    name: 'Priorly — Task Management App',
    desc: 'React task app with real-time clock, multi-state filtering (All/Active/Completed), inline editing with save/cancel controls, completion toggling, per-task CRUD, bulk clear with localStorage wipe, and persistent session storage.',
    metrics: ['Fully responsive', 'Persistent storage', 'Live on Vercel'],
    stack: ['React JS v19', 'JavaScript', 'CSS', 'Vercel'],
    live: 'https://priorly-sticky-task.vercel.app/', gh: 'https://github.com/harshverma63/Priorly-Sticky-Task',
  },
]

export function Projects() {
  const ref = useRef(null)
  useRevealChildren(ref)

  return (
    <Section id="projects" dark>
      <SectionHeader label="Work" title="Projects that" dim="ship & work." />
      <div ref={ref} className="projects-grid">
        {projects.map((p, i) => (
          <div
            key={p.name}
            className={`project-card reveal-child${p.featured ? ' featured' : ''}`}
            data-delay={i * 100}
          >
            {p.featured
              ? (
                <div className="project-inner">
                  <ProjectVisual emoji={p.emoji} />
                  <ProjectBody p={p} />
                </div>
              )
              : (
                <>
                  <ProjectVisual emoji={p.emoji} short />
                  <ProjectBody p={p} />
                </>
              )
            }
          </div>
        ))}
      </div>
    </Section>
  )
}

function ProjectVisual({ emoji, short }) {
  return (
    <div className={`project-visual${short ? ' short' : ''}`}>
      <div className="project-visual-grid" />
      <span className="project-visual-emoji">{emoji}</span>
    </div>
  )
}

function ProjectBody({ p }) {
  return (
    <div className="project-body">
      <span className="project-badge">{p.badge}</span>
      <div className="project-name">{p.name}</div>
      <div className="project-desc">{p.desc}</div>

      <div className="project-metrics">
        {p.metrics.map(m => (
          <span key={m} className="project-metric-tag">{m}</span>
        ))}
      </div>

      <div className="project-stack">
        {p.stack.map(s => (
          <span key={s} className="project-stack-tag">{s}</span>
        ))}
      </div>

      <div className="project-links">
        {p.live && (
          <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn-live">
            <TbBrowserMaximize /> Live Demo
          </a>
        )}
        {p.gh && (
          <a href={p.gh} target="_blank" rel="noopener noreferrer" className="btn-gh">
            <GitMerge size={16} /> GitHub
          </a>

        )}
      </div>
    </div>
  )
}

// ── EXPERIENCE ────────────────────────────────────────────────────────────
const jobs = [
  {
    period: 'Feb 2025 — Present', role: 'Frontend Developer & AI Builder',
    company: 'Self-Employed', location: 'Career Break & Upskilling · Delhi',
    bullets: [
      'Built and deployed 4 live React JS applications covering role-based auth, REST API integration, real-time filtering, and task management',
      'Designed, trained, tested, and deployed Glassmorphism Pro — a custom Gemini AI Expert reducing UI prototyping time by 60%',
      'Self-taught React JS through hands-on building — production-grade apps live on Vercel and Netlify',
    ],
  },
  {
    period: 'Feb 2023 — Jan 2025', role: 'Front-End Developer',
    company: 'Cvent', location: 'Gurugram, HR',
    bullets: [
      'Built 50+ responsive websites and HTML email templates for global enterprise clients — 30% faster turnaround via reusable systems',
      'A/B tested 40+ international projects — estimated 15% increase in attendee engagement',
      'Independently designed AI-assisted QA system — 37% quality improvement, 14% production increase in 2 months (Salesforce + Sigma)',
      'Managed a team of 11 designers while preparing for Assistant Team Lead promotion',
    ],
  },
  {
    period: 'Jan 2020 — Feb 2023', role: 'Web Designer & QA Lead',
    company: 'Adaan Digital Solutions', location: 'ITO, Delhi',
    bullets: [
      'Led 16 designers across two streams with full QA sign-off responsibility',
      'Improved organic page visibility by ~25% through SEO and performance tuning',
      'A/B testing delivered ~12% conversion uplift across client websites',
    ],
  },
  {
    period: '2018 — 2020', role: 'Web & Graphic Designer',
    company: 'Ayka Tech · Spinered · Web Pulse · Freelance', location: 'Delhi NCR',
    bullets: [
      'Built front-end components for salestown.in and multiple client websites',
      'Designed web pages, email creatives, banners using Adobe Creative Suite',
      'Started freelance career delivering web design for local businesses across Delhi',
    ],
  },
]

export function Experience() {
  const containerRef = useRef(null)

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll('.exp-item')
    if (!items) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || '0', 10)
            setTimeout(() => {
              entry.target.classList.remove('reveal-hidden')
              entry.target.classList.add('reveal-visible')
            }, delay)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    items.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <Section id="experience">
      <SectionHeader label="Career" title="7 years." dim="Real work." />
      <div ref={containerRef} className="exp-container">
        <div className="exp-timeline-line" />

        {jobs.map((job, i) => (
          <div
            key={job.period}
            className="exp-item reveal-hidden"
            data-delay={i * 120}
          >
            <div className="exp-dot" />
            <div className="exp-card">
              <div className="exp-period">{job.period}</div>
              <div className="exp-role">{job.role}</div>
              <div className="exp-company">
                {job.company} · <span className="exp-company-accent">{job.location}</span>
              </div>
              <ul className="exp-bullets">
                {job.bullets.map(b => (
                  <li key={b} className="exp-bullet">{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
