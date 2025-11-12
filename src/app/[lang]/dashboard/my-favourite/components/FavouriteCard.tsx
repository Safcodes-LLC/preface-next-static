'use client'

import PostCardMeta4 from '@/components/PostCardMeta/PostCardMeta4'
import PostFeaturedMedia from '@/components/PostFeaturedMedia/PostFeaturedMedia'
import { TPost } from '@/data/posts'
import clsx from 'clsx'
import { FC, useState } from 'react'

interface Props {
  className?: string
  post: TPost
  ratio?: string
  lang?: string
}

const FavouriteCard: FC<Props> = ({ className, post, ratio = 'aspect-square sm:aspect-6/5', lang }) => {
  const [isHover, setIsHover] = useState(false)
  const { categories, bookmarked, likeCount, liked, favoriteCount, slug } = post
  console.log(post, 'post check for favourite articles')

  return (
    <div
      className={clsx('group post-card-10 relative flex flex-col', className)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className={clsx('relative z-0 w-full shrink-0 overflow-hidden rounded-2xl', ratio)}>
        <PostFeaturedMedia
          post={post}
          isHover={isHover}
          href={
            '/'
            // lang === 'en'
            //   ? `/${categories[0].parentCategory.slug}/${categories[0].slug}/${slug}`
            //   : `/${lang}/${categories[0].parentCategory.slug}/${categories[0].slug}/${slug}`
          }
        />
      </div>

      <PostCardMeta4 meta={post} className="mx-2 mt-4" isFavouriteDashboard={true} />
    </div>
  )
}

export default FavouriteCard
