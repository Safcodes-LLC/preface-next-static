import localFont from 'next/font/local'
import React from 'react'

type Props = {
  surahData: {
    title: string
    ayah: {
      ayah: number
      quran: string
      arabic_ayah?: string
      page: number
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
    const page = ayah.page
    if (!ayahsByPage[page]) {
      ayahsByPage[page] = []
    }
    ayahsByPage[page].push(ayah)
  })

  return (
    <React.Fragment>
      <div className="space-y-4">
        {Object.entries(ayahsByPage).map(([page, ayahs]) => (
          <div key={`page-${page}`} className="w-full rounded-2xl bg-[#F3F4F6] py-8">
            <div className="mx-auto flex w-4/6 flex-col gap-6">
              <p
                className="text-justify text-[26px] leading-relaxed font-medium"
                dir="rtl"
                style={{ fontFamily: quranReadingFont.style.fontFamily }}
              >
                {ayahs.map((ayah, index) => (
                  <span key={ayah.ayah} className="quran-ayah" data-ayah={ayah.ayah}>
                    {ayah.quran} {ayah.arabic_ayah}
                    {index < ayahs.length - 1 && ' '}
                  </span>
                ))}
              </p>
              <div className="flex justify-center">
                <span>{page}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

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
