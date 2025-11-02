'use client'
import localFont from 'next/font/local'
import React from 'react'
import QuranModal from './quranModal'

type Props = {
  surahData: {
    title: string
    startingAlignment?: boolean
    isBismi?: boolean
    ayah: {
      ayah: number
      quran: string
      arabic_ayah?: string
      page: number
      meaning?: string
      explanation?: string
    }[]
  }
}

const quranReadingFont = localFont({
  src: [
    {
      path: '../../../../../../public/fonts/KFGQPC UTHMANIC SCRIPT HAFS REGULAR.otf',
    },
  ],
  variable: '--font-quran-reading',
})

const ReadingQuranTab = (props: Props) => {
  const { surahData } = props

  // Group ayahs by page
  const ayahsByPage: Record<number, typeof surahData.ayah> = {}
  surahData.ayah.forEach((ayah) => {
    const pageNum = Number(ayah.page)
    if (!Number.isFinite(pageNum)) {
      return
    }
    if (!ayahsByPage[pageNum]) {
      ayahsByPage[pageNum] = []
    }
    ayahsByPage[pageNum].push(ayah)
  })

  // Sort page numbers to identify the first page deterministically
  const pages: number[] = Object.keys(ayahsByPage)
    .map((p) => Number(p))
    .filter((n) => Number.isFinite(n))
    .sort((a, b) => a - b)
  const firstPage: number | undefined = pages[0]

  const [selectedAyah, setSelectedAyah] = React.useState<{
    ayah: number
    meaning?: string
    explanation?: string
    quran?: string
    arabic_ayah?: string
  } | null>(null)

  return (
    <React.Fragment>
      <div className="space-y-4">
        {pages.map((pageNum) => {
          const ayahs = ayahsByPage[pageNum] ?? []
          const alignClass =
            surahData.startingAlignment === true && firstPage === pageNum
              ? 'text-center w-2/4 max-md:w-3/4 mx-auto'
              : 'text-justify'
          return (
            <div key={`page-${pageNum}`} className="w-full rounded-2xl bg-[#F3F4F6] dark:bg-[#0d0d0d] py-8 max-md:py-6">
              <div className="mx-auto flex w-4/6 flex-col gap-6 max-md:w-5/6">
                <p
                  className={`${alignClass} text-[26px] leading-relaxed font-medium max-md:text-[20px]`}
                  dir="rtl"
                  style={{ fontFamily: quranReadingFont.style.fontFamily }}
                >
                  {surahData.isBismi !== false && firstPage === pageNum && (
                    <span
                      className="quran-ayah mb-[20px] flex justify-center text-center whitespace-nowrap max-md:mb-[10px]"
                      data-ayah="bismi"
                    >
                      بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ{' '}
                    </span>
                  )}
                  {ayahs.map((ayah, index) => (
                    <span
                      key={ayah.ayah}
                      className="quran-ayah"
                      data-ayah={ayah.ayah}
                      onClick={() =>
                        setSelectedAyah({
                          ayah: ayah.ayah,
                          meaning: ayah.meaning,
                          explanation: ayah.explanation,
                          quran: ayah.quran,
                          arabic_ayah: ayah.arabic_ayah,
                        })
                      }
                    >
                      {ayah.quran} {ayah.arabic_ayah}
                      {index < ayahs.length - 1 && ' '}
                    </span>
                  ))}
                </p>
                <div className="flex justify-center max-md:text-[14px]">
                  <span>{pageNum}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <QuranModal isOpen={!!selectedAyah} onClose={() => setSelectedAyah(null)} selectedAyah={selectedAyah} />

      {/* {selectedAyah && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedAyah(null)}
        >
          <div className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Ayah {selectedAyah.ayah}</h3>
              <button
                aria-label="Close"
                className="rounded-full p-2 text-[#444] hover:bg-gray-100"
                onClick={() => setSelectedAyah(null)}
              >
                ✕
              </button>
            </div>
            {(selectedAyah.quran || selectedAyah.arabic_ayah) && (
              <p
                className="mb-4 text-[22px] leading-relaxed text-[#111]"
                dir="rtl"
                style={{ fontFamily: quranReadingFont.style.fontFamily }}
              >
                {selectedAyah.quran} {selectedAyah.arabic_ayah}
              </p>
            )}
            {selectedAyah.meaning && (
              <div className="mb-3">
                <h4 className="mb-1 text-sm font-medium text-[#222]">Meaning</h4>
                <p className="text-[15px] leading-relaxed text-[#2C2C2C]">{selectedAyah.meaning}</p>
              </div>
            )}
            {selectedAyah.explanation && (
              <div>
                <h4 className="mb-1 text-sm font-medium text-[#222]">Explanation</h4>
                <p className="text-[15px] leading-relaxed text-[#2C2C2C]">{selectedAyah.explanation}</p>
              </div>
            )}
          </div>
        </div>
      )} */}

      <QuranModal isOpen={!!selectedAyah} onClose={() => setSelectedAyah(null)} selectedAyah={selectedAyah} />

      <style jsx>{`
        .quran-ayah {
          position: relative;
          transition: color 0.2s ease;
          cursor: pointer;
        }
        .quran-ayah:hover {
          color: #60a43a;
        }
      `}</style>
    </React.Fragment>
  )
}

export default ReadingQuranTab
