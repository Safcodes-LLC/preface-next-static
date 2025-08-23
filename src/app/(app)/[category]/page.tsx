import Banner from '@/components/Banner'
import Card17 from '@/components/PostCards/Card17'
import SectionSliderPosts from '@/components/SectionSliderPosts'
import { serverFetch } from '@/lib/server/api'
import { getPostsDefault, getPostsGallery } from '@/data/posts'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Remove generateStaticParams to enable dynamic routing

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  
  try {
    const categoryData = await serverFetch.get(`/api/frontend/category/slug/${category}`)
    
    if (!categoryData) {
      return {
        title: 'Category not found',
        description: 'Category not found',
      }
    }

    return {
      title: categoryData?.name || categoryData?.title,
      description: categoryData?.description || categoryData?.meta_description,
    }
  } catch (error) {
    console.error('Error fetching category metadata:', error)
    return {
      title: 'Category',
      description: 'Category page',
    }
  }
}

const Page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params
  
  let categoryData: any = null
  let posts: any[] = []

  try {
    // Fetch category data from API
    categoryData = await serverFetch.get(`/api/frontend/category/slug/${category}`)
    console.log(categoryData?.data,"categoryData");
    
    if (!categoryData) {
      return notFound()
    }

    // If the API returns posts within the category data, use them
    if (categoryData.posts && Array.isArray(categoryData.posts)) {
      posts = categoryData.posts
    }
  } catch (error) {
    console.error('Error fetching category data:', error)
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
          title={categoryData.data.name || categoryData.data.title}
          alt={`${categoryData.data.name || categoryData.data.title} banner`}
          description={categoryData.data.subcategories.length ||  ""}
          // className=""
        />
        <div className="w-full lg:max-w-4xl mt-12">
          <p className="mt-6 text-sm text-[#444444] lg:text-base dark:text-[#DFDFDF]">
            {categoryData.data.description || categoryData.data.meta_description || ""}
          </p>
        </div>
        {/* Horizontal line - matching Figma design */}
        <hr className="mt-12 w-full border-t border-[#E3E3E3] dark:border-[#2C2C2C]" />
      </div>
      <div className="container pt-6 lg:pt-10">
        {/* LOOP ITEMS - Use posts from API if available, otherwise fallback to gallery posts */}
        <div className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-3">
          {(categoryData.data.subcategories.length > 0 ? categoryData.data.subcategories : galleryPosts.slice(0, 8)).map((post: any, index: number) => (
            <Card17 key={post._id || index} post={post} />
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
