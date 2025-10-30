'use client'
import surahs from '@/data/quran/surahs.json'
import clsx from 'clsx'
import { FC, useState } from 'react'
import JuzGrid from './JuzGrid'
import QuranGrid from './QuranGrid'
import QuranTabSwitcher from './QuranTabSwitcher'

interface Props {
  className?: string
}

const Quran: FC<Props> = ({ className }) => {
  const [quranTab, setQuranTab] = useState<'surah' | 'juz' | 'revelation-order'>('surah')

  // Sort surahs by revelation order for the revelation-order tab
  const sortedByRevelation = [...surahs].sort((a, b) => a.revelation_order - b.revelation_order)

  // Define the Surah type
  type Surah = {
    id: number
    name: string
    link: string
    transliteration: string
    translation: string
    type: string
    total_verses: number
    revelation_order: number
    rukus: number
    english_name: string
    juz: number[]
  }

  // Group surahs by juz
  type JuzData = { [key: number]: Surah[] }

  const juzData: JuzData = Array(30)
    .fill(0)
    .reduce((acc: JuzData, _, index) => {
      const juzNumber = index + 1
      const surahsInJuz = (surahs as Surah[]).filter((surah) => surah.juz.includes(juzNumber))
      acc[juzNumber] = surahsInJuz
      return acc
    }, {})

  return (
    <div className={clsx('quran', className)}>
      <QuranTabSwitcher activeTab={quranTab} onTabChange={setQuranTab} />

      {quranTab === 'surah' && (
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {surahs.map((surah: any) => (
            <QuranGrid
              key={surah.id}
              id={surah.id}
              name={surah.name}
              link={surah.link}
              transliteration={surah.transliteration}
              translation={surah.translation}
              totalVerses={surah.total_verses}
            />
          ))}
        </div>
      )}

      {quranTab === 'juz' && (
        <div className="mt-4 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {Object.entries(juzData).map(([juzNumber, surahsInJuz]) => {
            // Type assertion to ensure TypeScript knows surahsInJuz is Surah[]
            const surahsArray = surahsInJuz as Surah[]
            return (
              <div key={juzNumber} className="mb-6 break-inside-avoid">
                <JuzGrid juzNumber={parseInt(juzNumber)} surahs={surahsArray} />
              </div>
            )
          })}
        </div>
      )}

      {quranTab === 'revelation-order' && (
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedByRevelation.map((surah: any) => (
            <QuranGrid
              key={`reveal-${surah.id}`}
              id={surah.id}
              name={surah.name}
              link={surah.link}
              transliteration={surah.transliteration}
              translation={surah.translation}
              totalVerses={surah.total_verses}
              showRevealOrder={true}
              revealOrder={surah.revelation_order}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Quran
