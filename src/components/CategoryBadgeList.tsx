import { BadgeButton } from '@/shared/Badge'
import clsx from 'clsx'
import { FC } from 'react'

interface CategoryItem {
  name: string
  handle?: string
  slug?: string
  color?: string
  _id?: string
}

interface Props {
  className?: string
  itemClass?: string
  categories: CategoryItem | CategoryItem[]
}

const CategoryBadgeList: FC<Props> = ({ className, itemClass, categories }) => {
  // Handle both single category object and array of categories
  const categoriesArray = Array.isArray(categories) ? categories : [categories]

  // Filter out any undefined or null items for safety
  const validCategories = categoriesArray.filter((item): item is CategoryItem => 
    item !== null && item !== undefined && typeof item === 'object' && 'name' in item
  )

  if (validCategories.length === 0) {
    return null // Don't render anything if no valid categories
  }

  const getCategoryHandle = (category: CategoryItem): string => {
    return category.handle || category.slug || category._id || ''
  }

  const getCategoryColor = (category: CategoryItem): string => {
    return category.color || 'blue'
  }

  return (
    <div className={clsx('category-badge-list flex flex-wrap gap-x-2 gap-y-1', className)}>
      {validCategories.map((category, index) => {
        const categoryHandle = getCategoryHandle(category)
        const categoryColor = getCategoryColor(category)

        return (
          <BadgeButton
            className={itemClass}
            key={`${categoryHandle}-${index}`}
            href={`/category/${categoryHandle}`}
            color={categoryColor as any}
          >
            {category.name}
          </BadgeButton>
        )
      })}
    </div>
  )
}

export default CategoryBadgeList
