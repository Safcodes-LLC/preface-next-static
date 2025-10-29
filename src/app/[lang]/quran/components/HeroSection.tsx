import { infoIcon } from '@/components/Svg/svg'
import Image from 'next/image'

const HeroSection = () => {
  return (
    // <div className="w-full rounded-lg bg-white p-6 shadow-sm md:p-8">
    //   <div className="mx-auto max-w-4xl text-center">
    //     {/* Arabic Title */}
    //     <div className="mb-6">
    //       <Image
    //         src="/images/quran/surath-bakara.png"
    //         alt="Al-Baqarah"
    //         width={300}
    //         height={100}
    //         className="mx-auto"
    //         priority
    //       />
    //     </div>

    //     {/* English Title and Info */}
    //     <h1 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">Al-Baqarah (The Cow) Surah Info</h1>
    //     <p className="mb-6 text-gray-600">Madani | Verses – 286</p>

    //     {/* Description */}
    //     <div className="mx-auto max-w-3xl text-base leading-relaxed text-gray-700 md:text-lg">
    //       <p className="mb-4">
    //         Surah Al-Baqarah is the longest chapter in the Holy Qur&apos;an. It is named Al-Baqarah (The Cow) because it
    //         refers to the extraordinary incident in which the Israelites were commanded to slaughter a particular cow to
    //         uncover the perpetrator of a murder.
    //       </p>
    //       <p>
    //         The verse known as Ayat al-Kursi, which has been described as the &ldquo;chief of the verses,&rdquo; is also
    //         found in this chapter. Since most of its verses were revealed after the Hijra (migration to Madinah), the
    //         chapter is called Madani.
    //       </p>
    //     </div>
    //   </div>
    // </div>

    <div className="w-full rounded-2xl bg-[#F3F4F6] px-4 py-6 sm:px-6 md:px-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
        <div className="mb-4">
          <Image src="/images/quran/EWRTET.png" alt="Al-Baqarah" width={156} height={60} priority />
        </div>

        <div className="mb-2 flex flex-col items-center space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-gray-900 md:text-2xl">
              Al-Baqarah <span className="text-base font-normal">(The Cow)</span>
            </h1>
            <div className="flex cursor-pointer items-center gap-1 text-emerald-700 hover:text-emerald-800">
              {infoIcon({ className: 'w-4 h-4' })}
              <span className="text-sm font-medium">Surah Info</span>
            </div>
          </div>
          <h3 className="mt-4 text-[15px] font-semibold">Madani | Verses – 286</h3>
        </div>

        <div className="mt-2 max-w-4xl text-sm leading-relaxed">
          <p>
            Surah Al-Baqarah is the longest chapter in the Holy Quran. It is named Al-Baqarah (The Cow) because it
            refers to the extraordinary incident in which the Israelites were commanded to slaughter a particular cow to
            uncover the perpetrator of a murder. The verse known as Ayat al-Kursi, which has been described as the chief
            of the verses, is also found in this chapter. Since most of its verses were revealed after the Hijra
            (migration to Madinah), the chapter is called Madani.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
