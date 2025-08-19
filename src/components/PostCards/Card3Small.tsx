import { TPost } from '@/data/posts'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  className?: string
  post: TPost
}

const Card3Small: FC<Props> = ({ className, post }) => {
  const { title, handle, featuredImage } = post

  return (
    <div className={clsx('post-card-3-small group relative flex items-center justify-between gap-4', className)}>
      <div className="relative aspect-[4/3]  w-28 shrink-0">
        <Image
          alt={title}
          sizes="100px"
          className="rounded-lg object-cover brightness-100 transition-[filter] duration-300 group-hover:brightness-75"
          src={featuredImage}
          fill
          title={title}
        />
      </div>

      <div className="relative grow space-y-1">
        {/* <PostCardMeta meta={{ ...post }} /> */}
        <h2 className="nc-card-title block text-sm font-normal sm:text-base ">
          <p className="line-clamp-1" title={title}>
            {title}
          </p>
        </h2>
        <div className=" text-xs font-medium text-neutral-500">Article 1</div>
      </div>

      <Link href={`/post/${handle}`} className="absolute inset-0" title={title}></Link>
    </div>
  )
}

export default Card3Small
