import ArchiveSortByListBox from '@/components/ArchiveSortByListBox'
import Banner from '@/components/Banner'
import ModalCategories from '@/components/ModalCategories'
import Card16Podcast from '@/components/PostCards/Card16Podcast'
import SectionSliderPosts from '@/components/SectionSliderPosts'
import { getSubcategoryPosts } from '@/data/api/posts'
import { getCategories, getTags } from '@/data/categories'
import { getAllPosts, getPostsDefault } from '@/data/posts'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>
}): Promise<Metadata> {
  // Await the params before using them
  const { subcategory } = await params

  // Format subcategory name for display
  const subcategoryName = subcategory
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: subcategoryName,
    description: `Articles about ${subcategoryName}`,
  }
}

const Page = async ({ params }: { params: Promise<{ subcategory: string }> }) => {
  // Await the params before using them
  const { subcategory } = await params

  // Call getSubcategoryPosts and log the results
  const subcategoryPosts = await getSubcategoryPosts(subcategory)
  console.log('getSubcategoryPosts result:', subcategoryPosts)

  // Get all posts and filter by subcategory
  const allPosts = await getAllPosts()

  // Debug: Log all unique categories and tags
  const allCategories = new Set<string>()
  const allTags = new Set<string>()

  allPosts.forEach((post) => {
    post.categories?.forEach((cat: any) => allCategories.add(cat.handle.toLowerCase()))
    // post.tags?.forEach((tag: any) => allTags.add(tag.handle.toLowerCase()))
  })

  // If no matching subcategory found, show all posts for now
  const posts = allPosts.filter((post: any) => {
    // If subcategory is one of the available categories, filter by it
    const hasMatchingCategory = (post.categories || []).some(
      (cat: { handle: string }) => cat.handle.toLowerCase() === subcategory.toLowerCase()
    )

    // For now, show all posts if no matching category is found
    return hasMatchingCategory || true
  })

  // Format subcategory name for display
  const subcategoryName = subcategoryPosts?.categories?.[0]?.name
  const lengthTopics = subcategoryPosts?.list?.length
  const listPost = subcategoryPosts?.list

  const categories = await getCategories()
  const defaultPosts = await getPostsDefault()
  const tags = await getTags()

  const filterOptions = [
    { name: 'Most recent', value: 'most-recent' },
    { name: 'Curated by admin', value: 'curated-by-admin' },
    { name: 'Most appreciated', value: 'most-appreciated' },
    { name: 'Most discussed', value: 'most-discussed' },
    { name: 'Most viewed', value: 'most-viewed' },
  ]

  return (
    <div className={`page-subcategory-${subcategory}`}>
      <div className="container mx-auto mt-12 sm:mt-20">
        <Banner
          image="/images/banner/common-banner.png"
          title={subcategoryName}
          alt={`${subcategoryName} banner`}
          description={`${lengthTopics}`}
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
          {listPost.filter((p) => p.postType?.name === "Article").length > 0 ? (
            <>
              <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
                {listPost
                  .filter((p) => p.postType?.name === "Article")
                  .slice(0, 8)
                  .map((p) => (
                    <Card16Podcast key={p._id} post={p} />
                  ))}
              </div>
            </>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500">No articles found in this category.</p>
            </div>
          )}
        </div>
      </div>

      <div className="container space-y-20 py-20 lg:space-y-28 lg:py-28">
        <div className="relative">
          {/* <BackgroundSection /> */}
          <SectionSliderPosts
            postCardName="card10V5"
            heading="POPULAR ARTICLES FROM THE MESSAGE OF MOHAMMED'S LIFE"
            subHeading="Over 10 Articles"
            posts={defaultPosts.slice(0, 6)}
          />
        </div>
      </div>
    </div>
  )
}

export default Page
