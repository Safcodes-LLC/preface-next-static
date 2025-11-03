'use client'

import { FC, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'

interface VideoHeroBannerProps {
  videoUrl?: string
  heading?: string
  className?: string
  nextSectionId?: string
}

const VideoHeroBanner: FC<VideoHeroBannerProps> = ({
  // videoUrl = 'https://www.youtube.com/watch?v=vHBodN0Mirs',
  // videoUrl = 'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/PREFACE_(A%20STREAM%20WITH%20MANY%20CURRENTS%20)%20(2).mp4',
  videoUrl = 'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/PREFACE_SEP_04(A%20STREAM%20WITH%20MANY%20CURRENTS_FINAL%20).mp4',
  heading = 'VIDEO',
  className = '',
  nextSectionId = 'magazine-section',
}) => {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRendered, setIsRendered] = useState(false)
  const playerRef = useRef<ReactPlayer | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isAnimatingRef = useRef(false)
  const touchStartYRef = useRef<number | null>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Render player immediately for autoplay
    setIsRendered(true)
    setIsPlaying(true)

    // Cleanup function to clear any pending timeouts
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  const scrollToNext = () => {
    if (isAnimatingRef.current) return

    const nextEl = document.getElementById(nextSectionId)
    if (!nextEl) return

    isAnimatingRef.current = true

    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Add a small delay before starting scroll for better performance
    scrollTimeoutRef.current = setTimeout(() => {
      nextEl.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })

      // Reset animation state after scroll completes
      scrollTimeoutRef.current = setTimeout(() => {
        isAnimatingRef.current = false
      }, 1200) // Slightly longer than the smooth scroll duration
    }, 100) // Small delay before starting scroll
  }

  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    // Only react to downward scroll to go to next section
    if (e.deltaY > 1) {
      if (e.cancelable) {
        e.preventDefault()
      }
      scrollToNext()
    }
  }

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartYRef.current = e.touches[0]?.clientY ?? null
  }

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchStartYRef.current == null) return
    const currentY = e.touches[0]?.clientY ?? touchStartYRef.current
    const deltaY = currentY - touchStartYRef.current
    // Swipe up (negative delta) should go to next section
    if (deltaY < -30) {
      e.preventDefault()
      scrollToNext()
      touchStartYRef.current = null
    }
  }
  // console.log('videoUrl', videoUrl)

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className={`relative h-screen w-full overflow-hidden ${className}`}
      // videoBackground
    >
      {isRendered && (
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isPlaying ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
          onPlay={() => setIsPlaying(true)}
        />
      )}

      {isRendered && (
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          muted={isMuted}
          // muted={false}
          playing={isPlaying}
          loop={true}
          controls={false}
          disablePictureInPicture={true}
          controlsList="nodownload nofullscreen noremoteplayback"
          style={{
            opacity: isPlaying ? 1 : 0,
          }}
          className="absolute inset-0 bg-gray-900/20 backdrop-blur-[10px] transition-opacity"
          width="100%"
          height="100%"
          onStart={() => {
            setIsPlaying(true)
          }}
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload nofullscreen noremoteplayback',
                disablePictureInPicture: true,
                playsInline: true,
              },
            },
          }}
        />
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      {/* Centered Heading */}
      {/* <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white tracking-wider">
          {heading}
        </h1>
      </div> */}
      {/* Mute/Unmute Button */}
      {isPlaying && (
        <button
          className="absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition-all hover:scale-110 hover:bg-black/80"
          onClick={() => setIsMuted(!isMuted)}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  )
}

export default VideoHeroBanner
