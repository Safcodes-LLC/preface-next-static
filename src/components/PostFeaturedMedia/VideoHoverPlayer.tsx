'use client'

import { TPost } from '@/data/posts'
import SpinLoading from '@/shared/spin-loading'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import PostTypeFeaturedIcon from '../PostTypeFeaturedIcon'
import MediaVideo from './MediaVideo'

interface Props {
  className?: string
  post: TPost
  customVideo?: { video?: string; youtubeLink?: string }
  customVideoImage?: string
}

const VideoHoverPlayer: FC<Props> = ({ className, post, customVideo, customVideoImage }) => {
  const { featuredImage, thumbnail, postType, videoFile, videoUrl, video_file, handle, title } = post
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Use video_file as primary, then videoFile, then videoUrl as fallbacks
  const videoSource = video_file || videoFile || videoUrl

  const handleMouseEnter = () => {
    setIsHovered(true)
    setIsLoading(true)

    // If no video source, stop loading after 2 seconds
    if (!videoSource) {
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsLoading(false)
  }

  const handleVideoStart = () => {
    setIsLoading(false)
  }

  // Build a safe YouTube embed URL from various possible inputs:
  // - full watch URL: https://www.youtube.com/watch?v=VIDEO_ID
  // - short URL: https://youtu.be/VIDEO_ID
  // - already embed URL: https://www.youtube.com/embed/VIDEO_ID
  // - plain ID: VIDEO_ID
  const getYouTubeEmbedUrl = (link?: string) => {
    if (!link) return ''
    // If the link already looks like an embed URL, just append params
    try {
      const url = new URL(link)
      const hostname = url.hostname.toLowerCase()

      // youtu.be short link
      if (hostname.includes('youtu.be')) {
        const id = url.pathname.replace(/^\//, '')
        return id ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1` : ''
      }

      // youtube full domain
      if (hostname.includes('youtube.com')) {
        // already an embed
        if (url.pathname.startsWith('/embed/')) {
          const id = url.pathname.split('/embed/')[1]
          return id ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1` : ''
        }

        // watch?v=VIDEO_ID
        const v = url.searchParams.get('v')
        if (v) return `https://www.youtube.com/embed/${v}?autoplay=1&mute=1`
      }
    } catch (e) {
      // Not a valid URL — fallthrough to treat link as possible ID
    }

    // Fallback: try to extract a 11-char YouTube id from the provided string
    const idMatch = link.match(/[A-Za-z0-9_-]{11}/)
    if (idMatch) return `https://www.youtube.com/embed/${idMatch[0]}?autoplay=1&mute=1`

    return ''
  }

  const youtubeEmbedSrc = getYouTubeEmbedUrl(customVideo?.youtubeLink)

  const renderImage = () => {
    const imageSrc = featuredImage || thumbnail
    if (!imageSrc) return null
    return (
      <Image
        alt={title}
        fill
        className="object-cover transition-transform duration-600 ease-in-out group-hover:scale-110"
        src={customVideoImage || imageSrc}
        sizes="(max-width: 600px) 100vw, 50vw"
      />
    )
  }

  return (
    <div
      className={clsx('relative size-full overflow-hidden', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image */}
      {renderImage()}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Video Icon - shown when not hovered */}
      {!isHovered && (
        <div className="absolute inset-0 flex items-center justify-center">
          <PostTypeFeaturedIcon
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            postType={postType}
            wrapSize="size-12 sm:size-16"
            iconSize="size-6 sm:size-8"
          />
        </div>
      )}

      {/* Loading Spinner - shown when hovered and loading */}
      {isHovered && isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <SpinLoading className="size-12" />
        </div>
      )}

      {/* Video Player - shown when hovered and video source exists */}
      {isHovered &&
        (videoSource || customVideo?.video || customVideo?.youtubeLink) &&
        (customVideo?.video ? (
          <MediaVideo
            isHover={true}
            videoUrl={customVideo?.video || videoSource || ''}
            handle={handle}
            autoPlay={true}
            onStart={handleVideoStart}
          />
        ) : youtubeEmbedSrc ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={youtubeEmbedSrc}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay"
            allowFullScreen
          />
        ) : null)}

      {/* Fallback for no video source - keep showing loading */}
      {isHovered && !videoSource && isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <SpinLoading className="size-12" />
        </div>
      )}

      {/* Link overlay */}
      <Link href={`/video/${post.slug}`} className="absolute inset-0 z-10" />
    </div>
  )
}

export default VideoHoverPlayer
