'use client'

import convertNumbThousand from '@/utils/convertNumbThousand'
import { HeartIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FC, useState } from 'react'

interface Props {
  className?: string
  likeCount: number
  liked?: boolean
  color?: string
}

const PostCardLikeBtn: FC<Props> = ({ className, likeCount = 0, liked, color }) => {
  const [isLiked, setisLiked] = useState(liked)

  // Default color classes
  const defaultClasses =
    'bg-neutral-50 hover:bg-rose-50 hover:text-rose-600 dark:bg-white/10 dark:hover:bg-white/10 dark:hover:text-rose-400'
  // If color is provided, use it, otherwise use default classes
  const colorClasses = color ? color : defaultClasses

  return (
    <button
      className={clsx(
        'post-card-like-btn group flex h-8 cursor-pointer items-center rounded-full ps-2 pe-3 text-xs leading-none transition-colors',
        className,
        isLiked ? 'bg-[#D6F2E2] text-[#00652E]' : colorClasses
      )}
      onClick={() => setisLiked(!isLiked)}
      title="Like"
    >
      <HeartIcon className="size-4" strokeWidth={1} fill={isLiked ? 'currentColor' : 'none'} />

      <span className={clsx('ms-1', isLiked && 'text-[#00652E]')}>
        {convertNumbThousand(isLiked ? likeCount + 1 : likeCount)}
      </span>
    </button>
  )
}

export default PostCardLikeBtn
