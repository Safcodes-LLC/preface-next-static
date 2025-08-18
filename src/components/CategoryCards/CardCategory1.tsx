import NcImage from '@/components/NcImage/NcImage'
import { TCategory } from '@/data/categories'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  className?: string
  category: TCategory
  size?: 'large' | 'normal'
}

const CardCategory1: FC<Props> = ({ className, size = 'normal', category }) => {
  const { count, name, handle, thumbnail } = category
  return (
    <div className={clsx('grid grid-cols-2 gap-4', className)}>
      {[1, 2].map((item) => (
        <Link 
          key={item}
          href={`/category/${handle}`} 
          className="flex flex-col gap-2 p-3 "
        >
          <NcImage
            alt={name}
            containerClassName="relative aspect-[3/2] w-full overflow-hidden rounded-lg"
            src={thumbnail || ''}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="p-2">
            <h2 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 line-clamp-2">
              {name || 'How to Pray that cleanse your body...'}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CardCategory1
