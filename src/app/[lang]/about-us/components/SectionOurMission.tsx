'use client'

import { RawDraftContentState as DraftRawDraftContentState, convertFromRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { useMemo } from 'react'

interface SectionOurMissionProps {
  content: string
}

export default function SectionOurMission({ content }: SectionOurMissionProps) {
  const renderedHtml = useMemo(() => {
    const customStyleMap = {
      FONTWEIGHT_NORMAL: { style: { fontWeight: '400' } },
      FONTWEIGHT_SLIM: { style: { fontWeight: '300' } },
      FONTWEIGHT_MEDIUM: { style: { fontWeight: '500' } },
      FONTWEIGHT_SEMIBOLD: { style: { fontWeight: '600' } },
      FONTWEIGHT_BOLD: { style: { fontWeight: '700' } },
      FONTWEIGHT_EXTRABOLD: { style: { fontWeight: '800' } },
      SUBSCRIPT: { element: 'sub', style: {} },
      SUPERSCRIPT: { element: 'sup', style: {} },
    } as const

    try {
      const parsed = JSON.parse(content) as unknown
      if (parsed && typeof parsed === 'object' && Array.isArray((parsed as { blocks?: unknown }).blocks)) {
        const rawContent = parsed as DraftRawDraftContentState
        const contentState = convertFromRaw(rawContent)

        const options = {
          inlineStyles: customStyleMap,
          inlineStyleFn: (styles: any) => {
            const cls: string[] = []

            // Highlights
            if (styles.has('HIGHLIGHT_YELLOW')) cls.push('px-0.5 rounded-sm bg-yellow-200 dark:bg-yellow-200/30')
            if (styles.has('HIGHLIGHT_GREEN')) cls.push('px-0.5 rounded-sm bg-green-200 dark:bg-green-200/30')
            if (styles.has('HIGHLIGHT_BLUE')) cls.push('px-0.5 rounded-sm bg-sky-200 dark:bg-sky-900/50')
            if (styles.has('HIGHLIGHT_PINK')) cls.push('px-0.5 rounded-sm bg-pink-200 dark:bg-pink-200/30')
            if (styles.has('HIGHLIGHT_ORANGE')) cls.push('px-0.5 rounded-sm bg-orange-200 dark:bg-orange-200/30')
            if (styles.has('HIGHLIGHT_PURPLE')) cls.push('px-0.5 rounded-sm bg-purple-200 dark:bg-purple-200/30')

            // Text Transformations
            if (styles.has('UPPERCASE')) cls.push('uppercase')
            if (styles.has('LOWERCASE')) cls.push('lowercase')
            if (styles.has('CAPITALIZE')) cls.push('capitalize')

            return cls.length ? { element: 'span', attributes: { class: cls.join(' ') } } : undefined
          },
          blockStyleFn: (block: any) => {
            const blockData = block.getData()
            const classes: string[] = []

            // Text alignment
            const alignment = blockData.get('text-align')
            if (alignment) classes.push(`text-${alignment}`)

            // Text direction
            const textDirection = blockData.get('text-direction')
            if (textDirection) classes.push(`dir-${textDirection}`)

            return classes.length ? { attributes: { class: classes.join(' ') } } : undefined
          },
        }

        return stateToHTML(contentState, options)
      }
    } catch (error) {
      console.error('Error rendering content:', error)
    }
    return content
  }, [content])
  return (
    <div
      className="richtext-section prose max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  )
}
