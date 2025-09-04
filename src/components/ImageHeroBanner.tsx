'use client'
import { PlayIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'

interface SlideContent {
  id: number
  title: string
  description: string
  imageUrl: string
  duration?: string
}

interface ImageHeroBannerProps {
  imageUrl?: string
  heading?: string
  className?: string
  alt?: string
  slides?: SlideContent[]
}

const defaultSlides: SlideContent[] = [
  {
    id: 1,
    title: 'How to Pray that cleanses your soul to Pray that cleanses your body',
    description: 'Learn the proper way to perform prayer',
    imageUrl: '/images/banner/visual-banner.png',
    duration: '5 min',
  },
  {
    id: 2,
    title: 'How to Pray that cleanses your soul to Pray that cleanses your body',
    description: 'Understanding the spiritual aspects',
    imageUrl: '/images/banner/common-banner.png',
    duration: '7 min',
  },
  {
    id: 3,
    title: 'How to Pray that cleanses your soul to Pray that cleanses your body',
    description: 'The importance of daily prayers',
    imageUrl: '/images/banner/visual-banner.png',
    duration: '4 min',
  },
  {
    id: 4,
    title: 'How to Pray that cleanses your soul to Pray that cleanses your body',
    description: 'The importance of daily prayers',
    imageUrl: '/images/banner/common-banner.png',
    duration: '4 min',
  },
  {
    id: 5,
    title: 'How to Pray that cleanses your soul to Pray that cleanses your body',
    description: 'The importance of daily prayers',
    imageUrl: '/images/banner/visual-banner.png',
    duration: '4 min',
  },
]

const ImageHeroBanner: FC<ImageHeroBannerProps> = ({
  imageUrl = '/images/banner/visual-banner.png',
  heading = 'The Message of Mohammads PBUH Life',
  className = '',
  alt = 'Hero Banner',
  slides = defaultSlides,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false) // Stop auto-play when user manually navigates
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
  }

  return (
    <div className={`relative h-screen w-full overflow-hidden ${className}`}>
      {/* Background Images with Transitions */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.imageUrl}
              alt={`${alt} - ${slide.title}`}
              fill
              priority={index === 0}
              className="object-cover"
              quality={100}
            />
          </div>
        ))}
      </div>

      {/* Linear Gradient Overlay - Center to Bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />

      {/* Main Content */}
      <div className="absolute inset-0 container flex items-end pb-24">
        {/* Left Content */}
        <div className="flex flex-1 flex-col pr-2 md:pr-8">
          <h1 className="mb-4 text-2xl font-semibold tracking-wider text-white md:text-3xl md:font-bold max-w-full md:max-w-2xl">
            {slides[currentSlide]?.title}
          </h1>
          <p className="mb-6 max-w-md text-sm leading-relaxed text-white/90 md:text-base">
            {slides[currentSlide]?.description}
          </p>

          {/* Play Now Button */}
          <button className="inline-flex w-fit items-center gap-2 rounded-md bg-[#60A43A] px-6 py-3 text-white transition-colors duration-200 hover:bg-[#4C872E] whitespace-nowrap">
            <PlayIcon className="h-4 w-4 flex-shrink-0" />
            Play now
          </button>
        </div>

        {/* Right Side - Content Info */}
        <div className="hidden md:flex flex-1 justify-end">
          <div className="relative">
            {/* Current Slide Info Display */}
            {/* <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 text-white">
              <h3 className="text-sm font-medium mb-2 line-clamp-2">
                {slides[currentSlide]?.title}
              </h3>
              <p className="text-xs text-white/80 mb-3">
                {slides[currentSlide]?.description}
              </p>
              {slides[currentSlide]?.duration && (
                <span className="text-xs bg-white/20 px-2 py-1 rounded">
                  {slides[currentSlide].duration}
                </span>
              )}
            </div> */}

            {/* Navigation Arrows */}
            {/* {slides.length > 1 && (
              <div className="flex justify-between mt-4">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors duration-200"
                  aria-label="Previous slide"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors duration-200"
                  aria-label="Next slide"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            )} */}

            {/* Pagination Dots */}
            {slides.length > 1 && (
              <div className="mt-6 flex justify-center space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-200 ${
                      currentSlide === index ? 'w-6 bg-[#60A43A]' : 'w-2 bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageHeroBanner