import { TPost } from '@/data/posts'
import clsx from 'clsx'
import { FC } from 'react'
import Card3Small from './PostCards/Card3Small'
import WidgetHeading from './WidgetHeading'

interface Props {
  className?: string
  posts: TPost[]
  maxHeight?: string // Optional prop to customize max height
  maxVisiblePosts?: number // Optional prop to set when scrolling should kick in
  lang?: string
  isFavourite?: boolean
  title?: string
  isArrowHide?: boolean
}

const WidgetPosts: FC<Props> = ({
  className = 'bg-white dark:bg-[#0D0D0D]',
  posts,
  maxHeight = 'max-h-[70vh]', // Default max height (24rem = 384px)
  maxVisiblePosts = 6,
  lang,
  isFavourite,
  title,
  isArrowHide = false,
}) => {
  const shouldScroll = posts && posts.length > 6

  const parentCategory = posts?.[0]?.parentCategory?.slug
  const viewAllHref = lang === 'en' ? `/${parentCategory}` : `/${lang}/${parentCategory}`

  return (
    <div className={clsx('widget-posts overflow-hidden rounded-[15px]', className)}>
      <WidgetHeading
        title={title || 'Other Topics'}
        viewAll={{ label: 'View all', href: isFavourite ? lang === 'en' ? `/dashboard/my-favourite` : `${lang}/dashboard/my-favourite` : viewAllHref }}
        isArrowHide={isArrowHide}
      />
      <div
        className={clsx(
          'flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700',
          shouldScroll &&
            `${maxHeight} scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 overflow-y-auto`
        )}
      >
        {(isFavourite ? posts?.slice(0, 5) : posts)?.map((post, index) => (
          <Card3Small
            className={`p-4 hover:bg-neutral-200 xl:px-5 ${!isFavourite ? 'xl:py-6' : 'xl:py-3'} dark:hover:bg-neutral-700`}
            key={post._id}
            post={post}
            index={index}
            lang={lang}
            isFavourite={isFavourite}
          />
        ))}
      </div>
    </div>
  )
}

export default WidgetPosts
