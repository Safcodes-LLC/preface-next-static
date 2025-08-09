import ArchiveSortByListBox from '@/components/ArchiveSortByListBox'
import Banner from '@/components/Banner'
import ModalCategories from '@/components/ModalCategories'
import Card16Podcast from '@/components/PostCards/Card16Podcast'
import { getCategories, getTags } from '@/data/categories'
import { getAllPosts } from '@/data/posts'
import { Metadata } from 'next'

// Generate static params for all subcategories
export async function generateStaticParams() {
  // This should return all possible [category]/[subcategory] pairs
  // For now, we'll return some example subcategories
  return [
    { category: 'muhammed', subcategory: 'life-and-message' },
    { category: 'islam-for-beginners', subcategory: 'common-questions' },
    // Add more as needed
  ]
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; subcategory: string }
}): Promise<Metadata> {
  // Format subcategory name for display
  const subcategoryName = params.subcategory
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: subcategoryName,
    description: `Articles about ${subcategoryName}`,
  }
}

const Page = async ({ params }: { params: { category: string; subcategory: string } }) => {
  // Get all posts and filter by subcategory
  const allPosts = await getAllPosts()

  // Debug: Log all unique categories and tags
  const allCategories = new Set<string>()
  const allTags = new Set<string>()

  allPosts.forEach((post) => {
    post.categories?.forEach((cat: any) => allCategories.add(cat.handle.toLowerCase()))
    // post.tags?.forEach((tag: any) => allTags.add(tag.handle.toLowerCase()))
  })

  console.log('Available categories:', Array.from(allCategories))
  console.log('Available tags:', Array.from(allTags))
  console.log('Current subcategory:', params.subcategory.toLowerCase())

  // If no matching subcategory found, show all posts for now
  const posts = allPosts.filter((post: any) => {
    // If subcategory is one of the available categories, filter by it
    const hasMatchingCategory = (post.categories || []).some(
      (cat: { handle: string }) => cat.handle.toLowerCase() === params.subcategory.toLowerCase()
    )

    // For now, show all posts if no matching category is found
    return hasMatchingCategory || true
  })

  // Format subcategory name for display
  const subcategoryName = params.subcategory
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const categories = await getCategories()
  const tags = await getTags()

  const filterOptions = [
    { name: 'Most recent', value: 'most-recent' },
    { name: 'Curated by admin', value: 'curated-by-admin' },
    { name: 'Most appreciated', value: 'most-appreciated' },
    { name: 'Most discussed', value: 'most-discussed' },
    { name: 'Most viewed', value: 'most-viewed' },
  ]

  return (
    <div className={`page-subcategory-${params.subcategory}`}>
      <div className="container mx-auto mt-12 sm:mt-20">
        <Banner
          image="/images/banner/common-banner.png"
          title={subcategoryName}
          alt={`${subcategoryName} banner`}
          // className=""
        />
      </div>

      <div className="container pt-10 lg:pt-20">
        <div className="flex flex-wrap gap-x-2 gap-y-4">
          <ModalCategories categories={categories} />
          {/* <ModalTags tags={tags} /> */}
          <div className="ms-auto">
            <ArchiveSortByListBox filterOptions={filterOptions} />
          </div>
        </div>

        <div className="pt-6 lg:pt-10">
          {posts.length > 0 ? (
            <>
              <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
                {posts.slice(0, 8).map((p) => (
                  <Card16Podcast key={p.id} post={p} />
                ))}
              </div>
            </>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500">No posts found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
