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
}

const Card17Podcast: FC<Props> = ({ className, post }) => {
  const { title, handle, featuredImage, postType, date, readingTime } = post
  const IS_AUDIO = postType === 'audio'

  return (
    <div
      className={clsx(
        'post-card-17-podcast relative flex items-center justify-between gap-x-5 rounded-xl  bg-white p-2.5 dark:bg-[#0D0D0D]',
        className
      )}
    >
      <div className="flex items-center gap-x-4">
        <div className="relative size-14 shrink-0 rounded-full shadow-lg sm:size-22">
          <Image
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="rounded-[10px] object-cover"
            src={featuredImage}
            fill
            alt={title}
          />
        </div>

        <div className="flex grow flex-col">
          <h2 className="block font-medium">
            {/* <Link href={`/post/${handle}`} className="absolute inset-0"></Link> */}
            <span className="line-clamp-1">{title}</span>
          </h2>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            {IS_AUDIO && (
              <ButtonPlayMusicPlayer
                post={post}
                buttonSize="size-7"
                buttonColor="bg-primary-600 text-white"
                iconClassName="size-4"
              />
            )}

            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              {/* <time dateTime={date}>
                {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time> */}
              {/* <span className="mx-1">/</span> */}
              <span className="text-[12px] font-[400]"> 120 Articles</span>
            </div>
          </div>
          <div className="flex shrink-0 items-center mt-[10px]">
        <div className="inline-flex cursor-pointer items-center justify-center rounded-full bg-white p-1.5 border border-[#E2E2E2] dark:border-[#505050] dark:bg-[#0D0D0D]">
          <ArrowRightIcon className="h-3 w-3 text-[#919191] dark:text-[#707070] rtl:rotate-180" />
        </div>
      </div>
        </div>
      </div>
    </div>
  )
}

export default Card17Podcast
