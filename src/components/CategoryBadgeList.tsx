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
  
  console.log(categories,"category test");
  
  // Handle both single category object and array of categories
  const categoriesArray = Array.isArray(categories) ? categories : [categories];
  
  return (
    <div className={clsx('category-badge-list flex flex-wrap gap-x-2 gap-y-1', className)}>
      {categoriesArray.map((item, index) => {
        // Use slug if handle is not available, fallback to _id if neither exists
        const categoryHandle = item.handle || item.slug || item._id || '';
        const categoryColor = item.color || 'blue'; // Default color if not provided
        
        return (
          <BadgeButton 
            className={itemClass} 
            key={index} 
            href={`/category/${categoryHandle}`} 
            color={categoryColor as any}
          >
            {item.name}
          </BadgeButton>
        );
      })}
    </div>
  )
}

export default CategoryBadgeList
