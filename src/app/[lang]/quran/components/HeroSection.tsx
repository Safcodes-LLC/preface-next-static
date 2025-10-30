import { infoIcon } from '@/components/Svg/svg'
import Image from 'next/image'

const HeroSection = ({ surahData }: { surahData: any }) => {
  return (
    <div className="w-full rounded-2xl bg-[#F3F4F6] px-4 py-6 sm:px-6 md:px-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
        <div className="mb-4">
          <Image src="/images/quran/EWRTET.png" alt="Al-Baqarah" width={156} height={60} priority />
        </div>

        <div className="mb-2 flex flex-col items-center">
          <div className="mb-[10px] flex items-end gap-2">
            <h1 className="text-[24px] font-semibold text-gray-900 md:text-[26px] dark:text-white">
              {surahData.title}
              <span className="ms-2 text-[20px] font-normal dark:text-white">({surahData.meaning})</span>
            </h1>
            <button className="mb-1 flex cursor-pointer items-center gap-1 text-emerald-700 hover:text-emerald-800">
              {infoIcon({ className: 'w-4 h-4' })}
              <span className="text-[14px] font-medium dark:text-white">Surah Info</span>
            </button>
          </div>
          <h3 className="mt-[20px] text-[15px] font-semibold">Madani | Verses – {surahData.verse}</h3>
        </div>

        <div className="mt-2 max-w-4xl text-sm leading-relaxed">
          <p>{surahData.info}</p>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
