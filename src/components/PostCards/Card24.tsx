'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  className?: string
  lang?: string
  title?: string
  category?: string
  thumbnail?: string
}

const Card24: FC<Props> = ({
  className,
  lang,
  title = 'is simply dummy printing and typese..',
  category = 'Belief',
  thumbnail = '/images/placeholder-image.png',
}) => {
  return (
    <Link
      href={'#'}
      className={clsx(
        'group relative block overflow-hidden rounded-2xl border border-[#E8E8E8] transition-all hover:bg-gray-50 dark:border-[#505050] dark:hover:bg-neutral-800',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/4]">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <span className="font-regular mb-2 inline-block text-xs tracking-wider text-[#00652E] uppercase dark:text-[#00652E]">
          {category}
        </span>
        <h3 className="line-clamp-2 text-sm font-normal text-gray-900 dark:text-neutral-200">{title}</h3>
      </div>
    </Link>
  )
}

export default Card24
