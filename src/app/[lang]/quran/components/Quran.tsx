'use client'
import surahs from '@/data/quran/surahs.json'
import clsx from 'clsx'
import { FC, useState } from 'react'
import QuranGrid from './QuranGrid'
import QuranTabSwitcher from './QuranTabSwitcher'

interface Props {
  className?: string
}

const Quran: FC<Props> = ({ className }) => {
  const [quranTab, setQuranTab] = useState<'surah' | 'juz' | 'revelation-order'>('surah')

  // Sort surahs by revelation order for the revelation-order tab
  const sortedByRevelation = [...surahs].sort((a, b) => a.revelation_order - b.revelation_order)

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
              transliteration={surah.transliteration}
              translation={surah.translation}
              totalVerses={surah.total_verses}
            />
          ))}
        </div>
      )}

      {quranTab === 'juz' && (
        // <JuzGrid items={juzData} />
        <div className="mt-4 py-10 text-center">Juz section coming soon</div>
      )}

      {quranTab === 'revelation-order' && (
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedByRevelation.map((surah: any) => (
            <QuranGrid
              key={`reveal-${surah.id}`}
              id={surah.id}
              name={surah.name}
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
