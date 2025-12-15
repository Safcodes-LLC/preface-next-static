'use client'
import { TPostDetail } from '@/data/posts'
import { Divider } from '@/shared/divider'
import { useStore } from '@/store/store'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import { SingleMetaAction } from './SingleMetaAction'
import SingleTitle from './SingleTitle'

interface Props {
  className?: string
  post: TPostDetail | any
  headerStyle?: 'style1' | 'style2' | 'style3' | 'audio' | 'video' | 'gallery'
}

const TitleAndMeta = ({ className, post }: Omit<Props, 'headerStyle'>) => {
  const { categories, date, author, readingTime, commentCount, handle, likeCount, liked, title, excerpt } = post
  const { isTextSize, setTextSize } = useStore() as { isTextSize: string; setTextSize: (size: string) => void }

  return (
    <div className={`text-white ${className}`}>
      <div className="mb-4">{/* <CategoryBadgeList categories={categories || []} /> */}</div>
      <SingleTitle title={title} className="mb-4" />
      {/* {excerpt && (
        <p className="text-base/relaxed text-white/80 mb-6 md:text-lg/relaxed">
          {excerpt}
        </p>
      )} */}
      <Divider className="my-6 border-white/20" />
      <div className="flex flex-wrap items-center gap-4">
        {/* <SingleMeta 
          author={author} 
          date={date} 
          readingTime={readingTime} 
          className="text-white/80"
        /> */}
        <div className="flex items-center justify-start gap-[20px] max-md:flex-wrap max-md:gap-[16px]">
          <SingleMetaAction
            commentCount={commentCount}
            handle={handle}
            likeCount={likeCount}
            liked={liked}
            post={post}
            title={title}
            className="text-white hover:text-white/80"
          />
          <div className="flex items-center rounded-full bg-white/10 shadow-md">
            <p className="h-full rounded-full bg-black p-[8px_16px] text-[14px] text-white max-md:text-[12px]">Aa</p>
            <div className="flex gap-1 p-[4px] max-md:gap-0">
              <button
                onClick={() => setTextSize('large')}
                className={`${isTextSize === 'large' ? 'bg-white/20' : ''} cursor-pointer rounded-full p-[4px_12px] text-[14px] text-white hover:bg-white/20 max-md:text-[12px]`}
              >
                Large
              </button>
              <button
                onClick={() => setTextSize('medium')}
                className={`${isTextSize === 'medium' ? 'bg-white/20' : ''} cursor-pointer rounded-full p-[4px_12px] text-[14px] text-white hover:bg-white/20 max-md:text-[12px]`}
              >
                Medium
              </button>
              <button
                onClick={() => setTextSize('small')}
                className={`${isTextSize === 'small' ? 'bg-white/20' : ''} cursor-pointer rounded-full p-[4px_12px] text-[14px] text-white hover:bg-white/20 max-md:text-[12px]`}
              >
                Small
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const HeaderStyle1 = ({ className, post }: Omit<Props, 'defaultStyle'>) => {
  const { featuredImage, title, thumbnail } = post

  return (
    <>
      <div className="container">
        <Divider />
      </div>
      <header className={clsx('single-header-style-1', className)}>
        {thumbnail || featuredImage ? (
          <div className="relative aspect-square w-full sm:aspect-15/5">
            <Image
              alt={title}
              className="object-cover"
              src={featuredImage ? featuredImage : thumbnail}
              sizes="(max-width: 1440px) 100vw, 1440px"
              fill
              priority
            />
            {/* Gradient Overlay */}
            <div
              className="absolute right-0 bottom-0 left-0 h-1/2"
              style={{
                background: 'linear-gradient(0deg, #000000D9 0%, #61616100 100%)',
              }}
            />
            <div className="absolute right-0 bottom-0 left-0 container">
              <div className="mx-auto pb-8">
                <TitleAndMeta post={post} />
              </div>
            </div>
          </div>
        ) : (
          // Fallback layout when no featured image
          <div className="bg-gray-900 py-16">
            <div className="container">
              <TitleAndMeta post={post} />
            </div>
          </div>
        )}
      </header>
    </>
  )
}

const SingleHeaderContainer: FC<Props> = ({ className, post, headerStyle = 'style1' }) => {
  return <>{headerStyle === 'style1' && <HeaderStyle1 className={className} post={post} />}</>
}

export default SingleHeaderContainer
