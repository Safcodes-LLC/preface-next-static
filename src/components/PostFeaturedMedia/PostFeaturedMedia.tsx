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
}

const PostFeaturedMedia: FC<Props> = ({ className, post, isHover = false, autoPlay = false }) => {
  const { featuredImage, thumbnail, postType, videoUrl, galleryImgs, audioUrl, handle, title } = post

  const renderPostGallery = () => {
    if (!galleryImgs) {
      return renderImage()
    }

    return <GallerySlider handle={handle} galleryImgs={galleryImgs} />
  }

  const renderPostVideo = () => {
    if (!videoUrl) {
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
        <MediaVideo isHover={isHover} videoUrl={videoUrl} handle={handle} autoPlay={autoPlay} />
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
    const imageSrc = featuredImage || thumbnail;
    if (!imageSrc) return null;
    return (
      <Link href={`/post/${handle}`}>
        <Image alt={title} fill className="object-cover" src={imageSrc} sizes="(max-width: 600px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-black/25 opacity-100 transition-opacity group-hover:opacity-75" />
      </Link>
    )
  }

  return (
    <div className={clsx('relative size-full overflow-hidden', className)}>
      {postType === 'gallery' && renderPostGallery()}
      {postType === 'video' && renderPostVideo()}
      {postType === 'audio' && renderPostAudio()}
      {postType !== 'audio' && postType !== 'video' && postType !== 'gallery' && renderImage()}
    </div>
  )
}

export default PostFeaturedMedia
