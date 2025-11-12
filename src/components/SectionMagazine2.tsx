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

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user?._id) return

      try {
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
      }
    }
    fetchPosts()
  }, [user?._id, lang])

  return (
    <div className={clsx('section-magazine-2 relative', className)}>
      <div className="mt-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 rounded-2xl bg-white px-5 pb-6 lg:col-span-7 dark:bg-[#0D0D0D]">
          <WidgetHeading
            title="Saved for Reading"
            viewAll={{ label: 'View all', href: lang === 'en' ? `/dashboard/saved-read` : `${lang}/dashboard/saved-read`}}
            isArrowHide={true}
            className="!px-0"
          />

          {savedPosts.length > 0 && (
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
