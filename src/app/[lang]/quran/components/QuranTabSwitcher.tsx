'use client'
import clsx from 'clsx'
import { FC } from 'react'

interface Props {
  className?: string
  activeTab: 'surah' | 'juz' | 'revelation-order'
  onTabChange: (tab: 'surah' | 'juz' | 'revelation-order') => void
}

const QuranTabSwitcher: FC<Props> = ({ activeTab, onTabChange, className }) => {
  return (
    <div className={clsx('quran-tab-swticher flex gap-3', className)}>
      <button
        className={`cursor-pointer rounded-full border px-4 py-1 text-sm font-normal ${
          activeTab === 'surah'
            ? 'border-[#60A43A] text-[#60A43A]'
            : 'border-[#C7C7C7] text-[#999999] hover:border-[#60A43A] hover:text-[#60A43A]'
        }`}
        onClick={() => onTabChange('surah')}
      >
        Surah
      </button>
      <button
        className={`cursor-pointer rounded-full border px-4 py-1 text-sm font-normal ${
          activeTab === 'juz'
            ? 'border-[#60A43A] text-[#60A43A]'
            : 'border-[#C7C7C7] text-[#999999] hover:border-[#60A43A] hover:text-[#60A43A]'
        }`}
        onClick={() => onTabChange('juz')}
      >
        Juz
      </button>
      <button
        className={`cursor-pointer rounded-full border px-4 py-1 text-sm font-normal ${
          activeTab === 'revelation-order'
            ? 'border-[#60A43A] text-[#60A43A]'
            : 'border-[#C7C7C7] text-[#999999] hover:border-[#60A43A] hover:text-[#60A43A]'
        }`}
        onClick={() => onTabChange('revelation-order')}
      >
        Revelation Order
      </button>
    </div>
  )
}

export default QuranTabSwitcher
