import NcImage from '@/components/NcImage/NcImage'
import { TCategory } from '@/data/categories'
import { Link } from '@/shared/link'
import clsx from 'clsx'
import { FC } from 'react'

interface Props {
  className?: string
  category: TCategory | any
  badge?: string
  lang?: string
}

const CardCategory2: FC<Props> = ({ className, category, badge, lang }) => {
  const {
    count,
    name,
    categoryName,
    parentCategory,
    slug,
    handle,
    thumbnail,
    icon,
    featuredImage,
    featuredIcon,
    postCount,
  } = category
  // console.log(category,"category432")
  // console.log(parentCategory,"parentCategory")

  return (
    <div
      className={clsx(
        `card-category-2 relative flex flex-col items-center justify-center rounded-3xl bg-white px-3 py-3 text-center sm:p-3 dark:bg-[#0D0D0D] group`,
        className
      )}
    >
      {/* {badge && (
        <Badge color={'amber'} className="absolute -top-2 left-3 sm:top-3">
          {badge}
        </Badge>
      )} */}
      <NcImage
        containerClassName="relative shrink-0 size-12 transition-transform duration-500 group-hover:scale-90"
        src={featuredIcon || ''}
        fill
        sizes="80px"
        alt={categoryName || ''}
        className="h-full w-full object-contain"
      />
      <div className="mt-3">
        <Link
          href={lang === 'en' ? `/${parentCategory?.slug}/${slug}` : `/${lang}/${parentCategory?.slug}/${slug}`}
          className={`line-clamp-1 text-base font-semibold relative z-10 inset-0 text-[#2a2a2a2] hover:text-[#3a3a3a]`}
        >
          {categoryName}
        </Link>
        <div
          className="absolute inset-0"
          // href={lang === 'en' ? `/${parentCategory?.slug}/${slug}` : `/${lang}/${parentCategory?.slug}/${slug}`}
        />
        <span className={`mt-1 block text-xs text-[#666666] dark:text-[#DFDFDF]`}>{postCount} articles</span>
      </div>
    </div>
  )
}

export default CardCategory2
