import localFont from 'next/font/local'
import React from 'react'
import QuranActionIcons from '../../components/QuranActionIcons'

const quranReadingFont = localFont({
  src: [
    {
      // path: '../../../../../../public/fonts/HAFS.ttf',
      path: '../../../../../../public/fonts/KFGQPC UTHMANIC SCRIPT HAFS REGULAR.otf',
      // weight: 'normal',
      // style: 'normal',
    },
  ],
  variable: '--font-quran-reading',
})

type Props = {
  surahData: any
}

const TranslationQuranTab = (props: Props) => {
  const { surahData } = props
  return (
    <React.Fragment>
      {surahData?.ayah?.map((ayah: any) => (
        <div key={ayah.ayah} className="w-full border-t border-[#E4E4E4] dark:border-[#333333] py-[20px] max-md:py-[10px]">
          <div className="flex w-full items-start justify-between gap-[20px]">
            <div className="h-[20px] w-1/5">
              <QuranActionIcons />
            </div>
            <div className="ms-auto flex w-4/5 items-center justify-start gap-[6px]" dir="rtl">
              <p
                className="quran-ayah text-[26px] font-normal max-md:text-[20px]"
                data-ayah={ayah.ayah}
                style={{ fontFamily: quranReadingFont.style.fontFamily }}
              >
                {ayah.quran} {ayah.arabic_ayah}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-[6px]">
            <p className="py-5 text-[18px] font-normal max-md:py-3 max-md:text-[15px]">{ayah.meaning}</p>
            <h6 className="text-[15px] font-semibold text-[#222] dark:text-white max-md:text-[14px]">Explanation</h6>
            <p className="line-clamp-2 text-[15px] font-light text-[#2C2C2C] dark:text-white max-md:text-[14px]">{ayah.explanation}</p>
            <button className="cursor-pointer text-[11px] font-normal text-[#7D7D7D] max-md:text-[10px]">
              Read More
            </button>
          </div>
        </div>
      ))}
      <style jsx>{`
        .quran-ayah {
          position: relative;
        }
        // .quran-ayah::after {
        //   content: attr(data-ayah);
        //   display: inline-flex;
        //   align-items: center;
        //   justify-content: center;
        //   width: 28px;
        //   height: 28px;
        //   margin-right: 8px;
        //   border-radius: 9999px;
        //   background-color: #d1d5db; /* gray-300 */
        //   color: #111827; /* gray-900 */
        //   font-size: 14px;
        //   // line-height: 1;
        // }
      `}</style>
    </React.Fragment>
  )
}

export default TranslationQuranTab
