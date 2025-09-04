import { Metadata } from 'next'
import ButtonSecondary from '@/shared/ButtonSecondary'
import Card11 from '@/components/PostCards/Card11'
import Banner from '@/components/Banner'
import { getCategory } from '@/data/api/category'
import { Folder02Icon, LicenseIcon, Tag02Icon, UserListIcon } from '@hugeicons/core-free-icons'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import { getDictionary } from '@/i18n'

// const sortByOptions = [
//   { name: 'Most recent', value: 'most-recent' },
//   { name: 'Curated by admin', value: 'curated-by-admin' },
//   { name: 'Most appreciated', value: 'most-appreciated' },
//   { name: 'Most discussed', value: 'most-discussed' },
//   { name: 'Most viewed', value: 'most-viewed' },
//   { name: 'Most liked', value: 'most-liked' },
// ]
const filterTabs = [
  {
    name: 'Articles',
    value: 'posts',
    icon: LicenseIcon,
  },
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

const PageStories = async ({
  params,
  searchParams,
}: {
  params: Promise<{ query: string; lang: string }>
  searchParams: SearchParams
}) => {
  const category = await getCategory((await params).lang || 'en')
  let searchQuery = (await searchParams)['s']
  let searchTab = (await searchParams)['tab']
  // example: /search?s=text1&s=text2 => searchQuery = 'text1'
  if (Array.isArray(searchQuery)) {
    searchQuery = searchQuery[0]
  }
  if (!searchQuery) {
    searchQuery = ''
  }

  if (searchTab && Array.isArray(searchTab)) {
    searchTab = searchTab[0]
  }
  if (!filterTabs.some((tab) => tab.value === searchTab)) {
    searchTab = filterTabs[0].value // default tab is posts
  }

  const renderLoopItems = (category: any) => {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        {category?.data?.map((post: any) => (
          <Card11 key={post._id} post={post} />
        ))}
      </div>
    )
  }
const dict = await getDictionary((await params).lang)
  return (
    <div className="stories-page" dir={(await params).lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto mt-10 md:mt-14 lg:mt-20">
        {/* HEADER */}

        <Banner
          image="/images/banner/common-banner.png"
          title={dict.navigation.stories}
          description={category?.data?.length}
          alt="Stories banner"
          dict={dict}
          // className=""
        />
      </div>

      <div className="container py-10 md:py-14 lg:py-20">
        {/* LOOP ITEMS */}
        {renderLoopItems(category)}
        <div className="mx-auto mt-8 text-center md:mt-10 lg:mt-12">
          <ButtonSecondary>
            Load More <ArrowDownIcon className="h-6 w-6 text-[#444444] dark:text-white" />
          </ButtonSecondary>
        </div>
      </div>
    </div>
  )
}

export default PageStories
