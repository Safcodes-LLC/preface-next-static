import NcImage from '@/components/NcImage/NcImage'
import { TCategory } from '@/data/categories'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  className?: string
  category: TCategory
  sizes?: 'large' | 'normal'
}

const CardCategory1: FC<Props> = ({ className, sizes = 'normal', category }) => {
  const { count, name, handle, parentCategory, thumbnail, featuredImage, slug } = category
  return (
    <Link
      href={`/${parentCategory?.slug}/${slug}`}
      className={clsx(
        'card-category-1 group flex flex-col gap-2',
        'transition-all duration-200 ease-in-out',
        'hover:scale-[1.02]',
        className
      )}
    >
      <div className="relative overflow-hidden rounded-lg">
        <NcImage
          alt={name}
          containerClassName={clsx(
            'relative aspect-[3/2] w-full',
            'transition-transform duration-300 ease-in-out',
            'group-hover:scale-105'
          )}
          src={thumbnail || featuredImage || ''}
          fill
          className="object-cover"
          sizes={sizes}
        />
      </div>
      <div>
        <h2 className={clsx('nc-card-title text-sm font-medium text-neutral-900 dark:text-neutral-100')}>{name}</h2>
      </div>
    </Link>
  )
}

export default CardCategory1
