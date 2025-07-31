import PostFeaturedMedia from '@/components/PostFeaturedMedia/PostFeaturedMedia'
import { TPost } from '@/data/posts'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import CategoryBadgeList from '../CategoryBadgeList'
import PostCardCommentBtn from '../PostCardCommentBtn'
import PostCardLikeBtn from '../PostCardLikeBtn'
import PostCardSaveBtn from '../PostCardSaveBtn'
import PostTypeFeaturedIcon from '../PostTypeFeaturedIcon'

interface Props {
  className?: string
  ratio?: string
  titleClass?: string
  post: TPost
  verticalLine?: boolean
}

const Card19: FC<Props> = ({
  className,
  titleClass = 'text-xl sm:text-2xl xl:text-3xl',
  ratio = 'aspect-4/3 sm:aspect-1/1',
  post,
  verticalLine = false
}) => {
  const { title, handle, featuredImage, categories, postType, likeCount, liked, commentCount, bookmarked } = post

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

      <div className="absolute inset-x-0 bottom-0 flex grow flex-col p-5 sm:p-16">
        <Link href={`/post/${handle}`} className="absolute inset-0" />
        {/* <CategoryBadgeList categories={categories} /> */}
        <div className="flex items-start gap-3">
          {verticalLine && <div className="w-0.5 h-8 bg-white flex-shrink-0 mt-3"></div>}
          <h2 className={clsx('mt-3 block font-semibold text-white', titleClass)}>{title}</h2>
        </div>
        {/* <p className={clsx('mt-3 leading-snug font-medium text-[14px] text-white line-clamp-2')}>{excerpt}</p> */}
      </div>
    </div>
  )
}

export default Card19
