import { TPost } from '@/data/posts'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'

interface Props {
  className?: string
  ratio?: string
  titleClass?: string
  post?: TPost | any
  lang?: string
}

const Card21: FC<Props> = ({
  className,
  titleClass = 'text-xl sm:text-2xl xl:text-3xl',
  ratio = 'aspect-4/3 sm:aspect-1/1',
  post,
  lang,
}) => {
  const {
    title,
    excerpt,
    slug,
    handle,
    thumbnail,
    featuredImage,
    categories,
    postType,
    likeCount,
    liked,
    bookmarked,
    favoriteCount,
  } = post

  console.log(post, 'post find datas')

  return (
    <div className={clsx('card21 flex flex-col gap-2 rounded-3xl bg-white px-9 py-8', className)}>
      <div className="grid grid-cols-12 items-start">
        <div className="relative col-span-1 h-30 max-h-16 w-full rounded-2xl sm:max-h-30">
          <Image src="/images/featured.png" alt={title} fill className="object-contain" sizes="80px" priority />
        </div>
        <div className="col-span-11 mx-4">
          <h3 className="border-b-2 border-[#00652E] text-xl font-bold text-[#00652E]">Featured</h3>
          <h2 className="pt-5 text-3xl font-medium">How to Pray that cleanse Your ensure</h2>
        </div>
      </div>

      <p className="text-base font-normal">
        is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy
        text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries, but also the leap into electronic is simply dummy text
        of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </p>
      <p className="text-base font-normal">
        {' '}
        is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy
        text ever since the 1500s,
      </p>
      <div className="flex gap-2">
        <span>Continue Reading </span>

        <div>
          <ArrowRightIcon className="h-3 w-3" />
        </div>
      </div>
    </div>
  )
}

export default Card21
