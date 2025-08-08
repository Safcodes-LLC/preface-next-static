'use client'

import { TPost } from '@/data/posts'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { FC, useState } from 'react'
import PostFeaturedMedia from '../PostFeaturedMedia/PostFeaturedMedia'

interface Props {
  className?: string
  post: TPost
  ratio?: string
  hiddenAuthor?: boolean
}

const Card11: FC<Props> = ({ className, post, hiddenAuthor = false, ratio = 'aspect-5/3' }) => {
  const { title, handle, categories, date, likeCount, liked, commentCount, readingTime, bookmarked } = post
  // console.log(post, 'post check')

  const [isHover, setIsHover] = useState(false)

  return (
    <div
      className={clsx(
        'group post-card-11 relative flex flex-col justify-between rounded-2xl bg-white dark:bg-white/5',
        className
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className={clsx('relative w-full shrink-0 overflow-hidden rounded-t-3xl', ratio)}>
        <PostFeaturedMedia post={post} isHover={isHover} />
      </div>
      {/* <div className="absolute inset-x-3 top-3">
        <CategoryBadgeList categories={categories} />
      </div> */}

      <div className="flex grow items-center gap-3 rounded-b-3xl border p-4">
        {/* Left content: text (title + topic count) */}
        <div className="flex-1">
          <h3 className="nc-card-title block text-base font-normal text-neutral-900 dark:text-neutral-100">
            <Link href={`/post/${post.handle}`} className="line-clamp-2" title={title}>
              {title}
            </Link>
          </h3>
          <span className="text-xs font-normal">7 topics</span>
        </div>

        {/* Right content: arrow icon (fixed size) */}
        <div className="flex h-7 w-7 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#E2E2E2]transition-transform duration-200 hover:translate-x-0.5 hover:bg-[#f3f3f3] dark:border-[#505050] dark:bg-[#0D0D0D] dark:hover:bg-[#1a1a1a]">
          <ArrowRightIcon className="h-3 w-3 text-[#C2C2C2] transition-colors duration-200 rtl:rotate-180 dark:text-[#707070] dark:hover:text-white" />
        </div>
      </div>
    </div>
    
  )
}

export default Card11
