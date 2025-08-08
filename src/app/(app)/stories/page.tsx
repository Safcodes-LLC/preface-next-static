import Banner from '@/components/Banner'
import CardAuthorBox2 from '@/components/CardAuthorBoxs/CardAuthorBox2'
import CardCategory2 from '@/components/CategoryCards/CardCategory2'
import Card11 from '@/components/PostCards/Card11'
import { getSearchResults } from '@/data/search'
import ButtonSecondary from '@/shared/ButtonSecondary'
import Tag from '@/shared/Tag'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import { Folder02Icon, LicenseIcon, Tag02Icon, UserListIcon } from '@hugeicons/core-free-icons'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

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

const PageStories = async ({
  params,
  searchParams,
}: {
  params: Promise<{ query: string }>
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
  console.log(posts, 'postssss.. ')

  const renderLoopItems = () => {
    switch (searchTab) {
      case 'categories':
        return (
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:gap-8 lg:mt-10 lg:grid-cols-4 xl:grid-cols-5">
            {categories?.map((category) => (
              <CardCategory2 key={category.id} category={category} />
            ))}
          </div>
        )

      case 'tags':
        return (
          <div className="mt-12 flex flex-wrap gap-3">
            {tags?.map((tag) => (
              <Tag key={tag.id} href={`/tag/${tag.handle}`}>
                {tag.name}
              </Tag>
            ))}
          </div>
        )
      case 'authors':
        return (
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:gap-8 lg:mt-10 lg:grid-cols-4 xl:grid-cols-5">
            {authors?.map((author) => (
              <CardAuthorBox2 className="border border-dashed" key={author.id} author={author} />
            ))}
          </div>
        )
      default:
        return (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-8 lg:mt-10 lg:grid-cols-3 xl:grid-cols-3">
            {posts?.slice(0,9)?.map((post) => (
              <Card11 key={post.id} post={post} />
            ))}
          </div>
        )
    }
  }

  return (
    <div className="stories-page">
      <div className="container mx-auto mt-12 sm:mt-20">
        {/* HEADER */}
        {/* <div className="relative aspect-16/9 lg:aspect-16/5">
          <Image
            alt="search"
            fill
            src="/images/banner/common-banner.png"
            className="object-cover md:rounded-2xl"
            sizes="(max-width: 1600px) 100vw, 95vw"
            priority
          />
          <div
            className="absolute inset-y-0 left-0 w-3/5 md:rounded-l-2xl"
            style={{
              background: 'linear-gradient(90deg, rgba(20, 20, 20, 0.76) 0%, rgba(97, 97, 97, 0) 100%)',
            }}
          ></div>
          <div className="absolute inset-0 flex items-center px-10">
            <h1 className="text-2xl font-bold text-white md:text-3xl">Stories</h1>
          </div>
        </div> */}
        <Banner
          image="/images/banner/common-banner.png"
          title="Stories"
          alt="Stories banner"
          // className=""
        />

        {/* CONTENT */}
        {/* <div className="relative -mt-14 sm:container sm:-mt-36 lg:-mt-48">
          <div className="flex items-center rounded-3xl bg-white px-2.5 py-5 shadow-2xl sm:rounded-4xl sm:px-5 lg:py-14 dark:border dark:bg-neutral-900">
            <header className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
              <h2 className="text-2xl font-semibold sm:text-4xl">{searchQuery}</h2>
              <p className="mt-4 block text-sm">
                We found {totalResults} results for &quot;{searchQuery}&quot;
              </p>
              <form className="relative mt-6 w-full sm:mt-10" action={handleSearch}>
                <span className="sr-only">Search</span>
                <Input
                  id="s"
                  name="s"
                  type="search"
                  placeholder="Type and press enter"
                  sizeClass="sm:ps-16 py-5 pe-8"
                  defaultValue={searchQuery}
                />
                <input type="hidden" name="tab" value={searchTab} />
                <div className="absolute end-2.5 top-1/2 -translate-y-1/2 transform">
                  <ButtonCircle color="dark/white" className="size-11" type="submit">
                    <ArrowRightIcon className="size-5 rtl:rotate-180" />
                  </ButtonCircle>
                </div>

                <div className="absolute start-5 top-1/2 hidden -translate-y-1/2 transform text-2xl sm:block md:start-6">
                  <HugeiconsIcon icon={Search01Icon} size={24} />
                </div>
              </form>
              <div className="mt-4 flex w-full flex-wrap gap-x-1.5 gap-y-2 text-start text-sm sm:gap-x-2.5">
                <span className="font-normal">Recommended searches:</span>
                {recommendedSearches.map((search) => (
                  <Link className="font-normal underline" href={`/search?s=${search}`} key={search} scroll={false}>
                    {search}
                  </Link>
                ))}
              </div>
            </header>
          </div>
        </div> */}
      </div>

      <div className="container py-16 lg:pt-20">
        {/* <div className="flex flex-wrap items-center gap-4">
          <ArchiveTabs tabs={filterTabs} />
          <ArchiveSortByListBox className="ms-auto shrink-0" filterOptions={sortByOptions} />
        </div> */}

        {/* LOOP ITEMS */}
        {renderLoopItems()}
        <div className="mx-auto mt-10 text-center md:mt-16">
          <ButtonSecondary>
            Load More <ArrowDownIcon className="h-6 w-6 text-[#444444] dark:text-white" />
          </ButtonSecondary>
        </div>
        {/* PAGINATION */}
        {/* <PaginationWrapper className="mt-20" /> */}
      </div>
    </div>
  )
}

export default PageStories
