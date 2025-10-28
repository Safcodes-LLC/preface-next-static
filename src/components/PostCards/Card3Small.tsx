import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  className?: string
  post: any
  index: number
  lang?: string
  isFavourite?: boolean
}

const Card3Small: FC<Props> = ({ className, post, index, lang, isFavourite }) => {
  const { name, title, handle, featuredImage, parentCategory, slug } = post
  // console.log(parentCategory, 'parentCategory');

  return (
    <div className={clsx('post-card-3-small group relative flex items-center justify-between gap-4', className)}>
      <div className="relative aspect-[4/3] w-32 shrink-0">
        <Image
          alt={name || title}
          sizes="(max-width: 640px) 320px, 300px"
          className="rounded-lg object-cover brightness-100 transition-[filter] duration-300 group-hover:brightness-75"
          src={isFavourite ? post?.favourite?.thumbnail : featuredImage}
          fill
          quality={85}
          priority={index < 3} // Load first 3 images with higher priority
          title={name || title}
        />
      </div>

      <div className="relative grow space-y-1">
        <h2 className="nc-card-title block text-sm font-normal sm:text-[14px]">
          <p className="line-clamp-1" title={title}>
            {isFavourite ? post?.favourite?.title : name || title}
          </p>
        </h2>
        {isFavourite && <div className="text-xs font-medium text-neutral-500">hadeeth</div>}
        {!isFavourite && <div className="text-xs font-medium text-neutral-500">Article {index + 1}</div>}
      </div>

      <Link href={`/${parentCategory?.slug}/${slug}`} className="absolute inset-0" title={name || title}></Link>
    </div>
  )
}

export default Card3Small
