import Banner from '@/components/Banner'
import ModalCategories from '@/components/ModalCategories'
import Card16Podcast from '@/components/PostCards/Card16Podcast'
import SectionSliderPosts from '@/components/SectionSliderPosts'
import BannerSkeleton from '@/components/Skeletons/BannerSkeleton'
import Card16PodcastSkeleton from '@/components/Skeletons/Card16PodcastSkeleton'
import PostListsSkelton from '@/components/Skeletons/PostListsSkelton'
import { SectionSliderPostsSkeleton } from '@/components/Skeletons/SectionSliderPostsSkeleton'
import { getCategoryBySlug, getPopularArticles, getSubcategoryPosts } from '@/data/api/posts'
import { getAllPosts } from '@/data/posts'
import { getDictionary } from '@/i18n'
import { Metadata } from 'next'
import { Suspense } from 'react'

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
    title: subcategoryName + ' - Preface Islam',
    description: `Articles about ${subcategoryName}`,
  }
}

const Page = async ({ params }: { params: Promise<{ category: string; subcategory: string; lang: string }> }) => {
  // Await the params before using them
  const { category, subcategory } = await params
  const { lang } = await params
  const dict = await getDictionary(lang)

  // Call getSubcategoryPosts and log the results
  const subcategoryPosts = await getSubcategoryPosts(subcategory, lang)

  const allPosts = await getAllPosts()
  const popularArticles = await getPopularArticles({ subcategorySlug: subcategory, lang })

  // Debug: Log all unique categories and tags
  const allCategories = new Set<string>()

  allPosts.forEach((post) => {
    post.categories?.forEach((cat: any) => allCategories.add(cat.handle.toLowerCase()))
  })

  // Format subcategory name for display
  const subcategoryName = subcategoryPosts?.categories?.[0]?.name
  const subcategoryImage = subcategoryPosts?.categories[0]?.featuredImage
  const listPost = subcategoryPosts?.list

  // Sanitize category slug if it accidentally includes the lang prefix (e.g., "ar" + "life-...")
  const categorySlug = category.startsWith(lang) ? category.slice(lang.length) : category
  // const categories = await getCategories()
  const categories2 = await getCategoryBySlug(categorySlug, lang)

  return (
    <div className={`page-subcategory-${subcategory}`}>
      <div className="container mx-auto mt-10 md:mt-14 lg:mt-20">
        <Suspense fallback={<BannerSkeleton />}>
          <Banner
            image={subcategoryImage}
            title={subcategoryName}
            alt={`${subcategoryName} banner`}
            // description={`${lengthTopics}`}
            description={`${listPost.filter((p) => p.postType?.name === 'Article').length}`}
            // className=""
            dict={dict}
          />
        </Suspense>
      </div>

      <div className="container py-10 md:py-14 lg:py-20">
        <Suspense
          fallback={
            <div className="flex w-16 gap-x-2 gap-y-4 rounded-full bg-neutral-200 p-3 dark:bg-neutral-700">
              <div className="h-2 w-12 rounded bg-neutral-400 dark:bg-neutral-800"></div>
              <div className="aspect-square h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-800"></div>
            </div>
          }
        >
          <div className="flex flex-wrap gap-x-2 gap-y-4">
            <ModalCategories categories={categories2?.subcategories || []} />
          </div>
        </Suspense>
        <Suspense fallback={<PostListsSkelton />}>
          <div className="pt-6 lg:pt-10">
            {listPost.filter((p) => p.postType?.name === 'Article').length > 0 ? (
              <>
                <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
                  {listPost
                    .filter((p) => p.postType?.name === 'Article')
                    .map((p) => (
                      <Suspense key={`suspense-${p._id}`} fallback={<Card16PodcastSkeleton />}>
                        <Card16Podcast key={p._id} post={p} lang={lang} isCategoryPage={false} />
                      </Suspense>
                    ))}
                </div>
              </>
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-500">No articles found in this category.</p>
              </div>
            )}
          </div>
        </Suspense>
      </div>

      {popularArticles.length > 0 && (
        <div className="container pb-10 md:pb-14 lg:pb-20">
          <div className="relative">
            {/* <BackgroundSection /> */}
            {/* <Suspense fallback={<SectionSliderPostsSkeleton />}>
            <ClientSectionSliderPosts
              postCardName="card10V5"
              heading={`${dict.sections.populararticlesfrom.heading} ${subcategoryName}`}
              // subHeading="Over 10 Articles"
              subcategorySlug={subcategory}
              limit={6}
              lang={lang}
            />
          </Suspense> */}
            <Suspense fallback={<SectionSliderPostsSkeleton />}>
              <SectionSliderPosts
                posts={popularArticles}
                heading={`${lang === 'en' ? `${dict.sections.populararticlesfrom.heading} ${subcategoryName}` : `${subcategoryName} ${dict.sections.populararticlesfrom.heading} `}`}
                postCardName="card10V5"
              />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
