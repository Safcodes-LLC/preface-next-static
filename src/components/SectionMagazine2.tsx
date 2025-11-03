'use client'

import { useAuth } from '@/contexts/AuthContext'
import { HeadingWithSubProps } from '@/shared/Heading'
import { getFavouriteList, getSavedList } from '@/utils/getServices'
import clsx from 'clsx'
import { FC, Suspense, useEffect, useState } from 'react'
import Card24 from './PostCards/Card24'
import WidgetPostsSkeleton from './Skeletons/WidgetPostsSkeleton'
import WidgetHeading from './WidgetHeading'
import WidgetPosts from './WidgetPosts'

interface Props extends Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> {
  heading?: string
  className?: string
  lang?: string
  gridClass?: string
}

interface SavedPost {
  _id: string
  userId: string
  postId: {
    _id: string
    title: string
    thumbnail: string
    categories: Array<{ name: string }>
  }
  postType: string
  createdAt: string
  updatedAt: string
  __v: number
}

const SectionMagazine2: FC<Props> = ({ heading, className, subHeading, dimHeading, lang, gridClass }) => {
  const { user } = useAuth()
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([])
  const [favouritePosts, setFavouritePosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // console.log(savedPosts, "savedPosts1234");
  // console.log(favouritePosts, 'favouritePosts1234')

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user?._id) return

      try {
        setIsLoading(true)

        // Fetch saved posts
        const savedResponse = await getSavedList(user._id, lang || 'en')
        if (savedResponse?.data) {
          setSavedPosts(savedResponse.data)
        }

        // Fetch favorite posts
        const favoriteResponse = await getFavouriteList(user._id, '66d9d564987787d3e3ff1312', lang || 'en')
        if (favoriteResponse?.data) {
          setFavouritePosts(favoriteResponse.data)
        }
      } catch (err) {
        console.error('Error fetching posts:', err)
        setError('Failed to load posts')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [user?._id, lang])

  return (
    <div className={clsx('section-magazine-2 relative', className)}>
      <div className="mt-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7 rounded-2xl bg-white px-5 pb-6 dark:bg-[#0D0D0D]">
          {/* <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Saved for Reading</h2>
            {savedPosts.length > 0 && (
              <div>
                <button className="cursor-pointer text-sm text-[#00652E] hover:underline">View All</button>
              </div>
            )}
          </div> */}
          <WidgetHeading
            title="Saved for Reading"
            viewAll={{ label: 'View all', href: '/' }}
            isArrowHide={true}
            className="!px-0"
          />

          {isLoading ? (
            <div className={gridClass}>
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-48 animate-pulse rounded-2xl bg-gray-200 dark:bg-neutral-700"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : savedPosts.length > 0 ? (
            <div className={gridClass}>
              {savedPosts.slice(0, 6).map((item) => (
                <Card24
                  key={item._id}
                  lang={lang}
                  title={item.postId?.title}
                  category={item.postId?.categories?.[0]?.name || 'Uncategorized'}
                  thumbnail={item.postId?.thumbnail || '/images/placeholder-image.png'}
                />
              ))}
            </div>
          ) : (
            <div className="mt-4 text-center text-gray-500 dark:text-neutral-400">No saved posts found</div>
          )}
        </div>
        <div className="col-span-12 lg:col-span-5">
          <Suspense fallback={<WidgetPostsSkeleton />}>
            <WidgetPosts posts={favouritePosts} lang={lang} isFavourite title="My Favourites" isArrowHide={true} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default SectionMagazine2
