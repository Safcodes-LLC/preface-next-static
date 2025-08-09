import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  meta: any
  className?: string
  avatarSize?: string
}

const PostCardMeta5: FC<Props> = ({ meta, className, avatarSize }) => {
  const { date, author, title, handle, categories } = meta

  return (
    <div className={clsx('post-card-meta-2 relative flex gap-2 text-xs/6', className)}>
      <div>
        <h2 className={clsx('block text-xl font-medium')}>
          <Link href={`/post/${handle}`} className="line-clamp-1">
            {title}
          </Link>
        </h2>
        {/* <span className="flex items-center gap-1 pt-1 text-xs font-normal text-[#A9A9A9]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          1hr 16mins
        </span> */}
      </div>
    </div>
  )
}

export default PostCardMeta5
