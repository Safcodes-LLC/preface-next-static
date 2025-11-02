'use client'
import { FC } from 'react'

interface Props {
  className?: string
  activeTab?: 'surah' | 'verse' | 'juz'
  setActiveTab?: (tab: 'surah' | 'verse' | 'juz') => void
}

const tabs = [
  { id: 'surah', label: 'Surah' },
  { id: 'verse', label: 'Verse' },
  { id: 'juz', label: 'Juz' },
]

const SidebarTabs: FC<Props> = ({ activeTab, setActiveTab = () => {}, className }) => {
  return (
    <div className="mb-[20px] flex items-center justify-between rounded-full bg-[#F1F1F1] dark:bg-[#1A1A1A] p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`font-inter mx-0.5 h-[33px] rounded-full px-6 text-[13px] font-normal transition-colors duration-200 ${
            activeTab === tab.id ? 'bg-[#00652E] text-white' : 'bg-transparent text-[#666666]'
          } `}
          style={{ minWidth: 70 }}
          onClick={() => setActiveTab(tab.id as 'surah' | 'verse' | 'juz')}
        >
          {tab.label}
        </button>
      ))}
    </div>

    // <div className={clsx('quran-tab-swticher flex gap-3', className)}>
    //   <button
    //     className={`cursor-pointer rounded-full border px-4 py-1 text-sm font-normal ${
    //       activeTab === 'surah'
    //         ? 'border-[#60A43A] text-[#60A43A]'
    //         : 'border-[#C7C7C7] text-[#999999] hover:border-[#60A43A] hover:text-[#60A43A]'
    //     }`}
    //     onClick={() => onTabChange('surah')}
    //   >
    //     Surah
    //   </button>
    //   <button
    //     className={`cursor-pointer rounded-full border px-4 py-1 text-sm font-normal ${
    //       activeTab === 'juz'
    //         ? 'border-[#60A43A] text-[#60A43A]'
    //         : 'border-[#C7C7C7] text-[#999999] hover:border-[#60A43A] hover:text-[#60A43A]'
    //     }`}
    //     onClick={() => onTabChange('juz')}
    //   >
    //     Juz
    //   </button>
    //   <button
    //     className={`cursor-pointer rounded-full border px-4 py-1 text-sm font-normal ${
    //       activeTab === 'revelation-order'
    //         ? 'border-[#60A43A] text-[#60A43A]'
    //         : 'border-[#C7C7C7] text-[#999999] hover:border-[#60A43A] hover:text-[#60A43A]'
    //     }`}
    //     onClick={() => onTabChange('revelation-order')}
    //   >
    //     Revelation Order
    //   </button>
    // </div>
  )
}

export default SidebarTabs
