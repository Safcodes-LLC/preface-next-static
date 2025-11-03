'use client'

import { useAuth } from '@/contexts/AuthContext'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { HeadingWithSubProps } from '@/shared/Heading'
import { getSavedList } from '@/utils/getServices'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import Card24 from './PostCards/Card24'

interface Props extends Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> {
  heading?: string
  className?: string
  lang?: string
  gridClass?: string
}

const SectionMagazine3: FC<Props> = ({ heading, className, subHeading, dimHeading, lang, gridClass }) => {
  const { user } = useAuth()
  const [savedPosts, setSavedPosts] = useState<any[]>([])
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
    <div className={clsx('section-magazine-3 relative', className)}>
      {isLoading ? (
        <div className={gridClass}>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-48 animate-pulse rounded-2xl bg-gray-200 dark:bg-neutral-700"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : savedPosts.length > 0 ? (
        <>
          <div className={gridClass}>
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
          {savedPosts?.length > 8 && (
            <div className="mx-auto mt-8 text-center md:mt-10 lg:mt-12">
              <ButtonSecondary>
                Load More <ArrowDownIcon className="h-6 w-6 text-[#444444] dark:text-white" />
              </ButtonSecondary>
            </div>
          )}
        </>
      ) : (
        <div className="mt-4 text-center text-gray-500 dark:text-neutral-400">No saved posts found</div>
      )}
    </div>
  )
}

export default SectionMagazine3
