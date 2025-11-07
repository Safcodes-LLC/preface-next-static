'use client'

import PostCardLikeBtn from '@/components/PostCardLikeBtn'
import { TComment, TPostDetail } from '@/data/posts'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { ArrowUp02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { RawDraftContentState as DraftRawDraftContentState, convertFromRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { Noto_Kufi_Arabic, Noto_Serif, Noto_Serif_Malayalam } from 'next/font/google'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { ShareDropdown } from './SingleMetaAction'

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})
const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})
const notoSerifMalayalam = Noto_Serif_Malayalam({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

interface RawDraftInlineStyleRange {
  offset: number
  length: number
  style: string
}

interface RawDraftEntityRange {
  key: number
  length: number
  offset: number
}

interface RawDraftContentBlock {
  key: string
  text: string
  type: string
  depth: number
  inlineStyleRanges: RawDraftInlineStyleRange[]
  entityRanges: RawDraftEntityRange[]
  data?: Record<string, unknown>
}

interface RawDraftContentState {
  blocks: RawDraftContentBlock[]
  entityMap: Record<string, unknown>
}

interface Props {
  post: TPostDetail | any
  comments?: TComment[]
  className?: string
  lang?: string
}

// Custom style map matching the admin panel
const customStyleMap = {
  FONTWEIGHT_NORMAL: {
    style: {
      fontWeight: '400',
    },
  },
  FONTWEIGHT_SLIM: {
    style: {
      fontWeight: '300',
    },
  },
  FONTWEIGHT_MEDIUM: {
    style: {
      fontWeight: '500',
    },
  },
  FONTWEIGHT_SEMIBOLD: {
    style: {
      fontWeight: '600',
    },
  },
  FONTWEIGHT_BOLD: {
    style: {
      fontWeight: '700',
    },
  },
  FONTWEIGHT_EXTRABOLD: {
    style: {
      fontWeight: '800',
    },
  },
  HIGHLIGHT_YELLOW: {
    style: {
      backgroundColor: '#ffff00',
      padding: '2px 0',
    },
  },
  HIGHLIGHT_GREEN: {
    style: {
      backgroundColor: '#90ee90',
      padding: '2px 0',
    },
  },
  HIGHLIGHT_BLUE: {
    style: {
      backgroundColor: '#add8e6',
      padding: '2px 0',
    },
  },
  HIGHLIGHT_PINK: {
    style: {
      backgroundColor: '#ffb6c1',
      padding: '2px 0',
    },
  },
  HIGHLIGHT_ORANGE: {
    style: {
      backgroundColor: '#ffa500',
      padding: '2px 0',
    },
  },
  HIGHLIGHT_PURPLE: {
    style: {
      backgroundColor: '#dda0dd',
      padding: '2px 0',
    },
  },
}

const SingleContentContainer: FC<Props> = ({ post, comments, className, lang }) => {
  const endedAnchorRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLButtonElement>(null)
  //
  const [isShowScrollToTop, setIsShowScrollToTop] = useState<boolean>(false)
  //

  const { tags, author, content, likeCount, favoriteCount, commentCount, liked, handle } = post

  const renderedHtml = useMemo(() => {
    const str = typeof content === 'string' ? content : String(content ?? '')
    try {
      const parsed = JSON.parse(str) as unknown

      // Check if it's a valid Draft.js content state
      if (parsed && typeof parsed === 'object' && Array.isArray((parsed as { blocks?: unknown }).blocks)) {
        const rawContent = parsed as DraftRawDraftContentState

        // Convert Draft.js raw content to ContentState
        const contentState = convertFromRaw(rawContent)

        // Convert to HTML with custom inline styles
        const options = {
          inlineStyles: customStyleMap,
          // Optional: customize block rendering
          blockRenderers: {
            'header-two': (block: any) => `<h2>${block.getText()}</h2>`,
            'header-three': (block: any) => `<h3>${block.getText()}</h3>`,
            'header-four': (block: any) => `<h4>${block.getText()}</h4>`,
            'header-five': (block: any) => `<h5>${block.getText()}</h5>`,
            'header-six': (block: any) => `<h6>${block.getText()}</h6>`,
          },
        }

        return stateToHTML(contentState, options)
      }

      // Fallback to original string if not Draft.js format
      return str
    } catch (error) {
      console.error('Error converting Draft.js to HTML:', error)
      return str
    }
  }, [content])

  const endedAnchorEntry = useIntersectionObserver(endedAnchorRef, {
    threshold: 0,
    root: null,
    rootMargin: '0%',
    freezeOnceVisible: false,
  })

  useEffect(() => {
    const handleProgressIndicator = () => {
      const entryContent = contentRef.current
      const progressBarContent = progressRef.current

      if (!entryContent || !progressBarContent) {
        return
      }

      const winScroll = window.scrollY || document.documentElement.scrollTop
      const entryContentRect = entryContent.getBoundingClientRect()
      const entryContentTop = entryContentRect.top
      const entryContentHeight = entryContentRect.height

      const totalEntryH = entryContentTop + window.scrollY + entryContentHeight
      const scrolled = (winScroll / totalEntryH) * 100

      progressBarContent.innerText = scrolled.toFixed(0) + '%'

      if (scrolled >= 50) {
        setIsShowScrollToTop(true)
      } else {
        setIsShowScrollToTop(false)
      }
    }

    const handleProgressIndicatorHeadeEvent = () => {
      window?.requestAnimationFrame(handleProgressIndicator)
    }
    handleProgressIndicator()
    window?.addEventListener('scroll', handleProgressIndicatorHeadeEvent)
    return () => {
      window?.removeEventListener('scroll', handleProgressIndicatorHeadeEvent)
    }
  }, [])

  const showLikeAndCommentSticky =
    !endedAnchorEntry?.intersectionRatio && (endedAnchorEntry?.boundingClientRect.top || 0) > 0

  return (
    <div className={`relative ${className}`}>
      <div className="single-content space-y-10">
        {/* ENTRY CONTENT */}
        <div
          id="single-entry-content"
          className="mx-auto prose max-w-(--breakpoint-md)! lg:prose-lg dark:prose-invert"
          ref={contentRef}
        >
          <div
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
            className="article-content [&_a]:text-blue-600 [&_a]:underline [&_a]:transition-colors [&_a]:hover:text-blue-800 dark:[&_a]:text-blue-400 dark:[&_a]:hover:text-blue-300"
            style={{
              fontFamily:
                lang === 'ar'
                  ? notoKufiArabic.style.fontFamily
                  : lang === 'ml'
                    ? notoSerifMalayalam.style.fontFamily
                    : notoSerif.style.fontFamily,
            }}
          />
        </div>

        {/* COMMENTS LIST */}
        <div className="mx-auto max-w-(--breakpoint-md)">
          <div ref={endedAnchorRef}></div>
        </div>
      </div>

      {/* LIKE AND COMMENT STICKY */}
      <div className={`sticky bottom-8 z-11 mt-8 justify-center ${showLikeAndCommentSticky ? 'flex' : 'hidden'}`}>
        <div className="flex items-center justify-center gap-x-2 rounded-full bg-white p-1.5 text-xs shadow-lg ring-1 ring-black/5 dark:bg-neutral-800 dark:ring-white/20">
          <PostCardLikeBtn likeCount={favoriteCount || likeCount} liked={liked} post={post} />
          {/* <div className="h-4 border-s border-neutral-200 dark:border-neutral-700"></div>
          <PostCardCommentBtn commentCount={commentCount} handle={handle} /> */}
          <div className="h-4 border-s border-neutral-200 dark:border-neutral-700"></div>
          <ShareDropdown handle={handle} />
          <div className="h-4 border-s border-neutral-200 dark:border-neutral-700"></div>

          <button
            className={`size-8.5 items-center justify-center rounded-full bg-neutral-50 hover:bg-neutral-100 dark:bg-white/10 dark:hover:bg-white/20 ${
              isShowScrollToTop ? 'flex' : 'hidden'
            }`}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            title="Go to top"
          >
            <HugeiconsIcon icon={ArrowUp02Icon} size={18} strokeWidth={1.75} />
          </button>

          <button
            ref={progressRef}
            className={`size-8.5 items-center justify-center ${isShowScrollToTop ? 'hidden' : 'flex'}`}
            title="Go to top"
          >
            %
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleContentContainer
