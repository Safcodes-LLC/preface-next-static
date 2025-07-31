import PostFeaturedMedia from '@/components/PostFeaturedMedia/PostFeaturedMedia'
import { TPost } from '@/data/posts'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import CategoryBadgeList from '../CategoryBadgeList'
import PostTypeFeaturedIcon from '../PostTypeFeaturedIcon'
import ButtonPrimary from '@/shared/ButtonPrimary'

interface Props {
  className?: string
  ratio?: string
  titleClass?: string
  post: TPost
  verticalLine?: boolean
  textCenter?: boolean
}

const Card19: FC<Props> = ({
  className,
  titleClass = 'text-xl sm:text-2xl xl:text-3xl',
  ratio = 'aspect-4/3 sm:aspect-1/1',
  post,
  verticalLine = false,
  textCenter = false,
}) => {
  const { title, excerpt, handle, featuredImage, categories, postType, likeCount, liked, commentCount, bookmarked } =
    post

  return (
    <div className={clsx('group post-card-19 relative flex flex-col overflow-hidden rounded-xl', className)}>
      <div className={clsx('relative size-full', ratio)}>
        {postType === 'audio' ? (
          <PostFeaturedMedia post={post} />
        ) : (
          <>
            <Image
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="rounded-xl object-cover brightness-100 transition-[filter] duration-300 group-hover:brightness-75"
              src={featuredImage}
              alt={title}
              priority
              fill
            />
            <PostTypeFeaturedIcon
              className="absolute end-4 top-4 group-hover:hidden"
              postType={postType}
              wrapSize="size-7"
              iconSize="size-4"
            />
            <Link href={`/post/${handle}`} className="absolute inset-0"></Link>
          </>
        )}
      </div>

      <Link
        href={`/post/${handle}`}
        className="absolute inset-x-0 bottom-0 block h-1/2 bg-linear-to-t from-black opacity-80"
      />

      <div className="absolute inset-x-0 top-0 flex flex-wrap gap-x-2 gap-y-1 p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:px-7">
        <CategoryBadgeList categories={categories} />
        {/* <PostCardLikeBtn likeCount={likeCount} liked={liked} /> */}
        {/* <PostCardCommentBtn commentCount={commentCount} handle={handle} /> */}
        {/* <PostCardSaveBtn className="ms-auto" bookmarked={bookmarked} /> */}
      </div>

      <div
        className={clsx(
          'absolute inset-x-0 bottom-0 flex grow flex-col',
          textCenter
            ? 'w-full p-5 gap-2 sm:gap-4 text-left sm:p-6 xl:mx-auto xl:my-8 xl:w-[80%] xl:text-center'
            : 'p-5 text-left sm:p-6'
        )}
      >
        {/* Button above title */}
        {textCenter && (
        <div className=" relative z-10">
          <ButtonPrimary 
            color="logo-colors"
            className="!text-[12px] !px-6 !py-1"
          >
            Watch full video
            {/* <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" /> */}
          </ButtonPrimary>
        </div>
        )}
        
        <div className="flex items-start gap-3 relative z-10">
          {verticalLine && <div className="mt-3 h-8 w-0.5 flex-shrink-0 bg-white"></div>}
          <h2 className={clsx(' block font-semibold text-white !line-clamp-2 !text-[14px] sm:text-[18px]', titleClass)}>{title}</h2>
        </div>
        {!textCenter && (
          <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <p className={clsx('line-clamp-2 text-[12px] sm:text-[14px]  leading-snug font-medium text-white flex-1')}>{excerpt}</p>
            <ButtonPrimary 
              color="logo-colors"
              className="!text-[12px] !px-4 !py-1 flex-shrink-0"
            >
              Start Reading
            </ButtonPrimary>
          </div>
        )}
        
        <Link href={`/post/${handle}`} className="absolute inset-0 z-0" />
      </div>
    </div>
  )
}

export default Card19
