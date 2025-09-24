'use client'

import React, { useEffect, useRef, useState } from 'react'

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** delay in ms before the animation starts after entering viewport */
  delay?: number
  /** once: if true, animation runs only the first time (default true) */
  once?: boolean
  /** amount of translate in Tailwind units (e.g., '6' => translate-y-6 initially) */
  distance?: '2' | '4' | '6' | '8' | '10' | '12'
}

const Reveal: React.FC<RevealProps> = ({ children, className = '', delay = 0, once = true, distance = '6' }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            setHasShown(true)
            if (once) observer.disconnect()
          } else if (!once) {
            setInView(false)
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  const baseHidden = `opacity-0 translate-y-${distance}`
  const baseShown = 'opacity-100 translate-y-0'

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView || hasShown ? baseShown : baseHidden} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default Reveal
