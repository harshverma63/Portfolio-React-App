import { useRef, useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { Send, MessageCircle, Mail, Phone, Link, GitBranch, CheckCircle, AlertCircle, Loader } from 'lucide-react'

// ─────────────────────────────────────────────────────────
//  EMAILJS CONFIGURATION
//  Step 1 → Sign up free at https://www.emailjs.com
//  Step 2 → Add Email Service  (Gmail) → copy Service ID
//  Step 3 → Create Email Template      → copy Template ID
//  Step 4 → Go to Account → API Keys   → copy Public Key
//  Then paste your 3 keys below and you're done.
// ─────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = 'service_rxs74ix'   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_ue0t9vg'  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY = 'CNSsdyD9pedyjp9fq' // e.g. 'user_AbCdEfGhIjKlMnOp'

// ─────────────────────────────────────────────────────────
//  EMAILJS TEMPLATE VARIABLES
//  In your EmailJS template use these variables:
//    {{from_name}}    → sender's name
//    {{from_email}}   → sender's email
//    {{subject}}      → subject line
//    {{message}}      → message body
//    {{to_email}}     → harshverma6399@gmail.com
//
//  Example template body:
//    Name:    {{from_name}}
//    Email:   {{from_email}}
//    Subject: {{subject}}
//
//    {{message}}
// ─────────────────────────────────────────────────────────

export default function Contact() {
  const ref = useRef(null)
  const formRef = useRef(null)
  const [inView, setInView] = useState(false)

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  // Replace useInView from framer-motion
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '-80px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    setStatus('sending')

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      subject: form.subject || `Portfolio enquiry from ${form.name}`,
      message: form.message,
      to_email: 'harshverma6399@gmail.com',
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }

    setTimeout(() => setStatus('idle'), 5000)
  }

  const contacts = [
    { icon: <Mail size={18} />, label: 'Email', value: 'harshverma6399@gmail.com', href: 'mailto:harshverma6399@gmail.com', color: '#6c63ff', external: false },
    { icon: <Phone size={18} />, label: 'Phone', value: '+91 9315993805', href: 'tel:+919315993805', color: '#00d4ff', external: false },
    { icon: <MessageCircle size={18} />, label: 'WhatsApp', value: 'Chat instantly', href: 'https://wa.me/919315993805?text=Hi%20Harsh%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!', color: '#25D366', external: true },
    { icon: <Link size={18} />, label: 'LinkedIn', value: 'harsh-verma-b746ba210', href: 'https://www.linkedin.com/in/harsh-verma-b746ba210/', color: '#0A66C2', external: true },
    { icon: <GitBranch size={18} />, label: 'GitHub', value: 'github.com/harshverma63', href: 'https://github.com/harshverma63', color: '#f0f0ff', external: true },
  ]

  return (
    <section id="contact" className="contact-section">
      <div className="section-inner">
        <div ref={ref}>
          <div className={`contact-header reveal-block${inView ? ' in-view' : ''}`}>
            <span className="section-label reveal-child" data-delay="0">
              Get In Touch
            </span>
            <h2 className="section-title reveal-child" data-delay="100" style={{ marginBottom: '3rem' }}>
              Let&apos;s build<br />
              <span className="section-title-dim">something real.</span>
            </h2>
          </div>

          <div className={`contact-grid reveal-block${inView ? ' in-view' : ''}`}>
            {/* LEFT — contact links */}
            <div className="reveal-child" data-delay="0" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p className="contact-intro">
                Open to <strong style={{ color: 'var(--text)' }}>Senior Frontend Engineer</strong>,{' '}
                <strong style={{ color: 'var(--text)' }}>React Developer</strong>, and{' '}
                <strong style={{ color: 'var(--text)' }}>AI-Augmented UI</strong> roles.
                Drop a message or reach out directly.
              </p>

              {contacts.map(c => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.external ? '_blank' : '_self'}
                  rel={c.external ? 'noopener noreferrer' : undefined}
                  className="contact-link"
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = c.color
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = ''
                    e.currentTarget.style.transform = ''
                  }}
                >
                  <div
                    className="contact-link-icon-wrap"
                    style={{
                      background: c.color + '18',
                      border: `1px solid ${c.color}33`,
                      color: c.color,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <div className="contact-link-label">{c.label}</div>
                    <div className="contact-link-value">{c.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* RIGHT — form */}
            <div className="reveal-child" data-delay="100">
              <div className="contact-form-wrap">
                <div className="contact-form-bar" />
                <div className="contact-form-title">Send a message</div>

                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label">NAME *</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="form-input"
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">EMAIL *</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-field" style={{ marginBottom: '1rem' }}>
                    <label className="form-label">SUBJECT</label>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Frontend Engineer enquiry / Project discussion"
                      className="form-input"
                    />
                  </div>

                  <div className="form-field" style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label">MESSAGE *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about the role / project..."
                      required
                      rows={5}
                      className="form-textarea"
                    />
                  </div>

                  {/* Status messages */}
                  {status === 'success' && (
                    <div className="form-status-success">
                      <CheckCircle size={16} />
                      Message sent! I'll get back to you soon.
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="form-status-error">
                      <AlertCircle size={16} />
                      Something went wrong. Please email me directly or use WhatsApp.
                    </div>
                  )}

                  <div className="form-actions">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className={`btn-submit ${status === 'sending' ? 'sending' : 'active'}`}
                    >
                      {status === 'sending'
                        ? <><Loader size={16} className="spin-icon" /> Sending...</>
                        : <><Send size={16} /> Send Message</>
                      }
                    </button>

                    <a
                      href="https://wa.me/919315993805?text=Hi%20Harsh%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity!"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-wa-form"
                    >
                      <MessageCircle size={16} /> WhatsApp
                    </a>
                  </div>

                  <p className="form-hint">
                    Message lands directly in my inbox · Or connect via WhatsApp for instant reply
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
