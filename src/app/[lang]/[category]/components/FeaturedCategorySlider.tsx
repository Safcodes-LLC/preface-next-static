'use client'

import Card22 from '@/components/PostCards/Card22'
import { useCarouselArrowButtons } from '@/hooks/use-carousel-arrow-buttons'
import { useCarouselDotButton } from '@/hooks/use-carousel-dot-buttons'
import HeadingWithArrowBtns from '@/shared/HeadingWithArrowBtns'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useEffect, useRef, useState } from 'react'

interface Props {
  posts: any[]
  lang?: string
  heading?: string
  className?: string
  emblaOptions?: EmblaOptionsType
}

const FeaturedCategorySlider: React.FC<Props> = ({ posts, lang, heading, className, emblaOptions }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    containScroll: false,
    ...emblaOptions,
  })

  // Autoplay with pause on hover
  const [isPaused, setIsPaused] = useState(false)
  const autoplayRef = useRef<number | null>(null)

  useEffect(() => {
    if (!emblaApi) return
    const start = () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current)
      autoplayRef.current = window.setInterval(() => {
        if (!isPaused) emblaApi.scrollNext()
      }, 4000)
    }
    start()
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current)
    }
  }, [emblaApi, isPaused])

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = useCarouselArrowButtons(emblaApi)
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useCarouselDotButton(emblaApi)

  if (!posts?.length) return null

  return (
    <div
      className={clsx('featured-category-slider relative', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {heading ? (
        <HeadingWithArrowBtns
          hasNextPrev
          prevBtnDisabled={prevBtnDisabled}
          nextBtnDisabled={nextBtnDisabled}
          onClickPrev={onPrevButtonClick}
          onClickNext={onNextButtonClick}
        >
          {heading}
        </HeadingWithArrowBtns>
      ) : null}

      <div className="w-full embla" ref={emblaRef}>
        <div className="embla__container w-full">
          {posts.map((post) => (
            <div key={post._id} className="embla__slide basis-full">
              <Card22 post={post} lang={lang} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom controls: prev/next + dots */}
      <div className="mt-4 flex w-full items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous"
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          className={clsx(
            'aspect-square cursor-pointer rounded-full bg-neutral-100 px-3 py-2 text-sm text-neutral-700 transition hover:bg-neutral-200 disabled:opacity-50 dark:bg-white/10 dark:text-white dark:hover:bg-white/20'
          )}
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          {scrollSnaps.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => onDotButtonClick(idx)}
              className={clsx(
                'h-2 w-2 rounded-full transition-colors',
                selectedIndex === idx ? 'bg-[#00652E]' : 'bg-neutral-300 dark:bg-neutral-600'
              )}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next"
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          className={clsx(
            'aspect-square cursor-pointer rounded-full bg-neutral-100 px-3 py-2 text-sm text-neutral-700 transition hover:bg-neutral-200 disabled:opacity-50 dark:bg-white/10 dark:text-white dark:hover:bg-white/20'
          )}
        >
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default FeaturedCategorySlider
