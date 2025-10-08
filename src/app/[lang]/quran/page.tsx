import { getSearchResults } from '@/data/search'
import { Input } from '@headlessui/react'
import {
  ArrowUpRightIcon,
  Folder02Icon,
  LicenseIcon,
  Quran01Icon,
  Search01Icon,
  Tag02Icon,
  UserListIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Metadata } from 'next'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const filterTabs = [
  { name: 'Articles', value: 'posts', icon: LicenseIcon },
  { name: 'Categories', value: 'categories', icon: Folder02Icon },
  { name: 'Tags', value: 'tags', icon: Tag02Icon },
  { name: 'Authors', value: 'authors', icon: UserListIcon },
]

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const { query } = await searchParams
  return {
    title: `Search results for ${query}`,
    description: `Search results for ${query}`,
  }
}

// Helper function to get single value from search params
const getParam = (param: string | string[] | undefined, defaultValue = '') =>
  Array.isArray(param) ? param[0] : param || defaultValue

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  async function handleSearch(formData: FormData) {
    'use server'
    redirect(`/search?s=${formData.get('s')}&tab=${formData.get('tab')}`)
  }

  const params = await searchParams
  let searchQuery = getParam(params['s'])
  let searchTab = getParam(params['tab'], filterTabs[0].value)

  if (!filterTabs.some((tab) => tab.value === searchTab)) {
    searchTab = filterTabs[0].value
  }

  const { posts, categories, tags, authors, totalResults, recommendedSearches } = await getSearchResults(
    searchQuery,
    searchTab as 'posts' | 'categories' | 'tags' | 'authors'
  )

  return (
    <div className="relative space-y-8 py-10 md:space-y-12 md:py-14 lg:space-y-16 lg:py-20">
      {/* Banner */}
      <div className="relative flex aspect-16/9 items-center justify-center lg:aspect-16/4">
        <Image
          alt="Quran Banner"
          fill
          src="/images/banner/quran-banner.png"
          className="object-cover"
          sizes="(max-width: 1600px) 100vw, 95vw"
          priority
        />
        <div className="absolute inset-0 bg-[#00652E] opacity-30" />
        <form className="relative w-full max-w-md px-3" action={handleSearch}>
          <div className="relative">
            <Input
              id="s"
              name="s"
              type="search"
              placeholder="Search the Quran"
              className="w-full rounded-full border-0 bg-white/90 py-3 ps-12 pe-14 text-sm text-black backdrop-blur-sm placeholder:text-[#A3A3A3] focus:ring-2 focus:ring-[#00652E] dark:bg-[#0D0D0D] dark:text-white"
              defaultValue={searchQuery}
            />
            <input type="hidden" name="tab" value={searchTab} />
            <div className="absolute start-5 top-1/2 -translate-y-1/2 transform">
              <HugeiconsIcon icon={Search01Icon} size={18} className="text-[#A3A3A3]" />
            </div>
          </div>
        </form>
      </div>

      <div className="container space-y-8 md:space-y-12 lg:space-y-16">
        {/* continuos reading */}
        <div>
          <h2 className="pb-4 text-[26px] font-medium">Continue Reading</h2>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-6 rounded-2xl bg-white max-md:col-span-full dark:bg-[#0d0d0d]">
              <div className="relative flex w-full flex-col gap-3 p-[60px_30px]">
                <button className="absolute top-[12px] right-[30px] flex aspect-square w-[30px] rotate-0 cursor-pointer items-center justify-center rounded-full border border-[#E2E2E2] transition-colors hover:bg-gray-50">
                  <HugeiconsIcon icon={ArrowUpRightIcon} size={14} className="text-[#919191]" strokeWidth={2.5} />
                </button>

                <div className="flex justify-between gap-8">
                  <div>
                    <h1 className="text-[24px] dark:text-white">
                      Al-Baqarah <span className="text-[20px] dark:text-white">(The Cow)</span>
                    </h1>
                    <div className="text-[16px]text-[#666666]">Verse 1</div>
                  </div>

                  <div className="flex justify-end">
                    <Image
                      src="/images/quran/surath-bakara.png"
                      alt="Surah Al-Baqarah"
                      width={168}
                      height={65}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-6 flex flex-col gap-6 rounded-2xl max-md:col-span-full">
              <div className="rounded-2xl bg-white dark:bg-[#0d0d0d]">
                <div className="flex justify-between gap-2 p-[25px_30px]">
                  <div className="flex gap-2">
                    <HugeiconsIcon icon={Quran01Icon} className="text-[#00652E]" strokeWidth={2.5} />
                    <div>Make your Quran Goals</div>
                  </div>
                  <button className="flex aspect-square w-[30px] cursor-pointer items-center justify-center rounded-full border border-[#E2E2E2] transition-colors hover:bg-gray-50">
                    <HugeiconsIcon icon={ArrowUpRightIcon} size={14} className="text-[#919191]" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
              <div className="rounded-2xl bg-white dark:bg-[#0d0d0d]">
                <div className="flex justify-between gap-2 p-[25px_30px]">
                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 text-[#60A43A]"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <div>Login & Schedule your learning</div>
                  </div>
                  <button className="flex aspect-square w-[30px] cursor-pointer items-center justify-center rounded-full border border-[#E2E2E2] transition-colors hover:bg-gray-50">
                    <HugeiconsIcon icon={ArrowUpRightIcon} size={14} className="text-[#919191]" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Week’s Learning */}
        <div>
          <h2 className="pb-4 text-[26px] font-medium">Week’s Learning</h2>
          <div className="space-y-6 rounded-2xl bg-white p-[30px] dark:bg-[#0d0d0d]">
            {/* Arabic Text - Right Aligned */}
            <div className="w-full text-2xl leading-[3.5rem] text-[#1A1A1A] dark:text-white" dir="rtl">
              <p className="w-[90%] break-words whitespace-pre-wrap md:w-[80%]" dir="rtl">
                قَالَ ٱللَّهُ هَٰذَا يَوْمُ يَنفَعُ ٱلصَّٰدِقِينَ صِدْقُهُمْ ۚ لَهُمْ جَنَّٰتٌ تَجْرِي مِن تَحْتِهَا
                ٱلْأَنْهَٰرُ خَٰلِدِينَ فِيهَآ أَبَدًۭا ۚ رَّضِىَ ٱللَّهُ عَنْهُمْ وَّرَضُوا عَنْهُ ۚ ذَٰلِكَ ٱلْفَوْزُ
                ٱلْعَظِيمُ
              </p>
            </div>

            {/* English Translation */}
            <div className="w-[95%] text-base text-black md:w-[85%] md:text-lg dark:text-gray-300">
              The lightning almost snatches away their sight. Whenever it lights [the way], they walk therein; but when
              darkness covers them, they stand still. Had Allah willed, He could have taken away their hearing and their
              sight. Indeed, Allah has power over all things.
            </div>

            {/* Explanation */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-[#1A1A1A] dark:text-white">Explanation</h3>
              <p className="text-sm text-[#4B4B4B] dark:text-gray-300">
                These two verses form the second parable that the Qur&apos;an presents to describe the psychological and
                spiritual condition of the hypocrites. While the earlier parable (v. 17-18) depicted their sudden fall
                from guidance into confusion and blindness...
              </p>
              <button className="text-[#00652E] hover:underline dark:text-[#4CAF50]">Read More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
