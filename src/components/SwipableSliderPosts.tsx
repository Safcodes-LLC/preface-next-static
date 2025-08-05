'use client'

import { ThemeContext } from '@/app/theme-provider'
import Card10 from '@/components/PostCards/Card10'
import Card10V2 from '@/components/PostCards/Card10V2'
import Card11 from '@/components/PostCards/Card11'
import Card4 from '@/components/PostCards/Card4'
import Card7 from '@/components/PostCards/Card7'
import Card9 from '@/components/PostCards/Card9'
import { TPost } from '@/data/posts'
import HeadingWithArrowBtns from '@/shared/HeadingWithArrowBtns'
import clsx from 'clsx'
import { FC, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useSwipeable } from 'react-swipeable'

interface SliderConfig {
  autoSlide?: boolean
  autoSlideInterval?: number
  showButtons?: boolean
  loop?: boolean
  slidesToScroll?: number
}

interface SwipableSliderPostsProps {
  className?: string
  heading?: string
  subHeading?: string
  dimHeading?: boolean
  posts: TPost[]
  postCardName?: 'card4' | 'card7' | 'card9' | 'card10' | 'card10V2' | 'card11'
  config?: SliderConfig
}

const defaultConfig: SliderConfig = {
  autoSlide: false,
  autoSlideInterval: 3000,
  showButtons: true,
  loop: true,
  slidesToScroll: 1,
}

const SwipableSliderPosts: FC<SwipableSliderPostsProps> = ({
  className,
  heading,
  subHeading,
  dimHeading,
  posts,
  postCardName = 'card4',
  config = {},
}) => {
  const mergedConfig = { ...defaultConfig, ...config }
  const { autoSlide, autoSlideInterval, showButtons, loop, slidesToScroll } = mergedConfig
  const theme = useContext(ThemeContext)

  const [currentPage, setCurrentPage] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(4)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const totalSlides = posts.length
  const totalPages = Math.ceil(totalSlides / cardsPerView)

  // Responsive handling
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth
      if (width < 640) setCardsPerView(1)
      else if (width < 768) setCardsPerView(2)
      else if (width < 1024) setCardsPerView(3)
      else if (width < 1280) setCardsPerView(4)
      else setCardsPerView(4)
    }

    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)
    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [])

  // Reset to first page when cardsPerView changes
  useEffect(() => {
    setCurrentPage(0)
  }, [cardsPerView])

  // Auto slide effect
  useEffect(() => {
    if (!autoSlide || isPaused || totalSlides === 0) return

    intervalRef.current = setInterval(() => {
      setCurrentPage((prev) => {
        const next = prev + 1
        return loop ? (next >= totalPages ? 0 : next) : Math.min(next, totalPages - 1)
      })
    }, autoSlideInterval)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [autoSlide, autoSlideInterval, isPaused, totalPages, loop, totalSlides])

  // Go to next page
  const goToNext = useCallback(() => {
    setCurrentPage((prev) => {
      const next = prev + 1
      return loop ? (next >= totalPages ? 0 : next) : Math.min(next, totalPages - 1)
    })
  }, [totalPages, loop])

  // Go to previous page
  const goToPrev = useCallback(() => {
    setCurrentPage((prev) => {
      const prevPage = prev - 1
      return loop ? (prevPage < 0 ? totalPages - 1 : prevPage) : Math.max(prevPage, 0)
    })
  }, [totalPages, loop])

  // Go to specific page (dot click)
  const goToPage = useCallback((pageIndex: number) => {
    setCurrentPage(pageIndex)
  }, [])

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrev,
    trackMouse: true,
    trackTouch: true,
    preventScrollOnSwipe: true,
  })

  const combinedRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node
      if (swipeHandlers.ref) (swipeHandlers.ref as any)(node)
    },
    [swipeHandlers.ref]
  )

  const renderCard = (post: TPost, index: number) => {
    switch (postCardName) {
      case 'card4':
        return <Card4 key={index} post={post} />
      case 'card7':
        return <Card7 key={index} post={post} />
      case 'card9':
        return <Card9 key={index} post={post} />
      case 'card10':
        return <Card10 key={index} post={post} />
      case 'card10V2':
        return <Card10V2 key={index} post={post} />
      case 'card11':
        return <Card11 key={index} post={post} />
      default:
        return null
    }
  }

  // Get current page posts
  const getCurrentPagePosts = () => {
    const startIndex = currentPage * cardsPerView
    const endIndex = startIndex + cardsPerView
    return posts.slice(startIndex, endIndex)
  }

  const currentPagePosts = getCurrentPagePosts()
  
  // Button states
  const prevBtnDisabled = !loop && currentPage === 0
  const nextBtnDisabled = !loop && currentPage >= totalPages - 1

  return (
    <div className={clsx('swipable-slider-posts relative', className)}>
      <HeadingWithArrowBtns
        subHeading={subHeading}
        hasNextPrev={showButtons}
        prevBtnDisabled={prevBtnDisabled}
        nextBtnDisabled={nextBtnDisabled}
        onClickPrev={goToPrev}
        onClickNext={goToNext}
      >
        {heading}
      </HeadingWithArrowBtns>

      {/* Debug display - remove this in production */}
      {/* <div className="text-sm text-gray-500 mb-2">
        Total Posts: {totalSlides} | Cards Per View: {cardsPerView} | Total Pages: {totalPages} | Current Page: {currentPage + 1} | Current Page Posts: {currentPagePosts.length}
      </div> */}

      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div ref={combinedRef} className="overflow-hidden" {...(({ ref, ...handlers }) => handlers)(swipeHandlers)}>
          {/* Simple grid layout - no complex translations */}
          <div className="grid gap-4" style={{
            gridTemplateColumns: `repeat(${cardsPerView}, 1fr)`,
          }}>
            {currentPagePosts.map((post, index) => (
              <div key={post.id || `${currentPage}-${index}`} className="px-2">
                {renderCard(post, currentPage * cardsPerView + index)}
              </div>
            ))}
            
            {/* Fill empty slots if last page has fewer cards */}
            {currentPagePosts.length < cardsPerView && 
              Array.from({ length: cardsPerView - currentPagePosts.length }).map((_, index) => (
                <div key={`empty-${index}`} className="px-2" />
              ))
            }
          </div>
        </div>

        {/* Show fallback if no posts */}
        {posts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No posts to display
          </div>
        )}

        {/* Pagination Dots */}
        {totalSlides > cardsPerView && totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => {
                  console.log(`Clicking dot ${pageIndex + 1}, showing posts:`, posts.slice(pageIndex * cardsPerView, (pageIndex + 1) * cardsPerView).map(p => p.id || p.title))
                  goToPage(pageIndex)
                }}
                className={clsx(
                  'w-2 h-2 rounded-full transition-all duration-200',
                  currentPage === pageIndex
                    ? 'bg-[#00652E] dark:bg-[#60A43A] w-6'
                    : 'bg-[#00652E] dark:bg-[#60A43A] hover:bg-[#0C7A3E] dark:hover:bg-[#4C872E]'
                )}
                aria-label={`Go to page ${pageIndex + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SwipableSliderPosts