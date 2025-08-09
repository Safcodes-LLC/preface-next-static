import Banner from '@/components/Banner'
import Card15Podcast from '@/components/PostCards/Card15Podcast'
import Card16Podcast from '@/components/PostCards/Card16Podcast'
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
  const posts = allPosts.filter((post: any) => {
    // Check if post has the subcategory as a tag or in its categories
    return (
      (post.tags || []).some(
        (tag: { handle: string }) => tag.handle.toLowerCase() === params.subcategory.toLowerCase()
      ) ||
      (post.categories || []).some(
        (cat: { handle: string }) => cat.handle.toLowerCase() === params.subcategory.toLowerCase()
      )
    )
  })

  console.log(posts, 'posts checking work or not')
  console.log(posts.length, 'posts length checking')

  // Format subcategory name for display
  const subcategoryName = params.subcategory
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div className={`page-subcategory-${params.subcategory}`}>
      <div className="container mx-auto mt-12 sm:mt-20">
        <Banner
          image="/images/banner/common-banner.png"
          title={subcategoryName}
          alt={`${subcategoryName} banner`}
          // className=""
        />

        {/* Horizontal line */}
        {/* <hr className="mt-8 w-full border-t border-[#E3E3E3] dark:border-[#2C2C2C]" /> */}
      </div>

      {/* <div className="container pt-6 lg:pt-10 px-4">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post) => (
              <Card17 key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts found in this subcategory.</p>
          </div>
        )}
      </div> */}
      <div>
        {/* <HeadingWithSub subHeading="Over 1000+ audio articles">Latest audio articles</HeadingWithSub> */}
        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <Card16Podcast key={p.id} post={p} />
          ))}
          <div className="md:col-span-2 lg:col-span-3">
            <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {posts.slice(3, 9).map((p) => (
                <Card15Podcast key={p.id} post={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
