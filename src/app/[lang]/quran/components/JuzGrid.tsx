'use client'
import clsx from 'clsx'
import { FC } from 'react'

interface Surah {
  id: number
  name: string
  transliteration: string
  translation: string
  total_verses: number
  type: string
  revelation_order: number
  rukus: number
  english_name: string
  juz: number[]
}

interface Props {
  className?: string
  juzNumber: number
  surahs: Surah[]
}

const JuzGrid: FC<Props> = ({ className, juzNumber, surahs }) => {
  return (
    <div className={clsx('quran-grid-card flex flex-col gap-3 rounded-[10px] bg-white p-5', className)}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Juz {juzNumber}</h2>
          <a
            href={`/quran/juz/${juzNumber}`}
            className="cursor-pointer text-sm font-semibold text-[#00652E] hover:underline"
          >
            Read
          </a>
        </div>

        <div className="space-y-4">
          {surahs.map((surah, index) => (
            <div
              key={`juz-${juzNumber}-surah-${surah.id}`}
              className="group cursor-pointer rounded-[10px] border border-[#EFEFEF] px-5 py-6 transition-shadow hover:shadow-md"
            >
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F3F3] group-hover:bg-[#E5F5EA]">
                    <span className="text-sm font-medium text-[#222]">{surah.id}</span>
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <h3 className="text-base font-medium">{surah.transliteration}</h3>
                    <span className="text-sm text-gray-500">{surah.translation}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-[6px]">
                  <span className="text-right text-base font-medium" dir="rtl">
                    {surah.name}
                  </span>
                  <span className="text-sm text-gray-500">{surah.total_verses} Ayath</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default JuzGrid
