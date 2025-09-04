import CardAuthorBox2 from '@/components/CardAuthorBoxs/CardAuthorBox2'
import CardCategory2 from '@/components/CategoryCards/CardCategory2'
import ImageHeroBanner from '@/components/ImageHeroBanner'
import Card11 from '@/components/PostCards/Card11'
import VideoBanner from '@/components/VideoBanner'
import { getSearchResults } from '@/data/search'
import ButtonSecondary from '@/shared/ButtonSecondary'
import Tag from '@/shared/Tag'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import { Folder02Icon, LicenseIcon, Tag02Icon, UserListIcon } from '@hugeicons/core-free-icons'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import HomeHeader from '../(home)/(home-1)/components/homeHeader'

const sortByOptions = [
  { name: 'Most recent', value: 'most-recent' },
  { name: 'Curated by admin', value: 'curated-by-admin' },
  { name: 'Most appreciated', value: 'most-appreciated' },
  { name: 'Most discussed', value: 'most-discussed' },
  { name: 'Most viewed', value: 'most-viewed' },
  { name: 'Most liked', value: 'most-liked' },
]
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

const PageVisuals = async ({
  params,
  searchParams,
}: {
  params: Promise<{ query: string, lang: string }>
  searchParams: SearchParams
}) => {
  async function handleSearch(formData: FormData) {
    'use server'

    const searchQuery = formData.get('s') as string
    const searchTab = formData.get('tab') as string
    redirect(`/search?s=${searchQuery}&tab=${searchTab}`)
  }

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

  const { posts, categories, tags, authors, totalResults, recommendedSearches } = await getSearchResults(
    searchQuery || '',
    searchTab as 'posts' | 'categories' | 'tags' | 'authors'
  )
  // console.log(posts, 'postssss.. ')

  return (
    <div className="visuals-page" dir={(await params).lang === 'ar' ? 'rtl' : 'ltr'}>
      <HomeHeader lang={(await params).lang} />
    <ImageHeroBanner />
    </div>
  )
}

export default PageVisuals
