import { TCategory } from '@/data/categories'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  className?: string
  category: TCategory
}

const CardCategory3: FC<Props> = ({ className = '', category }) => {
  const { count, name, handle, thumbnail } = category
  return (
    <Link
      href={`/category/${handle}`}
      className={`card-category-3 group flex flex-col rounded-[18px] bg-white p-[10px] dark:bg-[#0D0D0D] ${className}`}
    >
      <div className="aspect-w-5 relative h-0 w-full shrink-0 overflow-hidden rounded-2xl aspect-h-5">
        <Image
          src={thumbnail || ''}
          className="h-full w-full rounded-2xl object-cover"
          sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
          fill
          alt=""
        />
        <span className="absolute inset-0 bg-black/10 opacity-0 transition-opacity group-hover:opacity-100"></span>
      </div>
      <div className="mt-4 text-center">
        <h2 className={`text-lg font-medium text-neutral-900 dark:text-neutral-100`}>{name}</h2>
        <span className={`mt-1 block text-sm text-neutral-600 dark:text-neutral-400`}>{count} Articles</span>
        <div className="my-[10px] hidden cursor-pointer items-center justify-center rounded-full bg-[#00652E] p-2 transition-all duration-200 group-hover:inline-flex dark:bg-[#60A43A]">
          <ArrowRightIcon className="h-5 w-5 text-white rtl:rotate-180" />
        </div>
      </div>
    </Link>
  )
}

export default CardCategory3
