import { ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
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

const Card22: FC<Props> = ({ className, titleClass = 'text-xl sm:text-3xl', post, lang }) => {
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

  const link =
    lang == 'en'
      ? `/${categories[0]?.parentCategory?.slug}/${categories[0]?.slug}/${slug}`
      : `/${lang}/${categories[0]?.parentCategory?.slug}/${categories[0]?.slug}/${slug}`
  return (
    <div
      className={clsx(
        'card22 relative grid grid-cols-1 gap-6 rounded-3xl bg-white p-6 md:gap-10 md:p-10 lg:grid-cols-12 dark:bg-[#0D0D0D]',
        className
      )}
    >
      <div className="h-48 w-full lg:col-span-3 lg:h-auto">
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <Image
            src={thumbnail || featuredImage || '/images/featured-2.png'}
            alt={title || 'Featured Post'}
            fill
            className="object-cover"
            sizes="(max-width: 767px) 100vw, 300px"
          />
        </div>
      </div>
      <div className="grid w-full gap-2 lg:col-span-9 lg:gap-5">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold tracking-wide text-[#00652E] dark:text-[#60a43a]">Featured</h3>
          <div className="w-9 border-b-2 border-[#00652E] dark:border-[#60a43a]" />
        </div>
        <h2 className={clsx('font-semibold text-[#444444] dark:text-white', titleClass)}>
          <span className="line-clamp-2">{title || 'How to Pray that cleanse Your ensure'}</span>
        </h2>
        {post?._id ? (
          <div className="mt-auto flex items-center gap-3">
            <PostCardLikeBtn likeCount={favoriteCount || likeCount} liked={liked} post={post} />
            <PostCardSaveBtn bookmarked={bookmarked} post={post} />
          </div>
        ) : null}
        <p className="line-clamp-5 text-base leading-relaxed text-[#444444] sm:text-base dark:text-white">
          {excerpt ||
            "is simply dummy text of the Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi velit tempora eos aliquam delectus perspiciatis veritatis, molestias voluptas. Doloremque aspernatur voluptatibus nulla maiores eos velit excepturi, obcaecati reprehenderit nostrum unde! Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti doloribus eligendi debitis amet. Iusto consequuntur at tempore. Dolorem amet voluptate nobis, exercitationem veritatis culpa quibusdam dignissimos? In similique eos placeat. printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
        </p>
        <Link
          href={link}
          className="group mt-1 flex cursor-pointer items-center gap-2 self-start text-base font-semibold text-[#00652E] transition-all hover:gap-3 dark:text-[#60a43a]"
        >
          <span>Continue Reading</span>
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}

export default Card22
