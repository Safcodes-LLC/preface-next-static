'use client'

import { TPost } from '@/data/posts'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  className?: string
  post: TPost
  lang?: string
}

const Card17: FC<Props> = ({ className, post, lang }) => {
  const {
    title,
    name,
    handle,
    parentCategory,
    slug,
    featuredIcon,
    totalArticles,
    featuredImage,
    postType,
    icon,
    date,
    readingTime,
  } = post
  const IS_AUDIO = postType === 'audio'

  return (
    <Link
      href={lang === 'en' ? `/${parentCategory?.slug}/${slug}` : `/${lang}/${parentCategory?.slug}/${slug}`}
      className="block"
    >
      <div
        className={clsx(
          'post-card-17 group relative flex items-center justify-between gap-x-4 overflow-hidden rounded-xl bg-white p-4 transition-all duration-300 ease-in-out',
          'hover:-translate-y-0.5 dark:bg-[#0D0D0D]',
          'transform-gpu will-change-transform',
          'dark:hover:bg-[#1A1A1A]',
          className
        )}
      >
        <div className="relative h-[70px] w-[70px] shrink-0 rounded-full bg-[#F8F8F8] dark:bg-[#1A1A1A]">
          <div className="relative h-full w-full transition-transform duration-300 group-hover:scale-110">
            <Image
              sizes="70px"
              className="object-contain p-4"
              src={featuredIcon || icon?.src || '/images/placeholder-image.png'}
              fill
              alt={name || title}
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col text-left">
          <h2 className="block text-base font-medium text-[#000000] transition-colors duration-300 group-hover:text-[#00652E] dark:text-white dark:group-hover:text-[#60a43a]">
            <span className="line-clamp-1">{name || title}</span>
          </h2>
          <div className="mt-1">
            <span className="text-[12px] font-[400] text-neutral-500 transition-colors duration-300 group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-neutral-300">
              {totalArticles} Articles
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card17
