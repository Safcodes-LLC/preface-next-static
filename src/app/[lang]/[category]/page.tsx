import Banner from '@/components/Banner'
import SectionSliderPosts from '@/components/SectionSliderPosts'
import BannerSkeleton from '@/components/Skeletons/BannerSkeleton'
import { SectionSliderPostsSkeleton } from '@/components/Skeletons/SectionSliderPostsSkeleton'
import { getPopularArticles, getPostsByParentCategory } from '@/data/api/posts'
import {
  //  getPostsDefault,
  getPostsGallery,
} from '@/data/posts'
import { getDictionary } from '@/i18n'
import { serverFetch } from '@/lib/server/api'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import ArticleFilter from './components/articleFilter'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; lang: string }>
}): Promise<Metadata> {
  const { category, lang } = await params

  try {
    const categoryData = await serverFetch.get(`/api/frontend/category/slug/${category}`, { language: lang })

    if (!categoryData) {
      return {
        title: 'Preface Islam',
        description: 'Preface Islam is a platform for Muslims to learn about Islam and its teachings',
      }
    }

    return {
      title: categoryData?.data?.meta_title || `${categoryData?.data?.name} - Preface Islam` || 'Preface Islam',
      description:
        categoryData?.data?.meta_description ||
        'Preface Islam is a platform for Muslims to learn about Islam and its teachings.',
    }
  } catch (error) {
    console.error('Error fetching category metadata:', error)
    return {
      title: 'Preface Islam',
      description: 'Preface Islam is a platform for Muslims to learn about Islam and its teachings',
    }
  }
}

const Page = async ({ params }: { params: Promise<{ category: string; lang: string }> }) => {
  const { category, lang } = await params
  const dict = await getDictionary(lang)

  let categoryData: any = null
  let posts: any[] = []

  try {
    // Fetch category data from API
    categoryData = await serverFetch.get(`/api/frontend/category/slug/${category}`, { language: lang })
    // console.log(categoryData?.data,"categoryData");

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
  // const defaultPosts = await getPostsDefault()

  const popularArticles = await getPopularArticles({ parentSlug: category, lang })
  const postsByParentCategory = await getPostsByParentCategory(category, lang)

  const categoryName = categoryData.data.name || ''

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={`page-category-${category}`}>
      {/* <PageHeader category={categoryData} /> */}
      <div className="container mx-auto mt-12 sm:mt-20">
        <Suspense fallback={<BannerSkeleton />}>
          <Banner
            image={categoryData?.data?.featuredImage}
            title={categoryName}
            alt={`${categoryData?.data?.name || categoryData.data.title} banner`}
            description={categoryData?.data?.subcategories?.length || ''}
            // className=""
            dict={dict}
          />
        </Suspense>
        <Suspense
          fallback={
            <div className="mt-12 flex w-full flex-col gap-3">
              <div className="h-3 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-700"></div>
              <div className="h-3 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-700"></div>
              <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700"></div>
            </div>
          }
        >
          <div className="mt-12 w-full lg:max-w-4xl">
            <p className="mt-6 text-sm text-[#444444] lg:text-base dark:text-[#DFDFDF]">
              {categoryData.data.description || categoryData.data.meta_description || ''}
            </p>
          </div>
        </Suspense>
        {/* Horizontal line - matching Figma design */}
        {/* <hr className="mt-12 w-full border-t border-[#E3E3E3] dark:border-[#2C2C2C]" /> */}
      </div>

      <ArticleFilter
        categoryData={categoryData}
        galleryPosts={galleryPosts}
        lang={lang}
        dict={dict}
        postsByParentCategory={postsByParentCategory}
        category={category}
      />

      {popularArticles.length > 0 && (
        <div className="container pb-10 md:pb-14 lg:pb-20">
          <div className="relative">
            <Suspense fallback={<SectionSliderPostsSkeleton />}>
              <SectionSliderPosts
                posts={popularArticles}
                heading={`${lang === 'en' ? `${dict.sections.populararticlesfrom.heading} ${categoryName}` : ` ${categoryName} ${dict.sections.populararticlesfrom.heading}`} `}
                postCardName="card10V5"
                lang={lang}
              />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
