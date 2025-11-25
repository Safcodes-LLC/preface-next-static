'use client'
import PostFeaturedMedia from '@/components/PostFeaturedMedia/PostFeaturedMedia'
import { TPost } from '@/data/posts'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { getCustomBannerArticle } from '@/utils/getServices'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import CategoryBadgeList from '../CategoryBadgeList'
import PostCardLikeBtn from '../PostCardLikeBtn'
import PostCardSaveBtn from '../PostCardSaveBtn'
import { toTitleCase } from '@/utils/slug'

interface Props {
  className?: string
  ratio?: string
  titleClass?: string
  post?: TPost | any
  lang?: string
  home?: boolean
  hide?: boolean
}

const Card18: FC<Props> = ({ className, titleClass = 'text-lg ', ratio = 'aspect-4/3', post, lang, home, hide }) => {
  const {
    title,
    excerpt,
    handle,
    slug,
    thumbnail,
    featuredImage,
    categories,
    postType,
    likeCount,
    liked,
    commentCount,
    bookmarked,
    favoriteCount,
  } = post
  const [isCustomBannerData, setIsCustomBannerData] = useState<any | null>(null)
  const parentCategorySlug = categories[0]?.parentCategory?.slug
  const categorySlug = categories[0]?.slug

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCustomBannerArticle(post.id)
      setIsCustomBannerData(data)
    }
    fetchData()
  }, [post.id])

  return (
    <div className={clsx('group post-card-18 relative flex flex-col overflow-hidden rounded-xl', className)}>
      <div className={clsx('relative size-full', ratio)}>
        {postType?.name === 'Podcast' ? (
          <PostFeaturedMedia post={post} />
        ) : (
          <>
            {thumbnail || featuredImage ? (
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <Link
                  href={
                    lang === 'en'
                      ? `/${parentCategorySlug}/${categorySlug}/${slug}`
                      : `/${lang}/${parentCategorySlug}/${categorySlug}/${slug}`
                  }
                  className="absolute inset-0 z-10"
                  aria-label={title}
                >
                  <span className="sr-only">{title}</span>
                </Link>
                <Image
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  alt={title}
                  className="h-full w-full rounded-xl object-cover brightness-85 transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-60"
                  src={
                    home && isCustomBannerData?.data.customBannerStatus
                      ? isCustomBannerData?.data.customVerticalImage
                      : thumbnail || featuredImage
                  }
                  priority
                  fill
                />
              </div>
            ) : (
              <div className="size-full rounded-xl bg-gray-200" /> // fallback placeholder
            )}
            {/* <PostTypeFeaturedIcon
              className="absolute end-3.5 top-3.5 group-hover:hidden"
              postType={postType}
              wrapSize="size-7"
              iconSize="size-4"
            /> */}
          </>
        )}
      </div>

      <div className="absolute inset-x-0 top-0 z-20 flex flex-wrap gap-x-2 gap-y-1 p-4 opacity-100">
        {/* <PostCardLikeBtn likeCount={likeCount} liked={liked} />
        <PostCardCommentBtn commentCount={commentCount} handle={handle} />
        <PostCardSaveBtn className="ms-auto" bookmarked={bookmarked} /> */}
        {hide ? null : <CategoryBadgeList categories={categories} />}
        {hide ? (
          <Link
            className="group/arrow ms-auto flex aspect-square w-[30px] items-center justify-center rounded-full bg-white hover:bg-gray-100"
            href={
              lang === 'en'
                ? `/${parentCategorySlug}/${categorySlug}/${slug}`
                : `/${lang}/${parentCategorySlug}/${categorySlug}/${slug}`
            }
          >
            <ArrowUpRightIcon className="m-auto h-5 w-5 stroke-2 text-[#00652E] group-hover/arrow:scale-110" />
          </Link>
        ) : (
          <div className="ms-auto flex gap-1">
            <PostCardLikeBtn likeCount={favoriteCount || likeCount} liked={liked} post={post} />
            <PostCardSaveBtn bookmarked={bookmarked} post={post} />
          </div>
        )}
      </div>

      <span className="absolute inset-x-0 bottom-0 block h-1/2 bg-linear-to-t from-black opacity-80" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 block h-1/2 bg-linear-to-t from-black opacity-80" />

      <div className="absolute inset-x-0 bottom-0 z-20 flex grow flex-col p-6">
        <span className="pointer-events-none absolute inset-0" />
        {/* <CategoryBadgeList categories={categories} /> */}
        <div className="flex items-start">
          <h2
            className={clsx(
              '!line-clamp-1 !text-sm leading-snug font-semibold text-white sm:!text-[17px]',
              // Left-side vertical rule that automatically matches the title height
              "relative ps-3 before:absolute before:start-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-white before:content-['']",
              titleClass
            )}
          >
            {toTitleCase(title)}
          </h2>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className={clsx('mt-3 line-clamp-2 text-[12px] leading-snug font-medium text-white sm:text-sm')}>
            {excerpt}
          </p>
          {hide ? null : (
            <div className="relative z-10">
              <Link
                href={
                  lang === 'en'
                    ? `/${parentCategorySlug}/${categorySlug}/${slug}`
                    : `/${lang}/${parentCategorySlug}/${categorySlug}/${slug}`
                }
              >
                <ButtonPrimary color="logo-colors" className="!px-6 !py-1 !text-[12px]">
                  Start Reading
                  {/* <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" /> */}
                </ButtonPrimary>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card18
