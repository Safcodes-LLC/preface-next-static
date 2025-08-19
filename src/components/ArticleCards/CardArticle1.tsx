import NcImage from '@/components/NcImage/NcImage'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

interface Article {
  id: string
  title: string
  handle: string
  thumbnail?: string
  category?: string
}

interface Props {
  className?: string
  article: Article
}

const CardArticle1: FC<Props> = ({ className, article }) => {
  const { title, handle, thumbnail, category } = article

  return (
    <Link
      href={`/article/${handle}`}
      className={clsx('card-article-1 group flex cursor-pointer flex-col gap-3', className)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
        {thumbnail ? (
          <NcImage
            alt={title || 'Article image'}
            containerClassName="w-full h-full"
            src={thumbnail}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-100 dark:bg-neutral-800">
            <span className="text-neutral-400">No image</span>
          </div>
        )}

        
        {/* Linear Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2F2F2F] via-[#61616100] to-transparent opacity-100 transition-all duration-300 group-hover:from-[#2F2F2F] group-hover:via-[#616161aa] group-hover:to-[#61616166]"></div>

        {/* Article Number Badge */}
        <div className="absolute bottom-3 left-1 px-2 py-1 text-xs font-medium text-white">Article 1</div>
      </div>

      <div>
        <h2 className={clsx('nc-card-title text-sm font-medium text-neutral-900 dark:text-neutral-100 line-clamp-2')}>
          {/* {name} */}
          How to Pray that cleanse your body
        </h2>
      </div>
    </Link>
  )
}

export default CardArticle1
