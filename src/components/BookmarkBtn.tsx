'use client'

import { Bookmark02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { FC, useState } from 'react'

interface Props {
  className?: string
  bookmarked?: boolean
  color?: string
}

const BookmarkBtn: FC<Props> = ({ className, bookmarked, color }) => {
  const [isBookmarked, setIsBookmarked] = useState(bookmarked)

  // Default color classes
  const defaultClasses =
    'relative flex size-8 cursor-pointer items-center justify-center rounded-full bg-neutral-50 transition-colors duration-300 hover:bg-neutral-100 dark:bg-white/10 dark:hover:bg-white/20'

  return (
    <button
      className={clsx(color ? color : defaultClasses, className)}
      title="Save to reading list"
      onClick={() => setIsBookmarked(!isBookmarked)}
      type="button"
    >
      <HugeiconsIcon icon={Bookmark02Icon} size={16} strokeWidth={1} fill={isBookmarked ? 'currentColor' : 'none'} />
    </button>
  )
}

export default BookmarkBtn
