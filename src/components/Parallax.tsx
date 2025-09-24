'use client'

import React, { useEffect, useRef, useState } from 'react'

interface ParallaxProps {
  children: React.ReactNode
  className?: string
  /**
   * Scroll speed factor. Positive values move opposite to scroll (slower background-like),
   * negative values move with the scroll (foreground-like). Typical range: -0.3 to 0.5
   */
  speed?: number
  /** Optional extra offset in pixels */
  offset?: number
}

/**
 * Parallax wrapper that translates its children on the Y axis based on scroll position
 * relative to the viewport center for a natural parallax effect.
 */
const Parallax: React.FC<ParallaxProps> = ({ children, className = '', speed = 0.2, offset = 0 }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [y, setY] = useState(0)
  const rafRef = useRef<number | null>(null)
  const prefersReducedMotionRef = useRef(false)
  const targetYRef = useRef(0)
  const animatingRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Detect prefers-reduced-motion and disable parallax if enabled
    const mql = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateReducedMotion = () => {
      prefersReducedMotionRef.current = !!mql?.matches
    }
    updateReducedMotion()
    mql?.addEventListener?.('change', updateReducedMotion)

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const viewportCenter = window.innerHeight / 2
        const elementCenter = rect.top + rect.height / 2
        const distanceFromCenter = elementCenter - viewportCenter
        const effectiveSpeed = prefersReducedMotionRef.current ? 0 : speed
        const translateY = -(distanceFromCenter * effectiveSpeed) + offset
        targetYRef.current = translateY
        if (!animatingRef.current) startAnimating()
      })
    }

    // Run once on mount and on resize
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      mql?.removeEventListener?.('change', updateReducedMotion)
    }
  }, [speed, offset])

  // Smoothly ease y toward target using a small lerp factor
  const startAnimating = () => {
    animatingRef.current = true
    const step = () => {
      const target = targetYRef.current
      setY((prev) => {
        const next = prev + (target - prev) * 0.12 // easing factor
        return Math.abs(next - target) < 0.1 ? target : next
      })
      // Continue while not at target (within threshold)
      const isAtTarget = Math.abs(target - y) < 0.1
      if (!isAtTarget) {
        requestAnimationFrame(step)
      } else {
        animatingRef.current = false
      }
    }
    requestAnimationFrame(step)
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(0, ${y}px, 0)`,
        willChange: 'transform',
        transition: prefersReducedMotionRef.current ? undefined : 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {children}
    </div>
  )
}

export default Parallax
