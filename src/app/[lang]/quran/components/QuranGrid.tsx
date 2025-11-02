'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  className?: string
  id: number
  name: string
  link: string
  transliteration: string
  translation: string
  totalVerses: number
  showRevealOrder?: boolean
  revealOrder?: number
}

const QuranGrid: FC<Props> = ({
  className,
  id,
  name,
  link,
  transliteration,
  translation,
  totalVerses,
  showRevealOrder = false,
  revealOrder,
}) => {
  return (
    <Link
      href={'/quran/' + link}
      className={clsx(
        'quran-grid-card group flex cursor-pointer justify-between rounded-[10px] bg-white px-5 py-5 transition-shadow hover:shadow-md dark:bg-[#0d0d0d]',
        className
      )}
    >
      <div className="flex items-center gap-4">
        <button
          className="flex aspect-square w-[35px] cursor-pointer items-center justify-center rounded-full bg-[#F3F3F3] text-sm transition-colors group-hover:bg-[#E5F5EA] dark:bg-[#1A1A1A] dark:group-hover:text-black"
          aria-label={`Surah ${transliteration}`}
        >
          {showRevealOrder ? revealOrder : id}
        </button>

        <div className="text-left">
          <h3 className="text-[18px] font-medium">{transliteration}</h3>
          <h4 className="text-[13px] text-[#666666]">
            {showRevealOrder ? `${id} :` : ``} {translation}
          </h4>
          {/* {showRevealOrder && (
            <div className="text-xs text-gray-500 mt-1">Surah {id}</div>
          )} */}
        </div>
      </div>

      <div className="text-right">
        <h3 className="text-[22px] font-normal">{name}</h3>
        <h4 className="text-[13px] text-[#666666]">{totalVerses} Ayat</h4>
      </div>
    </Link>
  )
}

export default QuranGrid
