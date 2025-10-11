import { ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import PostCardLikeBtn from '../PostCardLikeBtn'
import PostCardSaveBtn from '../PostCardSaveBtn'

interface Props {
  className?: string
  ratio?: string
  titleClass?: string
  post?: any
  lang?: string
}

const Card21: FC<Props> = ({ className, titleClass = 'text-xl sm:text-3xl', post, lang }) => {
  const {
    title,
    excerpt,
    slug,
    handle,
    thumbnail,
    featuredImage,
    categories,
    postType,
    likeCount = 120,
    liked,
    bookmarked,
    favoriteCount,
  } = post || {}

  return (
    <div
      className={clsx(
        'card21 relative flex flex-col overflow-hidden rounded-[25px] border-t-[#60A43A] md:border-t-0 md:border-l-[#60A43A] border-t-30 md:border-l-30 bg-white p-10 dark:bg-[#0D0D0D]',
        className
      )}
    >
      <div className="flex flex-col md:flex-row items-start gap-5">
        <div className="relative h-[145px] w-full md:w-[122px] flex-shrink-0">
          <Image
            src={featuredImage || thumbnail || '/images/featured.png'}
            alt={title || 'Featured article'}
            fill
            className="object-cover rounded-2xl"
            sizes="122px"
            priority
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2 md:gap-5">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold tracking-wide text-[#00652E] dark:text-[#60a43a]">Featured</h3>
            <div className="w-9 border-b-2 border-[#00652E] dark:border-[#60a43a]" />
          </div>
          <h2 className={clsx('font-semibold text-[#444444] dark:text-white', titleClass)}>
            <span className="line-clamp-2">{title || 'How to Pray that cleanse Your ensure'}</span>
          </h2>
          <div className="mt-auto flex items-center gap-3">
            <PostCardLikeBtn likeCount={favoriteCount || likeCount} liked={liked} post={post} />
            <PostCardSaveBtn bookmarked={bookmarked} post={post}/>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 pt-6">
        <p className="line-clamp-7 text-base leading-relaxed text-[#444444] sm:text-base dark:text-white">
          {excerpt ||
            "is simply dummy text of the Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi velit tempora eos aliquam delectus perspiciatis veritatis, molestias voluptas. Doloremque aspernatur voluptatibus nulla maiores eos velit excepturi, obcaecati reprehenderit nostrum unde! Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti doloribus eligendi debitis amet. Iusto consequuntur at tempore. Dolorem amet voluptate nobis, exercitationem veritatis culpa quibusdam dignissimos? In similique eos placeat. printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
        </p>
        <button className="group mt-1 flex cursor-pointer items-center gap-2 self-start text-base font-semibold text-[#00652E] transition-all hover:gap-3 dark:text-[#60a43a]">
          <span>Continue Reading</span>
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}

export default Card21
