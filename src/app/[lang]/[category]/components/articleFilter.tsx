'use client'
import Card16Podcast from '@/components/PostCards/Card16Podcast'
import Card17 from '@/components/PostCards/Card17'
import Card17Filter from '@/components/PostCards/Card17Filter'
import Card22 from '@/components/PostCards/Card22'
import FiltersDropdown from '@/components/PostCards/FiltersDropdown'
import Card16PodcastSkeleton from '@/components/Skeletons/Card16PodcastSkeleton'
import Card17Skelton from '@/components/Skeletons/Card17Skelton'
import Card22Skeleton from '@/components/Skeletons/Card22Skeleton'
import PostListsSkelton from '@/components/Skeletons/PostListsSkelton'
import { getCategoryFilterArticle, getFeaturedCategoryArticle } from '@/utils/getServices'
import React, { Suspense, useEffect } from 'react'
import FeaturedCategorySlider from './FeaturedCategorySlider'

// Simple debounce hook to delay rapid changes
function useDebouncedValue<T>(value: T, delay: number) {
  const [debounced, setDebounced] = React.useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

type Props = {
  categoryData: any
  galleryPosts: any[]
  lang: string
  dict: any
  postsByParentCategory: any
  category: string
}

const ArticleFilter = ({ categoryData, galleryPosts, lang, dict, postsByParentCategory, category }: Props) => {
  const [featuredCategoryArticles, setFeaturedCategoryArticles] = React.useState<any>([])
  const [filteredCategoryArticles, setFilteredCategoryArticles] = React.useState<any>([])
  const [isSelectedCategory, setNowSelectedCategory] = React.useState<string[]>([])
  const [visibleCount, setVisibleCount] = React.useState<number>(20)
  const [isLoadingFeatured, setIsLoadingFeatured] = React.useState<boolean>(false)
  const [isLoadingFiltered, setIsLoadingFiltered] = React.useState<boolean>(false)

  // Debounce selection changes to avoid firing network calls on every toggle quickly
  const debouncedSelected = useDebouncedValue(isSelectedCategory, 250)

  // In-memory caches (reset when parent/category/lang changes)
  const featuredCacheRef = React.useRef<Map<string, any>>(new Map())
  const filteredCacheRef = React.useRef<Map<string, any>>(new Map())

  useEffect(() => {
    // Clear caches when core context changes
    featuredCacheRef.current.clear()
    filteredCacheRef.current.clear()
  }, [categoryData.data._id, category, lang])

  // Fetch featured posts (does not depend on visibleCount)
  useEffect(() => {
    let cancelled = false
    const key = JSON.stringify({ parent: categoryData.data._id, ids: debouncedSelected, lang })
    const cached = featuredCacheRef.current.get(key)
    if (cached) {
      setFeaturedCategoryArticles(cached)
      setIsLoadingFeatured(false)
      return
    }
    setIsLoadingFeatured(true)
    ;(async () => {
      const featuredArticles = await getFeaturedCategoryArticle(categoryData.data._id, debouncedSelected, lang)
      if (!cancelled) {
        setFeaturedCategoryArticles(featuredArticles)
        featuredCacheRef.current.set(key, featuredArticles)
        setIsLoadingFeatured(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [categoryData.data._id, lang, debouncedSelected])

  // Fetch filtered posts (depends on visibleCount and selection)
  useEffect(() => {
    let cancelled = false
    const key = JSON.stringify({ category, limit: visibleCount, ids: debouncedSelected, lang })
    const cached = filteredCacheRef.current.get(key)
    if (cached) {
      setFilteredCategoryArticles(cached)
      setIsLoadingFiltered(false)
      return
    }
    setIsLoadingFiltered(true)
    ;(async () => {
      const filteredArticles = await getCategoryFilterArticle(category, visibleCount, debouncedSelected)
      if (!cancelled) {
        setFilteredCategoryArticles(filteredArticles)
        filteredCacheRef.current.set(key, filteredArticles)
        setIsLoadingFiltered(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [category, lang, visibleCount, debouncedSelected])

  // Reset pagination when filters or category context change
  useEffect(() => {
    setVisibleCount(20)
  }, [categoryData.data._id, category, lang, debouncedSelected])

  return (
    <React.Fragment>
      <div className="container">
        <h2 className="pb-6 text-[22px] font-medium">Filter By Category</h2>

        {/* LOOP ITEMS - Use posts from API if available, otherwise fallback to gallery posts */}
        <Suspense fallback={<Card17Skelton />}>
          {/* Mobile dropdown */}
          <div className="md:hidden">
            <FiltersDropdown
              items={
                categoryData.data.subcategories.length > 0 ? categoryData.data.subcategories : galleryPosts.slice(0, 8)
              }
              lang={lang}
              selectedIds={isSelectedCategory}
              onChangeSelectedIds={(ids) => setNowSelectedCategory(ids)}
              onApply={(selected) => setNowSelectedCategory(selected.map((item: any) => item._id))}
              onClear={() => setNowSelectedCategory([])}
              loading={isLoadingFiltered || isLoadingFeatured}
            />
          </div>

          {/* Inline list for md+ screens */}
          <div className="hidden flex-wrap gap-2 sm:gap-4 md:flex">
            {(categoryData.data.subcategories.length > 0
              ? categoryData.data.subcategories
              : galleryPosts.slice(0, 8)
            ).map((post: any, index: number) => (
              <Card17Filter
                key={post._id || index}
                post={post}
                lang={lang}
                selected={isSelectedCategory.includes((post._id || post.slug) as string)}
                onToggle={() => {
                  const id = (post._id || post.slug) as string
                  if (!id) return
                  setNowSelectedCategory((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
                }}
              />
            ))}
          </div>
        </Suspense>
      </div>

      {/* here featured create ui */}
      {isLoadingFeatured ? (
        <div className="container pt-10 md:pt-14 lg:pt-20">
          <Card22Skeleton />
        </div>
      ) : featuredCategoryArticles?.data?.length ? (
        <div className="container pt-10 md:pt-14 lg:pt-20">
          {featuredCategoryArticles?.data?.length > 1 ? (
            <FeaturedCategorySlider posts={featuredCategoryArticles.data} lang={lang} />
          ) : (
            <React.Fragment>
              <Card22 post={featuredCategoryArticles?.data?.[0]} lang={lang} />
            </React.Fragment>
          )}
        </div>
      ) : null}

      <div className="container">
        <Suspense fallback={<PostListsSkelton />}>
          <div className="pt-10 md:pt-14 lg:pt-20">
            <>
              <div className="pb-4 text-base font-normal text-[#000000] dark:text-white">
                {filteredCategoryArticles?.data?.length} Articles Found
              </div>
              <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
                {filteredCategoryArticles?.data?.map((post: any) => (
                  <Suspense key={`suspense-${post._id}`} fallback={<Card16PodcastSkeleton />}>
                    <Card16Podcast key={post._id} post={post} lang={lang} isCategoryPage={true} />
                  </Suspense>
                ))}
                {isLoadingFiltered &&
                  Array.from({ length: 8 }).map((_, idx) => <Card16PodcastSkeleton key={`loading-skel-${idx}`} />)}
              </div>
              {(isLoadingFiltered || filteredCategoryArticles?.data?.length >= visibleCount) && (
                <div className="mx-auto mt-8 text-center md:mt-10 lg:mt-12">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((c) => c + 20)}
                    className="inline-flex cursor-pointer items-center justify-center rounded-md border border-[#E3E3E3] px-5 py-2.5 text-sm font-medium text-[#444444] hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00652E] dark:border-[#2C2C2C] dark:text-white dark:hover:bg-neutral-800"
                    disabled={isLoadingFiltered}
                  >
                    {isLoadingFiltered ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </>
          </div>
        </Suspense>
      </div>

      <div className="container py-10 md:py-14 lg:py-20">
        {/* LOOP ITEMS - Use posts from API if available, otherwise fallback to gallery posts */}
        <Suspense fallback={<Card17Skelton />}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {(categoryData.data.subcategories.length > 0
              ? categoryData.data.subcategories
              : galleryPosts.slice(0, 8)
            ).map((post: any, index: number) => (
              <Card17 key={post._id || index} post={post} lang={lang} />
            ))}
          </div>
        </Suspense>
      </div>
    </React.Fragment>
  )
}

export default ArticleFilter
