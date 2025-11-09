'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  className?: string
  post: any
  lang?: string
}

const Card23: FC<Props> = ({ className, post, lang }) => {
  const { lastReadArticle, readCount, totalPosts } = post
  const slug =
    lastReadArticle?.parentCategory?.slug + '/' + lastReadArticle?.category?.slug + '/' + lastReadArticle?.slug
  const progressPercentage = Math.round((readCount / totalPosts) * 100)

  return (
    <Link
      href={lang === 'en' ? `/${slug}` : `/${lang}/${slug}`}
      className={clsx(
        'block w-full max-w-[600px]',
        'transform transition-transform duration-200 hover:-translate-y-0.5',
        className
      )}
    >
      <div className="flex items-center gap-4 rounded-lg bg-white p-4 dark:bg-[#0D0D0D]">
        {/* Image Container */}
        <div className="relative aspect-square h-20 w-20 flex-shrink-0 overflow-hidden rounded-[10px]">
          <Image
            src={lastReadArticle.thumbnail || '/images/placeholder-image.png'}
            alt={lastReadArticle.title || 'Article thumbnail'}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Title */}
          <h3 className="mb-1 line-clamp-1 text-sm font-medium text-[#000000] dark:text-white">
            {lastReadArticle.title}
          </h3>

          {/* Category */}
          <span className="mb-2 inline-block text-xs font-medium text-green-700">
            {lastReadArticle.category?.name || 'Uncategorized'}
          </span>

          {/* Progress Bar */}
          <div className="mb-1.5 h-1.5 w-full rounded-full bg-gray-100">
            <div
              className="h-1.5 rounded-full bg-green-600 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Progress Text */}
          <div className="flex justify-between text-xs text-gray-500">
            {/* <span>{progressPercentage}% completed</span> */}
            <span>
              {readCount} out of {totalPosts} articles read
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card23
