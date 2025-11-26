'use client'
import { toTitleCase } from '@/utils/slug'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import draftToHtml from 'draftjs-to-html'
import { Noto_Naskh_Arabic, Noto_Serif_Malayalam } from 'next/font/google'
import localFont from 'next/font/local'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import PostCardLikeBtn from '../PostCardLikeBtn'
import PostCardSaveBtn from '../PostCardSaveBtn'

interface Props {
  className?: string
  ratio?: string
  titleClass?: string
  post?: any
  lang?: string
  content?: any
  dict?: any
}

const elgraine = localFont({
  src: [
    {
      path: '../../../public/fonts/Elgraine-Regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-elgraine',
})
const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})
const notoSerifMalayalam = Noto_Serif_Malayalam({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const Card21: FC<Props> = ({ className, titleClass = 'text-xl sm:text-3xl', post, content, dict, lang }) => {
  const { likeCount = 120, liked, bookmarked, favoriteCount } = post || {}

  const renderedHtml = useMemo(() => {
    const str = typeof content.content === 'string' ? content.content : String(content.content ?? '')
    try {
      const parsed = JSON.parse(str) as unknown
      if (parsed && typeof parsed === 'object' && Array.isArray((parsed as { blocks?: unknown }).blocks)) {
        let html = draftToHtml(parsed as any)
        // Remove any inline font-family styles from CMS content
        html = html.replace(/font-family:\s*[^;}"']+[;]?/gi, '')
        // html = html.replace(/style=["']\s*["']/g, '') // Remove empty style attributes
        return html
      }
      return str
    } catch {
      return str
    }
  }, [content])

  return (
    <div
      className={clsx(
        'card21 relative flex flex-col overflow-hidden rounded-[25px] border-t-30 border-t-[#60A43A] bg-white p-10 md:border-t-0 md:border-l-30 md:border-l-[#60A43A] dark:bg-[#0D0D0D]',
        className
      )}
    >
      <div className="flex flex-col items-start gap-5 md:flex-row">
        <div className="relative h-[145px] w-full flex-shrink-0 md:w-[122px]">
          <Image
            src={content?.image || '/images/featured.png'}
            alt={content?.title + 'image'}
            fill
            className="rounded-2xl object-cover"
            priority
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2 md:gap-5">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold tracking-wide text-[#00652E] dark:text-[#60a43a]">
              {dict.common.featured}
            </h3>
            <div className="w-9 border-b-2 border-[#00652E] dark:border-[#60a43a]" />
          </div>
          <h2 className={clsx('font-semibold text-[#444444] dark:text-white', titleClass)}>
            <span className="line-clamp-2">
              {toTitleCase(content?.title) || 'How to Pray that cleanse Your ensure'}
            </span>
          </h2>
          {content.likeAndBookmark ? (
            <div className="mt-auto flex items-center gap-3">
              <PostCardLikeBtn likeCount={favoriteCount || likeCount} liked={liked} post={post} />
              <PostCardSaveBtn bookmarked={bookmarked} post={post} />
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col gap-3 pt-6">
        <div id="single-entry-content" className="w-full">
          <div
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
            className="line-clamp-6 w-full dark:[&_*]:!text-white"
            style={{
              fontFamily:
                lang === 'ar'
                  ? notoNaskhArabic.style.fontFamily
                  : lang === 'ml'
                    ? notoSerifMalayalam.style.fontFamily
                    : elgraine.style.fontFamily,
            }}
          />
        </div>
        <Link
          href={content.link}
          className="group mt-1 flex cursor-pointer items-center gap-2 self-start text-base font-semibold text-[#00652E] transition-all hover:gap-3 dark:text-[#60a43a]"
        >
          <span>{dict.common.continueReading}</span>
          <ArrowRightIcon
            className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${lang === 'ar' || lang === 'ur' ? 'rotate-180' : ''}`}
          />
        </Link>
      </div>
    </div>
  )
}

export default Card21
