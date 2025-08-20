import Banner from '@/components/Banner'
import Card17 from '@/components/PostCards/Card17'
import SectionSliderPosts from '@/components/SectionSliderPosts'
import { getCategories, getCategoryByHandle } from '@/data/categories'
import { getPostsDefault, getPostsGallery } from '@/data/posts'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = await getCategories()

  return categories.map((category) => ({
    category: category.handle,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  const categoryData = await getCategoryByHandle(category)

  if (!categoryData) {
    return {
      title: 'Category not found',
      description: 'Category not found',
    }
  }

  return {
    title: categoryData?.name,
    description: categoryData?.description,
  }
}

const Page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params
  const categoryData = await getCategoryByHandle(category)
  const posts = categoryData?.posts || []

  if (!categoryData) {
    return notFound()
  }

  const galleryPosts = await getPostsGallery()
  const defaultPosts = await getPostsDefault()

  return (
    <div className={`page-category-${category}`}>
      {/* <PageHeader category={categoryData} /> */}
      <div className="container mx-auto mt-12 sm:mt-20">
        <Banner
          image="/images/banner/common-banner.png"
          title={categoryData.name}
          alt={`${categoryData.name} banner`}
          // className=""
        />
        <div className="w-full lg:max-w-4xl">
          <p className="mt-6 text-sm text-[#444444] lg:text-base dark:text-[#DFDFDF]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, dolore error aperiam fugiat accusamus
            voluptates quasi quod consectetur cupiditate suscipit praesentium inventore ab similique saepe placeat,
            minima aliquid facilis nobis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam illo modi
            nostrum esse
          </p>
        </div>
        {/* Horizontal line - matching Figma design */}
        <hr className="mt-8 w-full border-t border-[#E3E3E3] dark:border-[#2C2C2C]" />
      </div>
      <div className="container pt-6 lg:pt-10">
        {/* LOOP ITEMS */}
        <div className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-3">
          {galleryPosts.slice(0, 8).map((post, index) => (
            <Card17 key={post.id} post={post} />
          ))}
        </div>
      </div>

      <div className="container space-y-20 py-20 lg:space-y-28 lg:py-28">
        <div className="relative ">
          {/* <BackgroundSection /> */}
          <SectionSliderPosts
            postCardName="card10V5"
            heading="POPULAR ARTICLES FROM MOHAMMED ﷺ"
            subHeading="Over 10 Articles"
            posts={defaultPosts.slice(0, 6)}
          />
        </div>
      </div>
    </div>
  )
}

export default Page
