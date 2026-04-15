import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const ringRef   = useRef(null)
  const [hovered, setHovered] = useState(false)
  let rx = 0, ry = 0, mx = 0, my = 0

  useEffect(() => {
    const move = e => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', move)

    const animate = () => {
      rx += (mx - rx) * 0.13
      ry += (my - ry) * 0.13
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + 'px'
        cursorRef.current.style.top  = my + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px'
        ringRef.current.style.top  = ry + 'px'
      }
      requestAnimationFrame(animate)
    }
    animate()

    const over = () => setHovered(true)
    const out  = () => setHovered(false)
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', over)
      el.addEventListener('mouseleave', out)
    })

    return () => document.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div ref={cursorRef} style={{
        position: 'fixed', width: hovered ? '18px' : '10px', height: hovered ? '18px' : '10px',
        background: '#6c63ff', borderRadius: '50%', pointerEvents: 'none',
        zIndex: 9999, transform: 'translate(-50%,-50%)',
        transition: 'width 0.2s, height 0.2s', mixBlendMode: 'exclusion',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', width: hovered ? '48px' : '32px', height: hovered ? '48px' : '32px',
        border: '1.5px solid #6c63ff', borderRadius: '50%', pointerEvents: 'none',
        zIndex: 9998, transform: 'translate(-50%,-50%)',
        transition: 'width 0.3s, height 0.3s', opacity: 0.7,
      }} />
    </>
  )
}
