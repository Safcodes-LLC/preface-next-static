'use client'

import { TPost } from '@/data/posts'
import { Link } from '@/shared/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import ButtonPlayMusicPlayer from '../ButtonPlayMusicPlayer'

interface Props {
  className?: string
  post: TPost
  lang?: string
}

const Card17Podcast: FC<Props> = ({ className, post, lang }) => {
  const {
    title,
    name,
    handle,
    slug,
    thumbnail,
    parentCategory,
    featuredImage,
    postType,
    date,
    readingTime,
    totalArticles,
  } = post

  const IS_AUDIO = postType === 'audio'

  const href = lang === 'en' ? `/${parentCategory.slug}/${slug}` : `/${lang}/${parentCategory.slug}/${slug}`

  return (
    <Link
      href={href}
      className={clsx(
        'post-card-17-podcast group relative flex items-center justify-between gap-x-5 rounded-xl bg-white p-2.5 hover:bg-neutral-50 dark:bg-[#0D0D0D] dark:hover:bg-[#1A1A1A]',
        className
      )}
    >
      <div className="flex items-center gap-x-4">
        <div className="relative block size-14 shrink-0 rounded-[10px] shadow-lg sm:size-22">
          <Image
            className="origin-bottom-right rounded-[10px] object-cover transition-transform group-hover:scale-105"
            src={thumbnail || featuredImage}
            fill
            alt={name || title}
          />
        </div>

        <div className="flex grow flex-col">
          <h2 className="block font-medium">
            {/* <Link href={`/post/${handle}`} className="absolute inset-0"></Link> */}
            <span className="line-clamp-1">{name || title}</span>
          </h2>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            {IS_AUDIO && (
              <div onClick={(e) => e.stopPropagation()}>
                <ButtonPlayMusicPlayer
                  post={post}
                  buttonSize="size-7"
                  buttonColor="bg-primary-600 text-white"
                  iconClassName="size-4"
                />
              </div>
            )}

            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              {/* <time dateTime={date}>
                {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time> */}
              {/* <span className="mx-1">/</span> */}
              <span className="text-[12px] font-[400]"> {totalArticles} Articles</span>
            </div>
          </div>
          <div className="mt-[10px] flex shrink-0 items-center">
            <div className="group/arrow inline-flex items-center justify-center rounded-full border border-[#E2E2E2] bg-white p-1.5 transition-all duration-200 hover:scale-110 hover:border-neutral-300 hover:bg-neutral-50 dark:border-[#505050] dark:bg-[#0D0D0D] dark:hover:border-[#666] dark:hover:bg-[#1A1A1A]">
              <ArrowRightIcon className="h-3 w-3 text-[#919191] transition-transform duration-200 group-hover/arrow:translate-x-0.5 group-hover/arrow:text-[#919191] rtl:rotate-180 dark:text-[#707070] dark:group-hover/arrow:text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card17Podcast
