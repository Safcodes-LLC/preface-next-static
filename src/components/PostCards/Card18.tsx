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
import ButtonPrimary from '@/shared/ButtonPrimary'

interface Props {
  className?: string
  ratio?: string
  titleClass?: string
  post: TPost
}

const Card18: FC<Props> = ({ className, titleClass = 'text-lg ', ratio = 'aspect-4/3', post }) => {
  const { title, excerpt, handle, featuredImage, categories, postType, likeCount, liked, commentCount, bookmarked } = post

  return (
    <div className={clsx('group post-card-18 relative flex flex-col overflow-hidden rounded-xl', className)}>
      <div className={clsx('relative size-full', ratio)}>
        {postType === 'audio' ? (
          <PostFeaturedMedia post={post} />
        ) : (
          <>
            <Image
              sizes="(max-width: 1024px) 100vw, 33vw"
              alt={title}
              className="size-full rounded-xl object-cover brightness-100 transition-[filter] duration-300 group-hover:brightness-75"
              src={featuredImage}
              priority
              fill
            />
            <PostTypeFeaturedIcon
              className="absolute end-3.5 top-3.5 group-hover:hidden"
              postType={postType}
              wrapSize="size-7"
              iconSize="size-4"
            />
            <Link href={`/post/${handle}`} className="absolute inset-0"></Link>
          </>
        )}
      </div>

      <div className="absolute inset-x-0 top-0 flex flex-wrap gap-x-2 gap-y-1 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {/* <PostCardLikeBtn likeCount={likeCount} liked={liked} />
        <PostCardCommentBtn commentCount={commentCount} handle={handle} />
        <PostCardSaveBtn className="ms-auto" bookmarked={bookmarked} /> */}
        <CategoryBadgeList categories={categories} />
      </div>

      <Link
        href={`/post/${handle}`}
        className="absolute inset-x-0 bottom-0 block h-1/2 bg-linear-to-t from-black opacity-80"
      />

      <div className="absolute inset-x-0 bottom-0 flex grow flex-col p-6">
        <Link href={`/post/${handle}`} className="absolute inset-0" />
        {/* <CategoryBadgeList categories={categories} /> */}
        <div className="flex items-start gap-3">
          {/* vertical line */}
          <div className="w-0.5 h-8 bg-white flex-shrink-0 mt-3"></div>
          <h2 className={clsx('leading-snug font-semibold text-white line-clamp-2', titleClass)}>{title}</h2>
        </div>
       <div className='flex flex-col items-center gap-2'>
       <p className={clsx('mt-3 leading-snug font-medium text-[14px] text-white line-clamp-2')}>{excerpt}</p>
        <div className="mb-4 relative z-10">
          <ButtonPrimary 
            color="logo-colors"
            className="!text-[12px] !px-6 !py-1"
          >
            Start Reading
            {/* <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" /> */}
          </ButtonPrimary>
        </div>
       </div>
        
   
      
      </div>
    </div>
  )
}

export default Card18
