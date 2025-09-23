'use client'
import { TPost } from '@/data/posts'
import clsx from 'clsx'
import { FC, useState } from 'react'
import CategoryBadgeList from '../CategoryBadgeList'
import PostCardMeta2 from '../PostCardMeta/PostCardMeta2'
import PostCardSaveBtn from '../PostCardSaveBtn'
import PostFeaturedMedia from '../PostFeaturedMedia/PostFeaturedMedia'
import PostCardLikeBtn from '../PostCardLikeBtn'

interface Props {
  className?: string
  post: TPost
  ratio?: string
  lang?: string
}

const Card10V2: FC<Props> = ({ className, post, ratio = 'aspect-square sm:aspect-11/12', lang }) => {
  const { handle, categories, bookmarked, slug, favoriteCount, likeCount, liked } = post

  const [isHover, setIsHover] = useState(false)

  return (
    <div
      className={clsx('group post-card-10-v2 relative flex flex-col', className)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className={clsx('relative w-full shrink-0 overflow-hidden rounded-[15px]', ratio)}>
        <PostFeaturedMedia
          post={post}
          isHover={isHover}
          href={
            lang === 'en'
              ? `/${categories[0]?.parentCategory.slug}/${categories[0]?.slug}/${slug}`
              : `/${lang}/${categories[0]?.parentCategory.slug}/${categories[0]?.slug}/${slug}`
          }
        />
      </div>
      <div className="absolute inset-x-3 top-3 flex items-start gap-2">
        <CategoryBadgeList categories={categories} />
        <div className="ms-auto flex gap-1">
          <PostCardLikeBtn likeCount={favoriteCount || likeCount} liked={liked} post={post} />
          <PostCardSaveBtn bookmarked={bookmarked} />
        </div>
      </div>

      <PostCardMeta2 meta={post} className="mt-4" />
    </div>
  )
}

export default Card10V2