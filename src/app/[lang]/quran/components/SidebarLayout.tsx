'use client'

import { useEffect, useState } from 'react'
import QuranSidebar from './QuranSidebar'
import SidebarTabs from './SidebarTabs'

type Props = {
  activeTab?: 'surah' | 'verse' | 'juz'
  setActiveTab?: (tab: 'surah' | 'verse' | 'juz') => void
  params: { lang: string; surah: string }
}

const SidebarLayout = (props: Props) => {
  const { params } = props
  const [activeTab, setActiveTab] = useState<'surah' | 'verse' | 'juz'>('surah')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [search, setSearch] = useState('')

  // For verse mode
  const [selectedSurahId, setSelectedSurahId] = useState<number | null>(null)
  const [selectedVerseId, setSelectedVerseId] = useState<number | null>(null)

  // Reset verse selection when tab changes
  useEffect(() => {
    if (activeTab !== 'verse') {
      setSelectedSurahId(null)
      setSelectedVerseId(null)
    }
  }, [activeTab])
  return (
    <div>
      <SidebarTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Search */}
      <div className="pb-2">
        <div className="relative mb-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${activeTab === 'juz' ? 'Juz' : 'Surah'}...`}
            className="w-full rounded-[42px] border border-neutral-200 bg-[#F5F5F5] px-4 py-2 pl-10 text-sm text-neutral-900 focus:border-transparent focus:ring-0 focus:ring-[#00652E] dark:border-neutral-700 dark:bg-[#1A1A1A] dark:text-neutral-100"
          />
          <svg
            className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {/* Verse label on the right when Verse tab is active */}
          {activeTab === 'verse' && (
            <>
              <span
                className="absolute top-1/2 right-12 mr-8 h-5 w-px -translate-y-1/2 bg-[#DDDDDD] sm:mr-4 md:mr-28 lg:mr-4 dark:bg-[#444444]"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 bg-transparent px-1 text-[12px] leading-[20px] font-normal text-[#A3A3A3]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                Verse
              </span>
            </>
          )}
        </div>
      </div>
      {/* Sidebar List */}
      <div className="pb-4">
        <QuranSidebar
          activeTab={activeTab}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          search={search}
          selectedSurahId={selectedSurahId}
          setSelectedSurahId={setSelectedSurahId}
          selectedVerseId={selectedVerseId}
          setSelectedVerseId={setSelectedVerseId}
          params={params}
        />
      </div>
    </div>
  )
}

export default SidebarLayout
