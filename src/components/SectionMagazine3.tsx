'use client'

import { useAuth } from '@/contexts/AuthContext'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { HeadingWithSubProps } from '@/shared/Heading'
import { getCompletedReadByCategory, getContinuosReadList } from '@/utils/getServices'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import Card23 from './PostCards/Card23'
import Card24 from './PostCards/Card24'

interface Props extends Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> {
  heading?: string
  className?: string
  lang?: string
  gridClass?: string
}

const SectionMagazine3: FC<Props> = ({ heading, className, subHeading, dimHeading, lang, gridClass }) => {
  const { user } = useAuth()
  const [continuosPosts, setContinuosPosts] = useState<any[]>([])
  const [completedReads, setCompletedReads] = useState<any[]>([])
  const [visibleCount, setVisibleCount] = useState<number>(8)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  // const [error, setError] = useState<string | null>(null)
  const [allPostsLoaded, setAllPostsLoaded] = useState(false)

  // Load more posts
  const handleLoadMore = () => {
    if (isLoadingMore || allPostsLoaded) return

    setIsLoadingMore(true)
    setVisibleCount((prevCount) => {
      const newCount = prevCount + 8
      if (newCount >= continuosPosts.length) {
        setAllPostsLoaded(true)
      }
      return newCount
    })
    setIsLoadingMore(false)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user?._id) return

      try {
        // Fetch in-progress reading
        const [continuosReadResponse, completedReadResponse] = await Promise.all([
          getContinuosReadList(user._id, lang || 'en'),
          getCompletedReadByCategory(user._id),
        ])

        if (continuosReadResponse?.data) {
          setContinuosPosts(continuosReadResponse.data)
        }

        // Handle completed reads response
        if (completedReadResponse?.data) {
          // You'll need to add a new state for completed reads
          setCompletedReads(completedReadResponse.data)
        }
      } catch (err) {
        console.error('Error fetching posts:', err)
        // setError('Failed to load posts')
      }
    }

    fetchPosts()
  }, [user?._id, lang])

  return (
    <div className="grid grid-cols-12 gap-8 max-md:gap-[20px_0]">
      <div className={clsx('section-magazine-3 relative col-span-12', className)}>
        {continuosPosts.length > 0 && (
          <>
            <div className={gridClass}>
              {continuosPosts.slice(0, visibleCount).map((item) => (
                <Card24
                  key={item._id}
                  lang={lang}
                  title={item?.title}
                  category={item.categories[0]?.name || 'Uncategorized'}
                  thumbnail={item?.thumbnail || '/images/placeholder-image.png'}
                />
              ))}
            </div>
            {continuosPosts.length > visibleCount && (
              <div className="mx-auto mt-8 text-center md:mt-10 lg:mt-12">
                <ButtonSecondary
                  onClick={handleLoadMore}
                  disabled={isLoadingMore || allPostsLoaded}
                  className={clsx(
                    'flex items-center justify-center',
                    (isLoadingMore || allPostsLoaded) && 'cursor-not-allowed opacity-70'
                  )}
                >
                  {isLoadingMore ? (
                    'Loading...'
                  ) : allPostsLoaded ? (
                    'No More Posts'
                  ) : (
                    <>
                      Load More <ArrowDownIcon className="ml-2 h-5 w-5" />
                    </>
                  )}
                </ButtonSecondary>
              </div>
            )}
          </>
        )}
      </div>
      <div className="col-span-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Completed Topics</h2>
        <p className="mt-1 mb-4 text-gray-600 dark:text-gray-300">Latest 6 topics you started reading</p>
        <div className="grid grid-cols-1 gap-6 max-md:gap-[20px_15px] lg:grid-cols-2">
          {completedReads.slice(0, 6).map((post: any, index: any) => (
            <Card23 key={post._id || index} post={post} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SectionMagazine3
