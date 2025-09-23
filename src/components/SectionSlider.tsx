'use client'

import { TCategory } from '@/data/categories'
import HeadingWithSub from '@/shared/Heading'
import clsx from 'clsx'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CardCategory1 from './CategoryCards/CardCategory1'
import CardCategory2 from './CategoryCards/CardCategory2'
import CardCategory3 from './CategoryCards/CardCategory3'
import CardCategory4 from './CategoryCards/CardCategory4'
import CardCategory5 from './CategoryCards/CardCategory5'

interface SliderConfig {
  autoSlide?: boolean
  autoSlideInterval?: number
  showButtons?: boolean
  loop?: boolean
  marquee?: boolean
  marqueeSpeed?: number
}

interface SectionSliderProps {
  className?: string
  heading?: string
  subHeading?: string
  dimHeading?: boolean
  categories: TCategory[]
  categoryCardType?: 'card1' | 'card2' | 'card3' | 'card4' | 'card5'
  config?: SliderConfig
  lang?: string
}

const defaultConfig: SliderConfig = {
  autoSlide: true,
  autoSlideInterval: 4000,
  showButtons: true,
  loop: true,
  marquee: false,
  marqueeSpeed: 50,
}

const SectionSlider: React.FC<SectionSliderProps> = ({
  heading,
  subHeading,
  className,
  categories,
  categoryCardType = 'card2',
  config = {},
  lang,
}) => {
  const cfg = { ...defaultConfig, ...config }
  const { autoSlide, autoSlideInterval, showButtons, loop, marquee, marqueeSpeed } = cfg

  const containerRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  const startXRef = useRef(0)
  const prevTranslateRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)
  const draggingRef = useRef(false)
  const pointerIdRef = useRef<number | null>(null)

  const marqueeRafRef = useRef<number | null>(null)
  const marqueeTranslateRef = useRef(0)
  const lastTsRef = useRef<number | null>(null)
  // Cached style refs to avoid redundant DOM writes
  const lastTransformRef = useRef<string>('')
  const lastTransitionRef = useRef<string>('')
  // Visibility / viewport refs
  const isInViewRef = useRef(true)
  const isPageVisibleRef = useRef(true)

  const [cardsPerView, setCardsPerView] = useState(5)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const slideWidthRef = useRef(0)
  const totalSlides = categories.length
  const isLooping = loop && totalSlides > 0
  const clonesCount = isLooping ? cardsPerView : 0
  const extendedCategories = useMemo(() => {
    if (!isLooping) return categories
    const head = categories.slice(0, clonesCount)
    const tail = categories.slice(-clonesCount)
    return [...tail, ...categories, ...head]
  }, [categories, clonesCount, isLooping])
  const extendedLength = extendedCategories.length
  const maxIndex = Math.max(0, totalSlides - cardsPerView)
  const autoplayRef = useRef<number | null>(null)
  const smoothTransitionRef = useRef(true)

  const renderCard = (item: TCategory, index: number) => {
    const badge = index < 3 ? `#${index + 1}` : undefined
    switch (categoryCardType) {
      case 'card1':
        return <CardCategory1 key={`${item.id}-${index}`} category={item} />
      case 'card2':
        return <CardCategory2 key={`${item.id}-${index}`} category={item} badge={badge} lang={lang} />
      case 'card3':
        return <CardCategory3 key={`${item.id}-${index}`} category={item} />
      case 'card4':
        return <CardCategory4 key={`${item.id}-${index}`} category={item} badge={badge} />
      case 'card5':
        return <CardCategory5 key={`${item.id}-${index}`} category={item} />
      default:
        return <CardCategory2 key={`${item.id}-${index}`} category={item} badge={badge} lang={lang} />
    }
  }

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 640) setCardsPerView(1)
      else if (w < 768) setCardsPerView(2)
      else if (w < 1024) setCardsPerView(3)
      else if (w < 1280) setCardsPerView(4)
      else setCardsPerView(5)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    const calc = () => {
      if (!containerRef.current) return
      const containerWidth = containerRef.current.clientWidth
      slideWidthRef.current = containerWidth / cardsPerView
      if (marquee) {
        if (isLooping) {
          marqueeTranslateRef.current = -clonesCount * slideWidthRef.current
        } else {
          marqueeTranslateRef.current = 0
        }
        applyTranslate(marqueeTranslateRef.current, 0)
      } else {
        applyTranslate(-currentIndex * slideWidthRef.current, 0)
      }
    }

    calc()
    const RO = (window as any).ResizeObserver || null
    const ro = RO ? new RO(() => calc()) : null
    if (containerRef.current && ro) ro.observe(containerRef.current)
    window.addEventListener('resize', calc)
    return () => {
      if (ro && containerRef.current) ro.unobserve(containerRef.current)
      window.removeEventListener('resize', calc)
    }
  }, [cardsPerView, marquee, isLooping, clonesCount, currentIndex])

  useEffect(() => {
    if (!isLooping) return
    if (marquee) {
      marqueeTranslateRef.current = -clonesCount * slideWidthRef.current
      applyTranslate(marqueeTranslateRef.current, 0)
      return
    }
    smoothTransitionRef.current = false
    setCurrentIndex((prev) => {
      const min = clonesCount
      const max = clonesCount + totalSlides - 1
      if (prev >= min && prev <= max) return prev
      return clonesCount
    })
    applyTranslate(-clonesCount * slideWidthRef.current, 0)
  }, [cardsPerView, totalSlides, clonesCount, isLooping, marquee])

  useEffect(() => {
    if (marquee) return
    const target = -currentIndex * slideWidthRef.current
    prevTranslateRef.current = target
    const ms = smoothTransitionRef.current ? 500 : 0
    applyTranslate(target, ms)
    smoothTransitionRef.current = true
  }, [currentIndex, marquee])

  const applyTranslate = (px: number, transitionMs = 500) => {
    const el = trackRef.current
    if (!el) return
    const nextTransition = transitionMs > 0 ? `transform ${transitionMs}ms ease-in-out` : 'none'
    if (lastTransitionRef.current !== nextTransition) {
      el.style.transition = nextTransition
      lastTransitionRef.current = nextTransition
    }
    const nextTransform = `translate3d(${px}px, 0, 0)`
    if (lastTransformRef.current !== nextTransform) {
      el.style.transform = nextTransform
      lastTransformRef.current = nextTransform
    }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button && e.button !== 0) return

    const el = trackRef.current
    if (!el || !containerRef.current) return
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    pointerIdRef.current = e.pointerId

    draggingRef.current = true
    startXRef.current = e.clientX
    prevTranslateRef.current = getCurrentTranslate()
    el.style.transition = 'none'
    setIsPaused(true)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return
    const delta = e.clientX - startXRef.current
    const next = prevTranslateRef.current + delta
    let limited = next
    if (!isLooping) {
      const maxTranslate = 0
      const minTranslate = -maxIndex * slideWidthRef.current
      if (next > maxTranslate + 80) limited = maxTranslate + 80
      if (next < minTranslate - 80) limited = minTranslate - 80
    }
    applyTranslate(limited, 0)
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (!draggingRef.current) return
    draggingRef.current = false
    setIsPaused(false)
    try {
      ;(e.target as Element).releasePointerCapture?.(e.pointerId)
    } catch {}
    const endX = e.clientX
    const movedPx = endX - startXRef.current
    const threshold = slideWidthRef.current * 0.25

    if (marquee) {
      marqueeTranslateRef.current = getCurrentTranslate()
      return
    }

    if (movedPx < -threshold) {
      goToNext()
    } else if (movedPx > threshold) {
      goToPrev()
    } else {
      applyTranslate(-currentIndex * slideWidthRef.current, 200)
    }
  }

  const getCurrentTranslate = () => {
    if (!trackRef.current) return 0
    const style = window.getComputedStyle(trackRef.current)
    const transform = style.transform || ''
    if (transform && transform !== 'none') {
      const match = transform.match(/matrix.*\((.+)\)/)
      if (match) {
        const parts = match[1].split(',').map((s) => s.trim())
        const tx = parseFloat(parts[4])
        return tx || 0
      }
    }
    return 0
  }

  const goToNext = useCallback(() => {
    if (marquee) {
      const next = getCurrentTranslate() - slideWidthRef.current
      marqueeTranslateRef.current = next
      applyTranslate(next, 200)
      return
    }
    setCurrentIndex((prev) => {
      if (isLooping) return prev + 1
      if (prev >= maxIndex) return maxIndex
      return prev + 1
    })
  }, [isLooping, maxIndex, marquee])

  const goToPrev = useCallback(() => {
    if (marquee) {
      const next = getCurrentTranslate() + slideWidthRef.current
      marqueeTranslateRef.current = next
      applyTranslate(next, 200)
      return
    }
    setCurrentIndex((prev) => {
      if (isLooping) return prev - 1
      if (prev <= 0) return 0
      return prev - 1
    })
  }, [isLooping, marquee])

  useEffect(() => {
    if (marquee) return
    if (!autoSlide || totalSlides <= cardsPerView) return

    const startAutoplay = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
      autoplayRef.current = window.setInterval(() => {
        if (!draggingRef.current && !isPaused) {
          goToNext()
        }
      }, autoSlideInterval)
    }

    startAutoplay()

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
        autoplayRef.current = null
      }
    }
  }, [autoSlide, autoSlideInterval, isPaused, cardsPerView, totalSlides, goToNext, marquee])

  useEffect(() => {
    if (!marquee || !autoSlide || !isLooping || totalSlides <= 0) return
    marqueeTranslateRef.current = marqueeTranslateRef.current || -clonesCount * slideWidthRef.current
    applyTranslate(marqueeTranslateRef.current, 0)
    let mounted = true
    const step = (ts: number) => {
      if (!mounted) return
      if (draggingRef.current || isPaused || !isInViewRef.current || !isPageVisibleRef.current) {
        lastTsRef.current = ts
        marqueeRafRef.current = requestAnimationFrame(step)
        return
      }
      if (lastTsRef.current == null) lastTsRef.current = ts
      const dt = Math.min(64, ts - lastTsRef.current)
      lastTsRef.current = ts
      const speedPxPerMs = Math.max(5, marqueeSpeed || 50) / 1000
      let next = marqueeTranslateRef.current - speedPxPerMs * dt
      const oneCycleWidth = totalSlides * slideWidthRef.current
      const minTranslate = -(clonesCount + totalSlides) * slideWidthRef.current
      if (next <= minTranslate) {
        next += oneCycleWidth
      }
      marqueeTranslateRef.current = next
      applyTranslate(next, 0)
      marqueeRafRef.current = requestAnimationFrame(step)
    }
    marqueeRafRef.current = requestAnimationFrame(step)
    return () => {
      mounted = false
      if (marqueeRafRef.current) cancelAnimationFrame(marqueeRafRef.current)
      marqueeRafRef.current = null
      lastTsRef.current = null
    }
  }, [marquee, autoSlide, isLooping, totalSlides, clonesCount, marqueeSpeed])

  // Pause when slider offscreen using IntersectionObserver
  useEffect(() => {
    const root = containerRef.current
    if (!root) return
    // Observe the container itself for visibility in viewport
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        isInViewRef.current = entry?.isIntersecting ?? true
      },
      { threshold: 0.1 }
    )
    io.observe(root)
    return () => io.disconnect()
  }, [])

  // Pause when tab not visible
  useEffect(() => {
    const onVis = () => {
      isPageVisibleRef.current = !document.hidden
    }
    document.addEventListener('visibilitychange', onVis)
    onVis()
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const onTransitionEnd = () => {
    if (marquee) return
    if (!isLooping || totalSlides === 0) return
    const min = clonesCount
    const max = clonesCount + totalSlides - 1
    if (currentIndex > max) {
      smoothTransitionRef.current = false
      const newIndex = currentIndex - totalSlides
      setCurrentIndex(newIndex)
      applyTranslate(-newIndex * slideWidthRef.current, 0)
    } else if (currentIndex < min) {
      smoothTransitionRef.current = false
      const newIndex = currentIndex + totalSlides
      setCurrentIndex(newIndex)
      applyTranslate(-newIndex * slideWidthRef.current, 0)
    }
  }

  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  const trackStyle: React.CSSProperties = {
    display: 'flex',
    willChange: 'transform',
    touchAction: 'pan-y',
    userSelect: 'none',
  }

  return (
    <div className={clsx('section-slider relative', className)}>
      {heading && <HeadingWithSub subHeading={subHeading}>{heading}</HeadingWithSub>}

      <div
        ref={containerRef}
        className="relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showButtons && totalSlides > cardsPerView && (
          <button
            aria-label="Previous slide"
            onClick={goToPrev}
            className="absolute top-1/2 left-2 z-20 -translate-y-1/2 rounded-full bg-white p-2 shadow-md"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {showButtons && totalSlides > cardsPerView && (
          <button
            aria-label="Next slide"
            onClick={goToNext}
            className="absolute top-1/2 right-2 z-20 -translate-y-1/2 rounded-full bg-white p-2 shadow-md"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        <div
          ref={trackRef}
          style={trackStyle}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onTransitionEnd={onTransitionEnd}
          className="w-full"
        >
          {extendedCategories.map((category, index) => (
            <div
              key={`${category.id ?? 'cat'}-ext-${index}`}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / cardsPerView}%` }}
            >
              {renderCard(category, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SectionSlider
