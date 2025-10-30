'use client'
import React from 'react'
import ReadingQuranTab from './readingQuranTab'
import TranslationQuranTab from './translationQuranTab'

type Props = {
  surahData: any
  lang: string
}

const QuranTab = (props: Props) => {
  const { surahData, lang } = props
  const [tab, setTab] = React.useState<'translation' | 'reading'>('translation')
  return (
    <div className="flex w-full flex-col items-center justify-center gap-[40px]">
      <div className="flex items-center gap-[5px] rounded-full border-[1.5px] border-[#60A43A] p-[5px]">
        <button
          onClick={() => setTab('translation')}
          className={`${tab === 'translation' ? 'bg-[#60A43A] text-white' : 'bg-transparent text-[#626262] hover:bg-[#60A43A]/10'} cursor-pointer rounded-full p-[10px_20px] text-[15px] font-medium ${tab === 'translation' ? 'bg-[#60A43A]' : ''}`}
        >
          Translation
        </button>
        <button
          onClick={() => setTab('reading')}
          className={`${tab === 'reading' ? 'bg-[#60A43A] text-white' : 'bg-transparent text-[#626262] hover:bg-[#60A43A]/10'} cursor-pointer rounded-full p-[10px_20px] text-[15px] font-medium ${tab === 'reading' ? 'bg-[#60A43A]' : ''}`}
        >
          Reading
        </button>
      </div>
      {tab === 'translation' ? (
        <TranslationQuranTab surahData={surahData} />
      ) : (
        <ReadingQuranTab surahData={surahData} />
      )}
    </div>
  )
}

export default QuranTab
