'use client'

import { useAuth } from '@/contexts/AuthContext'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { HeadingWithSubProps } from '@/shared/Heading'
import { getContinuosReadList } from '@/utils/getServices'
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
  const [continuosPosts, setContinuosPosts] = useState<any[]>([])
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
        // Fetch saved posts
        const continuosReadResponse = await getContinuosReadList(user._id, lang || 'en')
        if (continuosReadResponse?.data) {
          setContinuosPosts(continuosReadResponse.data)
        }
      } catch (err) {
        console.error('Error fetching posts:', err)
        // setError('Failed to load posts')
      }
    }

    fetchPosts()
  }, [user?._id, lang])

  return (
    <div>
      <div className={clsx('section-magazine-3 relative', className)}>
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
      <div></div>
    </div>
  )
}

export default SectionMagazine3
