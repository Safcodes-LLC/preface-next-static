'use client'

import { TPost } from '@/data/posts'
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
  lang?: string
  isCategoryPage?: boolean
}

const Card16Podcast: FC<Props> = ({ className, post, ratio = 'aspect-4/3', lang, isCategoryPage = false }) => {
  const {
    title,
    handle,
    categories,
    category,
    excerpt,
    featuredImage,
    thumbnail,
    postType,
    likeCount,
    liked,
    commentCount,
    bookmarked,
    readingTime,
    slug,
    favoriteCount,
  } = post

  console.log(post, 'posty findignd')
  console.log(isCategoryPage, 'isCategoryPage123')
  // Build the post URL safely
  const getPostUrl = () => {
    const mainCategorySlug = isCategoryPage ? categories[0]?.slug : category?.slug
    const parentCategorySlug = isCategoryPage ? categories[0]?.parentCategory?.slug : category?.parentCategory?.slug

    if (isCategoryPage) {
      return `${parentCategorySlug}/${mainCategorySlug}/${slug}`
    }
    if (mainCategorySlug) {
      return `${mainCategorySlug}/${slug}`
    }

    return `/post/${handle}`
  }

  const postUrl = getPostUrl()
  const href = lang === 'en' ? postUrl : `/${lang}/${postUrl}`

  return (
    <div className={clsx('group post-card-16-podcast relative flex flex-col', className)}>
      <div className={`relative w-full shrink-0 overflow-hidden rounded-3xl ${ratio}`}>
        {(thumbnail || featuredImage) && (
          <Link href={href}>
            <Image
              fill
              alt={title || ''}
              sizes="(max-width: 1024px) 100vw, 50vw"
              src={thumbnail || featuredImage || ''}
              className="rounded-3xl object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            {/* Premium overlay on hover */}
            <div className="absolute inset-0 rounded-3xl bg-black/0 transition-all duration-300 ease-out group-hover:bg-black/20" />
          </Link>
        )}
        {!thumbnail && !featuredImage && (
          <Link href={href}>
            <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-gray-200 dark:bg-gray-800">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="mt-2 text-sm">No image available</p>
              </div>
            </div>
          </Link>
        )}
      </div>

      {/* ABSOLUTE */}
      {/* <Link href={`/post/${handle}`} className="absolute inset-0"></Link> */}

      <CategoryBadgeList className="absolute inset-x-3 top-3" categories={category} />

      {/* MAIN CONTENT */}
      <div className="pointer-events-none relative -mt-32 w-11/12">
        <div className="pointer-events-auto mt-20 flex grow flex-col rounded-3xl rounded-ss-none bg-white p-5 transition-shadow duration-300 ease-out group-hover:shadow-lg dark:bg-[#0D0D0D] dark:group-hover:shadow-2xl">
          <h2 className="nc-card-title mb-2 block font-normal text-neutral-900 sm:text-base dark:text-neutral-100">
            <Link href={href} title={title} className="line-clamp-2">
              {title}
            </Link>
          </h2>
          <div className="relative mt-auto flex flex-nowrap items-center gap-x-2">
            <PostCardLikeBtn likeCount={favoriteCount || likeCount} liked={liked} post={post} />
            <PostCardSaveBtn bookmarked={bookmarked} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card16Podcast
