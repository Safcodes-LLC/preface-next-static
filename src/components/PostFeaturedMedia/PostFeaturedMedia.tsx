import { TPost } from '@/data/posts'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import PostTypeFeaturedIcon from '../PostTypeFeaturedIcon'
import GallerySlider from './GallerySlider'
import MediaAudio from './MediaAudio'
import MediaVideo from './MediaVideo'

interface Props {
  className?: string
  post: TPost
  isHover?: boolean
  autoPlay?: boolean
  href?: string
  isSquareImg?: boolean
}

const PostFeaturedMedia: FC<Props> = ({ className, post, isHover = false, autoPlay = false, href, isSquareImg = false }) => {
  const {
    featuredImage,
    featured_image,
    thumbnail,
    postType,
    videoFile,
    video_url,
    videoUrl,
    video_file,
    galleryImgs,
    audioUrl,
    handle,
    title,
  } = post

  // Use video_file as primary, then videoFile, then videoUrl as fallbacks
  const videoSource = video_url || videoUrl || video_file || videoFile || ''

  const renderPostGallery = () => {
    if (!galleryImgs) {
      return renderImage()
    }

    return <GallerySlider handle={handle} galleryImgs={galleryImgs} />
  }

  const renderPostVideo = () => {
    if (!videoSource) {
      return (
        <>
          {renderImage()}
          <PostTypeFeaturedIcon
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            postType={postType}
          />
        </>
      )
    }

    return (
      <>
        {renderImage()}
        {!isHover && (
          <PostTypeFeaturedIcon
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            postType={postType}
          />
        )}
        <MediaVideo isHover={isHover} videoUrl={videoSource} handle={handle} autoPlay={autoPlay} href={href} />
      </>
    )
  }

  const renderPostAudio = () => {
    return (
      <>
        {renderImage()}
        {audioUrl && <MediaAudio post={post} />}
        {!audioUrl && (
          <PostTypeFeaturedIcon
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            postType={postType}
          />
        )}
      </>
    )
  }

  const renderImage = () => {
    const imageSrc = isSquareImg ?  featured_image : featuredImage || thumbnail

    if (!imageSrc) {
      return (
        <Link href={href || `/abcd/${handle}`}>
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-gray-200 dark:bg-gray-800">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-2 text-sm">No image available</p>
            </div>
          </div>
        </Link>
      )
    }

    return (
      <Link href={href || `/abcd/${handle}`}>
        <Image
          alt={title}
          fill
          className="object-cover transition-transform duration-600 ease-in-out group-hover:scale-110"
          src={imageSrc}
          sizes="(max-width: 600px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/25 opacity-100 transition-opacity group-hover:opacity-75" />
      </Link>
    )
  }

  return (
    <div className={clsx('relative size-full overflow-hidden', className)}>
      {postType?.name === 'Gallery' && renderPostGallery()}
      {postType?.name === 'Video' && renderPostVideo()}
      {postType?.name === 'Podcast' && renderPostAudio()}
      {postType?.name !== 'Podcast' && postType?.name !== 'Video' && postType?.name !== 'Gallery' && renderImage()}
    </div>
  )
}

export default PostFeaturedMedia
