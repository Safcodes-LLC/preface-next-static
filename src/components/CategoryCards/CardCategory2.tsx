import NcImage from '@/components/NcImage/NcImage'
import { TCategory } from '@/data/categories'
import { Badge } from '@/shared/Badge'
import { Link } from '@/shared/link'
import clsx from 'clsx'
import { FC } from 'react'

interface Props {
  className?: string
  category: TCategory
  badge?: string
}

const CardCategory2: FC<Props> = ({ className, category, badge }) => {
  const { count, name, handle, thumbnail } = category
  return (
    <div
      className={clsx(
        `card-category-2 relative flex flex-col items-center justify-center rounded-3xl  bg-white px-3 py-3 text-center sm:p-3 dark:bg-[#0D0D0D]`,
        className
      )}
    >
      {/* {badge && (
        <Badge color={'amber'} className="absolute -top-2 left-3 sm:top-3">
          {badge}
        </Badge>
      )} */}
      <NcImage
        containerClassName="relative shrink-0 size-16 "
        src={thumbnail || ''}
        fill
        sizes="80px"
        alt={name}
        className="rounded-full object-cover shadow-lg"
      />
      <div className="mt-3">
        <h2 className={`text-base font-semibold`}>{name}</h2>
        <Link className="absolute inset-0" href={`/category/${handle}`} />
        <span className={`mt-1 block text-sm text-[#666666] dark:text-[#DFDFDF]`}>{count} articles</span>
      </div>
    </div>
  )
}

export default CardCategory2
