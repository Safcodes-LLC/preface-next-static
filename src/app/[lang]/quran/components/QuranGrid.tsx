'use client'
import clsx from 'clsx'
import { FC } from 'react'

interface Props {
  className?: string
  id: number
  name: string
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
  transliteration,
  translation,
  totalVerses,
  showRevealOrder = false,
  revealOrder,
}) => {
  return (
    <div
      className={clsx(
        'quran-grid-card cursor-pointer flex justify-between rounded-[10px] bg-white px-5 py-5 transition-shadow hover:shadow-md',
        className
      )}
    >
      <div className="flex items-center gap-4">
        <button
          className="flex aspect-square w-[35px] cursor-pointer items-center justify-center rounded-full bg-[#F3F3F3] text-sm transition-colors hover:bg-gray-50"
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
    </div>
  )
}

export default QuranGrid
