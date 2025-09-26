'use client'

import { TPost } from '@/data/posts'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'

interface Props {
  className?: string
  post: TPost
  ratio?: string
  hiddenAuthor?: boolean
  lang?: any
}

const Card11: FC<Props> = ({ className, post, hiddenAuthor = false, ratio = 'aspect-5/3', lang }) => {
  const {
    title,
    subCategory,
    name,
    slug,
    featuredImage,
    handle,
    categories,
    date,
    likeCount,
    liked,
    commentCount,
    readingTime,
    bookmarked,
  } = post

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
        {/* <PostFeaturedMedia post={post} isHover={isHover} /> */}
        <Link href={lang === 'en' ? `/${slug}` : `/${lang}/${slug}`} className="block h-full w-full">
          <Image
            alt={name || title || 'Post image'}
            fill
            src={featuredImage}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 1600px) 100vw, 95vw"
            priority
          />
        </Link>
      </div>
      {/* <div className="absolute inset-x-3 top-3">
        <CategoryBadgeList categories={categories} />
      </div> */}

      <div className="flex grow items-center gap-3 rounded-b-3xl border p-4">
        {/* Left content: text (title + topic count) */}
        <div className="flex-1">
          <h3 className="nc-card-title block text-base font-normal text-neutral-900 dark:text-neutral-100">
            <Link href={lang === 'en' ? `/${slug}` : `/${lang}/${slug}`}>
              <span className="line-clamp-2" title={name || title}>
                {name || title}
              </span>
            </Link>
          </h3>
          <span className="text-xs font-normal">{subCategory?.length} topics</span>
        </div>

        {/* Right content: arrow icon (fixed size) */}
        <Link href={lang === 'en' ? `/${slug}` : `/${lang}/${slug}`}>
          <div className="group/arrow inline-flex items-center justify-center rounded-full border border-[#E2E2E2] bg-white p-1.5 transition-all duration-200 hover:scale-110 hover:border-neutral-300 hover:bg-neutral-50 dark:border-[#505050] dark:bg-[#0D0D0D] dark:hover:border-[#666] dark:hover:bg-[#1A1A1A]">
            <ArrowRightIcon className="h-3 w-3 text-[#919191] transition-transform duration-200 group-hover/arrow:translate-x-0.5 group-hover/arrow:text-[#919191] rtl:rotate-180 dark:text-[#707070] dark:group-hover/arrow:text-gray-300" />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Card11
