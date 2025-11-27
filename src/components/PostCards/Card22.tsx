'use client'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { RawDraftContentState as DraftRawDraftContentState, convertFromRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
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

const Card22: FC<Props> = ({ className, titleClass = 'text-xl sm:text-3xl', post, lang }) => {
  const {
    title,
    excerpt,
    content,
    slug,
    handle,
    thumbnail,
    featuredImage,
    categories,
    postType,
    likeCount = 120,
    liked,
    bookmarked,
    favoriteCount,
  } = post || {}

const renderedHtml = useMemo(() => {
  // Use content directly instead of content.content
  const contentData = content?.content || content;
  const str = typeof contentData === 'string' ? contentData : String(contentData || '');
  
  try {
    const parsed = JSON.parse(str) as unknown;
    if (parsed && typeof parsed === 'object' && Array.isArray((parsed as { blocks?: unknown }).blocks)) {
      try {
        const rawContent = parsed as DraftRawDraftContentState;
        const contentState = convertFromRaw(rawContent);

        const options = {
          inlineStyles: {
            FONTWEIGHT_NORMAL: { style: { fontWeight: '400' } },
            FONTWEIGHT_SLIM: { style: { fontWeight: '300' } },
            FONTWEIGHT_MEDIUM: { style: { fontWeight: '500' } },
            FONTWEIGHT_SEMIBOLD: { style: { fontWeight: '600' } },
            FONTWEIGHT_BOLD: { style: { fontWeight: '700' } },
            FONTWEIGHT_EXTRABOLD: { style: { fontWeight: '800' } },
            SUBSCRIPT: { element: 'sub', style: {} },
            SUPERSCRIPT: { element: 'sup', style: {} },
          },
          inlineStyleFn: (styles: any) => {
            const cls: string[] = [];
            if (styles.has('HIGHLIGHT_YELLOW')) cls.push('bg-yellow-200 dark:bg-yellow-200/30');
            if (styles.has('HIGHLIGHT_GREEN')) cls.push('bg-green-200 dark:bg-green-200/30');
            if (styles.has('HIGHLIGHT_BLUE')) cls.push('bg-sky-200 dark:bg-sky-900/50');
            if (styles.has('HIGHLIGHT_PINK')) cls.push('bg-pink-200 dark:bg-pink-200/30');
            if (styles.has('HIGHLIGHT_ORANGE')) cls.push('bg-orange-200 dark:bg-orange-200/30');
            if (styles.has('HIGHLIGHT_PURPLE')) cls.push('bg-purple-200 dark:bg-purple-200/30');
            if (styles.has('UPPERCASE')) cls.push('uppercase');
            if (styles.has('LOWERCASE')) cls.push('lowercase');
            if (styles.has('CAPITALIZE')) cls.push('capitalize');
            return cls.length ? { element: 'span', attributes: { class: cls.join(' ') } } : undefined;
          },
        };

        return stateToHTML(contentState, options);
      } catch (e) {
        console.warn('Falling back to draftToHtml', e);
        const html = draftToHtml(parsed as any);
        return html.replace(/font-family:\s*[^;}"']+[;]?/gi, '');
      }
    }
    return str;
  } catch {
    return str;
  }
}, [content]);

  const link =
    lang == 'en'
      ? `/${categories[0]?.parentCategory?.slug}/${categories[0]?.slug}/${slug}`
      : `/${lang}/${categories[0]?.parentCategory?.slug}/${categories[0]?.slug}/${slug}`
  return (
    <div
      className={clsx(
        'card22 relative grid grid-cols-1 gap-6 rounded-3xl bg-white p-6 md:gap-10 md:p-10 lg:grid-cols-12 dark:bg-[#0D0D0D]',
        className
      )}
    >
      <div className="h-48 w-full lg:col-span-3 lg:h-auto">
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <Image
            src={thumbnail || featuredImage || '/images/featured-2.png'}
            alt={title || 'Featured Post'}
            fill
            className="object-cover"
            sizes="(max-width: 767px) 100vw, 300px"
          />
        </div>
      </div>
      <div className="grid w-full gap-2 lg:col-span-9 lg:gap-5">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold tracking-wide text-[#00652E] dark:text-[#60a43a]">Featured</h3>
          <div className="w-9 border-b-2 border-[#00652E] dark:border-[#60a43a]" />
        </div>
        <h2 className={clsx('font-semibold text-[#444444] dark:text-white', titleClass)}>
          <span className="line-clamp-2">{title || 'How to Pray that cleanse Your ensure'}</span>
        </h2>
        {post?._id ? (
          <div className="mt-auto flex items-center gap-3">
            <PostCardLikeBtn likeCount={favoriteCount || likeCount} liked={liked} post={post} />
            <PostCardSaveBtn bookmarked={bookmarked} post={post} />
          </div>
        ) : null}
        {content && (
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
        )}
        <Link
          href={link}
          className="group mt-1 flex cursor-pointer items-center gap-2 self-start text-base font-semibold text-[#00652E] transition-all hover:gap-3 dark:text-[#60a43a]"
        >
          <span>Continue Reading</span>
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}

export default Card22
