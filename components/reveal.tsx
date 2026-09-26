'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

export function Reveal({
  index = 0,
  children,
}: {
  index?: number
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    document.documentElement.classList.add('js')
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            io.disconnect()
          }
        }
      },
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-inview={inView || undefined}
      style={{ '--stagger': `${index * 70}ms` } as CSSProperties}
      className="reveal"
    >
      {children}
    </div>
  )
}
