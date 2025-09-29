'use client'

import { TPost } from '@/data/posts'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'

interface Props {
  className?: string
  post: TPost
  lang?: string
}

const Card17Filter: FC<Props> = ({ className, post, lang }) => {
  const { title, name, parentCategory, slug, featuredIcon, totalArticles, icon } = post

  return (
    <div className="flex cursor-pointer flex-wrap gap-2 sm:gap-4">
      <div
        className={clsx(
          'post-card-17-filter group relative flex items-center justify-between gap-x-3 rounded-[10px] bg-white px-3 py-[10px] hover:bg-[#00652E] dark:bg-[#0D0D0D]',
          className
        )}
      >
        <div className="relative h-[36px] w-[36px] shrink-0 rounded-full bg-[#F8F8F8] dark:bg-[#1A1A1A]">
          <Image
            className="object-contain p-2"
            src={featuredIcon || icon?.src || '/images/placeholder-image.png'}
            fill
            alt={name || title}
          />
        </div>
        <div className="flex flex-1 flex-col text-left">
          <h2 className="block text-sm text-[#000000] group-hover:text-white dark:text-white">
            <span className="">{name || title}</span>
          </h2>
          <span className="text-[9px] font-[400] text-neutral-500 group-hover:text-white dark:text-neutral-400">
            {totalArticles} Articles
          </span>
        </div>
      </div>
    </div>
  )
}

export default Card17Filter
