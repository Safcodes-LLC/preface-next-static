import { TCategory } from '@/data/categories'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  className?: string
  category: TCategory
  lang?: string
}

const CardCategory3: FC<Props> = ({ className = '', category, lang }) => {
  const { name, thumbnail, featuredImage, slug, featuredIcon, subCategory } = category

  const href = lang === 'en' ? `/${slug}` : `/${lang}/${slug}`

  return (
    <Link
      href={href}
      className={`card-category-3 group flex flex-col rounded-[18px] bg-white p-[10px] dark:bg-[#0D0D0D] ${className} `}
    >
      <div className="aspect-w-5 relative h-0 w-full shrink-0 overflow-hidden rounded-2xl aspect-h-5">
        <Image
          src={featuredImage || featuredIcon || thumbnail || ''}
          className="h-full w-full rounded-2xl object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          fill
          alt={name || ''}
        />
        <span className="absolute inset-0 bg-black/30 opacity-0 transition-opacity group-hover:opacity-100"></span>

        {/* Arrow overlay */}
        {/* <div
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="transform rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800">
            <ArrowRightIcon className="h-5 w-5 text-gray-700 rtl:rotate-180 dark:text-gray-200" />
          </div>
        </div> */}
      </div>
      <div className="mt-4 text-center">
        <h2 className={`line-clamp-2 text-lg font-medium text-neutral-900 dark:text-neutral-100`}>{name}</h2>
        <span className={`mt-1 block text-sm text-neutral-600 dark:text-neutral-400`}>
          {subCategory?.length} Articles
        </span>
      </div>
    </Link>
  )
}

export default CardCategory3
