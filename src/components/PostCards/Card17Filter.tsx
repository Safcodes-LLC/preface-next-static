'use client'

import { TPost } from '@/data/posts'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'

interface Props {
  className?: string
  post: TPost
  lang?: string
  selected?: boolean
  onToggle?: () => void
}

const Card17Filter: FC<Props> = ({ className, post, lang, selected, onToggle }) => {
  const { title, name, parentCategory, slug, featuredIcon, totalArticles, icon } = post

  return (
    <div className="flex cursor-pointer flex-wrap gap-2 sm:gap-4">
      <div
        className={clsx(
          'post-card-17-filter group relative flex items-center justify-between gap-x-3 rounded-[10px] px-3 py-[10px] ring-1',
          selected
            ? 'bg-[#00652E] ring-[#00652E] hover:bg-[#00652E]'
            : 'bg-white ring-[#E3E3E3] hover:bg-[#00652E] dark:bg-[#0D0D0D] dark:ring-[#2C2C2C]',
          className
        )}
        onClick={onToggle}
        role="button"
        aria-pressed={!!selected}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onToggle?.()
          }
        }}
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
          <h2
            className={clsx(
              'block text-sm text-[#000000] group-hover:text-white dark:text-white',
              selected && 'text-white'
            )}
          >
            <span className="">{name || title}</span>
          </h2>
          <span
            className={clsx(
              'text-[9px] font-[400] text-neutral-500 group-hover:text-white dark:text-neutral-400',
              selected && 'text-white'
            )}
          >
            {totalArticles} Articles
          </span>
        </div>
      </div>
    </div>
  )
}

export default Card17Filter
