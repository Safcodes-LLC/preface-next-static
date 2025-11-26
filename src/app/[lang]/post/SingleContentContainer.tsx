'use client'

import PostCardLikeBtn from '@/components/PostCardLikeBtn'
import { TComment, TPostDetail } from '@/data/posts'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { ArrowUp02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { RawDraftContentState as DraftRawDraftContentState, convertFromRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { Noto_Naskh_Arabic, Noto_Serif_Malayalam } from 'next/font/google'
import localFont from 'next/font/local'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { ShareDropdown } from './SingleMetaAction'

const elgraine = localFont({
  src: [
    {
      path: '../../../../public/fonts/Elgraine-Regular.woff',
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

const SingleContentContainer: FC<Props> = ({ post, comments, className, lang }) => {
  const endedAnchorRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLButtonElement>(null)
  //
  const [isShowScrollToTop, setIsShowScrollToTop] = useState<boolean>(false)
  //

  const { tags, author, content, likeCount, favoriteCount, commentCount, liked, handle } = post

  // State for custom tooltip
  const [tooltipData, setTooltipData] = useState<{
    visible: boolean
    content: string
    imageUrl: string
    x: number
    y: number
    showBelow?: boolean
  }>({
    visible: false,
    content: '',
    imageUrl: '',
    x: 0,
    y: 0,
    showBelow: false,
  })

  const renderedHtml = useMemo(() => {
    // COMPLETE custom inline style map with ALL supported styles
    const customStyleMap = {
      // Font Weights
      FONTWEIGHT_NORMAL: { style: { fontWeight: '400' } },
      FONTWEIGHT_SLIM: { style: { fontWeight: '300' } },
      FONTWEIGHT_MEDIUM: { style: { fontWeight: '500' } },
      FONTWEIGHT_SEMIBOLD: { style: { fontWeight: '600' } },
      FONTWEIGHT_BOLD: { style: { fontWeight: '700' } },
      FONTWEIGHT_EXTRABOLD: { style: { fontWeight: '800' } },

      // Subscript and Superscript
      SUBSCRIPT: {
        element: 'sub',
        style: {},
      },
      SUPERSCRIPT: {
        element: 'sup',
        style: {},
      },
    } as const

    const str = typeof content === 'string' ? content : String(content ?? '')
    try {
      const parsed = JSON.parse(str) as unknown
      if (parsed && typeof parsed === 'object' && Array.isArray((parsed as { blocks?: unknown }).blocks)) {
        const rawContent = parsed as DraftRawDraftContentState

        console.log('=== FRONTEND: Processing Draft.js Content ===')
        console.log(
          'Blocks:',
          rawContent.blocks.map((b) => ({
            text: b.text.substring(0, 30),
            type: b.type,
            data: b.data,
          }))
        )

        const contentState = convertFromRaw(rawContent)

        // Entity style function for links with tooltips
        const entityStyleFn = (entity: any) => {
          if (entity.get('type').toLowerCase() === 'link') {
            const data = entity.getData()
            const { url, target, tooltipContent, imageUrl } = data
            const attributes: any = {
              href: url || '#',
              target: target || '_blank',
              rel: target === '_blank' ? 'noopener noreferrer' : undefined,
            }
            if (tooltipContent || imageUrl) {
              attributes['data-tooltip-content'] = tooltipContent || ''
              attributes['data-tooltip-image'] = imageUrl || ''
              attributes.class = 'has-custom-tooltip'
            }
            return { element: 'a', attributes }
          }
          return undefined
        }

        // Apply highlight backgrounds and text transformations via classes
        const inlineStyleFn = (styles: any) => {
          const cls: string[] = []

          // Highlights
          if (styles.has && styles.has('HIGHLIGHT_YELLOW'))
            cls.push('px-0.5 rounded-sm bg-yellow-200 dark:bg-yellow-200/30')
          if (styles.has && styles.has('HIGHLIGHT_GREEN'))
            cls.push('px-0.5 rounded-sm bg-green-200 dark:bg-green-200/30')
          if (styles.has && styles.has('HIGHLIGHT_BLUE')) cls.push('px-0.5 rounded-sm bg-sky-200 dark:bg-sky-900/50')
          if (styles.has && styles.has('HIGHLIGHT_PINK')) cls.push('px-0.5 rounded-sm bg-pink-200 dark:bg-pink-200/30')
          if (styles.has && styles.has('HIGHLIGHT_ORANGE'))
            cls.push('px-0.5 rounded-sm bg-orange-200 dark:bg-orange-200/30')
          if (styles.has && styles.has('HIGHLIGHT_PURPLE'))
            cls.push('px-0.5 rounded-sm bg-purple-200 dark:bg-purple-200/30')

          // Text Transformations
          if (styles.has && styles.has('UPPERCASE')) cls.push('text-uppercase')
          if (styles.has && styles.has('LOWERCASE')) cls.push('text-lowercase')
          if (styles.has && styles.has('CAPITALIZE')) cls.push('text-capitalize')

          if (cls.length) {
            return { element: 'span', attributes: { class: cls.join(' ') } }
          }
          return undefined
        }

        // Block style function to handle alignment, indentation, line spacing, and direction
        const blockStyleFn = (block: any) => {
          const blockData = block.getData()
          const alignment = blockData.get('text-align')
          const indentLevel = blockData.get('indent-level') || 0
          const textDirection = blockData.get('text-direction')
          const lineSpacing = blockData.get('line-spacing')

          const classes: string[] = []

          // Text alignment
          if (alignment) {
            classes.push(`text-align-${alignment}`)
          }

          // Indentation with RTL support
          if (indentLevel > 0) {
            if (textDirection === 'rtl') {
              classes.push(`indent-level-${indentLevel}-rtl`)
            } else {
              classes.push(`indent-level-${indentLevel}`)
            }
          }

          // Text direction
          if (textDirection) {
            classes.push(`dir-${textDirection}`)
          }

          // Line spacing
          if (lineSpacing) {
            classes.push(`line-spacing-${lineSpacing}`)
          }

          if (classes.length > 0) {
            console.log(`Block classes:`, classes.join(' '))
            return {
              attributes: {
                class: classes.join(' '),
              },
            }
          }

          return undefined
        }

        const options = {
          inlineStyles: customStyleMap,
          inlineStyleFn,
          entityStyleFn,
          blockStyleFn,
          blockRenderers: {
            'header-two': (block: any) => `<h2>${block.getText()}</h2>`,
            'header-three': (block: any) => `<h3>${block.getText()}</h3>`,
            'header-four': (block: any) => `<h4>${block.getText()}</h4>`,
            'header-five': (block: any) => `<h5>${block.getText()}</h5>`,
            'header-six': (block: any) => `<h6>${block.getText()}</h6>`,
          },
        }

        let html = stateToHTML(contentState, options)
        console.log('=== Generated HTML (first 500 chars) ===')
        console.log(html.substring(0, 500))

        // Remove any inline font-family styles from CMS content
        html = html.replace(/font-family:\s*[^;}"']+[;]?/gi, '')
        // html = html.replace(/style=["']\s*["']/g, '') // Remove empty style attributes

        return html
      }
      return str
    } catch (err) {
      console.error('Error converting Draft.js to HTML:', err)
      return str
    }
  }, [content])

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

  // Handle custom tooltip on link hover
  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (target.tagName === 'A' && target.classList.contains('has-custom-tooltip')) {
        const tooltipContent = target.getAttribute('data-tooltip-content') || ''
        const imageUrl = target.getAttribute('data-tooltip-image') || ''

        if (tooltipContent || imageUrl) {
          const rect = target.getBoundingClientRect()
          const tooltipWidth = 288
          const estimatedTooltipHeight = imageUrl ? 250 : 80

          let xPos = rect.left + rect.width / 2
          const viewportWidth = window.innerWidth

          if (xPos - tooltipWidth / 2 < 10) {
            xPos = tooltipWidth / 2 + 10
          }
          if (xPos + tooltipWidth / 2 > viewportWidth - 10) {
            xPos = viewportWidth - tooltipWidth / 2 - 10
          }

          let yPos = rect.top - 10
          let showBelow = false

          if (rect.top < estimatedTooltipHeight + 20) {
            yPos = rect.bottom + 10
            showBelow = true
          }

          setTooltipData({
            visible: true,
            content: tooltipContent,
            imageUrl: imageUrl,
            x: xPos,
            y: yPos,
            showBelow: showBelow,
          })
        }
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' && target.classList.contains('has-custom-tooltip')) {
        setTooltipData((prev) => ({ ...prev, visible: false }))
      }
    }

    const handleScroll = () => {
      setTooltipData((prev) => ({ ...prev, visible: false }))
    }

    const content = contentRef.current
    if (content) {
      content.addEventListener('mouseenter', handleMouseEnter, true)
      content.addEventListener('mouseleave', handleMouseLeave, true)
      window.addEventListener('scroll', handleScroll, { passive: true })

      return () => {
        content.removeEventListener('mouseenter', handleMouseEnter, true)
        content.removeEventListener('mouseleave', handleMouseLeave, true)
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [renderedHtml])

  const endedAnchorEntry = useIntersectionObserver(endedAnchorRef, {
    threshold: 0,
    root: null,
    rootMargin: '0%',
    freezeOnceVisible: false,
  })

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
            className="article-content [&_a]:text-blue-600 [&_a]:underline [&_a]:transition-colors [&_a]:hover:text-blue-800 dark:[&_a]:text-blue-400 dark:[&_a]:hover:text-blue-300 [&_a.has-custom-tooltip]:cursor-help [&_a.has-custom-tooltip]:border-b [&_a.has-custom-tooltip]:border-dotted [&_a.has-custom-tooltip]:border-blue-600 dark:[&_a.has-custom-tooltip]:border-blue-400"
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

        {/* COMMENTS LIST */}
        <div className="mx-auto max-w-(--breakpoint-md)">
          <div ref={endedAnchorRef}></div>
        </div>
      </div>

      {/* Custom Tooltip with Image */}
      {tooltipData.visible && (tooltipData.content || tooltipData.imageUrl) && (
        <div
          className="pointer-events-none fixed z-[9999] px-2 transition-opacity duration-200"
          style={{
            left: `${tooltipData.x}px`,
            top: `${tooltipData.y}px`,
            transform: tooltipData.showBelow ? 'translate(-50%, 0)' : 'translate(-50%, -100%)',
            maxWidth: 'calc(100vw - 20px)',
          }}
        >
          <div className="w-max max-w-xs rounded-lg border bg-white p-3 text-black shadow-2xl dark:bg-[#0d0d0d] dark:text-white">
            {tooltipData.imageUrl && (
              <div className="mb-2">
                <img
                  src={tooltipData.imageUrl}
                  alt="Tooltip"
                  className="h-auto max-h-48 w-full rounded object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            )}
            {tooltipData.content && (
              <p className="m-0 text-xs leading-relaxed break-words whitespace-pre-wrap sm:text-sm">
                {tooltipData.content}
              </p>
            )}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                [tooltipData.showBelow ? 'top' : 'bottom']: 0,
                transform: tooltipData.showBelow ? 'translate(-50%, -100%)' : 'translate(-50%, 100%)',
              }}
            >
              <div
                className={`h-0 w-0 border-r-[6px] border-l-[6px] border-r-transparent border-l-transparent ${
                  tooltipData.showBelow
                    ? 'border-b-[6px] border-b-gray-900 dark:border-b-gray-800'
                    : 'border-t-[6px] border-t-gray-900 dark:border-t-gray-800'
                }`}
              />
            </div>
          </div>
        </div>
      )}

      {/* LIKE AND COMMENT STICKY */}
      <div className={`sticky bottom-8 z-11 mt-8 justify-center ${showLikeAndCommentSticky ? 'flex' : 'hidden'}`}>
        <div className="flex items-center justify-center gap-x-2 rounded-full bg-white p-1.5 text-xs shadow-lg ring-1 ring-black/5 dark:bg-neutral-800 dark:ring-white/20">
          <PostCardLikeBtn likeCount={favoriteCount || likeCount} liked={liked} post={post} />
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
