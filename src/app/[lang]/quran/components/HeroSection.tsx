import { infoIcon } from '@/components/Svg/svg'
import localFont from 'next/font/local'
// import Image from 'next/image'

const quranFont = localFont({
  src: [
    {
      path: '../../../../../public/fonts/surah-name-v4.ttf',
      weight: 'normal',
      style: 'normal',
    },
  ],
  variable: '--font-quran',
})

const HeroSection = ({ surahData }: { surahData: any }) => {
  return (
    <div className="w-full rounded-2xl bg-[#F3F4F6] p-[24px_32px] max-md:p-[20px] dark:bg-[#0d0d0d]">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
        <h2
          className="mb-4 text-[60px] max-md:mb-2.5 max-md:text-[40px]"
          style={{ fontFamily: quranFont.style.fontFamily }}
        >
          surah{surahData?.surahCode}
        </h2>

        <div className="mb-2 flex flex-col items-center">
          <div className="mb-[10px] flex items-end gap-2 max-md:flex-wrap max-md:justify-center">
            <h1 className="text-[26px] font-semibold text-gray-900 max-md:text-[20px] dark:text-white">
              {surahData?.title}
              <span className="ms-2 text-[20px] font-normal dark:text-white">({surahData?.meaning})</span>
            </h1>
            <button className="mb-1 flex cursor-pointer items-center gap-1 text-emerald-700 hover:text-emerald-800">
              {infoIcon({ className: 'w-4 h-4' })}
              <span className="text-[14px] font-medium dark:text-white">Surah Info</span>
            </button>
          </div>
          <h3 className="mt-[20px] text-[15px] font-semibold max-md:mt-[0px] max-md:text-[14px]">
            Madani | Verses – {surahData?.verse}
          </h3>
        </div>

        <div className="mt-2 max-w-4xl text-[15px] leading-relaxed max-md:text-[14px]">
          <p>{surahData?.info}</p>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
