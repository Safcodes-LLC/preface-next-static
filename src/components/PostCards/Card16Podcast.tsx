'use client'

import { TPost } from '@/data/posts'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import CategoryBadgeList from '../CategoryBadgeList'
import PostCardLikeBtn from '../PostCardLikeBtn'
import PostCardSaveBtn from '../PostCardSaveBtn'

interface Props {
  className?: string
  post: TPost
  ratio?: string
}

const Card16Podcast: FC<Props> = ({ className, post, ratio = 'aspect-4/3' }) => {
  const {
    title,
    handle,
    categories,
    excerpt,
    featuredImage,
    postType,
    likeCount,
    liked,
    commentCount,
    bookmarked,
    readingTime,
  } = post

  return (
    <div className={clsx('group post-card-16-podcast relative flex flex-col pb-6', className)}>
      <div className={`relative w-full shrink-0 ${ratio}`}>
        <Image
          fill
          alt={title}
          sizes="(max-width: 1024px) 100vw, 50vw"
          src={featuredImage}
          className="rounded-3xl object-cover brightness-100 transition-[filter] duration-300 group-hover:brightness-75"
        />
      </div>

      {/* ABSOLUTE */}
      <Link href={`/post/${handle}`} className="absolute inset-0"></Link>

      <CategoryBadgeList className="absolute inset-x-3 top-3" categories={categories} />

      {/* MAIN CONTENT */}
      <div className="relative -mt-32 w-11/12">
        {/* {postType !== 'audio' && (
          <PostTypeFeaturedIcon
            wrapSize="size-8"
            iconSize="size-4"
            className="absolute start-3 top-6"
            postType={postType}
          />
        )} */}

        {/* <div className={clsx('flex items-center gap-x-4 px-5', postType !== 'audio' && 'invisible opacity-0')}>
          <div className="grow">
            <Image src={musicWave} alt="musicWave" />
          </div>
          <ButtonPlayMusicPlayer post={post} />
        </div> */}
        <div className="mt-20 flex grow flex-col rounded-3xl rounded-ss-none bg-white p-5 dark:bg-[#0D0D0D]">
          <h2 className="nc-card-title mb-2 block font-normal text-neutral-900 sm:text-base dark:text-neutral-100">
            <Link href={`/post/${handle}`} title={title} className="line-clamp-2">
              {title}
            </Link>
          </h2>
          {/* <p className="mt-3 mb-5 block text-sm/6 text-neutral-600 dark:text-neutral-400">
            <span className="line-clamp-2">{excerpt}</span>
          </p> */}
          <div className="relative mt-auto flex flex-wrap gap-x-2 gap-y-1">
            <PostCardLikeBtn likeCount={likeCount} liked={liked} />
            {/* <PostCardCommentBtn commentCount={commentCount} handle={handle} /> */}
            <PostCardSaveBtn className="" bookmarked={bookmarked} />
            <div className="border-[#E2E2E2]transition-transform ms-auto flex h-7 w-7 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border duration-200  hover:bg-[#f3f3f3] dark:border-[#505050] dark:bg-[#0D0D0D] dark:hover:bg-[#1a1a1a]">
              <ArrowRightIcon
                strokeWidth={3}
                className="h-3 w-3 text-[#C2C2C2] transition-colors duration-200 rtl:rotate-180 dark:text-[#707070]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card16Podcast
