'use client'
import { Menu01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import React, { useEffect, useState } from 'react'
import SidebarLayout from '../../components/SidebarLayout'
import ReadingQuranTab from './readingQuranTab'
import TranslationQuranTab from './translationQuranTab'
type Props = {
  surahData: any
  params: {
    surah: string
    lang: string
  }
}

const QuranTab = (props: Props) => {
  const { surahData, params } = props
  const [isSideBar, setNowSideBar] = useState(false)
  const [tab, setTab] = React.useState<'translation' | 'reading'>('translation')

  // Disable body scroll when sidebar is open
  useEffect(() => {
    if (isSideBar) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    // Cleanup: restore scroll when component unmounts
    return () => {
      document.body.style.overflow = ''
    }
  }, [isSideBar])

  return (
    <React.Fragment>
      <div className="flex w-full flex-col items-center justify-center gap-[40px]">
        <div className="flex w-full items-center justify-between max-md:sticky max-md:top-[90px] max-md:z-20">
          <div className="md:hidden">
            <button
              onClick={() => setNowSideBar(true)}
              className="me-auto aspect-square h-full rounded-full bg-gray-100 p-[10px] shadow-md"
            >
              <HugeiconsIcon icon={Menu01Icon} size={24} color="currentColor" strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex items-center gap-[5px] rounded-full border-[1.5px] border-[#60A43A] bg-[#f8f8f8] dark:bg-[#0d0d0d] p-[5px] max-md:shadow-md md:mx-auto">
            <button
              onClick={() => setTab('translation')}
              className={`${tab === 'translation' ? 'bg-[#60A43A] text-white' : 'bg-transparent text-[#626262] hover:bg-[#60A43A]/10'} cursor-pointer rounded-full p-[10px_20px] text-[15px] font-medium max-md:text-[14px] ${tab === 'translation' ? 'bg-[#60A43A]' : ''}`}
            >
              Translation
            </button>
            <button
              onClick={() => setTab('reading')}
              className={`${tab === 'reading' ? 'bg-[#60A43A] text-white' : 'bg-transparent text-[#626262] hover:bg-[#60A43A]/10'} cursor-pointer rounded-full p-[10px_20px] text-[15px] font-medium max-md:text-[14px] ${tab === 'reading' ? 'bg-[#60A43A]' : ''}`}
            >
              Reading
            </button>
          </div>
        </div>
        {tab === 'translation' ? (
          <TranslationQuranTab surahData={surahData} />
        ) : (
          <ReadingQuranTab surahData={surahData} />
        )}
      </div>

      {/* Mobile Sidebar Modal */}
      {isSideBar && (
        <div
          className="fixed inset-0 z-50 flex md:hidden"
          role="dialog"
          aria-modal="true"
          onClick={() => setNowSideBar(false)}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/40" />
          {/* Sidebar */}
          <div className="relative z-10 h-full w-[280px] bg-white dark:bg-[#0D0D0D] shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 rounded-[10px] bg-white px-4 py-5 dark:bg-[#0D0D0D]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button
                  onClick={() => setNowSideBar(false)}
                  className="rounded-full p-2 text-[#444] hover:bg-gray-100"
                  aria-label="Close sidebar"
                >
                  ✕
                </button>
              </div>
              <SidebarLayout params={params} />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default QuranTab
