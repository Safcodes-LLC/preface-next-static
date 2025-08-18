import CategoryBadgeList from '@/components/CategoryBadgeList'
import { TPostDetail } from '@/data/posts'
import { Divider } from '@/shared/divider'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import SingleMeta from './SingleMeta'
import { SingleMetaAction } from './SingleMetaAction'
import SingleTitle from './SingleTitle'

interface Props {
  className?: string
  post: TPostDetail
  headerStyle?: 'style1' | 'style2' | 'style3' | 'audio' | 'video' | 'gallery'
}

const TitleAndMeta = ({ className, post }: Omit<Props, 'headerStyle'>) => {
  const { categories, date, author, readingTime, commentCount, handle, likeCount, liked, title, excerpt } = post

  return (
    <div className={`single-header-meta space-y-5 ${className}`}>
      <CategoryBadgeList categories={categories || []} />
      <SingleTitle title={title} />
      {excerpt && (
        <p className="text-base/relaxed text-neutral-600 md:text-lg/relaxed dark:text-neutral-400">{excerpt}</p>
      )}
      <Divider />
      <div className="flex flex-wrap gap-5">
        <SingleMeta author={author} date={date} readingTime={readingTime} />
        <SingleMetaAction
          className="ms-auto"
          commentCount={commentCount}
          handle={handle}
          likeCount={likeCount}
          liked={liked}
          title={title}
        />
      </div>
    </div>
  )
}

const HeaderStyle1 = ({ className, post }: Omit<Props, 'defaultStyle'>) => {
  const { featuredImage, title } = post

  return (
    <>
      <div className="container">
        <Divider />
      </div>
      <header className={clsx('single-header-style-1 mt-8 lg:mt-16', className)}>
        {/* <div className="mx-auto max-w-4xl">
          <TitleAndMeta post={post} />
        </div> */}

        {featuredImage.src && (
          <div className="relative mt-8 w-full sm:mt-12 sm:aspect-15/5">
            <Image
              alt={title}
              className="object-cover"
              src={featuredImage}
              sizes="(max-width: 1440px) 100vw, 1440px"
              fill
              priority
            />
          </div>
        )}
      </header>
    </>
  )
}

const SingleHeaderContainer: FC<Props> = ({ className, post, headerStyle = 'style1' }) => {
  return (
    <>
      {headerStyle === 'style1' && <HeaderStyle1 className={className} post={post} />}
    </>
  )
}

export default SingleHeaderContainer
