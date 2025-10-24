'use client'

import { useAuth } from '@/contexts/AuthContext'
import { HeadingWithSubProps } from '@/shared/Heading'
import { getSavedList } from '@/utils/getServices'
import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import Card24 from './PostCards/Card24'

interface Props extends Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> {
  heading?: string
  className?: string
  lang?: string
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

const SectionMagazine2: FC<Props> = ({ heading, className, subHeading, dimHeading, lang }) => {
  const { user } = useAuth()
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  console.log(savedPosts, "savedPosts1234");
  
  useEffect(() => {
    const fetchSavedPosts = async () => {
      if (!user?._id) return

      try {
        setIsLoading(true)
        const response = await getSavedList(user._id, lang || 'en')
        if (response && response.data) {
          setSavedPosts(response.data)
        }
      } catch (err) {
        console.error('Error fetching saved posts:', err)
        setError('Failed to load saved posts')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSavedPosts()
  }, [user?._id, lang])

  return (
    <div className={clsx('section-magazine-2 relative', className)}>
      <div className="mt-8 grid grid-cols-12 gap-6">
        <div className="col-span-8 rounded-2xl bg-white px-5 py-6 dark:bg-[#0D0D0D]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Saved for Reading</h2>
            {savedPosts.length > 0 && (
              <div>
                <button className="cursor-pointer text-sm text-[#00652E] hover:underline">View All</button>
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="mt-4 grid grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-48 animate-pulse rounded-2xl bg-gray-200 dark:bg-neutral-700"></div>
              ))}
            </div>
          ) : error ? (
            <div className="mt-4 text-center text-red-500">{error}</div>
          ) : savedPosts.length > 0 ? (
            <div className="mt-4 grid grid-cols-3 gap-6">
              {savedPosts.map((item) => (
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
        <div className="col-span-4 bg-green-700">asd</div>
      </div>
    </div>
  )
}

export default SectionMagazine2
